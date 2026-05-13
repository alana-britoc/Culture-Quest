import { useState } from "react";
import { NavBar, GamePanel, PanelTitle, ActionButton } from "../components/UI";

const SIZES = [
  { id: "startup",    label: "Startup",     sub: "Até 50 pessoas",   emoji: "💡" },
  { id: "medio",      label: "Médio porte", sub: "50–500 pessoas",   emoji: "🚀" },
  { id: "corporacao", label: "Corporação",  sub: "500+ pessoas",     emoji: "🌍" },
];

const SECTORS = ["Tecnologia", "Financeiro", "Saúde", "Varejo"];

export default function ConfigScreen({ gameState, updateGameState, navigate, SCREENS, onNavigate, activePage }) {
  const [size, setSize]     = useState(gameState.companySize);
  const [sector, setSector] = useState(gameState.sector);

  const confirm = () => {
    if (!size || !sector) return;
    updateGameState({ companySize: size, sector: sector.toLowerCase() });
    navigate(SCREENS.ONBOARDING);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex items-center justify-center pt-20 px-8">
        <div className="w-full max-w-3xl">
          <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Courier New', monospace" }}>Passo 2 de 2</p>
          <GamePanel className="p-8">
            <PanelTitle>Configure seu ambiente</PanelTitle>

            {/* Company size */}
            <div className="grid grid-cols-3 gap-5 mb-8">
              {SIZES.map((s) => {
                const sel = size === s.id;
                return (
                  <button key={s.id} onClick={() => setSize(s.id)}
                    className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: sel ? "rgba(200,80,120,0.2)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${sel ? "rgba(220,100,140,0.8)" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: sel ? "0 0 20px rgba(200,80,120,0.3)" : "none",
                    }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      {s.emoji}
                    </div>
                    <p className="text-white font-bold text-sm">{s.label}</p>
                    <p className="text-white/40 text-xs">{s.sub}</p>
                    {sel && (
                      <div className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: "linear-gradient(90deg,#e05080,#c03060)", color: "white" }}>
                        Selecionado
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sector */}
            <p className="text-white/50 text-sm font-medium mb-3">Setor da empresa</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SECTORS.map((sec) => {
                const sel = sector === sec;
                return (
                  <button key={sec} onClick={() => setSector(sec)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      background: sel ? "rgba(200,80,120,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${sel ? "rgba(220,100,140,0.7)" : "rgba(255,255,255,0.1)"}`,
                    }}>
                    <div className="w-2 h-2 rounded-full"
                      style={{ background: sel ? "#e05080" : "rgba(255,255,255,0.2)" }} />
                    <span className={`text-sm font-medium ${sel ? "text-pink-300" : "text-white/60"}`}>{sec}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <ActionButton variant="ghost" onClick={() => navigate(SCREENS.ARCHETYPE)}>← Voltar</ActionButton>
              <ActionButton onClick={confirm} disabled={!size || !sector}>Confirmar →</ActionButton>
            </div>
          </GamePanel>
        </div>
      </div>
    </div>
  );
}
