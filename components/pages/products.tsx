import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import { products } from "@/lib/site";
import { getProducts, getProductDetails, getProductShowcase } from "@/lib/content";
import { LottiePlayer } from "@/components/lottie";
import { ShotCarousel } from "@/components/shot-carousel";
import { RelatedPosts } from "@/components/related-posts";
import { lp, ui, type Locale } from "@/lib/i18n";

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

const COPY = {
  en: {
    metaTitle: "Products — Software Built & Run by Odysense",
    metaDescription: "WASL, QFlow, Social Bakery and Rehabitt — proven software products built and operated by Odysense, serving businesses across Qatar & the GCC.",
    h1: "Software we built,",
    h1Accent: "own and run.",
    lede: "Not concepts — operating products with real customers. Built in Doha, serving restaurants, retailers, clinics and enterprises across the region.",
    logo: (n: string) => `${n} logo`,
    more: "Learn more →",
    demosKicker: "Product demos",
    demosTitle: "See them",
    demosAccent: "running.",
    demosBody: "Tell us which product fits your business — we'll set up a live demo with your own data.",
    demo: "Request a demo →",
    visit: "Visit",
    does: "What it",
    doesAccent: "does.",
    howKicker: "How it works",
    howTitle: "Three steps,",
    howAccent: "no friction.",
    step: (i: number) => `Step ${i}`,
    insideKicker: "Inside the product",
    insideTitle: "Real screens,",
    insideAccent: "not mockups.",
    pricingKicker: "Pricing",
    pricingTitle: "One plan,",
    pricingAccent: "add what you need.",
    startKicker: "Get started",
    forBusiness: "for your business.",
  },
  ar: {
    metaTitle: "منتجاتنا: برمجيات تبنيها وتشغّلها Odysense",
    metaDescription: "WASL وQFlow وStore Portal وغيرها: منتجات برمجية مجرّبة تبنيها Odysense وتشغّلها، وتخدم الشركات في قطر ودول الخليج.",
    h1: "برمجيات بنيناها،",
    h1Accent: "ونملكها ونشغّلها.",
    lede: "ليست أفكاراً على الورق، بل منتجات تعمل ولها عملاء حقيقيون. بُنيت في الدوحة وتخدم المطاعم ومتاجر التجزئة والعيادات والمؤسسات في أنحاء المنطقة.",
    logo: (n: string) => `شعار ${n}`,
    more: "اعرف المزيد ←",
    demosKicker: "عروض تجريبية",
    demosTitle: "شاهدها",
    demosAccent: "وهي تعمل.",
    demosBody: "أخبرنا بالمنتج المناسب لعملك، وسنجهز لك عرضاً مباشراً على بياناتك.",
    demo: "اطلب عرضاً تجريبياً ←",
    visit: "زيارة",
    does: "ماذا",
    doesAccent: "يقدّم.",
    howKicker: "طريقة العمل",
    howTitle: "ثلاث خطوات،",
    howAccent: "بلا تعقيد.",
    step: (i: number) => `الخطوة ${i}`,
    insideKicker: "من داخل المنتج",
    insideTitle: "شاشات حقيقية،",
    insideAccent: "لا نماذج تخيلية.",
    pricingKicker: "الأسعار",
    pricingTitle: "خطة واحدة،",
    pricingAccent: "وأضف ما تحتاجه.",
    startKicker: "ابدأ الآن",
    forBusiness: "لأعمالك.",
  },
};

/* ------------------------------------------------------------------ hub */

export const productsMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/products/") });

export function ProductsHub({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: lp(locale, "/") }, { label: t.crumbs.products }]}
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
            {getProducts(locale).map((p) => (
              <Link className="prod" href={p.slug} key={p.name}>
                <div>
                  <div className="prod-top">
                    {p.logo ? (
                      <Image className="prod-mark" src={p.logo} alt={c.logo(p.name)} width={130} height={40} />
                    ) : (
                      <h3>{p.name}</h3>
                    )}
                    <span className={`chip chip--${p.chipColor}`}>{p.chip}</span>
                  </div>
                  {p.logo && <h3 style={{ marginTop: 14 }}>{p.name}</h3>}
                  <p>{p.description}</p>
                </div>
                <span className="prod-link">{c.more}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker={c.demosKicker}
              title={
                <>
                  {c.demosTitle} <span className="serif">{c.demosAccent}</span>
                </>
              }
              body={c.demosBody}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------- product */

export const productParams = () => products.map((p) => ({ slug: p.slug.replace("/products/", "") }));

export function productMeta(slug: string, locale: Locale): Metadata {
  const p = getProducts(locale).find((x) => x.slug === lp(locale, `/products/${slug}`));
  if (!p) return {};
  const d = getProductDetails(slug, locale);
  return seoMeta({ title: d?.metaTitle ?? `${p.name} — ${p.chip}`, description: d?.metaDescription ?? p.description, path: lp(locale, `/products/${slug}/`) });
}

export function ProductPage({ slug, locale }: { slug: string; locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const p = getProducts(locale).find((x) => x.slug === L(`/products/${slug}`))!;
  const d = getProductDetails(slug, locale)!;
  const show = getProductShowcase(slug, locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: p.url,
    description: p.description,
    ...(locale === "ar" && { inLanguage: "ar" }),
    publisher: { "@type": "Organization", name: "Odysense" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.products, href: L("/products") }, { label: p.name }]}
        title={
          <>
            {p.logo && (
              <Image className="prod-hero-mark" src={p.logo} alt={c.logo(p.name)} width={220} height={64} style={{ display: "block" }} />
            )}
            {p.name}
            <span className="serif">.</span>
          </>
        }
        lede={d.intro ?? `${d.tagline} ${p.description}`}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href={L("/contact")}>
            {c.demo}
          </Link>
          {p.url && (
            <a className="btn btn-secondary" href={p.url} target="_blank" rel="noopener noreferrer">
              {c.visit} {p.urlLabel}
            </a>
          )}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={p.chip}
            title={
              <>
                {c.does} <span className="serif">{c.doesAccent}</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {d.features.map((f, i) => (
              <div className="card" key={f.h}>
                <span className="num">{NUMERALS[i]}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {show?.steps && (
        <section className="section section--flush-top">
          <div className="wrap">
            <SectionHead
              kicker={c.howKicker}
              title={
                <>
                  {c.howTitle} <span className="serif">{c.howAccent}</span>
                </>
              }
            />
            <Reveal className="step-cards">
              {show.steps.map((st, i) => (
                <div className="step-card" key={st.title}>
                  <LottiePlayer src={st.lottie} />
                  <span className="step-num">{c.step(i + 1)}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {show && (
        <section className="section section--flush-top quote-sec">
          <div className="wrap">
            {show.gallery ? (
              <>
                <SectionHead
                  kicker={c.insideKicker}
                  title={
                    <>
                      {c.insideTitle} <span className="serif">{c.insideAccent}</span>
                    </>
                  }
                />
                <Reveal>
                  <ShotCarousel shots={show.gallery} rtl={locale === "ar"} />
                </Reveal>
              </>
            ) : (
              <SectionHead
                kicker={c.pricingKicker}
                title={
                  <>
                    {c.pricingTitle} <span className="serif">{c.pricingAccent}</span>
                  </>
                }
              />
            )}
            {show.pricing && (
              <Reveal>
                <p className="pricing-strip">{show.pricing}</p>
              </Reveal>
            )}
            {show.addons && (
              <Reveal>
                <div className="addon-grid" style={{ marginTop: 44 }}>
                  {show.addons.map((a) => (
                    <div className="addon" key={a.name}>
                      <div>
                        <b>{a.name}</b>
                        <p>{a.desc}</p>
                      </div>
                      <span>{a.price}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {show.quotes && (
              <Reveal>
                <div className="mini-quotes" style={{ marginTop: 44 }}>
                  {show.quotes.map((q) => (
                    <blockquote className="mini-quote" key={q.author}>
                      <p>“{q.text}”</p>
                      <cite>
                        <b>{q.author}</b>
                        {q.role}
                      </cite>
                    </blockquote>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {d.image && (
        <section className="section section--flush-top">
          <div className="wrap">
            <Reveal>
              <div className="img-inline">
                <Image src={d.image.src} alt={d.image.alt} width={900} height={1200} sizes="(max-width: 920px) 100vw, 900px" style={{ maxHeight: 560, objectFit: "cover", width: "100%" }} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {d.related && (
        <section className="section section--flush-top">
          <div className="wrap">
            <Reveal>
              <div className="post-related" style={{ marginTop: 0 }}>
                <span>{d.related.text}</span>
                <Link className="btn btn-secondary" href={L(d.related.href)}>
                  {d.related.label} {t.arrow}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <RelatedPosts href={`/products/${slug}`} locale={locale} />

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker={c.startKicker}
              title={
                <>
                  {p.name}
                  {locale === "ar" ? "،" : ","} <span className="serif">{c.forBusiness}</span>
                </>
              }
              body={d.cta}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
