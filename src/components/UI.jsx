// ─── ScreenTransition ────────────────────────────────────────────────────
export function ScreenTransition({ children }) {
  return <div className="animate-in-up">{children}</div>;
}

// ─── NavBar ──────────────────────────────────────────────────────────────
export function NavBar({ onNavigate, activePage }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "mission", label: "Mission" },
    { id: "news", label: "News" },
    { id: "tutorial", label: "Como jogar" },
    { id: "contact", label: "Contatos" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 border-b border-white/[0.06] bg-surface-950/80 backdrop-blur-xl">
      <button onClick={() => onNavigate?.("home")} className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold tracking-tight">CQ</span>
        </div>
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:inline">Culture Quest</span>
      </button>
      <div className="flex items-center gap-1">
        {items.map(({ id, label }) => (
          <button key={id} onClick={() => onNavigate?.(id)}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
              activePage === id
                ? "text-white bg-white/[0.08]"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            }`}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── MetricBar ───────────────────────────────────────────────────────────
export function MetricBar({ label, value }) {
  const color = value >= 70 ? "bg-green-500" : value >= 40 ? "bg-yellow-500" : "bg-red-500";
  const text  = value >= 70 ? "text-green-400" : value >= 40 ? "text-yellow-400" : "text-red-400";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] text-white/40 font-medium">{label}</span>
        <span className={`text-[11px] font-bold font-mono ${text}`}>{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06]">
        <div className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${value}%`, opacity: 0.7 }} />
      </div>
    </div>
  );
}

// ─── MetricsSidebar ──────────────────────────────────────────────────────
export function MetricsSidebar({ metrics, currentScenario, totalScenarios, precision }) {
  return (
    <div className="w-48 flex-shrink-0 hidden lg:block">
      <div className="surface-card p-4 space-y-3">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono">Dashboard</p>
        <MetricBar label="Reputacao"     value={metrics.reputacao} />
        <MetricBar label="Cultura"       value={metrics.cultura} />
        <MetricBar label="Etica"         value={metrics.etica} />
        <MetricBar label="Produtividade" value={metrics.produtividade} />

        <div className="pt-3 border-t border-white/[0.06] space-y-2">
          <div className="surface-elevated p-3 text-center">
            <p className="text-[10px] text-white/30 mb-0.5">Precisao</p>
            <p className={`text-xl font-bold font-mono ${
              precision >= 90 ? "text-green-400" : precision >= 60 ? "text-yellow-400" : "text-red-400"
            }`}>{precision}%</p>
          </div>
          <div className="surface-elevated p-3 text-center">
            <p className="text-[10px] text-white/30 mb-0.5">Cenario</p>
            <p className="text-white font-bold font-mono">{currentScenario}<span className="text-white/30">/{totalScenarios}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ActionButton ────────────────────────────────────────────────────────
export function ActionButton({ children, onClick, variant = "primary", disabled = false, className = "" }) {
  const base = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
    disabled ? "opacity-25 cursor-not-allowed pointer-events-none" : "cursor-pointer"
  }`;
  const variants = {
    primary: `bg-accent-500 text-white hover:bg-accent-400 active:scale-[0.98] ${!disabled ? "shadow-lg shadow-accent-500/20" : ""}`,
    secondary: `bg-white/[0.06] text-white/80 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white`,
    ghost: `bg-transparent text-white/50 border border-white/[0.1] hover:text-white/80 hover:border-white/[0.2]`,
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={disabled ? undefined : onClick}>
      {children}
    </button>
  );
}

// ─── OptionCard ──────────────────────────────────────────────────────────
export function OptionCard({ label, text, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-150 ${
        selected
          ? "bg-accent-500/10 border border-accent-500/30"
          : "surface-card hover:border-white/[0.12]"
      }`}>
      <span className={`font-bold mr-2 text-sm ${selected ? "text-accent-400" : "text-white/25"}`}>{label}</span>
      <span className={`text-sm ${selected ? "text-white/90" : "text-white/55"}`}>{text}</span>
    </button>
  );
}

// ─── LoadingDots ─────────────────────────────────────────────────────────
export function LoadingDots() {
  return (
    <div className="flex gap-1.5 items-center">
      {[0,1,2].map(i => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-bounce" style={{ animationDelay: `${i*0.12}s` }} />
      ))}
    </div>
  );
}

// ─── StepIndicator ───────────────────────────────────────────────────────
export function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`w-6 h-0.5 rounded-full ${i < current ? "bg-accent-500" : "bg-white/10"}`} />
        ))}
      </div>
      <span className="text-[11px] text-white/30 font-mono font-medium">Passo {current} de {total}</span>
    </div>
  );
}

// ─── GlassCard (kept for compat) ─────────────────────────────────────────
export function GlassCard({ children, className = "" }) {
  return <div className={`surface-card ${className}`}>{children}</div>;
}

// ─── GamePanel (kept for compat) ─────────────────────────────────────────
export function GamePanel({ children, className = "" }) {
  return <div className={`border-gradient rounded-2xl p-6 ${className}`}>{children}</div>;
}

// ─── PanelTitle (kept for compat) ────────────────────────────────────────
export function PanelTitle({ children }) {
  return (
    <div className="flex justify-center mb-8">
      <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em] font-mono">{children}</span>
    </div>
  );
}
