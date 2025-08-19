// src/components/NewDesignModal.jsx
import { useEffect, useState } from "react";

export default function NewDesignModal({ open, onClose, room, onApply, hasItems }) {
  const [width, setWidth] = useState(room.width);
  const [depth, setDepth] = useState(room.depth);
  const [color, setColor] = useState(room.color);
  const [shape, setShape] = useState(room.shape ?? "rect");
  const [notchW, setNotchW] = useState(room.notchW ?? 120);
  const [notchH, setNotchH] = useState(room.notchH ?? 120);
  const [notchCorner, setNotchCorner] = useState(room.notchCorner ?? "top-right");

  // when opening, sync with current room
  useEffect(() => {
    if (!open) return;
    setWidth(room.width);
    setDepth(room.depth);
    setColor(room.color);
    setShape(room.shape ?? "rect");
    setNotchW(room.notchW ?? 120);
    setNotchH(room.notchH ?? 120);
    setNotchCorner(room.notchCorner ?? "top-right");
  }, [open, room]);

  if (!open) return null;

  const input =
    "mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm shadow-sm " +
    "focus:border-[#5d7349] focus:ring-[#5d7349] focus:outline-none";

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/30 backdrop-blur-sm">
      <div className="mx-auto my-10 w-[min(560px,100%)] rounded-2xl border border-stone-200 bg-white shadow-xl">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <div>
            <div className="font-semibold" style={{ fontFamily: '"Playfair Display",serif' }}>
              New Design
            </div>
            <div className="text-xs text-stone-500">
              Set room size, shape, and colour scheme
            </div>
          </div>
          <button onClick={onClose} className="px-2 py-1 text-sm rounded-lg text-stone-500 hover:bg-stone-100">
            ✕
          </button>
        </div>

        {/* body */}
        <div className="grid gap-4 p-5">
          {hasItems && (
            <div className="p-3 text-xs border rounded-lg border-amber-300 bg-amber-50 text-amber-800">
              You have items in the current design. Starting a new design will clear them.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block">Width</span>
              <input type="number" className={input} value={width} onChange={e=>setWidth(+e.target.value || 0)} />
            </label>
            <label className="block">
              <span className="block">Depth</span>
              <input type="number" className={input} value={depth} onChange={e=>setDepth(+e.target.value || 0)} />
            </label>
          </div>

          <label className="block">
            <span className="block">Colour</span>
            <input type="color" className="w-full h-10 mt-1 border rounded-xl border-stone-300"
                   value={color} onChange={e=>setColor(e.target.value)} />
          </label>

          <label className="block">
            <span className="block">Shape</span>
            <select className={input} value={shape} onChange={e=>setShape(e.target.value)}>
              <option value="rect">Rectangle</option>
              <option value="lshape">L-shape</option>
            </select>
          </label>

          {shape === "lshape" && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="block">Notch Width</span>
                <input type="number" className={input} value={notchW} onChange={e=>setNotchW(+e.target.value || 0)} />
              </label>
              <label className="block">
                <span className="block">Notch Depth</span>
                <input type="number" className={input} value={notchH} onChange={e=>setNotchH(+e.target.value || 0)} />
              </label>
              <label className="block col-span-2">
                <span className="block">Corner</span>
                <select className={input} value={notchCorner} onChange={e=>setNotchCorner(e.target.value)}>
                  <option value="top-right">Top-Right</option>
                  <option value="top-left">Top-Left</option>
                  <option value="bottom-right">Bottom-Right</option>
                  <option value="bottom-left">Bottom-Left</option>
                </select>
              </label>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-stone-200">
          <button onClick={onClose} className="px-3 py-2 text-sm rounded-xl ring-1 ring-stone-200 hover:bg-stone-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onApply({ width, depth, color, shape, notchW, notchH, notchCorner });
            }}
            className="rounded-xl px-3 py-2 text-sm font-medium text-white shadow bg-gradient-to-r from-[#5d7349] to-[#4b5f3a] hover:from-[#6c8455] hover:to-[#576d44]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
