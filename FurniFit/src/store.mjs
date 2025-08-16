// src/store.mjs
import { create } from "zustand";
import { catalogBySku } from "./data/catalog.mjs";

const uid = () => Math.random().toString(36).slice(2, 9);

const defaults = {
  table: { w: 120, h: 70, color: "#e7e5e4" },
  chair: { w: 50, h: 50, color: "#e2e8f0" },
  sofa: { w: 180, h: 90, color: "#e7e5e4" },
  armchair: { w: 75, h: 80, color: "#e5e7eb" },
  "coffee-table": { w: 110, h: 60, color: "#ede9dd" },
  bookshelf: { w: 90, h: 30, color: "#e5e7eb" },
  "tv-stand": { w: 160, h: 45, color: "#efeae2" },
  bed: { w: 160, h: 200, color: "#ede9fe" },
  nightstand: { w: 50, h: 45, color: "#f3f4f6" },
  wardrobe: { w: 180, h: 60, color: "#eef2ff" },
  desk: { w: 140, h: 70, color: "#e5e7eb" },
  "task-chair": { w: 55, h: 55, color: "#dbeafe" },
  "floor-lamp": { w: 40, h: 40, color: "#fef9c3" },
  rug: { w: 200, h: 140, color: "#f5f5f4" },
  plant: { w: 60, h: 60, color: "#dcfce7" },
};

export const useDesign = create((set, get) => ({
  // state
  loggedIn: true,
  room: { width: 600, depth: 400, color: "#f8fafc" },
  items: [],
  selectedId: null,

  // auth
  setLoggedIn: (v) => set({ loggedIn: v }),

  // selection
  select: (id) => set({ selectedId: id }),

  // room
  setRoom: (patch) => set({ room: { ...get().room, ...patch } }),

  // items
  addItem: (type) => {
    const d = defaults[type] || { w: 80, h: 80, color: "#e5e7eb" };
    const item = {
      id: uid(),
      type,
      x: 10 + Math.random() * 20,
      y: 10 + Math.random() * 20,
      w: d.w,
      h: d.h,
      color: d.color,
      shade: 0.2,
    };
    set({ items: [...get().items, item], selectedId: item.id });
  },

  // NEW: add from catalog by SKU (uses nicer defaults)
  addFromCatalog: (sku) => {
    const p = catalogBySku(sku);
    if (!p) return;
    const item = {
      id: uid(),
      type: p.type,
      x: 10 + Math.random() * 20,
      y: 10 + Math.random() * 20,
      w: p.w,
      h: p.h,
      color: p.color,
      shade: 0.15,
    };
    set({ items: [...get().items, item], selectedId: item.id });
  },

  updateItem: (id, patch) => {
    set({
      items: get().items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });
  },

  deleteSelected: () => {
    const id = get().selectedId;
    if (!id) return;
    set({ items: get().items.filter((it) => it.id !== id), selectedId: null });
  },

  setAllColor: (color) =>
    set({ items: get().items.map((it) => ({ ...it, color })) }),
  setAllShade: (shade) =>
    set({ items: get().items.map((it) => ({ ...it, shade })) }),

  scaleAll: (k) =>
    set({
      items: get().items.map((it) => ({
        ...it,
        w: Math.max(10, it.w * k),
        h: Math.max(10, it.h * k),
      })),
    }),

  // file I/O
  saveJSON: () => {
    const data = JSON.stringify(
      { room: get().room, items: get().items },
      null,
      2
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "furnifit-design.json";
    a.click();
    URL.revokeObjectURL(url);
  },

  loadJSON: async (file) => {
    const txt = await file.text();
    const parsed = JSON.parse(txt);
    set({
      room: parsed.room || get().room,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      selectedId: null,
    });
  },
}));
