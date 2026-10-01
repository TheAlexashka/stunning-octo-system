import { useConversation, type ConversationSnapshot, type DialogueProfile } from './conversation';
import type { Gender } from './gender';

// Reaction is personality-based, not species-based. Some refusals are final;
// trying the tab again never turns an unperformed test into a dry result.
export const BREATH_PROFILES: readonly DialogueProfile[] = [
  {
    agreesImmediately: true,
    firstReply: 'Хорошо. Подойти поближе и просто выдохнуть?',
    reassurance: 'Один спокойный выдох, без прикосновения.',
    reassuredReply: 'Сейчас сделаю.', reassured: true,
    firmReply: 'Хорошо, делаю.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Дыхнуть на стекло? Это же смехотворно! Я не {пришёл|пришла} сюда играть в детские игры.',
    reassurance: 'Понимаю, выглядит странно. Это короткая проба, всего один выдох.',
    reassuredReply: 'Ладно, один раз. И надеюсь, на этом ваши шутки закончатся.', reassured: true,
    firmReply: 'Ну, раз такая инструкция... Только не заставляйте повторять.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Стекло грязное. Не хочу касаться его губами.',
    reassurance: 'Касаться не нужно. Держитесь на расстоянии ладони от чистого участка.',
    reassuredReply: 'Без прикосновения? Тогда хорошо, вот так?', reassured: true,
    firmReply: 'Если только не касаться стекла, я {согласен|согласна}.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'У меня приступы одышки. Я не могу сейчас выдыхать по команде.',
    reassurance: 'Не надо сильно дуть. Подойдёт короткий обычный выдох.',
    reassuredReply: 'Нет, сейчас не получится. Пожалуйста, проверьте документы или руки.', reassured: false,
    firmReply: 'Мне действительно тяжело дышать. От этой пробы отказываюсь.', persuadedByRules: false,
  },
  {
    agreesImmediately: false,
    firstReply: 'Я только что {поел|поела}, и запах не самый приятный. Вам зачем это?',
    reassurance: 'Запах меня не интересует. Мы смотрим на стекло, не на ваш ужин.',
    reassuredReply: 'Ну хорошо. {Предупредил|Предупредила} вас, теперь смотрите.', reassured: true,
    firmReply: 'Раз это проверка, давайте закончим.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Это унизительно и совершенно смехотворно. Дышать на ваше окно я не буду.',
    reassurance: 'Это не насмешка. Проба нужна, чтобы проверить ещё один признак.',
    reassuredReply: 'Я вас {услышал|услышала}, но согласия не даю. Проверяйте другим способом.', reassured: false,
    firmReply: 'Мой ответ всё тот же. Нет.', persuadedByRules: false,
  },
  {
    agreesImmediately: true,
    firstReply: 'Пожалуйста. Только покажите чистое место на стекле.',
    reassurance: 'Вот этот участок, не касаясь его.',
    reassuredReply: 'Хорошо.', reassured: true,
    firmReply: 'Сейчас выдохну.', persuadedByRules: true,
  },
  {
    agreesImmediately: false,
    firstReply: 'Недавно {переболел|переболела}. Не хочу никого заразить своим дыханием.',
    reassurance: 'Мы по разные стороны стекла. Можно выдохнуть, не снимая дистанцию.',
    reassuredReply: 'Если стекло защищает... Ладно. Сейчас сделаю.', reassured: true,
    firmReply: 'Хорошо. Я {предупредил|предупредила} вас про болезнь.', persuadedByRules: true,
  },
];

export function useBreathConversation(visitorId: number, paused: boolean, initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm') {
  return useConversation({
    visitorId, paused, initial, disabled, onReply, gender,
    subject: 'breath', profiles: BREATH_PROFILES,
    prompt: 'Дыхните на стекло, пожалуйста. Не касайтесь его губами.',
    insist: 'С четвёртой ночи эта проба входит в проверку. Если вы откажетесь, я осмотрю другие признаки.',
  });
}
