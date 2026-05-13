import { useState } from "react";
import { ActionButton, StepIndicator } from "../components/UI";

const ARCHETYPES = [
  {
    id: "estagiario",
    label: "Estagiario Caotico",
    sub: "Aprende sob pressao. Erra com humor.",
    desc: "Voce acabou de entrar e ja esta no olho do furacao. Ninguem te explicou nada, mas pediram o relatorio pra ontem.",
    emoji: "🔥",
    color: "border-orange-500/30 bg-orange-500/[0.06]",
    badge: "Caos Nivel: Alto",
  },
  {
    id: "lider",
    label: "Lider Diplomata",
    sub: "Media conflitos. Gerencia egos.",
    desc: "Times em conflito, chefe pedindo resultado e voce no meio tentando nao explodir. Empatia e tudo... ate certo ponto.",
    emoji: "👑",
    color: "border-green-500/30 bg-green-500/[0.06]",
    badge: "Paciencia Nivel: Lendario",
  },
  {
    id: "sincerao",
    label: "Especialista Sincerao",
    sub: "Comunicacao direta. Sem filtro.",
    desc: "Seu conhecimento e tecnico, sua boca e rapida. O RH ja mandou 3 emails sobre 'comunicacao assertiva' esse mes.",
    emoji: "🎯",
    color: "border-blue-500/30 bg-blue-500/[0.06]",
    badge: "HR Alert Nivel: Vermelho",
  },
];

export default function ArchetypeScreen({ gameState, updateGameState, navigate, SCREENS }) {
  const [selected, setSelected] = useState(gameState.archetype);

  const confirm = () => {
    if (!selected) return;
    updateGameState({ archetype: selected });
    navigate(SCREENS.CONFIG);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
      <div className="w-full max-w-3xl">
        <StepIndicator current={1} total={2} />

        <div className="mt-8 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Escolha seu perfil</h2>
          <p className="text-sm text-white/35">Cada arquetipo tem uma historia diferente pra contar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ARCHETYPES.map((a, i) => {
            const sel = selected === a.id;
            return (
              <button key={a.id} onClick={() => setSelected(a.id)}
                className={`text-left p-6 rounded-2xl transition-all duration-200 animate-in-up ${
                  sel ? `${a.color} accent-glow` : "surface-card hover:border-white/[0.12]"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{a.emoji}</span>
                  {sel && (
                    <div className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center animate-in-scale">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>
                <p className={`font-bold text-base mb-1 ${sel ? "text-white" : "text-white/70"}`}>{a.label}</p>
                <p className="text-xs text-accent-400/70 font-medium mb-2">{a.sub}</p>
                <p className="text-xs text-white/30 leading-relaxed mb-3">{a.desc}</p>
                <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                  sel ? "bg-white/10 text-white/60" : "bg-white/[0.03] text-white/20"
                }`}>{a.badge}</div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <ActionButton onClick={confirm} disabled={!selected}>Confirmar →</ActionButton>
        </div>
      </div>
    </div>
  );
}
