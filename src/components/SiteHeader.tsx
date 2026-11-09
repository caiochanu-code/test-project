import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { terms } from "@/lib/terms";

const nav = [
  ["01", "Sistema", "#sistema"],
  ["02", "Processo", "#processo"],
  ["03", "Planos", "#precos"],
  ["04", "Contato", "#contato"],
] as const;

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [dark, setDark] = useState(false);
  const [xray, setXray] = useState(false);
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setCompact(scrollY > 60);
      setProgress(max > 0 ? scrollY / max : 0);
      let cur = "";
      for (const [, , id] of nav) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    const tick = () => setClock(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/Sao_Paulo" }));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); }
      if (e.key === "Escape") { setPalette(false); setOpen(false); }
    };
    onScroll(); tick();
    const t = setInterval(tick, 1000);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    return () => { clearInterval(t); removeEventListener("scroll", onScroll); removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => { document.documentElement.classList.toggle("xray", xray); }, [xray]);

  return (
    <>
      <header className={`hdr${compact ? " is-compact" : ""}`} id="topo" data-term="Sticky Header">
        <Link to="/" className="hdr-brand" aria-label="Anatomia, início">
          <span className="hdr-logo">A/</span>
          <b>Anatomia</b>
        </Link>
        <div className="hdr-mid">
          <nav className="hdr-nav" aria-label="Navegação principal">
            {nav.map(([n, label, href]) => (
              <a key={href} href={`/${href}`} className={active === href ? "is-active" : ""}><small>{n}</small>{label}</a>
            ))}
            <Link to="/glossario" activeProps={{ className: "is-active" }}><small>A–Z</small>Glossário</Link>
          </nav>
          <div className="hdr-meter mono" aria-label="Progresso da leitura">
            <span>SP {clock}</span>
            <div className="bar"><i style={{ transform: `scaleX(${progress})` }} /></div>
            <span>{String(Math.round(progress * 100)).padStart(3, "0")}% lido</span>
          </div>
        </div>
        <div className="hdr-actions">
          <button className="icon-btn hide-sm" onClick={() => setPalette(true)} aria-label="Buscar termo" data-term="Command Palette">⌕ <kbd>Ctrl K</kbd></button>
          <button className={`icon-btn${xray ? " is-on" : ""}`} onClick={() => setXray(!xray)} aria-pressed={xray} title="Modo Raio-X: mostra o nome de cada elemento">
            <span className="mono">Raio-X</span>
          </button>
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Alternar tema escuro" data-term="Dark Mode">{dark ? "☀" : "☾"}</button>
          <button className={`icon-btn burger${open ? " is-open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} data-term="Hamburger Menu"><span><i /><i /></span></button>
        </div>
      </header>
      <div className={`mobile-nav${open ? " is-open" : ""}`} aria-hidden={!open}>
        {nav.map(([n, label, href]) => <a key={href} href={`/${href}`} onClick={() => setOpen(false)}><span className="mono kicker">{n} </span>{label}</a>)}
        <Link to="/glossario" onClick={() => setOpen(false)}>Glossário</Link>
      </div>
      {palette && <Palette onClose={() => setPalette(false)} />}
    </>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const navigate = useNavigate();
  const list = useMemo(() => terms.filter((t) => (t.term + t.cat + t.def).toLowerCase().includes(q.toLowerCase())).slice(0, 8), [q]);
  const go = (i: number) => {
    const t = list[i];
    if (!t) return;
    onClose();
    if (t.where?.startsWith("#")) {
      if (location.pathname !== "/") navigate({ to: "/", hash: t.where.slice(1) });
      else document.querySelector(t.where)?.scrollIntoView({ behavior: "smooth" });
    } else navigate({ to: "/glossario", search: { q: t.term } });
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="palette" role="dialog" aria-label="Buscar termos" onClick={(e) => e.stopPropagation()}>
        <input autoFocus placeholder="Busque um termo: hero, grid, kerning…" value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, list.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === "Enter") go(sel);
          }} />
        <ul>
          {list.map((t, i) => (
            <li key={t.term}><button className={i === sel ? "is-sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => go(i)}>
              <span><b>{t.term}</b> — {t.def}</span><span className="mono">{t.cat}</span>
            </button></li>
          ))}
          {!list.length && <li className="mono" style={{ padding: 16 }}>Nenhum termo encontrado</li>}
        </ul>
      </div>
    </div>
  );
}
