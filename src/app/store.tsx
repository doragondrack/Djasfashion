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
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [isAdmin, setIsAdmin] = useState<boolean>(hasSession);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservedIds, setReservedIds] = useState<Set<number>>(new Set());

  // Persist reservations in localStorage
  useEffect(() => {

    async function loadReserved(){

        const {data,error}=await supabase
            .from("reserved_products")
            .select("product_id");

        if(error){
            console.log(error);
            return;
        }

        setReservedIds(new Set(data.map(x => x.product_id)));

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

                    next.add(payload.new.product_id);

                    return next;

                });

            }
        )

        .subscribe();

    return ()=>{

        supabase.removeChannel(channel);

    };

},[]);


  // Products
  useEffect(() => {

    async function loadProducts(){

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("id");

        if(error){
            console.error(error);
            return;
        }

        const items = data.map((p:any)=>({

            id:p.id,
            name:p.name,
            category:p.category,
            price:Number(p.price),
            originalPrice:p.original_price ?? undefined,
            image:p.image,
            tag:p.tag ?? undefined,
            colors:p.colors,
            description:p.description

        }));

        setProducts(items);

    }

    loadProducts();

},[]);

useEffect(()=>{

    const channel=supabase
        .channel("products")
        .on(
            "postgres_changes",
            {
                event:"*",
                schema:"public",
                table:"products"
            },
            ()=>{

                supabase
                    .from("products")
                    .select("*")
                    .order("id")
                    .then(({data})=>{

                        if(!data) return;

                        setProducts(data.map((p:any)=>({

                            id:p.id,
                            name:p.name,
                            category:p.category,
                            price:Number(p.price),
                            originalPrice:p.original_price ?? undefined,
                            image:p.image,
                            tag:p.tag ??undefined,
                            colors:p.colors,
                            description:p.description

                        })));

                    });

            }
        )
        .subscribe();

    return ()=>{

        supabase.removeChannel(channel);

    };

},[]);

  const addProduct = useCallback(async (product: Omit<Product,"id">)=>{

    const id = Date.now();

    await supabase
        .from("products")
        .insert({

            id,

            name:product.name,
            category:product.category,
            price:product.price,
            original_price:product.originalPrice,
            image:product.image,
            tag:product.tag,
            colors:product.colors,
            description:product.description

        });

},[]);

  const updateProduct = useCallback(async (product:Product)=>{

    await supabase
        .from("products")
        .update({

            name:product.name,
            category:product.category,
            price:product.price,
            original_price:product.originalPrice,
            image:product.image,
            tag:product.tag,
            colors:product.colors,
            description:product.description

        })
        .eq("id",product.id);

},[]);

  const deleteProduct = useCallback(async (id:number)=>{

    await supabase
        .from("products")
        .delete()
        .eq("id",id);

},[]);

  // Reservations
  async function reserveProducts(ids:number[]){

    const rows = ids.map(product_id => ({ product_id }));

    const {error}=await supabase
        .from("reserved_products")
        .upsert(rows)

    if(error){

        console.log(error);

    }else{

        setReservedIds(prev=>new Set([...prev,...ids]));

    }

}

  const releaseProduct = useCallback(async (id:number)=>{

    await supabase
        .from("reserved_products")
        .delete()
        .eq("product_id",id);

    setReservedIds(prev=>{

        const next=new Set(prev);

        next.delete(id);

        return next;

    });

},[]);

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
