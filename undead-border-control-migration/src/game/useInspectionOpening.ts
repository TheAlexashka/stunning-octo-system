import { useEffect, useRef, useState } from 'react';

// Interpolates SVG lid/lip geometry. A pause preserves the current pose; closing
// the tab unmounts the view so the opening animation plays again next time.
export function useInspectionOpening(opened: boolean, paused = false, duration = 700, initialProgress = 0): number {
  const [progress, setProgress] = useState(initialProgress);
  const current = useRef(initialProgress);

  useEffect(() => {
    if (!opened) {
      current.current = 0;
      setProgress(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = 1;
      setProgress(1);
      return;
    }
    if (paused || current.current >= 1) return;

    let frame = 0;
    const from = current.current;
    const started = performance.now();
    const remaining = Math.max(120, duration * (1 - from));
    const animate = (now: number) => {
      const fraction = Math.min(1, (now - started) / remaining);
      const eased = fraction * fraction * (3 - 2 * fraction);
      const value = from + (1 - from) * eased;
      current.current = value;
      setProgress(value);
      if (fraction < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [opened, paused, duration]);

  return opened ? progress : 0;
}
