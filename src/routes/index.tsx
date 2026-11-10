import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anatomia — animação e movimento no web design" },
      { name: "description", content: "Um caderno interativo de web design. Explore animações, movimento, interação e os termos que dão vida às interfaces." },
      { property: "og:title", content: "Anatomia — animação e movimento no web design" },
      { property: "og:description", content: "Uma aula viva sobre movimento em interfaces, com exemplos que respondem à rolagem e às interações." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const curves = [
  { name: "Ease", value: "ease", note: "começa e termina suavemente" },
  { name: "Ease out", value: "cubic-bezier(0, 0, .2, 1)", note: "chega rápido e desacelera" },
  { name: "Linear", value: "linear", note: "mantém velocidade constante" },
] as const;

function Index() {
  useReveal();
  const [duration, setDuration] = useState(850);
  const [curve, setCurve] = useState<(typeof curves)[number]["value"]>(curves[0].value);
  const [transitionActive, setTransitionActive] = useState(false);
  const [keyframePlay, setKeyframePlay] = useState(0);
  const [staggerPlay, setStaggerPlay] = useState(0);
  const [liked, setLiked] = useState(false);
  const scrubRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrubRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const travel = innerHeight + rect.height;
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / travel));
        el.style.setProperty("--scrub-progress", `${progress * 100}%`);
        el.style.setProperty("--scrub-x", `${10 + progress * 72}%`);
        el.style.setProperty("--scrub-y", `${64 - progress * 38}%`);
      });
    };
    const onVisible = () => { if (document.visibilityState === "visible") update(); };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    document.addEventListener("visibilitychange", onVisible);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", update); removeEventListener("resize", update); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
        const p = Math.max(0, Math.min(1, progress));
        el.style.setProperty("--para-back-y", `${(p - 0.5) * -90}px`);
        el.style.setProperty("--para-mid-y", `${(p - 0.5) * -48}px`);
        el.style.setProperty("--para-front-y", `${(p - 0.5) * -18}px`);
      });
    };
    const onVisible = () => { if (document.visibilityState === "visible") update(); };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    document.addEventListener("visibilitychange", onVisible);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", update); removeEventListener("resize", update); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="hero" data-term="Hero Section">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="orb orb-1 motion-orb" aria-hidden="true" />
          <div className="orb orb-2 motion-orb" aria-hidden="true" />
          <div className="orb orb-3 motion-orb" aria-hidden="true" />
          <div className="wrap motion-hero-copy">
            <p className="mono kicker" data-term="Eyebrow">Caderno visual · WebDesign em movimento</p>
            <h1 className="display" data-term="Kinetic Typography"><span className="line"><span>Uma interface</span></span><span className="line"><span>também pode</span></span><span className="line"><span><em>dançar.</em></span></span></h1>
          </div>
          <div className="wrap hero-foot">
            <p data-term="Subheadline">Role a página e observe: cada demonstração separa o conceito do efeito. Interaja, compare e entenda o que o movimento comunica.</p>
            <div className="btns"><a href="#animacoes" className="btn btn-primary">Explorar movimento <span className="arr">↓</span></a><a href="/glossario" className="btn btn-ghost">Glossário A–Z</a></div>
            <div className="scroll-cue mono hide-sm" data-term="Scroll Cue"><i />Role</div>
          </div>
        </section>

        <div className="marquee" id="marquee" data-term="Marquee"><div className="marquee-track">{[0, 1].map((k) => <div className="marquee-group" key={k}>{["Transition", "Keyframes", "Stagger", "Scroll Reveal", "Easing", "Parallax", "Scroll-linked", "Microinteração"].map((w) => <span key={`${k}-${w}`}>{w}</span>)}</div>)}</div></div>

        <section className="sec" id="animacoes">
          <div className="wrap">
            <div className="sec-head reveal"><div><p className="mono kicker">[01] Motion Lab</p><h2 className="display">Movimento com propósito.</h2></div><p>Uma animação bem construída deixa clara a relação entre ação, resposta e continuidade. Ajuste os controles e observe cada propriedade em ação.</p></div>

            <article className="motion-demo reveal" data-term="Transition · Duration · Easing">
              <div className="motion-demo-copy"><span className="mono kicker">01 / TRANSITION</span><h3>Um estado encontra o outro.</h3><p><b>Transition</b> interpola uma mudança de estado. <b>Duration</b> define quanto tempo leva; <b>easing</b> distribui a velocidade durante o percurso.</p><label className="motion-control">Duração <output>{(duration / 1000).toFixed(2)}s</output><input aria-label="Duração da transição" type="range" min="250" max="1600" step="50" value={duration} onChange={(e) => setDuration(+e.target.value)} /></label><div className="curve-picks" aria-label="Curva de easing">{curves.map((c) => <button key={c.name} className={curve === c.value ? "is-selected" : ""} onClick={() => setCurve(c.value)} aria-pressed={curve === c.value}>{c.name}</button>)}</div><small className="motion-note">{curves.find((c) => c.value === curve)?.note}</small></div>
              <div className="transition-stage" style={{ "--demo-duration": `${duration}ms`, "--demo-ease": curve } as CSSProperties}><button className={`transition-orb${transitionActive ? " is-active" : ""}`} aria-label="Passe o cursor ou foque para executar a transição" aria-pressed={transitionActive} onClick={() => { if (matchMedia("(pointer: coarse)").matches) setTransitionActive((active) => !active); }}>Passe ou foque</button><span className="mono">HOVER / FOCUS</span></div>
            </article>

            <div className="motion-pair">
              <article className="motion-tile reveal" data-term="@keyframes · Animation Duration"><span className="mono kicker">02 / KEYFRAMES</span><h3>Uma sequência no tempo.</h3><p><b>@keyframes</b> marca etapas visuais. A animação executa a sequência em 1,15 segundo; o botão reinicia a demonstração.</p><button className="btn btn-primary" onClick={() => setKeyframePlay((p) => p + 1)}>Reproduzir sequência <span className="arr">↗</span></button><div className="keyframe-stage"><div key={keyframePlay} className="keyframe-shape" aria-label="Forma animada" /></div></article>
              <article className="motion-tile reveal" data-term="Stagger · Animation Delay"><span className="mono kicker">03 / STAGGER</span><h3>Um após o outro.</h3><p><b>Stagger</b> aplica atrasos progressivos a elementos de um grupo, criando uma entrada em cascata.</p><button className="btn btn-ghost" onClick={() => setStaggerPlay((p) => p + 1)}>Repetir entrada</button><div key={`stagger-${staggerPlay}`} className="stagger-row" aria-label="Itens aparecendo em sequência">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ "--stagger-index": i } as CSSProperties} />)}</div></article>
            </div>

            <article className="motion-demo scroll-demo reveal" data-term="Scroll-linked Animation · Scroll Scrubbing" ref={scrubRef}>
              <div className="motion-demo-copy"><span className="mono kicker">04 / SCROLL-LINKED</span><h3>O scroll é a linha do tempo.</h3><p>Nesta demonstração, a posição do marcador acompanha diretamente o quanto este quadro atravessa a tela. Isto é <b>scroll-linked animation</b> (ou <b>scrubbing</b>): o progresso depende da rolagem, não de um temporizador.</p><span className="mono scrub-readout">PROGRESSO VINCULADO À ROLAGEM</span></div>
              <div className="scrub-stage"><div className="scrub-track"><i className="scrub-marker" /><span className="scrub-label mono">0%</span><span className="scrub-label mono">100%</span></div><div className="scrub-sun" /></div>
            </article>

            <div className="motion-pair motion-pair-bottom">
              <article className="motion-tile reveal" data-term="Scroll Reveal · Intersection Observer"><span className="mono kicker">05 / SCROLL REVEAL</span><h3>Aparecer no momento certo.</h3><p>O conteúdo entra quando cruza a área visível. Aqui, um <b>Intersection Observer</b> identifica a entrada; a classe ativa anima opacidade e posição uma única vez.</p><div className="reveal-steps">{["conteúdo fora da tela", "elemento observado", "reveal is-in"].map((x, i) => <div className="reveal-step" key={x}><span className="mono">0{i + 1}</span><b>{x}</b></div>)}</div></article>
              <article className="motion-tile reveal" data-term="Parallax · Transform"><span className="mono kicker">06 / PARALLAX</span><h3>Camadas, velocidades diferentes.</h3><p>O <b>parallax</b> cria profundidade: cada camada percorre uma distância diferente conforme a rolagem avança.</p><div ref={parallaxRef} className="parallax-stage"><span className="para-back">01</span><span className="para-mid">02</span><span className="para-front">03</span></div></article>
            </div>
          </div>
        </section>

        <section className="sec sec-soft" id="bento">
          <div className="wrap"><div className="sec-head reveal"><div><p className="mono kicker">[02] Microinterações</p><h2 className="display">Pequenas respostas.</h2></div><p>Transições e feedbacks deixam as ações legíveis. Cada card demonstra um efeito diferente; passe o cursor, use Tab e clique.</p></div>
            <div className="bento" data-term="Bento Grid">
              <article className="card c-a reveal" data-term="Hover State · Transform"><span className="mono">HOVER / TRANSFORM</span><div><h3>Um cartão muda de posição.</h3><p>Transform move o elemento sem recalcular o espaço ao redor.</p></div></article>
              <article className="card c-b glass-stage reveal" data-term="Glassmorphism"><span className="mono" style={{ color: "var(--primary-foreground)" }}>BACKDROP FILTER</span><div className="glass"><b>Glassmorphism</b><br /><small>blur + transparência</small></div></article>
              <article className="card c-c neu-stage reveal" data-term="Active State · Transition"><span className="mono">ACTIVE STATE</span><button className="neu" onClick={(e) => e.currentTarget.classList.toggle("is-pressed")}>Pressione</button></article>
              <article className="card c-d reveal" data-term="Microinteração · Feedback"><span className="mono">FEEDBACK</span><div><button className={`heart${liked ? " is-on" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? "Remover favorito" : "Favoritar"}>{liked ? "♥" : "♡"}</button><p>Uma resposta visual confirma a ação.</p></div></article>
              <article className="card c-e reveal" data-term="Skeleton Loader · Shimmer"><span className="mono">SHIMMER</span><div style={{ display: "grid", gap: 10 }}><div className="skel" style={{ width: "70%" }} /><div className="skel" /><div className="skel" style={{ width: "45%" }} /></div></article>
              <article className="card c-f reveal" data-term="Tooltip · Focus State"><span className="mono">HOVER / FOCUS</span><div className="btns"><span className="tip" data-tip="Uma dica contextual"><button className="btn btn-ghost">Tooltip</button></span><button className="btn btn-ghost">Acesse com Tab</button></div></article>
              <article className="card c-g reveal" data-term="prefers-reduced-motion · Acessibilidade"><span className="mono">ACESSIBILIDADE</span><div><h3>Respeito ao movimento reduzido.</h3><p>Com <code>prefers-reduced-motion</code>, efeitos não essenciais são reduzidos para respeitar a preferência do sistema.</p></div></article>
            </div>
          </div>
        </section>

        <DesignSystem />
        <Process />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}

function DesignSystem() {
  const tabs = ["Tipografia", "Cor", "Espaçamento"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tipografia");
  const [tracking, setTracking] = useState(-2);
  const [leading, setLeading] = useState(110);
  const [size, setSize] = useState(56);
  return <section className="sec" id="sistema"><div className="wrap"><div className="sec-head reveal"><div><p className="mono kicker">[03] Design System</p><h2 className="display">Os tijolos visuais.</h2></div><p>Cor, tipo e espaçamento são decisões sistemáticas. As tabs trocam o painel sem sair do contexto.</p></div>
    <div className="tabs" role="tablist" aria-label="Tokens do design system" data-term="Tabs">{tabs.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}</div>
    <div className="panel" key={tab} role="tabpanel">{tab === "Tipografia" && <div data-term="Escala Tipográfica">{[["Hero · Serif", 72, "var(--font-hero)", "Instrument Serif"], ["H2 · Grotesque", 44, "var(--font-display)", "Bricolage Grotesque"], ["Body · Sans", 20, "var(--font-sans)", "Bricolage Grotesque — leitura"], ["Label · Mono", 13, "var(--font-mono)", "IBM PLEX MONO 0123"]].map(([l, s, f, txt]) => <div className="type-row" key={String(l)}><span className="mono">{l} · {s}px</span><span style={{ fontSize: Number(s), fontFamily: String(f), lineHeight: 1.1, letterSpacing: Number(s) > 40 ? "-.03em" : 0 }}>{txt}</span></div>)}</div>}
      {tab === "Cor" && <div className="swatches" data-term="Paleta de Cores">{[["Papel", "var(--background)", "Fundo"], ["Tinta", "var(--foreground)", "Texto"], ["Sinal", "var(--primary)", "Ação"], ["Lima", "var(--accent)", "Destaque"], ["Azul", "var(--blue)", "Foco"], ["Gradiente", "var(--gradient)", "Ênfase"]].map(([n, c, u]) => <div className="swatch" key={n}><div style={{ background: c }} /><p><b>{n}</b><br /><span className="mono" style={{ color: "var(--muted-foreground)" }}>{u}</span></p></div>)}</div>}
      {tab === "Espaçamento" && <div data-term="Grid de 8pt">{[4, 8, 16, 24, 32, 48, 64, 96, 128].map((n) => <div className="space-row" key={n}><span className="mono" style={{ width: 70 }}>{n}px</span><i style={{ width: n * 3 }} /></div>)}</div>}
    </div><div className="lab-control reveal"><div><label className="mono">Tracking: {tracking / 100}em</label><input type="range" min={-8} max={20} value={tracking} onChange={(e) => setTracking(+e.target.value)} /><label className="mono">Leading: {leading}%</label><input type="range" min={80} max={180} value={leading} onChange={(e) => setLeading(+e.target.value)} /><label className="mono">Tamanho: {size}px</label><input type="range" min={20} max={96} value={size} onChange={(e) => setSize(+e.target.value)} /></div><p className="display" style={{ fontSize: size, letterSpacing: `${tracking / 100}em`, lineHeight: leading / 100, margin: 0 }} data-term="Kerning · Tracking · Leading">Bom design é invisível.</p></div>
  </div></section>;
}

function Process() {
  const steps = [["Estrutura", "Wireframe define hierarquia e posição antes da camada visual."], ["Aparência", "Mockup aplica tipografia, cor e contraste ao esqueleto."], ["Comportamento", "Protótipo valida interações, transições e fluxo de uso."]];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset["i"]))), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return <section className="sec" id="processo"><div className="wrap"><div className="sec-head reveal"><div><p className="mono kicker">[04] Scrollytelling</p><h2 className="display">A forma acompanha a ideia.</h2></div><p>Role por cada etapa. O protótipo à esquerda é atualizado pela posição da narrativa na tela.</p></div><div className="story" data-term="Scrollytelling"><div className="story-sticky"><div className={`frame s${active}`}><div /><div className="f-hero" /><div className="f-cta" /></div></div><div className="story-steps">{steps.map(([t, d], i) => <div key={t} data-i={i} ref={(el) => { refs.current[i] = el; }} className={active === i ? "is-active" : ""}><span className="mono kicker">Etapa 0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></div></section>;
}

function Faq() {
  const qs = [["O que é transition?", "Uma transition interpola valores entre dois estados, normalmente disparados por hover, foco ou uma classe. Ela não cria uma sequência autônoma."], ["Qual a diferença entre keyframes e scroll-linked?", "Keyframes avançam com o tempo. Uma animação vinculada à rolagem avança ou recua conforme a posição do scroll."], ["O que é easing?", "É a curva que distribui a velocidade ao longo de uma animação. Uma boa curva ajuda o movimento a parecer coerente com a ação."], ["Por que respeitar movimento reduzido?", "Algumas pessoas preferem reduzir movimento por conforto ou acessibilidade. A interface deve respeitar a preferência do sistema."]];
  const [open, setOpen] = useState(0);
  return <section className="sec" id="faq"><div className="wrap" style={{ maxWidth: 900 }}><p className="mono kicker reveal">[05] Glossário em contexto</p><h2 className="display reveal" style={{ fontSize: "clamp(40px,6vw,84px)", margin: "12px 0 40px" }}>Termos sem mistério.</h2><div data-term="Accordion">{qs.map(([q, a], i) => <div key={q} className={`acc-item${open === i ? " is-open" : ""}`}><button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="plus">+</span></button><div className="acc-body"><div><p>{a}</p></div></div></div>)}</div><a href="/glossario" className="btn btn-ghost glossary-cta">Abrir glossário A–Z <span className="arr">↗</span></a></div></section>;
}
