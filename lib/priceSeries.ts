export type PricePoint = { day: number; value: number };

function hashSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Mulberry32 — small, deterministic, no external dependency.
function mulberry32(seed: number) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic 90-day price-movement series seeded by product id, so the
 * same product always renders the same chart on server and client (no
 * hydration mismatch) without persisting anything.
 */
export function generatePriceSeries(productId: string, basePrice: number): PricePoint[] {
  const rand = mulberry32(hashSeed(productId));
  const points: PricePoint[] = [];
  let value = basePrice * 0.94;

  for (let day = 0; day < 90; day++) {
    const drift = (rand() - 0.48) * basePrice * 0.012;
    value = Math.max(basePrice * 0.85, Math.min(basePrice * 1.15, value + drift));
    points.push({ day, value: Math.round(value) });
  }

  // Anchor the final point to the published price for continuity with the price table.
  points[points.length - 1] = { day: 89, value: basePrice };

  return points;
}
