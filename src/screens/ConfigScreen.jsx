import { useState } from "react";
import { ActionButton, StepIndicator } from "../components/UI";

const SIZES = [
  { id: "startup",    label: "Startup",    desc: "Ate 50 pessoas" },
  { id: "medio",      label: "Medio porte", desc: "50–500 pessoas" },
  { id: "corporacao", label: "Corporacao",  desc: "500+ pessoas" },
];
const SECTORS = ["Tecnologia", "Financeiro", "Saude", "Varejo"];

export default function ConfigScreen({ gameState, updateGameState, navigate, SCREENS }) {
  const [size, setSize]     = useState(gameState.companySize);
  const [sector, setSector] = useState(gameState.sector);

  const confirm = () => {
    if (!size || !sector) return;
    updateGameState({ companySize: size, sector: sector.toLowerCase() });
    navigate(SCREENS.ONBOARDING);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
      <div className="w-full max-w-2xl">
        <StepIndicator current={2} total={2} />

        <div className="mt-8 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Configure o cenario</h2>
          <p className="text-sm text-white/35">O porte e setor definem os dilemas que voce vai enfrentar.</p>
        </div>

        {/* Size */}
        <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium mb-3">Porte da empresa</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {SIZES.map((s) => {
            const sel = size === s.id;
            return (
              <button key={s.id} onClick={() => setSize(s.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-150 ${
                  sel ? "bg-accent-500/[0.08] border border-accent-500/30" : "surface-card hover:border-white/[0.12]"
                }`}>
                <p className={`font-semibold text-sm mb-0.5 ${sel ? "text-white" : "text-white/60"}`}>{s.label}</p>
                <p className="text-[11px] text-white/25">{s.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Sector */}
        <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium mb-3">Setor</p>
        <div className="grid grid-cols-2 gap-2 mb-10">
          {SECTORS.map((s) => {
            const sel = sector === s;
            return (
              <button key={s} onClick={() => setSector(s)}
                className={`px-4 py-3 rounded-xl text-left text-sm transition-all duration-150 ${
                  sel ? "bg-accent-500/[0.08] border border-accent-500/30 text-white" : "surface-card text-white/50 hover:text-white/70"
                }`}>
                {s}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between">
          <ActionButton variant="ghost" onClick={() => navigate(SCREENS.ARCHETYPE)}>← Voltar</ActionButton>
          <ActionButton onClick={confirm} disabled={!size || !sector}>Confirmar →</ActionButton>
        </div>
      </div>
    </div>
  );
}
