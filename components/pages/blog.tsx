import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { PostCard } from "@/components/post-card";
import { Reveal, CtaBox, PageHero, Byline } from "@/components/ui";
import { ORG_ID, WEBSITE_ID } from "@/lib/schema";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";
import { getPostL, postsNewestFirstL } from "@/lib/localized";
import { fmtDateL, lp, ui, type Locale } from "@/lib/i18n";

const COPY = {
  en: {
    metaTitle: "Blog — Web, E-commerce & SEO Guides for Qatar",
    metaDescription: "Practical guides on websites, e-commerce, SEO and WhatsApp commerce for businesses in Qatar & the GCC — from the Odysense team.",
    h1: "Insights from",
    h1Accent: "the workshop.",
    lede: "Practical, no-fluff guides on websites, e-commerce, SEO and WhatsApp commerce in the GCC — written by the team that builds them, not theory.",
    minRead: (m: number) => `${m} min read`,
    askKicker: "Ask us",
    askTitle: "Have a question",
    askAccent: "we should answer?",
    askBody: "Tell us what you're trying to figure out — the best articles start as real questions.",
    published: (d: string) => `Published ${d} · `,
    keepReading: "Keep reading",
    sources: "Sources",
    relatedService: "Related service",
    ctaTitle: "Put this into practice",
    ctaAccent: "with us.",
    ctaBody: "Tell us what you're building. We reply within one business day, from Doha.",
    all: "← All articles",
  },
  ar: {
    metaTitle: "المدونة: أدلة المواقع والمتاجر وSEO في قطر",
    metaDescription: "أدلة عملية حول المواقع والتجارة الإلكترونية وتحسين محركات البحث والتجارة عبر واتساب للشركات في قطر والخليج، من فريق Odysense.",
    h1: "رؤى من",
    h1Accent: "داخل الورشة.",
    lede: "أدلة عملية ومباشرة حول المواقع والتجارة الإلكترونية وتحسين محركات البحث والتجارة عبر واتساب في الخليج، يكتبها الفريق الذي يبنيها، لا مجرد نظريات.",
    minRead: (m: number) => `قراءة في ${m} ${m > 10 ? "دقيقة" : "دقائق"}`,
    askKicker: "اسألنا",
    askTitle: "لديك سؤال",
    askAccent: "نجيب عنه؟",
    askBody: "أخبرنا بما تحاول فهمه، فأفضل المقالات تبدأ بأسئلة حقيقية.",
    published: (d: string) => `نُشر في ${d} · `,
    keepReading: "تابع القراءة",
    sources: "المصادر",
    relatedService: "خدمة ذات صلة",
    ctaTitle: "طبّق هذا",
    ctaAccent: "معنا.",
    ctaBody: "أخبرنا بما تبنيه. نرد عليك خلال يوم عمل واحد، من الدوحة.",
    all: "→ كل المقالات",
  },
};

/* ------------------------------------------------------------------ hub */

export const blogMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/blog/") });

export function BlogHub({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: lp(locale, "/") }, { label: t.crumbs.blog }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-2">
            {postsNewestFirstL(locale).map((p) => (
              <PostCard post={p} key={p.slug} meta={`${fmtDateL(p.date, locale)} · ${c.minRead(p.minutes)}`} locale={locale} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker={c.askKicker}
              title={
                <>
                  {c.askTitle} <span className="serif">{c.askAccent}</span>
                </>
              }
              body={c.askBody}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------------------------------------------- post */

export const postParams = () => posts.map((p) => ({ slug: p.slug }));

export function postMeta(slug: string, locale: Locale): Metadata {
  const post = getPostL(slug, locale);
  if (!post) return {};
  return seoMeta({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: lp(locale, `/blog/${post.slug}/`),
    type: "article",
    published: post.date,
    modified: post.updated ?? post.date,
    ...(post.image && { image: { url: post.image.src, width: post.image.w, height: post.image.h, alt: post.image.alt } }),
  });
}

export function PostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const post = getPostL(slug, locale)!;
  const url = `${site.url}${L(`/blog/${post.slug}/`)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `${site.url}${post.image?.src ?? "/og.png"}`,
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/logos/odysense-icon.png` },
    },
    mainEntityOfPage: url,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: locale,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.crumbs.home, item: locale === "en" ? site.url : `${site.url}/ar/` },
      { "@type": "ListItem", position: 2, name: t.crumbs.blog, item: `${site.url}${L("/blog/")}` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.blog, href: L("/blog") }, { label: post.category }]}
        breadcrumbSchema={false}
        title={<>{post.title}</>}
        meta={
          <Byline
            updated={post.updated ?? post.date}
            locale={locale}
            extra={`${post.updated && post.updated !== post.date ? c.published(fmtDateL(post.date, locale)) : ""}${c.minRead(post.minutes)}`}
          />
        }
      />

      <section className="section">
        <div className="wrap">
          <article className="post-body">
            {post.image && (
              <div className="img-inline post-hero-img">
                <Image src={post.image.src} alt={post.image.alt} width={post.image.w} height={post.image.h} sizes="(max-width: 920px) 100vw, 760px" priority />
              </div>
            )}
            {post.sections.map((s, i) => (
              <Reveal key={i}>
                {s.h && (
                  <h2>
                    {s.h}
                    <span className="serif" style={{ color: "var(--purple)" }}>
                      .
                    </span>
                  </h2>
                )}
                {s.ps?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
            {post.relatedPosts && (
              <Reveal>
                <div className="post-sources">
                  <span className="mono">{c.keepReading}</span>
                  <ul>
                    {post.relatedPosts
                      .map((s) => getPostL(s, locale))
                      .filter((p) => p !== undefined)
                      .map((p) => (
                        <li key={p.slug}>
                          <Link href={L(`/blog/${p.slug}`)}>{p.title}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {post.sources && (
              <Reveal>
                <div className="post-sources">
                  <span className="mono">{c.sources}</span>
                  <ul>
                    {post.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            <Reveal>
              <div className="post-related">
                <span>{c.relatedService}</span>
                <Link className="btn btn-secondary" href={post.relatedService.href}>
                  {post.relatedService.label} {t.arrow}
                </Link>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="section section--flush-top">
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
        <Link href={L("/blog")} style={{ fontSize: 14, fontWeight: 600 }}>
          {c.all}
        </Link>
      </div>
    </main>
  );
}
