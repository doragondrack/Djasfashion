import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { ShoppingBag, Menu, X, Lock, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LogoFull } from "./Logo";
import { useStore } from "../app/store";
import { CATEGORIES } from "../data/products";

export function Navbar() {
  const { cartCount, setCartOpen, isAdmin, adminLogout } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Only use the transparent/light effect on the home page (hero behind navbar).
  // On all other pages the navbar is always solid so the logo stays visible.
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    // Reset scroll state when changing pages so navbar is always correct
    setScrolled(window.scrollY > 50);
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent ? "bg-transparent" : "bg-[#FAF7F2]/97 backdrop-blur-sm shadow-sm"
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-primary text-primary-foreground text-center py-1.5 text-[10px] tracking-[0.25em] font-[Lato] uppercase">
          Envío gratis en compras mayores a $150 · Telas éticas · Hecho en Colombia
        </div>

        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <LogoFull size="md" light={transparent} />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {CATEGORIES.filter((c) => c.key !== "todos").map((cat) => (
              <NavLink
                key={cat.key}
                to={`/coleccion/${cat.key}`}
                className={({ isActive }) =>
                  `text-sm font-[Lato] tracking-wider uppercase transition-colors relative group ${
                    isActive
                      ? transparent ? "text-accent" : "text-primary"
                      : transparent
                      ? "text-[#FAF7F2]/80 hover:text-[#FAF7F2]"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {cat.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                `text-sm font-[Lato] tracking-wider uppercase transition-colors relative group ${
                  isActive
                    ? transparent ? "text-accent" : "text-primary"
                    : transparent
                    ? "text-[#FAF7F2]/80 hover:text-[#FAF7F2]"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Nosotros
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/admin"
                  className="font-[Lato] text-[10px] tracking-[0.2em] uppercase text-accent border border-accent px-3 py-1.5 hover:bg-accent hover:text-foreground transition-colors"
                >
                  Editor
                </Link>
                <button
                  onClick={adminLogout}
                  title="Cerrar sesión"
                  className={`transition-colors ${transparent ? "text-[#FAF7F2]/70 hover:text-[#FAF7F2]" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/admin")}
                title="Panel de administración"
                className={`hidden md:flex transition-colors ${
                  transparent ? "text-[#FAF7F2]/50 hover:text-[#FAF7F2]/80" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <button
              className="relative transition-colors"
              style={{ color: transparent ? "#FAF7F2" : undefined }}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              className="lg:hidden transition-colors"
              style={{ color: transparent ? "#FAF7F2" : undefined }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-[80px] left-0 right-0 z-40 bg-[#FAF7F2] border-b border-border shadow-lg lg:hidden"
          >
            <div className="flex flex-col py-3">
              {CATEGORIES.filter((c) => c.key !== "todos").map((cat) => (
                <NavLink
                  key={cat.key}
                  to={`/coleccion/${cat.key}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-3 font-[Lato] text-sm tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                >
                  {cat.label}
                </NavLink>
              ))}
              <NavLink
                to="/nosotros"
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 font-[Lato] text-sm tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                Nosotros
              </NavLink>
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 font-[Lato] text-sm tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" /> Administrador
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
