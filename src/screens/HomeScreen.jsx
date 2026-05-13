import { ActionButton } from "../components/UI";

export default function HomeScreen({ navigate, SCREENS, onNavigate, activePage }) {
  return (
    <div className="min-h-screen flex items-center justify-between px-20 pt-20">
      {/* Left: title + subtitle + button */}
      <div className="flex flex-col gap-6 max-w-xl z-10">
        <h1 className="font-black leading-none"
          style={{
            fontSize: "clamp(56px, 7vw, 96px)",
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            color: "white",
            textShadow: "0 4px 30px rgba(200,80,180,0.4)",
            letterSpacing: "-0.02em",
          }}>
          CULTURE<br />QUEST
        </h1>
        <p className="text-white/80 text-xl">Simulador de cultura corporativa</p>
        <ActionButton onClick={() => navigate(SCREENS.ARCHETYPE)}
          className="w-fit text-base px-10 py-4 mt-2"
          style={{ fontSize: "16px" }}>
          Iniciar Jogo
        </ActionButton>
      </div>

      {/* Right: decorative illustration */}
      <div className="relative w-[520px] h-[520px] flex-shrink-0">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(230,140,80,0.6) 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(240,180,100,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(255,200,120,0.5) 0%, transparent 70%)" }} />

        {/* SVG Illustration: Two corporate characters */}
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none" className="relative z-10">
          {/* Person 1 - Woman in orange top, dark skirt, briefcase */}
          <g transform="translate(80, 100)">
            {/* Body */}
            <rect x="40" y="90" width="80" height="100" rx="12" fill="#e8705f"/>
            {/* Skirt */}
            <path d="M30 185 L50 290 L110 290 L130 185 Z" fill="#1d3557" rx="4"/>
            {/* Head */}
            <circle cx="80" cy="65" r="40" fill="#f0c8a0"/>
            {/* Hair */}
            <ellipse cx="80" cy="45" rx="42" ry="35" fill="#2c2c2c"/>
            <rect x="38" y="45" width="15" height="60" rx="7" fill="#2c2c2c"/>
            <rect x="107" y="45" width="15" height="60" rx="7" fill="#2c2c2c"/>
            {/* Eyes */}
            <circle cx="68" cy="65" r="4" fill="#333"/>
            <circle cx="92" cy="65" r="4" fill="#333"/>
            {/* Smile */}
            <path d="M68 78 Q80 90 92 78" stroke="#c47a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Arm reaching out (right) */}
            <path d="M120 110 Q155 95 175 110" stroke="#f0c8a0" strokeWidth="14" fill="none" strokeLinecap="round"/>
            {/* Briefcase */}
            <rect x="10" y="220" width="50" height="35" rx="5" fill="#8B6914"/>
            <rect x="10" y="220" width="50" height="35" rx="5" fill="rgba(0,0,0,0.1)"/>
            <rect x="25" y="215" width="20" height="8" rx="3" fill="#6B4F10"/>
            {/* Legs */}
            <rect x="50" y="285" width="20" height="50" rx="8" fill="#1d3557"/>
            <rect x="90" y="285" width="20" height="50" rx="8" fill="#1d3557"/>
            {/* Shoes */}
            <ellipse cx="60" cy="338" rx="15" ry="8" fill="#333"/>
            <ellipse cx="100" cy="338" rx="15" ry="8" fill="#333"/>
          </g>

          {/* Person 2 - Man in blue suit, white shirt, red tie */}
          <g transform="translate(230, 80)">
            {/* Body / Suit jacket */}
            <rect x="40" y="90" width="90" height="120" rx="12" fill="#457b9d"/>
            {/* White shirt visible */}
            <path d="M70 90 L85 115 L100 90" fill="#f1faee"/>
            {/* Red tie */}
            <path d="M82 95 L85 130 L88 95" fill="#e63946"/>
            {/* Pants */}
            <rect x="42" y="205" width="35" height="100" rx="8" fill="#2c3e50"/>
            <rect x="93" y="205" width="35" height="100" rx="8" fill="#2c3e50"/>
            {/* Head */}
            <circle cx="85" cy="60" r="40" fill="#e8c8a0"/>
            {/* Hair */}
            <ellipse cx="85" cy="35" rx="38" ry="25" fill="#1a1a2e"/>
            {/* Eyes */}
            <circle cx="73" cy="60" r="4" fill="#333"/>
            <circle cx="97" cy="60" r="4" fill="#333"/>
            {/* Smile */}
            <path d="M73 73 Q85 85 97 73" stroke="#b89070" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Arm reaching out (left - handshake) */}
            <path d="M40 120 Q5 105 -15 115" stroke="#e8c8a0" strokeWidth="14" fill="none" strokeLinecap="round"/>
            {/* Hand */}
            <circle cx="-15" cy="115" r="9" fill="#e8c8a0"/>
            {/* Shoes */}
            <ellipse cx="60" cy="308" rx="20" ry="8" fill="#1a1a2e"/>
            <ellipse cx="110" cy="308" rx="20" ry="8" fill="#1a1a2e"/>
          </g>

          {/* Speech bubble */}
          <g transform="translate(320, 60)">
            <rect x="0" y="0" width="120" height="55" rx="12" fill="white" opacity="0.9"/>
            <polygon points="20,55 35,55 15,75" fill="white" opacity="0.9"/>
            <rect x="15" y="15" width="80" height="5" rx="2.5" fill="#457b9d" opacity="0.4"/>
            <rect x="15" y="28" width="55" height="5" rx="2.5" fill="#457b9d" opacity="0.3"/>
          </g>
        </svg>
      </div>
    </div>
  );
}
