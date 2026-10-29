import Link from "next/link";
import { Reveal, SectionHead, CtaBox, PageHero, Byline } from "@/components/ui";
import { RelatedPosts } from "@/components/related-posts";
import { site, paymentGateways } from "@/lib/site";
import { type GccPage } from "@/lib/gcc-pages";
import { ORG_ID, webPageSchema } from "@/lib/schema";
import { getGccPages, getStoreCaseStudies } from "@/lib/localized";
import { countryName } from "@/lib/content";
import { lp, ui, type Locale } from "@/lib/i18n";

/**
 * Template for the GCC e-commerce hub pages (lib/gcc-pages.ts): answer-first copy under question-style
 * headings, optional comparison table and gateway grid, proof (case studies, Store Portal, WASL),
 * FAQ, sources and a free-consultation CTA. Emits Service, WebPage and FAQPage JSON-LD.
 */
export function GuidePageView({ page, locale = "en" }: { page: GccPage; locale?: Locale }) {
  const t = ui(locale);
  const g = t.guide;
  const L = (href: string) => lp(locale, href);
  const path = L(`/${page.slug}`);
  const gccPages = getGccPages(locale);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.serviceName,
      serviceType: page.serviceType,
      url: `${site.url}${path}/`,
      description: page.metaDescription,
      provider: { "@id": ORG_ID },
      areaServed: page.areaServed.map((name) => ({ "@type": "Country", name })),
    },
    webPageSchema({ path, name: page.metaTitle, description: page.metaDescription, modified: page.updated }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  const stores = getStoreCaseStudies(locale);
  const gatewayCountries = page.gateways ? paymentGateways.filter((c) => page.gateways!.includes(c.country)) : [];
  const siblings = gccPages.filter((p) => p.slug !== page.slug && (page.related ?? []).includes(p.slug));

  return (
    <main>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PageHero
        crumbs={[
          { label: t.crumbs.home, href: L("/") },
          ...(page.slug === "ecommerce" ? [] : [{ label: page.parent?.label ?? t.crumbs.ecommerce, href: L(page.parent?.href ?? "/ecommerce") }]),
          { label: page.crumb },
        ]}
        title={
          <>
            {page.title} <span className="serif">{page.titleAccent}</span>
          </>
        }
        lede={page.lede}
        meta={<Byline updated={page.updated} locale={locale} />}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href={L("/contact")}>
            {g.consult}
          </Link>
          <Link className="btn btn-secondary" href={L("/work")}>
            {g.stores}
          </Link>
        </div>
      </PageHero>

      {/* The direct answer first, for readers and for AI answer engines */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="answer-box">
              <span className="kicker">{g.shortAnswer}</span>
              {page.answer.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {page.hub && (
        <section className="section section--flush-top">
          <div className="wrap">
            <SectionHead
              kicker={g.explore}
              title={
                <>
                  {g.guidesTitle} <span className="serif">{g.guidesAccent}</span>
                </>
              }
            />
            <Reveal className="grid-3">
              {page.hub.map((slug, i) => {
                const p = gccPages.find((g) => g.slug === slug)!;
                return (
                  <Link className="card" href={L(`/${p.slug}`)} key={p.slug}>
                    <span className="num">{["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii.", "ix."][i]}</span>
                    <h3>{p.cardTitle}</h3>
                    <p>{p.cardDesc}</p>
                  </Link>
                );
              })}
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--flush-top">
        <div className="wrap">
          <div className="cs-body">
            {page.sections.map((sec) => (
              <Reveal key={sec.h}>
                <h2>{sec.h}</h2>
                {sec.ps?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {sec.list && (
                  <ul>
                    {sec.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
                {sec.after?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {sec.table && (
                  <div className="cmp-table-wrap">
                    <table className="cmp-table">
                      <caption>{sec.table.caption}</caption>
                      <thead>
                        <tr>
                          {sec.table.head.map((h) => (
                            <th key={h} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {gatewayCountries.length > 0 && (
        <section className="section section--flush-top">
          <div className="wrap">
            <SectionHead
              kicker={g.payments}
              title={
                <>
                  {g.gatewaysTitle} <span className="serif">{g.gatewaysAccent}</span>
                </>
              }
            >
              {g.gatewaysNote}
            </SectionHead>
            <Reveal className={gatewayCountries.length > 1 ? "grid-3" : "gw-single"}>
              {gatewayCountries.map((c) => (
                <div className="card gw-card" key={c.country}>
                  <h3>
                    <span aria-hidden="true">{c.flag}</span> {countryName(c.country, locale)}
                  </h3>
                  <ul>
                    {c.gateways.map((g) => (
                      <li key={g.name}>{g.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Proof: real stores and our own e-commerce products */}
      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker={g.proof}
            title={
              <>
                {g.proofTitle} <span className="serif">{g.proofAccent}</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {stores.map((c) => {
              const r = c.results.filter((x) => !x.todo).slice(0, 2);
              return (
                <Link className="cs-card" href={L(`/work/${c.slug}`)} key={c.slug}>
                  <div>
                    <span className="mono">{c.industry}</span>
                    <h3>{c.name}</h3>
                    <p>{r.map((x) => `${x.value} ${x.label}`).join(" · ")}</p>
                  </div>
                  <span className="prod-link">{g.readCase}</span>
                </Link>
              );
            })}
            <Link className="cs-card" href={L("/products/store-portal")}>
              <div>
                <span className="mono">{g.spKicker}</span>
                <h3>Store Portal</h3>
                <p>{g.spBody}</p>
              </div>
              <span className="prod-link">{g.spLink}</span>
            </Link>
            <Link className="cs-card" href={L("/products/wasl")}>
              <div>
                <span className="mono">{g.waKicker}</span>
                <h3>WASL</h3>
                <p>{g.waBody}</p>
              </div>
              <span className="prod-link">{g.waLink}</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
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
              {page.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
          {page.sources.length > 0 && (
            <Reveal>
              <div className="post-sources guide-sources">
                <span className="mono">{g.sources}</span>
                <ul>
                  {page.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p>{g.disclaimer}</p>
              </div>
            </Reveal>
          )}
          {(siblings.length > 0 || page.links) && (
            <Reveal>
              <div className="guide-links">
                {siblings.map((p) => (
                  <Link className="btn btn-secondary" href={L(`/${p.slug}`)} key={p.slug}>
                    {p.cardTitle} {t.arrow}
                  </Link>
                ))}
                {page.links?.map((l) => (
                  <Link className="btn btn-secondary" href={L(l.href)} key={l.href}>
                    {l.label} {t.arrow}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {page.relatedService && <RelatedPosts href={page.relatedService} locale={locale} />}

      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox kicker={g.ctaKicker} title={<>{page.ctaTitle} <span className="serif">{page.ctaAccent}</span></>} body={page.ctaBody} locale={locale} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
