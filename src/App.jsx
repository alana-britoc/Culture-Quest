import { useState } from "react";
import { NavBar } from "./components/UI";
import { MissionPage, NewsPage, TutorialPage, ContactPage } from "./components/StaticPages";
import HomeScreen from "./screens/HomeScreen";
import ArchetypeScreen from "./screens/ArchetypeScreen";
import ConfigScreen from "./screens/ConfigScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import GameplayScreen from "./screens/GameplayScreen";
import ResultScreen from "./screens/ResultScreen";

export const SCREENS = {
  HOME: "home",
  ARCHETYPE: "archetype",
  CONFIG: "config",
  ONBOARDING: "onboarding",
  GAMEPLAY: "gameplay",
  RESULT: "result",
};

const STATIC_PAGES = ["mission", "news", "tutorial", "contact"];

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [page, setPage] = useState(null);
  const [gameState, setGameState] = useState({
    archetype: null,
    companySize: null,
    sector: null,
    metrics: { reputacao: 50, cultura: 50, etica: 50, produtividade: 50 },
    precision: 0,
    totalScenarios: 5,
    currentScenario: 0,
    scenarioHistory: [],
  });

  const updateGameState = (partial) =>
    setGameState((prev) => ({ ...prev, ...partial }));

  const updateMetrics = (delta) =>
    setGameState((prev) => ({
      ...prev,
      metrics: {
        reputacao:     Math.min(100, Math.max(0, prev.metrics.reputacao     + (delta.reputacao     ?? 0))),
        cultura:       Math.min(100, Math.max(0, prev.metrics.cultura       + (delta.cultura       ?? 0))),
        etica:         Math.min(100, Math.max(0, prev.metrics.etica         + (delta.etica         ?? 0))),
        produtividade: Math.min(100, Math.max(0, prev.metrics.produtividade + (delta.produtividade ?? 0))),
      },
    }));

  const navigate = (s) => { setPage(null); setScreen(s); };

  const handleNavBar = (id) => {
    if (id === "home") { setPage(null); setScreen(SCREENS.HOME); return; }
    if (STATIC_PAGES.includes(id)) { setPage(id); return; }
  };

  const activePage = page ?? screen;
  const screenProps = { gameState, updateGameState, updateMetrics, navigate, SCREENS, onNavigate: handleNavBar, activePage };

  return (
    <div className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #3b1f6e 0%, #6b2fa0 40%, #c0478a 100%)" }}>
      <NavBar onNavigate={handleNavBar} activePage={activePage} />

      {page === "mission"  && <MissionPage />}
      {page === "news"     && <NewsPage />}
      {page === "tutorial" && <TutorialPage onStart={() => { setPage(null); setScreen(SCREENS.ARCHETYPE); }} />}
      {page === "contact"  && <ContactPage />}

      {!page && screen === SCREENS.HOME       && <HomeScreen      {...screenProps} />}
      {!page && screen === SCREENS.ARCHETYPE  && <ArchetypeScreen {...screenProps} />}
      {!page && screen === SCREENS.CONFIG     && <ConfigScreen    {...screenProps} />}
      {!page && screen === SCREENS.ONBOARDING && <OnboardingScreen {...screenProps} />}
      {!page && screen === SCREENS.GAMEPLAY   && <GameplayScreen  {...screenProps} />}
      {!page && screen === SCREENS.RESULT     && <ResultScreen    {...screenProps} />}
    </div>
  );
}
