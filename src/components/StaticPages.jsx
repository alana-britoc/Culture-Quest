const TAG = ({ children, color = "#7c3aed" }) => (
  <span className="text-xs font-bold uppercase tracking-widest"
    style={{ color, fontFamily: "'Courier New', monospace", letterSpacing: "0.2em" }}>
    {children}
  </span>
);

const SectionHeading = ({ tag, title, subtitle, light = false }) => (
  <div className="mb-12">
    <TAG color={light ? "#a78bfa" : "#7c3aed"}>{tag}</TAG>
    <h2 className="mt-3 font-black leading-tight"
      style={{
        fontSize: "clamp(32px, 4vw, 52px)",
        color: light ? "#fff" : "#0f0820",
        fontFamily: "'Georgia', serif",
        letterSpacing: "-0.02em",
      }}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-lg max-w-xl leading-relaxed"
        style={{ color: light ? "rgba(255,255,255,0.65)" : "#4b5563" }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Divider = () => (
  <div className="w-12 h-1 rounded-full my-6" style={{ background: "#7c3aed" }} />
);

export function MissionPage() {
  return (
    <div className="flex-1 pt-20" style={{ background: "#faf9ff" }}>
      <section className="px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <TAG>Nossa missão</TAG>
            <h1 className="mt-4 font-black leading-tight"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", color: "#0f0820", fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>
              Preparando você para o{" "}
              <span style={{ color: "#7c3aed", fontStyle: "italic" }}>mundo real</span>
            </h1>
            <Divider />
            <p className="text-gray-500 text-lg leading-relaxed">
              Muitos jovens entram no mercado sem nunca ter enfrentado um dilema corporativo real.
              O Culture Quest muda isso — simulando situações reais com IA e colocando você no centro das decisões.
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-72 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b1f6e, #7c3aed)" }}>
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <p className="text-white/70 text-sm font-medium">Culture Quest</p>
                <p className="text-white font-black text-2xl">Simulador Corporativo</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 px-5 py-3 rounded-xl shadow-xl"
              style={{ background: "#fff", border: "1px solid #ede9fe" }}>
              <p className="text-xs text-gray-400 mb-0.5">Meta do jogo</p>
              <p className="font-black text-xl" style={{ color: "#7c3aed" }}>90% precisão</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-16 py-16" style={{ background: "#0f0820" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading tag="O que desenvolvemos" title="Competências para o mercado"
            subtitle="Cada decisão no jogo treina uma habilidade real que você vai usar no trabalho." light />
          <div className="grid grid-cols-3 gap-8">
            {[
              { num: "01", title: "Soft Skills", desc: "Comunicação assertiva, liderança e resolução de conflitos em situações com consequências reais." },
              { num: "02", title: "Fit Cultural", desc: "Aprenda a ler o ambiente de uma empresa e tomar decisões alinhadas aos seus valores." },
              { num: "03", title: "Feedback de IA", desc: "Receba avaliações detalhadas sobre cada escolha — tom, ética, assertividade e eficácia." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="font-black text-4xl mb-4" style={{ color: "rgba(124,58,237,0.4)", fontFamily: "'Courier New', monospace" }}>{num}</p>
                <p className="text-white font-bold text-lg mb-3">{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl p-10" style={{ background: "#ede9fe" }}>
            <p className="text-5xl mb-4">🎓</p>
            <p className="font-black text-2xl mb-2" style={{ color: "#0f0820", fontFamily: "'Georgia', serif" }}>UPE Campus Garanhuns</p>
            <p className="text-gray-500 text-sm">Universidade de Pernambuco</p>
            <Divider />
            <p className="text-gray-600 text-sm leading-relaxed">
              Projeto desenvolvido na disciplina de Desenvolvimento de Jogos, sob orientação do Prof. Ivaldir Junior.
            </p>
          </div>
          <div>
            <TAG>Sobre o projeto</TAG>
            <h3 className="mt-3 font-black text-3xl mb-4" style={{ color: "#0f0820", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
              Tecnologia e educação juntas
            </h3>
            <p className="text-gray-500 leading-relaxed mb-4">
              O Culture Quest nasceu como projeto acadêmico mas foi construído com a seriedade de um produto real — arquitetura limpa, IA integrada e design pensado para engajar.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Desenvolvido por Paulo Henrique, João Gabriel, Alana e Rian Noronha — estudantes que acreditam que jogos sérios podem transformar a forma como aprendemos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function NewsPage() {
  const news = [
    { date: "Mai 2026", tag: "Lançamento",    title: "Culture Quest v0.1 disponível",    desc: "Primeira versão jogável com 5 cenários dinâmicos gerados por IA, 3 arquétipos e dashboard de métricas em tempo real." },
    { date: "Abr 2026", tag: "Desenvolvimento", title: "Protótipo aprovado pelo professor", desc: "O GDD e os wireframes foram apresentados e aprovados. Equipe iniciou o desenvolvimento." },
    { date: "Abr 2026", tag: "Início",         title: "Projeto iniciado na UPE",           desc: "Culture Quest começa como projeto da disciplina. Equipe formada por Paulo, João, Alana e Rian." },
  ];
  const tagColor = { "Lançamento": "#7c3aed", "Desenvolvimento": "#0891b2", "Início": "#059669" };

  return (
    <div className="flex-1 pt-20" style={{ background: "#faf9ff" }}>
      <section className="px-16 py-20 max-w-6xl mx-auto">
        <SectionHeading tag="Novidades" title="Atualizações do projeto"
          subtitle="Acompanhe o desenvolvimento do Culture Quest desde o início." />
        <div className="rounded-2xl p-10 mb-6 flex gap-10 items-center"
          style={{ background: "linear-gradient(135deg, #3b1f6e, #7c3aed)" }}>
          <div className="flex-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block"
              style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>{news[0].tag}</span>
            <h3 className="text-white font-black text-2xl mb-3" style={{ fontFamily: "'Georgia', serif" }}>{news[0].title}</h3>
            <p className="text-white/70 leading-relaxed">{news[0].desc}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white/40 text-sm">{news[0].date}</p>
            <p className="text-white font-black text-4xl mt-2" style={{ fontFamily: "'Courier New', monospace" }}>v0.1</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {news.slice(1).map((n) => (
            <div key={n.title} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #ede9fe" }}>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${tagColor[n.tag]}15`, color: tagColor[n.tag] }}>{n.tag}</span>
                <span className="text-gray-400 text-xs">{n.date}</span>
              </div>
              <p className="font-black text-gray-900 text-lg mb-2" style={{ fontFamily: "'Georgia', serif" }}>{n.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TutorialPage({ onStart }) {
  const steps = [
    { num: "01", icon: "🎭", title: "Escolha seu arquétipo", desc: "Selecione entre Estagiário Caótico, Líder Diplomata ou Especialista Sincerão. Cada arquétipo recebe dilemas adaptados ao seu estilo." },
    { num: "02", icon: "🏢", title: "Configure sua empresa", desc: "Defina porte e setor. Uma startup de tech é bem diferente de um banco corporativo — o contexto muda tudo." },
    { num: "03", icon: "💬", title: "Passe pelo onboarding", desc: "Seu gerente virtual te apresenta a empresa. Sua resposta inicial personaliza os cenários da IA pra você." },
    { num: "04", icon: "⚡", title: "Enfrente os dilemas", desc: "5 cenários gerados em tempo real. Escolha entre 4 opções — cada decisão atualiza o dashboard instantaneamente." },
    { num: "05", icon: "✍️", title: "Momento crítico", desc: "Em um cenário você precisa escrever sua própria resposta. A IA analisa tom, assertividade e ética." },
    { num: "06", icon: "📊", title: "Veja seu resultado", desc: "Relatório final com métricas e feedback da IA. Meta: 90% de precisão para vencer." },
  ];
  const metrics = [
    { label: "Reputação", color: "#7c3aed", desc: "Como colegas e líderes te veem" },
    { label: "Cultura", color: "#0891b2", desc: "Alinhamento com valores da empresa" },
    { label: "Ética", color: "#059669", desc: "Integridade nas suas decisões" },
    { label: "Produtividade", color: "#d97706", desc: "Impacto nos resultados" },
  ];

  return (
    <div className="flex-1 pt-20" style={{ background: "#faf9ff" }}>
      <section className="px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <TAG>Como jogar</TAG>
            <h1 className="mt-4 font-black leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "#0f0820", fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>
              Aprenda em{" "}
              <span style={{ color: "#7c3aed", fontStyle: "italic" }}>6 passos</span>
            </h1>
            <Divider />
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              O Culture Quest é intuitivo — você aprende jogando. Mas aqui está um guia completo para tirar o máximo da experiência.
            </p>
            <button onClick={onStart}
              className="px-8 py-4 rounded-xl font-black text-white text-base transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7)", boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}>
              Pular tutorial — Jogar agora 🚀
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map(({ label, color, desc }) => (
              <div key={label} className="rounded-xl p-5" style={{ background: "#fff", border: `2px solid ${color}22` }}>
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: color }} />
                <p className="font-black text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-16 py-16" style={{ background: "#0f0820" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading tag="Passo a passo" title="Como funciona" light />
          <div className="grid grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-black text-sm" style={{ color: "#a78bfa", fontFamily: "'Courier New', monospace" }}>{s.num}</span>
                </div>
                <p className="text-white font-bold mb-2">{s.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-16 py-20 max-w-6xl mx-auto text-center">
        <TAG>Pronto?</TAG>
        <h2 className="mt-4 font-black text-4xl mb-4"
          style={{ color: "#0f0820", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
          Comece sua jornada corporativa
        </h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto">
          Cada decisão conta. Cada palavra importa. Mostre que você tem o que o mercado exige.
        </p>
        <button onClick={onStart}
          className="px-12 py-5 rounded-xl font-black text-white text-lg transition-all duration-200 hover:scale-105"
          style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7)", boxShadow: "0 8px 40px rgba(124,58,237,0.4)" }}>
          Iniciar Jogo 🚀
        </button>
      </section>
    </div>
  );
}

export function ContactPage() {
  const team = [
    { name: "Paulo Henrique", role: "Desenvolvimento & IA",   initial: "P" },
    { name: "João Gabriel",   role: "Design & Frontend",      initial: "J" },
    { name: "Alana",          role: "Roteiro & UX",           initial: "A" },
    { name: "Rian Noronha",   role: "Mecânicas & Backend",    initial: "R" },
  ];
  const colors = ["#7c3aed", "#0891b2", "#059669", "#d97706"];

  return (
    <div className="flex-1 pt-20" style={{ background: "#faf9ff" }}>
      <section className="px-16 py-20" style={{ background: "#0f0820" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <TAG color="#a78bfa">A equipe</TAG>
            <h1 className="mt-4 font-black leading-tight text-white"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>
              Quatro estudantes,{" "}
              <span style={{ color: "#a78bfa", fontStyle: "italic" }}>uma ideia</span>
            </h1>
            <Divider />
            <p className="text-white/60 text-lg leading-relaxed">
              Somos estudantes da UPE Campus Garanhuns que acreditam que jogos podem ser uma ferramenta poderosa de aprendizado profissional.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {team.map(({ name, role, initial }, i) => (
              <div key={name} className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg mb-4"
                  style={{ background: colors[i] }}>
                  {initial}
                </div>
                <p className="text-white font-bold text-sm">{name}</p>
                <p className="text-white/40 text-xs mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {[
            { label: "Instituição", value: "UPE — Universidade de Pernambuco", sub: "Campus Garanhuns" },
            { label: "Orientador",  value: "Prof. Ivaldir Junior",              sub: "Disciplina de Desenvolvimento de Jogos" },
            { label: "Ano",         value: "2026",                              sub: "Projeto acadêmico semestral" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="rounded-2xl p-8" style={{ background: "#fff", border: "1px solid #ede9fe" }}>
              <TAG>{label}</TAG>
              <p className="mt-3 font-black text-gray-900 text-lg leading-snug" style={{ fontFamily: "'Georgia', serif" }}>{value}</p>
              <p className="text-gray-400 text-sm mt-2">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
