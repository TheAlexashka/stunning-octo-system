import { useConversation } from './conversation';
import type { Conversation, ConversationSnapshot, DialogueProfile } from './conversation';
import type { Gender } from './gender';
export type { ConversationPhase as DentalPhase, ConversationResponse as DentalResponse, DialogueLine } from './conversation';
export type InspectionSubject = 'teeth' | 'glasses' | 'gloves';
type Profile = DialogueProfile;

// Personality, not creature type, determines consent. Retrying the same tab does
// not reroll a refusal or reveal hidden traits without consent.
const TEETH_PROFILES: readonly Profile[] = [
  {
    agreesImmediately: true,
    firstReply: 'Все зубы свои! Только за один ещё не {расплатился|расплатилась}. Смотрите.',
    reassurance: 'Это обычная проверка, она займёт секунду.',
    reassuredReply: 'Да, конечно.', reassured: true,
    firmReply: 'Хорошо, я {готов|готова}.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Я только что {поел|поела} лук с чесноком… Не хочу, чтобы вам было неприятно.',
    reassurance: 'Ничего страшного. Запах не имеет значения, я только посмотрю зубы.',
    reassuredReply: 'Ну, если вы не против… Хорошо. Только не подходите слишком близко.', reassured: true,
    firmReply: 'Ладно. Но я вас {предупреждал|предупреждала} про чеснок.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'На зубную пасту сейчас денег нет. Мне неловко показывать…',
    reassurance: 'Мы не оцениваем вашу гигиену. Это короткий осмотр, без прикосновений.',
    reassuredReply: 'Спасибо. Тогда смотрите. Я просто не {хотел|хотела} позориться.', reassured: true,
    firmReply: 'Хорошо… Только не смейтесь.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Нет. Открывать рот перед незнакомым человеком — неприлично.',
    reassurance: 'Понимаю. Это обычная проверка, и я не буду к вам прикасаться.',
    reassuredReply: 'Я понимаю ваши правила, но моего согласия это не меняет.', reassured: false,
    firmReply: 'Тогда проверяйте документы или руки. Рот я не открою.', persuadedByRules: false,
  },
  {
    agreesImmediately: true,
    firstReply: 'Да без проблем. Все на месте, можете пересчитать!',
    reassurance: 'Это всего лишь короткая проверка.',
    reassuredReply: 'Конечно.', reassured: true,
    firmReply: 'Смотрите.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Здесь? При всех? Можно как-нибудь обойтись без этого?',
    reassurance: 'Осмотр виден только мне. Ничего страшного — всего несколько секунд.',
    reassuredReply: 'Хорошо… Если только вы смотрите, я {согласен|согласна}.', reassured: true,
    firmReply: 'Ну ладно, раз это обязательно. Побыстрее, пожалуйста.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'У меня болит челюсть. Простите, но открыть рот сейчас не могу.',
    reassurance: 'Я не буду прикасаться. Если можете, откройте совсем немного.',
    reassuredReply: 'Нет, больно даже так. Пожалуйста, осмотрите что-нибудь другое.', reassured: false,
    firmReply: 'Я не отказываюсь от проверки. Просто сейчас не могу открыть рот.', persuadedByRules: false,
  },
  {
    agreesImmediately: false,
    firstReply: 'Разве документов недостаточно? Зачем вам ещё мои зубы?',
    reassurance: 'Проверяем внешние признаки. Это быстро и не похоже на приём у зубного врача.',
    reassuredReply: 'Хорошо. Если таковы правила — смотрите.', reassured: true,
    firmReply: 'Ладно. Давайте закончим с этим.', persuadedByRules: true,
  },
  {
    agreesImmediately: true,
    firstReply: 'Конечно. Сказать «а-а-а»? У врача я уже {тренировался|тренировалась}.',
    reassurance: 'Только на несколько секунд.',
    reassuredReply: 'Да, конечно.', reassured: true,
    firmReply: 'Хорошо.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Я {ел|ела} копчёную рыбу. Боюсь, запах вам совсем не понравится.',
    reassurance: 'Это не проблема. Мне нужно только увидеть зубы.',
    reassuredReply: 'Ну хорошо. Тогда не говорите, что я вас не {предупреждал|предупреждала}.', reassured: true,
    firmReply: 'Раз требуется, я {согласен|согласна}.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Мне не нравится, когда разглядывают мой рот. Я не {согласен|согласна}.',
    reassurance: 'Проверка будет короткой. Можно просто приоткрыть губы.',
    reassuredReply: 'Ладно… Только быстро.', reassured: true,
    firmReply: 'Не нужно на меня давить. Нет.', persuadedByRules: false,
  },
  {
    agreesImmediately: true,
    firstReply: 'Конечно, вот так? Зубы чищены, даже завтрак между ними не застрял.',
    reassurance: 'Это короткая проверка.',
    reassuredReply: 'Хорошо.', reassured: true,
    firmReply: 'Да, смотрите.', persuadedByRules: true,
  },
];

const GLASSES_PROFILES: readonly Profile[] = [
  {
    agreesImmediately: false,
    firstReply: 'Без очков я почти {слеп|слепа} — даже вашего лица за стеклом не разгляжу.',
    reassurance: 'Читать ничего не нужно. Снимите очки всего на пару секунд и смотрите прямо.',
    reassuredReply: 'Хорошо… Сейчас сниму. Только не двигайте мои бумаги.', reassured: true,
    firmReply: 'Ладно, раз положено по уставу — смотрите.', persuadedByRules: true,
  },
  {
    agreesImmediately: true,
    firstReply: 'Конечно, сейчас сниму. От ночного тумана стёкла всё равно запотели.',
    reassurance: 'Благодарю, это займёт пару секунд.',
    reassuredReply: 'Пожалуйста.', reassured: true,
    firmReply: 'Смотрите.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'У меня сильная резь в глазах от вашей настольной лампы. Врач прописал тёмные стёкла.',
    reassurance: 'Я прикрою абажур рукой. Мне нужно лишь убедиться в цвете радужки.',
    reassuredReply: 'Спасибо… Так действительно не слепит. Смотрите скорее.', reassured: true,
    firmReply: 'Хорошо, потерплю пару секунд. Но свет у вас невыносимый.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Оправа держится на честном слове, дужка треснула в поезде. Боюсь окончательно сломать.',
    reassurance: 'Снимите осторожно двумя руками и положите на сукно. Я ничего не трону.',
    reassuredReply: 'Ладно, осторожно сниму. Новых стёкол сейчас ни за какие марки не достать.', reassured: true,
    firmReply: 'Ладно, сниму. Только бы винтик не выскочил.', persuadedByRules: true,
  },
  {
    agreesImmediately: true,
    firstReply: 'Да-да, простите, {забыл|забыла} снять с дороги. Вот, пожалуйста.',
    reassurance: 'Это быстрая проверка.',
    reassuredReply: 'Конечно.', reassured: true,
    firmReply: 'Смотрите.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Зачем вам мои глаза? В паспорте же всё написано, а очки я ношу с детства.',
    reassurance: 'Ночное распоряжение комендатуры: сверяем радужку каждого прибывающего.',
    reassuredReply: 'Вот как… Ну, раз ночное распоряжение — пожалуйста, смотрите.', reassured: true,
    firmReply: 'Понятно. Порядок есть порядок, снимаю.', persuadedByRules: true,
  },
];

const GLOVES_PROFILES: readonly Profile[] = [
  {
    agreesImmediately: false,
    firstReply: 'У вас в будке страшный сквозняк, а у меня пальцы совсем закоченели с перрона.',
    reassurance: 'Осмотр займёт пять секунд, сразу наденете обратно.',
    reassuredReply: 'Ну хорошо… Сейчас стяну. Бр-р, какой холод.', reassured: true,
    firmReply: 'Ладно, потерплю холод. Вот руки.', persuadedByRules: true,
  },
  {
    agreesImmediately: true,
    firstReply: 'Разумеется. Сейчас стяну перчатки и положу ладони на прилавок.',
    reassurance: 'Спасибо.',
    reassuredReply: 'Пожалуйста.', reassured: true,
    firmReply: 'Смотрите.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'После дороги руки совсем растрескались. Не хотелось бы показывать их в таком виде.',
    reassurance: 'Мне нужен только короткий осмотр ногтей и пальцев, без оценки внешнего вида.',
    reassuredReply: 'Ладно, если это быстро. Только без лишних замечаний.', reassured: true,
    firmReply: 'Хорошо, показываю. Но давайте побыстрее.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Я не люблю снимать перчатки на людях. Можно проверить что-нибудь другое?',
    reassurance: 'Это закрытая часть осмотра. Я посмотрю только кисти и сразу верну вам перчатки.',
    reassuredReply: 'Хорошо… Тогда отвернитесь на секунду?', reassured: true,
    firmReply: 'Понимаю. Раз нужно, сниму.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Ногти после дороги выглядят ужасно. Мне неловко, честно.',
    reassurance: 'Я смотрю на признаки, а не на то, насколько аккуратно они выглядят.',
    reassuredReply: 'Ну, если дело только в этом… Смотрите.', reassured: true,
    firmReply: 'Ладно, показываю. Только не делайте из этого события.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Руки замёрзли, пальцы не слушаются. Дайте мне немного согреться.',
    reassurance: 'Осмотр займёт несколько секунд, потом сразу наденете перчатки.',
    reassuredReply: 'Хорошо, только недолго.', reassured: true,
    firmReply: 'Ладно, потерплю. Вот руки.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Мне неприятно, когда разглядывают мои руки. Можно без этой части проверки?',
    reassurance: 'Понимаю. Я не буду прикасаться — только посмотрю на ногти и пальцы.',
    reassuredReply: 'Тогда ладно. Только не трогайте.', reassured: true,
    firmReply: 'Хорошо. Но руками не трогайте.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Перчатки из плотной кожи, от сырости сели. Если сниму — потом полчаса не натяну.',
    reassurance: 'Снимите обе перчатки ненадолго. После осмотра сразу наденете обратно.',
    reassuredReply: 'Хорошо, сниму обе. Только посмотрите побыстрее.', reassured: true,
    firmReply: 'Ладно, сниму. Поезд всё равно стоит до утра.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Позвольте, с какой стати я {должен|должна} разоблачаться? Это просто тёплые перчатки.',
    reassurance: 'После ночного случая на соседнем посту мы обязаны осматривать кисти рук.',
    reassuredReply: '{Слышал|Слышала} об этом в поезде… Хорошо, смотрите.', reassured: true,
    firmReply: 'Понимаю. Закон есть закон, снимаю перчатки.', persuadedByRules: true,
  },
  {
    agreesImmediately: true,
    firstReply: 'Ах да, конечно. В вагоне было так холодно, что я совсем про них {забыл|забыла}.',
    reassurance: 'Обычная формальность.',
    reassuredReply: 'Да, пожалуйста.', reassured: true,
    firmReply: 'Вот, смотрите.', persuadedByRules: true,
  },
];

const SUBJECT_PROMPTS: Record<InspectionSubject, {
  initialClerk: string;
  insistClerk: string;
}> = {
  teeth: {
    initialClerk: 'Откройте рот, пожалуйста.',
    insistClerk: 'Осмотр входит в проверку. Вы можете отказаться, но проверить зубы тогда не получится.',
  },
  glasses: {
    initialClerk: 'Снимите очки, пожалуйста. Мне нужно осмотреть ваши глаза.',
    insistClerk: 'По приказу СД досмотр глаз обязателен. Без снятия очков осмотр невозможен.',
  },
  gloves: {
    initialClerk: 'Снимите перчатки, пожалуйста. Положите руки на стол.',
    insistClerk: 'По инструкции пограничной службы осмотр кистей рук обязателен.',
  },
};

export type DentalConversation = Conversation;

function useSubjectConversation(visitorId: number, paused: boolean, subject: InspectionSubject,
  profiles: readonly Profile[], initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm'): DentalConversation {
  return useConversation({
    visitorId, paused, subject, profiles, initial, disabled, onReply, gender,
    prompt: SUBJECT_PROMPTS[subject].initialClerk,
    insist: SUBJECT_PROMPTS[subject].insistClerk,
  });
}
export function useDentalConversation(visitorId: number, paused: boolean, initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm'): DentalConversation {
  return useSubjectConversation(visitorId, paused, 'teeth', TEETH_PROFILES, initial, disabled, onReply, gender);
}
export function useGlassesConversation(visitorId: number, paused: boolean, initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm'): DentalConversation {
  return useSubjectConversation(visitorId, paused, 'glasses', GLASSES_PROFILES, initial, disabled, onReply, gender);
}
export function useGlovesConversation(visitorId: number, paused: boolean, initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm'): DentalConversation {
  return useSubjectConversation(visitorId, paused, 'gloves', GLOVES_PROFILES, initial, disabled, onReply, gender);
}
