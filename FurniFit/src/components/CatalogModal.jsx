import { useMemo, useState } from "react";
import { catalog, categories } from "../data/catalog.mjs";
import CatalogCard from "./CatalogCard";

export default function CatalogModal({ open, onClose, onAdd }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return catalog.filter((it) => {
      const okCat = cat === "All" || it.category === cat;
      const okQ =
        !ql ||
        `${it.name} ${it.desc} ${it.category}`.toLowerCase().includes(ql);
      return okCat && okQ;
    });
  }, [q, cat]);

  if (!open) return null;

  return (
    // overlay scrolls if content is taller than viewport
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/30 backdrop-blur-sm">
      {/* centered panel, capped height; inside is a flex column */}
      <div className="mx-auto my-8 w-[min(1100px,100%)] rounded-2xl border border-stone-200 bg-white shadow-xl flex max-h-[85vh] flex-col">
        {/* header (stays at top of the panel) */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-stone-200">
          <div>
            <div
              className="font-semibold"
              style={{ fontFamily: '"Playfair Display",serif' }}
            >
              Furniture Catalog
            </div>
            <div className="text-xs text-stone-500">
              Browse and add items to your layout
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 text-sm rounded-lg text-stone-500 hover:bg-stone-100"
          >
            ✕
          </button>
        </div>

        {/* controls (non-scrolling header area) */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search furniture (e.g., sofa, oak, bedside)…"
            className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-[#5d7349] focus:ring-[#5d7349] focus:outline-none md:w-72"
          />
          <div className="flex flex-wrap gap-2 ml-auto">
            <button
              onClick={() => setCat("All")}
              className={`rounded-xl px-3 py-1 text-sm ${
                cat === "All"
                  ? "bg-stone-900 text-white"
                  : "bg-stone-200 hover:bg-stone-300"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-xl px-3 py-1 text-sm ${
                  cat === c
                    ? "bg-stone-900 text-white"
                    : "bg-stone-200 hover:bg-stone-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* scrollable grid area */}
        <div className="flex-1 min-h-0 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((it) => (
              <CatalogCard key={it.sku} item={it} onAdd={onAdd} />
            ))}
            {filtered.length === 0 && (
              <div className="p-6 text-center border col-span-full rounded-xl border-stone-200 bg-stone-50 text-stone-600">
                No items match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
