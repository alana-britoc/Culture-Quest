import { useState, useEffect } from "react";
import { MetricsSidebar, ActionButton, OptionCard, LoadingDots } from "../components/UI";
import { generateScenario, evaluateChoice, evaluateTextResponse, GameError } from "../hooks/useClaudeAI";

const S = { LOADING: 0, CHOOSING: 1, TEXT: 2, EVALUATING: 3, FEEDBACK: 4 };

const REACTIONS = {
  good: ["😎", "🔥", "💪", "🎯", "👏"],
  bad:  ["😬", "💀", "🫠", "😵", "🫣"],
};

export default function GameplayScreen({ gameState, updateGameState, updateMetrics, navigate, SCREENS }) {
  const [state, setState]       = useState(S.LOADING);
  const [scenario, setScenario] = useState(null);
  const [selected, setSelected] = useState(null);
  const [text, setText]         = useState("");
  const [feedback, setFeedback] = useState(null);
  const [error, setError]       = useState(null);
  const [reaction, setReaction] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setState(S.LOADING); setSelected(null); setText(""); setFeedback(null); setError(null); setReaction(null);
    try {
      const s = await generateScenario(gameState, gameState.currentScenario);
      setScenario(s);
      setState(s.isCritical ? S.TEXT : S.CHOOSING);
    } catch (err) {
      const msg = err instanceof GameError ? err.message : "Algo deu errado ao gerar o cenario.";
      const canRetry = err instanceof GameError ? err.retryable : true;
      setError({ msg, canRetry });
      setState(S.CHOOSING);
    }
  };

  const submitChoice = async () => {
    if (!selected) return;
    setState(S.EVALUATING);
    try {
      const ev = await evaluateChoice(gameState, scenario.situation, selected);
      applyResult(ev, `${selected.id}. ${selected.text}`);
    } catch (err) {
      const msg = err instanceof GameError ? err.message : "Erro ao avaliar sua resposta.";
      setError({ msg, canRetry: true });
      setState(S.CHOOSING);
    }
  };

  const submitText = async () => {
    if (!text.trim()) return;
    setState(S.EVALUATING);
    try {
      const ev = await evaluateTextResponse(gameState, scenario.situation, text);
      applyResult(ev, text);
    } catch (err) {
      const msg = err instanceof GameError ? err.message : "Erro ao avaliar seu texto.";
      setError({ msg, canRetry: true });
      setState(S.TEXT);
    }
  };

  const applyResult = (ev, answer) => {
    setFeedback(ev);
    const list = ev.isCorrect ? REACTIONS.good : REACTIONS.bad;
    setReaction(list[Math.floor(Math.random() * list.length)]);
    updateMetrics(ev.metricsDelta ?? {});
    updateGameState({
      precision: Math.min(100, Math.max(0, gameState.precision + (ev.precisionDelta ?? 0))),
      scenarioHistory: [...gameState.scenarioHistory, { prompt: scenario.situation, answer, evaluation: ev }],
    });
    setState(S.FEEDBACK);
  };

  const next = () => {
    const n = gameState.currentScenario + 1;
    if (n >= gameState.totalScenarios) navigate(SCREENS.RESULT);
    else { updateGameState({ currentScenario: n }); load(); }
  };

  const critical = scenario?.isCritical;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-6 pt-24 pb-8 max-w-5xl mx-auto w-full">
      <div className="flex-1 surface-card p-5 flex flex-col min-h-[500px]">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] text-white/25 font-mono">Cenario {gameState.currentScenario + 1}/{gameState.totalScenarios}</span>
          <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full bg-accent-500/60 transition-all duration-500"
              style={{ width: `${((gameState.currentScenario) / gameState.totalScenarios) * 100}%` }} />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl text-sm text-red-400 bg-red-500/[0.06] border border-red-500/15 animate-in">
            <p>{typeof error === "string" ? error : error.msg}</p>
            {typeof error !== "string" && error.canRetry && (
              <button onClick={load} className="mt-2 text-xs text-red-400/60 hover:text-red-400 underline underline-offset-2 transition-colors">Tentar novamente</button>
            )}
          </div>
        )}

        {state === S.LOADING && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <LoadingDots />
            <p className="text-sm text-white/25">Gerando cenario...</p>
          </div>
        )}

        {scenario && state !== S.LOADING && (
          <>
            {/* Scenario */}
            <div className={`rounded-xl p-5 mb-5 animate-in ${
              critical ? "bg-red-500/[0.04] border border-red-500/15" : "surface-elevated"
            }`}>
              {critical && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono animate-glow">Momento critico</span>
                  <span className="text-xs">✍️</span>
                </div>
              )}
              <p className="text-sm text-white/70 leading-relaxed">{scenario.situation}</p>
            </div>

            {/* Choice */}
            {state === S.CHOOSING && (
              <div className="flex flex-col gap-2.5 flex-1">
                {scenario.options?.map(o => <OptionCard key={o.id} label={o.id} text={o.text} selected={selected?.id===o.id} onClick={()=>setSelected(o)} />)}
                <div className="mt-auto pt-4 flex justify-end">
                  <ActionButton onClick={submitChoice} disabled={!selected}>Confirmar</ActionButton>
                </div>
              </div>
            )}

            {/* Text */}
            {state === S.TEXT && (
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-accent-400 text-xs">✍️</span>
                  <p className="text-xs text-white/40">Sua vez — escreva o que voce diria ou faria nessa situacao:</p>
                </div>
                <textarea className="flex-1 min-h-32 p-4 rounded-xl text-sm text-white/75 resize-none bg-white/[0.03] border border-white/[0.08] focus:border-accent-500/40 transition-colors placeholder-white/15"
                  placeholder="O que voce faria? Fale como se estivesse la..."
                  value={text} onChange={e => setText(e.target.value)} />
                <p className="text-[10px] text-white/20 text-right">{text.trim().length < 10 ? `minimo 10 caracteres (${text.trim().length})` : `${text.trim().length} caracteres — pode enviar!`}</p>
                <div className="flex justify-end">
                  <ActionButton onClick={submitText} disabled={text.trim().length < 10}>Enviar minha resposta</ActionButton>
                </div>
              </div>
            )}

            {/* Evaluating */}
            {state === S.EVALUATING && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <LoadingDots />
                <p className="text-sm text-white/25">A IA esta julgando voce...</p>
              </div>
            )}

            {/* Feedback */}
            {state === S.FEEDBACK && feedback && (
              <div className="flex flex-col gap-4 flex-1 animate-in">
                <div className={`rounded-xl p-5 ${
                  feedback.isCorrect ? "bg-green-500/[0.05] border border-green-500/15" : "bg-red-500/[0.05] border border-red-500/15"
                }`}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{reaction}</span>
                    <div>
                      <p className={`text-sm font-semibold ${feedback.isCorrect ? "text-green-400" : "text-red-400"}`}>
                        {feedback.isCorrect ? "Boa jogada" : "Ops..."}
                        {feedback.tone && <span className="text-white/20 font-normal ml-2 text-xs">tom: {feedback.tone}</span>}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed ml-10">{feedback.feedback}</p>
                  {feedback.suggestion && (
                    <div className="ml-10 mt-3 px-3 py-2 rounded-lg bg-accent-500/[0.06] border border-accent-500/15">
                      <p className="text-[11px] text-accent-400/60 mb-0.5 font-mono">💡 O ideal seria:</p>
                      <p className="text-xs text-white/40">{feedback.suggestion}</p>
                    </div>
                  )}
                </div>
                <div className="mt-auto flex justify-end">
                  <ActionButton onClick={next}>
                    {gameState.currentScenario + 1 >= gameState.totalScenarios ? "Ver meu destino →" : "Proximo →"}
                  </ActionButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <MetricsSidebar metrics={gameState.metrics} currentScenario={gameState.currentScenario + 1} totalScenarios={gameState.totalScenarios} precision={gameState.precision} />
    </div>
  );
}
