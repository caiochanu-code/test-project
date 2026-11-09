import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(scrollY > 900);
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <footer className="footer" id="rodape" data-term="Fat Footer">
        <div className="wrap">
          <div className="footer-cols">
            <div>
              <p className="mono">Anatomia — estúdio de web design</p>
              <p style={{ opacity: 0.7, maxWidth: "34ch", lineHeight: 1.6 }}>Um site que se explica: cada bloco é uma aula. Ative o Raio-X no topo e veja o nome de tudo.</p>
            </div>
            <div><p className="mono">Página</p><a href="/#hero">Hero</a><a href="/#bento">Bento</a><a href="/#sistema">Sistema</a><a href="/#faq">FAQ</a></div>
            <div><p className="mono">Estudar</p><Link to="/glossario">Glossário A–Z</Link><a href="/#processo">Processo</a><a href="/#precos">Planos</a></div>
            <div><p className="mono">Social</p><a href="#rodape">Instagram ↗</a><a href="#rodape">Behance ↗</a><a href="#rodape">Dribbble ↗</a></div>
          </div>
          <div className="footer-big" aria-hidden="true">anatomia</div>
          <p className="mono" style={{ opacity: 0.6 }}>© 2026 Anatomia. Feito para aprender.</p>
        </div>
      </footer>
      <button className={`to-top${show ? "" : " is-hidden"}`} aria-label="Voltar ao topo" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} data-term="Back to Top">↑</button>
    </>
  );
}
