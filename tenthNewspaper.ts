import { useConversation, type ConversationSnapshot, type DialogueProfile } from './conversation';
import type { Gender } from './gender';
import type { Traits } from '../components/Portrait';

const SHARK_REPLIES = [
  'Это с детства: зубы меняются рядами, как у морских. Портовый врач сказал — не трогать, так крепче.',
  'Ряды? Просто зубы мелкие и крепкие. У всех у нас на побережье такие, спросите кого угодно.',
];

const GREEN_REPLIES = [
  'Это речная вода и отвары трав. Полоскаю корой дуба — зелень сама сойдёт, не болезнь это.',
  'У нас вся деревня с такими зубами: в колодцах тина. А водой пользуемся, другой нет.',
];

const FANGS_REPLIES = [
  'Клыки длинные с детства, наследственность. Врачам не нравится, а мне удобно.',
  'Обточить не успел, времени не было. В старом паспорте на фото всё видно.',
];

const PLAIN_REPLIES = [
  'Зубы как зубы, все на месте. Чищу песочным порошком, как положено.',
  'Ничего особенного, обычные зубы. Смотрите сколько угодно.',
];

function makeProfiles(texts: readonly string[]): readonly DialogueProfile[] {
  return texts.map((reply) => ({
    agreesImmediately: true, firstReply: reply, reassurance: '', reassuredReply: '',
    reassured: true, firmReply: '', persuadedByRules: true,
  }));
}

export function useTeethQuestionConversation({ visitorId, traits, paused, disabled = false, onReply, gender = 'm', initial }: {
  visitorId: number; traits: Traits; paused: boolean;
  disabled?: boolean; onReply?: (text: string) => void; gender?: Gender; initial?: ConversationSnapshot;
}) {
  const profiles = makeProfiles(
    traits.sharkTeeth ? SHARK_REPLIES
      : traits.greenTeeth ? GREEN_REPLIES
        : traits.hasFangs ? FANGS_REPLIES : PLAIN_REPLIES
  );
  return useConversation({
    visitorId, paused, disabled, initial, onReply, gender,
    subject: 'teeth-question', profiles,
    prompt: traits.sharkTeeth
      ? 'Почему у вас мелкие острые зубы в несколько рядов?'
      : traits.greenTeeth
        ? 'Почему у зубов зеленоватый оттенок?'
        : traits.hasFangs
          ? 'Почему у вас такие удлинённые клыки?'
          : 'Расскажите про ваши зубы. Есть жалобы?',
    insist: '',
  });
}
