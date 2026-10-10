import Link from "next/link";
import { Reveal, SectionHead, CtaBox, PageHero, Byline } from "@/components/ui";
import { RelatedPosts } from "@/components/related-posts";
import { site, paymentGateways } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { gccPages, type GccPage } from "@/lib/gcc-pages";
import { ORG_ID, webPageSchema } from "@/lib/schema";

/**
 * Template for the GCC e-commerce hub pages (lib/gcc-pages.ts): answer-first copy under question-style
 * headings, optional comparison table and gateway grid, proof (case studies, Store Portal, WASL),
 * FAQ, sources and a free-consultation CTA. Emits Service, WebPage and FAQPage JSON-LD.
 */
export function GuidePageView({ page }: { page: GccPage }) {
  const path = `/${page.slug}`;
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
  const stores = caseStudies.filter((c) => c.services.includes("E-commerce"));
  const gatewayCountries = page.gateways ? paymentGateways.filter((c) => page.gateways!.includes(c.country)) : [];
  const siblings = gccPages.filter((p) => p.slug !== page.slug && (page.related ?? []).includes(p.slug));

  return (
    <main>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          ...(page.slug === "ecommerce" ? [] : [{ label: page.parent?.label ?? "E-commerce", href: page.parent?.href ?? "/ecommerce" }]),
          { label: page.crumb },
        ]}
        title={
          <>
            {page.title} <span className="serif">{page.titleAccent}</span>
          </>
        }
        lede={page.lede}
        meta={<Byline updated={page.updated} />}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Book a free consultation →
          </Link>
          <Link className="btn btn-secondary" href="/work">
            See our stores
          </Link>
        </div>
      </PageHero>

      {/* The direct answer first, for readers and for AI answer engines */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="answer-box">
              <span className="kicker">The short answer</span>
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
              kicker="Explore"
              title={
                <>
                  E-commerce guides <span className="serif">by market and platform.</span>
                </>
              }
            />
            <Reveal className="grid-3">
              {page.hub.map((slug, i) => {
                const p = gccPages.find((g) => g.slug === slug)!;
                return (
                  <Link className="card" href={`/${p.slug}`} key={p.slug}>
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
              kicker="Payments"
              title={
                <>
                  Gateways we&apos;ve integrated <span className="serif">on live stores.</span>
                </>
              }
            >
              Need one that isn&apos;t listed? We can integrate it too.
            </SectionHead>
            <Reveal className={gatewayCountries.length > 1 ? "grid-3" : "gw-single"}>
              {gatewayCountries.map((c) => (
                <div className="card gw-card" key={c.country}>
                  <h3>
                    <span aria-hidden="true">{c.flag}</span> {c.country}
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
            kicker="Proof"
            title={
              <>
                Stores we built, <span className="serif">tools we run.</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {stores.map((c) => {
              const r = c.results.filter((x) => !x.todo).slice(0, 2);
              return (
                <Link className="cs-card" href={`/work/${c.slug}`} key={c.slug}>
                  <div>
                    <span className="mono">{c.industry}</span>
                    <h3>{c.name}</h3>
                    <p>{r.map((x) => `${x.value} ${x.label}`).join(" · ")}</p>
                  </div>
                  <span className="prod-link">Read the case study →</span>
                </Link>
              );
            })}
            <Link className="cs-card" href="/products/store-portal">
              <div>
                <span className="mono">Included free for year one</span>
                <h3>Store Portal</h3>
                <p>Run your WooCommerce store from your phone: products, orders, POS and analytics in one portal.</p>
              </div>
              <span className="prod-link">See Store Portal →</span>
            </Link>
            <Link className="cs-card" href="/products/wasl">
              <div>
                <span className="mono">WhatsApp commerce</span>
                <h3>WASL</h3>
                <p>Order confirmations, delivery updates and support on WhatsApp through the official Business API.</p>
              </div>
              <span className="prod-link">See WASL →</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
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
                <span className="mono">Sources</span>
                <ul>
                  {page.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p>Laws, tax rules and fees change. Treat this page as a guide, not legal or tax advice: Odysense builds the store, and we&apos;re not a law firm.</p>
              </div>
            </Reveal>
          )}
          {(siblings.length > 0 || page.links) && (
            <Reveal>
              <div className="guide-links">
                {siblings.map((p) => (
                  <Link className="btn btn-secondary" href={`/${p.slug}`} key={p.slug}>
                    {p.cardTitle} →
                  </Link>
                ))}
                {page.links?.map((l) => (
                  <Link className="btn btn-secondary" href={l.href} key={l.href}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {page.relatedService && <RelatedPosts href={page.relatedService} />}

      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox kicker="Free consultation" title={<>{page.ctaTitle} <span className="serif">{page.ctaAccent}</span></>} body={page.ctaBody} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
