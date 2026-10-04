import { useConversation, type Conversation, type ConversationSnapshot, type DialogueProfile } from './conversation';
import type { Gender } from './gender';

type GoebbelsSubject = 'teeth' | 'gloves' | 'breath' | 'bag';

// These exchanges are short spoken replies, not written stage directions.
const PROFILES: Record<GoebbelsSubject, DialogueProfile> = {
  gloves: {
    agreesImmediately: false,
    firstReply: 'Чёрт, опять проверка? Мои перчатки вас не касаются.',
    reassurance: 'Это займёт секунду. Мне нужно увидеть пальцы и ладони — потом сразу наденете их обратно.',
    reassuredReply: 'Хорошо, хорошо. Снимаю. Только давайте без лишних разговоров.',
    reassured: true,
    firmReply: 'Ладно, понял. Сниму, раз так положено.',
    persuadedByRules: true,
  },
  teeth: {
    agreesImmediately: false,
    firstReply: 'Открыть рот? Да что вы себе позволяете? Нет, сначала объясните зачем.',
    reassurance: 'Мне нужно только взглянуть на зубы. Я не буду к вам прикасаться.',
    reassuredReply: 'Ладно, раз это обычная процедура. Открываю — смотрите.',
    reassured: true,
    firmReply: 'Понял. Открываю рот, только не задерживайте меня.',
    persuadedByRules: true,
  },
  breath: {
    agreesImmediately: false,
    firstReply: 'Дышать на стекло? Нет, это уже смешно. Найдите другой способ.',
    reassurance: 'Нужен один выдох. Стекло к губам подносить не придётся.',
    reassuredReply: 'Хорошо, один выдох — и закончим с этим.',
    reassured: true,
    firmReply: 'Ладно, дышу. Больше повторять не буду.',
    persuadedByRules: true,
  },
  bag: {
    agreesImmediately: false,
    firstReply: 'Сумку я открывать не буду. Там служебные бумаги, а не ваши игрушки.',
    reassurance: 'Проверяем багаж у всех. Вы можете сами достать вещи, я ничего не перепутаю.',
    reassuredReply: 'Хорошо, достану сам. Только не хватайте мои бумаги.',
    reassured: true,
    firmReply: 'Ладно, если это приказ — открываю. Смотрите внимательно.',
    persuadedByRules: true,
  },
};

const PROMPTS: Record<GoebbelsSubject, string> = {
  gloves: 'Снимите перчатки и положите руки на стол.',
  teeth: 'Откройте рот для осмотра.',
  breath: 'Подышите на стекло, не касаясь его губами.',
  bag: 'Откройте сумку и выложите содержимое.',
};

const INSISTS: Record<GoebbelsSubject, string> = {
  gloves: 'Мне нужно проверить руки. Это обязательная часть осмотра.',
  teeth: 'Без осмотра рта я не могу закончить проверку.',
  breath: 'Проба дыхания входит в сегодняшнюю запись.',
  bag: 'Сумку нужно осмотреть. Особые бумаги не отменяют правила поста.',
};

export function useGoebbelsDialogue(visitorId: number, paused: boolean, subject: GoebbelsSubject,
  initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm'): Conversation {
  return useConversation({
    visitorId,
    paused,
    subject: `goebbels-${subject}`,
    profiles: [PROFILES[subject]],
    prompt: PROMPTS[subject],
    insist: INSISTS[subject],
    initial,
    disabled,
    onReply,
    gender,
  });
}
