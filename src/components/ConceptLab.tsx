import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

type ConceptDemoProps = { id: string; index: string; term: string; description: string; children: ReactNode };
const carouselSlides = [{ title: "Estrutura", body: "Organize o conteúdo." }, { title: "Tipografia", body: "Dê ritmo à leitura." }, { title: "Interação", body: "Mostre a resposta da interface." }];

function ConceptDemo({ id, index, term, description, children }: ConceptDemoProps) {
  return (
    <article className="concept-demo reveal" id={id} data-term={term}>
      <div className="concept-demo-copy">
        <span className="mono kicker">DEMO {index}</span>
        <h3>{term}</h3>
        <p>{description}</p>
      </div>
      <div className="concept-demo-stage">{children}</div>
    </article>
  );
}

function LandingPageDemo() {
  const [goal, setGoal] = useState("Explorar exemplos");
  const [done, setDone] = useState(false);
  return <ConceptDemo id="demo-landing-page" index="01" term="Landing Page" description="Uma página orientada a um objetivo principal. Troque a proposta e teste a chamada para ação.">
    <div className="landing-preview"><span className="mono">CADERNO INTERATIVO</span><h4>{goal === "Explorar exemplos" ? "Aprenda no seu ritmo." : goal === "Ver o glossário" ? "Encontre um conceito." : "Pratique WebDesign."}</h4><p>{goal}: conteúdo direto e um próximo passo claro.</p><button className="concept-action" onClick={() => setDone((value) => !value)}>{done ? "Objetivo iniciado ✓" : `${goal} →`}</button></div>
    <label className="concept-control">Objetivo principal<select value={goal} onChange={(event) => { setGoal(event.target.value); setDone(false); }}><option>Explorar exemplos</option><option>Ver o glossário</option><option>Praticar WebDesign</option></select></label>
  </ConceptDemo>;
}

function SectionDemo() {
  const parts = [{ title: "Estrutura", body: "Organiza a informação antes da camada visual." }, { title: "Aparência", body: "Tipografia, cor e contraste dão forma ao conteúdo." }, { title: "Comportamento", body: "Interações mostram como a interface responde." }];
  const [active, setActive] = useState(0);
  return <ConceptDemo id="demo-section" index="02" term="Section" description="Uma seção agrupa conteúdo com o mesmo tema e cria uma divisão semântica na página.">
    <div className="section-demo-nav" aria-label="Seções demonstrativas">{parts.map((part, index) => <button key={part.title} aria-pressed={active === index} onClick={() => setActive(index)}>{part.title}</button>)}</div>
    <section className="section-demo-content" aria-label={parts[active].title}><span className="mono">SEÇÃO 0{active + 1}</span><h4>{parts[active].title}</h4><p>{parts[active].body}</p></section>
  </ConceptDemo>;
}

function ResponsiveDemo() {
  const [width, setWidth] = useState(620);
  const mode = width < 420 ? "compact" : width < 540 ? "medium" : "wide";
  return <ConceptDemo id="demo-responsivo" index="03" term="Responsivo" description="Redimensione o mesmo componente: conteúdo e colunas se reorganizam conforme o espaço disponível.">
    <label className="concept-control">Largura simulada: {width}px<input type="range" min="300" max="620" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className={`responsive-preview is-${mode}`}><header>Marca <span>Menu</span></header><div className="responsive-preview-main"><b>Conteúdo principal</b><i>Conteúdo auxiliar</i></div><footer>Rodapé da prévia</footer></div>
    <small className="concept-note">{mode === "compact" ? "1 coluna · menu compacto" : mode === "medium" ? "2 áreas · navegação reduzida" : "2 áreas · navegação completa"}</small>
  </ConceptDemo>;
}

function BreakpointDemo() {
  const [width, setWidth] = useState(640);
  const breakpoint = 480;
  const active = width < breakpoint;
  return <ConceptDemo id="demo-breakpoint" index="04" term="Breakpoint" description="O ponto de quebra é uma regra de layout acionada quando o espaço fica abaixo de uma largura definida.">
    <label className="concept-control">Largura: {width}px<input type="range" min="320" max="760" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className={`breakpoint-preview${active ? " is-active" : ""}`}><span>Navegação</span><span>Conteúdo</span></div>
    <div className="concept-readout"><code>@media (max-width: 480px)</code><b>{active ? "regra ativa · empilhado" : "regra inativa · lado a lado"}</b></div>
  </ConceptDemo>;
}

function MobileFirstDemo() {
  const [width, setWidth] = useState(360);
  return <ConceptDemo id="demo-mobile-first" index="05" term="Mobile First" description="O estilo base atende a telas pequenas; uma media query acrescenta colunas em telas maiores.">
    <label className="concept-control">Largura simulada: {width}px<input type="range" min="320" max="900" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className={`mobile-first-preview${width >= 600 ? " is-expanded" : ""}`}><header>Conteúdo prioritário</header><aside>Informação complementar</aside></div>
    <small className="concept-note">Base: 1 coluna · <code>min-width: 600px</code>: {width >= 600 ? "2 colunas" : "ainda não aplicado"}</small>
  </ConceptDemo>;
}

function ContainerDemo() {
  const [max, setMax] = useState(300);
  return <ConceptDemo id="demo-container" index="06" term="Container" description="Um container limita a largura do conteúdo e o mantém alinhado dentro do espaço disponível.">
    <label className="concept-control">max-width: {max}px<input type="range" min="120" max="560" value={max} onChange={(event) => setMax(+event.target.value)} /></label>
    <div className="container-demo-frame"><div className="container-demo-content" style={{ maxWidth: `${max}px` }}><b>Conteúdo contido</b><span>O limite muda com o controle.</span></div></div>
  </ConceptDemo>;
}

function ReadingPatternDemo() {
  const [pattern, setPattern] = useState<"Z" | "F">("Z");
  const [step, setStep] = useState(0);
  const steps = pattern === "Z" ? ["Topo esquerdo", "Topo direito", "Base esquerda", "Chamada final"] : ["Título", "Linha superior", "Linha seguinte", "Conteúdo"];
  const choose = (next: "Z" | "F") => { setPattern(next); setStep(0); };
  return <ConceptDemo id="demo-reading-pattern" index="07" term="Z-pattern / F-pattern" description="Compare dois mapas visuais de leitura. Avance ponto a ponto para acompanhar a sequência sugerida.">
    <div className="concept-toolbar"><button className="concept-action" aria-pressed={pattern === "Z"} onClick={() => choose("Z")}>Z-pattern</button><button className="concept-action" aria-pressed={pattern === "F"} onClick={() => choose("F")}>F-pattern</button></div>
    <div className={`reading-preview pattern-${pattern.toLowerCase()}`}>{steps.map((label, index) => <button key={`${pattern}-${label}`} aria-label={label} aria-current={step === index ? "step" : undefined} className={step === index ? "is-active" : ""} onClick={() => setStep(index)}><span>{index + 1}</span></button>)}</div>
    <div className="concept-toolbar"><span className="concept-note">Leitura sugerida: {steps[step]}</span><button className="concept-action" onClick={() => setStep((value) => (value + 1) % steps.length)}>Próximo ponto →</button></div>
  </ConceptDemo>;
}

function AnimationIterationDemo() {
  const [count, setCount] = useState(3);
  const [run, setRun] = useState(0);
  return <ConceptDemo id="demo-animation-iteration" index="08" term="Animation Iteration" description="animation-iteration-count define quantas vezes a sequência temporal se repete.">
    <label className="concept-control">Repetições: {count}<input type="range" min="1" max="8" value={count} onChange={(event) => setCount(+event.target.value)} /></label>
    <div className="iteration-demo-stage"><i key={`${run}-${count}`} style={{ animationIterationCount: count }} /></div>
    <button className="concept-action" onClick={() => setRun((value) => value + 1)}>Reiniciar animação ↻</button>
  </ConceptDemo>;
}

function SmoothScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const destinations = ["Introdução", "Exemplo", "Destino"];
  const goTo = (index: number) => { const element = scrollRef.current; if (element) element.scrollTo({ top: index * 92, behavior: "smooth" }); };
  return <ConceptDemo id="demo-smooth-scroll" index="09" term="Smooth Scroll" description="Use os atalhos para rolar uma área interna até cada destino com comportamento suave.">
    <div className="concept-toolbar">{destinations.map((label, index) => <button className="concept-action" key={label} onClick={() => goTo(index)}>{label}</button>)}</div>
    <div className="smooth-preview" ref={scrollRef}><section><span className="mono">01</span><b>Introdução</b><p>O conteúdo começa aqui.</p></section><section><span className="mono">02</span><b>Exemplo</b><p>A rolagem percorre o conteúdo.</p></section><section><span className="mono">03</span><b>Destino</b><p>O navegador chega ao ponto escolhido.</p></section></div>
  </ConceptDemo>;
}

function CarouselDemo() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);
  const startX = useRef<number | null>(null);
  const move = (delta: number) => setIndex((value) => (value + delta + carouselSlides.length) % carouselSlides.length);
  useEffect(() => { if (!auto) return; const timer = window.setInterval(() => setIndex((value) => (value + 1) % carouselSlides.length), 2800); return () => window.clearInterval(timer); }, [auto]);
  return <ConceptDemo id="demo-carousel-slider" index="10" term="Carousel / Slider" description="Navegue por slides em sequência usando setas, marcadores, gesto horizontal ou reprodução automática.">
    <div className="carousel-window" onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={(event) => { if (startX.current === null) return; const delta = event.clientX - startX.current; if (Math.abs(delta) > 35) move(delta < 0 ? 1 : -1); startX.current = null; }}>
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>{carouselSlides.map((slide, position) => <section className="carousel-slide" key={slide.title} aria-hidden={position !== index}><span className="mono">0{position + 1} / 0{carouselSlides.length}</span><h4>{slide.title}</h4><p>{slide.body}</p></section>)}</div>
    </div>
    <div className="concept-toolbar"><button className="concept-action" aria-label="Slide anterior" onClick={() => move(-1)}>← Anterior</button><div className="carousel-dots">{carouselSlides.map((slide, position) => <button key={slide.title} aria-label={`Ir para ${slide.title}`} aria-current={index === position ? "true" : undefined} onClick={() => setIndex(position)} />)}</div><button className="concept-action" aria-label="Próximo slide" onClick={() => move(1)}>Próximo →</button></div>
    <button className="concept-action" aria-pressed={auto} onClick={() => setAuto((value) => !value)}>{auto ? "Pausar reprodução" : "Reproduzir automaticamente"}</button>
  </ConceptDemo>;
}

function ModalDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <ConceptDemo id="demo-modal" index="11" term="Modal" description="showModal abre uma camada nativa, mantém o foco dentro dela e permite fechar com Escape.">
    <button className="concept-action" onClick={() => dialogRef.current?.showModal()}>Abrir janela modal</button>
    <dialog className="modal-demo" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      <span className="mono kicker">DECISÃO EM FOCO</span><h4>Janela modal</h4><p>O diálogo mantém a interação nesta decisão até ser fechado.</p><button className="concept-action" onClick={() => dialogRef.current?.close()}>Fechar diálogo</button>
    </dialog>
    <small className="concept-note">Feche pelo botão, clique fora ou pressione Escape.</small>
  </ConceptDemo>;
}

function ToastDemo() {
  const [notice, setNotice] = useState<{ id: number; kind: string; text: string } | null>(null);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(null), 3000); return () => window.clearTimeout(timer); }, [notice]);
  const show = (kind: string, text: string) => setNotice({ id: Date.now(), kind, text });
  return <ConceptDemo id="demo-toast" index="12" term="Toast" description="Uma mensagem transitória confirma o resultado, tem duração curta e pode ser dispensada.">
    <div className="concept-toolbar"><button className="concept-action" onClick={() => show("success", "Alterações salvas.")}>Sucesso</button><button className="concept-action" onClick={() => show("warning", "Revise os dados antes de continuar.")}>Aviso</button><button className="concept-action" onClick={() => show("error", "Não foi possível concluir a ação.")}>Erro</button></div>
    <div className={`toast-demo${notice ? ` is-${notice.kind}` : ""}`} role="status" aria-live="polite">{notice ? <><span>{notice.text}</span><button aria-label="Dispensar notificação" onClick={() => setNotice(null)}>×</button><i key={notice.id} /></> : <span>Escolha uma mensagem para pré-visualizar.</span>}</div>
  </ConceptDemo>;
}

function ToggleDemo() {
  const [enabled, setEnabled] = useState(true);
  return <ConceptDemo id="demo-toggle-switch" index="13" term="Toggle / Switch" description="Um controle binário altera uma preferência e atualiza imediatamente a interface relacionada.">
    <button className={`switch-demo${enabled ? " is-on" : ""}`} role="switch" aria-checked={enabled} onClick={() => setEnabled((value) => !value)}><i /><span>Notificações {enabled ? "ativadas" : "pausadas"}</span></button>
    <div className={`notification-preview${enabled ? "" : " is-muted"}`}><b>Nova demonstração disponível</b><span>{enabled ? "Você verá este aviso." : "Este aviso está oculto pela preferência."}</span></div>
  </ConceptDemo>;
}

function BadgeDemo() {
  const entries = [{ name: "Wireframe", status: "Rascunho", style: "draft" }, { name: "Tipografia", status: "Em revisão", style: "review" }, { name: "Interação", status: "Publicado", style: "published" }];
  const [filter, setFilter] = useState("Todos");
  const statuses = ["Todos", "Rascunho", "Em revisão", "Publicado"];
  const filtered = filter === "Todos" ? entries : entries.filter((entry) => entry.status === filter);
  return <ConceptDemo id="demo-badge" index="14" term="Badge" description="O badge identifica status de forma compacta; filtre os itens e veja a categoria associada a cada um.">
    <div className="concept-toolbar">{statuses.map((status) => <button className="concept-action" key={status} aria-pressed={filter === status} onClick={() => setFilter(status)}>{status}</button>)}</div>
    <div className="badge-list" aria-live="polite">{filtered.map((entry) => <div key={entry.name}><span>{entry.name}</span><b className={`status-badge status-${entry.style}`}>{entry.status}</b></div>)}</div>
  </ConceptDemo>;
}

function PricingDemo() {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState("");
  const plans = [{ name: "Essencial", month: 0, features: ["Glossário", "Demonstrações"] }, { name: "Estudo", month: 29, features: ["Glossário", "Demonstrações", "Exercícios"] }, { name: "Oficina", month: 59, features: ["Glossário", "Demonstrações", "Exercícios", "Projetos"] }];
  return <ConceptDemo id="demo-pricing-table" index="15" term="Pricing Table" description="Compare ofertas, recursos e periodicidade. Os valores são ilustrativos e a seleção não inicia uma compra.">
    <div className="concept-toolbar"><button className="concept-action" aria-pressed={!annual} onClick={() => setAnnual(false)}>Mensal</button><button className="concept-action" aria-pressed={annual} onClick={() => setAnnual(true)}>Anual · 2 meses grátis</button></div>
    <div className="pricing-demo-grid">{plans.map((plan) => { const price = annual ? Math.round(plan.month * 10) : plan.month; return <article className={selected === plan.name ? "is-selected" : ""} key={plan.name}><span className="mono">{plan.name}</span><strong>{price === 0 ? "Grátis" : `R$ ${price}`}</strong><small>{price === 0 ? "" : annual ? "/ ano" : "/ mês"}</small><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><button className="concept-action" onClick={() => setSelected(plan.name)}>{selected === plan.name ? "Plano selecionado ✓" : "Escolher plano"}</button></article>; })}</div>
    <small className="concept-note" role="status">{selected ? `Seleção demonstrativa: ${selected}.` : "Selecione um plano para comparar."}</small>
  </ConceptDemo>;
}

function FloatingLabelDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return <ConceptDemo id="demo-floating-label" index="16" term="Floating Label" description="O rótulo sobe quando o campo recebe foco ou contém valor, sem desaparecer da identificação do campo.">
    <label className={`floating-demo-field${name ? " has-value" : ""}`}><span>Nome</span><input value={name} onChange={(event) => setName(event.target.value)} /></label>
    <label className={`floating-demo-field${email ? " has-value" : ""}`}><span>E-mail</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
    <button className="concept-action" onClick={() => { setName(""); setEmail(""); }}>Limpar campos</button>
  </ConceptDemo>;
}

function UxDemo() {
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState("");
  const [method, setMethod] = useState("");
  const advance = () => setStep((value) => Math.min(value + 1, 2));
  return <ConceptDemo id="demo-ux" index="17" term="UX" description="Acompanhe um fluxo curto com objetivo, escolha, progresso e confirmação para observar a experiência completa.">
    <div className="ux-progress"><i style={{ width: `${(step + 1) * 33.333}%` }} /><span>Etapa {step + 1} de 3</span></div>
    {step === 0 && <div className="ux-panel"><h4>O que você quer estudar?</h4><div className="concept-toolbar"><button className="concept-action" onClick={() => { setFormat("Animação"); advance(); }}>Animação</button><button className="concept-action" onClick={() => { setFormat("Layout"); advance(); }}>Layout</button></div></div>}
    {step === 1 && <div className="ux-panel"><h4>Como prefere começar em {format}?</h4><div className="concept-toolbar"><button className="concept-action" onClick={() => { setMethod("Ver exemplos"); advance(); }}>Ver exemplos</button><button className="concept-action" onClick={() => { setMethod("Ler conceitos"); advance(); }}>Ler conceitos</button></div><button className="concept-link" onClick={() => setStep(0)}>Voltar</button></div>}
    {step === 2 && <div className="ux-panel" role="status"><h4>Próximo passo pronto.</h4><p>Seu caminho de estudo de {format} está definido: {method.toLowerCase()}.</p><button className="concept-action" onClick={() => { setStep(0); setFormat(""); setMethod(""); }}>Recomeçar fluxo</button></div>}
  </ConceptDemo>;
}

function UiDemo() {
  const [layout, setLayout] = useState<"lista" | "grade">("lista");
  const [density, setDensity] = useState(1);
  const [accent, setAccent] = useState("#565edb");
  const style = { "--ui-accent": accent, "--ui-density": density } as CSSProperties;
  return <ConceptDemo id="demo-ui" index="18" term="UI" description="Altere layout, densidade e cor de destaque para ajustar a camada visual do mesmo conjunto de conteúdo.">
    <div className="concept-toolbar"><button className="concept-action" aria-pressed={layout === "lista"} onClick={() => setLayout("lista")}>Lista</button><button className="concept-action" aria-pressed={layout === "grade"} onClick={() => setLayout("grade")}>Grade</button><label className="concept-inline-control">Densidade<select value={density} onChange={(event) => setDensity(+event.target.value)}><option value="1">Confortável</option><option value=".65">Compacta</option></select></label><label className="concept-inline-control">Destaque<input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /></label></div>
    <div className={`ui-demo-preview is-${layout}`} style={style}>{["Cor", "Tipo", "Ritmo"].map((label) => <div key={label}><i /><b>{label}</b><span>Token visual</span></div>)}</div>
  </ConceptDemo>;
}

function SocialProofDemo() {
  const reviews = [{ initials: "LM", name: "Leitor demonstrativo 1", text: "A comparação entre as curvas deixou o conceito mais claro." }, { initials: "CA", name: "Leitor demonstrativo 2", text: "Consegui perceber o efeito ao ajustar os controles." }, { initials: "RS", name: "Leitor demonstrativo 3", text: "O exemplo ajudou a relacionar ação e feedback." }];
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  return <ConceptDemo id="demo-social-proof" index="19" term="Social Proof" description="Depoimentos são um sinal de confiança. Este conteúdo é fictício e serve apenas para demonstrar um componente de prova social.">
    <div className="social-proof-preview"><div className="review-avatar">{review.initials}</div><div className="review-stars" aria-label="5 de 5 estrelas">★★★★★</div><blockquote>“{review.text}”</blockquote><span>{review.name} · conteúdo fictício</span></div>
    <div className="concept-toolbar"><button className="concept-action" aria-label="Depoimento anterior" onClick={() => setIndex((value) => (value + reviews.length - 1) % reviews.length)}>←</button><span className="concept-note">{index + 1} / {reviews.length}</span><button className="concept-action" aria-label="Próximo depoimento" onClick={() => setIndex((value) => (value + 1) % reviews.length)}>→</button></div>
  </ConceptDemo>;
}

function AffordanceDemo() {
  const [volume, setVolume] = useState(55);
  const [submitted, setSubmitted] = useState(false);
  return <ConceptDemo id="demo-affordance" index="20" term="Affordance" description="Contorno, rótulo, cursor e formato do controle sugerem como interagir. Arraste o slider ou acione o botão.">
    <label className="affordance-slider"><span>Arraste para ajustar o volume</span><input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(+event.target.value)} /><b>{volume}%</b></label>
    <button className="affordance-cta" onClick={() => setSubmitted((value) => !value)}>{submitted ? "Ação confirmada ✓" : "Continuar →"}</button>
    <small className="concept-note">O visual dá pistas; o estado muda após a ação.</small>
  </ConceptDemo>;
}

function ValidationDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length >= 2;
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const valid = nameValid && emailValid;
  return <ConceptDemo id="demo-form-validation" index="21" term="Validação de Formulário" description="Preencha os campos para ver validações por campo, mensagens úteis e confirmação local, sem envio de dados.">
    <form className="validation-demo-form" onSubmit={submit} noValidate>
      <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} aria-invalid={submitted && !nameValid} aria-describedby="validation-name-help" placeholder="Pelo menos 2 caracteres" /><small id="validation-name-help">{submitted && !nameValid ? "Informe um nome com pelo menos 2 caracteres." : ""}</small></label>
      <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={submitted && !emailValid} aria-describedby="validation-email-help" placeholder="nome@exemplo.com" /><small id="validation-email-help">{submitted && !emailValid ? "Confira o formato do e-mail." : ""}</small></label>
      <button className="concept-action" type="submit">Validar dados</button>
      {submitted && <p className={valid ? "validation-success" : "validation-error"} role="status">{valid ? "Dados válidos. Formulário pronto para continuar." : "Há campos para corrigir."}</p>}
    </form>
  </ConceptDemo>;
}

function AccessibilityDemo() {
  const [contrast, setContrast] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [scale, setScale] = useState(1);
  return <ConceptDemo id="demo-accessibility" index="22" term="Acessibilidade (a11y)" description="Teste três ajustes de apresentação no painel: contraste, preferência por movimento reduzido e tamanho do texto.">
    <div className="concept-toolbar"><button className="concept-action" role="switch" aria-checked={contrast} onClick={() => setContrast((value) => !value)}>Contraste {contrast ? "alto" : "normal"}</button><button className="concept-action" role="switch" aria-checked={reduced} onClick={() => setReduced((value) => !value)}>Movimento {reduced ? "reduzido" : "normal"}</button></div>
    <label className="concept-control">Texto: {Math.round(scale * 100)}%<input type="range" min="0.8" max="1.4" step="0.1" value={scale} onChange={(event) => setScale(+event.target.value)} /></label>
    <div className={`a11y-demo-preview${contrast ? " has-contrast" : ""}${reduced ? " has-reduced-motion" : ""}`} style={{ fontSize: `${14 * scale}px` }}><span className="mono">PRÉVIA DE LEITURA</span><b>Conteúdo legível e claro</b><p>Os controles alteram esta prévia para comparar as opções.</p><i /></div>
  </ConceptDemo>;
}

function ConversionDemo() {
  const [visitors, setVisitors] = useState(100);
  const [conversions, setConversions] = useState(18);
  const rate = visitors ? ((conversions / visitors) * 100).toFixed(1) : "0.0";
  return <ConceptDemo id="demo-conversion" index="23" term="Conversão" description="Taxa de conversão é a proporção de pessoas que concluem uma ação em relação às visitas. Ajuste ambos os valores.">
    <label className="concept-control">Visitas: {visitors}<input type="range" min="10" max="500" step="10" value={visitors} onChange={(event) => { const value = +event.target.value; setVisitors(value); setConversions((current) => Math.min(current, value)); }} /></label>
    <label className="concept-control">Ações concluídas: {conversions}<input type="range" min="0" max={visitors} value={conversions} onChange={(event) => setConversions(+event.target.value)} /></label>
    <div className="conversion-result"><strong>{rate}%</strong><span>{conversions} ações em {visitors} visitas</span><i style={{ width: `${Math.min(Number(rate), 100)}%` }} /></div>
  </ConceptDemo>;
}

function SeoDemo() {
  const [title, setTitle] = useState("Anatomia: movimento em interfaces");
  const [description, setDescription] = useState("Estude conceitos de WebDesign com exemplos visuais e interativos.");
  return <ConceptDemo id="demo-seo" index="24" term="SEO" description="Edite título e descrição para ver uma prévia de resultado. Comprimento ajuda na apresentação, mas não garante posição no buscador.">
    <label className="concept-control">Título · {title.length} caracteres<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
    <label className="concept-control">Descrição · {description.length} caracteres<textarea rows={2} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
    <div className="seo-preview"><span>anatomia.example › estudos</span><b>{title || "Título da página"}</b><p>{description || "A descrição da página aparece nesta área."}</p></div>
  </ConceptDemo>;
}

function MetaTagsDemo() {
  const [title, setTitle] = useState("Anatomia — caderno visual");
  const [description, setDescription] = useState("Uma aula viva sobre movimento em interfaces.");
  const [platform, setPlatform] = useState("Open Graph");
  const metadataAttribute = platform === "Open Graph" ? "property" : "name";
  const titleKey = platform === "Open Graph" ? "og:title" : "twitter:title";
  const descriptionKey = platform === "Open Graph" ? "og:description" : "twitter:description";
  const encodedTitle = title.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const encodedDescription = description.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return <ConceptDemo id="demo-meta-tags" index="25" term="Meta Tags" description="Escolha o formato de compartilhamento, edite as propriedades e confira os valores no cartão de prévia.">
    <label className="concept-control">Prévia<select value={platform} onChange={(event) => setPlatform(event.target.value)}><option>Open Graph</option><option>Twitter Card</option></select></label>
    <label className="concept-control">{titleKey}<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
    <label className="concept-control">{descriptionKey}<textarea rows={2} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
    <pre className="meta-code">{`<meta ${metadataAttribute}="${titleKey}" content="${encodedTitle}" />\n<meta ${metadataAttribute}="${descriptionKey}" content="${encodedDescription}" />`}</pre>
    <div className="meta-preview"><span>ANATOMIA.EXAMPLE</span><b>{title}</b><p>{description}</p></div>
  </ConceptDemo>;
}

function FaviconDemo() {
  const [mark, setMark] = useState("A");
  const [color, setColor] = useState("#565edb");
  return <ConceptDemo id="demo-favicon" index="26" term="Favicon" description="Personalize o pequeno símbolo e a cor mostrados na aba simulada do navegador.">
    <div className="concept-toolbar"><label className="concept-inline-control">Símbolo<input maxLength={2} value={mark} onChange={(event) => setMark(event.target.value)} /></label><label className="concept-inline-control">Cor<input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label></div>
    <div className="favicon-tab"><svg viewBox="0 0 32 32" role="img" aria-label={`Favicon ${mark || "vazio"}`}><rect width="32" height="32" rx="8" fill={color} /><text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontFamily="sans-serif">{mark || "·"}</text></svg><span>Anatomia</span><button aria-label="Fechar aba">×</button></div>
  </ConceptDemo>;
}

function LazyLoadingDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;
    if (!root || !target || loaded) return;
    if (!("IntersectionObserver" in window)) { setLoaded(true); return; }
    const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { setLoaded(true); observer.disconnect(); } }, { root, rootMargin: "0px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [loaded]);
  const source = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 120'%3E%3Crect width='420' height='120' rx='18' fill='%23565edb'/%3E%3Ccircle cx='350' cy='42' r='26' fill='%23a5e75d'/%3E%3Ctext x='24' y='72' fill='white' font-size='22' font-family='sans-serif'%3EImagem carregada sob demanda%3C/text%3E%3C/svg%3E";
  return <ConceptDemo id="demo-lazy-loading" index="27" term="Lazy Loading" description="Role o contêiner até a imagem. Um IntersectionObserver só cria o recurso quando ele se aproxima da área visível.">
    <div className="lazy-demo-window" ref={rootRef}><div className="lazy-demo-spacer"><span>Conteúdo acima</span><span>Role para continuar ↓</span></div><div className="lazy-demo-target" ref={targetRef}>{loaded ? <img loading="lazy" src={source} alt="Ilustração carregada ao entrar na área visível" /> : <span>Aguardando entrada na área visível…</span>}</div></div>
    <div className="concept-toolbar"><button className="concept-action" onClick={() => rootRef.current?.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao início</button><small className="concept-note" role="status">{loaded ? "Recurso carregado." : "Recurso ainda não carregado."}</small></div>
  </ConceptDemo>;
}

function ViewportDemo() {
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(240);
  return <ConceptDemo id="demo-viewport" index="28" term="Viewport" description="Ajuste largura e altura da área visível simulada e observe quanto conteúdo cabe nela.">
    <label className="concept-control">Largura: {width}px<input type="range" min="240" max="620" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <label className="concept-control">Altura: {height}px<input type="range" min="140" max="360" value={height} onChange={(event) => setHeight(+event.target.value)} /></label>
    <div className="viewport-demo-frame"><div className="viewport-demo-window" style={{ width: `${Math.min(100, (width / 620) * 100)}%`, height: `${Math.min(190, (height / 360) * 190)}px` }}><span className="mono">VIEWPORT · {width} × {height}</span><div>Área atualmente visível</div></div><small>Conteúdo abaixo da borda exige rolagem.</small></div>
  </ConceptDemo>;
}

function PerformanceDemo() {
  const [total, setTotal] = useState(48);
  const [batch, setBatch] = useState(4);
  const [shown, setShown] = useState(0);
  const [frames, setFrames] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startedAt = useRef(0);
  useEffect(() => {
    if (!running || shown >= total) return;
    const frame = requestAnimationFrame(() => {
      const next = Math.min(shown + batch, total);
      setShown(next); setFrames((value) => value + 1);
      if (next >= total) { setRunning(false); setElapsed(performance.now() - startedAt.current); }
    });
    return () => cancelAnimationFrame(frame);
  }, [batch, running, shown, total]);
  const start = () => { setShown(0); setFrames(0); setElapsed(0); startedAt.current = performance.now(); setRunning(true); };
  return <ConceptDemo id="demo-performance" index="29" term="Performance" description="Renderize uma lista em lotes por frame. Ajuste o tamanho dos lotes e acompanhe quadros e tempo sem bloquear a interface.">
    <label className="concept-control">Itens: {total}<input type="range" min="16" max="96" step="8" value={total} onChange={(event) => { setTotal(+event.target.value); setShown(0); setFrames(0); setRunning(false); }} /></label>
    <label className="concept-control">Itens por frame: {batch}<input type="range" min="1" max="16" value={batch} onChange={(event) => setBatch(+event.target.value)} /></label>
    <button className="concept-action" disabled={running} onClick={start}>{running ? "Renderizando…" : shown >= total ? "Executar novamente" : "Renderizar em lotes"}</button>
    <div className="performance-readout"><b>{shown} / {total}</b><span>{frames} frames · {elapsed.toFixed(0)} ms</span></div>
    <div className="performance-demo-output">{Array.from({ length: shown }, (_, index) => <i key={index} />)}</div>
  </ConceptDemo>;
}

export function ConceptLab() {
  return (
    <section className="sec concept-lab" id="conceitos">
      <div className="wrap">
        <div className="sec-head"><div><p className="mono kicker">Conceitos em ação</p><h2 className="display">Mais para explorar.</h2></div><p>Role pelos exemplos, ajuste os controles e observe um conceito de cada vez em funcionamento.</p></div>
        <div className="concept-sequence">
          <div className="concept-chapter"><span className="mono kicker">01 — ESTRUTURA E LAYOUT</span></div>
          <LandingPageDemo /><SectionDemo /><ResponsiveDemo /><BreakpointDemo /><MobileFirstDemo /><ContainerDemo /><ReadingPatternDemo />
          <div className="concept-chapter"><span className="mono kicker">02 — ANIMAÇÃO E COMPONENTES</span></div>
          <AnimationIterationDemo /><SmoothScrollDemo /><CarouselDemo /><ModalDemo /><ToastDemo /><ToggleDemo /><BadgeDemo /><PricingDemo /><FloatingLabelDemo />
          <div className="concept-chapter"><span className="mono kicker">03 — EXPERIÊNCIA E INTERAÇÃO</span></div>
          <UxDemo /><UiDemo /><SocialProofDemo /><AffordanceDemo /><ValidationDemo /><AccessibilityDemo /><ConversionDemo />
          <div className="concept-chapter"><span className="mono kicker">04 — FUNDAMENTOS TÉCNICOS</span></div>
          <SeoDemo /><MetaTagsDemo /><FaviconDemo /><LazyLoadingDemo /><ViewportDemo /><PerformanceDemo />
        </div>
      </div>
    </section>
  );
}
