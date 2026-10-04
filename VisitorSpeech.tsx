.visitor-typewriter { display: grid; grid-template-columns: minmax(0, 1fr); position: relative; min-width: 0; width: 100%; overflow-wrap: anywhere; }
.visitor-typewriter__reserve, .visitor-typewriter__visible { grid-area: 1 / 1; }
.visitor-typewriter__reserve { visibility: hidden; pointer-events: none; }
.visitor-typewriter__visible { text-align: inherit; }
.visitor-typewriter__cursor { display: inline-block; width: 1px; height: 0.85em; margin-left: 2px; background: currentColor; opacity: 0.6; vertical-align: baseline; }
.speech-clerk-prompt { display: block; padding-bottom: 5px; color: #ceb38c; font-size: 10px; font-style: normal; }
.speech-controls { display: flex; flex: 0 0 auto; justify-content: center; flex-wrap: wrap; gap: 6px; }
.speech-controls button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 40px; padding: 6px 9px; border: 1px solid #65523c; color: #d4bd99; background: #241d16; font-size: 10px; line-height: 1.35; cursor: pointer; }
.speech-controls button:disabled { opacity: 0.45; cursor: not-allowed; }
.speech-controls button:hover:not(:disabled) { color: #f0dcb9; background: #3b2e22; }
.speech-controls button:focus-visible { outline: 2px solid #d9bd8b; outline-offset: 2px; }
.visitor-quote:has(.visitor-typewriter) { display: block; }
.visitor-panel .visitor-quote { min-width: 0; width: 100%; max-height: 5.5em; min-height: 3.1em; overflow-y: auto; overflow-wrap: anywhere; scrollbar-width: thin; scrollbar-color: #736044 #1a1310; overscroll-behavior-y: auto; }
@media (max-width: 760px) {
  .speech-controls { gap: 5px; }
  .speech-controls button { min-height: 42px; padding: 7px 9px; font-size: 10px; }
  .visitor-panel .visitor-quote { height: 3.8em; min-height: 3.8em; max-height: 3.8em; flex: 0 0 auto; touch-action: pan-y pinch-zoom; }
}
