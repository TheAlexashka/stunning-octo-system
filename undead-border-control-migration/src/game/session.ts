import type { InspectionProgress } from './conversation';

export type Shift = 1 | 2 | 3 | 4 | 5 | 6;
export type Scene = 'menu' | 'intro' | 'briefing' | 'newspaper' | 'play' | 'gameover' | 'victory';
export type Tool = null | 'eye' | 'teeth' | 'nails' | 'skin' | 'breath';
export type ShiftResult = { shift: Shift; errors: number; processed: number };
export type SessionState = {
  scene: Scene;
  shift: Shift;
  index: number;
  errors: number;
  tool: Tool;
  stamped: null | 'APPROVED' | 'REFUSED' | 'DENIED';
  showDenyMenu: boolean;
  flash: boolean;
  feedback: string | null;
  processed: number;
  history: ShiftResult[];
  inspections: InspectionProgress | null;
  pendingTimers: Record<string, number>;
};

export const SHIFT_TOTALS: Record<Shift, number> = { 1: 8, 2: 9, 3: 10, 4: 10, 5: 11, 6: 12 };
// Content currently stops here; this is not the ending of the campaign.
export const LATEST_SHIFT: Shift = 6;
export function shiftLabel(shift: Shift): string { return shift === 1 ? 'День 1' : `Ночь ${shift}`; }
export function shiftDate(shift: Shift): string { return `${11 + shift} октября 1943 г.`; }
export function newSession(scene: Scene = 'menu', shift: Shift = 1, history: ShiftResult[] = []): SessionState {
  return {
    scene, shift, index: 0, errors: 0, tool: null, stamped: null,
    showDenyMenu: false, flash: false, feedback: null, processed: 0,
    history, inspections: null, pendingTimers: {},
  };
}
