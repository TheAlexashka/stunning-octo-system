export const ALARM_EVIDENCE_LIST = [
  { id: 'second_jaw', label: 'Вторая челюсть в глубине рта за зубами' },
  { id: 'fangs', label: 'Удлинённые хищные клыки' },
  { id: 'claws', label: 'Чёрные звериные когти вместо ногтей' },
  { id: 'webbing', label: 'Перепонки между пальцами рук' },
  { id: 'dirt_nails', label: 'Трупная грязь под краями обычных ногтей' },
  { id: 'slit_pupil', label: 'Узкие вертикальные зрачки' },
  { id: 'red_iris', label: 'Кроваво-красная неестественная радужка' },
  { id: 'scales', label: 'Чешуя и синеватый отлив кожи' },
  { id: 'no_grey_55', label: 'Возраст ≥ 55 лет без седины и морщин (вампир)' },
  { id: 'dry_breath', label: 'Ледяной выдох без конденсата на стекле' },
  { id: 'droplets_breath', label: 'Мокрый речной выдох с каплями на стекле' },
  { id: 'smooth_hairless', label: 'Абсолютно гладкая кожа без единого волоска' },
  { id: 'extra_finger', label: 'Лишний палец на руке или перчатке (6 пальцев)' },
  { id: 'multi_pupil', label: 'Несколько зрачков в одном глазу (поликория)' },
  { id: 'no_light_reaction', label: 'Зрачок не реагирует на свет фонарика (неподвижен)' },
] as const;

export type AlarmEvidenceId = (typeof ALARM_EVIDENCE_LIST)[number]['id'];
