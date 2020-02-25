// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Clamp val within min and max
const clamp = (val, min, max) => Math.max(Math.min(val, max), min);

export { map, lerp, clamp };
