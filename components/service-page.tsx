import Link from "next/link";
import Image from "next/image";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import type { ServiceDef } from "@/lib/service-pages";

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

export function ServicePageView({ def }: { def: ServiceDef }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: def.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: def.crumb }]}
        title={
          <>
            {def.title} <span className="serif">{def.titleAccent}</span>
          </>
        }
        lede={def.lede}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Get a fixed quote →
          </Link>
          <Link className="btn btn-secondary" href="/work">
            See our work
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={def.includesKicker ?? "What's included"}
            title={
              <>
                Everything, <span className="serif">handled.</span>
              </>
            }
          />
          <Reveal className="grid-3">
            {def.includes.map((inc, i) => (
              <div className="card" key={inc.h}>
                <span className="num">{NUMERALS[i]}</span>
                <h3>{inc.h}</h3>
                <p>{inc.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {def.image && (
        <section className="section section--flush-top">
          <div className="wrap">
            <Reveal>
              <div className="img-inline svc-page-img">
                <Image src={def.image.src} alt={def.image.alt} width={1200} height={675} sizes="(max-width: 920px) 100vw, 1200px" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker="Questions"
            title={
              <>
                Asked <span className="serif">often.</span>
              </>
            }
          />
          <Reveal>
            <div className="faq">
              {def.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
          {def.related && (
            <Reveal>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 48 }}>
                {def.related.map((r) => (
                  <Link className="btn btn-secondary" href={r.href} key={r.href}>
                    {r.label} →
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  {def.ctaTitle} <span className="serif">{def.ctaAccent}</span>
                </>
              }
              body={def.ctaBody}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
