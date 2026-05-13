import { useState } from "react";
import { NavBar, GamePanel, MetricsSidebar, ActionButton, LoadingDots } from "../components/UI";

const ONBOARDING_MESSAGES = [
  "Olá! Seja bem-vindo à empresa. Sou seu gerente. Antes de começar, quero te contar como funcionamos aqui. 😄",
  "Aqui valorizamos a transparência e a comunicação direta. Problemas aparecem — o que importa é como você lida com eles.",
  "Você vai enfrentar 5 situações reais do dia a dia corporativo. Suas respostas vão impactar sua reputação e as métricas da empresa. Pronto para começar?",
];

const FEAR_OPTIONS = [
  "Não conseguir me adaptar à cultura da empresa",
  "Cometer erros que acabem prejudicando o time",
  "Não conseguir me comunicar bem",
];

export default function OnboardingScreen({ gameState, updateGameState, navigate, SCREENS, onNavigate, activePage }) {
  const [step, setStep]           = useState(0); // 0,1,2 = mensagens IA; 3 = aguardando "Sim"; 4 = pergunta medo; 5 = pronto
  const [selectedFear, setFear]   = useState(null);
  const [showTyping, setTyping]   = useState(false);

  const advanceStep = () => {
    if (step < 2) {
      setTyping(true);
      setTimeout(() => { setTyping(false); setStep((s) => s + 1); }, 800);
    } else {
      setStep(3); // show "Sim, estou pronto!" button
    }
  };

  const confirmReady = () => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setStep(4); }, 800);
  };

  const startGame = () => {
    if (!selectedFear) return;
    updateGameState({ currentScenario: 0, precision: 50 });
    navigate(SCREENS.GAMEPLAY);
  };

  const companyName = gameState.sector === "tecnologia" ? "TechFlow"
    : gameState.sector === "financeiro" ? "BankCorp"
    : gameState.sector === "saude" ? "MedPlus"
    : "RetailMax";

  const visibleMessages = ONBOARDING_MESSAGES.slice(0, step + 1);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex gap-6 px-8 pt-24 pb-8 max-w-6xl mx-auto w-full">
        {/* Chat area */}
        <GamePanel className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Manager header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #60a0e8, #4080c8)" }}>
              👔
            </div>
            <div>
              <p className="text-white font-bold text-sm">Gerente — {companyName}</p>
              {showTyping
                ? <p className="text-green-400 text-xs">digitando...</p>
                : <p className="text-green-400 text-xs">online</p>}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4 pr-2">
            {visibleMessages.map((msg, i) => (
              <div key={i} className="max-w-[85%]">
                <div className="px-4 py-3 rounded-2xl rounded-tl-none text-sm text-gray-200 leading-relaxed"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {msg.replace("empresa", companyName)}
                </div>
              </div>
            ))}

            {showTyping && (
              <div className="max-w-[85%]">
                <div className="px-4 py-3 rounded-2xl rounded-tl-none"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  <LoadingDots />
                </div>
              </div>
            )}

            {/* Player reply */}
            {step >= 3 && (
              <div className="flex justify-end">
                <div className="px-4 py-3 rounded-2xl rounded-tr-none text-sm text-gray-200"
                  style={{ background: "rgba(100,60,180,0.4)", border: "1px solid rgba(150,100,255,0.3)" }}>
                  Sim, estou pronto!
                </div>
              </div>
            )}

            {/* Fear question */}
            {step >= 4 && !showTyping && (
              <div className="max-w-[85%]">
                <div className="px-4 py-3 rounded-2xl rounded-tl-none text-sm text-gray-200"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  Ótimo! Antes do primeiro desafio, me conta: qual é o seu maior medo no ambiente de trabalho?
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {step < 3 && !showTyping && (
              <button onClick={advanceStep}
                className="w-full py-2 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                continuar...
              </button>
            )}

            {step === 3 && (
              <ActionButton onClick={confirmReady} className="w-full justify-center">
                Sim, estou pronto!
              </ActionButton>
            )}

            {step >= 4 && (
              <>
                <p className="text-white/40 text-xs">Escolha uma resposta:</p>
                {FEAR_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => setFear(opt)}
                    className="text-left px-4 py-3 rounded-lg text-sm transition-all duration-200"
                    style={{
                      background: selectedFear === opt ? "rgba(200,80,120,0.25)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedFear === opt ? "rgba(220,100,140,0.7)" : "rgba(255,255,255,0.1)"}`,
                      color: selectedFear === opt ? "#f9a8d4" : "rgba(255,255,255,0.7)",
                    }}>
                    {opt}
                  </button>
                ))}
                <ActionButton onClick={startGame} disabled={!selectedFear} className="w-full justify-center mt-1">
                  Responder e ir para o 1º desafio →
                </ActionButton>
              </>
            )}
          </div>
        </GamePanel>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <MetricsSidebar
            metrics={gameState.metrics}
            currentScenario={0}
            totalScenarios={gameState.totalScenarios}
            precision={50}
          />
          {/* Profile card */}
          <div className="w-56 rounded-xl p-4"
            style={{ background: "rgba(20,10,50,0.8)", border: "1px solid rgba(120,80,200,0.4)" }}>
            <p className="text-white/50 text-xs mb-3 font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Courier New', monospace" }}>Seu perfil</p>
            {[
              ["Arquétipo", gameState.archetype === "estagiario" ? "Estagiário Caótico"
                : gameState.archetype === "lider" ? "Líder Diplomata" : "Especialista Sincerão"],
              ["Empresa", `${companyName} · ${gameState.companySize}`],
              ["Setor", gameState.sector],
            ].map(([k, v]) => (
              <div key={k} className="mb-3 pb-3 border-b border-white/10 last:border-0 last:mb-0 last:pb-0">
                <p className="text-white/40 text-xs">{k}</p>
                <p className="text-white text-sm font-semibold capitalize">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
