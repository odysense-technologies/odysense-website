import Link from "next/link";
import Image from "next/image";
import { Reveal, SectionHead, CtaBox, PageHero, Byline } from "@/components/ui";
import { webPageSchema } from "@/lib/schema";
import type { ServiceDef } from "@/lib/service-pages";
import { RelatedPosts } from "@/components/related-posts";
import { lp, ui, type Locale } from "@/lib/i18n";

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

export function ServicePageView({ def, locale = "en" }: { def: ServiceDef; locale?: Locale }) {
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const path = L(`/${def.slug}`);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: def.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const pageSchema = webPageSchema({ path, name: def.metaTitle, description: def.metaDescription, modified: def.updated });

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.services, href: L("/services") }, { label: def.crumb }]}
        title={
          <>
            {def.title} <span className="serif">{def.titleAccent}</span>
          </>
        }
        lede={def.lede}
        meta={<Byline updated={def.updated} locale={locale} />}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href={L("/contact")}>
            {t.service.quote}
          </Link>
          <Link className="btn btn-secondary" href={L("/work")}>
            {t.service.work}
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={def.includesKicker ?? t.service.included}
            title={
              <>
                {t.service.everything} <span className="serif">{t.service.handled}</span>
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

      {def.sections && (
        <section className="section section--flush-top">
          <div className="wrap">
            <div className="cs-body">
              {def.sections.map((sec) => (
                <Reveal key={sec.h}>
                  <h2>
                    {sec.h}
                    <span className="serif" style={{ color: "var(--purple)" }}>
                      .
                    </span>
                  </h2>
                  {sec.ps.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
            kicker={t.service.questions}
            title={
              <>
                {t.service.asked} <span className="serif">{t.service.often}</span>
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
                  <Link className="btn btn-secondary" href={L(r.href)} key={r.href}>
                    {r.label} {t.arrow}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <RelatedPosts href={`/${def.slug}`} locale={locale} />

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
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
