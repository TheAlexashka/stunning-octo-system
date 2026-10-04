import { FEMALE_CLOTHING_STYLES, type ClothingStyle } from '../features/lindenClothes/catalog';
import { POTATO_CIVILIAN_FEMALE_CLOTHING, POTATO_CIVILIAN_MALE_CLOTHING } from '../features/potato/catalog';
import { POTATO_MILITARY_HEADWEAR } from '../features/potato/PotatoHeadwear';

// The Überfrau uniform is reserved: never rolled randomly, assigned manually via extras later.
const RANDOM_FEMALE_CLOTHING: readonly string[] = [...FEMALE_CLOTHING_STYLES.filter((id) => id !== 'cloth-1938-uberfrau-uniform'), ...POTATO_CIVILIAN_FEMALE_CLOTHING];
// «Баранки» reserved for a future special character: kept in the gallery, never rolled.
const RANDOM_FEMALE_HAIRSTYLES = FEMALE_HAIRSTYLES.filter((id) => id !== 'hair-poster-1938-braided-coils');
// Goggles and the forehead carbuncle are reserved accessories: gallery-only, never rolled.
const RESERVED_HEADWEAR: readonly string[] = ['headgear-poster-acc-aviator-goggles', 'acc-poster-carbuncle'];
const MILITARY_HEADWEAR = new Set<string>(POTATO_MILITARY_HEADWEAR);
const RANDOM_MALE_HEADWEAR = RANDOM_MALE_HEADWEAR_STYLES.filter((id) => !RESERVED_HEADWEAR.includes(id) && !MILITARY_HEADWEAR.has(id));
const RANDOM_FEMALE_HEADWEAR = RANDOM_FEMALE_HEADWEAR_STYLES.filter((id) => !RESERVED_HEADWEAR.includes(id) && !MILITARY_HEADWEAR.has(id));
import type { Traits } from '../components/Portrait';
// Shared catalogues include the additive Linden selection in real gameplay.
import { FEMALE_HAIRSTYLES, MALE_HAIRSTYLES } from '../components/hairstyles';
import { RANDOM_FEMALE_HEADWEAR_STYLES, RANDOM_MALE_HEADWEAR_STYLES, type HeadwearStyle } from '../components/headwear';
import { FEMALE_FACE_SHAPES, MALE_FACE_SHAPES } from '../components/FaceShapes';
import { NOSE_TYPES } from '../components/Noses';
import { GLASSES_STYLES, GLOVE_STYLES, type GlassesStyle, type GloveStyle } from '../components/Glasses';
import type { FacialHair } from '../components/Mustaches';
import type { Shift } from './session';
import { chooseVoice, unusualVoice, type VoiceId } from './voices';
import { genderReply } from './gender';
import { arrivalPhrase } from './arrivalPhrases';
import { eyeCamouflage, camouflageRoll } from './eyeCamouflage';
import { bagContents, type BagItemId } from './bagItems';
import { occupationReply, OCCUPATION_REPLY_VARIANTS } from './occupationReplies';

const MALE_FACIAL_HAIR: FacialHair[] = [
  'none', 'none', 'none',
  'thin', 'toothbrush', 'brush', 'medium', 'large', 'stubbleMustache', 'chinStubble',
];

export const EYE_TILT_RANGE = 11;
export const GAME_YEAR = 1943;
export const AGING_THRESHOLD = 55;
export const WRINKLES_THRESHOLD = 45;
export const DOPPELGANGER_VOICE_MISMATCH_CHANCE = 0.5;
export const MISSING_DOCUMENT_CHANCE = 0.20;
export type BodyHair = Traits['bodyHair'];
export type CreatureType = 'human' | 'vampire' | 'werewolf' | 'mermaid' | 'ghoul' | 'doppelganger' | 'nix';

export const CREATURE_LABELS: Record<CreatureType, string> = {
  human: 'Человек',
  vampire: 'Blutsauger',
  werewolf: 'Werwolf',
  mermaid: 'Meerleute',
  ghoul: 'Nachzehrer',
  doppelganger: 'Doppelgänger',
  nix: 'Nixen',
};

export type OccupationCase = 'match' | 'slip' | 'wrong_docs' | 'forged';
export type MissingDocument = 'passport' | 'visa';
export type BreathResult = 'fog' | 'dry' | 'droplets' | 'salt';

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
  missingDocument: MissingDocument | null;
  missingDocumentReply: string;
  hasInvalidDocs: boolean;
  spokenOccupation: string;
  occupationInitialReply: string;
  occupationFollowUpReply: string;
  weightKg: number;
  heightCm: number;
  weightReply: string;
  heightReply: string;
  specialOutcome?: 'goebbels';
  // Response when asked why not grey at age >= 55
  dyedHairHuman: boolean;
  greyHairReply: string;
  voice: VoiceId;
  voiceQuestion: string;
  voiceReply: string;
  breathResult: BreathResult;
  breathOdor?: string;
  eyesDisguised: boolean;
  bagItems: BagItemId[];
  traits: Traits;
  actualType: CreatureType;
  quote: string;
};

const FIRST_M = ['Hans', 'Klaus', 'Friedrich', 'Werner', 'Otto', 'Dietrich', 'Kurt', 'Heinrich', 'Wilhelm', 'Karl', 'Ernst', 'Gustav'];
const FIRST_F = ['Ingrid', 'Helga', 'Margarethe', 'Elke', 'Ursula', 'Brunhilde', 'Anneliese', 'Greta', 'Hilde', 'Erika'];
const LAST = ['Müller', 'Schmidt', 'Weber', 'Wagner', 'Becker', 'Hoffmann', 'Schäfer', 'Klein', 'Zimmermann', 'Krüger', 'Fuchs', 'Braun', 'Lange', 'Neumann'];
const CITIES = ['Berlin', 'München', 'Hamburg', 'Köln', 'Dresden', 'Leipzig', 'Frankfurt', 'Stuttgart', 'Nürnberg', 'Bremen'];
const SPOKEN_CITIES_RU: Readonly<Record<string, string>> = {
  Berlin: 'Берлин', 'München': 'Мюнхен', Hamburg: 'Гамбург', 'Köln': 'Кёльн', Dresden: 'Дрезден',
  Leipzig: 'Лейпциг', Frankfurt: 'Франкфурт', Stuttgart: 'Штутгарт', 'Nürnberg': 'Нюрнберг', Bremen: 'Бремен',
};

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
  { title: 'Postbeamter (Почтовый служащий)', ru: 'почтовым служащим', employer: 'Почтовое отделение Линца' },
  { title: 'Straßenbahnfahrer (Водитель трамвая)', ru: 'водителем трамвая', employer: 'Городское трамвайное управление' },
  { title: 'Buchbinder (Переплётчик)', ru: 'переплётчиком', employer: 'Переплётная мастерская «Норд»' },
  { title: 'Koch (Повар)', ru: 'поваром', employer: 'Столовая вокзала Ostmark-3' },
  { title: 'Gärtner (Садовник)', ru: 'садовником', employer: 'Городские сады' },
  { title: 'Fotograf (Фотограф)', ru: 'фотографом', employer: 'Фотоателье «Лихт»' },
  { title: 'Schuster (Сапожник)', ru: 'сапожником', employer: 'Сапожная мастерская «Хольц»' },
  { title: 'Elektriker (Электрик)', ru: 'электриком', employer: 'Городская электростанция' },
  { title: 'Drucker (Печатник)', ru: 'печатником', employer: 'Типография окружного управления' },
  { title: 'Lagerverwalter (Заведующий складом)', ru: 'заведующим складом', employer: 'Складское управление' },
  { title: 'Näherin (Швея)', ru: 'швеёй', employer: 'Швейная мастерская «Эльза»' },
  { title: 'Bibliothekar (Библиотекарь)', ru: 'библиотекарем', employer: 'Городская библиотека' },
  { title: 'Maler (Маляр)', ru: 'маляром', employer: 'Артель отделочных работ' },
  { title: 'Musiker (Музыкант)', ru: 'музыкантом', employer: 'Театр «Ринг»' },
  { title: 'Glasbläser (Стеклодув)', ru: 'стеклодувом', employer: 'Стекольная мануфактура' },
  { title: 'Pfleger (Санитар)', ru: 'санитаром', employer: 'Городская лечебница' },
  { title: 'Kontorist (Конторский служащий)', ru: 'конторским служащим', employer: 'Контора грузовых перевозок' },
];

const PURPOSES = ['Arbeit (Работа)', 'Familie besuchen (К семье)', 'Geschäftsreise (Командировка)', 'Umzug (Переезд)', 'Behandlung (Лечение)', 'Studien (Учёба)'];
const SKIN_TONES = ['#edd1b7', '#e8cbae', '#e3c4a6', '#ddbd9e', '#d7b595'];
const HAIR_COLORS = ['#2a1810', '#4a2818', '#6a4020', '#8a6030', '#c8a060', '#5a4838', '#bda678'];
const GREY_HAIR_COLORS = ['#b4b0a7', '#aaa79f', '#c4c0b6', '#afa99f'];
const EYE_COLORS_HUMAN = ['#4a6a30', '#3a5a80', '#5a4020', '#3a2a18', '#6a8a90'];
const NIX_EYE_BLUES = ['#3a5a80', '#4a6a9a', '#2a4a70', '#5a7aa0'];
const GLOVE_COLORS = ['#2a1d17', '#3b241b', '#2c302e', '#3c1e1d', '#38332b'];

const MISSING_DOCUMENT_REPLIES = [
  'Ой, {docAcc} я точно {положил|положила} не в тот карман. Сейчас ещё раз всё проверю.',
  'Чёрт, {docAcc} я оставил{а|} дома. Думал{а|}, что папка у меня в сумке.',
  'Вот ведь невезение… Я {собирался|собиралась} взять {docAcc}, но в спешке забыл{а|}.',
  'Я был{а|} уверен{а|}, что {docNom} со мной. Видимо, он остался на столе перед отъездом.',
  'На станции у меня проверяли вещи, и после этого {docNom} пропал. Больше бумаг у меня нет.',
  'В вагоне такая толчея была… Папка раскрылась, и {docNom}, кажется, выпал вместе с билетами.',
  'Мне сказали, что {docNom} донесут к поезду. Похоже, я зря им поверил{а|}.',
  'Есть копия {docGen}, но оригинал остался у начальника. Понимаю, что это не одно и то же.',
  'Я {сунул|сунула} бумаги в разные карманы. Паспорт здесь, а {docGen} с собой нет.',
  'После переправы всё промокло. {docNom} пришлось оставить сушиться, а поезд уже уходил.',
  'Я только сейчас заметил{а|}, что в папке нет {docGen}. Очень глупо получилось.',
  'Пожалуйста, не сердитесь. Я торопил{ся|ась} к семье и совсем забыл{а|} про {docAcc}.',
  'В гостинице осталась маленькая папка. В ней как раз лежит {docNom}.',
  'Работодатель может подтвердить мои данные, но {docGen} сегодня у меня нет.',
  'Наверное, я оставил{а|} {docAcc} на предыдущем посту. Там долго держали мои вещи.',
  'Я {искал|искала} {docAcc} всю дорогу, но так и не нашёл{|ла}. Не буду придумывать оправдания.',
  'Мне выдали справку вместо {docGen}. Я думал{а|}, что на границе этого хватит.',
  'Если хотите, запишите мой адрес и спросите у начальника. Но сейчас {docNom} я предъявить не могу.',
  'Я понимаю, что без {docGen} меня могут не пустить. Ошибка моя, просто очень неудачный день.',
  'Ну вот… паспорт есть, а {docGen} нет. Сам{а|} не понимаю, как я так собрал{ся|ась}.',
] as const;

function missingDocumentReply(id: number, gender: 'm' | 'f', missingDocument: MissingDocument): string {
  const docNom = missingDocument === 'passport' ? 'Паспорт' : 'Рабочая виза';
  const docAcc = missingDocument === 'passport' ? 'паспорт' : 'рабочую визу';
  const docGen = missingDocument === 'passport' ? 'паспорта' : 'рабочей визы';
  const docPrep = missingDocument === 'passport' ? 'паспортом' : 'рабочей визой';
  const template = MISSING_DOCUMENT_REPLIES[Math.floor(visitorRoll(id, 0x4d495353) * MISSING_DOCUMENT_REPLIES.length)];
  return genderReply(gender, template.replace(/\{docNom\}/g, docNom).replace(/\{docAcc\}/g, docAcc).replace(/\{docGen\}/g, docGen).replace(/\{docPrep\}/g, docPrep));
}

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

function formatAge(age: number): string {
  const mod100 = age % 100;
  const mod10 = age % 10;
  const word = mod100 >= 11 && mod100 <= 14 ? 'лет'
    : mod10 === 1 ? 'год'
      : mod10 >= 2 && mod10 <= 4 ? 'года' : 'лет';
  return `${age} ${word}`;
}

export type VisitorExtras = {
  name?: string;
  birth?: string;
  city?: string;
  gender?: 'm' | 'f';
  headwear?: HeadwearStyle | null;
  allowMilitaryHeadwear?: boolean;
  hairStyle?: Traits['hairStyle'];
  hairColor?: string;
  eyeColor?: string;
  eyeTilt?: number;
  eyeScale?: number;
  eyelidOpenness?: number;
  browTilt?: number;
  furrowedBrows?: boolean;
  faceShape?: Traits['faceShape'];
  nose?: Traits['nose'];
  facialHair?: Traits['facialHair'];
  mouthWrinkles?: boolean;
  clothingStyle?: ClothingStyle | string | null;
  wearsGlasses?: boolean;
  glassesStyle?: GlassesStyle;
  wearsGloves?: boolean;
  gloveStyle?: GloveStyle;
  bodyHair?: BodyHair;
  shift?: Shift;
  forceOldYear?: number;
  dyedHairHuman?: boolean;
  occupationCase?: OccupationCase;
  missingDocument?: MissingDocument | null;
  hasScales?: boolean;
  voice?: VoiceId;
  breathResult?: BreathResult;
  breathOdor?: string;
  hasExtraFinger?: boolean;
  hasMultiplePupils?: boolean;
  pupilReactsToLight?: boolean;
  hasFangs?: boolean;
  weightKg?: number;
  heightCm?: number;
  bagItems?: BagItemId[];
  specialOutcome?: 'goebbels';
};

export function generateVisitor(id: number, forcedType?: CreatureType, extras?: VisitorExtras): Visitor {
  const rng = makeRng(id * 7919 + 13);
  const faceRng = makeRng(id * 19391 + GAME_YEAR);
  const bodyRng = makeRng(id * 104729 + 17);
  const loreRng = makeRng(id * 55631 + 99);
  const voiceRng = makeRng(id * 31847 + 647);
  const breathRng = makeRng(id * 8191 + 43);

  const gender: 'm' | 'f' = extras?.gender ?? (rng() > 0.5 ? 'm' : 'f');
  // Independent hashed rolls avoid both story RNG changes and correlations
  // between neighbouring visitors / the campaign's 100-ID shift intervals.
  const headwearChoice = () => visitorRoll(id, 0x57454152);
  // A civilian visitor can never be assigned a military/political potato hat,
  // including through explicit extras. The gallery still exposes those hats.
  const explicitHeadwear: HeadwearStyle | null | undefined = extras?.headwear !== undefined
    ? (extras.headwear && MILITARY_HEADWEAR.has(extras.headwear) && !extras.allowMilitaryHeadwear ? null : extras.headwear)
    : undefined;
  const headwear: HeadwearStyle | null = explicitHeadwear !== undefined ? explicitHeadwear
    : visitorRoll(id, 0x48454144) < 0.32
      ? (gender === 'm' ? pick(RANDOM_MALE_HEADWEAR, headwearChoice) : pick(RANDOM_FEMALE_HEADWEAR, headwearChoice)) : null;
  const first = gender === 'm' ? pick(FIRST_M, rng) : pick(FIRST_F, rng);
  const name = extras?.name ?? `${first} ${pick(LAST, rng)}`;
  // Every randomly generated visitor is an adult: passport ages range from 18 to 63.
  const rawYear = GAME_YEAR - (18 + Math.floor(rng() * 46));
  const year = extras?.forceOldYear ?? rawYear;
  const month = 1 + Math.floor(rng() * 12);
  const day = 1 + Math.floor(rng() * 28);
  const birth = extras?.birth ?? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
  const type = forcedType ?? 'human';
  const ageYears = GAME_YEAR - year;

  const dyedHairHuman = extras?.dyedHairHuman ?? (type === 'human' && ageYears >= AGING_THRESHOLD && loreRng() < 0.35);
  // Wrinkles begin at 45, while grey hair remains a separate 55+ trait.
  // Vampires never age or go grey even if 1943 - birthYear >= 55.
  const hasOldWrinkles = type !== 'vampire' && ageYears >= WRINKLES_THRESHOLD;
  const hasGreyHair = type !== 'vampire' && ageYears >= AGING_THRESHOLD && !dyedHairHuman;

  const shift = extras?.shift ?? 1;
  const humanScalePattern = type === 'human' && shift >= 9
    && (extras?.hasScales ?? visitorRoll(id, 0x5343414c) < 0.24);
  const missingDocument: MissingDocument | null = type === 'human'
    ? extras?.missingDocument !== undefined
      ? extras.missingDocument
      : visitorRoll(id, 0x444f4353) < MISSING_DOCUMENT_CHANCE
        ? visitorRoll(id, 0x444f4332) < 0.5 ? 'passport' : 'visa'
        : null
    : null;
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
    hairColor: extras?.hairColor ?? pick(HAIR_COLORS, rng),
    hairStyle: extras?.hairStyle ?? (gender === 'm' ? pick(MALE_HAIRSTYLES, rng) : pick(RANDOM_FEMALE_HAIRSTYLES, rng)),
    headwear,
    // Independent cosmetic hash: do not consume/change the story RNG.
    clothingStyle: extras?.clothingStyle !== undefined ? extras.clothingStyle
      : gender === 'f' ? pick(RANDOM_FEMALE_CLOTHING, () => visitorRoll(id, 0x44524553))
      : pick(POTATO_CIVILIAN_MALE_CLOTHING, () => visitorRoll(id, 0x4d414c32)),
    faceShape: extras?.faceShape ?? (gender === 'm' ? pick(MALE_FACE_SHAPES, faceRng) : pick(FEMALE_FACE_SHAPES, faceRng)),
    nose: extras?.nose ?? pick(NOSE_TYPES, rng),
    eyeColor: extras?.eyeColor ?? pick(EYE_COLORS_HUMAN, rng),
    eyeShape: 'normal',
    hasFangs: extras?.hasFangs ?? false,
    hasClaws: false,
    hasWebbing: false,
    dirtyNails: false,
    nailColor: '#f0dcb8',
    hasScales: humanScalePattern,
    scalePatternColor: humanScalePattern ? '#6f493b' : undefined,
    hasFur: bodyHair === 'long',
    bodyHair,
    hasSecondJaw: type === 'doppelganger',
    hasExtraFinger: doppelExtraFinger,
    hasMultiplePupils: doppelMultiPupil,
    pupilReactsToLight: pupilReacts,
    bloodshotSclera,
    yellowSclera: false,
    pearlyNails: false,
    nailAlgae: false,
    sharkTeeth: false,
    greenTeeth: false,
    paleSkin: false,
    gender,
    facialHair: extras?.facialHair ?? (gender === 'm' ? pick(MALE_FACIAL_HAIR, rng) : 'none'),
    age: hasOldWrinkles ? 'old' : type === 'vampire' || ageYears < 35 ? 'young' : 'mid',
    ageYears,
    greyHair: hasGreyHair,
    eyeTilt: extras?.eyeTilt ?? Math.round((rng() * 2 - 1) * EYE_TILT_RANGE * 10) / 10,
    eyeScale: extras?.eyeScale,
    eyelidOpenness: extras?.eyelidOpenness,
    browTilt: extras?.browTilt,
    furrowedBrows: extras?.furrowedBrows,
    mouthWrinkles: extras?.mouthWrinkles ?? false,
    wearsGlasses: extras?.wearsGlasses ?? false,
    glassesStyle: extras?.glassesStyle ?? pick(GLASSES_STYLES, faceRng),
    wearsGloves: extras?.wearsGloves ?? false,
    gloveStyle: extras?.gloveStyle ?? pick(GLOVE_STYLES, faceRng),
    gloveColor: pick(GLOVE_COLORS, faceRng),
  };

  if (hasGreyHair) traits.hairColor = pick(GREY_HAIR_COLORS, faceRng);

  // Preserve the old generic greeting's RNG draw, without using it for speech.
  rng();
  const quote = arrivalPhrase(id);

  if (type === 'vampire') {
    traits.paleSkin = true;
    traits.hasFangs = true;
    traits.eyeColor = pick(['#8a1010', '#a02020', '#601818'], rng);
  } else if (type === 'werewolf') {
    traits.hasClaws = true;
    traits.nailColor = '#2a1810';
    traits.eyeColor = pick(['#c88020', '#a06018', '#d8a030'], rng);
    traits.eyeShape = 'slit';
  } else if (type === 'mermaid') {
    traits.hasScales = true;
    traits.scalePatternColor = '#2a5a70';
    traits.hasWebbing = true;
    traits.eyeColor = pick(['#2a8090', '#4aa0b0', '#20607a'], rng);
    // Meerleute skin is only slightly cooler than human, not openly blue.
    traits.skinTone = '#d5d0c4';
    traits.yellowSclera = true;
    traits.pearlyNails = true;
    traits.sharkTeeth = true;
    traits.eyeShape = 'horizontal';
  } else if (type === 'ghoul') {
    traits.paleSkin = true;
    traits.dirtyNails = true;
    traits.nailColor = '#ded0b5';
    traits.eyeColor = pick(['#a0a020', '#808018', '#606010'], rng);
    traits.eyeShape = 'slit';
  } else if (type === 'doppelganger') {
    traits.bodyHair = 'smooth';
    traits.hasSecondJaw = true;
    traits.bloodshotSclera = false;
  } else if (type === 'nix') {
    // River folk look human: ordinary skin, no scales or webbing.
    traits.eyeColor = camouflageRoll(id, 0x4e495845) < 0.6 ? pick(NIX_EYE_BLUES, rng) : pick(EYE_COLORS_HUMAN, rng);
    traits.greenTeeth = gender === 'm';
    traits.nailAlgae = gender === 'f';
  }

  const disguise = eyeCamouflage(id, type, shift);
  if (disguise.eyesDisguised) {
    traits.eyeColor = pick(EYE_COLORS_HUMAN, () => camouflageRoll(id, 0x434f4c37));
    traits.eyeShape = 'normal';
  }

  if (type === 'human') traits.yellowSclera = camouflageRoll(id, 0x59454c4c) < 0.2;

  // Each old creature-specific opening consumed one additional draw.
  // Keep subsequent cities/jobs/purposes and all non-dialogue RNG results stable.
  if (type !== 'human') rng();

  const city = extras?.city ?? pick(CITIES, rng);
  const spokenCity = SPOKEN_CITIES_RU[city];
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
  let hasInvalidDocs = missingDocument !== null;
  let occupationInitialReply = missingDocument
    ? `Я работаю ${primaryJob.ru}. Второй документ остался дома, я его не взял{а|}. Вот что есть при мне.`
    : `Я работаю ${primaryJob.ru}. Еду по направлению в ${spokenCity}, все бумаги при мне.`;
  let occupationFollowUpReply = `Как я и {сказал|сказала}, работаю ${primaryJob.ru}, в рабочей визе и паспорте всё сходится.`;

  if (occupationCase === 'slip') {
    spokenOccupation = altJob.title;
    occupationInitialReply = `Я всю жизнь работаю ${altJob.ru}… то есть еду по рабочему предписанию в ${spokenCity}.`;
  } else if (occupationCase === 'wrong_docs') {
    hasInvalidDocs = true;
    visaOccupation = altJob.title;
    spokenOccupation = primaryJob.title;
    occupationInitialReply = missingDocument === 'passport'
      ? `Паспорта при мне нет. Я работаю ${primaryJob.ru}, направляюсь в ${spokenCity}.`
      : missingDocument === 'visa'
        ? `Рабочей визы при мне нет. По паспорту я работаю ${primaryJob.ru}, направляюсь в ${spokenCity}.`
        : `По паспорту я работаю ${primaryJob.ru}, направляюсь в ${spokenCity}.`;
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
      formerRole: altJob.ru, currentRole: primaryJob.ru, missingDocument,
    }, Math.floor(makeRng(id * 4507 + 73)() * OCCUPATION_REPLY_VARIANTS));
  }

  let greyHairReply = `По паспорту мне ${formatAge(ageYears)}.`;
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
    greyHairReply = `Мне уже ${formatAge(ageYears)}, господин офицер — голова давно вся седая, тут скрывать нечего.`;
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
    : type === 'mermaid' ? (extras?.breathResult ?? 'salt')
      : type === 'nix' ? (extras?.breathResult ?? 'droplets')
        : type === 'human' ? (extras?.breathResult === 'dry' || extras?.breathResult === 'fog' ? extras.breathResult : breathRng() < 0.35 ? 'dry' : 'fog')
          : 'fog';
  const heightCm = extras?.heightCm ?? 155 + Math.floor(visitorRoll(id, 0x48454947) * 31);
  const baseWeightKg = 48 + Math.floor(visitorRoll(id, 0x57454947) * 34);
  const weightKg = extras?.weightKg ?? baseWeightKg + (type === 'werewolf'
    ? 8 + Math.floor(visitorRoll(id, 0x574f4c46) * 8)
    : 0);

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
    missingDocument,
    missingDocumentReply: missingDocument ? missingDocumentReply(id, gender, missingDocument) : '',
    hasInvalidDocs,
    spokenOccupation,
    occupationInitialReply: genderReply(gender, occupationInitialReply),
    occupationFollowUpReply: genderReply(gender, occupationFollowUpReply),
    weightKg,
    heightCm,
    weightReply: `Весы показывают ${weightKg} килограммов.`,
    heightReply: `Рост — ${heightCm} сантиметров.`,
    specialOutcome: extras?.specialOutcome,
    dyedHairHuman,
    greyHairReply: genderReply(gender, greyHairReply),
    voice,
    voiceQuestion,
    voiceReply: genderReply(gender, voiceReply),
    breathResult,
    breathOdor: extras?.breathOdor,
    eyesDisguised: disguise.eyesDisguised,
    bagItems: extras?.bagItems ?? bagContents(id, disguise.hasBelladonna),
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
    { type: 'mermaid', extras: { wearsGloves: true } },
    { type: 'human', extras: { breathResult: 'dry', bodyHair: 'stubble', occupationCase: 'slip' } },
    { type: 'human', extras: { breathResult: 'fog', occupationCase: 'wrong_docs', wearsGloves: true } },
    { type: 'werewolf', extras: { bodyHair: 'smooth', wearsGlasses: true, wearsGloves: true } },
    { type: 'human', extras: { breathResult: 'dry', occupationCase: 'match' } },
    { type: 'vampire', extras: { forceOldYear: 1885, wearsGlasses: true, glassesStyle: 'tinted', occupationCase: 'forged' } },
    { type: 'ghoul', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { breathResult: 'fog', wearsGlasses: true, bodyHair: 'long' } },
    { type: 'mermaid', extras: { wearsGlasses: true, wearsGloves: true } },
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
    { type: 'mermaid', extras: { wearsGloves: true, wearsGlasses: true } },
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
    { type: 'mermaid', extras: { wearsGloves: true, wearsGlasses: true } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', wearsGlasses: false, wearsGloves: false, hasExtraFinger: false, hasMultiplePupils: false } },
    { type: 'ghoul', extras: { bodyHair: 'long', wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { breathResult: 'fog', bodyHair: 'long', occupationCase: 'match' } },
    { type: 'doppelganger', extras: { occupationCase: 'slip', wearsGlasses: true, wearsGloves: true, hasExtraFinger: true, hasMultiplePupils: true } },
  ];
  return specs.map((spec, i) => generateVisitor(501 + i, spec.type, { ...spec.extras, shift: 6 }));
}

// Night 7 (18 October): eye camouflage and inspection of hand luggage.
export function buildNight7(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { occupationCase: 'match' } },
    { type: 'werewolf', extras: { wearsGloves: true, bodyHair: 'smooth', occupationCase: 'match' } },
    { type: 'ghoul', extras: { wearsGlasses: true, bodyHair: 'stubble', occupationCase: 'forged' } },
    { type: 'mermaid', extras: { wearsGloves: true, occupationCase: 'match' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs', wearsGlasses: true } },
    { type: 'werewolf', extras: { bodyHair: 'long', occupationCase: 'forged' } },
    { type: 'vampire', extras: { forceOldYear: 1881, wearsGlasses: true, occupationCase: 'forged' } },
    { type: 'mermaid', extras: { wearsGlasses: true, wearsGloves: true } },
    { type: 'ghoul', extras: { wearsGloves: true, occupationCase: 'match' } },
    { type: 'human', extras: { occupationCase: 'slip', bodyHair: 'long' } },
    { type: 'doppelganger', extras: { hasMultiplePupils: true, occupationCase: 'forged' } },
    { type: 'werewolf', extras: { wearsGlasses: true, wearsGloves: true, bodyHair: 'stubble' } },
    { type: 'human', extras: { occupationCase: 'match', wearsGloves: true } },
  ];
  return specs.map((spec, i) => generateVisitor(601 + i, spec.type, { ...spec.extras, shift: 7 }));
}

// Night 8 (19 October): river Nixen join the queue.
export function buildNight8(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { occupationCase: 'match' } },
    { type: 'nix', extras: { occupationCase: 'match' } },
    { type: 'mermaid', extras: { wearsGloves: true, gloveStyle: 'wool', occupationCase: 'match' } },
    { type: 'human', extras: { occupationCase: 'slip', wearsGlasses: true } },
    { type: 'nix', extras: { wearsGlasses: true, occupationCase: 'wrong_docs' } },
    { type: 'werewolf', extras: { bodyHair: 'stubble', occupationCase: 'forged' } },
    { type: 'nix', extras: { wearsGloves: true, gloveStyle: 'dress', occupationCase: 'match' } },
    { type: 'vampire', extras: { forceOldYear: 1880, wearsGlasses: true, occupationCase: 'forged' } },
    { type: 'mermaid', extras: { occupationCase: 'forged' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs' } },
    { type: 'ghoul', extras: { wearsGloves: true, occupationCase: 'forged' } },
    { type: 'doppelganger', extras: { hasExtraFinger: true, occupationCase: 'forged' } },
    { type: 'nix', extras: { breathResult: 'droplets', occupationCase: 'slip' } },
    { type: 'human', extras: { occupationCase: 'match', wearsGloves: true } },
  ];
  // Ids 730/754 keep the Meerleute able to agree to the breath test (salt crystals must stay observable).
  const ids = specs.map((_, i) => 701 + i);
  ids[2] = 730;
  ids[8] = 754;
  return specs.map((spec, i) => generateVisitor(ids[i], spec.type, { ...spec.extras, shift: 8 }));
}

// Night 9 (20 October): enemy sabotage has worsened water quality; human eczema can resemble scales.
export function buildNight9(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { hasScales: true, occupationCase: 'match' } },
    { type: 'human', extras: { hasScales: true, occupationCase: 'wrong_docs' } },
    { type: 'mermaid', extras: { occupationCase: 'forged' } },
    { type: 'nix', extras: { breathResult: 'droplets', occupationCase: 'match' } },
    { type: 'human', extras: { hasScales: true, occupationCase: 'match', breathResult: 'fog' } },
    { type: 'werewolf', extras: { bodyHair: 'stubble', occupationCase: 'forged' } },
    { type: 'human', extras: { occupationCase: 'slip' } },
    { type: 'vampire', extras: { forceOldYear: 1881, occupationCase: 'forged' } },
    { type: 'mermaid', extras: { wearsGloves: true, occupationCase: 'match' } },
    { type: 'human', extras: { occupationCase: 'wrong_docs', wearsGlasses: true } },
    { type: 'doppelganger', extras: { hasMultiplePupils: true, occupationCase: 'forged' } },
    { type: 'ghoul', extras: { wearsGloves: true, occupationCase: 'forged' } },
    { type: 'human', extras: { hasScales: true, occupationCase: 'match' } },
    { type: 'nix', extras: { wearsGlasses: true, occupationCase: 'slip' } },
    { type: 'human', extras: { occupationCase: 'match', wearsGloves: true } },
  ];
  return specs.map((spec, i) => generateVisitor(801 + i, spec.type, { ...spec.extras, shift: 9 }));
}

// Night 10 (21 October): a new catalogue order, with the named official fixed in slot three.
export function buildNight10(): Visitor[] {
  const specs: Array<{ type: CreatureType; extras: VisitorExtras }> = [
    { type: 'human', extras: { occupationCase: 'match' } },
    { type: 'werewolf', extras: { occupationCase: 'forged', bodyHair: 'stubble' } },
    { type: 'human', extras: {
      name: 'Пауль Йозеф Геббельс', birth: '29.10.1897', city: 'Berlin', gender: 'm', forceOldYear: 1897,
      occupationCase: 'match', missingDocument: null, specialOutcome: 'goebbels',
      hairStyle: MALE_HAIRSTYLES[13], hairColor: '#2a1810', eyeColor: '#5a3a22', eyeTilt: 0,
      eyeScale: 1.16, eyelidOpenness: 0.58, browTilt: 0, furrowedBrows: true, nose: 'wide-tip', facialHair: 'none', mouthWrinkles: true,
      headwear: 'head-goebbels-cap', allowMilitaryHeadwear: true, clothingStyle: 'uni-goebbels-suit',
      hasFangs: true, pupilReactsToLight: false, wearsGloves: true, gloveStyle: 'leather',
      bodyHair: 'smooth', voice: 'm9', breathResult: 'fog', breathOdor: 'резкий запах перегара',
      heightCm: 165, weightKg: 45, bagItems: ['partyBadge', 'partyDirective', 'partyArmband', 'partyCards'],
    } },
    { type: 'nix', extras: { occupationCase: 'slip', breathResult: 'droplets' } },
    { type: 'ghoul', extras: { occupationCase: 'forged', wearsGloves: true } },
    { type: 'human', extras: { occupationCase: 'match', missingDocument: 'passport' } },
    { type: 'mermaid', extras: { occupationCase: 'forged' } },
    { type: 'vampire', extras: { occupationCase: 'match', forceOldYear: 1883, wearsGlasses: true } },
    { type: 'doppelganger', extras: { occupationCase: 'forged', hasMultiplePupils: true } },
    { type: 'human', extras: { occupationCase: 'wrong_docs', wearsGloves: true } },
    { type: 'nix', extras: { occupationCase: 'match', wearsGlasses: true } },
    { type: 'werewolf', extras: { occupationCase: 'slip', bodyHair: 'long' } },
    { type: 'human', extras: { occupationCase: 'match' } },
    { type: 'mermaid', extras: { occupationCase: 'forged', wearsGloves: true } },
    { type: 'ghoul', extras: { occupationCase: 'forged' } },
  ];
  return specs.map((spec, i) => {
    const visitor = generateVisitor(1001 + i, spec.type, { ...spec.extras, shift: 10 });
    if (i !== 2) return visitor;
    return {
      ...visitor,
      name: 'Пауль Йозеф Геббельс',
      birth: '29.10.1897',
      birthYear: 1897,
      city: 'Berlin',
      occupation: 'Reichsminister (Министр пропаганды)',
      visaOccupation: 'Reichsminister (Министр пропаганды)',
      visaEmployer: 'Канцелярия рейха',
      visaCity: 'Berlin',
      purpose: 'Dienstreise (Служебная поездка)',
      occupationCase: 'match',
      missingDocument: null,
      hasInvalidDocs: false,
      spokenOccupation: 'Reichsminister (Министр пропаганды)',
      occupationInitialReply: 'Я прибыл по служебному поручению. Сверяйте бумаги и не задерживайте очередь.',
      occupationFollowUpReply: 'Номер визы совпадает с паспортом. Здесь нет повода для спора.',
      quote: 'Война требует порядка, а порядок начинается с точной записи каждого имени.',
      voiceQuestion: 'Откуда у вас такой голос?',
      voiceReply: '«Война требует порядка, а порядок начинается с точной записи каждого имени». Так звучит голос времени.',
      weightReply: 'Вес — 45 килограммов.',
      heightReply: 'Рост — 165 сантиметров.',
      breathResult: 'fog',
      breathOdor: 'резкий запах перегара',
      bagItems: ['partyBadge', 'partyDirective', 'partyArmband', 'partyCards'],
      specialOutcome: 'goebbels',
    };
  });
}

// Night 11 reuses the existing visitor rules and catalogue. The named official
// does not return; his passage only changes the tone of the next newspaper.
export function buildNight11(): Visitor[] {
  const previousNight = buildNight10();
  const ordinaryReplacement = generateVisitor(1103, 'human', { shift: 11, occupationCase: 'match' });
  return previousNight.map((visitor, index) => index === 2
    ? ordinaryReplacement
    : { ...visitor, id: visitor.id + 100 });
}

// Night 12 keeps the existing rules and visitor catalogue unchanged.
export function buildNight12(): Visitor[] {
  return buildNight11();
}

export function buildShift(shift: Shift): Visitor[] {
  return shift === 1 ? buildDay1()
    : shift === 2 ? buildNight2()
    : shift === 3 ? buildNight3()
    : shift === 4 ? buildNight4()
    : shift === 5 ? buildNight5()
    : shift === 6 ? buildNight6()
      : shift === 7 ? buildNight7()
        : shift === 8 ? buildNight8()
          : shift === 9 ? buildNight9()
            : shift === 10 ? buildNight10()
              : shift === 11 ? buildNight11()
                : buildNight12();
}
