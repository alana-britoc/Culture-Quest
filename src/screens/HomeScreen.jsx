import { ActionButton } from "../components/UI";

export default function HomeScreen({ navigate, SCREENS }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/[0.07] blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl animate-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface-card mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-glow" />
          <span className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Simulador Corporativo com IA</span>
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
          <span className="text-gradient">Culture</span>
          <br />
          <span className="text-white">Quest</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-white/40 max-w-md mx-auto leading-relaxed mb-10">
          Enfrente dilemas reais do mundo corporativo. Roubo de marmita, WhatsApp errado, reuniao que podia ser email. Cada decisao molda sua reputacao.
        </p>

        {/* CTA */}
        <ActionButton onClick={() => navigate(SCREENS.ARCHETYPE)} className="text-base px-10 py-4">
          Iniciar Jogo
        </ActionButton>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {[
            { value: "5", label: "Cenarios", emoji: "🎭" },
            { value: "4", label: "Metricas", emoji: "📊" },
            { value: "3", label: "Arquetipos", emoji: "🧙" },
          ].map(({ value, label, emoji }) => (
            <div key={label} className="text-center">
              <p className="text-xl mb-0.5">{emoji}</p>
              <p className="text-2xl font-bold text-white font-mono">{value}</p>
              <p className="text-[11px] text-white/25 uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Fun tagline */}
        <p className="text-white/15 text-xs mt-12 font-mono">
          90% de precisao para vencer. Boa sorte com isso.
        </p>
      </div>
    </div>
  );
}
