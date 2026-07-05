import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, MessageCircle, AlertTriangle } from "lucide-react";
import { useStore } from "../app/store";

const WA = "573001234567";

export function CartDrawer() {
  const {
    cartOpen, setCartOpen,
    cartItems, cartTotal,
    removeFromCart, updateQty, clearCart,
    reservedIds, reserveProducts,
  } = useStore();

  const [warning, setWarning] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const availableItems = cartItems.filter((i) => !reservedIds.has(i.id));
  const blockedItems = cartItems.filter((i) => reservedIds.has(i.id));

  const sendToWhatsApp = () => {
    if (availableItems.length === 0) {
      setWarning("Todas las prendas de tu carrito ya fueron pedidas por otra persona.");
      return;
    }

    if (blockedItems.length > 0) {
      setWarning(
        `"${blockedItems.map((i) => i.name).join('", "')}" ya ${
          blockedItems.length === 1 ? "fue pedida" : "fueron pedidas"
        } por otra persona y se excluirá${blockedItems.length > 1 ? "n" : ""} de tu pedido.`
      );
    }

    const lines = availableItems.map(
      (i) => `• ${i.name} (x${i.quantity}) — $${(i.price * i.quantity).toFixed(0)} USD`
    );
    const subtotal = availableItems.reduce((s, i) => s + i.price * i.quantity, 0);

    const msg = [
      "¡Hola! Me gustaría hacer el siguiente pedido en D´JAS Fashion:",
      "",
      ...lines,
      "",
      `*Total: $${subtotal.toFixed(2)} USD*`,
      "",
      "¿Podrían confirmar disponibilidad y coordinar el envío? 🙏",
    ].join("\n");

    // Mark ordered items as reserved so others can't order them simultaneously
    reserveProducts(availableItems.map((i) => i.id));

    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    clearCart();
    setTimeout(() => { setSent(false); setWarning(null); setCartOpen(false); }, 3000);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C1F14]/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#FAF7F2] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-['Playfair_Display'] text-xl font-semibold">Tu Carrito</h2>
                <span className="font-[Lato] text-sm text-muted-foreground">
                  ({cartItems.length})
                </span>
              </div>
              <button
                onClick={() => { setCartOpen(false); setWarning(null); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <MessageCircle className="w-12 h-12 text-[#25D366]" />
                  <p className="font-['Playfair_Display'] text-xl">¡Pedido enviado!</p>
                  <p className="font-[Lato] text-sm text-muted-foreground">
                    Te hemos redirigido a WhatsApp. Espera la confirmación.
                  </p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="w-10 h-10 text-muted" />
                  <p className="font-['Playfair_Display'] italic text-xl text-muted-foreground">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 bg-primary text-primary-foreground px-6 py-3 font-[Lato] text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
                  >
                    Ver Colección
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item) => {
                    const blocked = reservedIds.has(item.id);
                    return (
                      <div
                        key={`${item.id}-${item.selectedColor}`}
                        className={`flex gap-4 ${blocked ? "opacity-50" : ""}`}
                      >
                        <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {blocked && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 font-[Lato] tracking-wide uppercase">
                                Reservada
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-['Playfair_Display'] text-sm font-medium truncate">
                            {item.name}
                          </h4>
                          {blocked && (
                            <p className="font-[Lato] text-[10px] text-red-500 mt-0.5">
                              Ya fue pedida por alguien más
                            </p>
                          )}
                          <div
                            className="w-3 h-3 rounded-full border border-border mt-1 mb-2"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() => updateQty(item.id, item.selectedColor, -1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-[Lato] text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.selectedColor, 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-[Lato] text-sm font-semibold">
                              ${(item.price * item.quantity).toFixed(0)}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedColor)}
                            className="mt-1 font-[Lato] text-[10px] text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wide"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {!sent && cartItems.length > 0 && (
              <div className="px-8 py-6 border-t border-border space-y-3">
                {/* Warning message */}
                {warning && (
                  <div className="bg-amber-50 border border-amber-200 p-3 flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="font-[Lato] text-xs text-amber-700 leading-relaxed">{warning}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="font-[Lato] text-sm uppercase tracking-wide text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-['Playfair_Display'] text-xl font-semibold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                {blockedItems.length > 0 && !warning && (
                  <p className="font-[Lato] text-[10px] text-amber-600 text-center">
                    {blockedItems.length} prenda{blockedItems.length > 1 ? "s" : ""} en tu carrito ya{" "}
                    {blockedItems.length > 1 ? "fueron reservadas" : "fue reservada"} por otra persona
                  </p>
                )}

                <button
                  onClick={sendToWhatsApp}
                  disabled={availableItems.length === 0}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5a] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 font-[Lato] text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir por WhatsApp
                </button>

                {availableItems.length < cartItems.length && availableItems.length > 0 && (
                  <p className="font-[Lato] text-[10px] text-muted-foreground text-center">
                    Solo se enviarán las {availableItems.length} prendas disponibles
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
