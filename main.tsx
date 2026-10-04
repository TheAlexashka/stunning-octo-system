@import "tailwindcss";

@font-face {
  font-family: 'system-serif';
  src: local('Georgia');
}

html, body, #root {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  background: #1a1613;
  color: #d9c9a8;
  font-family: 'Georgia', 'Times New Roman', serif;
  overflow: hidden;
}

button {
  touch-action: manipulation;
}

/* Film grain overlay */
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.12;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: grain 0.5s steps(2) infinite;
}

@keyframes grain {
  0% { transform: translate(0,0); }
  25% { transform: translate(-3px,2px); }
  50% { transform: translate(2px,-2px); }
  75% { transform: translate(-1px,3px); }
  100% { transform: translate(3px,1px); }
}

/* Vignette */
.vignette::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%);
}

.flicker {
  animation: flicker 4s infinite;
}
@keyframes flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.7; }
  94% { opacity: 1; }
  96% { opacity: 0.5; }
  97% { opacity: 1; }
}

.stamp {
  transform: rotate(-8deg);
  animation: stamp 0.4s ease-out;
}
@keyframes stamp {
  0% { transform: rotate(-8deg) scale(3); opacity: 0; }
  50% { transform: rotate(-8deg) scale(1.2); opacity: 1; }
  100% { transform: rotate(-8deg) scale(1); opacity: 1; }
}

.shake {
  animation: shake 0.5s;
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.blood-flash {
  animation: bloodflash 1.2s;
}
@keyframes bloodflash {
  0% { background-color: rgba(0,0,0,0); }
  15% { background-color: rgba(120,10,10,0.55); }
  100% { background-color: rgba(0,0,0,0); }
}

.paper {
  background:
    linear-gradient(135deg, rgba(60,40,20,0.1), rgba(0,0,0,0.15)),
    #d4c19a;
  background-blend-mode: multiply;
  color: #2a1e10;
  box-shadow:
    inset 0 0 40px rgba(80,50,20,0.3),
    0 8px 20px rgba(0,0,0,0.6);
}

.wood {
  background:
    repeating-linear-gradient(
      90deg,
      #3a2818 0px,
      #402d1c 2px,
      #35241a 4px,
      #452f1e 8px
    ),
    #35241a;
  box-shadow: inset 0 0 100px rgba(0,0,0,0.7);
}

.metal-btn {
  background: linear-gradient(180deg, #4a4038 0%, #2a231d 100%);
  border: 1px solid #6a5a48;
  color: #e8d9b8;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
  transition: transform 80ms ease, box-shadow 80ms ease, filter 80ms ease, background 0.15s, border-color 0.15s;
}
.metal-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #5a4e42 0%, #3a3128 100%);
  border-color: #8a7458;
}
.metal-btn:active:not(:disabled) {
  transform: translateY(2px) scale(0.985);
  background: linear-gradient(180deg, #2a231d 0%, #4a4038 100%);
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.48), 0 1px 0 rgba(220,190,140,0.2);
  filter: brightness(0.88);
}
.metal-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.approve-btn {
  background: linear-gradient(180deg, #2d4020 0%, #1a2612 100%);
  border-color: #4a6a38;
  color: #c8e0a8;
}
.approve-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #3a5028 0%, #223018 100%);
}
.deny-btn {
  background: linear-gradient(180deg, #4a1818 0%, #260c0c 100%);
  border-color: #7a2828;
  color: #f0c0c0;
}
.deny-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #5a2020 0%, #301010 100%);
}

.scrollable::-webkit-scrollbar { width: 8px; }
.scrollable::-webkit-scrollbar-track { background: #1a1310; }
.scrollable::-webkit-scrollbar-thumb { background: #4a3a2a; }

.game-screen {
  display: grid;
  grid-template-columns: minmax(250px, 0.9fr) minmax(0, 1.65fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 12px;
  width: 100%;
  height: 100dvh;
  min-height: 0;
  padding: 12px;
  overflow: hidden;
}

.visitor-panel {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  gap: 8px;
  padding: 12px;
  overflow: hidden;
  border: 1px solid #4a3a2a;
  background: #1a1310;
}

.visitor-panel__top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #8a785e;
  font-size: 11px;
  letter-spacing: 0.14em;
}

.visitor-panel__top > :first-child { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.visitor-panel__top > :last-child { flex-shrink: 0; }

.visitor-window {
  display: grid;
  flex: 1;
  min-height: 0;
  place-items: center;
  overflow: hidden;
}

.visitor-photo-frame {
  position: relative;
  width: auto;
  height: min(44vh, 336px);
  max-width: 100%;
  aspect-ratio: 5 / 6;
  overflow: hidden;
  border: 8px solid #2a2018;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(0, 0, 0, 0.8);
}

.visitor-portrait {
  display: block;
  width: 100%;
  height: 100%;
}

/* Deliberate, visible eyebrow gesture for the named visitor. The wrapper
   keeps the brow's drawn position and animates only its vertical movement. */
@keyframes portrait-brow-raise {
  0% { transform: translateY(0); }
  38% { transform: translateY(-5px); }
  68% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
}
.portrait-brow-raise {
  animation: portrait-brow-raise 1.1s cubic-bezier(.2,.8,.35,1) both;
  transform-box: fill-box;
  transform-origin: center;
}

.visitor-bars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to right,
    transparent 32%,
    #1a1310 32%,
    #1a1310 34%,
    transparent 34%,
    transparent 65%,
    #1a1310 65%,
    #1a1310 67%,
    transparent 67%
  );
}

.visitor-quote {
  min-height: 2.8em;
  color: #a89878;
  font-size: 14px;
  font-style: italic;
  line-height: 1.35;
  text-align: center;
}

.game-bottom {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 260px);
  gap: 12px;
  min-width: 0;
  min-height: 0;
}

.game-main-column {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 12px;
  min-width: 0;
  min-height: 0;
}

.tool-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  padding: 8px;
  border: 1px solid #4a3a2a;
  background: #2a2018;
}

.tool-button {
  min-width: 0;
  min-height: 42px;
  padding: 8px 6px;
  font-size: 13px;
  letter-spacing: 0.12em;
  overflow-wrap: anywhere;
}

.tool-button.is-active {
  outline: 2px solid #c8a060;
  outline-offset: 1px;
  background: linear-gradient(180deg, #66513a 0%, #3a2e20 100%);
}

.inspection-panel {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  border: 1px solid #4a3a2a;
  background: #1a1310;
}

.inspection-content {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
}

.inspection-title {
  flex: 0 0 auto;
  margin-bottom: 8px;
  color: #8a785e;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-align: center;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.inspection-visual {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border: 4px solid #2a2018;
  background: #000;
}

.game-feedback {
  position: absolute;
  z-index: 2;
  right: 12px;
  bottom: 12px;
  left: 12px;
  padding: 10px;
  border: 1px solid #7a2828;
  background: rgba(0, 0, 0, 0.94);
  color: #e8d0a8;
  font-size: 13px;
  text-align: center;
}

.action-bar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid #4a3a2a;
  background: #2a2018;
}

.action-bar--three {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 10px;
}

.action-bar > button {
  min-width: 0;
  min-height: 48px;
  padding: 10px 8px;
  font-size: 15px;
  letter-spacing: 0.12em;
  overflow-wrap: anywhere;
}

.refuse-btn {
  background: linear-gradient(180deg, #563e1f 0%, #2d200f 100%);
  border-color: #8c6938;
  color: #f0d7a8;
}

.refuse-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #684b26 0%, #382813 100%);
  border-color: #ad8448;
}

.alarm-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 4px;
}

.sd-alarm-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  padding: 4px;
  border-radius: 9999px;
  border: 2px solid #6b563c;
  background: radial-gradient(circle at 50% 35%, #3c3228 0%, #17120e 100%);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.8),
    0 3px 10px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.sd-alarm-btn__core {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 1.5px solid #e06a62;
  background: radial-gradient(circle at 38% 30%, #d42c24 0%, #8e1111 62%, #4a0707 100%);
  box-shadow:
    0 0 14px rgba(185, 22, 22, 0.65),
    inset 0 -3px 6px rgba(30, 0, 0, 0.75);
}

.sd-alarm-btn__shine {
  position: absolute;
  top: 4px;
  left: 8px;
  width: 12px;
  height: 6px;
  border-radius: 9999px;
  background: rgba(255, 230, 220, 0.45);
  transform: rotate(-18deg);
  pointer-events: none;
}

.sd-alarm-btn__label {
  color: #f9e3dc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-shadow: 0 1px 3px #000;
}

.sd-alarm-btn:hover:not(:disabled) .sd-alarm-btn__core {
  background: radial-gradient(circle at 38% 30%, #ea3830 0%, #a51616 62%, #570909 100%);
  box-shadow:
    0 0 20px rgba(220, 35, 35, 0.85),
    inset 0 -2px 5px rgba(30, 0, 0, 0.75);
}

.sd-alarm-btn:active:not(:disabled) {
  transform: translateY(1px) scale(0.97);
}

.sd-alarm-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.alarm-btn-caption {
  color: #c9645c;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1;
}

.game-sidebar {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  gap: 10px;
}

.status-panel,
.errors-panel {
  padding: 12px;
  border: 1px solid #4a3a2a;
  background: #2a2018;
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.status-panel__heading,
.errors-panel__heading {
  color: #a89878;
  font-size: 10px;
  letter-spacing: 0.2em;
}

.status-panel__clerk {
  color: #e8d9b8;
  font-size: 14px;
}

.status-panel__detail {
  color: #a89878;
  font-size: 11px;
  line-height: 1.35;
}

.errors-panel__heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.error-meter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.error-meter__mark {
  height: 8px;
  background: #3a3028;
}

.error-meter__mark.is-active {
  background: #8a1010;
  box-shadow: 0 0 8px rgba(138, 16, 16, 0.45);
}

.notebook-panel {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 12px;
  border-left: 4px solid #6b5135;
  background-color: #d4c19a;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 27px,
    rgba(90, 64, 32, 0.16) 28px
  );
  color: #2a1e10;
  box-shadow: inset 0 0 24px rgba(80, 50, 20, 0.18), 0 5px 14px rgba(0, 0, 0, 0.35);
}

.notebook-panel__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(90, 64, 32, 0.45);
}

.notebook-panel__header h2 {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.1em;
}

.notebook-panel__header span {
  color: #705331;
  font-size: 9px;
  letter-spacing: 0.1em;
}

.notebook-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.notebook-entry {
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  gap: 6px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(90, 64, 32, 0.26);
  font-size: 11px;
  line-height: 1.35;
}

.notebook-entry strong {
  font-size: 10px;
  letter-spacing: 0.05em;
}

.notebook-entry > * { min-width: 0; overflow-wrap: anywhere; }
.notebook-check-text { flex: 1; min-width: 0; overflow-wrap: anywhere; }

.notebook-entry--vampire strong { color: #7a1010; }
.notebook-entry--werewolf strong { color: #5a3010; }
.notebook-entry--mermaid strong { color: #20607a; }
.notebook-entry--ghoul strong { color: #606010; }
.notebook-entry--nix strong { color: #2f6a52; }
.notebook-entry--doppelganger strong { color: #5c3564; }
.notebook-entry strong small { display: block; margin-top: 3px; font-size: 8px; line-height: 1.35; letter-spacing: 0; }
.notebook-additions { margin-top: 13px; border-top: 2px solid #92764b; }
.notebook-addendum { padding: 9px 0; border-bottom: 1px solid #92764b70; }
.notebook-addendum h3 { margin: 0 0 7px; color: #6d482a; font-size: 10px; letter-spacing: .06em; line-height: 1.45; }
.notebook-addendum ul { margin: 0; padding-left: 16px; font-size: 11px; line-height: 1.5; }
.notebook-addendum li { margin-bottom: 5px; overflow-wrap: anywhere; }

.notebook-counter {
  padding: 2px 6px;
  background: #6b1515;
  color: #f2e2c4 !important;
  font-size: 9px !important;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.notebook-checklist {
  margin: 6px 0 8px;
  padding: 7px 8px;
  border: 1px solid rgba(90, 64, 32, 0.42);
  background: rgba(65, 45, 22, 0.08);
}

.notebook-checklist__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 5px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #5b4123;
}

.notebook-clear-btn {
  padding: 0;
  border: 0;
  background: none;
  color: #7a1818;
  font-size: 9px;
  text-decoration: underline;
  cursor: pointer;
}

.notebook-check-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 6px;
  padding: 3px 2px;
  border: 0;
  background: transparent;
  color: #2a1e10;
  font-family: inherit;
  font-size: 11px;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
  user-select: none;
}

.notebook-check-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  border: 1.5px solid #593e22;
  background: #e7d7b6;
  color: #7a1010;
  line-height: 1;
}

.notebook-check-item.is-checked .notebook-check-box {
  background: #7a1010;
  border-color: #4f0a0a;
  color: #f4e6ca;
}

.notebook-check-item.is-checked .notebook-check-text {
  color: #6b1212;
  text-decoration: underline;
  text-decoration-color: rgba(122, 16, 16, 0.5);
  text-underline-offset: 2px;
}

/* Booth pass-through slot under the window */
.booth-slot {
  border-top: 2px solid #3c2e21;
  background: linear-gradient(180deg, #140f0c 0%, #241b14 100%);
  padding: 6px 8px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.85);
}

.booth-slot__opening {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.booth-slot__label {
  color: #8c785c;
  font-size: 9px;
  letter-spacing: 0.14em;
}

.booth-slot__request-btn {
  padding: 5px 10px;
  font-size: 10px;
  letter-spacing: 0.12em;
  cursor: pointer;
}

.booth-slot__take-all {
  padding: 2px 6px;
  border: 1px solid #7c6548;
  background: #2e241b;
  color: #dec8a4;
  font-size: 10px;
  cursor: pointer;
}

.booth-slot__status {
  color: #7b8c62;
  font-size: 10px;
  font-style: italic;
}

.booth-slot__tray {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  padding-top: 4px;
  border-top: 1px dashed #4a3a2a;
}

.slot-doc-token {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border: 1px solid #8a7050;
  background: linear-gradient(180deg, #dfd0ae 0%, #c4b089 100%);
  color: #261a0e;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.65);
  cursor: grab;
  touch-action: pan-y pinch-zoom;
  transition: transform 0.12s ease;
}

.slot-doc-token:active {
  cursor: grabbing;
}

.slot-doc-token--visa {
  background: linear-gradient(180deg, #d5d9c3 0%, #b8bfa0 100%);
  border-color: #677255;
}

.slot-doc-token__title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.slot-doc-token__hint {
  font-size: 9px;
  color: #5b4328;
}

/* Desk workspace & documents */
.desk-empty {
  max-width: 390px;
  padding: 18px;
  border: 1px dashed #5d4a36;
  background: rgba(34, 26, 19, 0.75);
  text-align: center;
}

.desk-empty__title {
  color: #d6c19d;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 6px;
}

.desk-empty__text {
  color: #a89578;
  font-size: 12px;
  line-height: 1.45;
  margin: 0 0 12px;
}

.desk-workspace {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 470px;
  max-height: 100%;
  gap: 8px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 2px;
}

.desk-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.desk-tab {
  min-height: 34px;
  padding: 5px 8px;
  border: 1px solid #5f4c37;
  background: #251d15;
  color: #b7a384;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.desk-tab.is-active {
  border-color: #c59f63;
  background: #473624;
  color: #f0dfc1;
}

.document-card {
  position: relative;
  width: 100%;
  max-width: 470px;
  padding: 15px 18px;
}

.work-permit-card {
  background:
    linear-gradient(135deg, rgba(45, 65, 45, 0.12), rgba(0, 0, 0, 0.14)),
    #cfd4be;
}

.work-permit-header {
  border-bottom: 2px solid #5b664b;
  padding-bottom: 6px;
  margin-bottom: 8px;
  text-align: center;
}

.work-permit-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
  padding-top: 6px;
  border-top: 1px solid #6b755b;
  font-size: 10px;
  color: #3f4735;
}

.work-permit-seal {
  padding: 2px 6px;
  border: 1px solid #49543a;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.doc-interactive-row {
  display: flex;
  width: 100%;
  gap: 8px;
  padding: 2px 4px;
  margin: 0 -4px;
  border: 1px solid transparent;
  background: rgba(120, 80, 30, 0.08);
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}

.doc-interactive-row:hover {
  background: rgba(138, 25, 20, 0.12);
  border-color: rgba(138, 25, 20, 0.4);
}

.doc-interactive-row.is-selected {
  background: rgba(155, 30, 22, 0.2);
  border-color: #8a1010;
}

.doc-interactive-row__badge {
  padding: 1px 4px;
  background: rgba(55, 38, 20, 0.14);
  color: #6b1515;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.desk-interrogation {
  padding: 9px 11px;
  border: 1px solid #574430;
  background: linear-gradient(180deg, #281f17 0%, #1d1610 100%);
}

.desk-interrogation__hint {
  color: #b7a282;
  font-size: 11px;
  line-height: 1.35;
  margin-bottom: 7px;
}

.desk-interrogation__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.desk-question-btn {
  min-height: 36px;
  padding: 6px 8px;
  font-size: 10.5px;
  letter-spacing: 0.05em;
  line-height: 1.2;
  cursor: pointer;
}

.desk-transcript {
  margin-top: 8px;
  padding-top: 7px;
  border-top: 1px solid #463626;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.desk-transcript__item {
  font-size: 11.5px;
  line-height: 1.35;
  color: #e2d1b3;
}

.desk-transcript__tag {
  display: inline-block;
  margin-right: 6px;
  color: #c89e63;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.document-photo {
  width: 96px;
  height: 112px;
  flex: 0 0 96px;
  overflow: hidden;
}

/* ---- Titles: scaled down on phones, with a dark halo behind them ---- */

.title-main {
  color: #a41515;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(26px, 8.5vw, 68px);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.05;
  max-width: 94vw;
  overflow-wrap: anywhere;
  text-shadow:
    0 0 2px #000,
    0 0 12px rgba(0, 0, 0, 0.95),
    0 3px 8px rgba(0, 0, 0, 0.9),
    0 0 26px rgba(90, 10, 10, 0.7);
}

.title-sub {
  color: #a89878;
  font-size: clamp(12px, 3.6vw, 24px);
  letter-spacing: 0.32em;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 2px #000;
}

.title-end {
  color: #a41515;
  font-size: clamp(20px, 6.4vw, 54px);
  font-weight: 700;
  letter-spacing: 0.07em;
  line-height: 1.1;
  max-width: 94vw;
  text-align: center;
  overflow-wrap: anywhere;
  text-shadow:
    0 0 2px #000,
    0 0 14px rgba(0, 0, 0, 0.95),
    0 3px 9px rgba(0, 0, 0, 0.9),
    0 0 28px rgba(90, 10, 10, 0.65);
}

.paper-title {
  padding-bottom: 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid #8a7050;
  color: #2a1e10;
  font-size: clamp(15px, 4.4vw, 24px);
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
}

.bestiary-name {
  font-size: clamp(12px, 3.4vw, 15px);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 0 rgba(212, 193, 154, 0.9);
}

.scroll-screen {
  display: flex;
  width: 100%;
  height: 100dvh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.doc-sheet {
  width: 100%;
  padding: 16px;
  margin: auto;
}

@media (max-width: 760px) {
  .scroll-screen {
    padding: 12px;
    align-items: flex-start;
  }

  .doc-sheet {
    padding: 14px;
  }
}

.bestiary-name--vampire { color: #7a1010; }
.bestiary-name--werewolf { color: #5a3010; }
.bestiary-name--mermaid { color: #20607a; }
.bestiary-name--ghoul { color: #5a5a10; }

.document-stamp {
  font-size: clamp(14px, 4.6vw, 34px);
  line-height: 1.1;
  padding: 2px 8px;
  border-width: clamp(2px, 0.9vw, 4px);
  border-style: solid;
  white-space: nowrap;
}

.document-stamp--ok {
  color: #2a5028;
  border-color: #2a5028;
  text-shadow: 0 0 3px rgba(212, 193, 154, 0.85), 0 1px 2px rgba(0, 0, 0, 0.4);
}

.document-stamp--refuse {
  color: #7c4b14;
  border-color: #7c4b14;
  text-shadow: 0 0 3px rgba(212, 193, 154, 0.85), 0 1px 2px rgba(0, 0, 0, 0.4);
}

.document-stamp--deny {
  color: #8a1010;
  border-color: #8a1010;
  text-shadow: 0 0 3px rgba(212, 193, 154, 0.85), 0 1px 2px rgba(0, 0, 0, 0.4);
}

.menu-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(90vw, 340px);
  max-width: 100%;
  margin-inline: auto;
}

.hand-inspection {
  display: block;
}

@media (max-width: 760px) {
  .inspection-visual.inspection-visual--hands {
    flex: 0 0 auto;
    height: clamp(240px, 36dvh, 310px);
    min-height: 240px;
  }

  .inspection-visual--hands .hand-inspection {
    width: 100%;
    height: 100%;
  }
}

@media (min-width: 761px) and (max-width: 1100px) {
  .game-bottom {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(420px, 1fr) auto;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .game-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
  .game-sidebar .notebook-panel { grid-column: 1 / -1; max-height: 360px; }
  .action-bar > button { font-size: 12px; letter-spacing: 0.06em; }
}

.document-data > div > div:first-child {
  flex: 0 0 6rem;
}

@media (max-width: 760px) {
  .vignette::after {
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.42) 100%);
  }

  .game-screen {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: calc(6px + env(safe-area-inset-top)) 8px calc(6px + env(safe-area-inset-bottom));
  }

  .visitor-panel {
    flex: 0 0 auto;
    gap: 4px;
    padding: 7px 10px 6px;
  }

  .visitor-panel__top {
    flex: 0 0 auto;
    font-size: 9px;
    letter-spacing: 0.1em;
  }

  .visitor-photo-frame {
    height: clamp(128px, 21dvh, 184px);
    max-height: 100%;
    border-width: 5px;
  }

  .visitor-quote {
    flex: 0 0 auto;
    min-height: 2.2em;
    margin: 0 auto;
    font-size: 12px;
    line-height: 1.2;
  }

  .game-bottom {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 1px 4px 0;
    -webkit-overflow-scrolling: touch;
  }

  .game-bottom::-webkit-scrollbar {
    width: 5px;
  }

  .game-bottom::-webkit-scrollbar-thumb {
    background: #5a4630;
  }

  .game-main-column {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
  }

  .tool-bar {
    flex: 0 0 auto;
    gap: 5px;
    padding: 5px;
  }

  .tool-button {
    min-height: 42px;
    padding: 8px 2px;
    font-size: 11px;
    letter-spacing: 0.07em;
  }

  .inspection-panel {
    flex: 0 0 auto;
    min-height: 192px;
    padding: 10px;
  }

  .inspection-content {
    min-height: 170px;
  }

  .inspection-title {
    margin-bottom: 6px;
    font-size: 9px;
  }

  .inspection-visual {
    min-height: 145px;
    border-width: 3px;
  }

  .game-feedback {
    right: 8px;
    bottom: 8px;
    left: 8px;
    padding: 8px;
    font-size: 12px;
  }

  .action-bar {
    flex: 0 0 auto;
    gap: 6px;
    padding: 5px;
  }

  .action-bar > button {
    min-height: 46px;
    padding: 8px 4px;
    font-size: 12px;
    letter-spacing: 0.07em;
  }

  .sd-alarm-btn {
    width: 46px;
    height: 46px;
    padding: 4px;
  }

  .game-sidebar {
    flex: 0 0 auto;
    gap: 8px;
  }

  .status-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4px 8px;
    padding: 8px 10px;
  }

  .status-panel__heading {
    grid-column: 1 / -1;
  }

  .status-panel__clerk {
    font-size: 12px;
  }

  .status-panel__detail {
    font-size: 10px;
  }

  .errors-panel {
    display: grid;
    grid-template-columns: auto minmax(90px, 1fr);
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
  }

  .errors-panel__heading {
    gap: 8px;
    margin: 0;
    font-size: 10px;
  }

  .error-meter {
    gap: 4px;
  }

  .notebook-panel {
    flex: 0 0 auto;
    overflow: visible;
    padding: 10px 11px;
  }

  .notebook-panel__header h2 {
    font-size: 14px;
  }

  .notebook-panel__header span {
    font-size: 9px;
  }

  .notebook-entry {
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 7px;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.3;
  }

  .notebook-entry strong {
    font-size: 10px;
  }

  .document-card {
    padding: 12px;
  }

  .document-card > div:first-child {
    margin-bottom: 8px;
    padding-bottom: 6px;
    font-size: 10px;
    letter-spacing: 0.12em;
  }

  .document-card > div:nth-child(2) {
    gap: 10px;
  }

  .document-photo {
    width: 74px;
    height: 88px;
    flex-basis: 74px;
  }

  .document-data {
    font-size: 11px;
    line-height: 1.25;
  }

  .document-data > div > div:first-child {
    flex-basis: 4.6rem;
    width: 4.6rem;
    font-size: 9px;
  }

  .document-card > div:nth-child(3) {
    margin-top: 8px;
    padding-top: 6px;
    font-size: 10px;
  }

  .document-stamp {
    top: 22px;
    right: 10px;
    padding: 2px 5px;
    letter-spacing: 0.05em;
  }

  .fixed.inset-0.z-50 {
    padding: 12px;
  }

  .fixed.inset-0.z-50 > div {
    max-height: 90dvh;
    overflow-y: auto;
    padding: 18px;
  }

  .fixed.inset-0.z-50 button {
    min-height: 44px;
  }
}

@media (max-width: 760px) and (max-height: 520px) {
  .visitor-panel {
    flex-basis: 190px;
  }

  .visitor-photo-frame {
    height: 140px;
  }

  .visitor-quote {
    min-height: 1.2em;
  }
}
