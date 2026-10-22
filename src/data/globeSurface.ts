/* Paints the globe's surface image in the browser: ocean, solid land, coastlines and a faint grid.
   The image is "equirectangular": x is longitude (-180..180), y is latitude (90..-90). */

export type SurfacePoint = { lat: number; lng: number };

/* ---------- Look: change these colours to restyle the globe ---------- */
const OCEAN_EDGE = "#0b2b57";
const OCEAN_MID = "#134578";
const LAND_FILL = "#7ea3d1";
const COASTLINE = "#d3e3f6";
const GRID = "rgba(255,255,255,0.07)";

const W = 2048;
const H = 1024;

type Ring = number[][]; /* [lng, lat] pairs */

const px = (lng: number) => ((lng + 180) / 360) * W;
const py = (lat: number) => ((90 - lat) / 180) * H;

/* Paint the globe surface. Use `features` (real land shapes) when you have them,
   otherwise `fallback` points are drawn as rough blobs. Returns an image URL. */
export function paintGlobeSurface(features: object[] | null, fallback: SurfacePoint[] = []): string {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  /* Ocean */
  const ocean = ctx.createLinearGradient(0, 0, 0, H);
  ocean.addColorStop(0, OCEAN_EDGE);
  ocean.addColorStop(0.5, OCEAN_MID);
  ocean.addColorStop(1, OCEAN_EDGE);
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, W, H);

  /* Faint grid every 30 degrees */
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let lng = -180; lng <= 180; lng += 30) {
    ctx.moveTo(px(lng), 0);
    ctx.lineTo(px(lng), H);
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.moveTo(0, py(lat));
    ctx.lineTo(W, py(lat));
  }
  ctx.stroke();

  /* Land */
  ctx.fillStyle = LAND_FILL;
  if (features && features.length) {
    ctx.beginPath();
    for (const f of features) {
      const g = (f as { geometry?: { type: string; coordinates: unknown } }).geometry;
      if (!g) continue;
      const polygons: Ring[][] =
        g.type === "Polygon"
          ? [g.coordinates as Ring[]]
          : g.type === "MultiPolygon"
            ? (g.coordinates as Ring[][])
            : [];
      for (const rings of polygons) {
        for (const ring of rings) {
          ring.forEach((p, i) => {
            if (i === 0) ctx.moveTo(px(p[0]), py(p[1]));
            else ctx.lineTo(px(p[0]), py(p[1]));
          });
          ctx.closePath();
        }
      }
    }
    ctx.fill("evenodd"); /* evenodd keeps lakes and inland seas as holes */
    ctx.strokeStyle = COASTLINE;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
  } else {
    for (const p of fallback) {
      ctx.beginPath();
      ctx.arc(px(p.lng), py(p.lat), 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return canvas.toDataURL("image/png");
}
