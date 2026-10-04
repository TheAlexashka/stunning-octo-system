# ЗАДАНИЕ ДЛЯ AGENT MODE: ИНТЕГРАЦИЯ ВЫБРАННЫХ ПРИЧЁСОК И ГОЛОВНЫХ УБОРОВ

Ты работаешь в репозитории https://github.com/TheAlexashka/shiny-potato (Ателье Линден).
Пользователь выбрал 1 предметов для добавления в игру.

## ВЫБРАННЫЕ ПРЕДМЕТЫ (1 шт.):
1. [Головной убор] Карбункул на лбу (id: `acc-poster-carbuncle`)

---

## ПРАВИЛА ИНТЕГРАЦИИ:
1. НЕ ПЕРЕПИСЫВАЙ существующие файлы игры (App.tsx, Face.tsx, Hair.tsx, data/types.ts).
2. Создай приложенные файлы в папках `src/features/...` и `src/components/HeadStubble.tsx`.
3. Зарегистрируй выбранные предметы в `src/data/items.tsx`, импортируя их массивы:
   - `POSTER_ITEMS` из `../features/poster1930/items`

4. ⚠️ **ПО СТЕРНЕ НА ГОЛОВЕ:** Стерня находится в компоненте `src/components/HeadStubble.tsx`.
   Вставь его в `Face.tsx` (или `Head.tsx`) **СРАЗУ ПОСЛЕ заливки кожи головы и ДО бровей/глаз/волос!**
   Не вставляй стерню в `Hair.tsx`. Подробный гайд: `src/features/stubble/STUBBLE_GUIDE.md`.


---

# ИНСТРУКЦИИ И ГАЙДЫ

## src/features/poster1930/README.md

# Ателье Линден: коллекция по постеру 1930-1940

Самостоятельный набор TypeScript/React/SVG для встраивания в существующую игру.
У него нет зависимости от портретного демо, FaceSel, Face, Stage или старого Hair.
Движок находится внутри новой папки; существующий utils/curl.ts не меняется.

Это художественная 2D-адаптация приложенного постера. Изображения в профиль и
со спины не дают полной информации об анфасе. Передняя линия волос для таких
рисунков интерпретирована. Названия и годы следуют подписям на постере; имена
кинозвёзд из предыдущего набора не приписаны этому изображению.

## Соответствия

| № | Новый ID | Подпись и расположение | Геометрия |
| --- | --- | --- | --- |
| 01 | hair-poster-1930-nape-roll | Боковой пробор и валик, 1930; сверху слева | Гладкая макушка, боковая волна, поперечный валик на затылке |
| 02 | hair-poster-1933-antoine | Короткие волосы, завитые сзади; Antoine, 1933; сверху по центру | Пальцевые волны и короткие плоские колечки за ушами |
| 03 | hair-poster-1935-bangs-chignon | Кудрявая чёлка и шиньон, 1935; сверху справа | Компактные pin-curls на лбу, отдельный задний шиньон |
| 04 | hair-poster-1937-pompadour-bob | Page-boy bob with rolled pompadour, 1937; слева | Боб до подбородка и крупный асимметричный передний ролл |
| 05 | hair-poster-1938-unbrushed | Нерасчёсанные кудри на макушке, 1938; второй ряд слева | Короткие бока, два нерегулярных ряда завитков |
| 06 | hair-poster-1938-feather | Feather-shaped coiffure, 1938; по центру | Два поднятых S-образных гребня без длинных спиралей |
| 07 | hair-poster-1939-infanta | Infante coiffure, satin loops, Balenciaga, 1939; в центре листа | Каскад конических лент по бокам; атласные петли отдельно |
| 08 | hair-poster-1939-parted-roll | Short hair parted and rolled, 1939; справа, вид со спины | Крупные продольные затылочные валики и плавный перед |
| 09 | hair-poster-1939-short-rolled | Short coiffure parted and rolled, 1939; снизу слева | Высокая асимметричная волна, подобранный короткий затылок |
| 10 | hair-poster-1939-pompadour-plaits | Pompadour and plaits, 1939; снизу по центру | Высокая масса над лбом, небольшие косички за шеей |
| 11 | hair-poster-1939-under-bob | Page-boy bob, ends rolled under, 1939; снизу справа | Гладкая длина и подвёрнутые внутрь концы |

## Головные уборы и украшения

### Уже были
- headgear-poster-1938-snood-cord / ribbon / chenille — три материала одного снуда.
- headgear-poster-1939-satin-loops — атласные петли «Инфанты».

### С листа headdresses 1930–1940 (без фаты)
| ID | Подпись | Год |
| --- | --- | --- |
| headgear-poster-1939-burnt-toast | «Burnt Toast» соломенная, шарф и роза · Bruyère | 1939 |
| headgear-poster-1938-dolls-hat | «Doll’s Hat» · Schiaparelli | 1938 |
| headgear-poster-1938-persian-toque | Ток из каракуля с wimple | 1938 |
| headgear-poster-1939-cossack | Казачья шапка с золотой цепочкой · Rose Valois | 1939 |
| headgear-poster-1939-plush-toque | Красный плюшевый ток с кистями · Suzy | 1939 |
| headgear-poster-1939-topper | Жёсткий цилиндр с красной лентой · Rose Valois | 1939 |
| headgear-poster-1937-self-tied-turban | Self-tied тюрбан | 1937 |
| headgear-poster-1939-shako | Бархатный шако с перьями · Patou/Suzy | 1939 |

### Аксессуары и уборы по отдельному референсу
| ID | Категория | Что это |
| --- | --- | --- |
| headgear-poster-acc-aviator-goggles | headgear | Лётные очки-гогглы: аккуратные круглые стёкла, металлическая оправа, тонкие ушки у висков, надеты на лоб. |
| acc-poster-carbuncle | accessories | Карбункул: гранёный красный рубиновый камень в золотой оправе с крапанами, надетый по центру лба (категория accessories). |

**Не добавлено намеренно:**
- Bridal headdress / circular veil (Mainbocher, 1937) — по запросу.
- Modern snood (Suzy, 1939) — уже покрыт тремя материалами существующего снуда.
- Форменные знаки различия с референса аксессуаров — это не причёска и не убор.

## Причёска «Баранки»

`hair-poster-1938-braided-coils` — гладкий пробор ровно посередине и две крупные
косы, уложенные кольцами над ушами (Gretchenfrisur / Schneckenfrisur).

Кольцо строит `braidRing(cx, cy, rx, ry, width, links, phase)`: звенья косы
расставляются по эллипсу и поворачиваются **по касательной**, поэтому плетение
читается по всей окружности. Угол считается как `atan2(rx·sin a, ry·cos a)` —
это нужно именно для эллипса, у круга формула упростилась бы до `a`.

По умолчанию два кольца по 26 звеньев: центры (105, 90) и (195, 90), радиусы
24×28, ширина косы 5. Кольца намеренно выходят за силуэт головы, как на
референсе, поэтому bbox расширен до `[70, 16, 160, 118]`.

## Цвет уборов

`posterHatColor` и `posterRibbonColor` по умолчанию **не заданы**. Пока
пользователь не выбрал цвет вручную, каждый убор рисуется своим авторским
цветом: солома жёлтая, каракуль чёрный, карбункл красный. Если бы эти поля
всегда имели значение, все уборы выглядели бы одинаково перекрашенными.

## Устройство

У каждой причёски есть заполненный силуэт и два слоя front/back. Задний слой
рисуется до головы; это не альтернативный поворот камеры. Крупные валики имеют
собственную геометрию roll, косы собираются из перекрывающихся звеньев braid.

ringlet: коническая лента с уменьшающейся шириной вдоль оси локона.
pin: плоский спиральный завиток для чёлки и коротких концов.
Текстура и блик вычисляются из одной центральной линии и обрезаются по контуру
локона. У блика нет независимой «плавающей» спирали за границами волос.
Это визуальная модель, не симуляция физики и не 3D-движок.

Плотность узлов и шаг завитков детерминированы. Зеркалирование отражает весь
локальный контур, включая кончик. Ползунок объёма изменяет и радиус, и ширину
ленты. Блеск при 0 действительно отключает световые штрихи.

Все SVG id создаются через useId. Цвет по умолчанию берётся из var(--hair).
При передаче явных hex-цветов оттенки вычисляются численно, поэтому экспорт
предпросмотра не зависит от внешней палитры CSS.

## Передача агенту

Прикрепите папку или скачанный ZIP, AGENT_MODE.md и исходное изображение.
Если удобнее вставить текст в чат агента, скачайте «Один файл для агента»:
он содержит задание и все исходники с их относительными путями.

Не переносите src/App.tsx, src/data/types.ts и Face.tsx из текущего демо в игру.
В этом пакете этих файлов нет. POSTER_ITEMS регистрирует новый рендерер напрямую,
поэтому прежние DESIGNS и HairSurface не требуют изменения.

## Проверки и ограничения

checks.ts проверяет количество и уникальность ID, наличие слоёв, детерминизм,
конечность чисел при крайних настройках и масштаб головных уборов.
Сборка текущего предпросмотра не доказывает совместимость с реальным Item,
визуальную посадку на исходную голову или работоспособность экспортёра игры.
Их обязан проверить agent mode в настоящем репозитории по чек-листу.

---

## src/features/poster1930/AGENT_MODE.md

# Задание для agent mode: коллекция по постеру 1930-1940

Работай в настоящем репозитории https://github.com/TheAlexashka/shiny-potato.
Приложенный пакет содержит код 11 причёсок, 3 материала снуда, атласные петли
«Инфанты» и 8 шляп с листа headdresses 1930–1940. Свадебная фата Mainbocher
намеренно отсутствует. Modern snood с того же листа не дублируется: три
материала снуда уже закрывают эту форму. Прикреплённые изображения — визуальный
ориентир, не объект точной трассировки.

## Обязательные ограничения

- Сохрани App, Stage, Body, Face, весь гардероб, стили интерфейса и сохранения.
- Не заменяй исходные Hair.tsx, data/types.ts, items.tsx или utils/curl.ts файлами из старого портретного демо.
- Существующие причёски, их ID, силуэты, раскладку прядей и цвета не изменяй.
- Новые предметы используют только префиксы `hair-poster-` и `headgear-poster-`.
- Не вызывай старый makeCurlyDesigns поверх DESIGNS: та инструкция переопределяла старые ID.
- Не устанавливай Three.js, физический движок или генеративные сервисы. Это детерминированная 2D SVG-графика, не физическая симуляция волос.
- Сначала прочитай реальные файлы проекта. Не восстанавливай игру по описанию этого пакета.

## Файлы пакета

В `src/features/poster1930/` находятся:

- `types.ts`: независимые типы, настройки и обработка цвета.
- `engine.ts`: изолированный движок конических лент, плоских завитков, валиков и косичек.
- `designs.ts`: 11 отдельных описаний с передним и задним слоями и метаданными постера.
- `PosterHair.tsx`: новый рендерер только этих ID.
- `PosterHeadwear.tsx`: снуды, атласные петли и 8 шляп с листа headdresses.
- `items.tsx`: 23 готовых записи (11 hair + 12 headgear) в формате из хендоффа.
- `checks.ts`: детерминированные программные проверки.

Скопируй эту папку целиком, не перезаписывая существующие файлы при совпадении
путей. Прочитай diff и объедини изменения, если предыдущая версия уже установлена.
Файлы интерфейса предпросмотра в пакет намеренно не включены.

## Подключение предметов

1. Прочитай настоящие тип Item, контекст render/back и каталог в data/items.tsx.
2. Импортируй POSTER_ITEMS из ../features/poster1930/items.
3. Проверь совместимость через `const posterItems = POSTER_ITEMS satisfies Item[]`.
4. Добавь новые записи в существующий каталог один раз. Не создавай дубли.
5. Если тип Item требует дополнительные поля, адаптируй только новый items.tsx. Не ослабляй типизацию всей игры и не используй `as any`.

Сигнатуры нового кода: `PosterHair({ styleId, layer, face })` и
`PosterHeadwear({ id, layer, face, applyFit })`.
Для существующего Hair ничего менять не нужно: новые записи вызывают PosterHair
напрямую. Отсутствующий или чужой ID возвращает null, а не подменяет причёску.

`back` означает слой позади головы, НЕ вид камеры со спины.
Порядок: задние волосы, задняя часть головного убора, тело/голова, передние
волосы, передняя часть головного убора. Сохрани действующий механизм Stage.

## Посадка головных уборов

Изучи ItemArt и utils/hatFit.ts. В исходном проекте посадка головных уборов
применяется снаружи. Поэтому новые записи вызывают PosterHeadwear с
`applyFit = false` по умолчанию. Не применяй трансформацию второй раз.

Если реальный Stage не трансформирует заднюю часть headgear, исправь обёртку
только для нового заднего слоя. Перед и зад должны получить одну и ту же
трансформацию ровно один раз. Поворот: hatRotation, диапазон 0..360.
hatScale умножает обе оси, hatWidth дополнительно умножает X.
Центр трансформации: (150, 44). Отражение: hatMirrored.

Снуд рассчитан на короткие и собранные волосы. Не удаляй и не сжимай автоматически
выбранные длинные причёски. Покажи рекомендацию совместимой укладки либо предложи
переключение с явным согласием пользователя. Не обрезай череп маской сетки.

Новые шляпы листа (burnt-toast, dolls-hat, persian-toque, cossack, plush-toque,
topper, self-tied-turban, shako) используют те же hatWidth / hatScale /
hatRotation / hatMirrored / posterHatColor / posterRibbonColor. У каждой свой
задний слой (поля, перья, вуаль-wimple). Перед и зад должны получать одну
трансформацию ровно один раз.

## Настройки

Все новые настройки необязательны и имеют значения по умолчанию. Добавь их
в реальный FaceSel через совместимое расширение типа PosterSettings из types.ts
либо перенеси недостающие поля. Не заменяй FaceSel минимальной заглушкой.

| Поле | По умолчанию | Диапазон / назначение |
| --- | --- | --- |
| curlTightness | 100 | 60..150, число витков новых локонов |
| curlVolume | 100 | 70..140, радиус и ширина ленты |
| hairSheen | 100 | 0..200, сила блика |
| posterHairColor | undefined | основной цвет; при undefined наследует var(--hair) |
| posterHairSecondary | undefined | второй тон; при undefined равен основному |
| posterHatColor | #382d27 | цвет сетки |
| posterRibbonColor | ribbonColor или #bda175 | бантик и петли |
| posterSnoodSpacing | 100 | 70..140, шаг ромбов |
| posterSnoodOpacity | 92 | 20..100, непрозрачность только сетки |

hairFrontWidth, hairFrontHeight, hairBackWidth, hairBackHeight, hatWidth,
hatScale, hatRotation, hatMirrored и ribbonColor уже предусмотрены API.
Не создавай вторые поля hatTilt или hairColor вместо существующих настроек.

Добавь элементы управления в Wardrobe с прежним оформлением и компонентами
Slider/Palette. Показывай новые регуляторы только для выбранных poster-предметов.
Используй hasPosterCurls(id), чтобы выключить тугость/объём для гладких валиков:
помпадур не должен превращаться в телефонную спираль. Блеск работает и на валиках.

При смене штатной палитры волос сбрасывай posterHairColor и posterHairSecondary
в undefined, если они были установлены новым интерфейсом. Иначе переопределение
визуально заблокирует старую палитру. Кнопка «Как в общей палитре» также очищает
оба поля. Сброс только новых настроек не должен сбрасывать форму лица или одежду.

## Приёмка

1. До изменений запиши список старых ID и сделай скриншоты нескольких прямых причёсок, лица и одежды.
2. Запусти штатную проверку TypeScript и сборку настоящего проекта.
3. Выполни checkPosterCollection(); все passed должны быть true.
4. Проверь отсутствие повторяющихся ID после добавления предметов.
5. Сравни старые причёски, лицо и одежду с исходными скриншотами при тех же настройках.
6. Проверь все 11 новых причёсок в главной сцене и миниатюрах. Устраняй обрезание bbox только в новых предметах.
7. Проверь чёрные, каштановые, платиновые волосы; значения тугости 60/100/150, объёма 70/100/140 и блеска 0/100/200.
8. Сетка не должна пересекать центральную часть лица. Проверь передний и задний слой при наклоне 0/30/90/360, масштабе 55/100/165 и отражении.
9. Открой одновременно сцену и миниатюры: SVG id фильтров, масок, градиентов должны оставаться уникальными.
10. Проверь сохранение, загрузку и экспорт в исходной игре. CSS-переменные var(--hair) и color-mix в экспортируемом SVG должны быть разрешены штатным экспортёром или новым локальным адаптером, не изменяющим рендер старых предметов.

Опиши изменённые пути и реально выполненные проверки. Не объявляй визуальное
совпадение или отсутствие регрессий доказанным только по успешной Vite-сборке.

## О рисунке

На этом конкретном листе нет клоша, берета или тюрбана. Не выдавай их за элементы
постера. Шейные платки также не являются головными уборами. Варианты шнур/лента/
синель для снуда взяты из подписи, а не из трёх разных нарисованных шапок.
Атласные петли «Инфанты» сделаны отдельным украшением, чтобы не перекрашивать их
вместе с волосами. Таблица соответствий находится в README.md.

---

## src/features/stubble/STUBBLE_GUIDE.md

# ИНСТРУКЦИЯ ДЛЯ AGENT MODE: ПОДКЛЮЧЕНИЕ СТЕРНИ НА ГОЛОВЕ (HEAD STUBBLE)

> ⚠️ **КРИТИЧЕСКОЕ ПРАВИЛО:**
> **НЕ ВСТАВЛЯЙ СТЕРНЮ В `Hair.tsx`!**
> Стерня — это НЕ парик и НЕ часть причёски. Стерня — это короткие волоски (1-2 мм) **на самой коже черепа**, поэтому она рендерится внутри компонента головы (`Face.tsx` или `Head.tsx`) сразу после заливки овала лица!

---

## ШАГ 1: Скопируй компонент

Положи файл `HeadStubble.tsx` в папку `src/components/HeadStubble.tsx`.

---

## ШАГ 2: Добавь стерню в `src/components/Face.tsx` (или `Head.tsx`)

Открой файл, где рисуется контур лица (`headPath` / овал черепа).

1. Вверху файла добавь импорт:
```tsx
import { HeadStubble } from './HeadStubble';
```

2. Найди место, где рисуется кожа черепа:
```tsx
{/* 1. Кожа черепа */}
<path d={headPath} fill={skinColor} stroke={skinShade} strokeWidth={0.9} />
```

3. **СРАЗУ ПОСЛЕ НЕГО** вставь `<HeadStubble />`:
```tsx
{/* 1. Кожа черепа */}
<path d={headPath} fill={skinColor} stroke={skinShade} strokeWidth={0.9} />

{/* 2. СТЕРНЯ НА ГОЛОВЕ (между кожей и чертами лица) */}
<HeadStubble
  headPath={headPath}
  hairColor={hairColor ?? 'var(--hair, #3a2a1e)'}
  density={face?.menTaper ?? (face?.stubbleDensity ?? 100)}
  length={face?.menStubbleLength ?? 100}
  preset={
    // Автоматический выбор пресета по выбранной стрижке или настройке
    selectedHairId?.includes('heydrich') ? 'heydrich' :
    selectedHairId?.includes('undercut') || selectedHairId?.includes('youth') ? 'undercut' :
    selectedHairId?.includes('clipper') || selectedHairId?.includes('close-crop') ? 'clipper-crop' :
    selectedHairId?.includes('himmler') ? 'himmler' :
    selectedHairId?.includes('taper') || selectedHairId?.includes('side-part') ? 'temples' :
    (face?.stubblePreset ?? 'heydrich')
  }
  disabled={!(face?.menTaper ?? 100) || (!isMale && !face?.forceStubble)}
/>

{/* 3. Дальше идут румянец, брови, глаза, нос, губы... */}
```

---

## ПОЧЕМУ ЭТО РАБОТАЕТ И НЕ ВЫЛЕЗАЕТ ЗА ГОЛОВУ:

1. `HeadStubble` принимает `headPath` (тот же самый SVG-контур, которым рисуется лицо) и использует его внутри `<clipPath>`.
2. Поэтому даже при любых изменениях ширины подбородка, челюсти или скул ни один волосок **физически не может вылезти за пределы головы**.
3. Волоски рисуются как тонкие изогнутые кривые (`strokeWidth=0.32`), а под ними лежит мягкая полупрозрачная растушёвка тона волос.
4. При плотности `0` стерня полностью исчезает.

---

## ГОТОВЫЕ ПРЕСЕТЫ СТЕРНИ:

- `'heydrich'` — высокий ровный срез машинки от брови до верха уха.
- `'undercut'` — высокий андеркат с обеих сторон и на затылке.
- `'clipper-crop'` — плотная армейская стерня вокруг всей головы.
- `'himmler'` — редкая низкая стерня около ушей.
- `'temples'` — классическая аккуратная окантовка височных зон.


---


# ПОЛНЫЕ ИСХОДНЫЕ ФАЙЛЫ

## src/features/poster1930/types.ts

```ts
export type Layer = 'front' | 'back';
export type BBox = [number, number, number, number];
export type Curve = [number, number, number, number, number, number, number, number];
export type Point = [number, number];

// Optional, structural settings: importing the game's FaceSel is not required.
export interface PosterSettings {
  hairFrontWidth?: number;
  hairFrontHeight?: number;
  hairBackWidth?: number;
  hairBackHeight?: number;
  curlTightness?: number;
  curlVolume?: number;
  hairSheen?: number;
  posterHairColor?: string;
  posterHairSecondary?: string;
  posterHatColor?: string;
  posterRibbonColor?: string;
  posterSnoodSpacing?: number;
  posterSnoodOpacity?: number;
  ribbonColor?: string;
  hatWidth?: number;
  hatScale?: number;
  hatRotation?: number;
  hatMirrored?: boolean;
}

export interface CurlSpec {
  kind: 'ringlet' | 'pin';
  x: number;
  y: number;
  r: number;
  h: number;
  coils: number;
  w?: number;
  phase?: number;
  taper?: number;
  tilt?: number;
  rotation?: number;
  mirrored?: boolean;
}

export interface Surface {
  d: string;
  strands?: string[];
  highlights?: string[];
  shadows?: string[];
  part?: string;
  transform?: string;
  coils?: CurlSpec[];
}

export interface PosterDesign {
  id: string;
  name: string;
  year: number;
  caption: string;
  position: string;
  description: string;
  construction: string;
  referenceView: string;
  bbox: BBox;
  front: Surface[];
  back: Surface[];
  recommendedHeadwear?: string;
}

export type PosterHatKind =
  | 'cord' | 'ribbon' | 'chenille' | 'satin-loops'
  | 'toque' | 'sailor' | 'doll' | 'cossack' | 'topper'
  | 'turban' | 'plush' | 'shako' | 'snood-hood'
  | 'goggles' | 'forehead-gem';

export interface PosterHeadwearDef {
  id: string;
  name: string;
  year: number;
  kind: PosterHatKind;
  category?: 'headgear' | 'accessories';
  description: string;
  bbox: BBox;
  color?: string;
  accent?: string;
  position?: string;
}

export function bounded(value: number | undefined, fallback: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, typeof value === 'number' && Number.isFinite(value) ? value : fallback));
}

// Hex colors are resolved numerically for standalone SVG export. The game can
// continue supplying its inherited --hair variable without an adapter.
export function tone(color: string, amount: number): string {
  const value = Math.min(1, Math.max(-1, amount));
  if (!/^#[\da-f]{6}$/i.test(color)) {
    return `color-mix(in srgb, ${color} ${(1 - Math.abs(value)) * 100}%, ${value < 0 ? 'black' : 'white'})`;
  }
  const target = value < 0 ? 0 : 255;
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16);
    return Math.round(channel + (target - channel) * Math.abs(value));
  });
  return `rgb(${channels.join(',')})`;
}
```

## src/features/poster1930/engine.ts

```ts
import { bounded, type CurlSpec, type Point, type Curve, type Surface } from './types';

// An isolated edition of the tapered-ribbon engine. No legacy generator changes.
const TAU = Math.PI * 2;
const number = (value: number) => Number(value.toFixed(3));
const pair = (p: Point) => `${number(p[0])} ${number(p[1])}`;

export function seedNoise(seed: number): number {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function smoothPath(points: Point[], closed = false): string {
  if (points.length < 2) return '';
  const at = (index: number): Point => closed
    ? points[(index + points.length) % points.length]
    : points[Math.min(points.length - 1, Math.max(0, index))];
  let d = `M${pair(points[0])}`;
  const segments = closed ? points.length : points.length - 1;
  for (let i = 0; i < segments; i++) {
    const a = at(i - 1), b = at(i), c = at(i + 1), e = at(i + 2);
    d += `C${pair([b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6])} ${pair([c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6])} ${pair(c)}`;
  }
  return d + (closed ? 'Z' : '');
}

function offset(points: Point[], widths: number[], ratio: number): Point[] {
  return points.map((p, i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const length = Math.hypot(dx, dy) || 1;
    return [p[0] - dy / length * widths[i] * ratio, p[1] + dx / length * widths[i] * ratio];
  });
}

export interface CurlPaths {
  body: string;
  groove: string;
  sheen: string;
  shade: string;
  strands: string[];
}

export function resolvePosterCurl(spec: CurlSpec, tightness = 100, volume = 100): CurlPaths {
  const radius = bounded(spec.r, 6, 0.1, 40) * bounded(volume, 100, 70, 140) / 100;
  const height = bounded(spec.h, 24, 2, 150);
  const turns = bounded(spec.coils, 2, 0.2, 6) * bounded(tightness, 100, 60, 150) / 100;
  const taper = bounded(spec.taper, 0.55, 0, 0.95);
  const tilt = bounded(spec.tilt, 0, -2, 2);
  const phase = bounded(spec.phase, 0, -TAU * 2, TAU * 2);
  const requestedWidth = bounded(spec.w, spec.r * 0.72, 0.3, 25) * radius / bounded(spec.r, 6, 0.1, 40);
  const width = spec.kind === 'pin'
    ? Math.min(requestedWidth, radius * 0.65)
    : Math.min(requestedWidth, height / (turns * 1.6));
  const count = Math.max(50, Math.ceil(turns * 38));
  const points: Point[] = [];
  const widths: number[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const ease = t * t * (3 - 2 * t);
    if (spec.kind === 'pin') {
      const angle = phase + t * turns * TAU;
      const r = radius * (1 - 0.88 * t);
      points.push([Math.cos(angle) * r, Math.sin(angle) * r * height / (radius * 2)]);
    } else {
      const angle = phase + t * turns * TAU;
      const r = radius * (1 - taper * t);
      points.push([Math.sin(angle) * r + tilt * t * radius * 0.7, height * t]);
    }
    widths.push(width * (1 - ease * 0.94) * (1 + Math.sin(Math.PI * t) * 0.15));
  }
  const left = offset(points, widths, 0.5);
  const right = offset(points, widths, -0.5);
  return {
    body: smoothPath([...left, ...right.reverse()], true),
    groove: smoothPath(offset(points, widths, 0.04)),
    sheen: smoothPath(offset(points, widths, -0.25)),
    shade: smoothPath(offset(points, widths, 0.35)),
    strands: [-0.36, -0.14, 0.18].map((k) => smoothPath(offset(points, widths, k))),
  };
}

// Mirroring the whole local primitive also mirrors its tip, taper and texture.
export function mirrorCurl(spec: CurlSpec, axis = 150): CurlSpec {
  return { ...spec, x: 2 * axis - spec.x, rotation: -(spec.rotation ?? 0), mirrored: !spec.mirrored };
}

export function bundle(a: Curve, b: Curve, count = 20): string[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const p = a.map((v, j) => number(v + (b[j] - v) * t));
    return `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}`;
  });
}

// A sculpted barrel is a filled roll, not a stretched hanging ringlet.
export function roll(x: number, y: number, rx: number, ry: number, rotation = 0): Surface {
  return {
    transform: `translate(${x} ${y}) rotate(${rotation})`,
    d: `M${-rx} 0C${-rx} ${-ry * 1.2} ${rx * 0.65} ${-ry * 1.3} ${rx} ${-ry * 0.2}C${rx * 1.2} ${ry * 0.8} ${-rx * 0.6} ${ry * 1.2} ${-rx} 0Z`,
    strands: bundle([-rx, 0, -rx, -ry * 1.05, rx * 0.8, -ry, rx, 0], [-rx * 0.7, ry * 0.3, -rx * 0.5, -ry * 0.6, rx * 0.65, -ry * 0.55, rx * 0.7, ry * 0.45], 15),
    highlights: [`M${-rx * 0.92} ${-ry * 0.05}C${-rx * 0.6} ${-ry * 1.1} ${rx * 0.52} ${-ry * 1.05} ${rx * 0.88} ${-ry * 0.3}C${rx * 0.3} ${-ry * 0.8} ${-rx * 0.45} ${-ry * 0.65} ${-rx * 0.92} ${-ry * 0.05}Z`],
    shadows: [`M${-rx * 0.6} ${ry * 0.15}C${-rx * 0.3} ${-ry * 0.18} ${rx * 0.75} ${-ry * 0.05} ${rx * 0.8} ${ry * 0.3}C${rx * 0.2} ${ry * 0.82} ${-rx * 0.45} ${ry * 0.65} ${-rx * 0.6} ${ry * 0.15}Z`],
  };
}

export function braid(x: number, y: number, length: number, width = 5): Surface[] {
  return Array.from({ length: Math.round(length / 6) }, (_, i) => ({
    transform: `translate(${x} ${y + i * 6}) scale(${1 - i * 0.045})`,
    d: `M0 -3C${-width * 1.7} -7 ${-width * 1.4} 3 0 7C${width * 1.4} 3 ${width * 1.7} -7 0 -3Z`,
    strands: [`M${-width} -2Q${-width * 0.6} 2 2 5`, `M${width} -2Q${width * 0.6} 2 -2 5`],
    highlights: [`M${-width} -1Q${-width * 0.7} 2 0 4L-1 6Q${-width * 1.4} 2 ${-width} -1Z`],
  }));
}
```

## src/features/poster1930/designs.ts

```ts
import { braid, bundle, mirrorCurl, roll, seedNoise } from './engine';
import type { CurlSpec, PosterDesign, Surface } from './types';

const pin = (x: number, y: number, r: number, phase = 0, rotation = 0): CurlSpec => ({
  kind: 'pin', x, y, r, h: r * 1.7, coils: 1.15, w: r * 0.55, phase, rotation,
});
const pair = (spec: CurlSpec): CurlSpec[] => [spec, mirrorCurl(spec)];
const curls = (coils: CurlSpec[]): Surface => ({ d: '', coils });

function cap(part = 143, top = 27, hairline = 50): Surface {
  return {
    d: `M111 88C103 66 108 ${top + 14} 128 ${top + 5}C145 ${top - 5} 170 ${top} 184 ${top + 13}C197 ${top + 28} 194 69 189 88L181 85C184 69 177 ${hairline + 5} 165 ${hairline}C151 ${hairline - 6} 144 ${hairline - 2} 133 ${hairline + 4}C123 ${hairline + 11} 116 71 119 85Z`,
    strands: [
      ...bundle([part, top, 121, top - 3, 102, 48, 112, 83], [part + 4, hairline - 2, 134, hairline - 4, 119, 66, 120, 85], 22),
      ...bundle([part + 2, top, 177, top - 3, 197, 46, 188, 83], [part + 5, hairline, 168, hairline - 2, 181, 68, 180, 85], 26),
    ],
    highlights: [`M114 47Q131 ${top + 1} ${part} ${top + 3}Q131 ${top + 12} 118 56Z`, `M186 47Q173 ${top + 2} ${part + 3} ${top + 3}Q171 ${top + 13} 182 57Z`],
    part: `M${part} ${top}Q${part - 2} ${top + 12} ${part + 4} ${hairline}`,
  };
}

function backMass(bottom = 127, width = 46): Surface {
  return {
    d: `M${150 - width} 62C${148 - width} 39 125 25 150 25C175 25 ${152 + width} 39 ${150 + width} 62C${157 + width} 86 ${153 + width} ${bottom - 8} 181 ${bottom}Q150 ${bottom + 12} 119 ${bottom}C${147 - width} ${bottom - 8} ${143 - width} 86 ${150 - width} 62Z`,
    strands: [
      ...bundle([150 - width, 62, 97, 89, 106, bottom - 8, 126, bottom], [147, 50, 139, 85, 139, bottom - 10, 146, bottom + 2], 18),
      ...bundle([150 + width, 62, 203, 89, 194, bottom - 8, 174, bottom], [153, 50, 161, 85, 161, bottom - 10, 154, bottom + 2], 18),
    ],
    highlights: [`M108 85Q105 ${bottom - 12} 127 ${bottom - 2}Q110 ${bottom} 107 ${bottom - 10}Z`],
  };
}

function pageboySides(under = false): Surface[] {
  const left: Surface = {
    d: under
      ? 'M113 51C100 73 109 92 104 113C101 127 109 141 124 140Q131 141 134 133C119 132 118 123 121 114C126 99 116 85 121 68Z'
      : 'M113 50C102 67 107 91 103 109C99 124 110 135 128 131C116 124 120 114 120 104C121 92 116 76 123 66Z',
    strands: bundle([111, 54, 99, 91, 104, 128, 127, under ? 138 : 130], [120, 62, 111, 90, 115, 122, 133, under ? 133 : 126], 16),
    highlights: ['M110 75Q103 107 115 123Q108 107 115 83Z'],
    shadows: ['M109 128Q120 139 132 133Q119 132 114 125Z'],
  };
  return [left, { ...left, transform: 'translate(300 0) scale(-1 1)' }];
}

const sidePartRoll: PosterDesign = {
  id: 'hair-poster-1930-nape-roll', name: 'Боковой пробор и валик', year: 1930,
  caption: 'Side part with roll round back', position: 'Верхний левый рисунок',
  description: 'Мягкие боковые волны уходят в непрерывный валик у основания затылка.',
  construction: 'Гладкая макушка, асимметричный пробор, широкий поперечный валик. Не спиральные пружины.',
  referenceView: 'На постере вид сзади в три четверти. Передняя часть адаптирована.',
  bbox: [94, 16, 112, 125],
  back: [backMass(114, 43), roll(150, 115, 42, 14)],
  front: [cap(138, 28), { d: 'M109 61Q122 54 123 66Q114 68 118 77Q108 75 109 61Z', strands: ['M110 65Q119 60 120 66', 'M110 69Q115 76 120 74'], highlights: ['M110 63Q117 59 122 64L120 66Q116 63 110 67Z'] }, curls(pair(pin(113, 82, 4.2, 0.5)))],
};

const antoine: PosterDesign = {
  id: 'hair-poster-1933-antoine', name: 'Короткая укладка «Антуан»', year: 1933,
  caption: 'Short hair curled in back, Antoine', position: 'Верхний средний рисунок',
  description: 'Приглаженные пальцевые волны и плотные мелкие завитки на затылке.',
  construction: 'Короткий объём за ушами. Плоские pin-curls собраны в два ряда, лицо остаётся открытым.',
  referenceView: 'На постере профиль. Здесь фронтальная адаптация.',
  bbox: [94, 18, 112, 124],
  back: [backMass(108, 40), curls(Array.from({ length: 12 }, (_, i) => pin(111 + (i % 6) * 15.5, 98 + Math.floor(i / 6) * 13, 6.3, i * 0.67)))],
  front: [cap(140, 29), curls([...pair(pin(112, 76, 5.4, 0.7)), ...pair(pin(110, 88, 5.3, 1.1)), ...pair(pin(115, 100, 4.8, 1.7))])],
  recommendedHeadwear: 'headgear-poster-1938-snood-cord',
};

const bangsChignon: PosterDesign = {
  id: 'hair-poster-1935-bangs-chignon', name: 'Кудрявая чёлка и шиньон', year: 1935,
  caption: 'Curled bangs and chignon', position: 'Верхний правый рисунок',
  description: 'Короткая чёлка из колечек над лбом, гладкие виски и собранный шиньон.',
  construction: 'Компактные плоские завитки, а не длинные локоны. Отдельный задний шиньон.',
  referenceView: 'На постере три четверти. Здесь фронтальная адаптация.',
  bbox: [93, 7, 114, 135],
  back: [backMass(104, 39), roll(150, 113, 27, 16)],
  front: [cap(147, 30, 55), curls([
    pin(119, 41, 7.3, 1), pin(130, 32, 8.1, 2), pin(144, 28, 7.1, 0.4), pin(158, 28, 7.9, 2.8), pin(173, 34, 7.6, 1.7), pin(182, 43, 6.6, 0.6),
    pin(128, 49, 5.2, 1.5), pin(141, 47, 5.7, 2.3), pin(153, 47, 5.7, 0.4), pin(166, 48, 5.2, 1.8),
    ...pair(pin(113, 83, 4.2, 0.5)),
  ])],
};

const pompadourBob: PosterDesign = {
  id: 'hair-poster-1937-pompadour-bob', name: 'Паж с валиком-помпадуром', year: 1937,
  caption: 'Page-boy bob with rolled pompadour', position: 'Слева, над «Инфантой»',
  description: 'Боб до подбородка с гладкими боками и крупным поднятым валиком надо лбом.',
  construction: 'Крупный горизонтальный ролл с внутренней тенью. Боковые пряди длинные и плавные.',
  referenceView: 'На постере три четверти. Сохранены длина боба и асимметрия валика.',
  bbox: [88, 0, 124, 148],
  back: [backMass(126, 47)],
  front: [cap(151, 29), ...pageboySides(), roll(145, 32, 32, 14, 12), roll(171, 43, 12, 8, 34)],
};

const unbrushed: PosterDesign = {
  id: 'hair-poster-1938-unbrushed', name: 'Нерасчёсанные кудри', year: 1938,
  caption: 'Short hair dressed in un-brushed curls on top', position: 'Слева, под первым рядом',
  description: 'Короткие приглаженные бока и живые, неравномерные кудри на макушке.',
  construction: 'Два нерегулярных ряда pin-curls; фиксированный seed сохраняет укладку между кадрами.',
  referenceView: 'На постере профиль. Длина на висках сохранена короткой.',
  bbox: [89, 1, 122, 129],
  back: [backMass(99, 39)],
  front: [cap(142, 29), curls(Array.from({ length: 13 }, (_, i) => {
    const row = i < 7 ? 0 : 1;
    const index = row ? i - 7 : i;
    return pin(113 + index * 12 + row * 7, 27 + row * 13 + Math.abs(index - 3) * 2.7, 6 + seedNoise(i + 30) * 2.5, seedNoise(i + 92) * Math.PI * 2);
  }))],
};

const featherLeft: Surface = {
  d: 'M112 87C102 72 104 55 116 43C128 33 135 29 133 17C144 23 146 32 141 43C135 52 121 59 120 72L120 87Z',
  strands: bundle([133, 18, 151, 44, 96, 41, 113, 83], [133, 28, 138, 46, 113, 54, 120, 85], 21),
  highlights: ['M112 50C122 40 140 36 136 24C146 43 119 47 113 60Z'],
  shadows: ['M108 67Q104 54 116 46Q108 59 115 69Z'],
};
const feather: PosterDesign = {
  id: 'hair-poster-1938-feather', name: 'Укладка «Перо»', year: 1938,
  caption: 'Feather-shaped coiffure, short and rolled', position: 'В центре, под первым рядом',
  description: 'Две встречные волны поднимаются над открытым лбом, как перья.',
  construction: 'Два скульптурных S-образных гребня с высоким центральным разрывом. Висящих спиралей нет.',
  referenceView: 'На постере анфас. Силуэт ближе всего к исходному ракурсу.',
  bbox: [92, 5, 116, 127],
  back: [backMass(104, 40), roll(150, 110, 29, 10)],
  front: [cap(150, 32, 53), featherLeft, { ...featherLeft, transform: 'translate(300 0) scale(-1 1)' }],
};

const infantaLeft: CurlSpec[] = Array.from({ length: 5 }, (_, i) => ({
  kind: 'ringlet', x: 102 + i * 3.5, y: 47 + i * 7,
  r: 5.8 + seedNoise(i + 24) * 1.4, h: 66 - i * 5, coils: 3.2 + seedNoise(i + 81) * 0.65,
  w: 5.5, phase: i * 0.9, tilt: -0.18, taper: 0.38,
}));
const infanta: PosterDesign = {
  id: 'hair-poster-1939-infanta', name: '«Инфанта»', year: 1939,
  caption: 'Infante coiffure, satin loops, Balenciaga', position: 'Центральный рисунок с длинными петлями',
  description: 'Короткая объёмная основа обрамляет лицо удлинёнными локонами и атласными петлями.',
  construction: 'Ряды конических лент по бокам. Атласные петли вынесены в отдельный предмет, их цвет независим от волос.',
  referenceView: 'На постере три четверти. Петли интерпретированы по подписи, не как всецело натуральные волосы.',
  bbox: [82, 8, 136, 150],
  back: [backMass(123, 47), curls([...infantaLeft, ...infantaLeft.map((s) => mirrorCurl(s))])],
  front: [cap(147, 25), curls([
    ...pair({ kind: 'ringlet', x: 113, y: 62, r: 5.8, h: 58, coils: 3.1, w: 4.9, phase: 0.7, taper: 0.4, tilt: 0.05 }),
    pin(121, 38, 6.4, 1.2), pin(137, 29, 6, 1.7), pin(160, 30, 6, 0.2), pin(177, 40, 6.1, 0.5),
  ])],
  recommendedHeadwear: 'headgear-poster-1939-satin-loops',
};

const backParted: PosterDesign = {
  id: 'hair-poster-1939-parted-roll', name: 'Пробор и затылочные валики', year: 1939,
  caption: 'Short hair parted and rolled', position: 'Справа от «Инфанты», вид со спины',
  description: 'Крупные гладкие секции от пробора переходят в широкие валики на затылке.',
  construction: 'Задний слой содержит две рельефные продольные массы и нижний валик. Передняя часть сдержанная.',
  referenceView: 'Основная информация на постере со спины; фронтальная линия волос реконструирована.',
  bbox: [90, 5, 120, 137],
  back: [backMass(111, 47), roll(128, 67, 36, 16, -64), roll(174, 63, 37, 18, 62), roll(152, 113, 34, 12)],
  front: [cap(140, 26), roll(168, 33, 20, 10, 16), curls(pair(pin(112, 89, 4.4, 0.2)))],
};

const shortRolled: PosterDesign = {
  id: 'hair-poster-1939-short-rolled', name: 'Короткая укладка с пробором', year: 1939,
  caption: 'Short coiffure parted and rolled', position: 'Нижний левый рисунок',
  description: 'Высокая боковая волна и коротко подобранные концы за ушами.',
  construction: 'Асимметричный помпадур меньшего размера, короткий затылок и два компактных височных колечка.',
  referenceView: 'На постере боковой ракурс. Фронтальная асимметрия интерпретирована.',
  bbox: [89, 1, 122, 130],
  back: [backMass(101, 40), roll(150, 105, 29, 9)],
  front: [cap(137, 26), roll(137, 31, 24, 13, -23), roll(172, 43, 16, 10, 40), curls([...pair(pin(113, 88, 4.5, 0.8)), pin(119, 50, 5.5, 0.2)])],
};

const plaitedPompadour: PosterDesign = {
  id: 'hair-poster-1939-pompadour-plaits', name: 'Помпадур и косички', year: 1939,
  caption: 'Short coiffure with pompadour and plaits', position: 'Нижний центральный рисунок',
  description: 'Высокая откинутая назад волна, открытый лоб и небольшие косички на затылке.',
  construction: 'Широкая поднятая масса с направленными прядями. Косички состоят из перекрывающихся звеньев, не из колец.',
  referenceView: 'На постере три четверти. Косички находятся за шеей, не на лбу.',
  bbox: [92, 0, 116, 148],
  back: [backMass(104, 40), ...braid(117, 92, 37, 5), ...braid(183, 92, 37, 5), roll(150, 115, 25, 8)],
  front: [{
    d: 'M112 86C101 65 105 41 118 29C115 20 129 9 146 15C162 7 179 17 184 29C198 44 196 68 187 86L180 83C184 66 174 55 162 52Q150 48 138 53C124 59 116 70 120 84Z',
    strands: [
      ...bundle([121, 32, 112, 8, 135, 7, 149, 19], [127, 57, 121, 40, 135, 27, 152, 25], 23),
      ...bundle([149, 18, 176, 4, 196, 31, 189, 66], [144, 53, 176, 60, 186, 58, 181, 84], 30),
      ...bundle([114, 42, 104, 57, 111, 76, 116, 85], [128, 54, 117, 63, 116, 76, 120, 84], 9),
    ],
    highlights: ['M119 32C114 17 135 10 147 19C132 17 124 29 127 38Z', 'M154 19Q179 14 187 41Q174 24 150 28Z'],
    shadows: ['M129 55Q150 42 173 58L168 59Q149 51 136 57Z'],
  }],
};

const underBob: PosterDesign = {
  id: 'hair-poster-1939-under-bob', name: 'Паж с подвёрнутыми концами', year: 1939,
  caption: 'Page-boy bob, ends rolled under', position: 'Нижний правый рисунок',
  description: 'Мягкий боб до подбородка: гладкая длина, округлые концы внутрь и волна у лба.',
  construction: 'Сохранена ровная длина; внутрь подворачиваются только концы. По бокам нет висящих спиралей.',
  referenceView: 'На постере три четверти. Края адаптированы симметрично для анфаса.',
  bbox: [86, 10, 128, 145],
  back: [backMass(134, 48), roll(125, 132, 16, 8, 9), roll(175, 132, 16, 8, -9)],
  front: [cap(147, 26), ...pageboySides(true), roll(143, 39, 21, 9, -7), curls([pin(171, 42, 4.3, 0.9)])],
};

/* ── 4 новые укладки с листа головных уборов 1930–1940 ── */

/** 1. Помпадур Schiaparelli: каскад завитков-валиков на лбу с гладкими поднятыми боками */
const dollPomp: PosterDesign = {
  id: 'hair-poster-1938-doll-pomp', name: 'Помпадур Schiaparelli', year: 1938,
  caption: 'Sculptured front pompadour puff with sleek upswept sides (Schiaparelli model)',
  position: 'Второй ряд слева, под шляпку Schiaparelli',
  description: 'Высокая скульптурная укладка: над лбом возвышается пышный валик-помпадур, виски зачёсаны гладко вверх под ленту.',
  construction: 'Крупный двойной ролл надо лбом (y=22..38), боковые пряди идут вертикально вверх. Идеально под «Doll’s Hat».',
  referenceView: 'На листе анфас под шляпкой Schiaparelli.',
  bbox: [88, -2, 124, 136],
  back: [backMass(108, 42), roll(150, 112, 30, 12)],
  front: [
    cap(148, 28, 54),
    roll(144, 28, 24, 15, -12),
    roll(162, 36, 16, 11, 24),
    curls([
      pin(132, 44, 7.5, 1.2),
      pin(148, 46, 6.8, 2.4),
      pin(160, 48, 6.2, 0.5),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1938-dolls-hat',
};

/** 2. Локоны-бочонки под папаху Rose Valois */
const cossackCurls: PosterDesign = {
  id: 'hair-poster-1939-cossack-curls', name: 'Локоны на затылке под папаху', year: 1939,
  caption: 'Smooth crown with cascading barrel ringlets at the neck (Rose Valois model)',
  position: 'Второй ряд справа, под папаху Rose Valois',
  description: 'Гладкая волна на макушке, переходящая в каскад плотных круглых локонов-бочонков вокруг шеи и плеч.',
  construction: 'Гладкая основа с длинными прядями назад, на затылке и по бокам шеи — 6 крупных скульптурных локонов.',
  referenceView: 'На листе анфас под казачьей шапкой.',
  bbox: [84, 8, 132, 154],
  back: [
    backMass(132, 48),
    curls([
      ...pair({ kind: 'ringlet', x: 114, y: 104, r: 8.5, h: 42, coils: 2.8, w: 7.8, phase: 0.8, taper: 0.4 }),
      ...pair({ kind: 'ringlet', x: 128, y: 112, r: 8, h: 36, coils: 2.4, w: 7.2, phase: 2.1, taper: 0.45 }),
    ]),
  ],
  front: [
    cap(146, 28, 52),
    curls([
      ...pair({ kind: 'ringlet', x: 112, y: 92, r: 8, h: 38, coils: 2.5, w: 7.5, phase: 1.4, taper: 0.42 }),
      ...pair(pin(116, 78, 5.2, 0.6)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-cossack',
};

/** 3. Волна у уха под плюшевый ток Suzy */
const quillWaves: PosterDesign = {
  id: 'hair-poster-1939-quill-waves', name: 'Скульптурная ушная волна', year: 1939,
  caption: 'Deep finger waves over the ears with low sculpted rolls (Suzy model)',
  position: 'Третий ряд слева, под плюшевый ток Suzy',
  description: 'Глубокие рельефные волны Марсель на висках, аккуратно огибающие уши и переходящие в плотные валики.',
  construction: 'S-образные волны с завитками у мочек ушей и низкий плотный затылочный валик.',
  referenceView: 'На листе три четверти под током Suzy.',
  bbox: [90, 10, 120, 138],
  back: [backMass(112, 44), roll(150, 114, 38, 14)],
  front: [
    cap(140, 27, 51),
    {
      d: 'M111 84C106 66 109 46 124 35C139 25 163 26 178 36C191 46 193 64 188 82L182 80C184 64 176 53 165 49C154 45 146 47 135 51C124 56 117 64 119 78Z',
      strands: [
        ...bundle([156, 26, 134, 22, 108, 38, 112, 66], [162, 46, 140, 42, 122, 62, 118, 80], 22),
        ...bundle([157, 26, 182, 23, 196, 46, 189, 70], [163, 47, 175, 47, 184, 66, 181, 80], 18),
      ],
      highlights: ['M113 46Q132 30 156 32Q138 38 118 54Z'],
      part: 'M156 26Q154 36 162 46',
    },
    curls([
      ...pair({ kind: 'ringlet', x: 110, y: 82, r: 7.2, h: 28, coils: 2.2, w: 6.8, phase: 0.9, taper: 0.5 }),
      ...pair(pin(114, 72, 5.5, 1.8)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-plush-toque',
};

/**
 * Коса, уложенная в вертикальную петлю-баранку (в анфас):
 * Коса спускается сверху вниз вдоль виска и щеки, а снизу мягко
 * огибает мочку уха и поднимается вверх параллельной петлёй.
 * Звенья развёрнуты плетением строго на зрителя.
 */
function braidLoop(points: [number, number][], width: number, count: number): Surface[] {
  // Интерполируем точки вдоль ломаной
  const sampled: { pt: [number, number]; angle: number }[] = [];
  
  // Вычисляем общую длину траектории
  let totalLength = 0;
  const dists: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][0] - points[i - 1][0];
    const dy = points[i][1] - points[i - 1][1];
    totalLength += Math.hypot(dx, dy);
    dists.push(totalLength);
  }

  for (let i = 0; i < count; i++) {
    const targetDist = (i / (count - 1)) * totalLength;
    // Находим сегмент
    let seg = 1;
    while (seg < dists.length - 1 && dists[seg] < targetDist) seg++;
    const segLen = dists[seg] - dists[seg - 1] || 1;
    const t = (targetDist - dists[seg - 1]) / segLen;
    const p0 = points[seg - 1];
    const p1 = points[seg];
    const x = p0[0] + (p1[0] - p0[0]) * t;
    const y = p0[1] + (p1[1] - p0[1]) * t;
    const angle = (Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * 180) / Math.PI;
    sampled.push({ pt: [x, y], angle });
  }

  return sampled.map(({ pt, angle }) => ({
    transform: `translate(${pt[0].toFixed(1)} ${pt[1].toFixed(1)}) rotate(${(angle - 90).toFixed(1)})`,
    d: `M0 -3.5C${-width * 1.7} -7.5 ${-width * 1.4} 3.5 0 8C${width * 1.4} 3.5 ${width * 1.7} -7.5 0 -3.5Z`,
    strands: [
      `M${-width} -2.5Q${-width * 0.6} 2.5 2 6`,
      `M${width} -2.5Q${width * 0.6} 2.5 -2 6`,
      `M0 -3L0 7`,
    ],
    highlights: [`M${-width} -1.5Q${-width * 0.7} 2.5 0 5L-1 7Q${-width * 1.4} 2.5 ${-width} -1.5Z`],
    shadows: [`M${-width * 0.45} 5Q0 7.5 ${width * 0.45} 5L${width * 0.25} 7.8Q0 8.6 ${-width * 0.25} 7.8Z`],
  }));
}

// Траектории вертикальных петель (спуск вниз и подворот снизу вверх):
const LEFT_LOOP_OUTER: [number, number][] = [
  [112, 54], [104, 66], [98, 82], [96, 100], [98, 116], [105, 128], [116, 131], [124, 122], [123, 104], [118, 88]
];
const RIGHT_LOOP_OUTER: [number, number][] = [
  [188, 54], [196, 66], [202, 82], [204, 100], [202, 116], [195, 128], [184, 131], [176, 122], [177, 104], [182, 88]
];

/** «Баранки»: гладкий пробор посередине и две вертикальные косы-петли по бокам */
const braidedCoils: PosterDesign = {
  id: 'hair-poster-1938-braided-coils', name: '«Баранки»: вертикальные косы-петли', year: 1938,
  caption: 'Centre-parted sleek hair with large vertical looping braids over the ears',
  position: 'По референсу пользователя (Überfrau / Gretchenfrisur)',
  description: 'Волосы гладко зачёсаны назад от прямого пробора посередине, а по бокам спускаются и подворачиваются вверх две массивные косы-петли.',
  construction: 'Гладкая центральная шапочка и два вертикальных U-образных рукава braidLoop (по 24 звена каждый, ширина 6.5). Косы видны спереди во всю ширину плетения, спускаются вдоль щёк и огибают уши снизу.',
  referenceView: 'Анфас, как на референсе: косы идут вертикально по бокам головы.',
  bbox: [72, 14, 156, 124],
  back: [
    backMass(112, 42),
    // Теневые подложки под косами
    {
      d: 'M94 74C92 98 94 122 106 132C118 136 128 126 126 102C124 84 120 70 114 62Z',
      shadows: ['M98 84Q96 114 108 126Q120 128 122 108Z']
    },
    {
      d: 'M206 74C208 98 206 122 194 132C182 136 172 126 174 102C176 84 180 70 186 62Z',
      shadows: ['M202 84Q204 114 192 126Q180 128 178 108Z']
    }
  ],
  front: [
    {
      d: 'M112 84C107 62 112 38 130 29C143 22 157 22 170 29C188 38 193 62 188 84L181 82C184 62 179 50 166 45C156 41 144 41 134 45C121 50 116 62 119 82Z',
      strands: [
        ...bundle([150, 24, 132, 26, 116, 46, 113, 78], [150, 44, 138, 46, 122, 60, 120, 82], 20),
        ...bundle([150, 24, 168, 26, 184, 46, 187, 78], [150, 44, 162, 46, 178, 60, 180, 82], 20),
      ],
      highlights: ['M116 48Q132 28 150 27Q134 36 121 56Z', 'M184 48Q168 28 150 27Q166 36 179 56Z'],
      shadows: ['M134 44Q150 39 166 44L164 47Q150 43 136 47Z'],
      part: 'M150 24L150 46',
    },
    ...braidLoop(LEFT_LOOP_OUTER, 6.5, 24),
    ...braidLoop(RIGHT_LOOP_OUTER, 6.5, 24),
  ],
  recommendedHeadwear: 'headgear-poster-acc-aviator-goggles',
};

/** 4. Двойной помпадур-ролл под бархатный снуд Suzy */
const snoodRolls: PosterDesign = {
  id: 'hair-poster-1939-snood-rolls', name: 'Двойной ролл под снуд', year: 1939,
  caption: 'Double front victory rolls with open forehead for snood hood (Suzy snood model)',
  position: 'Низ по центру, под красный бархатный снуд',
  description: 'Два симметричных приподнятых ролла по бокам от открытого лба, специально уложенные под бант и снуд.',
  construction: 'Два выпуклых ролла y=24..42 слева и справа, открытый центр лба. Волосы сзади подобраны.',
  referenceView: 'На листе анфас под бархатным снудом Suzy.',
  bbox: [88, 4, 124, 142],
  back: [backMass(126, 46)],
  front: [
    cap(150, 32, 54),
    roll(132, 34, 20, 13, -20),
    roll(168, 34, 20, 13, 20),
    curls([
      ...pair(pin(124, 46, 6.2, 0.4)),
      ...pair(pin(176, 46, 6.2, 2.7)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-velvet-snood',
};

export const POSTER_HAIR: PosterDesign[] = [
  sidePartRoll, antoine, bangsChignon, pompadourBob, unbrushed, feather,
  infanta, backParted, shortRolled, plaitedPompadour, underBob,
  dollPomp, cossackCurls, quillWaves, snoodRolls, braidedCoils,
];

export const POSTER_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(POSTER_HAIR.map((design) => [design.id, design]));

export function hasPosterCurls(id: string): boolean {
  const design = POSTER_DESIGNS[id];
  return !!design && [...design.front, ...design.back].some((surface) => !!surface.coils?.length);
}
```

## src/features/poster1930/PosterHair.tsx

```tsx
import { memo, useId, useMemo } from 'react';
import { POSTER_DESIGNS } from './designs';
import { resolvePosterCurl } from './engine';
import { bounded, tone, type CurlSpec, type Layer, type PosterSettings, type Surface } from './types';

function CurlArt({ spec, uid, base, secondary, settings }: {
  spec: CurlSpec; uid: string; base: string; secondary: string; settings: PosterSettings;
}) {
  const tightness = bounded(settings.curlTightness, 100, 60, 150);
  const volume = bounded(settings.curlVolume, 100, 70, 140);
  const sheen = bounded(settings.hairSheen, 100, 0, 200) / 200;
  const paths = useMemo(() => resolvePosterCurl(spec, tightness, volume), [spec, tightness, volume]);
  const transform = `translate(${spec.x} ${spec.y}) rotate(${spec.rotation ?? 0}) scale(${spec.mirrored ? -1 : 1} 1)`;
  return (
    <g transform={transform}>
      <defs>
        <linearGradient id={`${uid}-fill`} x1="8%" y1="5%" x2="88%" y2="96%">
          <stop offset="0" stopColor={tone(base, 0.16)} />
          <stop offset="0.4" stopColor={base} />
          <stop offset="1" stopColor={tone(secondary, -0.28)} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}><path d={paths.body} /></clipPath>
      </defs>
      <path d={paths.body} fill={`url(#${uid}-fill)`} stroke={tone(base, -0.5)} strokeWidth="0.24" strokeLinejoin="round" />
      <g clipPath={`url(#${uid}-clip)`} fill="none" strokeLinecap="round">
        <path d={paths.shade} stroke={tone(base, -0.65)} strokeWidth="1.4" opacity="0.5" />
        <path d={paths.groove} stroke={tone(base, -0.52)} strokeWidth="0.5" opacity="0.7" />
        {paths.strands.map((d, i) => <path key={i} d={d} stroke={tone(base, -0.25)} strokeWidth="0.22" opacity="0.7" />)}
        <path d={paths.sheen} stroke={tone(secondary, 0.46)} strokeWidth="1.2" opacity={sheen * 0.68} />
        <path d={paths.sheen} stroke={tone(secondary, 0.7)} strokeWidth="0.35" opacity={sheen * 0.8} />
      </g>
    </g>
  );
}

function HairSurface({ surface, uid, settings, base, secondary }: {
  surface: Surface; uid: string; settings: PosterSettings; base: string; secondary: string;
}) {
  const sheen = bounded(settings.hairSheen, 100, 0, 200) / 200;
  return (
    <g transform={surface.transform}>
      {surface.d && <>
        <defs>
          <linearGradient id={`${uid}-mass`} x1="18%" y1="4%" x2="82%" y2="100%">
            <stop offset="0" stopColor={tone(base, 0.18)} />
            <stop offset="0.3" stopColor={base} />
            <stop offset="0.66" stopColor={secondary} />
            <stop offset="1" stopColor={tone(base, -0.32)} />
          </linearGradient>
          <clipPath id={`${uid}-mask`}><path d={surface.d} /></clipPath>
          <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="0.6" /></filter>
        </defs>
        <path d={surface.d} fill={`url(#${uid}-mass)`} stroke={tone(base, -0.55)} strokeWidth="0.65" strokeLinejoin="round" />
        <g clipPath={`url(#${uid}-mask)`}>
          {surface.shadows?.map((d, i) => <path key={`s${i}`} d={d} fill={tone(base, -0.6)} opacity="0.62" />)}
          {surface.highlights?.map((d, i) => <path key={`h${i}`} d={d} fill={tone(secondary, 0.5)} opacity={sheen * 0.55} filter={`url(#${uid}-soft)`} />)}
          {surface.strands?.map((d, i) => <path key={`t${i}`} d={d} fill="none" stroke={i % 4 === 0 ? tone(secondary, 0.27) : tone(base, -0.6)} strokeWidth={i % 4 === 0 ? 0.38 : 0.35} strokeLinecap="round" opacity={i % 4 === 0 ? 0.5 : 0.58} />)}
        </g>
        {surface.part && <path d={surface.part} fill="none" stroke={tone(base, -0.6)} strokeWidth="0.85" strokeLinecap="round" />}
      </>}
      {surface.coils?.map((spec, i) => <CurlArt key={i} spec={spec} uid={`${uid}-curl-${i}`} base={base} secondary={secondary} settings={settings} />)}
    </g>
  );
}

const EMPTY_SETTINGS: PosterSettings = {};

export const PosterHair = memo(function PosterHair({ styleId, layer = 'front', face = EMPTY_SETTINGS }: {
  styleId: string; layer?: Layer; face?: PosterSettings;
}) {
  const uid = `poster-hair-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const design = POSTER_DESIGNS[styleId];
  if (!design) return null;
  const width = bounded(layer === 'front' ? face.hairFrontWidth : face.hairBackWidth, 100, 72, 128) / 100;
  const height = bounded(layer === 'front' ? face.hairFrontHeight : face.hairBackHeight, 100, 72, 128) / 100;
  const base = face.posterHairColor || 'var(--hair, #4a3222)';
  const secondary = face.posterHairSecondary || base;
  return (
    <g data-poster-hair={styleId} data-layer={layer} transform={`translate(150 48) scale(${width} ${height}) translate(-150 -48)`}>
      {design[layer].map((surface, i) => <HairSurface key={i} surface={surface} uid={`${uid}-${layer}-${i}`} settings={face} base={base} secondary={secondary} />)}
    </g>
  );
});
```

## src/features/poster1930/PosterHeadwear.tsx

```tsx
import { memo, useId } from 'react';
import { bounded, tone, type Layer, type PosterHeadwearDef, type PosterSettings } from './types';

/**
 * 1930–1940 Headdresses & Hats from the poster:
 * - Redesigned to be deeply authentic to the illustration (proportions, textures, plumes, bows).
 * - Proper front & back layers so hats sit ON the head naturally.
 */
export const POSTER_HEADWEAR: PosterHeadwearDef[] = [
  // ── 1. Снуды и петли ──
  { id: 'headgear-poster-1938-snood-cord', name: 'Снуд из шнура', year: 1938, kind: 'cord', bbox: [90, 10, 120, 151], description: 'Тонкая ромбовидная сетка с узелками; волосы видны между ячейками.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-ribbon', name: 'Снуд из ленты', year: 1938, kind: 'ribbon', bbox: [90, 10, 120, 151], description: 'Более широкое переплетение лент с мягким атласным бликом.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-chenille', name: 'Синельный снуд', year: 1938, kind: 'chenille', bbox: [90, 10, 120, 151], description: 'Плотные бархатистые нити и мягкий край. Вариант материала из подписи к постеру.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1939-satin-loops', name: 'Атласные петли «Инфанты»', year: 1939, kind: 'satin-loops', bbox: [80, 17, 140, 142], description: 'Отдельное украшение по подписи Balenciaga: вытянутые петли по бокам, цвет не зависит от волос.', position: 'Инфанта 1939' },

  // ── 2. Головные уборы с листа 1930-1940 ──
  { id: 'headgear-poster-1939-burnt-toast', name: '«Burnt Toast» соломенная канотье', year: 1939, kind: 'sailor', color: '#d1ab73', accent: '#f7f4ec', bbox: [72, -4, 156, 80], position: 'Верхний левый (Bruyère)', description: 'Соломенная шляпа-канотье с бантом в горошек, розой и шёлковым шарфом вокруг шеи. Bruyère, 1939.' },
  { id: 'headgear-poster-1938-persian-toque', name: 'Ток из каракуля с вимплом-вуалью', year: 1938, kind: 'toque', color: '#1a1817', accent: '#262422', bbox: [82, 0, 136, 150], position: 'Верхний правый (1938)', description: 'Маленький ток из чёрного каракуля с широкой драпированной вуалью-вимплом из жоржета вокруг всей шеи.' },
  { id: 'headgear-poster-1938-dolls-hat', name: '«Doll’s Hat» Schiaparelli с пером и розой', year: 1938, kind: 'doll', color: '#161413', accent: '#e8a5b8', bbox: [88, -20, 124, 96], position: 'Второй ряд слева (Schiaparelli)', description: 'Крошечная кукольная шапочка с розой-капустой, чёрным страусиным пером и бархатной лентой под подбородком.' },
  { id: 'headgear-poster-1939-cossack', name: 'Казачья папаха Rose Valois', year: 1939, kind: 'cossack', color: '#1c1a18', accent: '#d4af37', bbox: [88, -8, 124, 88], position: 'Средний правый (Rose Valois)', description: 'Высокая асимметричная папаха из каракуля с характерным заломом назад и золотым ожерельем у горла.' },
  { id: 'headgear-poster-1939-plush-toque', name: 'Красный плюшевый ток с пером-пером', year: 1939, kind: 'plush', color: '#8c2430', accent: '#181414', bbox: [80, -32, 140, 108], position: 'Нижний левый (Suzy)', description: 'Красный плюшевый ток с огромным вертикальным пером-шпагой (quill), кручёными шнурами, кистями и бантом.' },
  { id: 'headgear-poster-1939-topper', name: 'Жёсткий цилиндр Rose Valois', year: 1939, kind: 'topper', color: '#8f2832', accent: '#1c1919', bbox: [84, -10, 132, 88], position: 'Центр снизу (Rose Valois)', description: 'Жёсткий красный фетровый цилиндр с расширяющейся тульей, загнутыми полями и чёрной репсовой лентой.' },
  { id: 'headgear-poster-1937-self-tied-turban', name: 'Шёлковый тюрбан self-tied', year: 1937, kind: 'turban', color: '#252e42', accent: '#baa177', bbox: [88, 6, 124, 68], position: 'Низ слева (1937)', description: 'Мягкий тюрбан диагонального плетения со швом на затылке по точной выкройке с постера.' },
  { id: 'headgear-poster-1939-shako', name: 'Бархатный шако Patou с петушиными перьями', year: 1939, kind: 'shako', color: '#181514', accent: '#c9a24b', bbox: [86, -26, 128, 102], position: 'Нижний правый (Patou)', description: 'Чёрный бархатный шако с пышным фонтаном изогнутых петушиных перьев, рвущихся вверх-вперёд.' },
  { id: 'headgear-poster-1939-velvet-snood', name: 'Бархатный снуд-капюшон Suzy', year: 1939, kind: 'snood-hood', color: '#8b242e', accent: '#b83b48', bbox: [82, 4, 136, 150], position: 'Низ по центру (Suzy)', description: 'Красный бархатный снуд-капюшон со структурированным бантом на макушке, драпирующийся по плечам.' },

  // ── 3. Аксессуары и головные уборы по отдельному референсу ──
  { id: 'headgear-poster-acc-aviator-goggles', name: 'Лётные очки-гогглы', year: 1939, kind: 'goggles', category: 'headgear', color: '#201b18', accent: '#7a7062', bbox: [94, 24, 112, 44], position: 'Головной убор / Очки', description: 'Мотоциклетно-лётные очки со стеклами, металлической оправой и аккуратными тонкими ушками, посаженные на лоб.' },
  { id: 'acc-poster-carbuncle', name: 'Карбункул на лбу', year: 1939, kind: 'forehead-gem', category: 'accessories', color: '#b81c28', accent: '#d4af37', bbox: [132, 46, 36, 22], position: 'Аксессуар (лоб)', description: 'Гранёный красный рубиновый камень-карбункул в золотой оправе, надетый по центру лба.' },
];

const BAG = 'M109 44C107 25 128 18 150 20C175 18 194 31 193 51C205 71 210 105 197 128C187 147 169 150 150 149C130 150 110 142 102 128C90 108 94 73 109 44Z';
const SIDES = 'M106 52C93 69 91 104 102 128C107 139 119 145 132 147L135 136C117 130 110 113 111 96C110 79 111 65 117 54Z M194 52C207 69 209 104 198 128C193 139 181 145 168 147L165 136C183 130 190 113 189 96C190 79 189 65 183 54Z';
const RIM = 'M109 64C106 39 123 23 149 23C176 21 195 38 191 64';

export function posterHatTransform(face: PosterSettings = {}): string {
  const scale = bounded(face.hatScale, 100, 55, 165) / 100;
  const width = bounded(face.hatWidth, 100, 55, 165) / 100;
  const rotation = bounded(face.hatRotation, 0, 0, 360);
  return `translate(150 44) scale(${face.hatMirrored ? -1 : 1} 1) rotate(${rotation}) scale(${scale * width} ${scale}) translate(-150 -44)`;
}

/* ── 1. Снуд сетка ── */
function NetSnood({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || '#382d27';
  const ribbon = face.posterRibbonColor || face.ribbonColor || '#bda175';
  const hair = face.posterHairColor || 'var(--hair, #4a3222)';
  const spacing = bounded(face.posterSnoodSpacing, 100, 70, 140) / 100 * 9;
  const opacity = bounded(face.posterSnoodOpacity, 92, 20, 100) / 100;
  const width = item.kind === 'ribbon' ? 2.1 : item.kind === 'chenille' ? 2.35 : 0.85;
  const d = layer === 'back' ? BAG : SIDES;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-bag`}><path d={d} /></clipPath>
        <pattern id={`${uid}-net`} width={spacing} height={spacing * 1.4} patternUnits="userSpaceOnUse">
          <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
          {item.kind === 'cord' && <circle cx={spacing / 2} cy="0" r="1.15" fill={color} />}
          {item.kind === 'ribbon' && <path d={`M${-spacing / 2 + 0.35} 0L${spacing / 2 + 0.35} ${spacing * 1.4}M${spacing / 2 + 0.35} 0L${spacing * 1.5 + 0.35} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.48)} strokeWidth="0.45" opacity="0.7" />}
          {item.kind === 'chenille' && <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.24)} strokeWidth="3.8" strokeDasharray="0.25 1.25" opacity="0.5" />}
        </pattern>
        <linearGradient id={`${uid}-bag-shade`} x1="0%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(hair, 0.08)} />
          <stop offset="1" stopColor={tone(hair, -0.35)} />
        </linearGradient>
      </defs>
      {layer === 'back' && <path d={BAG} fill={`url(#${uid}-bag-shade)`} />}
      <g clipPath={`url(#${uid}-bag)`}>
        {layer === 'back' && Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${102 + i * 8} 41C${90 + i * 10} 80 ${95 + i * 9} 112 ${126 + i * 4} 147`} stroke={tone(hair, -0.5)} strokeWidth="0.45" fill="none" opacity="0.5" />
        ))}
        <path d={d} fill={`url(#${uid}-net)`} opacity={opacity} />
      </g>
      <path d={d} fill="none" stroke={color} strokeWidth={item.kind === 'chenille' ? 2 : 1.2} opacity={opacity} />
      {layer === 'front' && (
        <g>
          <path d={RIM} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
          <path d={RIM} fill="none" stroke={tone(color, 0.32)} strokeWidth="0.55" />
          <g transform="translate(111 54) rotate(-25)">
            <path d="M0 0C-13 -10 -14 7 0 2C13 -10 15 7 0 2Z" fill={ribbon} stroke={tone(ribbon, -0.3)} strokeWidth="0.55" />
            <path d="M-1 2Q-7 10 -6 15M1 2Q8 8 6 13" fill="none" stroke={ribbon} strokeWidth="2.8" />
            <ellipse rx="2" ry="3" fill={tone(ribbon, -0.2)} />
          </g>
        </g>
      )}
    </g>
  );
}

/* ── 2. Атласные петли Инфанты ── */
function SatinLoops({ layer, color, uid }: { layer: Layer; color: string; uid: string }) {
  const rings = Array.from({ length: layer === 'back' ? 6 : 4 }, (_, i) => {
    const x = layer === 'back' ? 99 + (i % 2) * 7 : 111 + (i % 2) * 4;
    const y = 41 + i * 11;
    const h = 26 - i * 1.4;
    return { x, y, h, rotation: -8 + i * 3 };
  });
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-satin`} x1="0%" y1="0%" x2="100%" y2="30%">
          <stop offset="0" stopColor={tone(color, -0.42)} /><stop offset="0.4" stopColor={color} /><stop offset="0.56" stopColor={tone(color, 0.48)} /><stop offset="0.78" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.45)} />
        </linearGradient>
      </defs>
      {[false, true].map((mirror) => (
        <g key={String(mirror)} transform={mirror ? 'translate(300 0) scale(-1 1)' : undefined}>
          {rings.map(({ x, y, h, rotation }, i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rotation})`}>
              <path d={`M0 0C-8 3 -8 ${h - 1} -2 ${h}C5 ${h + 2} 7 6 0 0ZM-0.4 5C3 8 2 ${h - 3} -1.5 ${h - 4}C-5 ${h - 5} -4 9 -0.4 5Z`} fill={`url(#${uid}-satin)`} fillRule="evenodd" stroke={tone(color, -0.4)} strokeWidth="0.22" />
              <path d={`M-2 3C-7 8 -6 ${h - 4} -2 ${h - 1}`} fill="none" stroke={tone(color, 0.58)} strokeWidth="0.48" opacity="0.75" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/* ── Текстура каракуля (Persian lamb / astrakhan) ── */
function AstrakhanDef({ uid, color }: { uid: string; color: string }) {
  return (
    <defs>
      <pattern id={`${uid}-karakul`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M1 3C1.5 1.5 3 1.5 3.5 3C4 4.5 5.5 4.5 5 2.5" fill="none" stroke={tone(color, 0.28)} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M0.5 4.5C1 5.5 2.5 5.5 3 4.5" fill="none" stroke={tone(color, -0.32)} strokeWidth="0.5" strokeLinecap="round" />
      </pattern>
    </defs>
  );
}

/* ── 3. Bruyère 1939: «Burnt Toast» соломенная канотье ── */
function SailorHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="50" rx="66" ry="11" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
        <path d="M112 46C114 24 130 14 150 14C170 14 186 24 188 46Z" fill={tone(color, -0.35)} />
      </g>
    );
  }
  return (
    <g transform="translate(-4 -2) rotate(-5 150 48)">
      <defs>
        <linearGradient id={`${uid}-straw`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.32)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#1b1816" />
        </pattern>
      </defs>

      {/* Поля канотье с текстурой соломенных кругов */}
      <ellipse cx="150" cy="52" rx="72" ry="14" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="69" ry="11" fill="none" stroke={tone(color, -0.2)} strokeWidth="0.6" strokeDasharray="3 2" />
      <ellipse cx="150" cy="48" rx="65" ry="9" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.6" />

      {/* Плоская цилиндрическая тулья */}
      <path d="M116 48C116 22 130 12 150 12C170 12 184 22 184 48C184 56 168 60 150 60C132 60 116 56 116 48Z" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.48)} strokeWidth="0.85" strokeLinejoin="round" />
      <path d="M120 34C134 18 166 18 180 34C166 26 134 26 120 34Z" fill={tone(color, 0.35)} opacity="0.65" />

      {/* Трёхцветная шёлковая лента (синий, белый, красный) */}
      <path d="M116 46C132 55 168 55 184 46L184 52C168 61 132 61 116 52Z" fill="#203a6b" />
      <path d="M116 48C132 57 168 57 184 48L184 51C168 60 132 60 116 51Z" fill="#f7f4ec" />
      <path d="M116 50C132 59 168 59 184 50L184 52C168 61 132 61 116 52Z" fill="#9c242c" />

      {/* Огромный бант в горошек на левой стороне тульи */}
      <g transform="translate(112 36) rotate(-22)">
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C10 16 0 8 0 0Z" fill={accent} stroke="#2b2522" strokeWidth="0.6" />
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C-10 16 0 8 0 0Z" fill={`url(#${uid}-dots)`} opacity="0.85" />
        <ellipse rx="3.5" ry="4.5" fill="#1b1816" />
      </g>
    </g>
  );
}

/* ── 4. 1938: Ток из каракуля с вимплом-вуалью ── */
function PersianToqueWithWimple({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Задняя часть толка */}
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={color} />
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={`url(#${uid}-karakul)`} />

        {/* Пышный жоржетовый вимпл, обнимающий затылок и плечи */}
        <path d="M106 48C94 76 92 116 104 150C116 162 184 162 196 150C208 116 206 76 194 48Z" fill={tone(color, 0.08)} opacity="0.94" stroke={tone(color, -0.35)} strokeWidth="0.6" />
        {/* Вертикальные драпировочные складки */}
        {[-36, -24, -12, 0, 12, 24, 36].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.15} 90 ${150 + dx * 1.25} 128 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.32)} strokeWidth="1.2" opacity="0.6" />
        ))}
      </g>
    );
  }

  return (
    <g>
      <AstrakhanDef uid={uid} color={color} />
      {/* Маленький плотный ток на макушке */}
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={`url(#${uid}-karakul)`} />
      <path d="M126 30C136 18 164 18 174 30C164 24 136 24 126 30Z" fill={tone(color, 0.35)} opacity="0.4" />

      {/* Драпированные края вимпла, обрамляющие щёки и шею спереди */}
      <path d="M108 50C98 74 96 106 106 136C112 144 126 142 128 132C120 114 118 84 122 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />
      <path d="M192 50C202 74 204 106 194 136C188 144 174 142 172 132C180 114 182 84 178 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />

      {/* Складки ткани вимпла вокруг лица */}
      <path d="M112 56C106 82 108 112 118 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
      <path d="M188 56C194 82 192 112 182 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
    </g>
  );
}

/* ── 5. Schiaparelli 1938: «Doll's Hat» с пером и розой-капустой ── */
function DollsHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Бархатная лента вокруг затылка */}
        <path d="M118 64C120 44 134 36 150 36C166 36 180 44 182 64" fill="none" stroke={tone(color, -0.4)} strokeWidth="3.2" strokeLinecap="round" />
        {/* Страусиное перо, уходящее назад */}
        <path d="M142 22C140 -2 152 -18 168 -24C158 -16 150 0 152 20" fill={tone(color, -0.3)} opacity="0.8" />
      </g>
    );
  }

  return (
    <g transform="translate(-8 -4) rotate(-14 150 38)">
      <defs>
        <linearGradient id={`${uid}-doll-felt`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.28)} /><stop offset="1" stopColor={tone(color, -0.4)} />
        </linearGradient>
      </defs>

      {/* Длинное изогнутое страусиное перо, рвущееся вверх-назад */}
      <g transform="translate(136 16) rotate(-28)">
        <path d="M0 0C-4 -20 6 -42 22 -54C12 -38 6 -16 0 0Z" fill={tone(color, 0.1)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
        <path d="M0 0C-4 -20 6 -42 22 -54" fill="none" stroke={tone(color, 0.45)} strokeWidth="0.9" strokeLinecap="round" />
        {/* Бородки страусиного пера */}
        {[-12, -22, -32, -42].map((y, i) => (
          <path key={i} d={`M${i * 3} ${y}Q${i * 4 - 8} ${y - 4} ${i * 5 - 12} ${y + 2}`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.7" />
        ))}
      </g>

      {/* Крошечная кукольная шапочка-таблетка */}
      <ellipse cx="150" cy="42" rx="22" ry="7" fill={tone(color, -0.2)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
      <path d="M130 40C130 24 138 16 150 16C162 16 170 24 170 40C170 46 160 50 150 50C140 50 130 46 130 40Z" fill={`url(#${uid}-doll-felt)`} stroke={tone(color, -0.5)} strokeWidth="0.75" />

      {/* Огромная пышная роза-капуста (pink cabbage rose) */}
      <g transform="translate(164 28)">
        <circle r="9" fill={accent} stroke={tone(accent, -0.35)} strokeWidth="0.6" />
        <circle r="6.2" fill={tone(accent, 0.2)} />
        <circle r="3.8" fill={tone(accent, -0.15)} />
        <circle r="1.6" fill="#fff" opacity="0.7" />
        <path d="M-6 0C-4 -5 4 -5 6 0C4 5 -4 5 -6 0Z" fill="none" stroke={tone(accent, -0.3)} strokeWidth="0.6" />
      </g>

      {/* Бархатная лента, завязывающаяся под подбородком */}
      <path d="M136 46C130 68 132 94 144 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M164 46C170 68 168 94 156 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      {/* Бант под подбородком */}
      <g transform="translate(150 114)">
        <path d="M0 0C-10 -8 -16 2 -10 8C-4 12 0 4 0 0ZM0 0C10 -8 16 2 10 8C4 12 0 4 0 0Z" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.5" />
        <circle r="2" fill={tone(color, -0.5)} />
        <path d="M-2 4L-8 18M2 4L8 18" stroke={tone(color, -0.35)} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 6. Rose Valois 1939: Казачья папаха с золотым ожерельем ── */
function CossackCap({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Высокий скошенный купол папахи назад */}
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={color} />
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={`url(#${uid}-karakul)`} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -2) rotate(4 150 36)">
      <AstrakhanDef uid={uid} color={color} />
      {/* Высокая папаха с асимметричным заломом на правый бок */}
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={color} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={`url(#${uid}-karakul)`} />

      {/* Залом по диагонали каракуля */}
      <path d="M128 22C142 16 164 12 178 26" fill="none" stroke={tone(color, -0.45)} strokeWidth="2.4" opacity="0.8" />
      <path d="M126 34C140 22 168 20 178 36" fill="none" stroke={tone(color, 0.35)} strokeWidth="1.2" opacity="0.5" />

      {/* Золотое бусинное ожерелье на шее (Rose Valois) */}
      <g transform="translate(0 76)">
        <path d="M124 38C136 50 164 50 176 38" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M122 44C136 58 164 58 178 44" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const t = i / 7;
          const x = 124 + t * 52;
          const y = 38 + Math.sin(t * Math.PI) * 11;
          return <circle key={i} cx={x} cy={y} r="2.2" fill={tone(accent, 0.2)} stroke={tone(accent, -0.3)} strokeWidth="0.4" />;
        })}
      </g>
    </g>
  );
}

/* ── 7. Suzy 1939: Красный плюшевый ток с пером-шпагой (quill) ── */
function PlushToqueQuill({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M122 46C120 26 132 14 150 14C168 14 180 26 178 46Z" fill={tone(color, -0.3)} />
        {/* Задняя часть длинного пера-шпаги */}
        <path d="M128 14C122 -18 116 -46 108 -68" fill="none" stroke={tone(accent, -0.3)} strokeWidth="4.5" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform="translate(-4 -2) rotate(-8 150 40)">
      <defs>
        <linearGradient id={`${uid}-plush-red`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Огромное прямое перо-шпага (black quill), рвущееся высоко вверх */}
      <g transform="translate(126 16)">
        <path d="M0 0C-6 -32 -14 -64 -22 -92C-10 -74 -4 -38 0 0Z" fill={accent} stroke={tone(accent, 0.4)} strokeWidth="0.6" />
        <path d="M0 0C-6 -32 -14 -64 -22 -92" fill="none" stroke={tone(accent, 0.65)} strokeWidth="1.2" strokeLinecap="round" />
        {/* Текстура бороздок пера */}
        {[-20, -40, -60, -80].map((y, i) => (
          <path key={i} d={`M${i * -2.5} ${y}L${i * -2.5 - 6} ${y - 4}`} stroke={tone(accent, 0.3)} strokeWidth="0.7" opacity="0.6" />
        ))}
      </g>

      {/* Плюшевый красный ток, надетый на лоб */}
      <path d="M122 48C120 26 132 12 150 12C168 12 180 26 178 48C176 58 164 62 150 62C136 62 124 58 122 48Z" fill={`url(#${uid}-plush-red)`} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <path d="M128 34C138 22 162 22 172 34C162 28 138 28 128 34Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Чёрные шёлковые кручёные шнуры и висячие кисти */}
      <path d="M124 44C138 52 162 52 176 44" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="3 1.5" />
      <g transform="translate(174 46)">
        <circle r="3" fill={accent} />
        <path d="M-1 3L-4 22M2 3L4 22M0 3L0 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="22" r="1.8" fill={tone(accent, 0.3)} />
      </g>

      {/* Большой шёлковый бант на шее */}
      <g transform="translate(150 118)">
        <path d="M0 0C-16 -12 -28 4 -16 12C-6 16 0 6 0 0ZM0 0C16 -12 28 4 16 12C6 16 0 6 0 0Z" fill="#f4efdf" stroke="#b0a894" strokeWidth="0.6" />
        <ellipse rx="3.5" ry="4" fill="#ddd5c2" />
        <path d="M-3 6L-12 28M3 6L12 28" stroke="#f4efdf" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 8. Rose Valois 1939: Жёсткий красный цилиндр ── */
function TopperRoseValois({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="48" rx="54" ry="10" fill={tone(color, -0.35)} />
        <path d="M126 46C124 16 134 0 150 0C166 0 176 16 174 46Z" fill={tone(color, -0.3)} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -4) rotate(6 150 44)">
      <defs>
        <linearGradient id={`${uid}-topper-red`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Загнутые вверх поля */}
      <ellipse cx="150" cy="52" rx="58" ry="11" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="56" ry="8" fill={tone(color, 0.15)} opacity="0.4" />

      {/* Высокая расширяющаяся кверху тулья (flared top hat) */}
      <path d="M126 50C124 20 132 -2 150 -2C168 -2 176 20 174 50C174 58 162 60 150 60C138 60 126 58 126 50Z" fill={`url(#${uid}-topper-red)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 22C138 6 162 6 170 22C162 14 138 14 130 22Z" fill={tone(color, 0.4)} opacity="0.6" />

      {/* Чёрная репсовая лента (grosgrain ribbon) с широким бантом */}
      <path d="M126 46C138 52 162 52 174 46L174 52C162 58 138 58 126 52Z" fill={accent} />
      <path d="M126 46C138 52 162 52 174 46" fill="none" stroke={tone(accent, 0.4)} strokeWidth="0.6" />

      <g transform="translate(172 48) rotate(8)">
        <path d="M0 0C10 -10 18 -4 14 6C10 12 2 6 0 0Z" fill={accent} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <path d="M0 0C-6 -8 -12 -2 -8 6C-5 10 0 5 0 0Z" fill={tone(accent, 0.15)} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <circle r="2.2" fill={tone(accent, 0.2)} />
      </g>
    </g>
  );
}

/* ── 9. 1937: Шёлковый самозавязывающийся тюрбан ── */
function SelfTiedTurban({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M116 52C114 30 128 16 150 16C172 16 186 30 184 52C180 62 166 66 150 66C134 66 120 62 116 52Z" fill={tone(color, -0.28)} />
        {/* Центральный задний шов по выкройке с постера */}
        <path d="M150 16L150 66" stroke={tone(color, -0.45)} strokeWidth="1.2" strokeDasharray="2 1.5" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-turban-silk`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
      </defs>

      {/* Мягкая основа тюрбана, полностью закрывающая линию роста волос */}
      <path d="M114 56C112 30 128 14 150 14C172 14 188 30 186 56C182 68 166 70 150 70C134 70 118 68 114 56Z" fill={`url(#${uid}-turban-silk)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />

      {/* Диагональные концентрические складки ткани */}
      <path d="M116 52C132 38 156 34 180 40C186 46 184 54 182 58C166 50 144 48 126 54C118 56 116 54 116 52Z" fill={tone(color, -0.2)} opacity="0.8" />
      <path d="M118 44C134 32 162 32 182 44C172 36 138 36 122 44Z" fill={tone(color, 0.3)} opacity="0.6" />
      <path d="M116 60C136 50 164 50 184 60" fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.65" />
      <path d="M120 38C138 24 162 24 180 38" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.8" opacity="0.7" />

      {/* Центральный передний узел-перехлёст */}
      <g transform="translate(150 36)">
        <path d="M0 0C-12 -12 -22 -4 -16 8C-10 14 -2 8 0 0ZM0 0C12 -12 22 -4 16 8C10 14 2 8 0 0Z" fill={tone(color, 0.12)} stroke={tone(color, -0.38)} strokeWidth="0.6" />
        <ellipse rx="4.5" ry="3.5" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.5" />
        <circle r="1.5" fill={accent} />
      </g>
    </g>
  );
}

/* ── 10. Patou 1939: Чёрный бархатный шако с петушиными перьями ── */
function ShakoPatou({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M124 50C122 22 134 6 150 6C166 6 178 22 176 50Z" fill={tone(color, -0.35)} />
        {/* Перья, идущие назад */}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${140 + i * 7} 8C${138 + i * 6} -14 ${144 + i * 8} -32 ${148 + i * 9} -46`} fill="none" stroke={tone(color, 0.15)} strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
        ))}
      </g>
    );
  }

  return (
    <g transform="translate(4 -4) rotate(8 150 42)">
      <defs>
        <linearGradient id={`${uid}-shako-velvet`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.3)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
        </linearGradient>
      </defs>

      {/* Высокий конический бархатный корпус шако */}
      <path d="M126 54C124 22 136 6 150 6C164 6 176 22 174 54C172 64 160 68 150 68C140 68 128 64 126 54Z" fill={`url(#${uid}-shako-velvet)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 30C138 14 162 14 170 30C162 22 138 22 130 30Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Пышный фонтан изогнутых петушиных перьев, рвущихся вверх-вперёд */}
      <g transform="translate(144 14)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const spread = (i - 3) * 6;
          return (
            <g key={i}>
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={tone(color, 0.45)} strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
            </g>
          );
        })}
      </g>

      {/* Золотая эмблема спереди */}
      <circle cx="150" cy="38" r="3.6" fill="#d4af37" stroke="#8a6e2e" strokeWidth="0.5" />
      <circle cx="150" cy="38" r="1.5" fill="#fff" opacity="0.8" />
    </g>
  );
}

/* ── 11. Suzy 1939: Красный бархатный снуд-капюшон ── */
function VelvetSnoodHood({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <defs>
          <linearGradient id={`${uid}-velvet-drape`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stopColor={tone(color, 0.15)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
          </linearGradient>
        </defs>

        {/* Обширный драпированный капюшон-снуд, падающий вокруг шеи и плеч */}
        <path d="M102 46C90 74 88 116 98 148C110 164 190 164 202 148C212 116 210 74 198 46C186 32 114 32 102 46Z" fill={`url(#${uid}-velvet-drape)`} stroke={tone(color, -0.45)} strokeWidth="0.75" />

        {/* Богатые складки бархатной ткани */}
        {[-38, -26, -14, 0, 14, 26, 38].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 48C${150 + dx * 1.15} 84 ${150 + dx * 1.25} 120 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.7" />
        ))}
        {[-32, -18, 0, 18, 32].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.1} 86 ${150 + dx * 1.2} 122 ${150 + dx * 1.05} 150`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.55" />
        ))}
      </g>
    );
  }

  return (
    <g>
      {/* Боковые драпировки бархата спереди */}
      <path d="M104 48C94 72 94 104 102 134C110 142 122 140 124 130C118 110 116 80 120 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />
      <path d="M196 48C206 72 206 104 198 134C190 142 178 140 176 130C182 110 184 80 180 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />

      {/* Большой структурированный бархатный бант на макушке головы */}
      <g transform="translate(150 28)">
        <path d="M0 0C-18 -16 -28 -2 -18 8C-8 14 0 6 0 0ZM0 0C18 -16 28 -2 18 8C8 14 0 6 0 0Z" fill={accent} stroke={tone(accent, -0.45)} strokeWidth="0.75" />
        <path d="M0 0C-16 -12 -22 -2 -16 6ZM0 0C16 -12 22 -2 16 6" fill="none" stroke={tone(accent, 0.35)} strokeWidth="0.8" />
        <ellipse rx="4" ry="4.5" fill={tone(accent, -0.25)} />
      </g>
    </g>
  );
}

/* ── 12. Лётные очки-гогглы, посаженные на лоб (без верхней дуги, с тонкими ушками) ── */
function AviatorGoggles({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Боковой ремень за головой */}
        <path d="M104 38C96 44 94 56 98 68L106 65C102 54 104 46 112 41Z" fill={tone(accent, -0.4)} />
        <path d="M196 38C204 44 206 56 202 68L194 65C198 54 196 46 188 41Z" fill={tone(accent, -0.4)} />
      </g>
    );
  }

  const lens = (
    <>
      {/* Мягкая прокладка / корпус очков */}
      <ellipse rx="22" ry="15" fill={tone(color, -0.15)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <ellipse rx="20" ry="13.2" fill={tone(color, 0.15)} />
      {/* Металлический ободок и выпуклое стекло */}
      <ellipse rx="18.2" ry="11.8" fill={`url(#${uid}-glass)`} stroke={tone(color, -0.42)} strokeWidth="1.2" />
      {/* Блики и отражения */}
      <path d="M-14 -4C-10 -9.5 -2 -10.5 5 -7.5C-2 -7.5 -8.5 -4 -12 1.5Z" fill="#ffffff" opacity="0.65" />
      <path d="M3 5C7.5 2.5 11 -0.5 13 -3.5C13 1 9 4.8 4 6.5Z" fill="#ffffff" opacity="0.25" />
      <ellipse rx="18.2" ry="11.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.75" />
    </>
  );

  return (
    <g transform="translate(0 -2)">
      <defs>
        <linearGradient id={`${uid}-glass`} x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0" stopColor="#f7faf8" />
          <stop offset="0.28" stopColor="#d2dddb" />
          <stop offset="0.7" stopColor="#879997" />
          <stop offset="1" stopColor="#4f5e5c" />
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor={tone(accent, -0.3)} />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor={tone(accent, -0.3)} />
        </linearGradient>
      </defs>

      {/* Тонкие эластичные боковые ремешки, уходящие за виски (без дуги над макушкой!) */}
      <path d="M106 39C102 39 98 42 96 46L98 49C101 46 104 43 108 43Z" fill={`url(#${uid}-strap)`} />
      <path d="M194 39C198 39 202 42 204 46L202 49C199 46 196 43 192 43Z" fill={`url(#${uid}-strap)`} />

      {/* Тонкие металлические шарнирные ушки по бокам очков */}
      <g transform="translate(106 41)">
        <rect x="-1" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>
      <g transform="translate(194 41)">
        <rect x="-2" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="-0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>

      {/* Окуляры очков (левый и правый) */}
      <g transform="translate(128 40) rotate(-6)">{lens}</g>
      <g transform="translate(172 40) rotate(6)">{lens}</g>

      {/* Тонкая металлическая переносица с шарниром/винтом */}
      <path d="M144 40C147 37.5 153 37.5 156 40C153 42.5 147 42.5 144 40Z" fill={tone(color, 0.35)} stroke={tone(color, -0.45)} strokeWidth="0.5" />
      <circle cx="150" cy="40" r="1.5" fill={tone(color, -0.1)} />
      <circle cx="150" cy="40" r="0.6" fill="#ffffff" opacity="0.8" />
    </g>
  );
}

/* ── 13. Карбункл: гранёный камень на лбу ── */
function ForeheadCarbuncle({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') return null;
  return (
    <g transform="translate(150 57)">
      <defs>
        <radialGradient id={`${uid}-gem`} cx="40%" cy="32%" r="72%">
          <stop offset="0" stopColor={tone(color, 0.6)} />
          <stop offset="0.4" stopColor={tone(color, 0.12)} />
          <stop offset="0.78" stopColor={color} />
          <stop offset="1" stopColor={tone(color, -0.5)} />
        </radialGradient>
      </defs>

      {/* Металлическая оправа */}
      <ellipse rx="14.6" ry="9.6" fill={tone(accent, -0.28)} />
      <ellipse rx="13.6" ry="8.8" fill={tone(accent, 0.15)} />
      <ellipse rx="12.8" ry="8.1" fill={tone(accent, -0.35)} />

      {/* Сам камень */}
      <ellipse rx="12.2" ry="7.5" fill={`url(#${uid}-gem)`} stroke={tone(color, -0.55)} strokeWidth="0.6" />

      {/* Грани огранки */}
      <path d="M-12.2 0Q-6 -4.4 0 -4.9Q6 -4.4 12.2 0Q6 4.4 0 4.9Q-6 4.4 -12.2 0Z" fill="none" stroke={tone(color, 0.35)} strokeWidth="0.55" opacity="0.65" />
      <path d="M-6.6 -2.6L-2.6 0L-6.6 2.6M6.6 -2.6L2.6 0L6.6 2.6" fill="none" stroke={tone(color, -0.4)} strokeWidth="0.5" opacity="0.72" />
      <path d="M0 -4.9L0 4.9" stroke={tone(color, -0.35)} strokeWidth="0.4" opacity="0.4" />

      {/* Блики */}
      <ellipse cx="-4.2" cy="-2.7" rx="3.7" ry="1.7" fill="#ffffff" opacity="0.6" transform="rotate(-16 -4.2 -2.7)" />
      <ellipse cx="4.6" cy="2.5" rx="2.1" ry="0.95" fill="#ffffff" opacity="0.26" />

      {/* Крапаны оправы */}
      {[-11.5, 0, 11.5].map((x, i) => (
        <circle key={i} cx={x} cy={i === 1 ? -7.9 : 0} r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
      ))}
      <circle cx="0" cy="7.9" r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
    </g>
  );
}

/* ── Диспетчер отрисовки головных уборов ── */
function StructuredHat({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || item.color || '#1c1917';
  const accent = face.posterRibbonColor || face.ribbonColor || item.accent || '#c9a24b';
  switch (item.kind) {
    case 'sailor': return <SailorHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'toque': return <PersianToqueWithWimple color={color} layer={layer} uid={uid} />;
    case 'doll': return <DollsHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'cossack': return <CossackCap color={color} accent={accent} layer={layer} uid={uid} />;
    case 'plush': return <PlushToqueQuill color={color} accent={accent} layer={layer} uid={uid} />;
    case 'topper': return <TopperRoseValois color={color} accent={accent} layer={layer} uid={uid} />;
    case 'turban': return <SelfTiedTurban color={color} accent={accent} layer={layer} uid={uid} />;
    case 'shako': return <ShakoPatou color={color} layer={layer} uid={uid} />;
    case 'snood-hood': return <VelvetSnoodHood color={color} accent={accent} layer={layer} uid={uid} />;
    case 'goggles': return <AviatorGoggles color={color} accent={accent} layer={layer} uid={uid} />;
    case 'forehead-gem': return <ForeheadCarbuncle color={color} accent={accent} layer={layer} uid={uid} />;
    default: return null;
  }
}

export const PosterHeadwear = memo(function PosterHeadwear({ id, layer = 'front', face = {}, applyFit = false }: {
  id: string; layer?: Layer; face?: PosterSettings; applyFit?: boolean;
}) {
  const uid = `poster-hat-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const item = POSTER_HEADWEAR.find((entry) => entry.id === id);
  if (!item) return null;
  const ribbon = face.posterRibbonColor || face.ribbonColor || item.accent || '#bda175';
  const transform = applyFit ? posterHatTransform(face) : undefined;
  const snood = item.kind === 'cord' || item.kind === 'ribbon' || item.kind === 'chenille';
  return (
    <g data-poster-headwear={id} data-layer={layer} transform={transform}>
      {item.kind === 'satin-loops' && <SatinLoops layer={layer} uid={uid} color={ribbon} />}
      {snood && <NetSnood item={item} layer={layer} face={face} uid={uid} />}
      {!snood && item.kind !== 'satin-loops' && <StructuredHat item={item} layer={layer} face={face} uid={uid} />}
    </g>
  );
});

```

## src/features/poster1930/items.tsx

```tsx
import type { ReactNode } from 'react';
import { POSTER_HAIR } from './designs';
import { PosterHair } from './PosterHair';
import { POSTER_HEADWEAR, PosterHeadwear } from './PosterHeadwear';
import type { BBox, PosterSettings } from './types';

interface RenderContext { face?: PosterSettings }

// Structural subset of the handoff's Item. Agent mode should verify this with
// `satisfies Item[]` in the real repository, without replacing its Item type.
export interface PosterItem {
  id: string;
  name: string;
  category: 'hair' | 'headgear' | 'accessories';
  fit: 'f';
  z: number;
  bbox: BBox;
  back: (gender: unknown, rig?: unknown, ctx?: RenderContext) => ReactNode;
  render: (gender: unknown, rig?: unknown, ctx?: RenderContext) => ReactNode;
}

export const POSTER_ITEMS: PosterItem[] = [
  ...POSTER_HAIR.map((design): PosterItem => ({
    id: design.id, name: `${design.name} (${design.year})`, category: 'hair', fit: 'f', z: 60, bbox: [...design.bbox],
    back: (_gender, _rig, ctx) => <PosterHair styleId={design.id} layer="back" face={ctx?.face} />,
    render: (_gender, _rig, ctx) => <PosterHair styleId={design.id} layer="front" face={ctx?.face} />,
  })),
  ...POSTER_HEADWEAR.map((item): PosterItem => ({
    id: item.id,
    name: `${item.name} (${item.year})`,
    category: item.category ?? 'headgear',
    fit: 'f',
    z: item.category === 'accessories' ? 75 : 70,
    bbox: [...item.bbox],
    back: (_gender, _rig, ctx) => <PosterHeadwear id={item.id} layer="back" face={ctx?.face} />,
    render: (_gender, _rig, ctx) => <PosterHeadwear id={item.id} layer="front" face={ctx?.face} />,
  })),
];

export function assertNoPosterCollisions(existing: ReadonlyArray<{ id: string }>): void {
  const ids = new Set(existing.map((item) => item.id));
  for (const item of POSTER_ITEMS) {
    if (ids.has(item.id)) throw new Error(`Poster item already registered: ${item.id}`);
    ids.add(item.id);
  }
}
```

## src/features/poster1930/checks.ts

```ts
import { POSTER_HAIR } from './designs';
import { mirrorCurl, resolvePosterCurl } from './engine';
import { POSTER_ITEMS } from './items';
import { POSTER_HEADWEAR, posterHatTransform } from './PosterHeadwear';

export interface PosterCheck { name: string; passed: boolean }

// These pure checks can run in the preview or a test runner in the real game.
// They do not replace screenshot tests or SVG export checks in a browser.
export function checkPosterCollection(): PosterCheck[] {
  const ids = POSTER_ITEMS.map((item) => item.id);
  const allCoils = POSTER_HAIR.flatMap((style) => [...style.front, ...style.back].flatMap((surface) => surface.coils ?? []));
  const badPath = (d: string) => !d || /NaN|Infinity|undefined/.test(d);
  return [
    { name: '16 причёсок и 15 уборов/аксессуаров', passed: POSTER_HAIR.length === 16 && POSTER_HEADWEAR.length === 15 && POSTER_ITEMS.length === 31 },
    { name: 'Нет свадебной фаты и нет дубля modern snood', passed: !POSTER_HEADWEAR.some((h) => /veil|bridal|фата/i.test(h.id + h.name)) && POSTER_HEADWEAR.filter((h) => h.kind === 'cord' || h.kind === 'ribbon' || h.kind === 'chenille').length === 3 },
    { name: 'Уникальные kind у шляп и аксессуаров', passed: ['sailor', 'doll', 'toque', 'cossack', 'plush', 'topper', 'turban', 'shako', 'snood-hood', 'goggles', 'forehead-gem'].every((k) => POSTER_HEADWEAR.some((h) => h.kind === k)) },
    { name: 'Косы-баранки: 48 звеньев вертикальных петель', passed: (() => {
      const coils = POSTER_HAIR.find((h) => h.id === 'hair-poster-1938-braided-coils');
      return !!coils && coils.front.filter((s) => /rotate/.test(s.transform ?? '')).length === 48;
    })() },
    { name: 'Уникальные новые ID без подмены старых', passed: new Set(ids).size === ids.length && ids.every((id) => /^(hair|headgear|acc)-poster-/.test(id)) },
    { name: 'Передний и задний слои у каждой причёски', passed: POSTER_HAIR.every((design) => design.front.length > 0 && design.back.length > 0) },
    { name: 'Конечные координаты на крайних настройках', passed: allCoils.every((spec) => [60, 100, 150].every((tight) => [70, 100, 140].every((volume) => {
      const result = resolvePosterCurl(spec, tight, volume);
      return [result.body, result.groove, result.shade, result.sheen, ...result.strands].every((d) => !badPath(d));
    }))) },
    { name: 'Зеркалирование локонов обратимо', passed: allCoils.every((spec) => {
      const twice = mirrorCurl(mirrorCurl(spec));
      return Math.abs(twice.x - spec.x) < 1e-8 && twice.y === spec.y && (twice.rotation ?? 0) === (spec.rotation ?? 0) && !!twice.mirrored === !!spec.mirrored;
    }) },
    { name: 'Масштаб шапки действует по обеим осям', passed: posterHatTransform({ hatScale: 125, hatWidth: 120 }).includes('scale(1.5 1.25)') },
    { name: 'Повторная генерация не меняет рисунок', passed: allCoils.every((spec) => JSON.stringify(resolvePosterCurl(spec)) === JSON.stringify(resolvePosterCurl(spec))) },
    { name: 'Миниатюры имеют ненулевой bbox', passed: POSTER_ITEMS.every((item) => item.bbox.every(Number.isFinite) && item.bbox[2] > 0 && item.bbox[3] > 0) },
  ];
}
```

## src/components/HeadStubble.tsx

```tsx
import { memo, useId, useMemo } from 'react';

/**
 * ============================================================================
 * HeadStubble.tsx — Автономный компонент стерни для головы (Face.tsx / Head.tsx)
 * ============================================================================
 * 
 * ВАЖНО ДЛЯ AGENT MODE:
 * 1. Этот компонент вставляется в Face.tsx (или Head.tsx) СРАЗУ ПОСЛЕ отрисовки
 *    кожи головы (<path d={headPath} fill={skin} />) и ДО бровей/глаз/волос!
 * 2. НЕ ВСТАВЛЯТЬ в Hair.tsx! Стерня — это часть головы/кожи, а не парик.
 * 3. Он автоматически обрезается по контуру черепа (headPath) и рисует короткие
 *    тонкие волоски на висках и затылке.
 */

export type StubblePreset =
  | 'heydrich'       // Высокий пробор: ровная стерня на висках от брови до уха
  | 'undercut'       // Выбритые виски с обеих сторон (высокий андеркат)
  | 'clipper-crop'   // Армейский ёжик: стерня по всем бокам и затылку
  | 'himmler'        // Редкая низкая стерня около ушей
  | 'temples'        // Классическая лёгкая окантовка на висках
  | 'custom';        // Ручная настройка зон

export interface StubbleZone {
  side: 'left' | 'right' | 'nape' | 'both-temples';
  /** Верхняя граница в координатах лица (по умолчанию 52..62) */
  topY: number;
  /** Нижняя граница (по умолчанию 82..94) */
  bottomY: number;
  /** Отступ от центра лица по X (по умолчанию 28..42) */
  spreadX: number;
  /** Густота: 0..1 (по умолчанию 0.5) */
  density: number;
  /** Затухание: 'down' (редеет к шее), 'up' (редеет вверх), 'none' */
  fade?: 'down' | 'up' | 'none';
}

export interface HeadStubbleProps {
  /** SVG-путь контура головы, по которому обрезается стерня */
  headPath?: string;
  /** Готовый пресет стрижки */
  preset?: StubblePreset;
  /** Пользовательские зоны, если preset = 'custom' */
  zones?: StubbleZone[];
  /** Цвет волос (поддерживает hex, rgb или CSS-переменную var(--hair)) */
  hairColor?: string;
  /** Общий множитель густоты (0..150%, по умолчанию 100) */
  density?: number;
  /** Множитель длины волосков (50..175%, по умолчанию 100) */
  length?: number;
  /** Скрывать стерню при density = 0 */
  disabled?: boolean;
}

const PRESET_ZONES: Record<StubblePreset, StubbleZone[]> = {
  heydrich: [
    { side: 'left', topY: 54, bottomY: 86, spreadX: 38, density: 0.55, fade: 'down' },
    { side: 'right', topY: 56, bottomY: 86, spreadX: 38, density: 0.5, fade: 'down' },
    { side: 'nape', topY: 62, bottomY: 88, spreadX: 36, density: 0.5, fade: 'down' },
  ],
  undercut: [
    { side: 'left', topY: 50, bottomY: 88, spreadX: 40, density: 0.6, fade: 'down' },
    { side: 'right', topY: 50, bottomY: 88, spreadX: 40, density: 0.6, fade: 'down' },
    { side: 'nape', topY: 56, bottomY: 90, spreadX: 38, density: 0.55, fade: 'down' },
  ],
  'clipper-crop': [
    { side: 'left', topY: 58, bottomY: 90, spreadX: 40, density: 0.7, fade: 'none' },
    { side: 'right', topY: 58, bottomY: 90, spreadX: 40, density: 0.7, fade: 'none' },
    { side: 'nape', topY: 58, bottomY: 92, spreadX: 40, density: 0.7, fade: 'none' },
  ],
  himmler: [
    { side: 'left', topY: 62, bottomY: 86, spreadX: 36, density: 0.35, fade: 'down' },
    { side: 'right', topY: 62, bottomY: 86, spreadX: 36, density: 0.35, fade: 'down' },
    { side: 'nape', topY: 66, bottomY: 88, spreadX: 34, density: 0.35, fade: 'down' },
  ],
  temples: [
    { side: 'left', topY: 64, bottomY: 84, spreadX: 36, density: 0.4, fade: 'down' },
    { side: 'right', topY: 64, bottomY: 84, spreadX: 36, density: 0.4, fade: 'down' },
  ],
  custom: [],
};

// Детерминированный генератор псевдослучайных чисел
function pseudoRand(seed: number): number {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

interface GeneratedStroke {
  d: string;
  width: number;
  opacity: number;
}

interface RenderedZone {
  id: string;
  fillPath: string;
  fillOpacity: number;
  strokes: GeneratedStroke[];
}

// По умолчанию используется стандартный овал головы Atelier Linden (300x400)
const DEFAULT_HEAD_PATH = 'M114 72C111 50 126 33 150 33C174 33 189 50 187 72L185 93C183 111 168 124 150 130C132 124 117 111 115 93Z';

export const HeadStubble = memo(function HeadStubble({
  headPath = DEFAULT_HEAD_PATH,
  preset = 'heydrich',
  zones,
  hairColor = 'var(--hair, #3a2a1e)',
  density = 100,
  length = 100,
  disabled = false,
}: HeadStubbleProps) {
  const uid = `stubble-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const effectiveDensity = Math.max(0, Math.min(150, density)) / 100;
  const lengthScale = Math.max(0.5, Math.min(1.75, length / 100));

  const activeZones = useMemo(() => {
    if (zones && zones.length > 0) return zones;
    return PRESET_ZONES[preset] || PRESET_ZONES.heydrich;
  }, [preset, zones]);

  const renderedZones = useMemo((): RenderedZone[] => {
    if (disabled || effectiveDensity <= 0.02) return [];

    return activeZones.map((zone, zIdx) => {
      const isLeft = zone.side === 'left' || zone.side === 'both-temples';
      const isRight = zone.side === 'right' || zone.side === 'both-temples';
      const isNape = zone.side === 'nape';
      
      const strokes: GeneratedStroke[] = [];
      const topY = zone.topY;
      const botY = zone.bottomY;
      const height = botY - topY;
      const baseLength = 2.2 * lengthScale;

      // Ограничивающий полигон зоны стерни
      let fillPath = '';
      if (isLeft) {
        fillPath = `M111 ${topY}C113 ${topY - 2} 120 ${topY - 3} 128 ${topY}L130 ${botY}C122 ${botY + 3} 115 ${botY + 2} 112 ${botY - 2}Z`;
      } else if (isRight) {
        fillPath = `M189 ${topY}C187 ${topY - 2} 180 ${topY - 3} 172 ${topY}L170 ${botY}C178 ${botY + 3} 185 ${botY + 2} 188 ${botY - 2}Z`;
      } else if (isNape) {
        fillPath = `M118 ${topY}C130 ${topY - 2} 170 ${topY - 2} 182 ${topY}L184 ${botY}C170 ${botY + 4} 130 ${botY + 4} 116 ${botY}Z`;
      }

      const rows = Math.max(8, Math.round(height * 0.9));
      const cols = isNape ? 32 : 12;
      const zoneDensity = zone.density * effectiveDensity;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const seed = zIdx * 1000 + r * 37 + c * 17;
          const noise1 = pseudoRand(seed + 1);
          const noise2 = pseudoRand(seed + 2);
          const noise3 = pseudoRand(seed + 3);

          const tY = (r + 0.3 + noise1 * 0.4) / rows;
          const fadeMult = zone.fade === 'down'
            ? 1 - tY * 0.75
            : zone.fade === 'up'
              ? 0.25 + tY * 0.75
              : 1;

          // Пропускаем часть точек по плотности
          if (noise2 > zoneDensity * fadeMult * 1.3) continue;

          const y = topY + tY * height;
          let x = 150;

          if (isLeft) {
            const spread = 112 + (c / cols) * 16 + (noise3 - 0.5) * 2;
            x = spread;
          } else if (isRight) {
            const spread = 188 - (c / cols) * 16 + (noise3 - 0.5) * 2;
            x = spread;
          } else if (isNape) {
            const spread = 118 + (c / cols) * 64 + (noise3 - 0.5) * 3;
            x = spread;
          }

          // Генерируем короткую изогнутую линию волоска (Q-curve)
          const strokeLen = baseLength * (0.8 + noise1 * 0.4);
          const tiltX = isLeft ? (noise3 - 0.2) * 1.2 : isRight ? (0.2 - noise3) * 1.2 : (noise3 - 0.5) * 1.5;
          const endX = x + tiltX;
          const endY = y + strokeLen;
          const midX = x + tiltX * 0.4;
          const midY = y + strokeLen * 0.5;

          strokes.push({
            d: `M${x.toFixed(2)} ${y.toFixed(2)}Q${midX.toFixed(2)} ${midY.toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`,
            width: 0.32 + noise1 * 0.12,
            opacity: (0.45 + noise2 * 0.35) * fadeMult,
          });
        }
      }

      return {
        id: `${uid}-zone-${zIdx}`,
        fillPath,
        fillOpacity: Math.min(0.25, zone.density * effectiveDensity * 0.18),
        strokes,
      };
    });
  }, [activeZones, disabled, effectiveDensity, lengthScale, uid]);

  if (disabled || renderedZones.length === 0) return null;

  return (
    <g data-component="HeadStubble" className="head-stubble-layer" pointerEvents="none">
      <defs>
        {/* Маска, строго ограничивающая волоски контуром кожи головы */}
        <clipPath id={`${uid}-head-clip`} clipPathUnits="userSpaceOnUse">
          <path d={headPath} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-head-clip)`}>
        {renderedZones.map((zone) => (
          <g key={zone.id} data-zone={zone.id}>
            {/* Мягкая фоновая полупрозрачная растушёвка цвета волос на коже */}
            {zone.fillPath && (
              <path
                d={zone.fillPath}
                fill={hairColor}
                opacity={zone.fillOpacity}
              />
            )}
            {/* Тонкие изогнутые волоски стерни */}
            <g fill="none" stroke={hairColor} strokeLinecap="round">
              {zone.strokes.map((s, idx) => (
                <path
                  key={idx}
                  d={s.d}
                  strokeWidth={s.width}
                  opacity={s.opacity}
                />
              ))}
            </g>
          </g>
        ))}
      </g>
    </g>
  );
});
export default HeadStubble;

```
