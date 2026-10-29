import Link from "next/link";
import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { caseStudies } from "@/lib/case-studies";
import { getCaseStudies, getCaseStudyL } from "@/lib/localized";
import { lp, ui, type Locale } from "@/lib/i18n";

const COPY = {
  en: {
    metaTitle: "Our Work — Web Design & E-commerce Portfolio",
    metaDescription: "Selected projects by Odysense: e-commerce stores, websites and digital products built for brands across Qatar and the GCC.",
    h1: "Work that",
    h1Accent: "works.",
    lede: "Selected projects — each one a real business, live today. More case studies are added regularly.",
    read: "Read the case study →",
    hubCtaTitle: "Your project could be",
    hubCtaAccent: "next on this page.",
    hubCtaBody: "Tell us what you're building. We reply within one business day, from Doha.",
    caseTitle: (n: string) => `${n} — Case Study`,
    challenge: ["The", "challenge."],
    approach: ["Our", "approach."],
    built: ["What we", "built."],
    results: ["The", "results."],
    live: "See it live:",
    ctaTitle: "Want results like",
    ctaAccent: "these?",
    ctaBody: "Tell us about your brand and your market. We reply within one business day, from Doha.",
    all: "← All work",
  },
  ar: {
    metaTitle: "أعمالنا: معرض تصميم المواقع والمتاجر الإلكترونية",
    metaDescription: "مشاريع مختارة من Odysense: متاجر إلكترونية ومواقع ومنتجات رقمية بنيناها لعلامات تجارية في قطر ودول الخليج.",
    h1: "أعمال",
    h1Accent: "تحقق النتائج.",
    lede: "مشاريع مختارة، كل منها نشاط تجاري حقيقي يعمل اليوم. نضيف دراسات حالة جديدة باستمرار.",
    read: "اقرأ دراسة الحالة ←",
    hubCtaTitle: "قد يكون مشروعك",
    hubCtaAccent: "التالي في هذه الصفحة.",
    hubCtaBody: "أخبرنا بما تبنيه. نرد عليك خلال يوم عمل واحد، من الدوحة.",
    caseTitle: (n: string) => `${n}: دراسة حالة`,
    challenge: ["", "التحدي."],
    approach: ["", "منهجنا."],
    built: ["ما", "بنيناه."],
    results: ["", "النتائج."],
    live: "شاهده مباشرة:",
    ctaTitle: "تريد نتائج",
    ctaAccent: "كهذه؟",
    ctaBody: "أخبرنا عن علامتك التجارية وسوقك. نرد عليك خلال يوم عمل واحد، من الدوحة.",
    all: "→ كل الأعمال",
  },
};

/* ------------------------------------------------------------------ hub */

export const workMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/work/") });

export function WorkHub({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: lp(locale, "/") }, { label: t.crumbs.work }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="cs-grid">
            {getCaseStudies(locale).map((cs) => (
              <Link className="cs-card" href={lp(locale, `/work/${cs.slug}`)} key={cs.slug}>
                <div>
                  <span className="mono">
                    {cs.industry} · {cs.year}
                  </span>
                  <h3>{cs.name}</h3>
                  <p>{cs.teaser}</p>
                </div>
                <span className="prod-link">{c.read}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  {c.hubCtaTitle} <span className="serif">{c.hubCtaAccent}</span>
                </>
              }
              body={c.hubCtaBody}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------------------------------------- case study */

export const caseParams = () => caseStudies.map((cs) => ({ slug: cs.slug }));

export function caseMeta(slug: string, locale: Locale): Metadata {
  const cs = getCaseStudyL(slug, locale);
  if (!cs) return {};
  return seoMeta({ title: COPY[locale].caseTitle(cs.name), description: cs.teaser, path: lp(locale, `/work/${cs.slug}/`) });
}

function H2({ parts }: { parts: string[] }) {
  return (
    <h2>
      {parts[0] && <>{parts[0]} </>}
      <span className="serif">{parts[1]}</span>
    </h2>
  );
}

export function CaseStudyPage({ slug, locale }: { slug: string; locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const cs = getCaseStudyL(slug, locale)!;

  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.work, href: L("/work") }, { label: cs.name }]}
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
              <H2 parts={c.challenge} />
              {cs.challenge.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal>
              <H2 parts={c.approach} />
              {cs.approach.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal>
              <H2 parts={c.built} />
              <ul>
                {cs.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <H2 parts={c.results} />
              <div className="stat-row cs-results">
                {cs.results.map((r) => (
                  <div className="stat" key={r.label}>
                    <b className={r.todo ? "todo" : undefined}>
                      <bdi dir="ltr">{r.value}</bdi>
                    </b>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {cs.siteUrl && (
              <Reveal>
                <p style={{ marginTop: 40 }}>
                  {c.live}{" "}
                  <a href={cs.siteUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, borderBottom: "1px solid currentColor" }}>
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
                  {c.ctaTitle} <span className="serif">{c.ctaAccent}</span>
                </>
              }
              body={c.ctaBody}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 40 }}>
        <Link href={L("/work")} style={{ fontSize: 14, fontWeight: 600 }}>
          {c.all}
        </Link>
      </div>
    </main>
  );
}
