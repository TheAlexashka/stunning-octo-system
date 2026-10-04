.eye-selection { flex: 0 0 auto; margin-bottom: 9px; }
.eye-selection__buttons { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
.eye-side { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; min-height: 47px; padding: 7px 9px; color: #cfbb9b; font-size: 12px; cursor: pointer; }
.eye-side small { color: #af9471; font-size: 9px; }
.eye-side.is-active { border-color: #cbb17e; box-shadow: inset 0 -2px #cbb17e; color: #efdcbb; }
.eye-selection p { margin: 6px 0 0; text-align: center; color: #ae9574; font-size: 10px; line-height: 1.4; }
.eye-questions-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-top: 8px; }
.eye-question-btn { min-width: 0; min-height: 38px; padding: 6px 8px; font-size: 11px; line-height: 1.3; overflow-wrap: anywhere; cursor: pointer; }
.eye-question-btn--alert { border-color: #b57c3c; color: #f3d7a2; }
.eye-flashlight-btn { display: flex; align-items: center; justify-content: center; gap: 6px; }
.eye-flashlight-btn svg { flex-shrink: 0; }
.eye-flashlight-btn span { min-width: 0; }
@media (max-width: 760px) {
  .eye-questions-row { grid-template-columns: 1fr; gap: 5px; }
  .eye-question-btn { min-height: 42px; font-size: 11.5px; }
}
.inspection-eye-content { display: flex; flex: 1; flex-direction: column; min-height: 0; }
.inspection-eye-content .inspection-visual { min-height: 150px; }
.eye-side:focus-visible { outline: 2px solid #e3c997; outline-offset: 2px; }
.tool-bar.tool-bar--five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.tool-bar--five .tool-button { padding-inline: 3px; letter-spacing: 0.03em; font-size: 11px; }
@media (max-width: 760px) {
  .eye-side { min-height: 48px; font-size: 12px; }
  .inspection-eye-content .inspection-visual { flex: 0 0 auto; height: clamp(170px, 53vw, 230px); }
  .tool-bar--five .tool-button { font-size: 9px; min-height: 44px; letter-spacing: 0.02em; }
}
