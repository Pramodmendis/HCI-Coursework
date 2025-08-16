export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

export function darken(hex, amount = 0.2) {
  const { r, g, b } = hexToRgb(hex);
  const k = clamp(1 - amount, 0, 1);
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(Math.round(r * k))}${toHex(Math.round(g * k))}${toHex(
    Math.round(b * k)
  )}`;
}

export function getItemsBBox(items) {
  if (!items.length) return { x: 0, y: 0, w: 1, h: 1 };
  const xs = items.map((it) => [it.x, it.x + it.w]).flat();
  const ys = items.map((it) => [it.y, it.y + it.h]).flat();
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export function scaleToFit(items, room) {
  const bbox = getItemsBBox(items);
  const kx = (room.width - 8) / Math.max(bbox.w, 1);
  const ky = (room.depth - 8) / Math.max(bbox.h, 1);
  return clamp(Math.min(kx, ky), 0.1, 10);
}
