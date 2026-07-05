import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock, Eye, EyeOff, Upload, Edit2, Trash2, LogOut,
  Plus, X, RefreshCw, AlertTriangle, CheckCircle, Key,
} from "lucide-react";
import { useStore } from "../app/store";
import { verifyPassword, changePassword } from "../lib/auth";
import type { Product, Category } from "../data/products";
import { CATEGORIES } from "../data/products";
import { LogoFull } from "../components/Logo";

// ─── Login form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const ok = await verifyPassword(pass);
      if (ok) {
        onLogin();
      } else {
        setError("Contraseña incorrecta.");
      }
    } catch {
      setError("Error al verificar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-[88px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <LogoFull size="lg" />
          <p className="font-[Lato] text-muted-foreground text-sm mt-4">Panel de Administración</p>
        </div>

        <div className="bg-card border border-border p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-accent" />
            <h2 className="font-['Playfair_Display'] text-xl font-semibold">Acceso Editor</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-[Lato] text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-secondary border border-border px-4 py-3 pr-10 font-[Lato] text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <p className="font-[Lato] text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground py-3.5 font-[Lato] text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              {loading ? "Verificando…" : "Ingresar"}
            </button>
          </form>

          <p className="mt-5 font-[Lato] text-[10px] text-muted-foreground text-center leading-relaxed">
            La contraseña se almacena como hash SHA-256.
            <br />
            Nadie puede verla, ni inspeccionando el código.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Product form ─────────────────────────────────────────────────────────────
const BLANK: Omit<Product, "id"> = {
  name: "",
  category: "vestidos",
  price: 0,
  image: "",
  tag: "",
  colors: ["#4A1942"],
  description: "",
};

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Product | null;
  onSave: (data: Omit<Product, "id">, id?: number) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Product, "id">>(initial ? { ...initial } : { ...BLANK });
  const [colorInput, setColorInput] = useState("#C9A84C");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const addColor = () => {
    if (!form.colors.includes(colorInput)) set("colors", [...form.colors, colorInput]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.image.trim()) return;
    onSave(form, initial?.id);
  };

  return (
    <div className="bg-card border border-border">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="font-['Playfair_Display'] text-lg font-semibold">
          {initial ? "Editar Prenda" : "Nueva Prenda"}
        </h3>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Image preview */}
        {form.image && (
          <div className="w-full h-40 bg-muted overflow-hidden">
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <label className="label-style">URL de la Imagen *</label>
          <input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="input-style"
          />
        </div>

        <div>
          <label className="label-style">Nombre *</label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Vestido Primavera Dorada"
            required
            className="input-style"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-style">Categoría</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as Product["category"])}
              className="input-style"
            >
              {CATEGORIES.filter((c) => c.key !== "todos").map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-style">Precio ($) *</label>
            <input
              type="number"
              min={1}
              value={form.price || ""}
              onChange={(e) => set("price", Number(e.target.value))}
              placeholder="150"
              required
              className="input-style"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-style">Precio Original</label>
            <input
              type="number"
              min={1}
              value={form.originalPrice || ""}
              onChange={(e) => set("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="200"
              className="input-style"
            />
          </div>
          <div>
            <label className="label-style">Etiqueta</label>
            <input
              value={form.tag || ""}
              onChange={(e) => set("tag", e.target.value)}
              placeholder="Nuevo, Premium…"
              className="input-style"
            />
          </div>
        </div>

        <div>
          <label className="label-style">Descripción</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Materiales, silueta, ocasión…"
            rows={2}
            className="input-style resize-none"
          />
        </div>

        <div>
          <label className="label-style">Colores</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set("colors", form.colors.filter((x) => x !== c))}
                className="w-7 h-7 rounded-full border-2 border-border hover:border-red-400 relative group transition-colors"
                style={{ backgroundColor: c }}
                title="Clic para quitar"
              >
                <X className="w-2.5 h-2.5 text-white absolute inset-0 m-auto opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="w-11 h-10 border border-border cursor-pointer"
            />
            <button
              type="button"
              onClick={addColor}
              className="flex-1 border border-accent text-accent text-xs tracking-widest uppercase font-[Lato] hover:bg-accent hover:text-foreground transition-colors"
            >
              + Agregar color
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-[Lato] text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-3.5 h-3.5" />
            {initial ? "Guardar" : "Subir Prenda"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 border border-border text-muted-foreground hover:text-foreground font-[Lato] text-xs tracking-widest uppercase transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>

      <style>{`
        .label-style { display:block; font-family:Lato,sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted-foreground); margin-bottom:6px; }
        .input-style { display:block; width:100%; background:var(--secondary); border:1px solid var(--border); padding:10px 14px; font-family:Lato,sans-serif; font-size:14px; color:var(--foreground); transition:border-color .2s; }
        .input-style:focus { outline:none; border-color:var(--accent); }
        .input-style option { background:var(--card); }
      `}</style>
    </div>
  );
}

// ─── Change password modal ────────────────────────────────────────────────────
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) { setError("Las contraseñas no coinciden."); return; }
    if (next.length < 6) { setError("Mínimo 6 caracteres."); return; }
    setLoading(true);
    setError("");
    try {
      const ok = await verifyPassword(current);
      if (!ok) { setError("Contraseña actual incorrecta."); return; }
      await changePassword(next);
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1F14]/40 backdrop-blur-sm flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#FAF7F2] shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-accent" />
            <h3 className="font-['Playfair_Display'] text-lg font-semibold">Cambiar Contraseña</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="font-['Playfair_Display'] text-lg">¡Contraseña actualizada!</p>
            <p className="font-[Lato] text-xs text-muted-foreground mt-1">
              Solo tú conoces tu nueva contraseña — ni nosotros podemos verla.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {[
              { label: "Contraseña actual", val: current, set: setCurrent },
              { label: "Nueva contraseña", val: next, set: setNext },
              { label: "Confirmar nueva", val: confirm, set: setConfirm },
            ].map((f) => (
              <div key={f.label}>
                <label className="font-[Lato] text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                  {f.label}
                </label>
                <input
                  type="password"
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border px-4 py-3 font-[Lato] text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}

            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-3.5 h-3.5" />
                <p className="font-[Lato] text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground py-3 font-[Lato] text-xs tracking-widest uppercase transition-colors"
            >
              {loading ? "Guardando…" : "Actualizar Contraseña"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
function AdminPanel() {
  const {
    products, addProduct, updateProduct, deleteProduct,
    reservedIds, releaseProduct,
    isAdmin, adminLogout,
  } = useStore();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [filterCat, setFilterCat] = useState<Category>("todos");
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (data: Omit<Product, "id">, id?: number) => {
    if (id) {
      updateProduct({ ...data, id });
      showToast("Prenda actualizada");
    } else {
      addProduct(data);
      showToast("Prenda subida");
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) {
      deleteProduct(p.id);
      showToast("Prenda eliminada");
    }
  };

  const handleRelease = (id: number) => {
    releaseProduct(id);
    showToast("Prenda liberada — ya está disponible");
  };

  const filtered =
    filterCat === "todos" ? products : products.filter((p) => p.category === filterCat);

  return (
    <div className="min-h-screen bg-background pt-[88px]">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 shadow-lg font-[Lato] text-sm flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-accent" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change password modal */}
      {changePwOpen && <ChangePasswordModal onClose={() => setChangePwOpen(false)} />}

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-[Lato] text-[10px] tracking-[0.3em] text-accent uppercase mb-1">
              Panel de Administración
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl font-semibold">D´JAS Editor</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setChangePwOpen(true)}
              className="flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground px-4 py-2.5 font-[Lato] text-xs tracking-widest uppercase transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              Cambiar contraseña
            </button>
            <button
              onClick={() => { setEditing(null); setFormOpen(true); }}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-4 py-2.5 font-[Lato] text-xs tracking-widest uppercase transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Nueva Prenda
            </button>
            <button
              onClick={adminLogout}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 font-[Lato] text-xs tracking-widest uppercase transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total prendas", value: products.length },
            { label: "Disponibles", value: products.filter((p) => !reservedIds.has(p.id)).length },
            { label: "Pausadas", value: reservedIds.size },
            { label: "Categorías activas", value: new Set(products.map((p) => p.category)).size },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-5">
              <p className="font-['Playfair_Display'] text-3xl font-semibold text-foreground">{s.value}</p>
              <p className="font-[Lato] text-xs text-muted-foreground tracking-wide uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Product form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <ProductForm
                initial={editing}
                onSave={handleSave}
                onCancel={() => { setFormOpen(false); setEditing(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCat(cat.key)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-[Lato] transition-all ${
                filterCat === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products table */}
        <div className="border border-border overflow-hidden">
          <table className="w-full font-[Lato] text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                {["Prenda", "Categoría", "Precio", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-xs tracking-widest uppercase text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const reserved = reservedIds.has(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-border last:border-0 transition-colors ${
                      reserved ? "bg-red-50/50" : "hover:bg-secondary/50"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-muted overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          {p.tag && (
                            <span className="text-[10px] tracking-widest uppercase text-accent">{p.tag}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">{p.category}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-foreground">${p.price}</span>
                      {p.originalPrice && (
                        <span className="text-muted-foreground line-through ml-2 text-xs">${p.originalPrice}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] tracking-widest uppercase px-2 py-1 font-[Lato] ${
                          reserved
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {reserved ? "Pausada" : "Disponible"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {reserved && (
                          <button
                            onClick={() => handleRelease(p.id)}
                            title="Liberar prenda"
                            className="w-7 h-7 bg-green-500/10 hover:bg-green-500/20 text-green-600 flex items-center justify-center transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(p)}
                          title="Editar"
                          className="w-7 h-7 bg-accent/15 hover:bg-accent/30 text-foreground flex items-center justify-center transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          title="Eliminar"
                          className="w-7 h-7 bg-red-500/10 hover:bg-red-500/20 text-red-600 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground font-['Playfair_Display'] italic">
                    No hay prendas en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Page entry ───────────────────────────────────────────────────────────────
export default function Admin() {
  const { isAdmin, adminLogin } = useStore();

  if (isAdmin) return <AdminPanel />;
  return <LoginForm onLogin={adminLogin} />;
}
