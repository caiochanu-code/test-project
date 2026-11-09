import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anatomia — o site que ensina web design" },
      { name: "description", content: "Estúdio de web design interativo: cada seção demonstra e explica um termo — hero, bento grid, parallax, tabs, accordion e mais." },
      { property: "og:title", content: "Anatomia — o site que ensina web design" },
      { property: "og:description", content: "Um site profissional que se explica. Ative o Raio-X e aprenda os termos de web design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const words = ["interfaces", "marcas", "experiências", "sites"];

function rippleOn(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const s = document.createElement("span");
  const size = Math.max(r.width, r.height);
  s.className = "ripple";
  Object.assign(s.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - r.left - size / 2}px`, top: `${e.clientY - r.top - size / 2}px` });
  el.appendChild(s);
  setTimeout(() => s.remove(), 650);
}

function Index() {
  useReveal();
  const [word, setWord] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pressed, setPressed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  // Parallax: orbes se movem em velocidades diferentes no scroll + mouse
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const orbs = Array.from(hero.querySelectorAll<HTMLElement>("[data-speed]"));
    let mx = 0, my = 0;
    const apply = () => orbs.forEach((o) => {
      const sp = Number(o.dataset["speed"]);
      o.style.transform = `translate(${mx * sp * 40}px, ${scrollY * sp + my * sp * 40}px)`;
    });
    const onMove = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; apply(); };
    addEventListener("scroll", apply, { passive: true });
    hero.addEventListener("pointermove", onMove);
    return () => { removeEventListener("scroll", apply); hero.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="hero" ref={heroRef} data-term="Hero Section">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="orb orb-1" data-speed="0.25" data-term="Parallax" />
          <div className="orb orb-2" data-speed="-0.15" />
          <div className="orb orb-3" data-speed="0.4" />
          <div className="wrap" style={{ position: "relative" }}>
            <p className="mono kicker" data-term="Eyebrow">● Estúdio de web design — desde 2014</p>
            <h1 className="display" data-term="Kinetic Typography">
              <span className="line"><span>Desenhamos</span></span>
              <span className="line"><span><span className="rotator"><span key={word}>{words[word]}</span></span></span></span>
              <span className="line"><span>que se <em>explicam.</em></span></span>
            </h1>
          </div>
          <div className="wrap hero-foot">
            <p data-term="Subheadline">Este site é uma aula viva. Cada bloco demonstra um conceito de web design — ligue o <b>Raio-X</b> no topo e veja o nome de cada elemento.</p>
            <div className="btns">
              <a href="#contato" className="btn btn-primary" onClick={rippleOn} data-term="CTA Primário">Começar projeto <span className="arr">→</span></a>
              <a href="/glossario" className="btn btn-ghost" onClick={rippleOn} data-term="Botão Ghost">Ver glossário</a>
            </div>
            <div className="scroll-cue mono hide-sm"><i />Role</div>
          </div>
        </section>

        <div className="marquee" id="marquee" data-term="Marquee">
          <div className="marquee-track">
            {[0, 1].map((k) => ["Hero", "Grid", "Tipografia", "Paleta", "Parallax", "Microinteração", "Whitespace", "Hierarquia", "Contraste", "UX"].map((w) => <span key={`${k}${w}`}>{w}</span>))}
          </div>
        </div>

        <section className="sec" id="bento">
          <div className="wrap">
            <div className="sec-head reveal">
              <div><p className="mono kicker">[01] Componentes</p><h2 className="display">Uma vitrine em bento.</h2></div>
              <p>Cards de tamanhos diferentes formam um <b>Bento Grid</b>. Passe o mouse, clique e brinque — cada um é um estado ou efeito.</p>
            </div>
            <div className="bento" data-term="Bento Grid">
              <article className="card c-a reveal" data-term="Gradiente">
                <span className="mono">Card destaque</span>
                <div><h3>Design é como funciona.</h3><p>Gradientes chamam o olhar para o ponto mais importante da composição.</p></div>
              </article>
              <article className="card c-b glass-stage reveal" data-term="Glassmorphism">
                <span className="mono" style={{ color: "var(--primary-foreground)" }}>Vidro fosco</span>
                <div className="glass"><b>Glassmorphism</b><br /><small>backdrop-filter: blur(16px)</small></div>
              </article>
              <article className="card c-c neu-stage reveal" data-term="Neumorphism">
                <span className="mono">Clique e segure</span>
                <button className={`neu${pressed ? " is-pressed" : ""}`} onClick={() => setPressed(!pressed)} aria-pressed={pressed}>{pressed ? "ON" : "OFF"}</button>
              </article>
              <article className="card c-d reveal" data-term="Microinteração">
                <span className="mono">Curtir</span>
                <div><button className={`heart${liked ? " is-on" : ""}`} onClick={() => { setLiked(!liked); setToast(liked ? "Curtida removida" : "Você curtiu ♥"); }} aria-label="Curtir">{liked ? "♥" : "♡"}</button><p>Uma resposta pequena que dá vida à ação.</p></div>
              </article>
              <article className="card c-e reveal" data-term="Skeleton Loader">
                <span className="mono">Carregando…</span>
                <div style={{ display: "grid", gap: 10 }}><div className="skel" style={{ width: "70%" }} /><div className="skel" /><div className="skel" style={{ width: "45%" }} /></div>
              </article>
              <article className="card c-f reveal" data-term="Tooltip">
                <span className="mono">Passe o mouse</span>
                <div className="btns">
                  <span className="tip" data-tip="Eu sou um tooltip!"><button className="btn btn-ghost" style={{ height: 44 }}>Tooltip</button></span>
                  <button className="btn btn-ghost" style={{ height: 44 }} onClick={() => setToast("Isto é um toast ✓")} data-term="Toast">Toast</button>
                  <button className="btn" style={{ height: 44 }} onClick={() => setModal(true)} data-term="Modal">Abrir modal</button>
                </div>
              </article>
              <article className="card c-g reveal" data-term="Hover State">
                <span className="mono">Estados</span>
                <div><h3>Hover, focus, active.</h3><p>Este card sobe e ganha sombra no hover. Use Tab para ver o focus state nos botões.</p></div>
              </article>
            </div>
          </div>
        </section>

        <DesignSystem />
        <Process />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact onSent={() => setToast("Mensagem enviada! Responderemos em 24h.")} />
      </main>
      <SiteFooter />

      {modal && (
        <div className="overlay center" onClick={() => setModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mt" onClick={(e) => e.stopPropagation()}>
            <p className="mono kicker">Modal</p>
            <h3 id="mt" className="display" style={{ fontSize: 44, margin: "10px 0" }}>Uma janela sobreposta.</h3>
            <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>O modal interrompe o fluxo para pedir atenção. Use com moderação. Feche com o botão, clicando fora ou pela tecla Esc.</p>
            <button className="btn btn-primary" onClick={() => setModal(false)} autoFocus>Entendi</button>
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </>
  );
}

function DesignSystem() {
  const tabs = ["Tipografia", "Cor", "Espaçamento", "Laboratório"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tipografia");
  const [tracking, setTracking] = useState(-2);
  const [leading, setLeading] = useState(110);
  const [size, setSize] = useState(56);
  return (
    <section className="sec" id="sistema">
      <div className="wrap">
        <div className="sec-head reveal">
          <div><p className="mono kicker">[02] Design System</p><h2 className="display">Os tijolos de tudo.</h2></div>
          <p>Um <b>design system</b> reúne tokens de cor, tipo e espaço. Navegue pelas <b>Tabs</b> abaixo.</p>
        </div>
        <div className="tabs" role="tablist" data-term="Tabs">
          {tabs.map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div className="panel" key={tab} role="tabpanel">
          {tab === "Tipografia" && (
            <div data-term="Escala Tipográfica">
              {[["Display · Serif", 72, "var(--font-display)", "Fraunces"], ["H2 · Serif", 44, "var(--font-display)", "Hierarquia"], ["Body · Sans", 20, "var(--font-sans)", "Bricolage Grotesque — legível e amigável."], ["Label · Mono", 13, "var(--font-mono)", "JETBRAINS MONO 0123"]].map(([l, s, f, txt]) => (
                <div className="type-row" key={String(l)}><span className="mono">{l} · {s}px</span><span style={{ fontSize: Number(s), fontFamily: String(f), lineHeight: 1.1, letterSpacing: Number(s) > 40 ? "-.03em" : 0 }}>{txt}</span></div>
              ))}
            </div>
          )}
          {tab === "Cor" && (
            <div className="swatches" data-term="Paleta de Cores">
              {[["Papel", "var(--background)", "Fundo"], ["Tinta", "var(--foreground)", "Texto · contraste AAA"], ["Sinal", "var(--primary)", "Accent / CTA"], ["Lima", "var(--accent)", "Destaque secundário"], ["Azul", "var(--blue)", "Foco e links"], ["Gradiente", "var(--gradient)", "Ênfase"]].map(([n, c, u]) => (
                <div className="swatch" key={n}><div style={{ background: c }} /><p><b>{n}</b><br /><span className="mono" style={{ color: "var(--muted-foreground)" }}>{u}</span></p></div>
              ))}
            </div>
          )}
          {tab === "Espaçamento" && (
            <div data-term="Grid de 8pt">
              {[4, 8, 16, 24, 32, 48, 64, 96, 128].map((n) => <div className="space-row" key={n}><span className="mono" style={{ width: 70 }}>{n}px</span><i style={{ width: n * 3 }} /></div>)}
            </div>
          )}
          {tab === "Laboratório" && (
            <div className="lab">
              <div>
                <label className="mono">Tracking (espaço entre letras): {tracking / 100}em</label>
                <input type="range" min={-8} max={20} value={tracking} onChange={(e) => setTracking(+e.target.value)} />
                <label className="mono">Leading (altura de linha): {leading}%</label>
                <input type="range" min={80} max={180} value={leading} onChange={(e) => setLeading(+e.target.value)} />
                <label className="mono">Tamanho: {size}px</label>
                <input type="range" min={20} max={96} value={size} onChange={(e) => setSize(+e.target.value)} />
              </div>
              <p className="display" style={{ fontSize: size, letterSpacing: `${tracking / 100}em`, lineHeight: leading / 100, margin: 0 }} data-term="Kerning · Tracking · Leading">Bom design é invisível.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Wireframe", "O esqueleto: blocos tracejados definem onde cada coisa vai, sem cor nem estilo."],
    ["Mockup", "Alta fidelidade: entram cores, tipografia e imagens. É o visual final, ainda estático."],
    ["Protótipo", "Tudo ganha vida: cliques, transições e fluxo real para testar com pessoas."],
  ];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset["i"]))), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section className="sec" id="processo">
      <div className="wrap">
        <div className="sec-head reveal"><div><p className="mono kicker">[03] Scrollytelling</p><h2 className="display">Do rascunho ao real.</h2></div><p>Role devagar: o quadro à esquerda evolui conforme a história avança.</p></div>
        <div className="story" data-term="Scrollytelling">
          <div className="story-sticky">
            <div className={`frame s${active}`}><div /><div className="f-hero" /><div className="f-cta" /></div>
          </div>
          <div className="story-steps">
            {steps.map(([t, d], i) => (
              <div key={t} data-i={i} ref={(el) => { refs.current[i] = el; }} className={active === i ? "is-active" : ""}>
                <span className="mono kicker">Etapa 0{i + 1}</span><h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    ["“Entendi em uma tarde o que levei anos tentando aprender sozinha.”", "Marina Lopes — Designer Júnior"],
    ["“O modo Raio-X é genial. Virou referência no meu time.”", "Rafael Costa — Head de Produto"],
    ["“Profissional, bonito e didático. Raro ver os três juntos.”", "Júlia Andrade — Diretora de Arte"],
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % items.length), 5000); return () => clearInterval(t); }, [items.length]);
  return (
    <section className="sec" id="depoimentos" data-term="Social Proof">
      <div className="wrap">
        <p className="mono kicker reveal">[04] Depoimentos</p>
        <div className="carousel reveal" data-term="Carousel" style={{ margin: "30px 0" }}>
          <div className="carousel-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {items.map(([q, a]) => <div className="slide" key={a}><blockquote>{q}</blockquote><p className="mono" style={{ marginTop: 24 }}>{a}</p></div>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button className="icon-btn" onClick={() => setI((i - 1 + items.length) % items.length)} aria-label="Anterior">←</button>
          <div className="dots">{items.map((_, k) => <button key={k} className={k === i ? "is-on" : ""} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} />)}</div>
          <button className="icon-btn" onClick={() => setI((i + 1) % items.length)} aria-label="Próximo">→</button>
        </div>
        <div className="stats reveal">
          <Counter to={240} label="projetos entregues" /><Counter to={98} label="% de clientes satisfeitos" suffix="%" /><Counter to={12} label="anos de estúdio" />
        </div>
      </div>
    </section>
  );
}

function Counter({ to, label, suffix = "+" }: { to: number; label: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - start) / 1400); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <div ref={ref}><b>{n}{suffix}</b><span className="mono">{label}</span></div>;
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { n: "Landing", p: 2900, f: ["1 página de conversão", "Design responsivo", "SEO básico"] },
    { n: "Site completo", p: 6900, f: ["Até 8 páginas", "Design system próprio", "Animações e interações", "Suporte 60 dias"], pop: true },
    { n: "Produto", p: 14900, f: ["UX research", "Protótipo navegável", "Testes com usuários", "Handoff para devs"] },
  ];
  return (
    <section className="sec" id="precos">
      <div className="wrap">
        <div className="sec-head reveal">
          <div><p className="mono kicker">[05] Pricing Table</p><h2 className="display">Planos claros.</h2></div>
          <label style={{ display: "flex", alignItems: "center", gap: 12 }} data-term="Toggle Switch">
            <span>Mensal</span>
            <button className="switch" role="switch" aria-checked={yearly} onClick={() => setYearly(!yearly)} aria-label="Cobrança anual" />
            <span>Anual <span className="badge mono">-20%</span></span>
          </label>
        </div>
        <div className="prices" data-term="Pricing Table">
          {plans.map((pl) => (
            <article key={pl.n} className={`price reveal${pl.pop ? " is-pop" : ""}`}>
              {pl.pop && <span className="badge mono" data-term="Badge">Mais escolhido</span>}
              <p className="mono" style={{ margin: 0 }}>{pl.n}</p>
              <div className="amt">R${Math.round((yearly ? pl.p * 0.8 : pl.p) / 100) / 10}k</div>
              <ul>{pl.f.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href="#contato" className={`btn ${pl.pop ? "btn-primary" : "btn-ghost"}`} style={{ justifyContent: "center", marginTop: "auto" }}>Escolher</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qs = [
    ["O que é UI e o que é UX?", "UI (User Interface) é o visual: botões, cores, tipografia. UX (User Experience) é a sensação de usar: se é fácil, rápido e agradável. Um bom produto precisa dos dois."],
    ["O que significa 'above the fold'?", "É tudo que aparece na tela antes de rolar. Por isso o hero precisa dizer quem você é e o que oferece em poucos segundos."],
    ["Por que usar um grid?", "O grid cria alinhamento e ritmo. Mesmo layouts 'quebrados' partem de um grid para que a quebra pareça intencional."],
    ["Quantas fontes devo usar?", "Em geral, duas ou três: uma de destaque (display), uma para leitura (body) e, opcionalmente, uma monoespaçada para detalhes."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="sec" id="faq">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <p className="mono kicker reveal">[06] Accordion</p>
        <h2 className="display reveal" style={{ fontSize: "clamp(40px,6vw,84px)", margin: "12px 0 40px" }}>Perguntas frequentes.</h2>
        <div data-term="Accordion">
          {qs.map(([q, a], i) => (
            <div key={q} className={`acc-item${open === i ? " is-open" : ""}`}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="plus">+</span></button>
              <div className="acc-body"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ onSent }: { onSent: () => void }) {
  const [v, setV] = useState({ nome: "", email: "", msg: "" });
  const [touched, setTouched] = useState(false);
  const errs = {
    nome: v.nome.trim().length < 2 ? "Digite seu nome" : "",
    email: /^\S+@\S+\.\S+$/.test(v.email) ? "" : "E-mail inválido",
    msg: v.msg.trim().length < 10 ? "Conte um pouco mais (mín. 10 caracteres)" : "",
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (Object.values(errs).some(Boolean)) return;
    onSent();
    setV({ nome: "", email: "", msg: "" });
    setTouched(false);
  };
  const cls = (k: keyof typeof errs) => `field${touched ? (errs[k] ? " is-err" : " is-ok") : ""}`;
  return (
    <section className="sec" id="contato">
      <div className="wrap lab" style={{ alignItems: "start" }}>
        <div className="reveal">
          <p className="mono kicker">[07] Formulário</p>
          <h2 className="display" style={{ fontSize: "clamp(48px,7vw,104px)", margin: "12px 0 20px" }}>Vamos criar algo?</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: "40ch" }}>Repare nos <b>floating labels</b>, no <b>focus state</b> azul e na <b>validação</b> com feedback visual ao enviar.</p>
        </div>
        <form className="form reveal" onSubmit={submit} noValidate data-term="Validação de Formulário">
          <div className={cls("nome")} data-term="Floating Label"><input id="nome" placeholder=" " value={v.nome} onChange={(e) => setV({ ...v, nome: e.target.value })} /><label htmlFor="nome">Seu nome</label>{touched && errs.nome && <span className="err">{errs.nome}</span>}</div>
          <div className={cls("email")}><input id="email" type="email" placeholder=" " value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} /><label htmlFor="email">E-mail</label>{touched && errs.email && <span className="err">{errs.email}</span>}</div>
          <div className={cls("msg")}><textarea id="msg" rows={4} placeholder=" " value={v.msg} onChange={(e) => setV({ ...v, msg: e.target.value })} /><label htmlFor="msg">Sobre o projeto</label>{touched && errs.msg && <span className="err">{errs.msg}</span>}</div>
          <button className="btn btn-primary" type="submit" style={{ justifyContent: "center" }} onClick={rippleOn}>Enviar mensagem <span className="arr">→</span></button>
        </form>
      </div>
    </section>
  );
}
