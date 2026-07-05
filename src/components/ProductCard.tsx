import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Edit2, Trash2 } from "lucide-react";
import type { Product } from "../data/products";
import { useStore } from "../app/store";

interface Props {
  product: Product;
  onEdit?: (p: Product) => void;
}

export function ProductCard({ product, onEdit }: Props) {
  const { addToCart, isAdmin, deleteProduct, isReserved } = useStore();
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const reserved = isReserved(product.id);

  const handleAdd = () => {
    if (reserved) return;
    addToCart(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`group ${reserved ? "opacity-60" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        {reserved ? (
          <span className="absolute top-3 left-3 bg-[#8B4040] text-white text-[10px] tracking-widest uppercase px-3 py-1 font-[Lato]">
            Pausada
          </span>
        ) : product.tag ? (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1 font-[Lato]">
            {product.tag}
          </span>
        ) : null}

        {/* Wishlist */}
        {!isAdmin && (
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              hovered || wishlisted ? "opacity-100" : "opacity-0"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={wishlisted ? "#C9A84C" : "none"}
              stroke={wishlisted ? "#C9A84C" : "#FAF7F2"}
            />
          </button>
        )}

        {/* Admin controls */}
        {isAdmin && (
          <div className={`absolute top-3 right-3 flex gap-1 transition-all duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <button
              onClick={() => onEdit?.(product)}
              className="w-7 h-7 bg-accent/95 hover:bg-accent flex items-center justify-center transition-colors"
              title="Editar"
            >
              <Edit2 className="w-3 h-3 text-foreground" />
            </button>
            <button
              onClick={handleDelete}
              className="w-7 h-7 bg-red-500/95 hover:bg-red-600 flex items-center justify-center transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-3 h-3 text-white" />
            </button>
          </div>
        )}

        {/* Add to cart overlay (clients only) */}
        {!isAdmin && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-0 left-0 right-0"
              >
                <button
                  onClick={handleAdd}
                  disabled={reserved}
                  className={`w-full py-3 text-xs tracking-widest uppercase font-[Lato] transition-all duration-300 ${
                    reserved
                      ? "bg-[#8B4040]/80 text-white cursor-not-allowed"
                      : added
                      ? "bg-accent text-foreground"
                      : "bg-primary/90 hover:bg-primary text-primary-foreground"
                  }`}
                >
                  {reserved ? "No disponible" : added ? "✓ Añadido" : "Añadir al carrito"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Info */}
      <h3 className="font-['Playfair_Display'] text-base font-medium text-foreground mb-1">
        {product.name}
      </h3>
      <p className="font-[Lato] text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">
        {product.description}
      </p>

      {/* Colors */}
      <div className="flex gap-1.5 mb-2">
        {product.colors.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
              selectedColor === c ? "scale-125 border-foreground" : "border-border"
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-[Lato] text-sm font-semibold text-foreground">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="font-[Lato] text-xs text-muted-foreground line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </motion.div>
  );
}
