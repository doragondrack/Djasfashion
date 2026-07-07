import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { INITIAL_PRODUCTS } from "../data/products";
import type { Product, Category } from "../data/products";
import { hasSession, startSession, clearSession } from "../lib/auth";
import { supabase } from "../lib/supabase";

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

// ─── Store shape ──────────────────────────────────────────────────────────────
interface StoreCtx {
  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;

  // Reservation (inventory control)
  reservedIds: Set<number>;
  reserveProducts: (ids: number[]) => void;
  releaseProduct: (id: number) => void;
  isReserved: (id: number) => boolean;

  // Cart
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (p: Product, color: string) => void;
  removeFromCart: (id: number, color: string) => void;
  updateQty: (id: number, color: string, delta: number) => void;
  clearCart: () => void;

  // Category filter
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;

  // Admin session
  isAdmin: boolean;
  adminLogin: () => void;
  adminLogout: () => void;

  // Cart drawer
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

const Store = createContext<StoreCtx | null>(null);



export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [isAdmin, setIsAdmin] = useState<boolean>(hasSession);
  const [cartOpen, setCartOpen] = useState(false);

  // Persist reservations in localStorage
  useEffect(() => {

    async function loadReserved(){

        const {data,error}=await supabase
            .from("reserved_products")
            .select("id");

        if(error){
            console.log(error);
            return;
        }

        setReservedIds(new Set(data.map(x=>x.id)));

    }

    loadReserved();

},[]);

useEffect(()=>{

    const channel=supabase

        .channel("products")

        .on(
            "postgres_changes",
            {
                event:"INSERT",
                schema:"public",
                table:"reserved_products"
            },
            payload=>{

                setReservedIds(prev=>{

                    const next=new Set(prev);

                    next.add(payload.new.id);

                    return next;

                });

            }
        )

        .subscribe();

    return ()=>{

        supabase.removeChannel(channel);

    };

},[]);

  useEffect(() => {
    localStorage.setItem(RESERVED_KEY, JSON.stringify([...reservedIds]));
  }, [reservedIds]);

  // Products
  const addProduct = useCallback((data: Omit<Product, "id">) => {
    setProducts((prev) => {
      const id = Math.max(0, ...prev.map((p) => p.id)) + 1;
      return [...prev, { ...data, id }];
    });
  }, []);

  const updateProduct = useCallback((updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setReservedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, []);

  // Reservations
  async function reserveProducts(ids:number[]){

    const rows=ids.map(id=>({id}));

    const {error}=await supabase
        .from("reserved_products")
        .insert(rows);

    if(error){

        console.log(error);

    }else{

        setReservedIds(prev=>new Set([...prev,...ids]));

    }

}

  const releaseProduct = useCallback((id: number) => {
    setReservedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, []);

  const isReserved = useCallback(
    (id: number) => reservedIds.has(id),
    [reservedIds]
  );

  // Cart
  const addToCart = useCallback((product: Product, color: string) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === product.id && i.selectedColor === color);
      if (ex) return prev.map((i) =>
        i.id === product.id && i.selectedColor === color
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      return [...prev, { ...product, quantity: 1, selectedColor: color }];
    });
  }, []);

  const removeFromCart = useCallback((id: number, color: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.selectedColor === color)));
  }, []);

  const updateQty = useCallback((id: number, color: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.selectedColor === color
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  // Admin
  const adminLogin = useCallback(() => { startSession(); setIsAdmin(true); }, []);
  const adminLogout = useCallback(() => { clearSession(); setIsAdmin(false); }, []);

  return (
    <Store.Provider
      value={{
        products, setProducts, addProduct, updateProduct, deleteProduct,
        reservedIds, reserveProducts, releaseProduct, isReserved,
        cartItems, cartCount, cartTotal,
        addToCart, removeFromCart, updateQty, clearCart,
        activeCategory, setActiveCategory,
        isAdmin, adminLogin, adminLogout,
        cartOpen, setCartOpen,
      }}
    >
      {children}
    </Store.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Store);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}
