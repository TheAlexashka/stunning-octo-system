import './Newspaper.css';
import type { Shift } from '../game/session';
import { THIRD_ISSUE } from '../game/thirdNewspaper';
import { BodyHairWoodcut } from './BodyHairWoodcut';
import { FOURTH_ISSUE } from '../game/fourthNewspaper';
import { BreathWoodcut } from './BreathWoodcut';
import { FIFTH_ISSUE } from '../game/fifthNewspaper';
import { DoppelgangerWoodcut } from './DoppelgangerWoodcut';
import { SIXTH_ISSUE } from '../game/sixthNewspaper';
import { FlashlightWoodcut } from './FlashlightWoodcut';
import { SEVENTH_ISSUE } from '../game/seventhNewspaper';
import { EIGHTH_ISSUE } from '../game/eighthNewspaper';
import { NINTH_ISSUE } from '../game/ninthNewspaper';
import { TENTH_ISSUE } from '../game/tenthNewspaper';
import { ELEVENTH_ISSUE } from '../game/eleventhNewspaper';
import { TWELFTH_ISSUE } from '../game/twelfthNewspaper';
import { NixWoodcut } from './NixWoodcut';
import { WaterQualityWoodcut } from './WaterQualityWoodcut';
import { MobilizationWoodcut } from './MobilizationWoodcut';
import { BelladonnaWoodcut } from './BelladonnaWoodcut';

export type NewspaperIssue = {
  day: Shift;
  issueNumber: string;
  dateLabel: string;
  weatherLabel: string;
  priceLabel: string;
  shiftBanner?: string;
  mainHeadline: string;
  mainDeck: string;
  col1: {
    rubric: string;
    title: string;
    dropCap: string;
    lead: string;
    paragraphs: string[];
  };
  col2: {
    rubric: string;
    title: string;
    caption: string;
    paragraphs: string[];
  };
  col3: {
    rubric: string;
    title: string;
    paragraphs: string[];
    directiveTitle: string;
    directiveItems: string[];
  };
  buttonLabel: string;
};

const ISSUES: Record<Shift, NewspaperIssue> = {
  12: TWELFTH_ISSUE,
  11: ELEVENTH_ISSUE,
  10: TENTH_ISSUE,
  9: NINTH_ISSUE,
  8: EIGHTH_ISSUE,
  7: SEVENTH_ISSUE,
  6: SIXTH_ISSUE,
  5: FIFTH_ISSUE,
  4: FOURTH_ISSUE,
  3: THIRD_ISSUE,
  1: {
    day: 1,
    issueNumber: 'ВЫПУСК № 285 (УТРЕННИЙ)',
    dateLabel: 'ВТОРНИК, 12 ОКТЯБРЯ 1943 Г.',
    weatherLabel: 'ПОГОДА: ГУСТОЙ ТУМАН, +4°C',
    priceLabel: 'ЦЕНА: 10 ПФЕННИГОВ',
    mainHeadline: 'ОСОБЫЙ РЕЖИМ НА ГРАНИЦЕ ОСТМАРКА',
    mainDeck: 'Командование усиливает пропускные пункты на фоне тревожных сводок с Востока и ночных происшествий в предгорьях',
    col1: {
      rubric: 'СВОДКА С ФРОНТА',
      title: 'Тяжёлые бои на рубеже Днепра и странное затишье в секторе «Юг»',
      dropCap: 'Ш',
      lead: 'таб Верховного командования сообщает о кровопролитных оборонительных боях вдоль восточного вала. Осенние дожди размыли рокадные дороги, а над переправами третьи сутки стоит непроглядный туман.',
      paragraphs: [
        'По донесениям полевой жандармерии, из прифронтовой полосы на запад движутся переполненные санитарные и беженские эшелоны. Многие составы приходят с опозданием на сутки.',
        'Офицеры связи отмечают необъяснимые случаи: у старых лесных полустанков патрули находили брошенные повозки без единого выстрела, а лошади не подпускали людей от страха.',
      ],
    },
    col2: {
      rubric: 'ПРОИСШЕСТВИЯ В ОКРУГЕ',
      title: 'Ночной карантин у старого речного шлюза близ Ostmark-3',
      caption: 'Рис. 1. Пограничный кордон Ostmark-3 в утреннем тумане.',
      paragraphs: [
        'Вчера на рассвете обходчики обнаружили у нижней плотины следы босых ног на промёрзшей глине и обрывки тины на колючей проволоке. Рыбакам запрещено выходить на воду после заката.',
        'В то же время смотритель городского кладбища в Линце доложил о разорённых склепах XIX века. Полиция списывает случившееся на мародёров, однако участок оцеплен внутренними войсками.',
      ],
    },
    col3: {
      rubric: 'ХРОНИКА И РАСПОРЯЖЕНИЯ',
      title: 'Строгий личный досмотр каждого въезжающего',
      paragraphs: [
        'Ввиду нехватки угля и перебоев с поставками аптекарских товаров гражданам рекомендуется сохранять спокойствие и иметь при себе действительный Reichspass.',
      ],
      directiveTitle: 'ПАМЯТКА КЛЕРКУ КПП НА 12 ОКТЯБРЯ:',
      directiveItems: [
        'Тщательно осматривайте глаза, зубы, ногти и кожу каждого прибывающего.',
        'При проверке зубов требуйте открыть рот — не верьте отговоркам на слово.',
        'Обо всех выявленных нелюдях немедленно сигнализируйте дежурному офицеру СД.',
      ],
    },
    buttonLabel: 'ОТЛОЖИТЬ ГАЗЕТУ · НАЧАТЬ ДЕНЬ 1',
  },
  2: {
    day: 2,
    issueNumber: 'ВЫПУСК № 286 (НОЧНОЙ СПЕЦВЫПУСК)',
    dateLabel: 'СРЕДА, 13 ОКТЯБРЯ 1943 Г. · ВТОРАЯ НОЧЬ',
    weatherLabel: 'ПОГОДА: НОЧНОЙ ЗАМОРОЗОК, -1°C',
    priceLabel: 'СЛУЖЕБНЫЙ ЭКЗЕМПЛЯР',
    shiftBanner: 'ПЕРВАЯ СМЕНА ПЕРЕЖИТА · ПУНКТ ПЕРЕВЕДЁН НА НОЧНОЕ ДЕЖУРСТВО',
    mainHeadline: 'ТРЕВОГА НА КПП: ТВАРИ СКРЫВАЮТ ГЛАЗА И РУКИ',
    mainDeck: 'После нападения на соседний пост СД вводит обязательное снятие очков и перчаток при ночном досмотре',
    col1: {
      rubric: 'ВЕЧЕРНЯЯ СВОДКА С ВОСТОКА',
      title: 'Ночные эшелоны идут под прожекторами сквозь морозную мглу',
      dropCap: 'С',
      lead: 'наступлением темноты поток людей через границу не иссяк. Из-за бомбардировок узловых станций поезда пускают только ночью с потушенными огнями.',
      paragraphs: [
        'Пассажиры часами мерзнут в неотапливаемых теплушках, поэтому почти каждый второй сходит на перрон в плотных кожаных или шерстяных перчатках.',
        'Яркие дуговые прожекторы пограничных вышек режут глаза с непривычки — многие путники носят корректирующие, роговые или дымчатые защитные очки.',
      ],
    },
    col2: {
      rubric: 'ЧРЕЗВЫЧАЙНОЕ ПРОИСШЕСТВИЕ',
      title: 'Кровавая ночь на соседнем посту Ostmark-1',
      caption: 'Рис. 2. Улики, изъятые на КПП Ostmark-1: тёмные очки и перчатки.',
      paragraphs: [
        'Минувшей ночью на соседнем пропускном пункте был растерзан младший дежурный. По словам выжившего часового, преступник предъявил безупречный паспорт, но не снял тёмных очков и перчаток.',
        'Под оправой скрывались вертикальные звериные зрачки, а под перчатками из телячьей кожи — чёрные когти. Когда клерк поставил штамп, чудовище бросилось к горлу.',
      ],
    },
    col3: {
      rubric: 'ПРИКАЗ КОМЕНДАНТА СД',
      title: 'Инструкция на Вторую ночь: очки и перчатки',
      paragraphs: [
        'Отныне ни один посетитель не имеет права проходить осмотр глаз в очках или осмотр рук в перчатках, какими бы недугами и холодом он ни прикрывался.',
      ],
      directiveTitle: 'ОБЯЗАТЕЛЬНО К ИСПОЛНЕНИЮ (НОЧЬ 2):',
      directiveItems: [
        'Если посетитель в очках — глаз за бликами не виден. Потребуйте снять очки.',
        'Если посетитель в перчатках — ногти и перепонки скрыты. Потребуйте снять перчатки.',
        'Используйте убеждение или устав, чтобы добиться согласия на осмотр.',
      ],
    },
    buttonLabel: 'ЗАСТУПИТЬ НА ВТОРУЮ НОЧЬ',
  },
};

// The notebook reads the SAME directives, rather than rewriting creature descriptions.
export function getNotebookNewspaperAdditions(shift: Shift): NewspaperIssue[] {
  return Object.values(ISSUES).filter(issue => issue.day >= 2 && issue.day <= shift && issue.col3.directiveItems.length > 0)
    .sort((a, b) => a.day - b.day);
}

export function Newspaper({ day, onContinue }: { day: Shift; onContinue: () => void }) {
  const issue = ISSUES[day];

  return (
    <div className="scroll-screen newspaper-screen wood">
      <article className="newspaper-sheet paper" aria-label={`Газета перед сменой ${day}`}>
        {issue.shiftBanner && (
          <div className="newspaper-shift-banner">{issue.shiftBanner}</div>
        )}

        {/* Masthead */}
        <header className="newspaper-masthead">
          <div className="newspaper-masthead__top">
            <span>{issue.issueNumber}</span>
            <span>ОРГАН ПОГРАНИЧНОГО ОКРУГА ОСТМАРК</span>
            <span>{issue.priceLabel}</span>
          </div>

          <div className="newspaper-masthead__title-row">
            <div className="newspaper-masthead__ornament" aria-hidden="true">✠</div>
            <h1 className="newspaper-masthead__title">OSTMARKER GRENZBLATT</h1>
            <div className="newspaper-masthead__ornament" aria-hidden="true">✠</div>
          </div>

          <div className="newspaper-masthead__sub">
            ОСТМАРКСКИЙ ПОГРАНИЧНЫЙ ВЕСТНИК · СВОДКИ ФРОНТА, РАСПОРЯЖЕНИЯ СД И ХРОНИКА
          </div>

          <div className="newspaper-masthead__meta">
            <span>{issue.dateLabel}</span>
            <span>ПОСТ OSTMARK-3</span>
            <span>{issue.weatherLabel}</span>
          </div>
        </header>

        {/* Banner headline across all columns */}
        <div className="newspaper-banner">
          <h2 className="newspaper-banner__headline">{issue.mainHeadline}</h2>
          <p className="newspaper-banner__deck">{issue.mainDeck}</p>
        </div>

        {/* Multi-column body */}
        <div className="newspaper-columns">
          {/* Column 1: Front news */}
          <section className="newspaper-col">
            <div className="newspaper-rubric">{issue.col1.rubric}</div>
            <h3 className="newspaper-col__title">{issue.col1.title}</h3>
            <p className="newspaper-p newspaper-p--lead">
              <span className="newspaper-dropcap">{issue.col1.dropCap}</span>
              {issue.col1.lead}
            </p>
            {issue.col1.paragraphs.map((text, idx) => (
              <p key={idx} className="newspaper-p">{text}</p>
            ))}
          </section>

          {/* Column 2: Border incidents + vintage woodcut illustration */}
          <section className="newspaper-col">
            <div className="newspaper-rubric">{issue.col2.rubric}</div>
            <h3 className="newspaper-col__title">{issue.col2.title}</h3>

            <figure className="newspaper-woodcut">
              {day === 1 ? <WoodcutDay1 />
                : day === 2 ? <WoodcutNight2 />
                : day === 3 ? <BodyHairWoodcut />
                : day === 4 ? <BreathWoodcut />
                : day === 5 ? <DoppelgangerWoodcut />
                : day === 6 ? <FlashlightWoodcut />
                : day === 7 ? <BelladonnaWoodcut />
                : day === 8 ? <NixWoodcut />
                : day === 9 ? <WaterQualityWoodcut />
                : day === 10 ? <MobilizationWoodcut />
                : day === 11 ? <FutureVictoryWoodcut />
                : <WinterCheckpointWoodcut />}
              <figcaption>{issue.col2.caption}</figcaption>
            </figure>

            {issue.col2.paragraphs.map((text, idx) => (
              <p key={idx} className="newspaper-p">{text}</p>
            ))}
          </section>

          {/* Column 3: Directives & chronicle */}
          <section className="newspaper-col">
            <div className="newspaper-rubric">{issue.col3.rubric}</div>
            <h3 className="newspaper-col__title">{issue.col3.title}</h3>
            {issue.col3.paragraphs.map((text, idx) => (
              <p key={idx} className="newspaper-p">{text}</p>
            ))}

            {issue.col3.directiveItems.length > 0 && (
              <div className="newspaper-directive">
                <div className="newspaper-directive__title">{issue.col3.directiveTitle}</div>
                <ul className="newspaper-directive__list">
                  {issue.col3.directiveItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <footer className="newspaper-footer">
          <div className="newspaper-footer__note">
            Отпечатано в типографии приграничного управления · Передача третьим лицам воспрещена
          </div>
          <button type="button" onClick={onContinue} className="metal-btn newspaper-continue-btn">
            {issue.buttonLabel}
          </button>
        </footer>
      </article>
    </div>
  );
}

function WinterCheckpointWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#d8c79d" />
      <g stroke="#3d2c18" strokeWidth="0.55" opacity="0.25">
        {Array.from({ length: 17 }, (_, i) => <path key={`snow-${i}`} d={`M${i * 16 - 25} 8 L${i * 16 + 28} 88`} />)}
      </g>
      <path d="M0 53 L26 37 L48 51 L72 31 L98 51 L126 36 L151 51 L178 33 L220 52 V72 H0 Z" fill="#806546" opacity="0.72" />
      <g fill="#342515" stroke="#24180d" strokeWidth="1">
        <path d="M8 68 L19 39 L30 68 Z M21 68 L31 45 L42 68 Z" />
        <path d="M183 69 L195 36 L207 69 Z M198 69 L209 44 L220 69 Z" />
      </g>
      <path d="M0 72 Q45 65 91 72 T151 70 T220 73 V96 H0 Z" fill="#49351e" />
      <path d="M84 96 C91 83 101 74 112 67 C122 75 133 85 141 96 Z" fill="#cbb17e" stroke="#24180d" strokeWidth="1.2" />
      <g stroke="#6f5334" strokeWidth="0.8" opacity="0.8">
        <path d="M95 93 L113 69 M108 96 L119 72 M123 96 L125 74 M135 96 L130 80" />
      </g>
      <g fill="#3a2918" stroke="#24180d" strokeWidth="1.2">
        <path d="M35 47 H103 V78 H35 Z" />
        <path d="M29 47 L69 26 L109 47 Z" />
        <path d="M34 45 L69 30 L104 45" fill="#cbb17e" strokeWidth="2" />
        <rect x="62" y="58" width="14" height="20" fill="#cbb17e" />
        <rect x="43" y="53" width="12" height="10" fill="#d5c497" />
        <rect x="82" y="53" width="12" height="10" fill="#d5c497" />
      </g>
      <g stroke="#24180d" strokeWidth="0.9">
        <path d="M43 53 L55 63 M55 53 L43 63 M82 53 L94 63 M94 53 L82 63" />
        <path d="M34 77 H104" />
      </g>
      <g fill="none" stroke="#24180d" strokeWidth="1.3" strokeLinecap="round">
        <path d="M132 81 V36" />
        <path d="M132 37 Q141 34 145 40" />
        <circle cx="143" cy="42" r="5" fill="#cbb17e" />
        <path d="M143 32 V26 M134 35 L130 30 M151 35 L155 30" strokeWidth="0.8" />
      </g>
      <path d="M157 68 H188 M161 63 H184 M165 58 H180" stroke="#24180d" strokeWidth="1.2" />
      <g stroke="#d9c99f" strokeWidth="1.1" opacity="0.9">
        <path d="M12 22 Q22 16 32 22 M52 16 Q62 10 72 16 M165 17 Q175 11 185 17" />
        <path d="M14 27 Q24 21 34 27 M54 21 Q64 15 74 21 M167 22 Q177 16 187 22" />
      </g>
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#24180d" strokeWidth="1.5" />
    </svg>
  );
}

function FutureVictoryWoodcut() {
  const rays = Array.from({ length: 15 }, (_, i) => {
    const angle = -Math.PI * 0.92 + (i / 14) * Math.PI * 0.84;
    const x1 = 158 + Math.cos(angle) * 25;
    const y1 = 37 + Math.sin(angle) * 25;
    const x2 = 158 + Math.cos(angle) * 39;
    const y2 = 37 + Math.sin(angle) * 39;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#d6c093" />
      <g stroke="#3a2a16" strokeWidth="0.55" opacity="0.25">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`grain-${i}`} x1={i * 14 - 20} y1="0" x2={i * 14 + 35} y2="96" />
        ))}
      </g>
      <g fill="none" stroke="#24180d" strokeWidth="1.4" strokeLinecap="round">
        {rays}
      </g>
      <circle cx="158" cy="37" r="19" fill="#c9ae78" stroke="#24180d" strokeWidth="1.5" />
      <path d="M0 65 L28 54 L51 63 L72 48 L96 61 L119 51 L140 61 L164 52 L188 62 L220 48 L220 96 L0 96 Z" fill="#3a2a16" />
      <path d="M87 96 L126 57 L143 57 L193 96 Z" fill="#c9ae78" stroke="#24180d" strokeWidth="1.4" />
      <path d="M102 96 L133 59 L139 59 L167 96" fill="none" stroke="#3a2a16" strokeWidth="1.2" />
      <path d="M120 96 L136 59" stroke="#3a2a16" strokeWidth="1" strokeDasharray="5 3" />
      <g fill="#c9ae78" stroke="#24180d" strokeWidth="1.2">
        <path d="M44 78 V30" />
        <path d="M176 79 V28" />
        <path d="M44 33 L69 39 L44 46 Z" />
        <path d="M176 31 L151 37 L176 44 Z" />
      </g>
      <g fill="#24180d">
        <rect x="18" y="60" width="10" height="18" />
        <path d="M16 60 L23 52 L30 60 Z" />
        <rect x="30" y="65" width="8" height="13" />
        <rect x="194" y="59" width="10" height="19" />
        <path d="M192 59 L199 50 L206 59 Z" />
        <rect x="207" y="66" width="7" height="12" />
      </g>
      <path d="M4 86 Q55 78 105 86 T216 85" fill="none" stroke="#24180d" strokeWidth="1.1" opacity="0.8" />
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#24180d" strokeWidth="1.5" />
    </svg>
  );
}

function WoodcutDay1() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#cbb58b" />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1="0" y1={4 + i * 4} x2="220" y2={4 + i * 4} stroke="#3c2b17" strokeWidth="0.5" opacity="0.35" />
      ))}
      <path d="M0 68 Q45 48 95 64 T220 58 L220 96 L0 96 Z" fill="#3a2917" />
      <rect x="34" y="34" width="26" height="36" fill="#24180d" stroke="#cbb58b" strokeWidth="0.8" />
      <polygon points="30,34 47,20 64,34" fill="#24180d" />
      <rect x="41" y="41" width="12" height="10" fill="#cbb58b" />
      <line x1="60" y1="56" x2="156" y2="44" stroke="#24180d" strokeWidth="3.5" />
      <line x1="60" y1="56" x2="156" y2="44" stroke="#cbb58b" strokeWidth="1.2" strokeDasharray="6 6" />
      <circle cx="172" cy="46" r="5" fill="#24180d" />
      <path d="M163 72 C164 55 180 55 181 72 Z" fill="#24180d" />
      <circle cx="192" cy="49" r="4.5" fill="#24180d" />
      <path d="M184 72 C185 57 199 57 200 72 Z" fill="#24180d" />
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#2a1e10" strokeWidth="1.5" />
    </svg>
  );
}

function WoodcutNight2() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c7b086" />
      <rect x="4" y="4" width="212" height="88" fill="#2b1e12" />
      <polygon points="10,12 145,8 216,88 78,88" fill="#cbb58b" opacity="0.22" />
      <g transform="translate(26 24)">
        <circle cx="24" cy="24" r="15" fill="#1a120b" stroke="#d5c19a" strokeWidth="2.4" />
        <circle cx="66" cy="24" r="15" fill="#1a120b" stroke="#d5c19a" strokeWidth="2.4" />
        <path d="M39 22 Q45 16 51 22" fill="none" stroke="#d5c19a" strokeWidth="2.2" />
        <line x1="17" y1="15" x2="27" y2="33" stroke="#d5c19a" strokeWidth="1.8" opacity="0.75" />
        <line x1="59" y1="15" x2="69" y2="33" stroke="#d5c19a" strokeWidth="1.8" opacity="0.75" />
      </g>
      <g transform="translate(132 14)">
        <path
          d="M20 62 L18 28 C18 22 26 22 26 28 L26 42 L28 18 C28 12 36 12 36 18 L36 42 L38 22 C38 16 46 16 46 22 L46 44 L48 30 C48 25 55 25 55 30 L55 56 L48 70 L22 70 L10 48 C7 43 13 39 16 44 Z"
          fill="#c7b086"
          stroke="#1a120b"
          strokeWidth="1.5"
        />
        <line x1="30" y1="48" x2="31" y2="63" stroke="#2b1e12" strokeWidth="1.3" />
        <line x1="37" y1="47" x2="37" y2="64" stroke="#2b1e12" strokeWidth="1.3" />
        <line x1="44" y1="48" x2="43" y2="63" stroke="#2b1e12" strokeWidth="1.3" />
      </g>
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#cbb58b" strokeWidth="1.2" />
    </svg>
  );
}
