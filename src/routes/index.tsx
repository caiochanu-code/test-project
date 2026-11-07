import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papel & Fantasia — histórias para levar" },
      {
        name: "description",
        content: "Entre na Papel & Fantasia. Uma livraria de quadrinhos para quem ainda acredita em outras realidades.",
      },
    ],
  }),
  component: Index,
});

const chapters = ["A loja", "As histórias", "O próximo capítulo"];

function Index() {
  const story = useRef<HTMLElement>(null);
  const revealAnimations = useRef(new WeakMap<HTMLElement, Animation>());
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const section = story.current;
    if (!section) return;
    let targetProgress = 0;
    let currentProgress = 0;
    let frame = 0;
    let lastTime = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readScroll = (immediate = false) => {
      const bounds = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      targetProgress = Math.min(1, Math.max(0, -bounds.top / range));
      if (immediate) {
        currentProgress = targetProgress;
        animate(0);
        return;
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      const easing = reduceMotion.matches ? 1 : 1 - Math.exp(-elapsed / 105);
      currentProgress += (targetProgress - currentProgress) * easing;
      if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;

      section.style.setProperty("--story-progress", String(currentProgress));
      section.querySelectorAll<HTMLElement>(".chapter").forEach((chapter, index) => {
        const sceneProgress = Math.min(1, Math.max(0, currentProgress * (chapters.length - 1) - index));
        const parallax = (0.5 - sceneProgress) * 22;
        chapter.style.setProperty("--scene-progress", String(sceneProgress));
        chapter.style.setProperty("--parallax-far", `${parallax}px`);
        chapter.style.setProperty("--parallax-near", `${-parallax * 1.6}px`);
      });
      const nextActive = Math.min(chapters.length - 1, Math.round(currentProgress * (chapters.length - 1)));
      setActive((previous) => previous === nextActive ? previous : nextActive);

      if (currentProgress !== targetProgress) frame = requestAnimationFrame(animate);
      else { frame = 0; lastTime = 0; }
    };

    readScroll(true);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, []);

  useEffect(() => {
    const allElements = story.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      allElements?.forEach((element) => { element.dataset.revealed = "true"; });
      return;
    }
    const chapter = story.current?.querySelectorAll<HTMLElement>(".chapter")[active];
    const elements = Array.from(chapter?.querySelectorAll<HTMLElement>("[data-reveal]") ?? []);
    if (active === 0) {
      const cue = story.current?.parentElement?.querySelector<HTMLElement>(".scroll-cue[data-reveal]");
      if (cue) elements.push(cue);
    }
    if (!elements.length) return;

    elements.forEach((element, index) => {
      revealAnimations.current.get(element)?.cancel();
      element.dataset.revealed = "false";
      const direction = index % 4;
      const offset = direction === 0 ? "0px 52px" : direction === 1 ? "-52px 0px" : direction === 2 ? "52px 0px" : "0px -44px";
      const animation = element.animate(
        [
          { opacity: 0, translate: offset, scale: direction === 3 ? 0.68 : 0.82, rotate: direction === 3 ? "-9deg" : "0deg", filter: "blur(12px)" },
          { opacity: 1, translate: "0px 0px", scale: 1, rotate: "0deg", filter: "blur(0px)" },
        ],
        {
          duration: 850,
          delay: index * 70,
          easing: "cubic-bezier(0.12, 0.8, 0.1, 1)",
          fill: "both",
        },
      );
      animation.onfinish = () => {
        element.dataset.revealed = "true";
        animation.cancel();
        revealAnimations.current.delete(element);
      };
      revealAnimations.current.set(element, animation);
    });
  }, [active]);

  const moveLight = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  const goToChapter = (index: number) => {
    setMenuOpen(false);
    const section = story.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    const top = window.scrollY + bounds.top + (section.offsetHeight - window.innerHeight) * index / (chapters.length - 1);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main>
      <section className="story" ref={story} aria-label="Uma viagem pela Papel & Fantasia">
        <div className="story__stage">
          <div className="scroll-meter" aria-hidden="true"><i /></div>
          <div className="story__track">
            <article className={`chapter chapter--shop${active === 0 ? " is-active" : ""}`} aria-label="A loja">
              <div className="chapter__art art-shop" onPointerMove={moveLight}>
                <div className="sun-disc" data-reveal />
                <div className="shop-sign" data-reveal><span>PF</span><b>PAPEL &<br />FANTASIA</b><small>QUADRINHOS · SÃO PAULO</small></div>
                <div className="window-grid" data-reveal><i data-reveal /><i data-reveal /><i data-reveal /><i data-reveal /><i data-reveal /><i data-reveal /></div>
                <div className="shelf shelf--back" data-reveal><Cover color="coral" title="ÓRBITA" /><Cover color="lime" title="MATA" /><Cover color="blue" title="MIRAGEM" /></div>
                <div className="shelf shelf--front" data-reveal><Cover color="blue" title="O OUTRO LADO" /><Cover color="yellow" title="SOL DE INVERNO" /><Cover color="coral" title="BICHO-LUZ" /><Cover color="violet" title="MARÉ ALTA" /></div>
                <div className="counter" data-reveal />
                <div className="plant" data-reveal><i data-reveal /><i data-reveal /><i data-reveal /><i data-reveal /><b data-reveal /></div>
                <div className="art-caption" data-reveal><span data-reveal>01 / 03</span><span data-reveal>RUA DAS IDEIAS, 42 — DESDE 1998</span></div>
              </div>
              <SidePanel index={0} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>

            <article className={`chapter chapter--stories${active === 1 ? " is-active" : ""}`} aria-label="As histórias">
              <div className="chapter__art art-stories" onPointerMove={moveLight}>
                <div className="story-orbit orbit-one" data-reveal /><div className="story-orbit orbit-two" data-reveal />
                <div className="cover-stack" data-reveal><Cover color="blue" title="O OUTRO LADO" large /><Cover color="coral" title="BICHO-LUZ" large /><Cover color="yellow" title="SOL DE INVERNO" large /></div>
                <div className="burst burst--one" data-reveal>NOVO<br />MUNDO</div>
                <div className="burst burst--two" data-reveal>EDIÇÃO<br />INDEPENDENTE</div>
                <span className="art-stories__note" data-reveal>FEITO POR QUEM<br />TAMBÉM LÊ.</span>
                <div className="art-caption" data-reveal><span data-reveal>02 / 03</span><span data-reveal>PEQUENAS TIRAGENS. GRANDES VIAGENS.</span></div>
              </div>
              <SidePanel index={1} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>

            <article className={`chapter chapter--visit${active === 2 ? " is-active" : ""}`} aria-label="O próximo capítulo">
              <div className="chapter__art art-visit" onPointerMove={moveLight}>
                <div className="visit-sun" data-reveal />
                <div className="visit-type" data-reveal>HISTÓRIAS<br />QUE <em>FICAM.</em></div>
                <div className="ticket" data-reveal><span>PRÓXIMA SESSÃO</span><b>sábado,<br />às quatro.</b><small>LEITURA · CAFÉ · CONVERSA</small></div>
                <div className="book-illustration" data-reveal><div className="book-cover" data-reveal><span>UM MAPA<br />PARA<br /><b>SONHAR</b></span><i /></div><div className="book-pages" data-reveal /></div>
                <div className="art-caption" data-reveal><span data-reveal>03 / 03</span><span data-reveal>SEU LUGAR ESTÁ RESERVADO.</span></div>
              </div>
              <SidePanel index={2} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>
          </div>
        </div>
      </section>
      <div className="scroll-cue" data-reveal aria-hidden="true"><span>ROLE PARA EXPLORAR</span><i /></div>
    </main>
  );
}

function Cover({ color, title, large = false }: { color: string; title: string; large?: boolean }) {
  return <div className={`comic-cover comic-cover--${color}${large ? " comic-cover--large" : ""}`} data-reveal><span className="comic-cover__issue">PF! &nbsp; Nº 08</span><b>{title}</b><i /><small>UMA HISTÓRIA ILUSTRADA</small></div>;
}

function SidePanel({ index, active, menuOpen, setMenuOpen, goToChapter }: {
  index: number;
  active: number;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  goToChapter: (index: number) => void;
}) {
  return (
    <aside className={`chapter__panel panel--${index}`}>
      <header className="panel__top" data-reveal><a className="wordmark" data-reveal href="#top" onClick={(event) => { event.preventDefault(); goToChapter(0); }}>P&F<span>®</span></a><span className="panel__edition" data-reveal>LIVRARIA INDEPENDENTE<br />SÃO PAULO · BRASIL</span></header>
      <div className="panel__center" data-reveal><div className="panel__counter" data-reveal><span>{String(active + 1).padStart(2, "0")}</span><i /> <span>03</span></div>
        <button className={`menu-button${menuOpen ? " is-open" : ""}`} data-reveal aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /><span>{menuOpen ? "FECHAR" : "MENU"}</span></button>
        <nav className={`panel__nav${menuOpen ? " is-visible" : ""}`} aria-label="Navegação por capítulos" data-reveal>{chapters.map((chapter, i) => <button key={chapter} data-reveal className={active === i ? "is-active" : ""} onClick={() => goToChapter(i)}><span>0{i + 1}</span>{chapter}<b>↗</b></button>)}</nav>
      </div>
      <footer className="panel__bottom" data-reveal><span data-reveal>{index === 0 ? "UM LUGAR FORA DA PÁGINA." : index === 1 ? "CADA CAPA É UMA PORTA." : "A GENTE SE VÊ POR AQUI."}</span><div className="panel__arrows" data-reveal><button data-reveal aria-label="Capítulo anterior" onClick={() => goToChapter(Math.max(index - 1, 0))}>←</button><button data-reveal aria-label="Próximo capítulo" onClick={() => goToChapter(Math.min(index + 1, 2))}>→</button></div></footer>
    </aside>
  );
}
