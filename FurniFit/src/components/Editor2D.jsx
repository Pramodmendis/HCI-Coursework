import { useRef, useState } from "react";
import { useDesign } from "../store";
import { clamp } from "../utils";

export default function Editor2D() {
  const { room, items, selectedId, select, updateItem } = useDesign();
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const [resize, setResize] = useState(null);

  const svgPoint = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const onDownItem = (e, it) => { e.stopPropagation(); select(it.id);
    const p = svgPoint(e); setDrag({ id: it.id, dx: p.x - it.x, dy: p.y - it.y }); };
  const onMove = (e) => {
    if (drag) { const p = svgPoint(e);
      updateItem(drag.id, { x: clamp(p.x - drag.dx, 0, room.width - 10), y: clamp(p.y - drag.dy, 0, room.depth - 10) }); }
    if (resize) { const p = svgPoint(e);
      updateItem(resize.id, { w: Math.max(10, resize.ow + (p.x - resize.ox)),
                              h: Math.max(10, resize.oh + (p.y - resize.oy)) }); }
  };
  const onUp = () => { setDrag(null); setResize(null); };
  const onDownCanvas = () => select(null);
  const onDownHandle = (e, it) => { e.stopPropagation(); const p = svgPoint(e);
    setResize({ id: it.id, ox: p.x, oy: p.y, ow: it.w, oh: it.h }); };

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgb(214 211 209 / .6) 1px, transparent 1px)," +
      "linear-gradient(to bottom, rgb(214 211 209 / .6) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  };

  return (
    <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="pointer-events-none absolute inset-0" style={gridStyle} />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${room.width} ${room.depth}`}
        className="relative h-full w-full"
        style={{ background: room.color, borderRadius: 14 }}
        onPointerMove={onMove} onPointerUp={onUp} onPointerDown={onDownCanvas}
      >
        {items.map((it) => (
          <g key={it.id}>
            <rect
              x={it.x} y={it.y} width={it.w} height={it.h}
              fill={it.color} opacity={1 - it.shade}
              stroke={selectedId === it.id ? "#4E5F3D" : "#57534e"}
              strokeWidth={selectedId === it.id ? 3 : 1}
              className="transition-[stroke-width] duration-150"
              onPointerDown={(e) => onDownItem(e, it)}
            />
            <rect
              x={it.x + it.w - 9} y={it.y + it.h - 9} width={9} height={9}
              fill={selectedId === it.id ? "#4E5F3D" : "#a8a29e"} rx="2" ry="2"
              onPointerDown={(e) => onDownHandle(e, it)}
            />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute bottom-2 right-2 rounded-lg bg-white/90 px-2 py-1 text-xs text-stone-600 shadow-sm">
        Room: {room.width} × {room.depth}
      </div>
    </div>
  );
}
