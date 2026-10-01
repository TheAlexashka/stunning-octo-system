import { useCallback, useEffect, useRef } from 'react';

type GameTask = {
  callback: () => void;
  remaining: number;
  started: number;
  timer: number | null;
  key?: string;
};

// Named tasks can be saved with their exact remaining duration. Pausing and
// loading cancel real timers, not merely block the user interface.
export function useGameTimers() {
  const tasks = useRef(new Set<GameTask>());
  const paused = useRef(false);

  const arm = useCallback((task: GameTask) => {
    task.started = performance.now();
    task.timer = window.setTimeout(() => {
      task.timer = null;
      if (paused.current) { task.remaining = 0; return; }
      tasks.current.delete(task);
      task.callback();
    }, task.remaining);
  }, []);

  const schedule = useCallback((callback: () => void, delay: number, key?: string) => {
    if (key) {
      for (const old of tasks.current) {
        if (old.key === key) {
          if (old.timer !== null) window.clearTimeout(old.timer);
          tasks.current.delete(old);
        }
      }
    }
    const task: GameTask = { callback, remaining: Math.max(0, delay), started: 0, timer: null, key };
    tasks.current.add(task);
    if (!paused.current) arm(task);
  }, [arm]);

  const pause = useCallback(() => {
    if (paused.current) return;
    paused.current = true;
    const now = performance.now();
    for (const task of tasks.current) {
      if (task.timer !== null) {
        window.clearTimeout(task.timer);
        task.remaining = Math.max(0, task.remaining - (now - task.started));
        task.timer = null;
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (!paused.current) return;
    paused.current = false;
    for (const task of tasks.current) if (task.timer === null) arm(task);
  }, [arm]);

  const remaining = useCallback(() => {
    const result: Record<string, number> = {};
    const now = performance.now();
    for (const task of tasks.current) {
      if (task.key) result[task.key] = Math.max(0, task.remaining - (task.timer === null ? 0 : now - task.started));
    }
    return result;
  }, []);

  const clear = useCallback(() => {
    for (const task of tasks.current) if (task.timer !== null) window.clearTimeout(task.timer);
    tasks.current.clear();
  }, []);

  useEffect(() => clear, [clear]);
  return { schedule, pause, resume, clear, remaining };
}
