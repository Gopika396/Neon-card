export default function Avatar({ variant, a, b }) {
  const shape = {
    fill: "#0d1117",
    stroke: a,
    strokeWidth: 2.5,
    strokeLinejoin: "round",
  };

  return (
    <svg viewBox="0 0 100 100" className="avatar-svg" aria-hidden="true">
      <rect width="100" height="100" fill="#0a1220" />
      <circle cx="50" cy="55" r="44" fill={b} opacity="0.14" />

      {variant === "wolf" && (
        <g>
          <g {...shape}>
            <polygon points="20,16 40,40 18,52" />
            <polygon points="80,16 60,40 82,52" />
            <path d="M20 48 Q50 30 80 48 L72 78 Q50 92 28 78 Z" />
          </g>
          <polygon points="32,54 46,58 44,64 30,60" fill={a} />
          <polygon points="68,54 54,58 56,64 70,60" fill={a} />
          <path d="M41 72 L59 72 L50 84 Z" fill={b} />
          <line x1="50" y1="36" x2="50" y2="50" stroke={b} strokeWidth="2" />
        </g>
      )}

      {variant === "cat" && (
        <g>
          <g {...shape}>
            <polygon points="22,12 42,34 20,46" />
            <polygon points="78,12 58,34 80,46" />
            <ellipse cx="50" cy="60" rx="31" ry="27" />
          </g>
          <circle cx="38" cy="56" r="5.5" fill={a} />
          <circle cx="62" cy="56" r="5.5" fill={a} />
          <circle cx="38" cy="56" r="2" fill="#0d1117" />
          <circle cx="62" cy="56" r="2" fill="#0d1117" />
          <polygon points="46,66 54,66 50,71" fill={b} />
          <g stroke={b} strokeWidth="1.6" strokeLinecap="round">
            <line x1="14" y1="64" x2="34" y2="66" />
            <line x1="14" y1="72" x2="34" y2="70" />
            <line x1="86" y1="64" x2="66" y2="66" />
            <line x1="86" y1="72" x2="66" y2="70" />
          </g>
        </g>
      )}

      {variant === "bot" && (
        <g>
          <line x1="50" y1="10" x2="50" y2="26" stroke={b} strokeWidth="3" />
          <circle cx="50" cy="9" r="4.5" fill={b} />
          <rect x="22" y="26" width="56" height="58" rx="12" {...shape} />
          <rect x="33" y="48" width="13" height="11" rx="3" fill={a} />
          <rect x="54" y="48" width="13" height="11" rx="3" fill={a} />
          <line
            x1="38"
            y1="72"
            x2="62"
            y2="72"
            stroke={b}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="16" cy="55" r="4" fill={b} />
          <circle cx="84" cy="55" r="4" fill={b} />
        </g>
      )}
    </svg>
  );
}