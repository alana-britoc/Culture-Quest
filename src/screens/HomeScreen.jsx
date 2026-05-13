import { NavBar, ActionButton } from "../components/UI";

export default function HomeScreen({ navigate, SCREENS, onNavigate, activePage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onNavigate={onNavigate} activePage={activePage} />
      <div className="flex-1 flex items-center justify-between px-20 pt-20">
        {/* Left: title */}
        <div className="flex flex-col gap-6 max-w-lg">
          <h1 className="font-black leading-none"
            style={{
              fontSize: "clamp(60px, 8vw, 100px)",
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              color: "white",
              textShadow: "0 4px 30px rgba(200,80,180,0.5)",
              letterSpacing: "-0.02em",
            }}>
            CULTURE<br />QUEST
          </h1>
          <p className="text-white/70 text-lg">Simulador de cultura corporativa</p>
          <ActionButton onClick={() => navigate(SCREENS.ARCHETYPE)} className="w-fit text-base px-8 py-4">
            Iniciar Jogo
          </ActionButton>
        </div>

        {/* Right: decorative illustration placeholder */}
        <div className="relative w-96 h-96 flex items-center justify-center opacity-80">
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(180,80,200,0.3) 0%, transparent 70%)" }} />
          {/* Abstract corporate icons */}
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" opacity="0.6">
            <circle cx="200" cy="80" r="60" fill="rgba(220,120,100,0.4)" />
            <circle cx="180" cy="100" r="40" fill="rgba(200,100,80,0.3)" />
            <ellipse cx="220" cy="150" rx="80" ry="20" rx2="80"
              fill="rgba(180,180,220,0.2)" transform="rotate(-20 220 150)" />
            <rect x="100" y="130" width="10" height="140" rx="5" fill="rgba(255,255,255,0.15)" transform="rotate(-15 100 130)" />
            {/* Chat bubble */}
            <rect x="140" y="140" width="90" height="50" rx="10" fill="rgba(200,200,240,0.2)" />
            <rect x="150" y="155" width="50" height="4" rx="2" fill="rgba(200,200,240,0.5)" />
            <rect x="150" y="165" width="35" height="4" rx="2" fill="rgba(200,200,240,0.4)" />
          </svg>
          {/* Two people illustration using divs */}
          <div className="absolute bottom-4 flex gap-4 items-end">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, #e87060, #c05040)" }} />
              <div className="w-8 h-16 rounded-t-lg" style={{ background: "linear-gradient(135deg, #e87060, #c05040)" }} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, #60a0e8, #4080c8)" }} />
              <div className="w-8 h-20 rounded-t-lg" style={{ background: "linear-gradient(135deg, #60a0e8, #4080c8)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
