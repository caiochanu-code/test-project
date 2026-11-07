import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const section = story.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const range = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -bounds.top / range));
        section.style.setProperty("--story-progress", String(progress));
        setActive(Math.min(chapters.length - 1, Math.round(progress * (chapters.length - 1))));
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
          <div className="story__track">
            <article className="chapter chapter--shop" aria-label="A loja">
              <div className="chapter__art art-shop">
                <div className="sun-disc" />
                <div className="shop-sign"><span>PF</span><b>PAPEL &<br />FANTASIA</b><small>QUADRINHOS · SÃO PAULO</small></div>
                <div className="window-grid"><i /><i /><i /><i /><i /><i /></div>
                <div className="shelf shelf--back"><Cover color="coral" title="ÓRBITA" /><Cover color="lime" title="MATA" /><Cover color="blue" title="MIRAGEM" /></div>
                <div className="shelf shelf--front"><Cover color="blue" title="O OUTRO LADO" /><Cover color="yellow" title="SOL DE INVERNO" /><Cover color="coral" title="BICHO-LUZ" /><Cover color="violet" title="MARÉ ALTA" /></div>
                <div className="counter" />
                <div className="plant"><i /><i /><i /><i /><b /></div>
                <div className="art-caption"><span>01 / 03</span><span>RUA DAS IDEIAS, 42 — DESDE 1998</span></div>
              </div>
              <SidePanel index={0} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>

            <article className="chapter chapter--stories" aria-label="As histórias">
              <div className="chapter__art art-stories">
                <div className="story-orbit orbit-one" /><div className="story-orbit orbit-two" />
                <div className="cover-stack"><Cover color="blue" title="O OUTRO LADO" large /><Cover color="coral" title="BICHO-LUZ" large /><Cover color="yellow" title="SOL DE INVERNO" large /></div>
                <div className="burst burst--one">NOVO<br />MUNDO</div>
                <div className="burst burst--two">EDIÇÃO<br />INDEPENDENTE</div>
                <span className="art-stories__note">FEITO POR QUEM<br />TAMBÉM LÊ.</span>
                <div className="art-caption"><span>02 / 03</span><span>PEQUENAS TIRAGENS. GRANDES VIAGENS.</span></div>
              </div>
              <SidePanel index={1} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>

            <article className="chapter chapter--visit" aria-label="O próximo capítulo">
              <div className="chapter__art art-visit">
                <div className="visit-sun" />
                <div className="visit-type">HISTÓRIAS<br />QUE <em>FICAM.</em></div>
                <div className="ticket"><span>PRÓXIMA SESSÃO</span><b>sábado,<br />às quatro.</b><small>LEITURA · CAFÉ · CONVERSA</small></div>
                <div className="book-illustration"><div className="book-cover"><span>UM MAPA<br />PARA<br /><b>SONHAR</b></span><i /></div><div className="book-pages" /></div>
                <div className="art-caption"><span>03 / 03</span><span>SEU LUGAR ESTÁ RESERVADO.</span></div>
              </div>
              <SidePanel index={2} active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToChapter={goToChapter} />
            </article>
          </div>
        </div>
      </section>
      <div className="scroll-cue" aria-hidden="true"><span>ROLE PARA EXPLORAR</span><i /></div>
    </main>
  );
}

function Cover({ color, title, large = false }: { color: string; title: string; large?: boolean }) {
  return <div className={`comic-cover comic-cover--${color}${large ? " comic-cover--large" : ""}`}><span className="comic-cover__issue">PF! &nbsp; Nº 08</span><b>{title}</b><i /><small>UMA HISTÓRIA ILUSTRADA</small></div>;
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
      <header className="panel__top"><a className="wordmark" href="#top" onClick={(event) => { event.preventDefault(); goToChapter(0); }}>P&F<span>®</span></a><span className="panel__edition">LIVRARIA INDEPENDENTE<br />SÃO PAULO · BRASIL</span></header>
      <div className="panel__center"><div className="panel__counter"><span>{String(active + 1).padStart(2, "0")}</span><i /> <span>03</span></div>
        <button className={`menu-button${menuOpen ? " is-open" : ""}`} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /><span>{menuOpen ? "FECHAR" : "MENU"}</span></button>
        <nav className={`panel__nav${menuOpen ? " is-visible" : ""}`} aria-label="Navegação por capítulos">{chapters.map((chapter, i) => <button key={chapter} className={active === i ? "is-active" : ""} onClick={() => goToChapter(i)}><span>0{i + 1}</span>{chapter}<b>↗</b></button>)}</nav>
      </div>
      <footer className="panel__bottom"><span>{index === 0 ? "UM LUGAR FORA DA PÁGINA." : index === 1 ? "CADA CAPA É UMA PORTA." : "A GENTE SE VÊ POR AQUI."}</span><div className="panel__arrows"><button aria-label="Capítulo anterior" onClick={() => goToChapter(Math.max(index - 1, 0))}>←</button><button aria-label="Próximo capítulo" onClick={() => goToChapter(Math.min(index + 1, 2))}>→</button></div></footer>
    </aside>
  );
}
