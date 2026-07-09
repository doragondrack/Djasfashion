import { motion } from "motion/react";
import { Ruler, Truck, RefreshCw, Scissors } from "lucide-react";
import { LogoMark } from "../components/Logo";

const VALUES = [
  { icon: Scissors, title: "Corte Artesanal", desc: "Cada prenda se corta a mano por nuestras artesanas en Cartagena, garantizando precisión y calidad superior en cada costura." },
  { icon: Ruler, title: "Tallas Inclusivas", desc: "Diseñamos para todas las siluetas. Ofrecemos tallas XS a 3XL y ajustes personalizados sin costo adicional." },
  { icon: Truck, title: "Envío a Colombia", desc: "Despachos a todo el territorio nacional. Envío gratis en compras mayores a $380.000 COP. Llegada en 3-5 días hábiles." },
  { icon: RefreshCw, title: "Cambios Fáciles", desc: "Si la prenda no es lo que esperabas, te damos 15 días para cambio o devolución. Sin preguntas, sin complicaciones." },
];

const TEAM = [
  //{
   // name: "Sofía Herrera",
   // role: "Directora Creativa",
    //img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop&auto=format",
 // },
  {
    name: "Danivys jaimes cañizares",
    role: "Fundadora & Diseñadora",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&auto=format",
  },
  //{
    //name: "Valentina Cruz",
    //role: "Maestra Costurera",
    //img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&auto=format",
  //},
];

export default function Nosotros() {
  return (
    <div className="pt-[88px] bg-background">
      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden bg-[#2C1F14]">
        <img
          src="https://images.unsplash.com/photo-1566206091558-7f218b696731?w=1400&h=700&fit=crop&auto=format"
          alt="Taller D´JAS Fashion"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F14]/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <LogoMark size={52} color="#C9A84C" threadColor="rgba(250,247,242,0.7)" />
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-semibold text-[#FAF7F2] mt-6">
              Nuestra Historia
            </h1>
            <p className="font-[Lato] text-[#FAF7F2]/70 mt-3 tracking-widest text-xs uppercase">
              Nacida en Colombia · Cosida con amor
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
              Nuestra Historia
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground leading-tight mb-6">
              Nacida de una aguja,<br />un hilo y un sueño
            </h2>
            <div className="space-y-4 font-[Lato] text-muted-foreground leading-relaxed">
              <p>
                D´JAS Fashion nació en 2001 en el corazón de Barranquilla, de las manos de Danivys jaimes,
                gracias al don de Dios t al desarrollo academico es una diseñadora apasionada que soñaba
                con crear ropa que combinara elegancia, modestia y la identidad de la mujer colombiana.
              </p>
              <p>
                Comenzó con una máquina de coser heredada de su madre y un pequeño taller en el barrio
                Galan. Hoy, D´JAS viste a mujeres en toda Colombia que buscan prendas que las
                hagan sentir poderosas, elegantes y auténticas.
              </p>
              <p>
                Cada colección es un diálogo entre la tradición artesanal colombiana y el diseño
                contemporáneo. Usamos exclusivamente telas naturales, orgánicas y de comercio justo,
                porque creemos que la moda hermosa no debe costar el bienestar del planeta.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop&auto=format"
              alt="Proceso de diseño D´JAS Fashion"
              className="w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent p-6 hidden md:block">
              <p className="font-['Playfair_Display'] text-2xl font-semibold">25 años</p>
              <p className="font-[Lato] text-xs tracking-wide uppercase mt-1">vistiendo con elegancia</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
              Nuestros Valores
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground">
              Por qué elegirnos
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-card p-8"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="font-[Lato] text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
            Nuestro Equipo
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-foreground">
            Las manos detrás de cada prenda
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="font-[Lato] text-sm text-muted-foreground tracking-wide mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Size guide */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-semibold mb-6">
            Guía de Tallas
          </h2>
          <p className="font-[Lato] text-primary-foreground/70 text-sm mb-8">
            Todas las medidas están en centímetros. Si estás entre dos tallas, te recomendamos elegir la mayor.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full font-[Lato] text-sm">
              <thead>
                <tr className="border-b border-primary-foreground/20">
                  {["Talla", "Busto", "Cintura", "Cadera"].map((h) => (
                    <th key={h} className="py-3 px-4 text-accent tracking-widest text-xs uppercase text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "80–83", "62–65", "88–91"],
                  ["S", "84–87", "66–69", "92–95"],
                  ["M", "88–91", "70–73", "96–99"],
                  ["L", "92–96", "74–78", "100–104"],
                  ["XL", "97–102", "79–84", "105–110"],
                  ["2XL", "103–108", "85–91", "111–116"],
                  ["3XL", "109–115", "92–98", "117–123"],
                ].map(([size, ...vals]) => (
                  <tr key={size} className="border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors">
                    <td className="py-3 px-4 font-semibold text-accent">{size}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="py-3 px-4 text-primary-foreground/70">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
