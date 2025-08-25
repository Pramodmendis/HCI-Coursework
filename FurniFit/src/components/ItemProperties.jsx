import { useDesign } from "../store";

export default function ItemProperties() {
  const { items, selectedId, updateItem } = useDesign();
  const it = items.find((x) => x.id === selectedId);

  const input =
    "mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm shadow-sm " +
    "focus:border-[#5d7349] focus:ring-[#5d7349] focus:outline-none";

  if (!it) {
    return (
      <div className="px-3 py-2 border rounded-xl border-stone-200 bg-stone-50 text-stone-600">
        No item selected
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 text-xs text-stone-500">
        Selected: <span className="font-medium">{it.type}</span>
      </div>

      {["x", "y", "w", "h"].map((k) => (
        <label key={k} className="block">
          <span className="block">{k.toUpperCase()}</span>
          <input
            type="number"
            className={input}
            value={it[k]}
            onChange={(e) => updateItem(it.id, { [k]: +e.target.value || 0 })}
          />
        </label>
      ))}

      <label className="block col-span-2">
        <span className="block">Colour</span>
        <input
          type="color"
          className="w-full h-10 mt-1 border rounded-xl border-stone-300"
          value={it.color}
          onChange={(e) => updateItem(it.id, { color: e.target.value })}
        />
      </label>

      <label className="block col-span-2">
        <span className="block">Shade</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          className="w-full mt-2"
          value={it.shade}
          onChange={(e) => updateItem(it.id, { shade: parseFloat(e.target.value) })}
        />
      </label>
    </div>
  );
}
