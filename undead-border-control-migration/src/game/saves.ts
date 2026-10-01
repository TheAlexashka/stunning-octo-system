import type { ConversationSnapshot, InspectionProgress } from './conversation';
import { LATEST_SHIFT, SHIFT_TOTALS, shiftLabel, type SessionState, type Shift } from './session';

export type ManualSlot = 1 | 2 | 3;
export type SaveSlotId = ManualSlot | 'auto';
export type SaveRecord = {
  version: 1;
  savedAt: number;
  completedShift: Shift | null;
  state: SessionState;
};
export type SaveSlot = { id: SaveSlotId; record: SaveRecord | null };
const PREFIX = 'grenzamt-campaign-v1-';
export const SLOT_IDS: readonly SaveSlotId[] = [1, 2, 3, 'auto'];

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function integer(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;
}
function validConversation(value: unknown): value is ConversationSnapshot {
  if (!isObject(value) || !['unasked', 'waiting', 'hesitant', 'accepted', 'refused'].includes(String(value.phase))) return false;
  if (!Array.isArray(value.lines) || value.lines.length > 30 || !value.lines.every((line) => isObject(line) && ['clerk', 'visitor'].includes(String(line.speaker)) && typeof line.text === 'string' && line.text.length < 3000)) return false;
  if (!isObject(value.used) || typeof value.used.reassure !== 'boolean' || typeof value.used.insist !== 'boolean') return false;
  if ((value.phase === 'waiting') !== (value.pending !== null)) return false;
  return value.pending === null || (isObject(value.pending) && typeof value.pending.text === 'string' && value.pending.text.length < 3000 && ['accepted', 'hesitant', 'refused'].includes(String(value.pending.phase)) && typeof value.pending.delay === 'number' && Number.isFinite(value.pending.delay) && value.pending.delay >= 0 && value.pending.delay <= 60000);
}
function validDesk(value: unknown): boolean {
  if (value === undefined) return true;
  if (!isObject(value)) return false;
  if (value.voiceAsked !== undefined && typeof value.voiceAsked !== 'boolean') return false;
  if (value.eyeSide !== undefined && value.eyeSide !== 'right' && value.eyeSide !== 'left') return false;
  if (value.checkedEyes !== undefined && (!Array.isArray(value.checkedEyes) || value.checkedEyes.length > 2 || new Set(value.checkedEyes).size !== value.checkedEyes.length || !value.checkedEyes.every((side) => side === 'right' || side === 'left'))) return false;
  if (value.scleraAsked !== undefined && typeof value.scleraAsked !== 'boolean') return false;
  if (value.shapeAsked !== undefined && typeof value.shapeAsked !== 'boolean') return false;
  if (value.speech !== undefined) {
    if (!isObject(value.speech) || typeof value.speech.text !== 'string' || value.speech.text.length > 3000 ||
      !integer(value.speech.revealed, 0, Array.from(value.speech.text).length) ||
      !integer(value.speech.serial, 1, Number.MAX_SAFE_INTEGER)) return false;
  }
  return (
    typeof value.docsRequested === 'boolean' &&
    typeof value.passportTaken === 'boolean' &&
    typeof value.visaTaken === 'boolean' &&
    (value.activeDoc === 'passport' || value.activeDoc === 'visa') &&
    typeof value.ageAsked === 'boolean' &&
    (value.occupationStage === 0 || value.occupationStage === 1 || value.occupationStage === 2) &&
    Array.isArray(value.checkedSigns) &&
    value.checkedSigns.length <= 20 &&
    value.checkedSigns.every((item) => typeof item === 'string' && item.length <= 64)
  );
}
function validInspections(value: unknown): value is InspectionProgress {
  return (
    isObject(value) &&
    ['teeth', 'glasses', 'gloves', 'hair'].every((key) => validConversation(value[key])) &&
    (value.breath === undefined || validConversation(value.breath)) &&
    (value.breathProgress === undefined || (typeof value.breathProgress === 'number' && Number.isFinite(value.breathProgress) && value.breathProgress >= 0 && value.breathProgress <= 1)) &&
    (!(typeof value.breathProgress === 'number' && value.breathProgress > 0) || (isObject(value.breath) && value.breath.phase === 'accepted')) &&
    validDesk(value.desk)
  );
}
function validRecord(value: unknown): value is SaveRecord {
  if (!isObject(value) || value.version !== 1 || !integer(value.savedAt, 0, 8640000000000000) || !isObject(value.state)) return false;
  if (value.completedShift !== null && !integer(value.completedShift, 1, LATEST_SHIFT)) return false;
  const s = value.state;
  if (!integer(s.shift, 1, LATEST_SHIFT) || !['intro', 'briefing', 'newspaper', 'play', 'victory', 'gameover'].includes(String(s.scene))) return false;
  if (!integer(s.index, 0, SHIFT_TOTALS[s.shift as Shift] - 1) || !integer(s.errors, 0, 3) || !integer(s.processed, 0, SHIFT_TOTALS[s.shift as Shift])) return false;
  if (s.tool !== null && !['eye', 'teeth', 'nails', 'skin', 'breath'].includes(String(s.tool))) return false;
  if (s.tool === 'breath' && s.shift < 4) return false;
  if (s.stamped !== null && !['APPROVED', 'REFUSED', 'DENIED'].includes(String(s.stamped))) return false;
  if (typeof s.showDenyMenu !== 'boolean' || typeof s.flash !== 'boolean' || (s.feedback !== null && typeof s.feedback !== 'string')) return false;
  if (!Array.isArray(s.history) || s.history.length > LATEST_SHIFT || !s.history.every((h) => isObject(h) && integer(h.shift, 1, LATEST_SHIFT) && integer(h.errors, 0, 3) && integer(h.processed, 0, 20))) return false;
  if (!isObject(s.pendingTimers) || !Object.entries(s.pendingTimers).every(([key, time]) => ['advance', 'shot', 'flash'].includes(key) && typeof time === 'number' && Number.isFinite(time) && time >= 0 && time <= 60000)) return false;
  if (s.scene === 'play' && s.stamped !== null && s.pendingTimers.advance === undefined) return false;
  if ((s.scene !== 'play' || s.stamped === null) && Object.keys(s.pendingTimers).length > 0) return false;
  return s.inspections === null || validInspections(s.inspections);
}
export function readSave(id: SaveSlotId): SaveRecord | null {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(PREFIX + id) ?? 'null');
    return validRecord(data) ? data : null;
  } catch { return null; }
}
export function readSaveSlots(): SaveSlot[] { return SLOT_IDS.map((id) => ({ id, record: readSave(id) })); }
export function writeSave(id: SaveSlotId, state: SessionState, completedShift: Shift | null = null): { ok: boolean; message: string } {
  const record: SaveRecord = { version: 1, savedAt: Date.now(), completedShift, state };
  if (!validRecord(record)) return { ok: false, message: 'Эту сцену пока нельзя сохранить.' };
  try {
    localStorage.setItem(PREFIX + id, JSON.stringify(record));
    return { ok: true, message: id === 'auto' ? 'Автосохранение после смены готово.' : `Игра сохранена в слот ${id}.` };
  } catch { return { ok: false, message: 'Браузер не разрешил сохранить игру. Проверьте доступ к локальному хранилищу.' }; }
}
export function deleteSave(id: SaveSlotId): { ok: boolean; message: string } {
  try { localStorage.removeItem(PREFIX + id); return { ok: true, message: 'Сохранение удалено.' }; }
  catch { return { ok: false, message: 'Не удалось удалить сохранение.' }; }
}
export function saveDescription(record: SaveRecord): string {
  const s = record.state;
  const prefix = record.completedShift ? `После ${record.completedShift === 1 ? 'смены' : 'ночи'} ${record.completedShift} · ` : '';
  const stage = s.scene === 'play' ? `посетитель ${s.index + 1}/${SHIFT_TOTALS[s.shift]}`
    : s.scene === 'newspaper' ? 'перед сменой' : s.scene === 'victory' ? 'смена завершена'
      : s.scene === 'gameover' ? 'отстранение' : 'инструктаж';
  return `${prefix}${shiftLabel(s.shift)} · ${stage}`;
}
