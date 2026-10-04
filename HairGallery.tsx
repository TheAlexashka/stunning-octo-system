.hair-gallery {
  position: fixed;
  inset: 0;
  width: min(940px, calc(100vw - 24px));
  max-width: none;
  height: min(720px, calc(100dvh - 24px));
  max-height: none;
  margin: auto;
  padding: 0;
  border: 1px solid #8b7354;
  border-top: 3px solid #a0845b;
  background: linear-gradient(145deg, #33291f, #17120e);
  color: #e3d2b2;
  box-shadow: 0 25px 75px #000e, inset 0 0 40px #0004;
  overflow: hidden;
}

.hair-gallery::backdrop { background: #060503e3; backdrop-filter: blur(3px); }
.hair-gallery__header { display: flex; align-items: center; gap: 16px; min-height: 76px; padding: 14px 18px; border-bottom: 1px solid #574531; background: #211a14; }
.hair-gallery__header > div { flex: 1; min-width: 0; }
.hair-gallery__header span { color: #a99270; font-size: 9px; letter-spacing: 0.16em; }
.hair-gallery__header h2 { margin: 5px 0 0; color: #ead9ba; font-size: clamp(16px, 3vw, 24px); line-height: 1.2; letter-spacing: 0.08em; overflow-wrap: anywhere; }
.hair-gallery__close { display: grid; flex: 0 0 44px; place-items: center; width: 44px; height: 44px; padding: 0; cursor: pointer; }
.hair-gallery__body { display: grid; grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.4fr); height: calc(100% - 76px); min-height: 0; }
.hair-gallery__preview { display: flex; flex-direction: column; min-height: 0; gap: 12px; padding: 18px; border-right: 1px solid #574531; background: linear-gradient(180deg, #2d241c, #1c1611); }
.hair-gallery__portrait { flex: 1; min-height: 280px; overflow: hidden; border: 8px solid #201811; background: #211b16; box-shadow: 0 12px 28px #000a; }
.hair-gallery__portrait-svg { display: block; width: 100%; height: 100%; object-fit: contain; }
.hair-gallery__selected { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.hair-gallery__selected strong { color: #ead7b5; font-size: 16px; line-height: 1.35; overflow-wrap: anywhere; }
.hair-gallery__selected span { color: #a99273; font-size: 11px; line-height: 1.45; }
.hair-gallery__swatches { display: flex; flex-wrap: wrap; gap: 8px; }
.hair-gallery__swatches button { width: 34px; height: 34px; border: 2px solid #17110c; background: var(--swatch); box-shadow: inset 0 0 0 1px #fff2, 0 3px 7px #0008; cursor: pointer; }
.hair-gallery__swatches button.is-active { outline: 2px solid #e3c997; outline-offset: 2px; }
.hair-gallery__browser { display: flex; flex-direction: column; min-width: 0; min-height: 0; gap: 10px; padding: 16px; }
.hair-gallery__tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
.hair-gallery__tabs button { min-width: 0; min-height: 42px; padding: 8px; cursor: pointer; }
.hair-gallery__tabs button.is-active { outline: 2px solid #ba9d6f; outline-offset: -3px; background: linear-gradient(180deg, #67503a, #37291d); }
.hair-gallery__options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; gap: 7px; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 3px; scrollbar-width: thin; scrollbar-color: #725b3e #211a14; }
.hair-option { display: grid; grid-template-columns: 30px minmax(0, 1fr); align-items: center; min-width: 0; min-height: 48px; gap: 8px; padding: 8px 10px; border: 1px solid #5f4b34; background: #251d16; color: #cdb999; text-align: left; cursor: pointer; }
.hair-option > span { color: #8f795a; font-size: 10px; font-variant-numeric: tabular-nums; }
.hair-option strong { min-width: 0; font-size: 11px; line-height: 1.35; overflow-wrap: anywhere; }
.hair-option:hover { border-color: #977a52; background: #34271b; }
.hair-option.is-active { border-color: #d0ad72; background: #523b25; color: #f0debd; box-shadow: inset 3px 0 #c59c5a; }
.hair-gallery button:focus-visible { outline: 2px solid #e4cda4; outline-offset: 2px; }

@media (max-width: 700px) {
  .hair-gallery { width: calc(100vw - 16px); height: calc(100dvh - 16px); }
  .hair-gallery__header { min-height: 66px; padding: 10px 12px; }
  .hair-gallery__body { display: flex; flex-direction: column; height: calc(100% - 66px); overflow-y: auto; }
  .hair-gallery__preview { flex: 0 0 auto; min-height: 0; border-right: 0; border-bottom: 1px solid #574531; padding: 12px; }
  .hair-gallery__portrait { flex: 0 0 auto; width: min(54vw, 220px); min-height: 0; aspect-ratio: 5 / 6; margin-inline: auto; border-width: 5px; }
  .hair-gallery__selected { text-align: center; }
  .hair-gallery__swatches { justify-content: center; }
  .hair-gallery__browser { flex: 0 0 auto; overflow: visible; padding: 12px; }
  .hair-gallery__options { max-height: none; overflow: visible; }
}

@media (max-width: 420px) {
  .hair-gallery__options { grid-template-columns: minmax(0, 1fr); }
}
/* Hair and accessory controls always stay available, independently of the tab. */
.hair-gallery__selected small { color: #927d60; font-size: 9px; line-height: 1.4; }
.hair-gallery__layers { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; flex-shrink: 0; padding: 11px; border: 1px solid #58442e; background: #1c1611; }
.hair-gallery__layers label { display: flex; flex-direction: column; gap: 6px; min-width: 0; color: #bda581; font-size: 10px; }
.hair-gallery__layers select { display: block; width: 100%; min-width: 0; min-height: 36px; padding: 6px 22px 6px 8px; border: 1px solid #71573b; border-radius: 0; background: #2b2118; color: #ead7b5; font: inherit; font-size: 11px; color-scheme: dark; cursor: pointer; }
.hair-gallery__layers select:focus-visible { outline: 2px solid #e4cda4; outline-offset: 2px; }
.hair-gallery__layers p { grid-column: 1 / -1; margin: 0; color: #927d60; font-size: 10px; line-height: 1.5; }
.hair-option--remove { grid-column: 1 / -1; }

@media (max-width: 420px) {
  .hair-gallery__layers { grid-template-columns: minmax(0, 1fr); }
}

.hair-gallery__tabs--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.hair-gallery__clothing-label { grid-column: 1 / -1; }
.hair-gallery__portrait--full { min-height: 320px; }
@media (max-width: 700px) {
  .hair-gallery__portrait--full { width: min(78vw, 280px); aspect-ratio: 320 / 740; }
}
