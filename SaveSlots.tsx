.save-archive { color: #dfcfb1; }
.save-archive__intro { margin: 0 0 14px; color: #baa585; font-size: 12px; line-height: 1.6; }
.save-current { margin-bottom: 13px; padding: 9px 11px; border-left: 2px solid #a3885f; background: #49362755; font-size: 11px; line-height: 1.5; }
.save-slots { display: grid; gap: 10px; }
.save-card { position: relative; padding: 14px; border: 1px solid #6b5237; background: linear-gradient(125deg, #35281d, #221b15); box-shadow: inset 0 0 16px #0002; }
.save-card--auto { border-color: #8b744f; background: linear-gradient(125deg, #3d3325, #28221a); }
.save-card__top { display: flex; justify-content: space-between; align-items: center; gap: 9px; margin-bottom: 7px; }
.save-card__top h3 { margin: 0; color: #e8d4af; font-size: 13px; letter-spacing: 0.09em; }
.save-card__top > span { color: #a68b62; font-size: 8px; letter-spacing: 0.1em; }
.save-card__description { margin: 6px 0 7px; color: #d6c2a2; font-size: 12px; line-height: 1.5; }
.save-card__meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; color: #b5a184; font-size: 10px; margin-bottom: 10px; font-variant-numeric: tabular-nums; }
.save-card__empty { margin: 9px 0 13px; color: #a18b6c; font-size: 12px; font-style: italic; }
.save-card__actions { display: flex; flex-wrap: wrap; gap: 6px; }
.save-card__actions .metal-btn { min-height: 40px; padding: 8px 12px; font-size: 11px; letter-spacing: 0.03em; cursor: pointer; }
.save-delete { min-height: 40px; margin-left: auto; padding: 6px 1px; background: none; border: 0; color: #b58c73; font-size: 10px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.save-confirm { padding-top: 5px; border-top: 1px solid #6e5239; }
.save-confirm p { margin: 7px 0 9px; color: #daba93; font-size: 12px; line-height: 1.4; }
.save-status { margin-top: 13px; padding: 10px; border: 1px solid #78825e; color: #d5dfbe; background: #343e2455; font-size: 12px; line-height: 1.5; }
.save-status--error { border-color: #a26f4e; color: #e5c2a5; background: #512c2255; }
.save-archive__note { margin: 13px 0 0; color: #ab9371; font-size: 10px; line-height: 1.5; }
.save-dialog { position: fixed; inset: 0; width: min(520px, calc(100vw - 24px)); max-width: none; max-height: calc(100dvh - 32px - env(safe-area-inset-top) - env(safe-area-inset-bottom)); margin: auto; padding: 24px; overflow: auto; overscroll-behavior: contain; border: 1px solid #947b54; border-top: 3px solid #af956c; background: linear-gradient(140deg, #352a20, #18140f); color: #e8d6b6; box-shadow: 0 25px 70px #000c; }
.save-dialog::backdrop { background: #080604cc; backdrop-filter: blur(3px); }
.save-menu-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 20px; }
.save-menu-heading h2 { margin: 5px 0 0; font-size: 23px; letter-spacing: 0.07em; }
.save-menu-heading small { color: #b49b75; font-size: 9px; letter-spacing: 0.13em; }
.save-menu-heading button { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid #7a6041; background: #241c15; color: #dbc39c; cursor: pointer; flex-shrink: 0; }
.pause-tabs { display: flex; gap: 7px; margin: 17px 0 20px; border-bottom: 1px solid #685136; padding-bottom: 9px; }
.pause-tab { flex: 1; min-height: 42px; padding: 8px; border: 1px solid #615039; background: #211a13; color: #bca687; font-size: 12px; cursor: pointer; }
.pause-tab.is-active { border-color: #b49c72; color: #eddbb8; background: #53402b; }
.pause-menu-return { display: block; width: 100%; min-height: 42px; margin: 10px 0 0; padding: 8px; border: 1px solid #625039; background: #241c15; color: #baa284; font-size: 11px; cursor: pointer; }
.pause-dialog.pause-dialog--archive { width: min(470px, calc(100vw - 24px)); }
.pause-tab:focus-visible, .save-card button:focus-visible, .save-menu-heading button:focus-visible { outline: 2px solid #e4cda4; outline-offset: 3px; }
.session-toast { position: fixed; z-index: 150; bottom: calc(12px + env(safe-area-inset-bottom)); left: 50%; transform: translateX(-50%); width: max-content; max-width: calc(100vw - 24px); padding: 11px 17px; background: #201b13f5; border: 1px solid #ad9469; color: #e1cea9; font-size: 12px; line-height: 1.5; box-shadow: 0 4px 20px #0008; pointer-events: none; }
@media (max-width: 760px) {
  .save-dialog { padding: 18px; }
  .save-card { padding: 12px; }
  .save-menu-heading h2 { font-size: 20px; }
  .save-card__actions .metal-btn { min-height: 44px; }
  .save-delete { min-height: 44px; }
}
