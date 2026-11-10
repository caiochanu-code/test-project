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
              <p className="mono">Anatomia — caderno visual</p>
              <p style={{ opacity: 0.7, maxWidth: "34ch", lineHeight: 1.6 }}>Um espaço pessoal para observar interfaces, movimentos e os conceitos que dão forma à experiência.</p>
            </div>
            <div><p className="mono">Explorar</p><a href="/#hero">Abertura</a><a href="/#animacoes">Motion Lab</a><a href="/#bento">Microinterações</a><a href="/#sistema">Design System</a></div>
            <div><p className="mono">Estudar</p><Link to="/glossario">Glossário A–Z</Link><a href="/#processo">Scrollytelling</a><a href="/#faq">Termos em contexto</a></div>
            <div><p className="mono">Ferramentas</p><span className="footer-tool">Raio-X · Ctrl K · tema escuro</span><span className="footer-tool">Exemplos com interação e rolagem</span></div>
          </div>
          <div className="footer-big" aria-hidden="true">anatomia</div>
          <p className="mono" style={{ opacity: 0.6 }}>© 2026 Anatomia. Feito para aprender.</p>
        </div>
      </footer>
      <button className={`to-top${show ? "" : " is-hidden"}`} aria-label="Voltar ao topo" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} data-term="Back to Top">↑</button>
    </>
  );
}
