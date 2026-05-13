// ─── NavBar ────────────────────────────────────────────────────────────────
export function NavBar({ onNavigate, activePage }) {
  const pages = [
    { id: "home",     label: "Home" },
    { id: "mission",  label: "Mission" },
    { id: "news",     label: "News" },
    { id: "tutorial", label: "Como jogar" },
    { id: "contact",  label: "Contatos" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6"
      style={{ background: "rgba(30,10,60,0.4)", backdropFilter: "blur(16px)" }}>
      {/* Logo */}
      <button onClick={() => onNavigate?.("home")} className="flex items-center gap-2">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="3" y="12" width="34" height="22" rx="6" stroke="white" strokeWidth="2.2" fill="none"/>
          <circle cx="12" cy="23" r="3.5" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="28" cy="23" r="3.5" stroke="white" strokeWidth="2" fill="none"/>
          <rect x="16" y="9" width="8" height="5" rx="2.5" fill="white" opacity="0.7"/>
          <rect x="8.5" y="19.5" width="2.5" height="7" rx="1.25" fill="white"/>
          <rect x="6.5" y="22" width="7" height="2.5" rx="1.25" fill="white"/>
          <rect x="25.5" y="22" width="7" height="2.5" rx="1.25" fill="white"/>
        </svg>
      </button>
      <div className="flex gap-10 text-white text-sm font-medium tracking-wide">
        {pages.map(({ id, label }) => (
          <button key={id} onClick={() => onNavigate?.(id)}
            className="transition-all duration-200 hover:opacity-100"
            style={{
              opacity: activePage === id ? 1 : 0.6,
              borderBottom: activePage === id ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
              paddingBottom: "2px",
            }}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── GamePanel ─────────────────────────────────────────────────────────────
export function GamePanel({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}
      style={{
        background: "linear-gradient(160deg, #1a1035 0%, #0f0820 100%)",
        border: "2px solid rgba(120,80,200,0.5)",
        borderRadius: "16px",
        boxShadow: "0 0 40px rgba(100,50,200,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}>
      {["top-0 left-0 rounded-tl-2xl", "top-0 right-0 rounded-tr-2xl",
        "bottom-0 left-0 rounded-bl-2xl", "bottom-0 right-0 rounded-br-2xl"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6`}
          style={{ background: "rgba(180,100,255,0.15)", border: "1px solid rgba(180,100,255,0.3)" }} />
      ))}
      {children}
    </div>
  );
}

// ─── PanelTitle ────────────────────────────────────────────────────────────
export function PanelTitle({ children }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="px-8 py-2 rounded-full text-white font-black text-xl tracking-widest uppercase"
        style={{
          background: "linear-gradient(90deg, #2a1a5e, #3d2080, #2a1a5e)",
          border: "1px solid rgba(150,100,255,0.5)",
          letterSpacing: "0.15em",
          fontFamily: "'Courier New', monospace",
        }}>
        {children}
      </div>
    </div>
  );
}

// ─── MetricBar ─────────────────────────────────────────────────────────────
export function MetricBar({ label, value, highlight = false }) {
  const color = value >= 70 ? "#4ade80" : value >= 40 ? "#facc15" : "#f87171";
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 text-xs font-medium">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
    </div>
  );
}

// ─── MetricsSidebar ────────────────────────────────────────────────────────
export function MetricsSidebar({ metrics, currentScenario, totalScenarios, precision }) {
  return (
    <div className="w-56 flex-shrink-0">
      <div className="rounded-xl p-4"
        style={{ background: "rgba(20,10,50,0.8)", border: "1px solid rgba(120,80,200,0.4)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Courier New', monospace" }}>Métricas</span>
          <div className="flex gap-1">
            {["#ff6b8a","#ffd93d","#4ade80"].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
        <MetricBar label="Reputação"    value={metrics.reputacao}    />
        <MetricBar label="Cultura"      value={metrics.cultura}      />
        <MetricBar label="Ética"        value={metrics.etica}        />
        <MetricBar label="Produtividade" value={metrics.produtividade} />
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="rounded-lg p-3 mb-2 text-center"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            <p className="text-gray-400 text-xs mb-1">Precisão</p>
            <p className="font-black text-2xl" style={{
              color: precision >= 90 ? "#4ade80" : precision >= 60 ? "#facc15" : "#f87171",
              fontFamily: "'Courier New', monospace"
            }}>{precision}%</p>
            <p className="text-gray-500 text-xs">Meta: 90%</p>
          </div>
          <div className="rounded-lg p-3 text-center"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            <p className="text-gray-400 text-xs mb-1">Cenário</p>
            <p className="text-white font-black text-xl"
              style={{ fontFamily: "'Courier New', monospace" }}>
              {currentScenario}/{totalScenarios}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ActionButton ──────────────────────────────────────────────────────────
export function ActionButton({ children, onClick, variant = "primary", disabled = false, className = "" }) {
  const base = "px-6 py-3 rounded-full font-bold text-white transition-all duration-200 cursor-pointer select-none";
  const styles = {
    primary: { background: "linear-gradient(90deg, #e53e3e, #ed8936)", boxShadow: "0 4px 20px rgba(229,62,62,0.4)" },
    secondary: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" },
    ghost: { background: "transparent", border: "1px solid rgba(255,255,255,0.3)" },
  };
  return (
    <button className={`${base} ${className} ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105 hover:brightness-110 active:scale-95"}`}
      style={styles[variant]} onClick={disabled ? undefined : onClick}>
      {children}
    </button>
  );
}

// ─── OptionCard ────────────────────────────────────────────────────────────
export function OptionCard({ label, text, selected, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:brightness-110"
      style={{
        background: selected ? "rgba(200,80,120,0.25)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${selected ? "rgba(220,100,140,0.7)" : "rgba(255,255,255,0.1)"}`,
        boxShadow: selected ? "0 0 12px rgba(200,80,120,0.3)" : "none",
      }}>
      <span className="font-bold text-pink-300 mr-2">{label}.</span>
      <span className="text-gray-200 text-sm">{text}</span>
    </button>
  );
}

// ─── LoadingDots ───────────────────────────────────────────────────────────
export function LoadingDots() {
  return (
    <div className="flex gap-1 items-center px-2 py-1">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}
