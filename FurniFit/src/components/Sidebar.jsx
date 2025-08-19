import { useRef } from "react";
import { useDesign } from "../store";
import { useToasts } from "../toast.mjs";
import { scaleToFit } from "../utils";
import ItemProperties from "./ItemProperties"; // keep if you created it

export default function Sidebar() {
  const {
    room, setRoom, items, selectedId, deleteSelected,
    setAllColor, setAllShade, scaleAll, saveJSON, loadJSON,
    duplicateSelected, bringToFront, sendToBack, clearAll,
  } = useDesign();

  const fileRef = useRef(null);
  const { push } = useToasts();

  const doScaleToFit = () => {
    if (!items.length) return;
    scaleAll(scaleToFit(items, room));
  };

  const input =
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
      {/* Room size & color */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Room</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block">Width</span>
            <input type="number" value={room.width}
              onChange={(e)=>setRoom({ width:+e.target.value || 0 })}
              className={input}/>
          </label>
          <label className="block">
            <span className="block">Depth</span>
            <input type="number" value={room.depth}
              onChange={(e)=>setRoom({ depth:+e.target.value || 0 })}
              className={input}/>
          </label>
        </div>
        <label className="block mt-3">
          <span className="block">Colour</span>
          <input type="color" value={room.color}
            onChange={(e)=>setRoom({ color:e.target.value })}
            className="w-full h-10 mt-1 border rounded-xl border-stone-300"/>
        </label>
      </section>

      {/* NEW: Room shape */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Room Shape</h3>

        <label className="block">
          <span className="block">Shape</span>
          <select
            className={input}
            value={room.shape}
            onChange={(e)=>setRoom({ shape: e.target.value })}
          >
            <option value="rect">Rectangle</option>
            <option value="lshape">L-shape</option>
          </select>
        </label>

        {room.shape === "lshape" && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            <label className="block">
              <span className="block">Notch Width</span>
              <input type="number" className={input} value={room.notchW}
                onChange={(e)=>setRoom({ notchW: +e.target.value || 0 })}/>
            </label>
            <label className="block">
              <span className="block">Notch Depth</span>
              <input type="number" className={input} value={room.notchH}
                onChange={(e)=>setRoom({ notchH: +e.target.value || 0 })}/>
            </label>
            <label className="block col-span-2">
              <span className="block">Corner</span>
              <select
                className={input}
                value={room.notchCorner}
                onChange={(e)=>setRoom({ notchCorner: e.target.value })}
              >
                <option value="top-right">Top-Right</option>
                <option value="top-left">Top-Left</option>
                <option value="bottom-right">Bottom-Right</option>
                <option value="bottom-left">Bottom-Left</option>
              </select>
            </label>
            <p className="col-span-2 text-xs text-stone-500">
              Tip: keep notch smaller than room size (we clamp it if too large).
            </p>
          </div>
        )}
      </section>

      {/* Selection tools */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Selection</h3>
        {!selectedId ? (
          <div className="px-3 py-2 border rounded-xl border-stone-200 bg-stone-50 text-stone-600">
            No item selected
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button onClick={useDesign.getState().duplicateSelected} className={primaryBtn}>Duplicate</button>
            <button onClick={deleteSelected} className={dangerBtn}>Delete</button>
            <button onClick={useDesign.getState().bringToFront} className={ghostBtn}>Bring to Front</button>
            <button onClick={useDesign.getState().sendToBack} className={ghostBtn}>Send to Back</button>
          </div>
        )}
      </section>

      {/* Properties (per item) */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Properties</h3>
        <ItemProperties />
      </section>

      {/* Layout helper */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Layout</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={doScaleToFit} className={ghostBtn}>Scale to Fit</button>
          <button onClick={clearAll} className={ghostBtn}>Clear All</button>
        </div>
      </section>

      {/* Bulk */}
      <section>
        <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Bulk operations</h3>
        <label className="block">
          <span className="block">Colour (all)</span>
          <input type="color" onChange={(e)=>setAllColor(e.target.value)}
            className="w-full h-10 mt-1 border rounded-xl border-stone-300"/>
        </label>
        <label className="block mt-3">
          <span className="block">Shade (all)</span>
          <input type="range" min="0" max="1" step="0.05" defaultValue="0.2"
            onChange={(e)=>setAllShade(+e.target.value)} className="w-full mt-2"/>
        </label>
        <label className="block mt-3">
          <span className="block">Scale (all)</span>
          <input type="number" step="0.1" defaultValue="1"
            onChange={(e)=>scaleAll(+e.target.value || 1)} className={input}/>
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
