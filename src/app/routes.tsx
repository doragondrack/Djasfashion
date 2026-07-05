import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";
import Coleccion from "../pages/Coleccion";
import Nosotros from "../pages/Nosotros";
import Admin from "../pages/Admin";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-[88px] px-6 text-center gap-4">
      <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase">404</p>
      <h1 className="font-['Playfair_Display'] text-5xl font-semibold text-foreground">
        Página no encontrada
      </h1>
      <a
        href="/"
        className="mt-4 bg-primary text-primary-foreground px-8 py-3 font-[Lato] text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "coleccion", Component: Coleccion },
      { path: "coleccion/:categoria", Component: Coleccion },
      { path: "nosotros", Component: Nosotros },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);
