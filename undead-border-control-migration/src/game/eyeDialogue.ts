import { useConversation, type DialogueProfile } from './conversation';
import type { Gender } from './gender';

const SCLERA_BLOODSHOT_REPLIES = [
  'Трое суток в эшелоне без сна под вой сирен. Глаза щиплет так, словно туда песка насыпали.',
  'На станции ночью попали под дым от горящего состава. Капли не помогали, белки все налились кровью.',
  'У меня хроническое воспаление от угольной пыли в депо. Врач выписал примочки, но в дороге где их взять?',
  'Я плакал{а|} всю ночь перед отъездом... Извините, не могу сдержаться.',
];

const SCLERA_CLEAR_REPLIES = [
  'В темноте зрение не напрягал{а|}, в вагоне спал{а|} почти всю дорогу.',
  'Глаза чистые, не жалуюсь. Промываю холодной водой каждое утро.',
  'Слава богу, со зрением пока всё в порядке.',
];

const SHAPE_SLIT_REPLIES = [
  'При ярком свете вашей лампы зрачки всегда сужаются в узкую черту. Отведите свет, слепит!',
  'С детства такая особенность зрачков, врач говорил — светобоязнь.',
  'В темноте они расширяются, а на солнце сужаются как у кошки. Это не преступление!',
];

const SHAPE_WIDE_REPLIES = [
  'От страха глаза на лоб лезут на вашем КПП! Никогда так не допрашивали!',
  'Капли от глазного давления закапал{а|} перед границей, вот зрачки и широкие.',
  'У нас в роду у всех глаза навыкате. Взгляните на фото в паспорте.',
];

const SHAPE_NORMAL_REPLIES = [
  'Обычные человеческие глаза, офицер. Ничего особенного.',
  'Смотрю прямо на вас. Зрачки реагируют на свет, как положено.',
  'Разрез самый обыкновенный, не на что тут придираться.',
];

function makeProfiles(texts: readonly string[]): readonly DialogueProfile[] {
  return texts.map((reply) => ({
    agreesImmediately: true,
    firstReply: reply,
    reassurance: '',
    reassuredReply: '',
    reassured: true,
    firmReply: '',
    persuadedByRules: true,
  }));
}

export function useEyeQuestionConversation({
  visitorId,
  isBloodshot,
  eyeShape,
  paused,
  disabled = false,
  onReply,
  gender = 'm',
  kind,
}: {
  visitorId: number;
  isBloodshot: boolean;
  eyeShape: 'normal' | 'slit' | 'wide';
  paused: boolean;
  disabled?: boolean;
  onReply?: (text: string) => void;
  gender?: Gender;
  kind: 'sclera' | 'shape';
}) {
  const isSclera = kind === 'sclera';
  const profiles = makeProfiles(
    isSclera
      ? isBloodshot ? SCLERA_BLOODSHOT_REPLIES : SCLERA_CLEAR_REPLIES
      : eyeShape === 'slit' ? SHAPE_SLIT_REPLIES : eyeShape === 'wide' ? SHAPE_WIDE_REPLIES : SHAPE_NORMAL_REPLIES
  );

  const prompt = isSclera
    ? isBloodshot ? 'Почему у вас такие красные, воспалённые белки глаз?' : 'У вас подозрительно чистые, белые белки глаз.'
    : eyeShape === 'slit' ? 'Почему у вас узкие вертикальные зрачки?' : 'Что у вас с разрезом глаз?';

  return useConversation({
    visitorId,
    paused,
    subject: `eye-${kind}`,
    profiles,
    prompt,
    insist: '',
    disabled,
    onReply,
    gender,
  });
}
