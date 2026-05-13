# Culture Quest 🎮

Simulador de cultura corporativa com IA real (Claude API).

## Setup rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar a API Key da Anthropic
# Crie um arquivo .env na raiz do projeto:
echo "VITE_ANTHROPIC_API_KEY=sua_chave_aqui" > .env

# 3. Rodar em dev
npm run dev
```

> Acesse http://localhost:5173

## ⚠️ API Key

Você precisa de uma chave da Anthropic em https://console.anthropic.com
Coloque em `.env` como `VITE_ANTHROPIC_API_KEY=sk-ant-...`

E atualize `src/hooks/useClaudeAI.js` para ler a variável:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-calls": "true",
},
```

## Estrutura

```
src/
  App.jsx                  # Roteamento e estado global
  components/UI.jsx        # Componentes reutilizáveis
  hooks/useClaudeAI.js     # Toda lógica de IA
  screens/
    HomeScreen.jsx         # Tela inicial
    ArchetypeScreen.jsx    # Escolha de arquétipo
    ConfigScreen.jsx       # Configuração de empresa
    OnboardingScreen.jsx   # Chat de boas-vindas
    GameplayScreen.jsx     # Loop principal do jogo
    ResultScreen.jsx       # Resultado final
```

## Fluxo do jogo

Home → Arquétipo → Configuração → Onboarding → Gameplay (×5) → Resultado
