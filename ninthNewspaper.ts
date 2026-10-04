import { useConversation, type DialogueProfile } from './conversation';
import type { Gender } from './gender';

const PEARLY_REPLIES = [
  'Это лак. Перламутровый, с распродажи в Линце. Дешёвый, зато держится долго.',
  'Это после болезни. После лихорадки ногти всегда такие, врач подтвердит.',
];

const ALGAE_REPLIES = [
  'Это речная тина: бельё стираю у воды. Отмывается плохо, простите.',
  'Зелень под ногтями от огорода и речной воды. У всех у нас так.',
];

function makeProfiles(texts: readonly string[]): readonly DialogueProfile[] {
  return texts.map((reply) => ({
    agreesImmediately: true, firstReply: reply, reassurance: '', reassuredReply: '',
    reassured: true, firmReply: '', persuadedByRules: true,
  }));
}

export function useNailShineConversation({ visitorId, pearly, algae, paused, disabled = false, onReply, gender = 'm' }: {
  visitorId: number; pearly: boolean; algae: boolean; paused: boolean;
  disabled?: boolean; onReply?: (text: string) => void; gender?: Gender;
}) {
  const mode = pearly ? 'pearly' : algae ? 'algae' : 'pearly';
  const profiles = makeProfiles(mode === 'pearly' ? PEARLY_REPLIES : ALGAE_REPLIES);
  return useConversation({
    visitorId, paused, disabled, onReply, gender,
    subject: 'nails-shine', profiles,
    prompt: pearly
      ? 'Почему у ногтей такой перламутровый блеск, как у раковины?'
      : 'Почему под ногтями зелёная тина?',
    insist: '',
  });
}
