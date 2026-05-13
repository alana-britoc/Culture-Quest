const Tag = ({ children }) => (
  <span className="text-[10px] font-bold text-accent-500 uppercase tracking-[0.2em] font-mono">{children}</span>
);

const Section = ({ children, dark = false, className = "" }) => (
  <section className={`px-6 lg:px-16 py-20 max-w-6xl mx-auto ${dark ? "bg-surface-900" : "bg-surface-50"} ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

export function MissionPage() {
  return (
    <div className="flex-1 pt-16 bg-surface-50 text-surface-950">
      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Tag>Nossa missao</Tag>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Preparando voce para o <span className="text-accent-600 italic">mundo real</span>
            </h1>
            <div className="w-10 h-1 rounded-full bg-accent-500 my-6" />
            <p className="text-gray-500 text-lg leading-relaxed">
              Muitos jovens entram no mercado sem nunca ter enfrentado um dilema corporativo real. O Culture Quest muda isso.
            </p>
          </div>
          <div className="rounded-2xl p-12 bg-surface-950 text-white flex flex-col items-center text-center">
            <p className="text-4xl mb-4">🏢</p>
            <p className="text-white/40 text-sm mb-1">Culture Quest</p>
            <p className="text-xl font-bold">Simulador Corporativo</p>
            <div className="mt-6 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
              <p className="text-white/30 text-xs">Meta do jogo</p>
              <p className="text-accent-400 text-lg font-bold font-mono">90%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-16 bg-surface-950 text-white">
        <div className="max-w-6xl mx-auto">
          <Tag>Competencias</Tag>
          <h2 className="mt-3 text-3xl font-bold mb-10">O que voce desenvolve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Soft Skills",    d: "Comunicacao, lideranca e resolucao de conflitos com consequencias reais." },
              { n: "02", t: "Fit Cultural",   d: "Leia o ambiente da empresa e tome decisoes alinhadas aos seus valores." },
              { n: "03", t: "Feedback de IA",  d: "Avaliacoes detalhadas sobre tom, etica, assertividade e eficacia." },
            ].map(({ n, t, d }) => (
              <div key={n} className="pt-6 border-t border-white/[0.06]">
                <p className="text-3xl font-black text-accent-500/20 font-mono mb-3">{n}</p>
                <p className="font-bold mb-2">{t}</p>
                <p className="text-sm text-white/35 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl p-10 bg-accent-50 border border-accent-100">
            <p className="text-3xl mb-3">🎓</p>
            <p className="text-xl font-bold mb-1">UPE Campus Garanhuns</p>
            <p className="text-gray-500 text-sm mb-4">Universidade de Pernambuco</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Projeto da disciplina de Desenvolvimento de Jogos, orientado pelo Prof. Ivaldir Junior.
            </p>
          </div>
          <div>
            <Tag>O projeto</Tag>
            <h3 className="mt-3 text-2xl font-bold mb-4">Tecnologia e educacao juntas</h3>
            <p className="text-gray-500 leading-relaxed mb-3">
              Construido com arquitetura limpa, IA integrada e design focado em engajar.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Por Paulo Henrique, Joao Gabriel, Alana e Rian Noronha.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function NewsPage() {
  const news = [
    { date: "Mai 2026", tag: "Lancamento",     title: "Culture Quest v0.1 disponivel",  desc: "5 cenarios dinamicos, 3 arquetipos e dashboard de metricas em tempo real." },
    { date: "Abr 2026", tag: "Desenvolvimento",  title: "Prototipo aprovado",             desc: "GDD e wireframes apresentados e aprovados. Desenvolvimento iniciado." },
    { date: "Abr 2026", tag: "Inicio",           title: "Projeto iniciado na UPE",         desc: "Equipe formada. Conceito validado. Cultura corporativa encontra jogos serios." },
  ];

  return (
    <div className="flex-1 pt-16 bg-surface-50 text-surface-950">
      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <Tag>Novidades</Tag>
        <h2 className="mt-3 text-3xl font-bold mb-10">Atualizacoes do projeto</h2>

        <div className="rounded-2xl p-8 lg:p-10 mb-6 bg-surface-950 text-white flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-accent-500/15 text-accent-300 mb-3 inline-block">{news[0].tag}</span>
            <h3 className="text-xl font-bold mb-2">{news[0].title}</h3>
            <p className="text-sm text-white/45">{news[0].desc}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[11px] text-white/25">{news[0].date}</p>
            <p className="text-3xl font-black font-mono text-accent-400 mt-1">v0.1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.slice(1).map(n => (
            <div key={n.title} className="rounded-xl p-6 bg-white border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold text-accent-600 bg-accent-50">{n.tag}</span>
                <span className="text-[11px] text-gray-400">{n.date}</span>
              </div>
              <p className="font-bold text-gray-900 mb-1.5">{n.title}</p>
              <p className="text-sm text-gray-500">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TutorialPage({ onStart }) {
  const steps = [
    { n: "01", t: "Escolha seu arquetipo",   d: "Cada perfil recebe dilemas adaptados ao seu estilo." },
    { n: "02", t: "Configure a empresa",      d: "Porte e setor mudam o contexto completamente." },
    { n: "03", t: "Passe pelo onboarding",    d: "Seu gerente te apresenta a empresa." },
    { n: "04", t: "Enfrente os dilemas",      d: "5 cenarios com 4 opcoes cada. Cada escolha tem consequencia." },
    { n: "05", t: "Momento critico",          d: "Em um cenario voce escreve sua propria resposta." },
    { n: "06", t: "Veja o resultado",         d: "Relatorio com metricas e feedback da IA." },
  ];

  return (
    <div className="flex-1 pt-16 bg-surface-50 text-surface-950">
      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Tag>Como jogar</Tag>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight">
              Aprenda em <span className="text-accent-600">6 passos</span>
            </h1>
            <div className="w-10 h-1 rounded-full bg-accent-500 my-6" />
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Intuitivo, mas aqui vai o guia completo.
            </p>
            <button onClick={onStart}
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-accent-500 hover:bg-accent-400 transition-colors shadow-lg shadow-accent-500/20">
              Jogar agora
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ l: "Reputacao", c: "#8b5cf6", d: "Como te veem" }, { l: "Cultura", c: "#3b82f6", d: "Fit com a empresa" },
              { l: "Etica", c: "#22c55e", d: "Integridade" }, { l: "Produtividade", c: "#eab308", d: "Resultados" }
            ].map(({ l, c, d }) => (
              <div key={l} className="rounded-xl p-5 bg-white border border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full mb-3" style={{ background: c }} />
                <p className="font-bold text-sm">{l}</p>
                <p className="text-[11px] text-gray-400">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-16 bg-surface-950 text-white">
        <div className="max-w-6xl mx-auto">
          <Tag>Passo a passo</Tag>
          <h2 className="mt-3 text-3xl font-bold mb-10">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map(s => (
              <div key={s.n} className="surface-card rounded-2xl p-5">
                <span className="text-accent-400/40 font-mono font-bold text-sm">{s.n}</span>
                <p className="font-semibold mt-2 mb-1.5">{s.t}</p>
                <p className="text-sm text-white/35">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto text-center">
        <Tag>Pronto?</Tag>
        <h2 className="mt-4 text-3xl font-bold mb-4">Comece sua jornada corporativa</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Cada decisao conta. Cada palavra importa.</p>
        <button onClick={onStart}
          className="px-10 py-4 rounded-xl font-semibold text-white bg-accent-500 hover:bg-accent-400 transition-colors shadow-lg shadow-accent-500/25">
          Iniciar Jogo
        </button>
      </section>
    </div>
  );
}

export function ContactPage() {
  const team = [
    { name: "Paulo Henrique", role: "Desenvolvimento & IA",    init: "P", color: "bg-accent-500" },
    { name: "Joao Gabriel",   role: "Design & Frontend",       init: "J", color: "bg-blue-500" },
    { name: "Alana",          role: "Roteiro & UX",            init: "A", color: "bg-green-500" },
    { name: "Rian Noronha",   role: "Mecanicas & Backend",     init: "R", color: "bg-yellow-500" },
  ];

  return (
    <div className="flex-1 pt-16">
      <section className="px-6 lg:px-16 py-20 bg-surface-950 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Tag>A equipe</Tag>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight">
              Quatro estudantes, <span className="text-accent-400">uma ideia</span>
            </h1>
            <div className="w-10 h-1 rounded-full bg-accent-500 my-6" />
            <p className="text-white/40 text-lg leading-relaxed">
              Estudantes da UPE Campus Garanhuns que acreditam em jogos como ferramenta de aprendizado.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {team.map(({ name, role, init, color }) => (
              <div key={name} className="surface-card rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center font-bold text-white text-sm mb-3`}>{init}</div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-[11px] text-white/25 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { l: "Instituicao", v: "UPE — Universidade de Pernambuco", s: "Campus Garanhuns" },
            { l: "Orientador",  v: "Prof. Ivaldir Junior",              s: "Desenvolvimento de Jogos" },
            { l: "Ano",         v: "2026",                              s: "Projeto academico semestral" },
          ].map(({ l, v, s }) => (
            <div key={l} className="rounded-xl p-6 bg-white border border-gray-100">
              <Tag>{l}</Tag>
              <p className="mt-3 font-bold text-gray-900">{v}</p>
              <p className="text-sm text-gray-400 mt-1">{s}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
