export function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amount = Math.round(2.55 * percent);
  const red = Math.min(255, Math.max(0, (num >> 16) + amount));
  const green = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const blue = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${(0x1000000 + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}
