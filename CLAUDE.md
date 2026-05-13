# Culture Quest

Simulador corporativo imersivo para desenvolvimento de soft skills e adaptação ao fit cultural. Projeto acadêmico da UPE Campus Garanhuns.

## Conceito

O jogo roda com IA (LLM via Ollama) que gera dilemas em tempo real e atua como personagens do ambiente corporativo (chefes, colegas, clientes). Mistura situacoes serias (etica, compliance) com eventos comicos (roubo de marmita, mensagens erradas no WhatsApp).

## Stack

- **Frontend + Backend unificado** - arquitetura monolitica, sem separacao de back/front
- **React 18** + **Vite** para UI
- **Tailwind CSS** para estilizacao
- **Express** para servidor (API + static files)
- **Ollama** como LLM local (gratis, sem API key, roda em localhost:11434)
  - Modelos recomendados: `llama3` ou `mistral`

## Game Loop

1. **Selecao de Arquetipo** - Estagiario Caotico, Lider Diplomata, Especialista Sincerao
2. **Configuracao** - Tamanho e setor da empresa
3. **Onboarding** - Chat introdutorio com IA
4. **Gameplay** - 5 cenarios com dilemas (multipla escolha + texto livre em momentos criticos)
5. **Resultado** - Relatorio final com metricas e "Final Narrativo"

## Metricas do Jogador

- **Reputacao** (Honra Corporativa) - estilo Red Dead Redemption
- **Cultura** (Capital Social)
- **Etica** (Bussola Etica)
- **Produtividade** (Lucro da Empresa)

## Finais Alternativos

- 90%+ precisao + honra alta = "O CEO Visionario"
- Baixa honra = "Demissao por Justa Causa"
- Baixo engajamento = "O Quiet Quitter"
- Entre outros baseados nas metricas finais

## Estrutura de Telas

1. **HomeScreen** - Landing page com "Start Game"
2. **ArchetypeScreen** - Cards dos 3 arquetipos
3. **ConfigScreen** - Tamanho/setor da empresa
4. **OnboardingScreen** - Chat introdutorio
5. **GameplayScreen** - Interface de chat (estilo Slack/Teams) com:
   - Mensagens da IA Narradora no centro
   - Botoes de multipla escolha ou caixa de texto livre na base
   - **Dashboard lateral** com barras de progresso (Reputacao, Cultura, Etica, Produtividade)
6. **ResultScreen** - Relatorio final com porcentagem, feedback IA, e final narrativo
7. **Paginas estaticas** - Missao, News, Tutorial, Contato

## Design

- **Fonte do design**: Figma (link a ser adicionado)
- Seguir fielmente o design do Figma para todas as telas
- Estilo de chat corporativo (inspirado em Slack/Teams)

## Convencoes

- JSX para componentes React
- Tailwind CSS para estilos (nao usar CSS modules ou styled-components)
- Hooks customizados para logica de IA
- Componentes reutilizaveis em `src/components/UI.jsx`
- Telas em `src/screens/`
- Paginas estaticas em `src/components/StaticPages.jsx`

## Comandos

```bash
# Frontend (dev)
npm run dev

# Backend
cd server && node server.js

# Build
npm run build
```

## Notas de Arquitetura

- O objetivo e manter tudo num unico projeto (monolito), sem separacao complexa de backend/frontend
- Ollama roda localmente - sem custos de API, sem limites de requisicoes
- A IA avalia nao apenas a resposta, mas o tom (agressivo, profissional, ironico, assertivo)
- O sistema de honra cria dilemas morais: atitudes antiéticas dao vantagem imediata mas destroem reputacao a longo prazo
