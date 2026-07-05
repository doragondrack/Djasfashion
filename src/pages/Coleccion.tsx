import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../app/store";
import { CATEGORIES } from "../data/products";
import type { Category } from "../data/products";

export default function Coleccion() {
  const { categoria } = useParams<{ categoria?: string }>();
  const { products, activeCategory, setActiveCategory } = useStore();

  // Sync URL param with store
  useEffect(() => {
    const cat = (categoria as Category) || "todos";
    if (CATEGORIES.find((c) => c.key === cat)) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("todos");
    }
  }, [categoria, setActiveCategory]);

  const filtered =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const currentLabel =
    CATEGORIES.find((c) => c.key === activeCategory)?.label ?? "Colección";

  return (
    <div className="pt-[88px] min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
            D´JAS Fashion
          </p>
          <h1 className="font-['Playfair_Display'] text-5xl font-semibold text-foreground">
            {currentLabel}
          </h1>
          <p className="font-[Lato] text-sm text-muted-foreground mt-2">
            {filtered.length} {filtered.length === 1 ? "prenda" : "prendas"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1 mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              to={cat.key === "todos" ? "/coleccion" : `/coleccion/${cat.key}`}
              className={`px-5 py-2.5 text-xs tracking-widest uppercase font-[Lato] transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-4 py-24 text-center">
              <p className="font-['Playfair_Display'] italic text-2xl text-muted-foreground">
                No hay prendas en esta categoría aún.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
