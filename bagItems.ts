import { useConversation, type ConversationSnapshot, type DialogueProfile } from './conversation';
import type { Gender } from './gender';

// Personality-based reactions shared by people and every creature type.
// Looking innocent or hesitant is never a species clue.
export const BAG_PROFILES: readonly DialogueProfile[] = [
  { agreesImmediately: true, firstReply: 'Хорошо. Только дайте место на столе, тут всё вперемешку.', reassurance: 'Вот свободный участок. Выложите вещи так, чтобы их было видно.', reassuredReply: 'Сейчас выложу.', reassured: true, firmReply: 'Хорошо, смотрите.', persuadedByRules: true },
  { agreesImmediately: false, firstReply: 'Серьёзно? Я еле {уложил|уложила} всё обратно на станции. Тут только дорожные вещи.', reassurance: 'Это обычный досмотр багажа для всех. Потом сможете спокойно всё собрать.', reassuredReply: 'Ладно. Но сложить обратно я хочу {сам|сама}.', reassured: true, firmReply: 'Раз новый порядок, выложу. Только не потеряйте ничего.', persuadedByRules: true },
  { agreesImmediately: true, firstReply: 'Пожалуйста. Билет, письма... Сейчас достану остальное.', reassurance: 'Не торопитесь. Покажите всё содержимое, включая маленькие карманы.', reassuredReply: 'Да, вот карманы тоже.', reassured: true, firmReply: 'Сейчас, одну секунду.', persuadedByRules: true },
  { agreesImmediately: false, firstReply: 'Там личные письма. Их тоже обязательно показывать?', reassurance: 'Читать переписку не будем. Нужно увидеть сами предметы в сумке.', reassuredReply: 'Если письма не читать — хорошо. Вот мои вещи.', reassured: true, firmReply: 'Понимаю. Только конверты оставьте закрытыми.', persuadedByRules: true },
  { agreesImmediately: false, firstReply: 'Мне совсем некогда. Можно обойтись без этого?', reassurance: 'Короткий осмотр: выложите вещи, я посмотрю и вы сможете их собрать.', reassuredReply: 'Ну хорошо. Надеюсь, это последняя очередь на сегодня.', reassured: true, firmReply: 'Ладно, порядок есть порядок. Сейчас выложу.', persuadedByRules: true },
];

export function useBagConversation(visitorId: number, paused: boolean, initial?: ConversationSnapshot,
  disabled = false, onReply?: (text: string) => void, gender: Gender = 'm') {
  return useConversation({ visitorId, paused, initial, disabled, onReply, gender,
    subject: 'bag', profiles: BAG_PROFILES,
    prompt: 'Выпотрошите сумку, пожалуйста: выложите всё содержимое на стол, включая вещи из карманов.',
    insist: 'С седьмой ночи действует дополнительный досмотр багажа. Это требование для всех посетителей.',
  });
}
