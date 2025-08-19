import { useRef } from "react";
import { useDesign } from "../store";
import { useToasts } from "../toast.mjs";
import { scaleToFit } from "../utils";

export default function Sidebar({ onOpenCatalog }) {
  const {
    room, setRoom, items, selectedId, deleteSelected,
    setAllColor, setAllShade, scaleAll, saveJSON, loadJSON
  } = useDesign();
  const fileRef = useRef(null);
  const { push } = useToasts();

  const doScaleToFit = () => {
    if (!items.length) return;
    scaleAll(scaleToFit(items, room));
  };

  const inputCls =
    "mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm shadow-sm " +
    "focus:border-[#5d7349] focus:ring-[#5d7349] focus:outline-none";

  const primaryBtn =
    "rounded-xl px-3 py-2 text-sm font-medium text-white shadow " +
    "bg-gradient-to-r from-[#5d7349] to-[#4b5f3a] hover:from-[#6c8455] hover:to-[#576d44] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const dangerBtn =
    "rounded-xl px-3 py-2 text-sm font-medium text-white shadow " +
    "bg-gradient-to-r from-[#c2410c] to-[#9a3412] hover:from-[#d14a12] hover:to-[#b23d14] " +
    "disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const ghostBtn =
    "rounded-xl px-3 py-2 text-sm font-medium text-stone-900 ring-1 ring-stone-200 " +
    "bg-white/70 backdrop-blur hover:bg-white focus:outline-none focus-visible:ring-2";

  return (
    <div className="grid content-start gap-5 text-sm">
      {/* Room */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Room</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block">Width</span>
            <input type="number" value={room.width} onChange={(e)=>setRoom({ width:+e.target.value })} className={inputCls}/>
          </label>
          <label className="block">
            <span className="block">Depth</span>
            <input type="number" value={room.depth} onChange={(e)=>setRoom({ depth:+e.target.value })} className={inputCls}/>
          </label>
        </div>
        <label className="block mt-3">
          <span className="block">Colour</span>
          <input type="color" value={room.color} onChange={(e)=>setRoom({ color:e.target.value })}
                 className="w-full h-10 mt-1 border rounded-xl border-stone-300"/>
        </label>
      </section>

      {/* Items (simplified) */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Items</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenCatalog}
            className={primaryBtn}
          >
            Browse Catalog
          </button>
          <button onClick={deleteSelected} disabled={!selectedId} className={dangerBtn}>
            Delete Selected
          </button>
          <button onClick={doScaleToFit} className={ghostBtn}>
            Scale to Fit
          </button>
        </div>
      </section>

      {/* Hint */}
      <section>
        <div className="px-3 py-2 border rounded-xl border-stone-200 bg-stone-50 text-stone-600">
          {selectedId ? "Item selected — edit in Properties" : "No item selected"}
        </div>
      </section>

      {/* Bulk */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Bulk operations</h3>
        <label className="block">
          <span className="block">Colour (all)</span>
          <input type="color" onChange={(e)=>setAllColor(e.target.value)} className="w-full h-10 mt-1 border rounded-xl border-stone-300"/>
        </label>
        <label className="block mt-3">
          <span className="block">Shade (all)</span>
          <input type="range" min="0" max="1" step="0.05" defaultValue="0.2"
                 onChange={(e)=>setAllShade(+e.target.value)} className="w-full mt-2"/>
        </label>
        <label className="block mt-3">
          <span className="block">Scale (all)</span>
          <input type="number" step="0.1" defaultValue="1"
                 onChange={(e)=>scaleAll(+e.target.value || 1)} className={inputCls}/>
        </label>
      </section>

      {/* Files */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Files</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { saveJSON(); push({ title: "Design saved", desc: "JSON downloaded" }); }}
            className={primaryBtn}
          >
            Save
          </button>
          <button onClick={()=>fileRef.current?.click()} className={ghostBtn}>Load</button>
          <input
            ref={fileRef} type="file" accept="application/json" className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]; if (!file) return;
              try { await loadJSON(file); push({ title: "Design loaded", desc: file.name }); }
              catch { push({ title: "Load failed", tone: "danger" }); }
              e.target.value = "";
            }}
          />
        </div>
      </section>
    </div>
  );
}
