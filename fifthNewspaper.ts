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

const SHAPE_HORIZONTAL_REPLIES = [
  'Такие зрачки у меня с рождения. В темноте ими видно шире, чем вашим фонариком.',
  'От яркого света они всегда вытягиваются в черту. Это особенность, а не болезнь!',
  'Это из-за случая в Гданьске, когда порт затопило прошлой весной. У многих после того наводнения зрачки стали плоские, как рыбина.',
  'После тумана в Штеттине у половины улицы такие глаза. Зрачок лёг боком, и ничего не болит.',
  'Я работал на маяке под Кёнигсбергом: годы смотреть на широкую воду — зрачки и вытянулись поперёк.',
  'Врач в Линце сказал: плоские зрачки бывают от света ламп на ткацкой фабрике. У всех ткачей такие.',
  'Мать говорила, в детстве я слишком долго смотрел в воду на рыб. Теперь зрачки как у рыбы, и что с того?',
];

const SHAPE_NORMAL_REPLIES = [
  'Обычные человеческие глаза, офицер. Ничего особенного.',
  'Смотрю прямо на вас. Зрачки реагируют на свет, как положено.',
  'Разрез самый обыкновенный, не на что тут придираться.',
];

const GOEBBELS_SCLERA_REPLIES = [
  'Белки чистые. Записывайте результат и не ищите нарушения там, где их нет.',
  'Обычный цвет белков. Ваш фонарь уже показал достаточно, дальше работайте по карточке.',
  'Глаза не воспалены и не желтеют. Перейдите к следующему пункту осмотра.',
];

const GOEBBELS_SHAPE_REPLIES = [
  'Разрез прямой, человеческий. Не путайте внимательный взгляд с подозрительным.',
  'Глаза обычной формы, только крупнее среднего. Это видно и без ваших догадок.',
  'Зрачки круглые и стоят прямо. Проверяйте реакцию на свет, если вам нужен ещё один пункт.',
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
  specialCharacter,
}: {
  visitorId: number;
  isBloodshot: boolean;
  eyeShape: 'normal' | 'slit' | 'wide' | 'horizontal';
  paused: boolean;
  disabled?: boolean;
  onReply?: (text: string) => void;
  gender?: Gender;
  kind: 'sclera' | 'shape';
  specialCharacter?: 'goebbels';
}) {
  const isSclera = kind === 'sclera';
  const isGoebbels = specialCharacter === 'goebbels';
  const profiles = makeProfiles(
    isGoebbels ? (isSclera ? GOEBBELS_SCLERA_REPLIES : GOEBBELS_SHAPE_REPLIES)
      : isSclera
        ? isBloodshot ? SCLERA_BLOODSHOT_REPLIES : SCLERA_CLEAR_REPLIES
        : eyeShape === 'slit' ? SHAPE_SLIT_REPLIES : eyeShape === 'wide' ? SHAPE_WIDE_REPLIES : eyeShape === 'horizontal' ? SHAPE_HORIZONTAL_REPLIES : SHAPE_NORMAL_REPLIES
  );

  const prompt = isGoebbels
    ? (isSclera ? 'Что с белками глаз?' : 'Почему у вас такой разрез глаз?')
    : isSclera
      ? isBloodshot ? 'Почему у вас такие красные, воспалённые белки глаз?' : 'У вас подозрительно чистые, белые белки глаз.'
      : eyeShape === 'slit' ? 'Почему у вас узкие вертикальные зрачки?' : eyeShape === 'horizontal' ? 'Почему у вас горизонтальные зрачки?' : 'Что у вас с разрезом глаз?';

  return useConversation({
    visitorId,
    paused,
    subject: isGoebbels ? `goebbels-eye-${kind}` : `eye-${kind}`, 
    profiles,
    prompt,
    insist: '',
    disabled,
    onReply,
    gender,
  });
}
