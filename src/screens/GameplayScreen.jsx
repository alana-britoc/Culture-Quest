import { useState, useEffect } from "react";
import { NavBar, GamePanel, MetricsSidebar, ActionButton, OptionCard, LoadingDots } from "../components/UI";
import { generateScenario, evaluateChoice, evaluateTextResponse } from "../hooks/useClaudeAI";

// States do gameplay
const STATE = {
  LOADING_SCENARIO: "loading_scenario",
  CHOOSING:         "choosing",
  TEXT_INPUT:       "text_input",
  EVALUATING:       "evaluating",
  FEEDBACK:         "feedback",
};

export default function GameplayScreen({ gameState, updateGameState, updateMetrics, navigate, SCREENS, onNavigate, activePage }) {
  const [uiState, setUiState]       = useState(STATE.LOADING_SCENARIO);
  const [scenario, setScenario]     = useState(null);
  const [selected, setSelected]     = useState(null);
  const [textInput, setTextInput]   = useState("");
  const [feedback, setFeedback]     = useState(null);
  const [error, setError]           = useState(null);

  // Load first scenario on mount
  useEffect(() => { loadScenario(); }, []);

  const loadScenario = async () => {
    setUiState(STATE.LOADING_SCENARIO);
    setSelected(null);
    setTextInput("");
    setFeedback(null);
    setError(null);
    try {
      const s = await generateScenario(gameState, gameState.currentScenario);
      setScenario(s);
      setUiState(s.isCritical ? STATE.TEXT_INPUT : STATE.CHOOSING);
    } catch (e) {
      setError("Erro ao carregar cenário. Verifique sua conexão.");
    }
  };

  const handleSubmitChoice = async () => {
    if (!selected) return;
    setUiState(STATE.EVALUATING);
    try {
      const eval_ = await evaluateChoice(gameState, scenario.situation, selected);
      setFeedback(eval_);
      updateMetrics(eval_.metricsDelta ?? {});
      updateGameState({
        precision: Math.min(100, Math.max(0, gameState.precision + (eval_.precisionDelta ?? 0))),
        scenarioHistory: [...gameState.scenarioHistory, {
          prompt: scenario.situation,
          answer: `${selected.id}. ${selected.text}`,
          evaluation: eval_,
        }],
      });
      setUiState(STATE.FEEDBACK);
    } catch (e) {
      setError("Erro ao avaliar resposta. Tente novamente.");
      setUiState(STATE.CHOOSING);
    }
  };

  const handleSubmitText = async () => {
    if (!textInput.trim()) return;
    setUiState(STATE.EVALUATING);
    try {
      const eval_ = await evaluateTextResponse(gameState, scenario.situation, textInput);
      setFeedback(eval_);
      updateMetrics(eval_.metricsDelta ?? {});
      updateGameState({
        precision: Math.min(100, Math.max(0, gameState.precision + (eval_.precisionDelta ?? 0))),
        scenarioHistory: [...gameState.scenarioHistory, {
          prompt: scenario.situation,
          answer: textInput,
          evaluation: eval_,
        }],
      });
      setUiState(STATE.FEEDBACK);
    } catch (e) {
      setError("Erro ao avaliar resposta. Tente novamente.");
      setUiState(STATE.TEXT_INPUT);
    }
  };

  const handleNext = () => {
    const nextScenario = gameState.currentScenario + 1;
    if (nextScenario >= gameState.totalScenarios) {
      navigate(SCREENS.RESULT);
    } else {
      updateGameState({ currentScenario: nextScenario });
      loadScenario();
    }
  };

  const isCritical = scenario?.isCritical;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex gap-6 px-8 pt-24 pb-8 max-w-6xl mx-auto w-full">

        {/* Main panel */}
        <GamePanel className="flex-1 flex flex-col p-6">

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-red-300 text-sm"
              style={{ background: "rgba(200,50,50,0.2)", border: "1px solid rgba(200,50,50,0.4)" }}>
              {error}
              <button onClick={loadScenario} className="ml-3 underline text-red-200">Tentar novamente</button>
            </div>
          )}

          {/* Loading scenario */}
          {uiState === STATE.LOADING_SCENARIO && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <LoadingDots />
              <p className="text-white/40 text-sm">Gerando cenário...</p>
            </div>
          )}

          {/* Scenario card */}
          {scenario && uiState !== STATE.LOADING_SCENARIO && (
            <>
              <div className="rounded-xl p-5 mb-6 flex gap-4"
                style={{
                  background: isCritical ? "rgba(200,50,80,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isCritical ? "rgba(220,80,100,0.5)" : "rgba(255,255,255,0.1)"}`,
                }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  {isCritical ? "⚠️" : "💼"}
                </div>
                <div>
                  {isCritical && (
                    <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ fontFamily: "'Courier New', monospace" }}>
                      Momento crítico
                    </p>
                  )}
                  <p className="text-gray-200 text-sm leading-relaxed">{scenario.situation}</p>
                </div>
              </div>

              {/* Multiple choice */}
              {uiState === STATE.CHOOSING && (
                <div className="flex flex-col gap-3 flex-1">
                  {scenario.options?.map((opt) => (
                    <OptionCard key={opt.id} label={opt.id} text={opt.text}
                      selected={selected?.id === opt.id}
                      onClick={() => setSelected(opt)} />
                  ))}
                  <div className="mt-auto pt-4 flex justify-end">
                    <ActionButton onClick={handleSubmitChoice} disabled={!selected}>
                      Confirmar →
                    </ActionButton>
                  </div>
                </div>
              )}

              {/* Free text */}
              {uiState === STATE.TEXT_INPUT && (
                <div className="flex flex-col gap-4 flex-1">
                  <p className="text-white/50 text-sm">Justifique sua decisão em texto:</p>
                  <textarea
                    className="flex-1 min-h-32 p-4 rounded-xl text-sm text-gray-200 resize-none outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                    placeholder="Escreva sua resposta aqui. A IA vai avaliar o tom e a eficácia..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <ActionButton onClick={handleSubmitText} disabled={textInput.trim().length < 10}>
                      Enviar resposta
                    </ActionButton>
                  </div>
                </div>
              )}

              {/* Evaluating */}
              {uiState === STATE.EVALUATING && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <LoadingDots />
                  <p className="text-white/40 text-sm">A IA está avaliando sua resposta...</p>
                </div>
              )}

              {/* Feedback */}
              {uiState === STATE.FEEDBACK && feedback && (
                <div className="flex flex-col gap-4 flex-1">
                  <div className="rounded-xl p-5"
                    style={{
                      background: feedback.isCorrect ? "rgba(80,200,120,0.1)" : "rgba(200,80,100,0.1)",
                      border: `1px solid ${feedback.isCorrect ? "rgba(80,200,120,0.4)" : "rgba(200,80,100,0.4)"}`,
                    }}>
                    <p className="font-bold text-sm mb-2"
                      style={{ color: feedback.isCorrect ? "#4ade80" : "#f87171" }}>
                      {feedback.isCorrect ? "✓ Boa decisão!" : "✗ Poderia ter ido melhor"}
                      {feedback.tone && ` · Tom: ${feedback.tone}`}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">{feedback.feedback}</p>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <ActionButton onClick={handleNext}>
                      {gameState.currentScenario + 1 >= gameState.totalScenarios
                        ? "Ver resultado final →"
                        : "Próximo cenário →"}
                    </ActionButton>
                  </div>
                </div>
              )}
            </>
          )}
        </GamePanel>

        {/* Sidebar */}
        <MetricsSidebar
          metrics={gameState.metrics}
          currentScenario={gameState.currentScenario + 1}
          totalScenarios={gameState.totalScenarios}
          precision={gameState.precision}
        />
      </div>
    </div>
  );
}
