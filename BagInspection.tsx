.bag-inspection-table { width: 100%; min-height: 270px; padding: 12px; border: 1px solid #786045; background: radial-gradient(ellipse at top,#4b3625,#211810 75%); }
.bag-closed { min-height: 290px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #b9a17d; }
.bag-closed svg { width: min(300px,100%); height: auto; }
.bag-closed p { margin: 12px 0; font-size: 12px; }
.bag-items { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; }
.bag-item { min-width: 0; padding: 7px; color: #dccaa6; border: 1px solid #72583c; background: #261c14; display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.bag-item:hover,.bag-item.is-selected { border-color: #d5b479; background: #45301e; }
.bag-item:focus-visible { outline: 2px solid #e1c08c; outline-offset: 2px; }
.bag-item svg { width: 105px; height: 95px; max-width: 100%; }
.bag-item span { font-size: 11px; line-height: 1.35; text-align: center; }
.bag-item-detail { min-height: 74px; margin-top: 11px; padding: 11px; color: #c7b28d; background: #18110d; border: 1px solid #624a31; font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }
.bag-item-detail strong { color: #ecd4a8; }
.bag-item-detail p { margin: 5px 0; }
.bag-note-btn { width: 100%; margin-top: 7px; padding: 9px; font-size: 11px; }
.tool-bar--six { grid-template-columns: repeat(6,minmax(0,1fr)); }
@media (max-width: 700px) { .tool-bar--six { grid-template-columns: repeat(3,minmax(0,1fr)); } .bag-inspection-table { padding: 9px; } .bag-item .bag-drop-bottle { height: 105px; } }
/* Override the inherited fixed mobile crop: details and evidence must stay reachable. */
.dental-image:has(.bag-inspection-table) { flex: 0 0 auto; height: auto; min-height: 0; overflow: visible; }

.bag-item .bag-drop-bottle { width: 76px; height: 116px; max-width: 100%; }
@media (max-width: 700px) { .bag-item .bag-drop-bottle { height: 105px; } }
