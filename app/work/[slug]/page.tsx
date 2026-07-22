import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — Case Study`,
    description: cs.teaser,
    alternates: { canonical: `/work/${cs.slug}/` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: cs.name }]}
        title={
          <>
            {cs.name}
            <span className="serif">.</span>
          </>
        }
        lede={cs.intro}
      >
        <div className="cs-meta">
          <span className="chip chip--purple">{cs.industry}</span>
          <span className="chip chip--orange">{cs.year}</span>
          {cs.services.map((s) => (
            <span className="chip chip--sky" key={s}>
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="cs-body">
            <Reveal>
              <h2>
                The <span className="serif">challenge.</span>
              </h2>
              {cs.challenge.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal>
              <h2>
                Our <span className="serif">approach.</span>
              </h2>
              {cs.approach.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal>
              <h2>
                What we <span className="serif">built.</span>
              </h2>
              <ul>
                {cs.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2>
                The <span className="serif">results.</span>
              </h2>
              <div className="stat-row cs-results">
                {cs.results.map((r) => (
                  <div className="stat" key={r.label}>
                    <b className={r.todo ? "todo" : undefined}>{r.value}</b>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {cs.siteUrl && (
              <Reveal>
                <p style={{ marginTop: 40 }}>
                  See it live:{" "}
                  <a
                    href={cs.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 600, borderBottom: "1px solid currentColor" }}
                  >
                    {cs.siteLabel}
                  </a>
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {cs.quote && (
        <section className="section quote-sec">
          <div className="wrap">
            <Reveal>
              <blockquote className={`quote ${cs.quote.todo ? "todo" : ""}`}>
                <span className="mark">“</span>
                <p>{cs.quote.text}</p>
                <cite>
                  <b>{cs.quote.author}</b>
                  {cs.quote.role}
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  Want results like <span className="serif">these?</span>
                </>
              }
              body="Tell us about your brand and your market. We reply within one business day, from Doha."
            />
          </Reveal>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 40 }}>
        <Link href="/work" style={{ fontSize: 14, fontWeight: 600 }}>
          ← All work
        </Link>
      </div>
    </main>
  );
}
