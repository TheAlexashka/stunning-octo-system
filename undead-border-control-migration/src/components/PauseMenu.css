.app-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.app-header {
  position: relative;
  z-index: 120;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 54px;
  padding: calc(5px + env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) 5px max(14px, env(safe-area-inset-left));
  border-bottom: 1px solid #4a3a2a;
  background: linear-gradient(180deg, #29211a, #19140f);
  box-shadow: 0 3px 14px #0006;
}

.app-header__caption {
  min-width: 0;
  overflow: hidden;
  color: #a89576;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pause-toggle {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 96px;
  min-height: 44px;
  padding: 8px 12px;
  font-size: 11px;
  letter-spacing: 0.13em;
}

.scene-content {
  flex: 1 1 0;
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.scene-content .game-screen,
.scene-content .scroll-screen {
  height: 100%;
}

.app-shell.is-paused,
.is-paused .scene-content *,
.is-paused .scene-content *::before,
.is-paused .scene-content *::after {
  animation-play-state: paused !important;
}

.pause-dialog {
  position: fixed;
  inset: auto;
  top: calc(66px + env(safe-area-inset-top));
  right: max(12px, env(safe-area-inset-right));
  width: min(380px, calc(100vw - 24px));
  max-width: none;
  max-height: calc(100dvh - 82px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  margin: 0;
  padding: 0;
  border: 1px solid #8b7354;
  border-top: 3px solid #a0845b;
  background: linear-gradient(145deg, #33291f, #1c1712);
  color: #e3d2b2;
  box-shadow: 0 22px 65px #000c, inset 0 0 30px #0003;
  overflow: auto;
  overscroll-behavior: contain;
}

.pause-dialog::backdrop {
  background: #060503c9;
  backdrop-filter: blur(3px);
}

.pause-panel { padding: 24px; }
.pause-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.pause-heading h2 { margin: 6px 0 0; color: #e6d6b9; font-size: 26px; line-height: 1.1; letter-spacing: 0.1em; text-shadow: 0 2px 8px #000a; }
.pause-eyebrow { color: #ab9575; font-size: 9px; line-height: 1.5; letter-spacing: 0.15em; }
.pause-close { display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; border: 1px solid #645039; background: #241c15; color: #d5c3a3; cursor: pointer; }
.pause-close:hover { background: #403124; }
.pause-description { margin: 17px 0 22px; padding-bottom: 18px; border-bottom: 1px solid #574531; color: #b8a78a; font-size: 12px; line-height: 1.6; }
.volume-control { margin-bottom: 21px; }
.volume-label-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
.volume-label-row label { font-size: 17px; }
.volume-label-row output { color: #ddc294; font-size: 18px; font-variant-numeric: tabular-nums; }
.volume-label-row output span { color: #918064; font-size: 12px; }
.volume-description { margin-top: 4px; color: #b4a186; font-size: 11px; line-height: 1.4; }
.volume-slider { display: block; -webkit-appearance: none; appearance: none; width: 100%; height: 44px; margin: 4px 0 0; border: 0; border-radius: 0; background-image: linear-gradient(to right, #b79b70 0%, #b79b70 var(--volume-fill), #51422f var(--volume-fill), #51422f 100%); background-size: 100% 6px; background-position: center; background-repeat: no-repeat; background-color: transparent; cursor: pointer; touch-action: pan-y; }
.volume-slider::-webkit-slider-runnable-track { height: 6px; background: transparent; }
.volume-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 21px; height: 21px; margin-top: -7.5px; border: 2px solid #e0caaa; border-radius: 2px; background: linear-gradient(#c5ab83, #846947); box-shadow: 0 2px 6px #0008; }
.volume-slider::-moz-range-track { height: 6px; background: transparent; }
.volume-slider::-moz-range-thumb { width: 18px; height: 18px; border: 2px solid #e0caaa; border-radius: 2px; background: #a88b61; }
.volume-slider:focus-visible { outline: 2px solid #ead3aa; outline-offset: 7px; }
.volume-scale { display: flex; justify-content: space-between; color: #978364; font-size: 10px; }
.pause-preview-row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 4px 12px; margin: -3px 0 13px; }
.pause-preview-row span { color: #ae9777; font-size: 10px; }
.pause-preview { min-height: 40px; padding: 5px 0; border: 0; color: #dfc69e; background: transparent; font-size: 11px; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
.pause-resume { width: 100%; min-height: 48px; font-size: 13px; letter-spacing: 0.13em; cursor: pointer; }
.pause-footnote { margin-top: 13px; color: #a58e6c; font-size: 10px; text-align: center; }
.pause-toggle:focus-visible,
.pause-close:focus-visible,
.pause-preview:focus-visible,
.pause-resume:focus-visible { outline: 2px solid #e9d0a4; outline-offset: 3px; }

@media (max-width: 760px) {
  .app-header { gap: 8px; padding-inline: max(10px, env(safe-area-inset-left)); }
  .app-header__caption { font-size: 9px; letter-spacing: 0.08em; }
  .pause-toggle { min-width: 90px; padding-inline: 10px; font-size: 10px; }
  .pause-panel { padding: 20px; }
  .pause-heading h2 { font-size: 24px; }
  .scene-content .game-screen { padding-top: 6px; }
}

@media (prefers-reduced-motion: reduce) {
  .pause-dialog::backdrop { backdrop-filter: none; }
}
