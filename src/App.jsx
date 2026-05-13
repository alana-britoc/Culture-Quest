import { useState } from "react";
import { NavBar, ScreenTransition } from "./components/UI";
import { MissionPage, NewsPage, TutorialPage, ContactPage } from "./components/StaticPages";
import HomeScreen from "./screens/HomeScreen";
import ArchetypeScreen from "./screens/ArchetypeScreen";
import ConfigScreen from "./screens/ConfigScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import GameplayScreen from "./screens/GameplayScreen";
import ResultScreen from "./screens/ResultScreen";

export const SCREENS = {
  HOME: "home", ARCHETYPE: "archetype", CONFIG: "config",
  ONBOARDING: "onboarding", GAMEPLAY: "gameplay", RESULT: "result",
};

const STATIC_PAGES = ["mission", "news", "tutorial", "contact"];

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [page, setPage] = useState(null);
  const [gameState, setGameState] = useState({
    archetype: null, companySize: null, sector: null,
    metrics: { reputacao: 50, cultura: 50, etica: 50, produtividade: 50 },
    precision: 0, totalScenarios: 5, currentScenario: 0, scenarioHistory: [],
  });

  const updateGameState = (p) => setGameState((s) => ({ ...s, ...p }));
  const updateMetrics = (d) => setGameState((s) => ({
    ...s, metrics: Object.fromEntries(
      Object.entries(s.metrics).map(([k, v]) => [k, Math.min(100, Math.max(0, v + (d[k] ?? 0)))])
    ),
  }));
  const navigate = (s) => { setPage(null); setScreen(s); };
  const handleNavBar = (id) => {
    if (id === "home") { setPage(null); setScreen(SCREENS.HOME); return; }
    if (STATIC_PAGES.includes(id)) { setPage(id); return; }
  };

  const activePage = page ?? screen;
  const sp = { gameState, updateGameState, updateMetrics, navigate, SCREENS, onNavigate: handleNavBar, activePage };

  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <NavBar onNavigate={handleNavBar} activePage={activePage} />

      {page === "mission"  && <MissionPage />}
      {page === "news"     && <NewsPage />}
      {page === "tutorial" && <TutorialPage onStart={() => { setPage(null); setScreen(SCREENS.ARCHETYPE); }} />}
      {page === "contact"  && <ContactPage />}

      {!page && screen === SCREENS.HOME       && <ScreenTransition key="h"><HomeScreen      {...sp}/></ScreenTransition>}
      {!page && screen === SCREENS.ARCHETYPE  && <ScreenTransition key="a"><ArchetypeScreen {...sp}/></ScreenTransition>}
      {!page && screen === SCREENS.CONFIG     && <ScreenTransition key="c"><ConfigScreen    {...sp}/></ScreenTransition>}
      {!page && screen === SCREENS.ONBOARDING && <ScreenTransition key="o"><OnboardingScreen{...sp}/></ScreenTransition>}
      {!page && screen === SCREENS.GAMEPLAY   && <ScreenTransition key="g"><GameplayScreen  {...sp}/></ScreenTransition>}
      {!page && screen === SCREENS.RESULT     && <ScreenTransition key="r"><ResultScreen    {...sp}/></ScreenTransition>}
    </div>
  );
}
