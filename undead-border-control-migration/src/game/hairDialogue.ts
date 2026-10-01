import { useConversation } from './conversation';
import type { ConversationSnapshot, DialogueProfile } from './conversation';
import type { BodyHair } from './visitors';
import type { Gender } from './gender';

const ANSWERS: Record<BodyHair, readonly string[]> = {
  long: [
    'Такие от природы. У отца руки были ещё волосатее. Я же не могу выбирать, как расти волосам.',
    'Последние месяцы {провёл|провела} в лесу на заготовках. До бритвы не доходили руки, а цирюльник туда не ездит.',
    'Доктор назвал это наследственностью. Я {привык|привыкла}; в холодном вагоне даже удобнее.',
    'После бритья кожа воспаляется. С тех пор оставляю как есть. Вас только волосы интересуют?',
    'Трудно найти хорошую бритву. Её я приберегаю для лица, а руки… пусть растут.',
    'Так всегда было. Иногда ношу длинные рукава, чтобы люди не задавали вопросов.',
  ],
  stubble: [
    'Недавно {побрил|побрила} руки — под повязкой волосы цеплялись. Уже отрастают, как видите.',
    'У меня чувствительная кожа. Бритва больше раздражает, чем помогает, поэтому так и {оставил|оставила}.',
    'Это после санитарного осмотра в дороге. Мне велели сбрить волосы, я {выполнил|выполнила}.',
    '{Пытался|Пыталась} привести себя в порядок перед поездкой. Получилось как получилось.',
  ],
  smooth: [
    'Да, недавно {побрил|побрила}. Под тесной рубашкой кожа зудела, так удобнее.',
    'На руках волосы почти не растут. Даже в семье шутили, что мне повезло с бритвой.',
    '{Сбрил|Сбрила} перед обработкой ссадины. Уже {пожалел|пожалела}: щипало несколько дней.',
    'Привычка. За руками слежу не меньше, чем за лицом.',
  ],
};
const PROFILES: Record<BodyHair, readonly DialogueProfile[]> = {
  long: ANSWERS.long.map(profile), stubble: ANSWERS.stubble.map(profile), smooth: ANSWERS.smooth.map(profile),
};
function profile(firstReply: string): DialogueProfile {
  return { agreesImmediately: true, firstReply, reassurance: '', reassuredReply: '', reassured: true, firmReply: '', persuadedByRules: true };
}

export function useHairConversation(visitorId: number, bodyHair: BodyHair, paused: boolean, initial?: ConversationSnapshot, disabled = false, onReply?: (text: string) => void, gender: Gender = 'm') {
  const prompt = bodyHair === 'long' ? 'Почему у вас такие длинные волосы на теле?'
    : bodyHair === 'stubble' ? 'Вы недавно брили тело? Откуда эта щетина?'
      : 'Вы недавно брили кожу на руках?';
  return useConversation({ visitorId, paused, subject: `hair-${bodyHair}`, profiles: PROFILES[bodyHair], prompt, insist: '', initial, disabled, onReply, gender });
}
