import { useState, useEffect } from "react";
import { MetricsSidebar, ActionButton, LoadingDots } from "../components/UI";
import { generateOnboarding } from "../hooks/useClaudeAI";

const FALLBACK = {
  messages: [
    "Fala! Bem-vindo a empresa. Sou seu gerente — sim, aquele que manda 'vamos alinhar' toda segunda.",
    "Aqui a gente valoriza transparencia... na teoria. Na pratica, tem gente que manda 'obrigado pelo feedback' e nunca mais fala com voce.",
    "Voce vai enfrentar 5 situacoes reais. Umas serias, outras nem tanto. Tipo quando alguem rouba sua marmita. Pronto?",
  ],
  question: "Me conta: qual e aquele medo que te da gelo na barriga no primeiro dia de trabalho?",
  options: [
    "Alguem roubar minha marmita da geladeira",
    "Mandar mensagem no grupo errado do WhatsApp",
    "Ter que falar em reuniao com 30 pessoas olhando",
  ],
};

export default function OnboardingScreen({ gameState, updateGameState, navigate, SCREENS }) {
  const [data, setData]             = useState(null);
  const [loadingAI, setLoadingAI]   = useState(true);
  const [step, setStep]             = useState(-1); // -1=loading, 0-2=messages, 3=ready btn, 4=fear question
  const [typing, setTyping]         = useState(false);
  const [selectedOption, setOption] = useState(null);
  const [customText, setCustomText] = useState("");

  useEffect(() => {
    generateOnboarding(gameState)
      .then((d) => { setData(d); setStep(0); })
      .catch(() => { setData(FALLBACK); setStep(0); })
      .finally(() => setLoadingAI(false));
  }, []);

  const msgs = data?.messages ?? FALLBACK.messages;

  const advance = () => {
    if (step < 2) {
      setTyping(true);
      setTimeout(() => { setTyping(false); setStep(s => s + 1); }, 800);
    } else {
      setStep(3);
    }
  };

  const ready = () => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setStep(4); }, 800);
  };

  const submit = () => {
    const answer = customText.trim() || selectedOption;
    if (!answer) return;
    updateGameState({ currentScenario: 0, precision: 50 });
    navigate(SCREENS.GAMEPLAY);
  };

  const company = ({ tecnologia: "TechFlow", financeiro: "BankCorp", saude: "MedPlus" })[gameState.sector] ?? "RetailMax";

  if (loadingAI) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center animate-in">
          <div className="flex justify-center mb-4"><LoadingDots /></div>
          <p className="text-sm text-white/25">Preparando seu primeiro dia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-6 pt-24 pb-8 max-w-5xl mx-auto w-full">
      <div className="flex-1 surface-card p-5 flex flex-col min-h-[500px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-full bg-accent-500/15 flex items-center justify-center text-base">👔</div>
          <div>
            <p className="text-sm font-semibold text-white/70">Gerente — {company}</p>
            <p className={`text-[11px] ${typing ? "text-accent-400" : "text-green-500"}`}>{typing ? "digitando..." : "online"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {msgs.slice(0, step + 1).map((msg, i) => (
            <div key={i} className="max-w-[80%] animate-slide-up">
              <div className="px-4 py-3 rounded-2xl rounded-tl-md text-sm text-white/60 leading-relaxed bg-white/[0.04] border border-white/[0.06]">
                {msg}
              </div>
            </div>
          ))}

          {typing && (
            <div className="max-w-[80%]">
              <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white/[0.04] border border-white/[0.06]">
                <LoadingDots />
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="flex justify-end animate-slide-up">
              <div className="px-4 py-3 rounded-2xl rounded-tr-md text-sm text-white/80 bg-accent-500/10 border border-accent-500/20">
                Bora! 💪
              </div>
            </div>
          )}

          {step >= 4 && !typing && data && (
            <div className="max-w-[80%] animate-slide-up">
              <div className="px-4 py-3 rounded-2xl rounded-tl-md text-sm text-white/60 bg-white/[0.04] border border-white/[0.06]">
                {data.question ?? FALLBACK.question}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {step < 3 && !typing && (
            <button onClick={advance}
              className="w-full py-2.5 rounded-xl text-sm text-white/30 hover:text-white/60 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all">
              continuar...
            </button>
          )}

          {step === 3 && (
            <ActionButton onClick={ready} className="w-full">Bora! 💪</ActionButton>
          )}

          {step >= 4 && data && (
            <>
              <p className="text-[11px] text-white/20 uppercase tracking-wider">Escolha ou escreva:</p>

              {/* AI-generated options */}
              {(data.options ?? FALLBACK.options).map((opt) => (
                <button key={opt} onClick={() => { setOption(opt); setCustomText(""); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                    selectedOption === opt && !customText
                      ? "bg-accent-500/10 border border-accent-500/30 text-white"
                      : "surface-card text-white/40 hover:text-white/60"
                  }`}>
                  {opt}
                </button>
              ))}

              {/* Custom text input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15 text-xs">✍️</div>
                <input
                  type="text"
                  value={customText}
                  onChange={e => { setCustomText(e.target.value); setOption(null); }}
                  placeholder="Ou escreva o seu medo aqui..."
                  className="w-full px-4 py-3 pl-8 rounded-xl text-sm bg-white/[0.03] border border-white/[0.08] focus:border-accent-500/40 text-white/70 placeholder-white/15 transition-colors outline-none"
                />
              </div>

              <ActionButton
                onClick={submit}
                disabled={!customText.trim() && !selectedOption}
                className="w-full mt-1">
                Que comecem os jogos →
              </ActionButton>
            </>
          )}
        </div>
      </div>

      <MetricsSidebar metrics={gameState.metrics} currentScenario={0} totalScenarios={gameState.totalScenarios} precision={50} />
    </div>
  );
}
