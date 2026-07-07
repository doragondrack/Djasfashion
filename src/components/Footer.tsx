import { Link } from "react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { LogoFull } from "./Logo";

const WA = "573166499500";

export function Footer() {
  return (
    <footer className="bg-[#2C1F14] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <LogoFull light size="sm" />
            <p className="font-[Lato] text-[#FAF7F2]/60 text-sm leading-relaxed mt-4">
              Alta costura femenina. Diseñada con detalle, cosida con amor, entregada con orgullo colombiano.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#FAF7F2]/40 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-[#FAF7F2]/40 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#FAF7F2]/40 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {[
            {
              title: "Colección",
              links: [
                { label: "Vestidos", to: "/coleccion/vestidos" },
                { label: "Blusas", to: "/coleccion/blusas" },
                { label: "Faldas", to: "/coleccion/faldas" },
                { label: "Conjuntos", to: "/coleccion/conjuntos" },
                { label: "Accesorios", to: "/coleccion/accesorios" },
              ],
            },
            {
              title: "Ayuda",
              links: [
                { label: "Tallas y Medidas", to: "/nosotros" },
                { label: "Envíos", to: "/nosotros" },
                { label: "Devoluciones", to: "/nosotros" },
                { label: "Cuidado de Prendas", to: "/nosotros" },
              ],
            },
            {
              title: "Nosotros",
              links: [
                { label: "Nuestra Historia", to: "/nosotros" },
                { label: "Proceso Artesanal", to: "/nosotros" },
                { label: "Sostenibilidad", to: "/nosotros" },
                { label: "Toda la Colección", to: "/coleccion" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-[Lato] text-[10px] tracking-[0.25em] uppercase text-accent mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="font-[Lato] text-sm text-[#FAF7F2]/60 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[Lato] text-xs text-[#FAF7F2]/40">
            © 2024 D´JAS Fashion. Todos los derechos reservados.
          </p>
          <p className="font-['Cormorant'] italic text-sm text-[#FAF7F2]/40">
            Hecho con amor en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
