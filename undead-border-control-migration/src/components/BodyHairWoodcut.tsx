export function BodyHairWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c6ae83" />
      <rect x="4" y="4" width="212" height="88" fill="#342314" />
      <path d="M13 86 C15 64 18 45 27 29 L75 25 C92 28 94 46 90 64 L91 86 Z" fill="#c6ae83" stroke="#e0cca2" strokeWidth="1" />
      {Array.from({ length: 22 }, (_, i) => {
        const x = 25 + (i * 13) % 54;
        const y = 34 + (i * 19) % 40;
        return <path key={i} d={`M${x} ${y} q-2 7 1 11`} fill="none" stroke="#342314" strokeWidth="1" />;
      })}
      <path d="M116 86 L120 25 L155 20 C174 20 183 34 183 50 L185 86 Z" fill="#c6ae83" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${132 + i % 4 * 12} ${36 + Math.floor(i / 4) * 13} l1 3`} stroke="#342314" strokeWidth="1.6" />)}
      <g transform="translate(134 63) rotate(-18)">
        <rect x="0" y="0" width="53" height="9" rx="4" fill="#20150c" stroke="#e0cca2" strokeWidth="0.7" />
        <path d="M4 0 L19 -35 L38 -38 L24 -3 Z" fill="#e1cea6" stroke="#20150c" strokeWidth="1" />
        <path d="M8 -1 L23 -34" stroke="#705639" strokeWidth="1" />
        <circle cx="8" cy="4" r="1.5" fill="#c6ae83" />
      </g>
      <path d="M103 13 L103 86" stroke="#c6ae83" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#332212" strokeWidth="1.5" />
    </svg>
  );
}
