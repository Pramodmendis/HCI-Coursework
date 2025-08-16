import { useToasts } from "../toast.mjs";

const tones = {
  success: { ring: "ring-emerald-500/30", dot: "bg-emerald-500" },
  info:    { ring: "ring-sky-500/30",     dot: "bg-sky-500" },
  danger:  { ring: "ring-rose-500/30",    dot: "bg-rose-500" },
};

export default function Toaster() {
  const { toasts, dismiss } = useToasts();
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[1000] space-y-2">
      {toasts.map(t => {
        const tone = tones[t.tone] ?? tones.success;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex min-w-[260px] items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-md ring-1 ${tone.ring}`}
          >
            <span className={`mt-1 h-2 w-2 rounded-full ${tone.dot}`} />
            <div className="flex-1">
              <div className="text-sm font-medium">{t.title}</div>
              {t.desc && <div className="mt-0.5 text-xs text-stone-600">{t.desc}</div>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="rounded-md px-1 text-xs text-stone-500 hover:bg-stone-100"
            >✕</button>
          </div>
        );
      })}
    </div>
  );
}
