import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { categories, terms } from "@/lib/terms";

export const Route = createFileRoute("/glossario")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] } : {}),
  head: () => ({
    meta: [
      { title: "Glossário de Web Design A–Z — Anatomia" },
      { name: "description", content: `${terms.length} termos de web design explicados de forma simples: layout, tipografia, cor, interação, UX e mais.` },
      { property: "og:title", content: "Glossário de Web Design A–Z — Anatomia" },
      { property: "og:description", content: "Todos os termos de web design explicados, com exemplos ao vivo." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Glossary,
});

function Glossary() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [cat, setCat] = useState<string>("Todos");
  const list = useMemo(
    () => terms.filter((t) => (cat === "Todos" || t.cat === cat) && (t.term + t.def).toLowerCase().includes(q.toLowerCase())).sort((a, b) => a.term.localeCompare(b.term)),
    [q, cat],
  );
  return (
    <>
      <SiteHeader />
      <main className="wrap" style={{ paddingTop: 140, paddingBottom: 120 }}>
        <nav className="crumbs mono" aria-label="Breadcrumb" data-term="Breadcrumb"><Link to="/">Início</Link><span>/</span><span>Glossário</span></nav>
        <h1 className="display" style={{ fontSize: "clamp(56px,10vw,150px)", margin: "20px 0 10px" }}>Glossário<span style={{ color: "var(--primary)" }}>.</span></h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 19, maxWidth: "50ch", lineHeight: 1.6 }}>{terms.length} termos para estudar. Os que têm “ver ao vivo” estão demonstrados na página inicial.</p>
        <div style={{ display: "grid", gap: 16, margin: "40px 0" }}>
          <input className="gl-search" placeholder="Filtrar termos…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filtrar termos" />
          <div className="chips">
            {["Todos", ...categories].map((c) => <button key={c} className={`chip${cat === c ? " is-on" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </div>
        <p className="mono" style={{ color: "var(--muted-foreground)" }}>{list.length} resultado(s)</p>
        <div className="gl-list">
          {list.map((t) => (
            <article key={t.term} className="gl-item">
              <span className="mono kicker">{t.cat}</span>
              <h3>{t.term}</h3>
              <p>{t.def}</p>
              {t.where?.startsWith("#") && <Link to="/" hash={t.where.slice(1)} className="mono">Ver ao vivo ↗</Link>}
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
