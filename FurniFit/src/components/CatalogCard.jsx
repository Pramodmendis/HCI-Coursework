export default function CatalogCard({ item, onAdd }) {
  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-stone-200">
      <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-medium text-stone-900">{item.name}</h4>
            <p className="mt-0.5 line-clamp-2 text-sm text-stone-600">{item.desc}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
          <span>{item.w} × {item.h} cm</span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5">{item.category}</span>
        </div>

        <button
          onClick={() => onAdd(item.sku)}
          className="mt-3 w-full rounded-xl px-3 py-2 text-sm font-medium text-white shadow
                     bg-gradient-to-r from-[#5d7349] to-[#4b5f3a] hover:from-[#6c8455] hover:to-[#576d44]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Add to Room
        </button>
      </div>
    </div>
  );
}
