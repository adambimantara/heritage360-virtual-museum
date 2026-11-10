// Shared outline for the 7-luk keris blade, used by both the SVG art and the 3D model.
// Units: base at y=0, tip at y=1.
export const LUK = 7;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const lukOffset = (t: number) =>
  0.034 * Math.sin(t * LUK * Math.PI) * smooth(0.1, 0.24, t) * (1 - t * 0.35);

export const halfWidth = (t: number) => 0.068 * Math.pow(1 - t, 0.7) + 0.003;

export function bladeOutline(steps = 140) {
  const right: [number, number][] = [];
  const left: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const c = lukOffset(t);
    const w = halfWidth(t);
    // gandik: the thickened, slightly protruding base on one side
    const gandik = t < 0.16 ? 0.024 * Math.sin((t / 0.16) * Math.PI) : 0;
    // greneng: small notches near the base on the other side
    const greneng = t > 0.03 && t < 0.13 ? 0.006 * Math.abs(Math.sin(t * 160)) : 0;
    right.push([c + w + greneng, t]);
    left.push([c - w - gandik, t]);
  }
  return [...right, ...left.reverse()];
}
