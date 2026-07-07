import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Star, Mail, Package } from "lucide-react";
import { useStore } from "../app/store";
import { ProductCard } from "../components/ProductCard";

const TESTIMONIALS = [
  {
    name: "María Esperanza",
    city: "Bogotá",
    text: "Encontré ropa que combina elegancia y comodidad perfectamente. El servicio fue impecable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Ana Lucía Torres",
    city: "Medellín",
    text: "El Conjunto Alma Pura fue perfecto para mi reunión. Elegante, cómodo y muy bien confeccionado.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Daniela Restrepo",
    city: "Cali",
    text: "La calidad de las telas es extraordinaria. Cada prenda llega perfectamente empacada.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&auto=format",
  },
];

export default function Home() {
  const { products } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Show 8 featured products on home
  const featured = products.slice(0, 8);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2C1F14]">
          <img
            src="https://lh3.googleusercontent.com/d/1uu_AkefLBoqbiEaJSQtAb6DrDLl1_FlZ"
            alt="D´JAS Fashion — Alta costura femenina"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F14] via-[#2C1F14]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1F14]/55 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-48 w-full grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-accent font-[Lato] tracking-[0.35em] text-xs uppercase mb-5">
              Nueva Colección 2026
            </p>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-semibold text-[#FAF7F2] leading-[1.1] mb-6">
              Elegancia que
              <br />
              <em className="italic text-accent">te define</em>
            </h1>
            <p className="font-[Lato] text-[#FAF7F2]/80 text-lg leading-relaxed mb-10 max-w-md">
              Moda femenina de autor. Prendas diseñadas con precisión artesanal, telas éticas y
              una silueta que celebra a la mujer contemporánea.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/coleccion"
                className="group bg-accent hover:bg-accent/90 text-foreground font-[Lato] text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 flex items-center gap-3"
              >
                Ver Colección
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/nosotros"
                className="border border-[#FAF7F2]/40 hover:border-[#FAF7F2] text-[#FAF7F2] font-[Lato] text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
              >
                Nuestra Historia
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="hidden lg:flex flex-col justify-end gap-8 pb-4"
          >
            {[
              { n: "12.000+", label: "Prendas Vendidas" },
              { n: "10.000+", label: "Diseños Exclusivos" },
              { n: "5,000+", label: "Clientas Felices" },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-4">
                <span className="font-['Playfair_Display'] text-3xl text-accent">{s.n}</span>
                <span className="font-[Lato] text-[#FAF7F2]/60 text-sm tracking-wide uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#FAF7F2]/60 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-primary overflow-hidden py-4">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="font-[Lato] tracking-[0.3em] text-xs text-primary-foreground/80 uppercase px-3"
            >
              NUEVA COLECCIÓN · D´JAS FASHION · ALTA COSTURA FEMENINA · HECHO EN COLOMBIA ·&nbsp;
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </div>

      {/* ── Editorial ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-2 items-stretch">
          <div className="relative overflow-hidden bg-muted group aspect-[3/4] lg:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=900&fit=crop&auto=format"
              alt="Colección editorial D´JAS Fashion"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F14]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-[Lato] text-xs tracking-[0.25em] text-accent uppercase mb-2">
                Colección Otoño 2026
              </p>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#FAF7F2] italic">
                "Diseñada para<br />brillar cada día"
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative overflow-hidden bg-muted group flex-1 min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format"
                alt="Colección D´JAS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-5 left-5">
                <span className="bg-accent text-foreground text-[10px] tracking-widest uppercase px-3 py-1 font-[Lato]">
                  Más Vendido
                </span>
              </div>
            </div>
            <div className="bg-card p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-foreground leading-tight mb-4">
                  Más que moda,<br />una identidad
                </h2>
                <p className="font-[Lato] text-muted-foreground leading-relaxed text-sm">
                  Cada pieza de D´JAS Fashion nace del cuidado por el detalle. Diseñamos para
                  la mujer que entiende que vestirse bien es una forma de respetarse, con belleza,
                  comodidad y una silueta impecable.
                </p>
              </div>
              <Link
                to="/nosotros"
                className="mt-6 self-start group flex items-center gap-2 font-[Lato] text-sm tracking-wider uppercase text-primary hover:text-accent transition-colors"
              >
                Conocer nuestra historia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
              Destacados
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-foreground">
              Prendas Favoritas
            </h2>
          </div>
          <Link
            to="/coleccion"
            className="group flex items-center gap-2 font-[Lato] text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            Ver todo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Brand Strip ── */}
      <section className="relative py-28 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1566206091558-7f218b696731?w=1200&h=600&fit=crop&auto=format"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] italic text-4xl md:text-6xl text-primary-foreground leading-tight mb-6">
            "La moda es el lenguaje<br />silencioso de quien sabe quién es."
          </h2>
          <p className="font-[Lato] text-accent tracking-widest text-sm uppercase">
            — D´JAS Fashion, Colombia
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            {[
              { label: "Telas Éticas", desc: "100% sostenibles" },
              { label: "Hecho en Colombia", desc: "Manos artesanas" },
              { label: "Diseño Exclusivo", desc: "En cada prenda" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-['Playfair_Display'] text-xl text-accent mb-1">{item.label}</p>
                <p className="font-[Lato] text-primary-foreground/60 text-xs tracking-wide uppercase">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-2">Testimonios</p>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground">
              Lo que dicen nuestras clientas
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="bg-card p-8"
              >
                <div className="flex mb-4 gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-['Cormorant'] italic text-lg text-foreground leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-muted" />
                  <div>
                    <p className="font-[Lato] text-sm font-bold text-foreground">{t.name}</p>
                    <p className="font-[Lato] text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground mb-4">
              Sé la primera en conocer<br />las nuevas colecciones
            </h2>
            <p className="font-[Lato] text-muted-foreground leading-relaxed">
              Suscríbete y recibe acceso anticipado a lanzamientos, descuentos exclusivos y consejos
              de estilo. Como bienvenida, un 10% en tu primera compra.
            </p>
          </div>
          <div>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-primary-foreground p-8 text-center"
              >
                <Package className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-['Playfair_Display'] text-xl mb-2">¡Bienvenida!</p>
                <p className="font-[Lato] text-sm text-primary-foreground/80">
                  Revisa tu correo para tu código de descuento.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="flex-1 bg-card border border-border px-5 py-4 font-[Lato] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-4 font-[Lato] text-xs tracking-widest uppercase transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  Suscribirme
                </button>
              </form>
            )}
            <p className="mt-3 font-[Lato] text-xs text-muted-foreground">
              Sin spam. Solo moda y estilo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
