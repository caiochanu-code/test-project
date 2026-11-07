import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bicho. — cuidado de outro mundo" },
      { name: "description", content: "Banho, tosa e cuidado veterinário com muito carinho. Conheça a Bicho." },
    ],
  }),
  component: Index,
});

const navItems: [string, string, string][] = [
  ["01", "Banho & tosa", "#banho"],
  ["02", "Clínica", "#clinica"],
  ["03", "Nossa história", "#historia"],
  ["04", "Nossa turma", "#parceiros"],
  ["05", "Contato", "#contato"],
];

function Index() {
  const site = useRef<HTMLElement>(null);
  const years = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const root = site.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll]"));
    const stagger = new Map<HTMLElement, number>();
    for (const element of elements) {
      const group = element.closest("[data-scroll-group]") as HTMLElement | null;
      const siblings = !group || group === element ? [element] : Array.from(group.querySelectorAll<HTMLElement>("[data-scroll]"));
      stagger.set(element, siblings.indexOf(element));
    }

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const viewport = window.innerHeight;
        for (const element of elements) {
          const bounds = element.getBoundingClientRect();
          const index = stagger.get(element) ?? 0;
          const start = viewport * 0.9 - index * 42;
          const end = viewport * 0.43 - index * 42;
          const reveal = Math.min(1, Math.max(0, (start - bounds.top) / Math.max(1, start - end)));
          const depth = Number(element.dataset.depth ?? 0.08);
          const center = bounds.top + bounds.height / 2;
          const parallax = (viewport * 0.54 - center) * depth;
          element.style.setProperty("--reveal-opacity", String(reveal));
          element.style.setProperty("--reveal-y", `${(1 - reveal) * 66}px`);
          element.style.setProperty("--reveal-scale", String(0.9 + reveal * 0.1));
          element.style.setProperty("--parallax-y", `${parallax}px`);
          if (element.hasAttribute("data-expression")) {
            const eyeMotion = Math.min(1, Math.max(0, (reveal - 0.12) / 0.68));
            const mouthMotion = Math.min(1, Math.max(0, (reveal - 0.42) / 0.5));
            const easeEye = eyeMotion * eyeMotion * (3 - 2 * eyeMotion);
            const easeMouth = mouthMotion * mouthMotion * (3 - 2 * mouthMotion);
            element.style.setProperty("--eye-open", String(0.16 + easeEye * 0.84));
            element.style.setProperty("--mouth-open", String(0.08 + easeMouth * 0.92));
            element.style.setProperty("--tongue-open", String(easeMouth));
          }
          if (element.dataset.scrollEffect === "folder") {
            const open = reveal * reveal * (3 - 2 * reveal);
            element.style.setProperty("--folder-angle", `${(1 - open) * 74}deg`);
            element.style.setProperty("--folder-flap", `${(1 - open) * 104}deg`);
          }
        }

        const maximum = Math.max(1, document.documentElement.scrollHeight - viewport);
        root.style.setProperty("--page-progress", String(Math.min(1, window.scrollY / maximum)));
        const history = root.querySelector<HTMLElement>("#historia");
        if (history && years.current) {
          const rect = history.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (viewport * 0.88 - rect.top) / (rect.height * 1.65)));
          const easedProgress = progress * progress * (3 - 2 * progress);
          years.current.textContent = String(Math.floor(easedProgress * 15)).padStart(2, "0");
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const followCursor = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);
  };

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <main className="pet-site" ref={site} onPointerMove={followCursor}>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <header className="site-header">
        <button className="brand" aria-label="Bicho, início" onClick={() => goTo("#inicio")}><PawLogo /><span>bicho<span className="brand__dot">.</span></span></button>
        <div className="site-header__actions">
          <button className="start-button" onClick={() => goTo("#contato")}>Agendar <span>↗</span></button>
          <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        </div>
      </header>
      <div className={`menu-overlay${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <p className="eyebrow">PRA ONDE VAMOS?</p>
        <nav aria-label="Navegação principal">{navItems.map(([number, label, href]) => <button key={href} onClick={() => goTo(href)}><span>{number}</span>{label}<b>↗</b></button>)}</nav>
        <p className="menu-overlay__footer">COM CARINHO, BICHO.</p>
      </div>

      <section className="page-section hero" id="inicio" aria-label="Apresentação da Bicho">
        <div className="hero__stars" data-scroll data-depth="0.15" aria-hidden="true" />
        <div className="hero__content" data-scroll-group>
          <p className="eyebrow" data-scroll data-depth="0.09">CUIDADO DE OUTRO MUNDO</p>
          <h1><span data-scroll data-depth="0.06">AMOR DE</span><span data-scroll data-depth="0.12">OUTRO</span><span data-scroll data-depth="0.19">PLANETA<span className="accent">.</span></span></h1>
          <p className="hero__description" data-scroll data-depth="0.1">Banho, cuidado e muito carinho. Tudo para o seu melhor amigo viver o melhor dele.</p>
          <button className="hero__button" data-scroll data-depth="0.13" onClick={() => goTo("#banho")}>Descubra a Bicho <span>↓</span></button>
          <div className="hero__coordinates" data-scroll data-depth="0.08"><span>23°33' S</span><span>04 PATAS NO CHÃO</span></div>
        </div>
        <div className="hero__scroll" data-scroll data-depth="0.1"><span>ROLE PARA EXPLORAR</span><i /></div>
      </section>

      <section className="page-section service-section" id="banho" aria-label="Banho e tosa">
        <div className="section-heading" data-scroll-group><span className="eyebrow" data-scroll>01 / BANHO & TOSA</span><span className="section-heading__index" data-scroll>[ B-01 ]</span></div>
        <article className="service-card" data-scroll-group>
          <div className="service-card__icon" data-scroll data-depth="0.12"><PawIcon /></div>
          <div className="service-card__copy" data-scroll data-depth="0.07"><h2>Banho e tosa<br />com jeitinho.</h2><p>Água morninha, produtos suaves e aquele cafuné que não acaba.</p><button className="text-link" onClick={() => goTo("#contato")}>Conheça o cuidado <span>↗</span></button></div>
          <div className="dog-orbit" data-scroll data-expression data-depth="0.19" aria-hidden="true"><DogIllustration /></div>
        </article>
        <div className="service-foot" data-scroll-group><span data-scroll>SEM PRESSA. SEM ESTRESSE.</span><span data-scroll>100% MAIS ABRAÇÁVEL →</span></div>
      </section>

      <section className="page-section clinic-section" id="clinica" aria-label="Clínica veterinária e day care">
        <div className="section-heading" data-scroll-group><span className="eyebrow" data-scroll>02 / SAÚDE & BEM-ESTAR</span><span className="section-heading__index" data-scroll>[ B-02 ]</span></div>
        <h2 className="section-title" data-scroll-group><span data-scroll>Um cuidado</span><span data-scroll>que <em className="accent">sente junto.</em></span></h2>
        <div className="clinic-grid" data-scroll-group>
          <article className="mini-card" data-scroll data-scroll-effect="folder" data-depth="0.06"><div className="mini-card__symbol">✳</div><span>01 — VET</span><h3>Clínica<br />de confiança</h3><p>Consultas com calma. Porque ouvir também faz parte de cuidar.</p></article>
          <article className="mini-card mini-card--accent" data-scroll data-scroll-effect="folder" data-depth="0.15"><div className="mini-card__symbol">⌁</div><span>02 — DAY CARE</span><h3>Dia cheio<br />de amigos</h3><p>Brincadeira, descanso e companhia na medida certa.</p></article>
        </div>
        <div className="clinic-note" data-scroll data-depth="0.08"><PawIcon /><span>Pequenos focinhos. Grandes histórias.</span></div>
      </section>

      <section className="page-section story-section" id="historia" aria-label="A história da Bicho">
        <div className="section-heading" data-scroll-group><span className="eyebrow" data-scroll>03 / NOSSA HISTÓRIA</span><span className="section-heading__index" data-scroll>[ DESDE 2011 ]</span></div>
        <div className="story-section__main" data-scroll-group><p className="eyebrow" data-scroll>UM MONTE DE AMOR EM</p><div className="big-number" data-scroll data-depth="0.12"><span ref={years}>00</span><b>ANOS</b></div><h2 data-scroll>de rabinhos<br />abanando.</h2></div>
        <p className="story-section__note" data-scroll data-depth="0.07">Desde o primeiro banho, a gente acredita que todo pet merece se sentir em casa. E todo tutor merece saber que ele está em boas patas.</p>
        <div className="star-stamp" data-scroll data-depth="0.21">FEITO<br />COM<br /><span>AMOR</span></div>
      </section>

      <section className="page-section partner-section" id="parceiros" aria-label="Parceiros da Bicho">
        <div className="section-heading" data-scroll-group><span className="eyebrow" data-scroll>04 / NOSSA TURMA</span><span className="section-heading__index" data-scroll>[ BONS DE PATAS ]</span></div>
        <h2 className="section-title" data-scroll-group><span data-scroll>Juntos, a gente</span><span data-scroll>cuida <em className="accent">melhor.</em></span></h2>
        <div className="partner-grid" data-scroll-group>
          <div className="partner-mark partner-mark--one" data-scroll data-depth="0.05"><PawIcon /><span>petzito</span></div>
          <div className="partner-mark partner-mark--two" data-scroll data-depth="0.11"><span className="partner-mark__sun">✳</span><span>VET<span className="accent">+</span></span></div>
          <div className="partner-mark partner-mark--three" data-scroll data-depth="0.16"><span>mimo<span className="accent">.</span></span></div>
          <div className="partner-mark partner-mark--four" data-scroll data-depth="0.23"><PawIcon /><span>AU! CLUB</span></div>
        </div>
        <p className="partner-note" data-scroll>Marcas que amam os bichos tanto quanto a gente.</p>
      </section>

      <section className="page-section contact-section" id="contato" aria-label="Contato e novidades">
        <div className="section-heading" data-scroll-group><span className="eyebrow" data-scroll>05 / VEM PRA BICHO</span><span className="section-heading__index" data-scroll>[ OLÁ, AMIGO! ]</span></div>
        <div className="contact-section__content" data-scroll-group><p className="eyebrow" data-scroll>O PRÓXIMO ABRAÇO</p><h2 data-scroll>começa<br />por aqui<span className="accent">.</span></h2><p data-scroll>Deixe seu e-mail e a gente te conta as novidades, dicas e mimos da Bicho.</p>
          <form className="contact-form" onSubmit={subscribe} data-scroll><label className="sr-only" htmlFor="pet-email">Seu e-mail</label><input id="pet-email" type="email" placeholder="seu melhor e-mail" required /><button type="submit">{subscribed ? "Combinado! ✓" : "Quero novidades ↗"}</button></form>
          <p className="contact-legal" data-scroll>{subscribed ? "Oba! Seu lugar na nossa turma está guardado." : "Sem spam. Só coisas boas para você e seu pet."}</p>
        </div>
        <footer className="site-footer" data-scroll-group data-scroll><span data-scroll>bicho<span className="accent">.</span> <small>© 2026 — FEITO COM AMOR E PATAS.</small></span><span className="footer-social" data-scroll>IG &nbsp; TT &nbsp; WA ↗</span></footer>
      </section>
      <div className="cursor-glow" aria-hidden="true" />
    </main>
  );
}

function PawLogo() {
  return <svg className="paw-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true"><ellipse cx="16" cy="20" rx="8" ry="6" fill="currentColor" /><ellipse cx="7.7" cy="12" rx="3" ry="4" transform="rotate(-26 7.7 12)" fill="currentColor" /><ellipse cx="14.3" cy="7.2" rx="3" ry="4" transform="rotate(-8 14.3 7.2)" fill="currentColor" /><ellipse cx="21.4" cy="8" rx="3" ry="4" transform="rotate(12 21.4 8)" fill="currentColor" /><ellipse cx="26" cy="13.2" rx="3" ry="4" transform="rotate(28 26 13.2)" fill="currentColor" /></svg>;
}

function PawIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><ellipse cx="16" cy="20" rx="8" ry="6" fill="currentColor" /><ellipse cx="7.5" cy="12" rx="3" ry="4" transform="rotate(-28 7.5 12)" fill="currentColor" /><ellipse cx="14" cy="7" rx="3" ry="4" transform="rotate(-8 14 7)" fill="currentColor" /><ellipse cx="21" cy="8" rx="3" ry="4" transform="rotate(12 21 8)" fill="currentColor" /><ellipse cx="26" cy="13" rx="3" ry="4" transform="rotate(28 26 13)" fill="currentColor" /></svg>;
}

function DogIllustration() {
  return <svg className="dog-illustration" viewBox="0 0 220 220" fill="none" aria-hidden="true">
    <circle cx="110" cy="110" r="100" fill="#F25A43" />
    <path d="M57 86 41 44c-2-6 4-11 10-8l37 22m75 28 16-42c2-6-4-11-10-8l-37 22" fill="#F6D983" stroke="#15161A" strokeWidth="5" strokeLinejoin="round" />
    <path d="M55 104c0-34 25-58 55-58s55 24 55 58v43c0 28-23 50-55 50s-55-22-55-50v-43Z" fill="#F2D8B5" stroke="#15161A" strokeWidth="5" />
    <g className="dog-eyes">
      <ellipse cx="91" cy="124" rx="6" ry="5" fill="#15161A" />
      <ellipse cx="143" cy="124" rx="6" ry="5" fill="#15161A" />
      <circle cx="93" cy="122" r="1.7" fill="#fff" />
      <circle cx="145" cy="122" r="1.7" fill="#fff" />
    </g>
    <ellipse cx="110" cy="143" rx="12" ry="9" fill="#15161A" />
    <path className="dog-mouth" d="M98 151q12 7 24 0 5 4 3 13-4 15-15 15t-15-15q-2-9 3-13Z" fill="#32191C" stroke="#15161A" strokeWidth="3" strokeLinejoin="round" />
    <path className="dog-tongue" d="M102 163q8 5 16 0 0 12-8 12t-8-12Z" fill="#F46F74" />
    <path d="M65 154c-13-3-20 2-23 9m113-9c13-3 20 2 23 9" stroke="#15161A" strokeWidth="4" strokeLinecap="round" />
  </svg>;
}
