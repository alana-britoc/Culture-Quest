import { useState, useEffect } from "react";
import { NavBar, GamePanel, ActionButton, MetricBar, LoadingDots } from "../components/UI";
import { generateFinalReport } from "../hooks/useClaudeAI";
import { SCREENS } from "../App";

export default function ResultScreen({ gameState, updateGameState, navigate }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateFinalReport(gameState)
      .then(setReport)
      .catch(() => setReport({
        summary: "Jornada concluída! Confira suas métricas acima.",
        strengths: ["Completou todos os cenários"],
        improvements: ["Continue praticando soft skills"],
        verdict: gameState.precision >= 90 ? "Aprovado" : "Em desenvolvimento",
      }))
      .finally(() => setLoading(false));
  }, []);

  const verdictColor = report?.verdict === "Aprovado" ? "#4ade80"
    : report?.verdict === "Reprovado" ? "#f87171" : "#facc15";

  const resetGame = () => {
    updateGameState({
      archetype: null, companySize: null, sector: null,
      metrics: { reputacao: 50, cultura: 50, etica: 50, produtividade: 50 },
      precision: 0, currentScenario: 0, scenarioHistory: [],
    });
    navigate(SCREENS.HOME);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex items-center justify-center pt-20 px-8 py-8">
        <div className="w-full max-w-3xl">
          <GamePanel className="p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl">🚀</div>
              <div>
                <p className="text-white/50 text-sm">Jornada concluída</p>
                <h2 className="text-white font-black text-2xl"
                  style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>
                  SUA JORNADA CHEGOU AO FIM
                </h2>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Precisão",     value: gameState.precision },
                { label: "Reputação",    value: gameState.metrics.reputacao },
                { label: "Ética",        value: gameState.metrics.etica },
                { label: "Cultura",      value: gameState.metrics.cultura },
              ].map(({ label, value }) => {
                const color = value >= 70 ? "#4ade80" : value >= 40 ? "#facc15" : "#f87171";
                return (
                  <div key={label} className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-white/50 text-xs mb-1">{label}</p>
                    <p className="font-black text-3xl" style={{ color, fontFamily: "'Courier New', monospace" }}>
                      {value}%
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Full metric bars */}
            <div className="mb-8">
              <MetricBar label="Produtividade" value={gameState.metrics.produtividade} />
            </div>

            {/* AI Report */}
            <div className="rounded-xl p-6 mb-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <LoadingDots />
                  <p className="text-white/40 text-sm">Gerando relatório final...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white font-bold text-sm">Feedback da IA</p>
                    {report?.verdict && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${verdictColor}22`, color: verdictColor, border: `1px solid ${verdictColor}44` }}>
                        {report.verdict}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{report?.summary}</p>
                  {report?.strengths?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-green-400 text-xs font-bold mb-2">✓ Pontos fortes</p>
                      {report.strengths.map((s, i) => (
                        <p key={i} className="text-gray-400 text-xs ml-3">• {s}</p>
                      ))}
                    </div>
                  )}
                  {report?.improvements?.length > 0 && (
                    <div>
                      <p className="text-yellow-400 text-xs font-bold mb-2">↑ Pontos de melhoria</p>
                      {report.improvements.map((s, i) => (
                        <p key={i} className="text-gray-400 text-xs ml-3">• {s}</p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <ActionButton variant="ghost" onClick={resetGame}>← Jogar novamente</ActionButton>
              <ActionButton onClick={resetGame}>Relatório completo →</ActionButton>
            </div>
          </GamePanel>
        </div>
      </div>
    </div>
  );
}
