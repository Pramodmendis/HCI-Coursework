import { useRef, useState } from "react";
import { useDesign } from "../store";
import { clamp } from "../utils";

// fallback mapping if a manual add (addItem) has no image set
const TYPE_TO_IMG = {
  chair: "/furniture/armchair-velvet.png",
  table: "/furniture/coffee-table-walnut.png",
  "dining-table": "/furniture/dining-table-oak.png",
  "coffee-table": "/furniture/coffee-table-walnut.png",
  sofa: "/furniture/sofa-linen.png",
  armchair: "/furniture/armchair-velvet.png",
  bookshelf: "/furniture/bookshelf-tall.png",
  "tv-stand": "/furniture/tv-stand-low.png",
  bed: "/furniture/bed-queen.png",
  nightstand: "/furniture/nightstand.png",
  wardrobe: "/furniture/wardrobe-3door.png",
  desk: "/furniture/desk-minimal.png",
  "task-chair": "/furniture/task-chair.png",
  "floor-lamp": "/furniture/floor-lamp.png",
  rug: "/furniture/area-rug.png",
  plant: "/furniture/indoor-plant.png",
};

// --- room polygon helpers ---
function lShapePoints({ width: W, depth: D, notchW: nW, notchH: nH, notchCorner }) {
  // ensure safe values
  const w = Math.min(Math.max(10, nW || 0), Math.max(10, W - 10));
  const h = Math.min(Math.max(10, nH || 0), Math.max(10, D - 10));
  switch (notchCorner) {
    case "top-left":
      // notch cut at top-left
      return [
        [0, 0], [w, 0], [w, h], [W, h], [W, D], [0, D],
      ];
    case "bottom-right":
      // notch cut at bottom-right
      return [
        [0, 0], [W, 0], [W, D], [W - w, D], [W - w, D - h], [0, D - h],
      ];
    case "bottom-left":
      // notch cut at bottom-left
      return [
        [0, 0], [W, 0], [W, D - h], [w, D - h], [w, D], [0, D],
      ];
    case "top-right":
    default:
      // notch cut at top-right
      return [
        [0, 0], [W, 0], [W, h], [W - w, h], [W - w, D], [0, D],
      ];
  }
}

const ptsToAttr = (pts) => pts.map(([x, y]) => `${x},${y}`).join(" ");

// --- dimension helpers (unchanged) ---
const nice = (n) => Math.round(n); // cm
const badgeW = (text) => text.length * 6 + 12;
const drawBadge = (cx, cy, text, rotated = false) => (
  <g transform={rotated ? `rotate(-90 ${cx} ${cy})` : undefined} pointerEvents="none">
    <rect
      x={cx - badgeW(text) / 2}
      y={cy - 8}
      width={badgeW(text)}
      height={16}
      rx={8}
      ry={8}
      fill="white"
      stroke="#4E5F3D"
      strokeOpacity="0.25"
    />
    <text x={cx} y={cy + 3} textAnchor="middle" fontSize="10" fill="#1f2937">
      {text}
    </text>
  </g>
);

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

  const onDownItem = (e, it) => {
    e.stopPropagation();
    select(it.id);
    const p = svgPoint(e);
    setDrag({ id: it.id, dx: p.x - it.x, dy: p.y - it.y });
  };

  const onMove = (e) => {
    if (drag) {
      const p = svgPoint(e);
      const x = clamp(p.x - drag.dx, 0, room.width - 10);
      const y = clamp(p.y - drag.dy, 0, room.depth - 10);
      updateItem(drag.id, { x, y });
    }
    if (resize) {
      const p = svgPoint(e);
      const w = Math.max(10, resize.ow + (p.x - resize.ox));
      const h = Math.max(10, resize.oh + (p.y - resize.oy));
      updateItem(resize.id, { w, h });
    }
  };

  const onUp = () => { setDrag(null); setResize(null); };
  const onDownCanvas = () => select(null);
  const onDownHandle = (e, it) => {
    e.stopPropagation();
    const p = svgPoint(e);
    setResize({ id: it.id, ox: p.x, oy: p.y, ow: it.w, oh: it.h });
  };

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgb(214 211 209 / .6) 1px, transparent 1px)," +
      "linear-gradient(to bottom, rgb(214 211 209 / .6) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  };

  // draw dimensions for the selected item
  const drawDims = (it) => {
    const olive = "#4E5F3D";
    const tick = 5;
    const topY = Math.max(12, it.y - 10);
    const leftX = Math.max(12, it.x - 10);
    const x1 = it.x, x2 = it.x + it.w, y1 = it.y, y2 = it.y + it.h;

    return (
      <g pointerEvents="none">
        <line x1={x1} y1={topY} x2={x2} y2={topY} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1={x1} y1={topY - tick} x2={x1} y2={topY + tick} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1={x2} y1={topY - tick} x2={x2} y2={topY + tick} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        {drawBadge(x1 + it.w / 2, topY - 12, `${nice(it.w)} cm`)}

        <line x1={leftX} y1={y1} x2={leftX} y2={y2} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1={leftX - tick} y1={y1} x2={leftX + tick} y2={y1} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1={leftX - tick} y1={y2} x2={leftX + tick} y2={y2} stroke={olive} strokeOpacity="0.35" strokeWidth="1.5" />
        {drawBadge(leftX - 12, y1 + it.h / 2, `${nice(it.h)} cm`, true)}
      </g>
    );
  };

  const getImg = (it) => it.image || TYPE_TO_IMG[it.type];

  return (
    <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="absolute inset-0 pointer-events-none" style={gridStyle} />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${room.width} ${room.depth}`}
        className="relative w-full h-full"
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerDown={onDownCanvas}
        style={{ borderRadius: 14 }}
      >
        {/* --- Room shape background --- */}
        {room.shape === "rect" ? (
          <rect
            x="0" y="0"
            width={room.width} height={room.depth}
            fill={room.color}
            stroke="#e7e5e4"
            strokeWidth="1"
          />
        ) : (
          <polygon
            points={ptsToAttr(lShapePoints(room))}
            fill={room.color}
            stroke="#e7e5e4"
            strokeWidth="1"
          />
        )}

        {/* --- Items --- */}
        {items.map((it) => {
          const src = getImg(it);
          const isSelected = selectedId === it.id;

          return (
            <g key={it.id}>
              {src ? (
                <>
                  <image
                    href={src}
                    x={it.x}
                    y={it.y}
                    width={it.w}
                    height={it.h}
                    preserveAspectRatio="none"
                    style={{ cursor: "grab" }}
                    onPointerDown={(e) => onDownItem(e, it)}
                  />
                  {it.shade > 0 && (
                    <rect
                      x={it.x} y={it.y} width={it.w} height={it.h}
                      fill="black" opacity={it.shade * 0.4} pointerEvents="none"
                    />
                  )}
                  <rect
                    x={it.x} y={it.y} width={it.w} height={it.h}
                    fill="none"
                    stroke={isSelected ? "#4E5F3D" : "transparent"}
                    strokeWidth={isSelected ? 3 : 0}
                    pointerEvents="none"
                  />
                </>
              ) : (
                <rect
                  x={it.x} y={it.y} width={it.w} height={it.h}
                  fill={it.color} opacity={1 - it.shade}
                  stroke={isSelected ? "#4E5F3D" : "#57534e"}
                  strokeWidth={isSelected ? 3 : 1}
                  className="transition-[stroke-width] duration-150"
                  onPointerDown={(e) => onDownItem(e, it)}
                />
              )}

              {/* resize handle */}
              <rect
                x={it.x + it.w - 9}
                y={it.y + it.h - 9}
                width={9}
                height={9}
                fill={isSelected ? "#4E5F3D" : "#a8a29e"}
                rx="2" ry="2"
                onPointerDown={(e) => onDownHandle(e, it)}
              />

              {/* dimension overlays */}
              {isSelected && drawDims(it)}
            </g>
          );
        })}
      </svg>

      <div className="absolute px-2 py-1 text-xs rounded-lg shadow-sm pointer-events-none bottom-2 right-2 bg-white/90 text-stone-600">
        Room: {room.width} × {room.depth} {room.shape === "lshape" && `(L: ${room.notchW}×${room.notchH} at ${room.notchCorner})`}
      </div>
    </div>
  );
}
