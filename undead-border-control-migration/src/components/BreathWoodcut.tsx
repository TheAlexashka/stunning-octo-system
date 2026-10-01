export function BreathWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c8b18a" />
      <rect x="7" y="8" width="206" height="80" fill="#342517" />
      {[14, 82, 150].map((x, index) => (
        <g key={x}>
          <rect x={x} y="15" width="57" height="64" fill="#756951" stroke="#d2bd96" strokeWidth="2" />
          <path d={`M${x + 8} 18 l-5 50 M${x + 19} 18 l-8 55`} stroke="#c8b18a" opacity="0.22" strokeWidth="2" />
          {index !== 2 && <ellipse cx={x + 29} cy="47" rx="21" ry="17" fill="#d0bb95" opacity="0.6" />}
          {index === 1 && [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${x + 15 + i * 7} ${31 + i % 2 * 10} q-5 10 0 12 q5 -2 0 -12`} fill="#413523" stroke="#e3cda7" strokeWidth="0.75" />)}
          <path d={`M${x + 7} 83 h43`} stroke="#d2bd96" strokeWidth="0.9" />
        </g>
      ))}
      <rect x="2" y="2" width="216" height="92" fill="none" stroke="#342517" strokeWidth="1.5" />
    </svg>
  );
}
