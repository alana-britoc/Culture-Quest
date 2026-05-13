/**
 * useClaudeAI — encapsula todas as chamadas à API da Anthropic.
 * Troca "claude-sonnet-4-20250514" por qualquer outro modelo se necessário.
 */

const BACKEND_URL = "http://localhost:3001/api/gemini";

// ── Helpers ──────────────────────────────────────────────────────────────────

async function callClaude(systemPrompt, userMessage, maxTokens = 800) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? "";
}

function parseJSON(raw) {
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// ── Contexto do jogo ─────────────────────────────────────────────────────────

function buildContext(gameState) {
  const archetypeMap = {
    estagiario: "Estagiário Caótico — aprende rápido sob pressão, erra com bom humor",
    lider: "Líder Diplomata — especialista em mediar conflitos éticos e de equipe",
    sincerao: "Especialista Sincerão — comunicação direta, quer manter integridade",
  };
  return `
Você é a IA Narradora do jogo Culture Quest.
Arquétipo do jogador: ${archetypeMap[gameState.archetype] ?? gameState.archetype}
Empresa: ${gameState.companySize} porte, setor de ${gameState.sector}
Métricas atuais: Reputação ${gameState.metrics.reputacao}%, Cultura ${gameState.metrics.cultura}%, 
Ética ${gameState.metrics.etica}%, Produtividade ${gameState.metrics.produtividade}%
`.trim();
}

// ── Funções exportadas ───────────────────────────────────────────────────────

/**
 * Gera um dilema corporativo com 4 opções de escolha.
 * Retorna: { situation, options: [{id,text}], isCritical }
 */
export async function generateScenario(gameState, scenarioIndex) {
  const system = `${buildContext(gameState)}
Você gera dilemas corporativos realistas em JSON. Responda APENAS com JSON válido, sem markdown, sem texto extra.`;

  const user = `Gere o dilema ${scenarioIndex + 1} de ${gameState.totalScenarios}.
Varie o tema: conflito de equipe, prazo, ética, comunicação, decisão estratégica.
Use linguagem direta e informal, tom do arquétipo.

Formato obrigatório:
{
  "situation": "Texto do dilema (2-3 frases)",
  "isCritical": false,
  "options": [
    {"id": "A", "text": "Texto da opção A"},
    {"id": "B", "text": "Texto da opção B"},
    {"id": "C", "text": "Texto da opção C"},
    {"id": "D", "text": "Texto da opção D"}
  ]
}

isCritical deve ser true no cenário ${Math.ceil(gameState.totalScenarios / 2)} (momento crítico de texto livre).`;

  const raw = await callClaude(system, user, 600);
  const parsed = parseJSON(raw);
  if (!parsed) throw new Error("Resposta inválida da IA ao gerar cenário");
  return parsed;
}

/**
 * Avalia a escolha de múltipla opção do jogador.
 * Retorna: { feedback, metricsDelta, precisionDelta, isCorrect }
 */
export async function evaluateChoice(gameState, situation, chosenOption) {
  const system = `${buildContext(gameState)}
Você avalia decisões corporativas. Responda APENAS com JSON válido, sem markdown.`;

  const user = `Situação: "${situation}"
Resposta do jogador: "${chosenOption.id}. ${chosenOption.text}"

Avalie levando em conta o arquétipo e o contexto da empresa.
Retorne:
{
  "feedback": "Comentário de 1-2 frases sobre a escolha, no tom do narrador",
  "isCorrect": true ou false,
  "precisionDelta": número entre -20 e +20,
  "metricsDelta": {
    "reputacao": número entre -15 e +15,
    "cultura": número entre -15 e +15,
    "etica": número entre -15 e +15,
    "produtividade": número entre -15 e +15
  }
}`;

  const raw = await callClaude(system, user, 400);
  const parsed = parseJSON(raw);
  if (!parsed) throw new Error("Resposta inválida da IA ao avaliar escolha");
  return parsed;
}

/**
 * Avalia texto livre do momento crítico.
 * Retorna: { feedback, tone, metricsDelta, precisionDelta }
 */
export async function evaluateTextResponse(gameState, situation, playerText) {
  const system = `${buildContext(gameState)}
Você avalia respostas escritas em momentos críticos. Analise conteúdo, tom e eficácia.
Responda APENAS com JSON válido, sem markdown.`;

  const user = `Momento crítico: "${situation}"
Texto do jogador: "${playerText}"

Avalie: assertividade, ética, clareza, adequação ao arquétipo.
Retorne:
{
  "feedback": "Análise de 2-3 frases sobre o texto, destacando pontos fortes e fracos",
  "tone": "assertivo" | "passivo" | "agressivo" | "diplomático" | "evasivo",
  "precisionDelta": número entre -25 e +25,
  "metricsDelta": {
    "reputacao": número entre -20 e +20,
    "cultura": número entre -20 e +20,
    "etica": número entre -20 e +20,
    "produtividade": número entre -20 e +20
  }
}`;

  const raw = await callClaude(system, user, 500);
  const parsed = parseJSON(raw);
  if (!parsed) throw new Error("Resposta inválida da IA ao avaliar texto");
  return parsed;
}

/**
 * Gera o feedback final da jornada.
 * Retorna: { summary, strengths, improvements, verdict }
 */
export async function generateFinalReport(gameState) {
  const system = `${buildContext(gameState)}
Você gera relatórios finais de desempenho. Seja específico, use o histórico de escolhas.
Responda APENAS com JSON válido, sem markdown.`;

  const history = gameState.scenarioHistory
    .map((h, i) => `Cenário ${i + 1}: ${h.answer} → ${h.evaluation?.feedback ?? ""}`)
    .join("\n");

  const user = `Histórico:\n${history}
Precisão final: ${gameState.precision}%
Métricas finais: ${JSON.stringify(gameState.metrics)}

Retorne:
{
  "summary": "Avaliação geral em 2-3 frases",
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "improvements": ["melhoria 1", "melhoria 2"],
  "verdict": "Aprovado" | "Reprovado" | "Em desenvolvimento"
}`;

  const raw = await callClaude(system, user, 500);
  const parsed = parseJSON(raw);
  if (!parsed) throw new Error("Resposta inválida da IA ao gerar relatório");
  return parsed;
}
