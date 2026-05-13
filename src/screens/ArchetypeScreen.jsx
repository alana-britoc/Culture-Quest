import { useState } from "react";
import { ActionButton } from "../components/UI";

const ARCHETYPES = [
  {
    id: "estagiario",
    label: "Estagiário Caótico",
    sub: "Aprende sob pressão",
    color: "#e87060",
    bg: "rgba(232,112,96,0.15)",
    illustration: (
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
        {/* Character surrounded by chaos symbols */}
        <circle cx="90" cy="60" r="28" fill="#f0c8a0"/>
        <ellipse cx="90" cy="40" rx="26" ry="18" fill="#2c2c2c"/>
        <circle cx="82" cy="58" r="3" fill="#333"/>
        <circle cx="98" cy="58" r="3" fill="#333"/>
        <path d="M82 70 Q90 78 98 70" stroke="#c47a5a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <rect x="65" y="88" width="50" height="45" rx="8" fill="#e87060"/>
        {/* Chaos symbols floating around */}
        {/* Pie chart */}
        <circle cx="35" cy="35" r="14" fill="none" stroke="#ffd93d" strokeWidth="2.5"/>
        <path d="M35 35 L35 21 A14 14 0 0 1 47 28 Z" fill="#ffd93d"/>
        {/* Lightning bolt */}
        <path d="M145 20 L140 40 L150 38 L143 58" stroke="#ff6b8a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Magnifying glass */}
        <circle cx="150" cy="95" r="10" fill="none" stroke="#4ade80" strokeWidth="2.5"/>
        <line x1="157" y1="102" x2="165" y2="110" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Exclamation mark */}
        <text x="42" y="110" fill="#facc15" fontSize="18" fontWeight="bold">!</text>
      </svg>
    ),
  },
  {
    id: "lider",
    label: "Líder Diplomata",
    sub: "Media conflitos",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.15)",
    illustration: (
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
        {/* Two characters with speech bubbles */}
        {/* Person left */}
        <circle cx="60" cy="55" r="22" fill="#e8c8a0"/>
        <ellipse cx="60" cy="38" rx="20" ry="14" fill="#4a3520"/>
        <rect x="42" y="77" width="36" height="40" rx="6" fill="#457b9d"/>
        {/* Person right */}
        <circle cx="120" cy="55" r="22" fill="#f0c8a0"/>
        <ellipse cx="120" cy="38" rx="20" ry="14" fill="#2c2c2c"/>
        <rect x="102" y="77" width="36" height="40" rx="6" fill="#e87060"/>
        {/* Calendar in left person's hand */}
        <rect x="30" y="85" width="18" height="16" rx="2" fill="#ffd93d"/>
        <text x="34" y="97" fill="#333" fontSize="8" fontWeight="bold">31</text>
        {/* Briefcase in right person's hand */}
        <rect x="138" y="88" width="16" height="12" rx="2" fill="#8B6914"/>
        {/* Speech bubbles between them */}
        <rect x="72" y="20" width="36" height="16" rx="6" fill="white" opacity="0.85"/>
        <rect x="76" y="25" width="20" height="3" rx="1.5" fill="#457b9d" opacity="0.5"/>
        <rect x="76" y="31" width="14" height="3" rx="1.5" fill="#457b9d" opacity="0.3"/>
        {/* Mediation arrows */}
        <path d="M78 65 L90 58 L102 65" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Legs */}
        <rect x="48" y="117" width="12" height="30" rx="5" fill="#2c3e50"/>
        <rect x="68" y="117" width="12" height="30" rx="5" fill="#2c3e50"/>
        <rect x="108" y="117" width="12" height="30" rx="5" fill="#1d3557"/>
        <rect x="128" y="117" width="12" height="30" rx="5" fill="#1d3557"/>
      </svg>
    ),
  },
  {
    id: "sincerao",
    label: "Especialista Sincerão",
    sub: "Comunicação direta",
    color: "#60a0e8",
    bg: "rgba(96,160,232,0.15)",
    illustration: (
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
        {/* Character in blue suit with speech bubbles */}
        <circle cx="90" cy="55" r="26" fill="#e8c8a0"/>
        <ellipse cx="90" cy="38" rx="24" ry="16" fill="#1a1a2e"/>
        <circle cx="82" cy="53" r="3" fill="#333"/>
        <circle cx="98" cy="53" r="3" fill="#333"/>
        <path d="M82 66 Q90 74 98 66" stroke="#b89070" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Blue suit */}
        <rect x="65" y="81" width="50" height="45" rx="8" fill="#457b9d"/>
        {/* White shirt / tie */}
        <path d="M82 81 L90 100 L98 81" fill="#f1faee"/>
        <path d="M87 85 L90 105 L93 85" fill="#e63946"/>
        {/* Direct speech bubbles */}
        <rect x="125" y="20" width="45" height="20" rx="6" fill="white" opacity="0.85"/>
        <polygon points="125,30 118,35 125,35" fill="white" opacity="0.85"/>
        <rect x="131" y="27" width="30" height="3" rx="1.5" fill="#457b9d" opacity="0.5"/>
        <rect x="131" y="33" width="20" height="3" rx="1.5" fill="#457b9d" opacity="0.3"/>
        {/* List icon */}
        <rect x="125" y="55" width="35" height="25" rx="5" fill="white" opacity="0.8"/>
        <rect x="130" y="61" width="18" height="3" rx="1.5" fill="#60a0e8" opacity="0.6"/>
        <circle cx="133" cy="62.5" r="2" fill="#60a0e8"/>
        <rect x="130" y="69" width="14" height="3" rx="1.5" fill="#60a0e8" opacity="0.4"/>
        <circle cx="133" cy="70.5" r="2" fill="#60a0e8" opacity="0.7"/>
        {/* Legs */}
        <rect x="70" y="126" width="16" height="28" rx="6" fill="#2c3e50"/>
        <rect x="94" y="126" width="16" height="28" rx="6" fill="#2c3e50"/>
      </svg>
    ),
  },
];

export default function ArchetypeScreen({ gameState, updateGameState, navigate, SCREENS, onNavigate, activePage }) {
  const [selected, setSelected] = useState(gameState.archetype);

  const confirm = () => {
    if (!selected) return;
    updateGameState({ archetype: selected });
    navigate(SCREENS.CONFIG);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-12">
      {/* Step indicator */}
      <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-6 self-start ml-12"
        style={{ fontFamily: "'Courier New', monospace" }}>
        Passo 1 de 2
      </p>

      {/* Decorative frame */}
      <div className="relative w-full max-w-5xl px-8 py-10"
        style={{
          background: "linear-gradient(160deg, rgba(30,15,60,0.85), rgba(15,8,32,0.9))",
          border: "2px solid rgba(120,80,200,0.5)",
          borderRadius: "20px",
          boxShadow: "0 0 50px rgba(100,50,200,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
        {/* Corner diamonds */}
        {[
          { top: "-6px", left: "50%", transform: "translateX(-50%)" },
          { bottom: "-6px", left: "50%", transform: "translateX(-50%)" },
          { top: "50%", left: "-6px", transform: "translateY(-50%)" },
          { top: "50%", right: "-6px", transform: "translateY(-50%)" },
        ].map((pos, i) => (
          <div key={i} className="absolute w-3 h-3 rotate-45"
            style={{ ...pos, background: "linear-gradient(135deg, #e53e3e, #ed8936, #ecc94b)" }} />
        ))}

        {/* Heading */}
        <h2 className="text-center text-white font-black text-2xl tracking-widest uppercase mb-10"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: "0.12em" }}>
          Escolha seu Arquétipo
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {ARCHETYPES.map((a) => {
            const isSelected = selected === a.id;
            return (
              <button key={a.id} onClick={() => setSelected(a.id)}
                className="flex flex-col items-center gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: isSelected ? a.bg : "rgba(255,255,255,0.04)",
                  border: `2px solid ${isSelected ? a.color : "rgba(255,255,255,0.1)"}`,
                  boxShadow: isSelected ? `0 0 25px ${a.color}33` : "none",
                }}>
                {/* Illustration */}
                <div className="flex items-center justify-center h-40"
                  style={{ opacity: isSelected ? 1 : 0.6 }}>
                  {a.illustration}
                </div>

                {/* Description */}
                <p className="text-white/80 text-sm text-center font-medium">{a.sub}</p>

                {/* Archetype button */}
                <div className="w-full py-3 rounded-full text-center font-bold text-white text-sm transition-all duration-200"
                  style={{
                    background: isSelected
                      ? `linear-gradient(90deg, #e53e3e, #ed8936)`
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? "0 4px 15px rgba(229,62,62,0.3)" : "none",
                  }}>
                  {a.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm button */}
      <div className="w-full max-w-5xl flex justify-end mt-6 pr-8">
        <ActionButton onClick={confirm} disabled={!selected} className="text-base px-8 py-3">
          Confirmar →
        </ActionButton>
      </div>
    </div>
  );
}
