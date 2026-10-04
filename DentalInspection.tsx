.dental-inspection {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: auto;
  min-width: 0;
  min-height: 0;
}

.dental-image {
  position: relative;
  flex: 1 1 185px;
  min-height: 165px;
  border: 3px solid #34291f;
  overflow: hidden;
  background: #17120f;
}

.dental-image--hands {
  min-height: 210px;
}

.dental-image > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.dental-state {
  position: absolute;
  right: 7px;
  top: 7px;
  padding: 5px 7px;
  background: #241c16ec;
  border: 1px solid #746047;
  color: #d9c6a6;
  font-size: 9px;
  letter-spacing: 0.1em;
  pointer-events: none;
}

.dental-state--open { border-color: #6e7c56; color: #d0d9b2; }

.dental-conversation {
  flex: 0 0 auto;
  min-height: 0;
  padding: 12px;
  border: 1px solid #604931;
  background: linear-gradient(145deg, #302319, #211a14);
  box-shadow: inset 0 0 24px #0003;
}

.dental-conversation__heading {
  padding-bottom: 8px;
  margin-bottom: 10px;
  border-bottom: 1px solid #51402e;
  color: #bda27c;
  font-size: 9px;
  letter-spacing: 0.17em;
  line-height: 1.5;
}

.dental-log {
  max-height: 164px;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #766046 #231b14;
}

.dental-line { padding-bottom: 11px; }
.dental-line__speaker { color: #a78f70; font-size: 9px; letter-spacing: 0.07em; }
.dental-line p { margin: 4px 0 0; color: #e1d1b4; font-size: 13px; line-height: 1.6; overflow-wrap: anywhere; }
.dental-line--clerk p { color: #bda989; }
.dental-line--visitor { padding-left: 10px; border-left: 2px solid #806344; margin-left: 2px; }
.dental-waiting { padding: 0 0 9px; color: #ba9f7e; font-size: 12px; font-style: italic; }

.dental-choices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 8px; }
.dental-choice { width: 100%; min-height: 44px; padding: 9px; font-size: 12px; line-height: 1.3; cursor: pointer; }
.dental-refusal { margin: 7px 0; padding: 9px; border: 1px solid #7c5738; color: #d6b68c; background: #40291c55; font-size: 12px; line-height: 1.55; }
.dental-back { display: block; min-height: 42px; margin: 5px auto -4px; padding: 6px; background: none; border: 0; color: #c4ad8a; font-size: 11px; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
.dental-back:disabled { opacity: 0.4; cursor: not-allowed; }
.dental-choice:focus-visible, .dental-back:focus-visible { outline: 2px solid #e5cea5; outline-offset: 3px; }

.inspection-content--dental { overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #766046 #231b14; }

@media (max-width: 760px) {
  .dental-inspection { flex: 0 0 auto; height: auto; gap: 8px; }
  .dental-image { flex: 0 0 auto; height: clamp(175px, 56vw, 245px); min-height: 175px; }
  .dental-image--hands { height: clamp(220px, 66vw, 285px); min-height: 220px; }
  .dental-conversation { padding: 11px; }
  .dental-line p { font-size: 13px; line-height: 1.55; }
  .dental-choices { gap: 6px; }
  .dental-choice { font-size: 12px; padding: 10px 7px; }
  .dental-log { max-height: 190px; }
  .dental-state { font-size: 8px; }
}

@media (max-height: 650px) and (min-width: 761px) {
  .dental-image { min-height: 125px; }
  .dental-conversation { padding: 9px; }
  .dental-log { max-height: 105px; }
  .dental-line p { font-size: 12px; }
}
.dental-inspection--question { margin-top: 10px; }
.dental-inspection--question .dental-conversation { border-top: 1px dashed #6a5a40; padding-top: 8px; }
