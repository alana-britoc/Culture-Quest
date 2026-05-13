const BACKEND_URL = window.location.hostname === "localhost"
  ? "http://localhost:3001/api/chat"
  : "/api/chat";

// ── Erros amigáveis ──────────────────────────────────────────────────────────

export class GameError extends Error {
  constructor(message, type, retryable = false) {
    super(message);
    this.type = type;
    this.retryable = retryable;
  }
}

const ERROR_MAP = {
  rate_limit: {
    message: "A IA precisou de uma pausa! O limite de uso diario foi atingido. Tente novamente em alguns segundos.",
    retryable: true,
  },
  network: {
    message: "Sem conexao com o servidor. Verifique sua internet e tente novamente.",
    retryable: true,
  },
  auth: {
    message: "Erro de configuracao com a IA. Avise quem configurou o jogo!",
    retryable: false,
  },
  parse: {
    message: "A IA voltou uma resposta maluca e nao conseguimos entender. Tente de novo!",
    retryable: true,
  },
  server: {
    message: "O servidor esta com problemas. Tente novamente em alguns segundos.",
    retryable: true,
  },
  timeout: {
    message: "A IA demorou demais pra responder. Tente novamente!",
    retryable: true,
  },
  unknown: {
    message: "Algo deu errado, mas nao sabemos o que. Tente de novo!",
    retryable: true,
  },
};

function handleError(err) {
  // Rate limit
  if (err?.message?.includes("rate_limit") || err?.message?.includes("429")) {
    throw new GameError(ERROR_MAP.rate_limit.message, "rate_limit", true);
  }
  // Auth
  if (err?.message?.includes("401") || err?.message?.includes("403")) {
    throw new GameError(ERROR_MAP.auth.message, "auth", false);
  }
  // Network
  if (err?.message?.includes("Failed to fetch") || err?.message?.includes("NetworkError") || err?.message?.includes("fetch failed")) {
    throw new GameError(ERROR_MAP.network.message, "network", true);
  }
  // Server
  if (err?.message?.includes("500") || err?.message?.includes("502") || err?.message?.includes("503")) {
    throw new GameError(ERROR_MAP.server.message, "server", true);
  }
  // Fallback
  throw new GameError(ERROR_MAP.unknown.message, "unknown", true);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function callAI(systemPrompt, userMessage, maxTokens = 800) {
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, userMessage, maxTokens }),
    });

    if (!res.ok) {
      handleError(new Error(`API error: ${res.status}`));
    }

    const data = await res.json();
    return data.text ?? "";
  } catch (err) {
    if (err instanceof GameError) throw err;
    handleError(err);
  }
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
    estagiario: "Estagiário Caótico — acabou de chegar, já causou confusão. Rápido mas imprudente, engraçado sem querer.",
    lider: "Líder Diplomata — tem que agradar a todos e não agradar ninguém. O peso do mundo corporativo nos ombros.",
    sincerao: "Especialista Sincerão — fala o que pensa, o HR já mandou 3 emails sobre comunicação assertiva.",
  };
  return `
Você é o NARRADOR do jogo Culture Quest. Você é SARCASTICO, ENGRAÇADO e PONTUAL.
Você mistura situações sérias de negócios com eventos cômicos do dia a dia corporativo.
É como se fosse um narrador de reality show + podcast de humor corporativo.
Use linguagem natural e brasileira, mas NÃO force gírias corporativas — use com moderação.
Seja criativo e variado. Evite repetir os mesmos temas e situações.
Arquétipo do jogador: ${archetypeMap[gameState.archetype] ?? gameState.archetype}
Empresa: ${gameState.companySize} porte, setor de ${gameState.sector}
Métricas atuais: Reputação ${gameState.metrics.reputacao}%, Cultura ${gameState.metrics.cultura}%,
Ética ${gameState.metrics.etica}%, Produtividade ${gameState.metrics.produtividade}%
`.trim();
}

// ── Funções exportadas ───────────────────────────────────────────────────────

export async function generateOnboarding(gameState) {
  const archetypeMap = {
    estagiario: "Estagiário Caótico",
    lider: "Líder Diplomata",
    sincerao: "Especialista Sincerão",
  };
  const companyName = ({ tecnologia: "TechFlow", financeiro: "BankCorp", saude: "MedPlus" })[gameState.sector] ?? "RetailMax";

  const system = `Você é o gerente de RH de uma empresa brasileira. É simpático mas tem um humor sarcástico sutil.
A empresa se chama ${companyName}. O novo funcionário é um ${archetypeMap[gameState.archetype] ?? gameState.archetype}.
Empresa: ${gameState.companySize} porte, setor de ${gameState.sector}.
Responda APENAS com JSON válido, sem markdown.`;

  const user = `Gere a conversa de boas-vindas para o novo funcionário.
Preciso de:
1. "messages": 3 mensagens de boas-vindas (cada uma com 1-2 frases). A primeira saúda, a segunda explica a cultura da empresa com humor, a terceira diz que ele vai enfrentar desafios.
2. "question": Uma pergunta provocativa e divertida sobre o maior medo/ansiedade do funcionário no novo trabalho (ex: "Me conta, qual é aquela coisa que te dá gelo na barriga no primeiro dia?")
3. "options": 3 respostas divertidas e relatables que o funcionário pode escolher (ou ele pode escrever a própria)

Formato:
{
  "messages": ["mensagem 1", "mensagem 2", "mensagem 3"],
  "question": "pergunta provocativa aqui",
  "options": ["opção 1", "opção 2", "opção 3"]
}`;

  const raw = await callAI(system, user, 600);
  const parsed = parseJSON(raw);
  if (!parsed) throw new GameError(ERROR_MAP.parse.message, "parse", true);
  return parsed;
}

export async function generateScenario(gameState, scenarioIndex) {
  const system = `${buildContext(gameState)}
Você gera dilemas corporativos realistas em JSON. Responda APENAS com JSON válido, sem markdown, sem texto extra.`;

  const user = `Gere o dilema ${scenarioIndex + 1} de ${gameState.totalScenarios}.
Varie o TEMA a cada cenário. NÃO repita situações de cenarios anteriores. Use temas como: conflito interpessoal, prazos absurdos, ética no trabalho, falha de comunicação, política de escritório, reuniões inúteis, feedback inesperado, festas de escritório, home office vs presencial, promoções injustas, competição entre colegas, gestão de crise, relações com clientes, dress code, benefícios duvidosos, treinamentos obrigatórios.
Seja CRIATIVO e surpreendente. Cada cenário deve ser único e inesperado.
Misture humor com seriedade de forma natural.
${gameState.scenarioHistory?.length > 0 ? `Temas já usados (NÃO repita): ${gameState.scenarioHistory.map(h => h.prompt).join(" | ")}` : ""}

Formato obrigatório:
{
  "situation": "Texto do dilema (2-3 frases). Se isCritical for true, termine com uma pergunta provocativa tipo 'O que você diria?' ou 'Como você sairia dessa?'",
  "isCritical": false,
  "options": [
    {"id": "A", "text": "Texto da opção A"},
    {"id": "B", "text": "Texto da opção B"},
    {"id": "C", "text": "Texto da opção C"},
    {"id": "D", "text": "Texto da opção D"}
  ]
}

isCritical deve ser true APENAS no cenário ${Math.ceil(gameState.totalScenarios / 2)} (momento crítico de texto livre). Quando isCritical for true, o campo "situation" DEVE terminar com uma pergunta direta ao jogador (ex: "O que você faz?", "O que você diria para ele?", "Como você reage?").`;

  const raw = await callAI(system, user, 600);
  const parsed = parseJSON(raw);
  if (!parsed) throw new GameError(ERROR_MAP.parse.message, "parse", true);
  return parsed;
}

export async function evaluateChoice(gameState, situation, chosenOption) {
  const system = `${buildContext(gameState)}
Você avalia decisões corporativas. Responda APENAS com JSON válido, sem markdown.`;

  const user = `Situação: "${situation}"
Resposta do jogador: "${chosenOption.id}. ${chosenOption.text}"

Avalie com HUMOR. O feedback deve ser divertido, sarcástico mas útil. Varie o estilo do feedback — às vezes sarcástico, às vezes encorajador, às vezes chocada.
Retorne:
{
  "feedback": "Comentário de 1-2 frases DIVERTIDO sobre a escolha",
  "isCorrect": true ou false,
  "precisionDelta": número entre -20 e +20,
  "metricsDelta": {
    "reputacao": número entre -15 e +15,
    "cultura": número entre -15 e +15,
    "etica": número entre -15 e +15,
    "produtividade": número entre -15 e +15
  }
}`;

  const raw = await callAI(system, user, 400);
  const parsed = parseJSON(raw);
  if (!parsed) throw new GameError(ERROR_MAP.parse.message, "parse", true);
  return parsed;
}

export async function evaluateTextResponse(gameState, situation, playerText) {
  const system = `${buildContext(gameState)}
Você avalia respostas escritas em momentos críticos. Analise conteúdo, tom e eficácia.
Responda APENAS com JSON válido, sem markdown.`;

  const user = `Momento crítico: "${situation}"
Texto do jogador: "${playerText}"

Analise com sarcasmo e humor. Identifique o tom — é passivo-agressivo? É corporativês vazio? Tem coragem de verdade?
Retorne:
{
  "feedback": "Análise de 2-3 frases DIVERTIDA sobre o texto, destacando pontos fortes e fracos",
  "tone": "assertivo" | "passivo" | "agressivo" | "diplomático" | "passivo-agressivo",
  "suggestion": "Uma frase curta e engraçada sugerindo o que seria a resposta IDEAL (ex: 'O ideal seria ter dito X sem parecer que você quer demitir alguém')",
  "precisionDelta": número entre -25 e +25,
  "metricsDelta": {
    "reputacao": número entre -20 e +20,
    "cultura": número entre -20 e +20,
    "etica": número entre -20 e +20,
    "produtividade": número entre -20 e +20
  }
}`;

  const raw = await callAI(system, user, 500);
  const parsed = parseJSON(raw);
  if (!parsed) throw new GameError(ERROR_MAP.parse.message, "parse", true);
  return parsed;
}

export async function generateFinalReport(gameState) {
  const system = `${buildContext(gameState)}
Você é o narrador de um jogo corporativo divertido. Gere relatórios finais com HUMOR e personalidade.
Seja engraçado, use referências da cultura corporativa brasileira, mas mantenha feedback útil.
Responda APENAS com JSON válido, sem markdown.`;

  const history = gameState.scenarioHistory
    .map((h, i) => `Cenário ${i + 1}: ${h.answer} → ${h.evaluation?.feedback ?? ""}`)
    .join("\n");

  const user = `Histórico:\n${history}
Precisão final: ${gameState.precision}%
Métricas finais: ${JSON.stringify(gameState.metrics)}

Retorne:
{
  "summary": "Avaliação geral em 2-3 frases com humor",
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "improvements": ["melhoria 1", "melhoria 2"],
  "verdict": "Aprovado" | "Reprovado" | "Em desenvolvimento",
  "title": "UM TÍTULO ENGRAÇADO de 3-5 palavras que resume a jornada do jogador (ex: 'O Breque do Século', 'O CEO do Povo', 'O Quiet Quitter Supremo')",
  "narrative": "Um parágrafo de 3-4 frases contando o final da história do jogador como se fosse um final de filme. Seja criativo, dramático e engraçado. Use referências corporativas brasileiras."
}`;

  const raw = await callAI(system, user, 600);
  const parsed = parseJSON(raw);
  if (!parsed) throw new GameError(ERROR_MAP.parse.message, "parse", true);
  return parsed;
}
