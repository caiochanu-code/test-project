import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

type DemoCardProps = { id: string; term: string; children: ReactNode };

function DemoCard({ id, term, children }: DemoCardProps) {
  return (
    <article className="concept-card" id={id} data-term={term}>
      <h3>{term}</h3>
      {children}
    </article>
  );
}

function LandingPageDemo() {
  const [started, setStarted] = useState(false);
  return <DemoCard id="demo-landing-page" term="Landing Page">
    <p>Uma página, uma ação principal.</p>
    <div className="concept-preview landing-preview"><b>Aprenda algo novo</b><span>Uma proposta, um próximo passo.</span><button className="concept-button" onClick={() => setStarted(true)}>{started ? "Inscrição iniciada ✓" : "Começar agora →"}</button></div>
  </DemoCard>;
}

function SectionDemo() {
  const [open, setOpen] = useState(false);
  return <DemoCard id="demo-section" term="Section">
    <p>Uma seção organiza conteúdo em um bloco temático.</p>
    <button className="concept-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? "Recolher seção" : "Expandir seção"}</button>
    {open && <div className="concept-preview"><b>Conteúdo da seção</b><p>Este bloco aparece e desaparece sem sair da página.</p></div>}
  </DemoCard>;
}

function ResponsiveDemo() {
  const [width, setWidth] = useState(620);
  return <DemoCard id="demo-responsivo" term="Responsivo">
    <p>Redimensione a prévia para observar a adaptação do layout.</p>
    <label className="concept-range">Largura da prévia: {width}px<input type="range" min="300" max="620" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className="responsive-preview" style={{ width: `${width}px` }}><b>Conteúdo</b><span>Navegação</span><span>Imagem</span></div>
  </DemoCard>;
}

function BreakpointDemo() {
  const [width, setWidth] = useState(640);
  return <DemoCard id="demo-breakpoint" term="Breakpoint">
    <p>Abaixo de 480px, os dois painéis viram uma coluna.</p>
    <label className="concept-range">Viewport: {width}px<input type="range" min="320" max="760" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className={`breakpoint-preview${width < 480 ? " is-narrow" : ""}`}><span>Conteúdo A</span><span>Conteúdo B</span></div>
    <small className="concept-note">{width < 480 ? "Breakpoint ativo · 1 coluna" : "Breakpoint inativo · 2 colunas"}</small>
  </DemoCard>;
}

function MobileFirstDemo() {
  const [width, setWidth] = useState(360);
  return <DemoCard id="demo-mobile-first" term="Mobile First">
    <p>O layout começa compacto e ganha colunas conforme há espaço.</p>
    <label className="concept-range">Largura: {width}px<input type="range" min="320" max="900" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className={`mobile-first-preview${width >= 600 ? " is-wide" : ""}`}><span>Base móvel</span><span>Expansão</span></div>
  </DemoCard>;
}

function ContainerDemo() {
  const [max, setMax] = useState(420);
  return <DemoCard id="demo-container" term="Container">
    <p>Ajuste a largura máxima que contém o conteúdo.</p>
    <label className="concept-range">max-width: {max}px<input type="range" min="180" max="620" value={max} onChange={(event) => setMax(+event.target.value)} /></label>
    <div className="container-demo" style={{ maxWidth: `${max}px` }}>O conteúdo acompanha o limite do container.</div>
  </DemoCard>;
}

function ReadingPatternDemo() {
  const [pattern, setPattern] = useState<"Z" | "F">("Z");
  return <DemoCard id="demo-reading-pattern" term="Z-pattern / F-pattern">
    <p>Alterne a trilha ilustrada de leitura.</p>
    <div className="concept-actions"><button className="concept-button" aria-pressed={pattern === "Z"} onClick={() => setPattern("Z")}>Z-pattern</button><button className="concept-button" aria-pressed={pattern === "F"} onClick={() => setPattern("F")}>F-pattern</button></div>
    <div className={`reading-preview pattern-${pattern.toLowerCase()}`} aria-label={`Ilustração do padrão ${pattern}`}><i /><i /><i /><i /></div>
  </DemoCard>;
}

function AnimationIterationDemo() {
  const [count, setCount] = useState(3);
  const [run, setRun] = useState(0);
  return <DemoCard id="demo-animation-iteration" term="Animation Iteration">
    <p>Defina quantas vezes a animação se repete.</p>
    <label className="concept-range">Repetições: {count}<input type="range" min="1" max="6" value={count} onChange={(event) => setCount(+event.target.value)} /></label>
    <button className="concept-button" onClick={() => setRun((value) => value + 1)}>Reproduzir</button>
    <div className="iteration-stage"><i key={run} style={{ "--iteration-count": count } as CSSProperties} /></div>
  </DemoCard>;
}

function SmoothScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return <DemoCard id="demo-smooth-scroll" term="Smooth Scroll">
    <p>O botão rola esta área suavemente até o destino.</p>
    <button className="concept-button" onClick={() => { const element = scrollRef.current; if (element) element.scrollTo({ top: element.scrollHeight, behavior: "smooth" }); }}>Ir ao destino ↓</button>
    <div className="smooth-preview" ref={scrollRef}><span>Início</span><span>Conteúdo intermediário</span><b>Destino</b></div>
  </DemoCard>;
}

function CarouselDemo() {
  const slides = ["Estrutura", "Tipografia", "Interação"];
  const [index, setIndex] = useState(0);
  const move = (delta: number) => setIndex((value) => (value + delta + slides.length) % slides.length);
  return <DemoCard id="demo-carousel-slider" term="Carousel / Slider">
    <p>Avance ou volte pelos painéis.</p>
    <div className="carousel-preview"><button className="concept-button" aria-label="Anterior" onClick={() => move(-1)}>←</button><b>{slides[index]}</b><button className="concept-button" aria-label="Próximo" onClick={() => move(1)}>→</button></div>
    <small className="concept-note">{index + 1} / {slides.length}</small>
  </DemoCard>;
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return <DemoCard id="demo-modal" term="Modal">
    <p>Abra uma janela sobreposta e feche pelo botão ou pelo fundo.</p>
    <button className="concept-button" onClick={() => setOpen(true)}>Abrir modal</button>
    {open && <div className="concept-modal-backdrop" onClick={() => setOpen(false)}><div className="concept-modal" role="dialog" aria-modal="true" aria-labelledby="concept-modal-title" onClick={(event) => event.stopPropagation()}><button className="concept-modal-close" aria-label="Fechar" onClick={() => setOpen(false)}>×</button><h4 id="concept-modal-title">Janela modal</h4><p>O foco fica nesta decisão até fechar.</p><button className="concept-button" onClick={() => setOpen(false)}>Entendi</button></div></div>}
  </DemoCard>;
}

function ToastDemo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => setShow(false), 2600);
    return () => window.clearTimeout(timer);
  }, [show]);
  return <DemoCard id="demo-toast" term="Toast">
    <p>Mostre uma notificação breve após uma ação.</p>
    <button className="concept-button" onClick={() => setShow(true)}>Exibir notificação</button>
    {show && <div className="concept-toast" role="status">Alteração salva nesta demonstração.</div>}
  </DemoCard>;
}

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return <DemoCard id="demo-toggle-switch" term="Toggle / Switch">
    <p>Alterne uma configuração e veja o estado refletido.</p>
    <button className={`concept-switch${on ? " is-on" : ""}`} role="switch" aria-checked={on} onClick={() => setOn((value) => !value)}><i />{on ? "Ativado" : "Desativado"}</button>
  </DemoCard>;
}

function BadgeDemo() {
  const [status, setStatus] = useState("Rascunho");
  return <DemoCard id="demo-badge" term="Badge">
    <p>O badge comunica um estado curto.</p>
    <select className="concept-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>Rascunho</option><option>Em revisão</option><option>Publicado</option></select>
    <span className={`concept-badge badge-${status === "Publicado" ? "success" : status === "Em revisão" ? "warning" : "neutral"}`}>{status}</span>
  </DemoCard>;
}

function PricingDemo() {
  const [annual, setAnnual] = useState(false);
  return <DemoCard id="demo-pricing-table" term="Pricing Table">
    <p>Alterne a periodicidade para comparar valores ilustrativos.</p>
    <button className="concept-button" aria-pressed={annual} onClick={() => setAnnual((value) => !value)}>{annual ? "Cobrança anual" : "Cobrança mensal"}</button>
    <div className="pricing-preview"><b>Plano Estudo</b><strong>R$ {annual ? "290 / ano" : "29 / mês"}</strong><span>Exemplo de apresentação de preço.</span></div>
  </DemoCard>;
}

function FloatingLabelDemo() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  return <DemoCard id="demo-floating-label" term="Floating Label">
    <p>O rótulo sobe ao focar ou preencher o campo.</p>
    <label className={`floating-field${focused || value ? " is-raised" : ""}`}><span>Seu nome</span><input value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} /></label>
  </DemoCard>;
}

function UxDemo() {
  const [choice, setChoice] = useState("");
  return <DemoCard id="demo-ux" term="UX">
    <p>Uma escolha simples deixa claro o próximo passo.</p>
    <div className="concept-actions"><button className="concept-button" onClick={() => setChoice("Leitura")}>Quero ler</button><button className="concept-button" onClick={() => setChoice("Vídeo")}>Quero assistir</button></div>
    <small className="concept-note" role="status">{choice ? `Preferência selecionada: ${choice}` : "Escolha um formato para continuar."}</small>
  </DemoCard>;
}

function UiDemo() {
  const [view, setView] = useState<"lista" | "grade">("lista");
  return <DemoCard id="demo-ui" term="UI">
    <p>Alterne a apresentação visual do mesmo conteúdo.</p>
    <div className="concept-actions"><button className="concept-button" aria-pressed={view === "lista"} onClick={() => setView("lista")}>Lista</button><button className="concept-button" aria-pressed={view === "grade"} onClick={() => setView("grade")}>Grade</button></div>
    <div className={`ui-preview view-${view}`}><i /><i /><i /></div>
  </DemoCard>;
}

function SocialProofDemo() {
  const quotes = ["“A navegação ficou mais clara.”", "“Encontrei o que precisava.”", "“Aprendi no meu ritmo.”"];
  const [index, setIndex] = useState(0);
  return <DemoCard id="demo-social-proof" term="Social Proof">
    <p>Exemplo fictício de depoimentos, sem representar usuários reais.</p>
    <div className="concept-preview"><b>{quotes[index]}</b><span>Depoimento demonstrativo · {index + 1} de {quotes.length}</span></div>
    <button className="concept-button" onClick={() => setIndex((value) => (value + 1) % quotes.length)}>Ver outro exemplo</button>
  </DemoCard>;
}

function AffordanceDemo() {
  const [sent, setSent] = useState(false);
  return <DemoCard id="demo-affordance" term="Affordance">
    <p>Forma, rótulo e ícone indicam que o elemento pode ser acionado.</p>
    <button className="affordance-button" onClick={() => setSent(true)}>{sent ? "Enviado ✓" : "Enviar formulário →"}</button>
  </DemoCard>;
}

function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <DemoCard id="demo-form-validation" term="Validação de Formulário">
    <p>Valide um campo localmente e informe o que falta.</p>
    <form className="concept-form" onSubmit={submit} noValidate><label htmlFor="demo-email">E-mail</label><input id="demo-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@exemplo.com" aria-invalid={submitted && !valid} aria-describedby="demo-email-message" /><small id="demo-email-message" role="status">{submitted ? valid ? "Formato válido." : "Informe um e-mail válido." : ""}</small><button className="concept-button" type="submit">Validar</button></form>
  </DemoCard>;
}

function AccessibilityDemo() {
  const [reduced, setReduced] = useState(false);
  return <DemoCard id="demo-accessibility" term="Acessibilidade (a11y)">
    <p>Compare movimento normal e movimento reduzido nesta prévia.</p>
    <button className="concept-switch" role="switch" aria-checked={reduced} onClick={() => setReduced((value) => !value)}><i />{reduced ? "Movimento reduzido" : "Movimento normal"}</button>
    <div className={`a11y-preview${reduced ? " is-reduced" : ""}`}><i /></div>
  </DemoCard>;
}

function ConversionDemo() {
  const [clicks, setClicks] = useState(0);
  return <DemoCard id="demo-conversion" term="Conversão">
    <p>Observe uma ação principal e a contagem local de ativações.</p>
    <button className="concept-button" onClick={() => setClicks((value) => value + 1)}>Testar chamada para ação</button>
    <small className="concept-note" role="status">Ações nesta sessão de demonstração: {clicks}</small>
  </DemoCard>;
}

function SeoDemo() {
  const [title, setTitle] = useState("Aprenda WebDesign com exemplos");
  const [description, setDescription] = useState("Explore conceitos de interface em demonstrações simples e interativas.");
  const score = Number(title.trim().length >= 25 && title.trim().length <= 60) + Number(description.trim().length >= 70 && description.trim().length <= 160);
  return <DemoCard id="demo-seo" term="SEO">
    <p>Edite o snippet e confira dois critérios básicos de apresentação.</p>
    <label className="concept-field">Título<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
    <label className="concept-field">Descrição<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={2} /></label>
    <small className="concept-note">Faixa de comprimento ilustrativa: {score}/2 critérios.</small>
    <div className="search-preview"><b>{title || "Título da página"}</b><span>anatomia.example</span><p>{description || "Descrição exibida nos resultados."}</p></div>
  </DemoCard>;
}

function MetaTagsDemo() {
  const [title, setTitle] = useState("Anatomia — caderno visual");
  const [description, setDescription] = useState("Uma aula viva sobre movimento em interfaces.");
  return <DemoCard id="demo-meta-tags" term="Meta Tags">
    <p>Edite os metadados e veja a prévia social atualizar.</p>
    <label className="concept-field">og:title<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
    <label className="concept-field">og:description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={2} /></label>
    <div className="social-preview"><span>ANATOMIA.EXAMPLE</span><b>{title || "Título"}</b><p>{description || "Descrição"}</p></div>
  </DemoCard>;
}

function FaviconDemo() {
  const [icon, setIcon] = useState("A");
  return <DemoCard id="demo-favicon" term="Favicon">
    <p>Escolha um símbolo para a aba demonstrativa.</p>
    <select className="concept-select" value={icon} onChange={(event) => setIcon(event.target.value)}><option value="A">A</option><option value="✦">✦</option><option value="◉">◉</option></select>
    <div className="browser-tab"><span>{icon}</span> Anatomia <i>×</i></div>
  </DemoCard>;
}

function LazyLoadingDemo() {
  const [loaded, setLoaded] = useState(false);
  return <DemoCard id="demo-lazy-loading" term="Lazy Loading">
    <p>Carregue o conteúdo visual só quando solicitar a área.</p>
    <button className="concept-button" onClick={() => setLoaded((value) => !value)}>{loaded ? "Ocultar prévia" : "Entrar na área visível"}</button>
    {loaded ? <img className="lazy-preview" loading="lazy" alt="Ilustração demonstrativa carregada sob demanda" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 100'%3E%3Crect width='320' height='100' rx='16' fill='%23565edb'/%3E%3Ccircle cx='250' cy='35' r='22' fill='%23a5e75d'/%3E%3Ctext x='24' y='60' fill='white' font-size='20' font-family='sans-serif'%3EConteudo carregado%3C/text%3E%3C/svg%3E" /> : <div className="lazy-placeholder">Prévia ainda não carregada</div>}
  </DemoCard>;
}

function ViewportDemo() {
  const [width, setWidth] = useState(360);
  return <DemoCard id="demo-viewport" term="Viewport">
    <p>O viewport é a área visível da página.</p>
    <label className="concept-range">Largura visível: {width}px<input type="range" min="320" max="620" value={width} onChange={(event) => setWidth(+event.target.value)} /></label>
    <div className="viewport-frame" style={{ width: `${width}px` }}><span>Área visível</span><i /></div>
  </DemoCard>;
}

function PerformanceDemo() {
  const [count, setCount] = useState(24);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || shown >= count) return;
    const timer = window.setTimeout(() => setShown((value) => Math.min(value + 4, count)), 100);
    return () => window.clearTimeout(timer);
  }, [count, running, shown]);
  return <DemoCard id="demo-performance" term="Performance">
    <p>Renderize itens em pequenos lotes para acompanhar o progresso.</p>
    <label className="concept-range">Itens: {count}<input type="range" min="8" max="40" step="4" value={count} onChange={(event) => { setCount(+event.target.value); setShown(0); setRunning(false); }} /></label>
    <button className="concept-button" disabled={running && shown < count} onClick={() => { setShown(0); setRunning(true); }}>{shown >= count ? "Repetir renderização" : "Renderizar em lotes"}</button>
    <small className="concept-note" role="status">{shown} / {count} itens renderizados</small>
    <div className="performance-preview">{Array.from({ length: shown }, (_, index) => <i key={index} />)}</div>
  </DemoCard>;
}

export function ConceptLab() {
  return (
    <section className="sec concept-lab" id="conceitos">
      <div className="wrap">
        <div className="sec-head"><div><p className="mono kicker">Conceitos em ação</p><h2 className="display">Mais para explorar.</h2></div><p>Mais 29 termos do glossário, cada um acompanhado de uma demonstração interativa.</p></div>
        <div className="concept-group"><h3>Estrutura e layout</h3><div className="concept-grid"><LandingPageDemo /><SectionDemo /><ResponsiveDemo /><BreakpointDemo /><MobileFirstDemo /><ContainerDemo /><ReadingPatternDemo /></div></div>
        <div className="concept-group"><h3>Animação e componentes</h3><div className="concept-grid"><AnimationIterationDemo /><SmoothScrollDemo /><CarouselDemo /><ModalDemo /><ToastDemo /><ToggleDemo /><BadgeDemo /><PricingDemo /><FloatingLabelDemo /></div></div>
        <div className="concept-group"><h3>Experiência e interação</h3><div className="concept-grid"><UxDemo /><UiDemo /><SocialProofDemo /><AffordanceDemo /><ValidationDemo /><AccessibilityDemo /><ConversionDemo /></div></div>
        <div className="concept-group"><h3>Fundamentos técnicos</h3><div className="concept-grid"><SeoDemo /><MetaTagsDemo /><FaviconDemo /><LazyLoadingDemo /><ViewportDemo /><PerformanceDemo /></div></div>
      </div>
    </section>
  );
}
