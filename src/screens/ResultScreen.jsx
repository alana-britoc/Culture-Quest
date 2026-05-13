import { useState, useEffect } from "react";
import { ActionButton, MetricBar, LoadingDots } from "../components/UI";
import { generateFinalReport } from "../hooks/useClaudeAI";
import { SCREENS } from "../App";

export default function ResultScreen({ gameState, updateGameState, navigate }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNarrative, setShowNarrative] = useState(false);

  useEffect(() => {
    generateFinalReport(gameState)
      .then(setReport)
      .catch(() => setReport({
        summary: "Jornada concluida! A IA dormiu no ponto, mas suas metricas nao mentem.",
        strengths: ["Sobreviveu a todos os cenarios"],
        improvements: ["A IA nao quer julgar voce hoje"],
        verdict: gameState.precision >= 90 ? "Aprovado" : "Em desenvolvimento",
        title: "O Sobrevivente Corporativo",
        narrative: "Depois de 5 cenarios intensos, voce ainda esta de pe. Parabens? Talvez. O RH vai entrar em contato.",
      }))
      .finally(() => setLoading(false));
  }, []);

  const reset = () => {
    updateGameState({
      archetype: null, companySize: null, sector: null,
      metrics: { reputacao: 50, cultura: 50, etica: 50, produtividade: 50 },
      precision: 0, currentScenario: 0, scenarioHistory: [],
    });
    navigate(SCREENS.HOME);
  };

  const metrics = [
    { label: "Precisao",     value: gameState.precision, emoji: "🎯" },
    { label: "Reputacao",    value: gameState.metrics.reputacao, emoji: "👑" },
    { label: "Etica",        value: gameState.metrics.etica, emoji: "⚖️" },
    { label: "Cultura",      value: gameState.metrics.cultura, emoji: "🤝" },
  ];

  const verdictStyle = report?.verdict === "Aprovado"
    ? "text-green-400 bg-green-500/10 border-green-500/20"
    : report?.verdict === "Reprovado"
    ? "text-red-400 bg-red-500/10 border-red-500/20"
    : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

  const verdictEmoji = report?.verdict === "Aprovado" ? "🎉" : report?.verdict === "Reprovado" ? "💀" : "⚡";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-8">
      <div className="w-full max-w-3xl surface-card p-8 lg:p-10 animate-in-scale">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{verdictEmoji}</div>
          <p className="text-[11px] text-white/25 uppercase tracking-wider mb-2">Sua jornada acabou</p>
          {report?.title && !loading && (
            <h2 className="text-3xl font-black tracking-tight text-gradient">{report.title}</h2>
          )}
          {loading && <div className="flex justify-center py-4"><LoadingDots /></div>}
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map(({ label, value, emoji }) => {
            const color = value >= 70 ? "text-green-400" : value >= 40 ? "text-yellow-400" : "text-red-400";
            return (
              <div key={label} className="surface-elevated p-4 text-center">
                <p className="text-lg mb-0.5">{emoji}</p>
                <p className={`text-2xl font-bold font-mono ${color}`}>{value}<span className="text-sm opacity-40">%</span></p>
                <p className="text-[10px] text-white/25 mt-0.5">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Bars */}
        <div className="grid grid-cols-2 gap-x-8 mb-6">
          <MetricBar label="Produtividade" value={gameState.metrics.produtividade} />
          <MetricBar label="Reputacao"     value={gameState.metrics.reputacao} />
        </div>

        {/* AI Report */}
        {!loading && (
          <div className="surface-elevated p-5 mb-4 animate-in">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Feedback da IA</p>
              {report?.verdict && (
                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${verdictStyle}`}>{report.verdict}</span>
              )}
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-3">{report?.summary}</p>
            {report?.strengths?.length > 0 && (
              <div className="mb-2">
                {report.strengths.map((s,i) => <p key={i} className="text-xs text-green-400/60 ml-3 mb-0.5">+ {s}</p>)}
              </div>
            )}
            {report?.improvements?.length > 0 && (
              <div>
                {report.improvements.map((s,i) => <p key={i} className="text-xs text-yellow-400/50 ml-3 mb-0.5">↑ {s}</p>)}
              </div>
            )}
          </div>
        )}

        {/* Narrative ending - show on button click */}
        {showNarrative && report?.narrative && (
          <div className="surface-elevated p-5 mb-4 border-l-2 border-l-accent-500/40 animate-in-up">
            <p className="text-[10px] text-accent-400 uppercase tracking-widest font-bold mb-2 font-mono">Final narrativo</p>
            <p className="text-sm text-white/60 leading-relaxed italic">"{report.narrative}"</p>
          </div>
        )}

        <div className="flex justify-between">
          <ActionButton variant="ghost" onClick={reset}>← Jogar novamente</ActionButton>
          {!showNarrative ? (
            <ActionButton onClick={() => setShowNarrative(true)} disabled={loading}>Ver final narrativo →</ActionButton>
          ) : (
            <ActionButton onClick={reset}>Jogar novamente →</ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
