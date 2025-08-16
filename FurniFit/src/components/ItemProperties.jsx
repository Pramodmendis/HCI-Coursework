import { useDesign } from "../store";

export default function ItemProperties() {
  const { items, selectedId, updateItem } = useDesign();
  const it = items.find(x => x.id === selectedId);

  const inputCls =
    "mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm shadow-sm " +
    "focus:border-[#5d7349] focus:ring-[#5d7349] focus:outline-none";

  return (
    <section>
      <h3 className="mb-2 text-[12px] font-semibold tracking-widest text-stone-500 uppercase">Properties</h3>
      {!it ? (
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-stone-600">No item selected</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 text-xs text-stone-500">
            Selected: <span className="font-medium">{it.type}</span>
          </div>
          {["x","y","w","h"].map(k => (
            <label key={k} className="block">
              <span className="block">{k.toUpperCase()}</span>
              <input type="number" className={inputCls} value={it[k]} onChange={(e)=>updateItem(it.id,{[k]:+e.target.value})}/>
            </label>
          ))}
          <label className="col-span-2 block">
            <span className="block">Colour</span>
            <input type="color" className="mt-1 h-10 w-full rounded-xl border border-stone-300"
                   value={it.color} onChange={(e)=>updateItem(it.id,{ color:e.target.value })}/>
          </label>
          <label className="col-span-2 block">
            <span className="block">Shade</span>
            <input type="range" min="0" max="1" step="0.05" className="mt-2 w-full"
                   value={it.shade} onChange={(e)=>updateItem(it.id,{ shade:+e.target.value })}/>
          </label>
        </div>
      )}
    </section>
  );
}
