import { create } from "zustand";
let id = 0;
export const useToasts = create((set) => ({
  toasts: [],
  push: ({ title, desc = "", tone = "success", timeout = 2500 }) => {
    const tid = ++id;
    set((s) => ({ toasts: [...s.toasts, { id: tid, title, desc, tone }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== tid) })),
      timeout
    );
  },
  dismiss: (tid) =>
    set((s) => ({ toasts: s.toasts.filter((x) => x.id !== tid) })),
}));
