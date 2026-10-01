import type { Traits } from '../components/Portrait';
import { FEMALE_HAIRSTYLES, MALE_HAIRSTYLES } from '../components/hairstyles';
import { FEMALE_FACE_SHAPES, MALE_FACE_SHAPES } from '../components/FaceShapes';
import { NOSE_TYPES } from '../components/Noses';
import { GLASSES_STYLES, GLOVE_STYLES, type GlassesStyle, type GloveStyle } from '../components/Glasses';
import type { FacialHair } from '../components/Mustaches';
import type { Shift } from './session';
import { chooseVoice, unusualVoice, type VoiceId } from './voices';
import { genderReply } from './gender';
import { occupationReply, OCCUPATION_REPLY_VARIANTS } from './occupationReplies';

const MALE_FACIAL_HAIR: FacialHair[] = [
  'none', 'none', 'none',
  'thin', 'toothbrush', 'brush', 'medium', 'large', 'stubbleMustache', 'chinStubble',
];

export const EYE_TILT_RANGE = 11;
export const GAME_YEAR = 1943;
export const AGING_THRESHOLD = 55;
export const DOPPELGANGER_VOICE_MISMATCH_CHANCE = 0.5;
export type BodyHair = Traits['bodyHair'];
export type CreatureType = 'human' | 'vampire' | 'werewolf' | 'mermaid' | 'ghoul' | 'doppelganger';

export const CREATURE_LABELS: Record<CreatureType, string> = {
  human: 'Человек',
  vampire: 'Вампир',
  werewolf: 'Оборотень',
  mermaid: 'Русалка',
  ghoul: 'Упырь',
  doppelganger: 'Двойник (Doppelgänger)',
};

export type OccupationCase = 'match' | 'slip' | 'wrong_docs' | 'forged';
export type BreathResult = 'fog' | 'dry' | 'droplets';

export type Visitor = {
  id: number;
  name: string;
  birth: string;
  birthYear: number;
  city: string;
  occupation: string;
  purpose: string;
  // Work permit (Arbeitsgenehmigung) details
  visaNumber: string;
  visaOccupation: string;
  visaEmployer: string;
  visaCity: string;
  // Spoken occupation and discrepancy behaviour
  occupationCase: OccupationCase;
  hasInvalidDocs: boolean;
  spokenOccupation: string;
  occupationInitialReply: string;
  occupationFollowUpReply: string;
  // Response when asked why not grey at age >= 55
  dyedHairHuman: boolean;
  greyHairReply: string;
  voice: VoiceId;
  voiceQuestion: string;
  voiceReply: string;
  breathResult: BreathResult;
  traits: Traits;
  actualType: CreatureType;
  quote: string;
};

const FIRST_M = ['Hans', 'Klaus', 'Friedrich', 'Werner', 'Otto', 'Dietrich', 'Kurt', 'Heinrich', 'Wilhelm', 'Karl', 'Ernst', 'Gustav'];
const FIRST_F = ['Ingrid', 'Helga', 'Margarethe', 'Elke', 'Ursula', 'Brunhilde', 'Anneliese', 'Greta', 'Hilde', 'Erika'];
const LAST = ['Müller', 'Schmidt', 'Weber', 'Wagner', 'Becker', 'Hoffmann', 'Schäfer', 'Klein', 'Zimmermann', 'Krüger', 'Fuchs', 'Braun', 'Lange', 'Neumann'];
const CITIES = ['Berlin', 'München', 'Hamburg', 'Köln', 'Dresden', 'Leipzig', 'Frankfurt', 'Stuttgart', 'Nürnberg', 'Bremen'];

export const JOBS_DE_RU: ReadonlyArray<{ title: string; ru: string; employer: string }> = [
  { title: 'Bäcker (Пекарь)', ru: 'пекарем', employer: 'Хлебозавод № 4' },
  { title: 'Mechaniker (Механик)', ru: 'механиком', employer: 'Депо Reichsbahn' },
  { title: 'Lehrer (Учитель)', ru: 'учителем', employer: 'Гимназия Св. Стефана' },
  { title: 'Arzt (Врач)', ru: 'врачом', employer: 'Лазарет Остмарк' },
  { title: 'Ingenieur (Инженер)', ru: 'инженером', employer: 'Сталелитейный цех Steyr' },
  { title: 'Landwirt (Фермер)', ru: 'фермером', employer: 'Аграрное ведомство' },
  { title: 'Buchhalter (Бухгалтер)', ru: 'бухгалтером', employer: 'Контора снабжения' },
  { title: 'Schneider (Портной)', ru: 'портным', employer: 'Пошивочная мастерская' },
  { title: 'Fischer (Рыбак)', ru: 'рыбаком', employer: 'Речной промысел Дуная' },
  { title: 'Uhrmacher (Часовщик)', ru: 'часовщиком', employer: 'Точная механика Линца' },
  { title: 'Apotheker (Аптекарь)', ru: 'аптекарем', employer: 'Аптека «Чёрный орёл»' },
];

const PURPOSES = ['Arbeit (Работа)', 'Familie besuchen (К семье)', 'Geschäftsreise (Командировка)', 'Umzug (Переезд)', 'Behandlung (Лечение)', 'Studien (Учёба)'];
const SKIN_TONES = ['#edd1b7', '#e8cbae', '#e3c4a6', '#ddbd9e', '#d7b595'];
const HAIR_COLORS = ['#2a1810', '#4a2818', '#6a4020', '#8a6030', '#c8a060', '#5a4838', '#bda678'];
const GREY_HAIR_COLORS = ['#b4b0a7', '#aaa79f', '#c4c0b6', '#afa99f'];
const EYE_COLORS_HUMAN = ['#4a6a30', '#3a5a80', '#5a4020', '#3a2a18', '#6a8a90'];
const GLOVE_COLORS = ['#2a1d17', '#3b241b', '#2c302e', '#3c1e1d', '#38332b'];

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Mix IDs before a probability roll so neighbouring visitors are not correlated.
function visitorRoll(id: number, salt: number): number {
  let value = (id ^ salt) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

export type VisitorExtras = {
  wearsGlasses?: boolean;
  glassesStyle?: GlassesStyle;
  wearsGloves?: boolean;
  gloveStyle?: GloveStyle;
  bodyHair?: BodyHair;
  shift?: Shift;
  forceOldYear?: number;
  dyedHairHuman?: boolean;
  occupationCase?: OccupationCase;
  voice?: VoiceId;
  breathResult?: BreathResult;
  hasExtraFinger?: boolean;
  hasMultiplePupils?: boolean;
  pupilReactsToLight?: boolean;
};

export function generateVisitor(id: number, forcedType?: CreatureType, extras?: VisitorExtras): Visitor {
  const rng = makeRng(id * 7919 + 13);
  const faceRng = makeRng(id * 19391 + GAME_YEAR);
  const bodyRng = makeRng(id * 104729 + 17);
  const loreRng = makeRng(id * 55631 + 99);
  const voiceRng = makeRng(id * 31847 + 647);
  const breathRng = makeRng(id * 8191 + 43);

  const gender: 'm' | 'f' = rng() > 0.5 ? 'm' : 'f';
  const first = gender === 'm' ? pick(FIRST_M, rng) : pick(FIRST_F, rng);
  const name = `${first} ${pick(LAST, rng)}`;
  const rawYear = 1880 + Math.floor(rng() * 55);
  const year = extras?.forceOldYear ?? rawYear;
  const month = 1 + Math.floor(rng() * 12);
  const day = 1 + Math.floor(rng() * 28);
  const birth = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
  const type = forcedType ?? 'human';
  const ageYears = GAME_YEAR - year;

  const dyedHairHuman = extras?.dyedHairHuman ?? (type === 'human' && ageYears >= AGING_THRESHOLD && loreRng() < 0.35);
  // Vampires never age or go grey even if 1943 - birthYear >= 55.
  // Humans who dyed their hair keep their wrinkles (`age: 'old'`) but don't have grey hair.
  const hasOldWrinkles = type !== 'vampire' && ageYears >= AGING_THRESHOLD;
  const hasGreyHair = hasOldWrinkles && !dyedHairHuman;

  const shift = extras?.shift ?? 1;
  // Doppelgängers NEVER have body hair or stubble (always 'smooth').
  const bodyHair: BodyHair = type === 'doppelganger' ? 'smooth'
    : extras?.bodyHair ?? (type === 'werewolf'
      ? pick(['smooth', 'stubble', 'long'] as const, bodyRng)
      : shift >= 3 && (type === 'human' || type === 'ghoul')
        ? pick(['smooth', 'stubble', 'long'] as const, bodyRng) : 'smooth');

  // Red bloodshot scleras can appear in humans, werewolves and ghouls (exhaustion/war/rage).
  // Doppelgängers NEVER have red scleras (always pure milky white).
  const bloodshotSclera = type === 'doppelganger' ? false
    : (type === 'human' || type === 'werewolf' || type === 'ghoul') && (loreRng() < (shift >= 3 ? 0.38 : 0.25));

  // 25% chance of anomalies on Doppelgängers
  const doppelExtraFinger = type === 'doppelganger' && (extras?.hasExtraFinger ?? bodyRng() < 0.25);
  const doppelMultiPupil = type === 'doppelganger' && (extras?.hasMultiplePupils ?? loreRng() < 0.25);
  const pupilReacts = type === 'doppelganger' ? false : (extras?.pupilReactsToLight ?? true);

  const traits: Traits = {
    skinTone: pick(SKIN_TONES, rng),
    hairColor: pick(HAIR_COLORS, rng),
    hairStyle: gender === 'm' ? pick(MALE_HAIRSTYLES, rng) : pick(FEMALE_HAIRSTYLES, rng),
    faceShape: gender === 'm' ? pick(MALE_FACE_SHAPES, faceRng) : pick(FEMALE_FACE_SHAPES, faceRng),
    nose: pick(NOSE_TYPES, rng),
    eyeColor: pick(EYE_COLORS_HUMAN, rng),
    eyeShape: 'normal',
    hasFangs: false,
    hasClaws: false,
    hasWebbing: false,
    dirtyNails: false,
    nailColor: '#f0dcb8',
    hasScales: false,
    hasFur: bodyHair === 'long',
    bodyHair,
    hasSecondJaw: type === 'doppelganger',
    hasExtraFinger: doppelExtraFinger,
    hasMultiplePupils: doppelMultiPupil,
    pupilReactsToLight: pupilReacts,
    bloodshotSclera,
    paleSkin: false,
    gender,
    facialHair: gender === 'm' ? pick(MALE_FACIAL_HAIR, rng) : 'none',
    age: hasOldWrinkles ? 'old' : type === 'vampire' || ageYears < 35 ? 'young' : 'mid',
    ageYears,
    greyHair: hasGreyHair,
    eyeTilt: Math.round((rng() * 2 - 1) * EYE_TILT_RANGE * 10) / 10,
    wearsGlasses: extras?.wearsGlasses ?? false,
    glassesStyle: extras?.glassesStyle ?? pick(GLASSES_STYLES, faceRng),
    wearsGloves: extras?.wearsGloves ?? false,
    gloveStyle: extras?.gloveStyle ?? pick(GLOVE_STYLES, faceRng),
    gloveColor: pick(GLOVE_COLORS, faceRng),
  };

  if (hasGreyHair) traits.hairColor = pick(GREY_HAIR_COLORS, faceRng);

  let quote = pick([
    'Danke, Herr Offizier.',
    'Alles in Ordnung, hoffe ich.',
    'Ich habe alle Papiere dabei.',
    'Es war eine lange Reise.',
    'Bitte, ich habe es eilig.',
    'Meine Familie erwartet mich.',
  ], rng);

  if (type === 'vampire') {
    traits.paleSkin = true;
    traits.hasFangs = true;
    traits.eyeColor = pick(['#8a1010', '#a02020', '#601818'], rng);
    quote = pick(['Die Sonne... ist heute so hell.', 'Ich reise stets bei Nacht.', 'Ihr Hals... verzeihen Sie.'], rng);
  } else if (type === 'werewolf') {
    traits.hasClaws = true;
    traits.nailColor = '#2a1810';
    traits.eyeColor = pick(['#c88020', '#a06018', '#d8a030'], rng);
    traits.eyeShape = 'slit';
    quote = pick(['Der Vollmond kommt bald.', 'Ich rieche Ihr Blut... äh, Parfum.', '*knurrt leise*'], rng);
  } else if (type === 'mermaid') {
    traits.hasScales = true;
    traits.hasWebbing = true;
    traits.eyeColor = pick(['#2a8090', '#4aa0b0', '#20607a'], rng);
    traits.skinTone = '#c8d0c8';
    quote = pick(['Es ist so trocken hier drinnen.', 'Haben Sie ein Glas Wasser?', 'Ich vermisse das Meer.'], rng);
  } else if (type === 'ghoul') {
    traits.paleSkin = true;
    traits.dirtyNails = true;
    traits.nailColor = '#ded0b5';
    traits.eyeColor = pick(['#a0a020', '#808018', '#606010'], rng);
    traits.eyeShape = 'slit';
    quote = pick(['Der Friedhof... ich meine, mein Haus.', 'Ich arbeite mit... Toten. Als Bestatter.', 'Der Geruch ist von der Reise.'], rng);
  } else if (type === 'doppelganger') {
    traits.bodyHair = 'smooth';
    traits.hasSecondJaw = true;
    traits.bloodshotSclera = false;
    quote = pick([
      'Я точно такой же, как и вы. Мы ничем не отличаемся.',
      'Лицо в паспорте моё. Вы можете присмотреться ближе.',
      'Мы давно живём среди вас. Почти незаметно.',
    ], rng);
  }

  if (type === 'human' && traits.wearsGlasses && traits.wearsGloves) {
    quote = 'Ночной ветер и прожекторы слепят глаза. Надеюсь, досмотр не затянется.';
  } else if (type === 'human' && traits.wearsGlasses) {
    quote = 'Без очков в темноте я не вижу ни единой строчки.';
  } else if (type === 'human' && traits.wearsGloves) {
    quote = 'В вагоне совсем не топили, пальцы до сих пор ледяные.';
  }

  const city = pick(CITIES, rng);
  const jobIndex = Math.floor(rng() * JOBS_DE_RU.length);
  const primaryJob = JOBS_DE_RU[jobIndex];
  const altJob = JOBS_DE_RU[(jobIndex + 3) % JOBS_DE_RU.length];
  const purpose = pick(PURPOSES, rng);

  const occupationCase: OccupationCase = extras?.occupationCase ?? (
    type === 'human'
      ? (loreRng() < 0.32 ? 'slip' : 'match')
      : (loreRng() < 0.55 ? 'forged' : 'match')
  );

  let visaOccupation = primaryJob.title;
  let spokenOccupation = primaryJob.title;
  let hasInvalidDocs = false;
  let occupationInitialReply = `Я работаю ${primaryJob.ru}. Еду по направлению в ${city}, все бумаги при мне.`;
  let occupationFollowUpReply = `Как я и {сказал|сказала}, работаю ${primaryJob.ru}, в рабочей визе и паспорте всё сходится.`;

  if (occupationCase === 'slip') {
    spokenOccupation = altJob.title;
    occupationInitialReply = `Я всю жизнь работаю ${altJob.ru}… то есть еду по рабочему предписанию в ${city}.`;
  } else if (occupationCase === 'wrong_docs') {
    hasInvalidDocs = true;
    visaOccupation = altJob.title;
    spokenOccupation = primaryJob.title;
    occupationInitialReply = `По паспорту я работаю ${primaryJob.ru}, направляюсь в ${city}.`;
  } else if (occupationCase === 'forged') {
    hasInvalidDocs = true;
    if (loreRng() < 0.5) {
      visaOccupation = altJob.title;
      spokenOccupation = altJob.title;
      occupationInitialReply = `Я… я тружусь ${altJob.ru}. У меня в рабочей визе так и написано.`;
    } else {
      spokenOccupation = altJob.title;
      occupationInitialReply = `Род занятий? Я… ${altJob.ru}. Да, точно, всю ночь в смене.`;
    }
  }

  if (occupationCase !== 'match') {
    occupationFollowUpReply = occupationReply(occupationCase, {
      gender, currentJob: primaryJob.title, formerJob: altJob.title,
      formerRole: altJob.ru, currentRole: primaryJob.ru,
    }, Math.floor(makeRng(id * 4507 + 73)() * OCCUPATION_REPLY_VARIANTS));
  }

  let greyHairReply = `По паспорту мне ${ageYears} лет. Внешность полностью соответствует возрасту.`;
  if (ageYears >= AGING_THRESHOLD && !traits.greyHair) {
    if (type === 'vampire') {
      greyHairReply = pick([
        `Моему роду седина неведома, время не властно над… Кхм! То есть я пользуюсь укрепительным тоником для волос, господин офицер.`,
        `${year} год рождения? Ах да… В нашей семье в Карпатах никто не седеет даже к семидесяти годам. Чистая случайность.`,
        `Седина — удел смертных… то есть слабых здоровьем! Я просто хорошо {сохранился|сохранилась} в горном климате.`,
      ], loreRng);
    } else {
      greyHairReply = pick([
        `Подкрашиваю волосы ореховым отваром и басмой перед комиссией. Седых стариков сейчас неохотно берут на заводскую ставку.`,
        `Покойный отец тоже до шестидесяти пяти ходил черноволосым — такая уж у нас порода. Зато морщин на лбу не спрячешь.`,
        `Перед поездкой {зашёл|зашла} к парикмахеру, {подкрасил|подкрасила} виски хной. Не хочется выглядеть {дряхлым стариком|дряхлой старушкой} на новом месте службы.`,
      ], loreRng);
    }
  } else if (ageYears >= AGING_THRESHOLD && traits.greyHair) {
    greyHairReply = `Мне уже ${ageYears} лет, господин офицер — голова давно вся седая, тут скрывать нечего.`;
  }

  // A separate seeded roll keeps the mismatch stable across pauses and loading.
  const mismatchedVoice = type === 'doppelganger'
    && visitorRoll(id, 0x564f4943) < DOPPELGANGER_VOICE_MISMATCH_CHANCE;
  const voiceGender = mismatchedVoice ? gender === 'm' ? 'f' : 'm' : gender;
  const generatedVoice = chooseVoice(voiceGender, voiceRng, mismatchedVoice);
  const requestedVoice = extras?.voice;
  const voice = requestedVoice && requestedVoice.startsWith(voiceGender)
    && (!mismatchedVoice || unusualVoice(requestedVoice) === null) ? requestedVoice : generatedVoice;
  const unusual = mismatchedVoice ? gender === 'm' ? 'high' : 'low' : unusualVoice(voice);
  const voiceQuestion = unusual === 'low'
    ? 'Почему у вас такой низкий голос?'
    : unusual === 'high' ? 'Почему у вас такой высокий голос?' : 'Вы всегда говорите таким голосом?';
  const voiceReply = unusual ? pick(type === 'human' ? [
    'Такой голос у меня с юности. В семье все звучат немного иначе, чем ожидают окружающие.',
    'Продуло в дороге. Горло саднит, поэтому и голос сейчас непривычный. Врач сказал, пройдёт.',
    'Я работаю с голосом и {привык|привыкла} говорить иначе на публике. Здесь нет ничего необычного.',
    'После болезни тембр изменился. Мне {самому|самой} понадобилось время, чтобы к нему привыкнуть.',
  ] : [
    'Холодная ночь, больное горло... Разве голос что-то доказывает? Давайте лучше проверим бумаги.',
    'Я ещё не {привык|привыкла} к этому... к этому воздуху. Не придавайте значения моему голосу.',
    'Так говорили в моей семье. Я не понимаю, почему вам это кажется странным.',
    'Просто простуда. В лесу... то есть в поезде было сыро, вот и всё.',
  ], voiceRng) : pick([
    'Да, обычно. После долгой дороги только немного {охрип|охрипла}.',
    'Это мой обычный голос. Если плохо слышно, могу говорить громче.',
    'Сегодня {устал|устала}, но тембр у меня всегда такой.',
  ], voiceRng);

  const breathResult: BreathResult = type === 'vampire' || type === 'ghoul' ? 'dry'
    : type === 'mermaid' ? (extras?.breathResult === 'fog' || extras?.breathResult === 'droplets' ? extras.breathResult : breathRng() < 0.5 ? 'droplets' : 'fog')
      : type === 'human' ? (extras?.breathResult === 'dry' || extras?.breathResult === 'fog' ? extras.breathResult : breathRng() < 0.35 ? 'dry' : 'fog')
        : 'fog';

  return {
    id,
    name,
    birth,
    birthYear: year,
    city,
    occupation: primaryJob.title,
    purpose,
    visaNumber: `AG-${String(id * 37 + 410).padStart(4, '0')}/43`,
    visaOccupation,
    visaEmployer: primaryJob.employer,
    visaCity: city,
    occupationCase,
    hasInvalidDocs,
    spokenOccupation,
    occupationInitialReply: genderReply(gender, occupationInitialReply),
    occupationFollowUpReply: genderReply(gender, occupationFollowUpReply),
    dyedHairHuman,
    greyHairReply: genderReply(gender, greyHairReply),
    voice,
    voiceQuestion,
    voiceReply: genderReply(gender, voiceReply),
    breathResult,
    traits,
    actualType: type,
    quote: genderReply(gender, quote),
  };
}

export function buildDay1(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras?: VisitorExtras }> = [
    { type: 'human', extras: { occupationCase: 'match' } },
    { type: 'human', extras: { occupationCase: 'slip', forceOldYear: 1884, dyedHairHuman: true, voice: 'f1' } },
    { type: 'vampire', extras: { forceOldYear: 1882, occupationCase: 'forged', voice: 'm8' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs' } },
    { type: 'werewolf', extras: { bodyHair: 'long', occupationCase: 'forged' } },
    { type: 'human', extras: { occupationCase: 'slip' } },
    { type: 'mermaid', extras: { occupationCase: 'match' } },
    { type: 'ghoul', extras: { occupationCase: 'forged' } },
  ];
  return specs.map((spec, i) => generateVisitor(i + 1, spec.type, {
    bodyHair: spec.type === 'werewolf' ? 'long' : 'smooth',
    ...spec.extras,
    shift: 1,
  }));
}

export function buildNight2(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { wearsGlasses: true, glassesStyle: 'round', occupationCase: 'slip' } },
    { type: 'werewolf', extras: { wearsGloves: true, gloveStyle: 'leather', bodyHair: 'smooth', occupationCase: 'forged' } },
    { type: 'human', extras: { wearsGloves: true, gloveStyle: 'wool', forceOldYear: 1885, dyedHairHuman: true, occupationCase: 'wrong_docs' } },
    { type: 'vampire', extras: { wearsGlasses: true, glassesStyle: 'tinted', forceOldYear: 1881, occupationCase: 'forged' } },
    { type: 'mermaid', extras: { wearsGloves: true, gloveStyle: 'dress', wearsGlasses: true, glassesStyle: 'pinceNez' } },
    { type: 'human', extras: { wearsGlasses: true, glassesStyle: 'hornRimmed', wearsGloves: true, occupationCase: 'slip' } },
    { type: 'ghoul', extras: { wearsGloves: true, gloveStyle: 'wool', wearsGlasses: true, glassesStyle: 'round', occupationCase: 'forged' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs' } },
    { type: 'werewolf', extras: { wearsGlasses: true, glassesStyle: 'tinted', wearsGloves: true, bodyHair: 'stubble' } },
  ];
  return specs.map((spec, i) => generateVisitor(101 + i, spec.type, { ...spec.extras, shift: 2 }));
}

export function buildNight3(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'slip' } },
    { type: 'werewolf', extras: { bodyHair: 'smooth', wearsGlasses: true, wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { bodyHair: 'stubble', wearsGlasses: true, forceOldYear: 1883, dyedHairHuman: true } },
    { type: 'ghoul', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'vampire', extras: { wearsGlasses: true, glassesStyle: 'tinted', forceOldYear: 1880, occupationCase: 'forged' } },
    { type: 'human', extras: { bodyHair: 'long', occupationCase: 'wrong_docs' } },
    { type: 'mermaid', extras: { wearsGloves: true, wearsGlasses: true, occupationCase: 'forged' } },
    { type: 'ghoul', extras: { bodyHair: 'stubble', wearsGlasses: true, wearsGloves: true } },
    { type: 'werewolf', extras: { bodyHair: 'stubble', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { bodyHair: 'smooth', wearsGlasses: true, wearsGloves: true, occupationCase: 'slip' } },
  ];
  return specs.map((spec, i) => generateVisitor(201 + i, spec.type, { ...spec.extras, shift: 3 }));
}

export function buildNight4(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { breathResult: 'fog', wearsGlasses: true, occupationCase: 'match' } },
    { type: 'mermaid', extras: { breathResult: 'droplets', wearsGloves: true } },
    { type: 'human', extras: { breathResult: 'dry', bodyHair: 'stubble', occupationCase: 'slip' } },
    { type: 'human', extras: { breathResult: 'fog', occupationCase: 'wrong_docs', wearsGloves: true } },
    { type: 'werewolf', extras: { bodyHair: 'smooth', wearsGlasses: true, wearsGloves: true } },
    { type: 'human', extras: { breathResult: 'dry', occupationCase: 'match' } },
    { type: 'vampire', extras: { forceOldYear: 1885, wearsGlasses: true, glassesStyle: 'tinted', occupationCase: 'forged' } },
    { type: 'ghoul', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { breathResult: 'fog', wearsGlasses: true, bodyHair: 'long' } },
    { type: 'mermaid', extras: { breathResult: 'fog', wearsGlasses: true, wearsGloves: true } },
  ];
  return specs.map((spec, i) => generateVisitor(301 + i, spec.type, { ...spec.extras, shift: 4 }));
}

// Night 5: Introduces Doppelgänger
export function buildNight5(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { breathResult: 'fog', occupationCase: 'match' } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', wearsGlasses: false, wearsGloves: false, hasExtraFinger: false, hasMultiplePupils: false } },
    { type: 'human', extras: { breathResult: 'dry', wearsGlasses: true, occupationCase: 'slip' } },
    { type: 'werewolf', extras: { bodyHair: 'stubble', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'doppelganger', extras: { occupationCase: 'slip', wearsGlasses: true, glassesStyle: 'hornRimmed', hasExtraFinger: true } },
    { type: 'human', extras: { occupationCase: 'wrong_docs', wearsGloves: true } },
    { type: 'vampire', extras: { forceOldYear: 1882, wearsGlasses: true, glassesStyle: 'tinted', occupationCase: 'forged' } },
    { type: 'ghoul', extras: { bodyHair: 'stubble', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { forceOldYear: 1883, dyedHairHuman: true, breathResult: 'fog' } },
    { type: 'mermaid', extras: { wearsGloves: true, wearsGlasses: true, breathResult: 'droplets' } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', wearsGloves: true, gloveStyle: 'dress', hasMultiplePupils: true } },
  ];
  return specs.map((spec, i) => generateVisitor(401 + i, spec.type, { ...spec.extras, shift: 5 }));
}

// Night 6 (17 October 1943): 12 visitors, flashlight test and subtle mutations.
export function buildNight6(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { breathResult: 'fog', wearsGlasses: true, occupationCase: 'match' } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', wearsGlasses: true, glassesStyle: 'tinted', hasExtraFinger: true } },
    { type: 'human', extras: { breathResult: 'dry', wearsGloves: true, occupationCase: 'slip' } },
    { type: 'vampire', extras: { forceOldYear: 1880, wearsGlasses: true, glassesStyle: 'hornRimmed', occupationCase: 'forged' } },
    { type: 'doppelganger', extras: { occupationCase: 'match', wearsGloves: true, gloveStyle: 'leather', hasMultiplePupils: true } },
    { type: 'werewolf', extras: { bodyHair: 'smooth', wearsGlasses: true, wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs', breathResult: 'fog', forceOldYear: 1881, dyedHairHuman: true } },
    { type: 'mermaid', extras: { breathResult: 'droplets', wearsGloves: true, wearsGlasses: true } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', wearsGlasses: false, wearsGloves: false, hasExtraFinger: false, hasMultiplePupils: false } },
    { type: 'ghoul', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { breathResult: 'fog', bodyHair: 'long', occupationCase: 'match' } },
    { type: 'doppelganger', extras: { occupationCase: 'slip', wearsGlasses: true, wearsGloves: true, hasExtraFinger: true, hasMultiplePupils: true } },
  ];
  return specs.map((spec, i) => generateVisitor(501 + i, spec.type, { ...spec.extras, shift: 6 }));
}

export function buildShift(shift: Shift): Visitor[] {
  return shift === 1 ? buildDay1()
    : shift === 2 ? buildNight2()
    : shift === 3 ? buildNight3()
    : shift === 4 ? buildNight4()
    : shift === 5 ? buildNight5()
    : buildNight6();
}
