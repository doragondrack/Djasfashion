export type Category = "todos" | "vestidos" | "blusas" | "faldas" | "conjuntos" | "accesorios";

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "todos">;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  colors: string[];
  description: string;
}

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "vestidos", label: "Vestidos" },
  { key: "blusas", label: "Blusas" },
  { key: "faldas", label: "Faldas" },
  { key: "conjuntos", label: "Conjuntos" },
  { key: "accesorios", label: "Accesorios" },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vestido Oración Alba",
    category: "vestidos",
    price: 189,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&auto=format",
    tag: "Nuevo",
    colors: ["#F5F0E8", "#C9A84C"],
    description: "Vestido de lino fluido, elegante para toda ocasión.",
  },
  {
    id: 2,
    name: "Vestido Catedral",
    category: "vestidos",
    price: 245,
    originalPrice: 289,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&auto=format",
    colors: ["#4A1942", "#2C1F14"],
    description: "Silueta estructurada en tono ciruela para eventos formales.",
  },
  {
    id: 3,
    name: "Blusa Bendición",
    category: "blusas",
    price: 95,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&auto=format",
    tag: "Nuevo",
    colors: ["#FAF7F2", "#C9A84C"],
    description: "Blusa en gasa liviana con bordados dorados en el cuello.",
  },
  {
    id: 4,
    name: "Blusa Paz Interior",
    category: "blusas",
    price: 85,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&auto=format",
    colors: ["#FFFFFF", "#E8DDD0"],
    description: "Blusa de lino natural, suelta y fresca para el día a día.",
  },
  {
    id: 5,
    name: "Falda Dorada",
    category: "faldas",
    price: 125,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&auto=format",
    colors: ["#4A1942", "#8B7355"],
    description: "Falda midi plisada con caída elegante y tela satinada.",
  },
  {
    id: 6,
    name: "Falda Gracia",
    category: "faldas",
    price: 110,
    originalPrice: 135,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format",
    colors: ["#F0E8DC", "#C9A84C"],
    description: "Falda cruzada en tonos cálidos con abertura lateral discreta.",
  },
  {
    id: 7,
    name: "Conjunto Alma Pura",
    category: "conjuntos",
    price: 215,
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&h=800&fit=crop&auto=format",
    tag: "Exclusivo",
    colors: ["#FAF7F2", "#E8DDD0"],
    description: "Set de pantalón palazzo y blusa fluida en lino crudo.",
  },
  {
    id: 8,
    name: "Conjunto Luz",
    category: "conjuntos",
    price: 195,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop&auto=format",
    colors: ["#C9A84C", "#4A1942"],
    description: "Blazer estructurado y falda a juego, poder y elegancia.",
  },
  {
    id: 9,
    name: "Chal Dorado",
    category: "accesorios",
    price: 145,
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop&auto=format",
    colors: ["#C9A84C", "#FAF7F2"],
    description: "Chal de seda natural en dorado, accesorio ideal para cualquier look.",
  },
  {
    id: 10,
    name: "Vestido Encaje Premium",
    category: "vestidos",
    price: 275,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&auto=format",
    tag: "Premium",
    colors: ["#FAF7F2", "#C9A84C", "#4A1942"],
    description: "Vestido de encaje con manga tres cuartos y cintura marcada.",
  },
  {
    id: 11,
    name: "Blusa Cielo",
    category: "blusas",
    price: 92,
    image: "https://images.unsplash.com/photo-1545296664-39db72996d6a?w=600&h=800&fit=crop&auto=format",
    colors: ["#A8C5DA", "#FAF7F2"],
    description: "Blusa esencial de algodón peinado, básica irrenunciable.",
  },
  {
    id: 12,
    name: "Cinturón Dorado",
    category: "accesorios",
    price: 65,
    image: "https://images.unsplash.com/photo-1594938298603-a3554582e2b?w=600&h=800&fit=crop&auto=format",
    colors: ["#C9A84C", "#2C1F14"],
    description: "Cinturón en cuero legítimo con hebilla dorada exclusiva.",
  },
];
