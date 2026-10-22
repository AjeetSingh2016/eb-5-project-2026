/* Turns world land shapes (GeoJSON) into evenly spaced dots for the globe.
   Written by hand so it does not depend on any hexagon library. */

export type LandPoint = { lat: number; lng: number };

type Ring = number[][]; /* [lng, lat] pairs */
type Poly = { rings: Ring[]; minX: number; maxX: number; minY: number; maxY: number };

/* Is the point inside this ring? (ray casting) */
function inRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function toPolys(features: object[]): Poly[] {
  const polys: Poly[] = [];
  for (const f of features) {
    const g = (f as { geometry?: { type: string; coordinates: unknown } }).geometry;
    if (!g) continue;
    const list: Ring[][] =
      g.type === "Polygon"
        ? [g.coordinates as Ring[]]
        : g.type === "MultiPolygon"
          ? (g.coordinates as Ring[][])
          : [];
    for (const rings of list) {
      if (!rings.length) continue;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const p of rings[0]) {
        if (p[0] < minX) minX = p[0];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[1] > maxY) maxY = p[1];
      }
      polys.push({ rings, minX, maxX, minY, maxY });
    }
  }
  return polys;
}

/* Spread points evenly over the sphere (about `step` degrees apart) and keep the ones on land.
   Antarctica is skipped (minLat) because it is mostly out of sight and adds a lot of dots. */
export function sampleLandDots(features: object[], step = 2.2, minLat = -58, maxLat = 84): LandPoint[] {
  const polys = toPolys(features);
  const out: LandPoint[] = [];
  for (let lat = maxLat - step / 2; lat > minLat; lat -= step) {
    const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / step));
    for (let i = 0; i < n; i++) {
      const lng = -180 + ((i + 0.5) * 360) / n;
      for (const p of polys) {
        if (lng < p.minX || lng > p.maxX || lat < p.minY || lat > p.maxY) continue;
        let inside = false;
        for (const ring of p.rings) if (inRing(lng, lat, ring)) inside = !inside;
        if (inside) {
          out.push({ lat, lng });
          break;
        }
      }
    }
  }
  return out;
}
