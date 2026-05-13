import { useState } from "react";
import { NavBar, GamePanel, PanelTitle, ActionButton } from "../components/UI";

const ARCHETYPES = [
  {
    id: "estagiario",
    label: "Estagiário Caótico",
    sub: "Aprende sob pressão",
    emoji: "🎓",
    color: "#e87060",
    bg: "rgba(232,112,96,0.15)",
  },
  {
    id: "lider",
    label: "Líder Diplomata",
    sub: "Media conflitos",
    emoji: "🤝",
    color: "#60c080",
    bg: "rgba(96,192,128,0.15)",
  },
  {
    id: "sincerao",
    label: "Especialista Sincerão",
    sub: "Comunicação direta",
    emoji: "💬",
    color: "#60a0e8",
    bg: "rgba(96,160,232,0.15)",
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
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex items-center justify-center pt-20 px-8">
        <div className="w-full max-w-3xl">
          <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Courier New', monospace" }}>
            Passo 1 de 2
          </p>
          <GamePanel className="p-8">
            <PanelTitle>Escolha seu arquétipo</PanelTitle>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {ARCHETYPES.map((a) => {
                const isSelected = selected === a.id;
                return (
                  <button key={a.id} onClick={() => setSelected(a.id)}
                    className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: isSelected ? a.bg : "rgba(255,255,255,0.04)",
                      border: `2px solid ${isSelected ? a.color : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isSelected ? `0 0 20px ${a.color}44` : "none",
                    }}>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                      style={{ background: isSelected ? `${a.color}22` : "rgba(255,255,255,0.05)" }}>
                      {a.emoji}
                    </div>
                    <p className="text-white font-bold text-sm text-center">{a.label}</p>
                    <p className="text-white/50 text-xs text-center">{a.sub}</p>
                    {isSelected && (
                      <div className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: a.color, color: "#0f0820" }}>
                        Selecionado
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <ActionButton onClick={confirm} disabled={!selected}>
                Confirmar →
              </ActionButton>
            </div>
          </GamePanel>
        </div>
      </div>
    </div>
  );
}
