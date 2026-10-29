import Link from "next/link";
import Image from "next/image";
import { seoMeta } from "@/lib/seo";
import { Reveal, SectionHead, CtaBox } from "@/components/ui";
import { clientLogos } from "@/lib/site";
import { getServices, getProducts, getTestimonial, getCarouselTiles } from "@/lib/content";
import { getCaseStudies } from "@/lib/localized";
import { lp, type Locale } from "@/lib/i18n";
import { ServiceCarousel } from "@/components/carousel";

/** Homepage copy. Prices are the published starting figures (CLAUDE.md section 5); keep both languages in step. */
const COPY = {
  en: {
    metaTitle: "Web Design & E-commerce Development in Qatar | Odysense",
    metaDescription:
      "Web design and e-commerce development company in Doha, Qatar. Websites from QAR 2,000, online stores from QAR 8,000 with local payment gateways. Free consultation.",
    badge: "Digital agency & software company —",
    badgeB: "Qatar Science & Technology Park",
    h1: "Web design, development",
    h1Accent: "& digital growth in Qatar.",
    sub: "We build the brands, websites and products behind ambitious companies across Qatar, Saudi Arabia and the Gulf — and the software we sell runs their operations every day.",
    start: "Start a project →",
    work: "See our work",
    trusted: "Trusted by 20+ organizations every year",
    carousel: "What we do",
    webImgAlt: "A designer walking past a wall of page layouts and sketches",
    webTag: "Web design & development",
    coreKicker: "Our core work",
    coreTitle: "Websites and stores",
    coreAccent: "built to sell.",
    coreLede:
      "Design and development is what we do most: websites, online stores and web apps for businesses in Qatar, Saudi Arabia and the Gulf. The same team plans, designs and builds every project, so what you approve is what goes live.",
    offers: [
      { label: "Website design", price: "from QAR 2,000", desc: "Custom, conversion-focused sites for businesses in Qatar and the GCC" },
      { label: "Website development", price: "fixed quote", desc: "Fast, secure builds on modern technology, from marketing sites to web platforms" },
      { label: "E-commerce stores", price: "from QAR 8,000", desc: "WooCommerce, Shopify and custom stores with local payment gateways" },
      { label: "Web apps & software", price: "from QAR 10,000", desc: "Portals, dashboards and SaaS, starting with a focused first release" },
    ],
    quote: "Get a fixed quote →",
    svcKicker: "Services",
    svcTitle: "Strategy to launch to growth,",
    svcAccent: "one team.",
    svcBody: "No handoffs between agencies. The people who define the strategy are the ones who design, build and grow it.",
    band: [
      { alt: "Brand identity covers in yellow, orange and red laid out on a white wall", tag: "Design" },
      { alt: "A developer typing on a laptop at a wooden desk", tag: "Engineering" },
      { alt: "Two colleagues reviewing plans together at a sunlit table", tag: "Growth" },
    ],
    prodKicker: "Products",
    prodTitle: "Software we built,",
    prodAccent: "own and run.",
    allProducts: "All products →",
    allProductsSmall: "Features, screenshots and pricing",
    ctaTitle: "Your digital journey",
    ctaAccent: "starts right here.",
    ctaBody: "Tell us what you're building. We reply within one business day, from Doha.",
  },
  ar: {
    metaTitle: "تصميم مواقع ومتاجر إلكترونية في قطر | Odysense",
    metaDescription:
      "شركة تصميم مواقع وتطوير متاجر إلكترونية في الدوحة. مواقع تبدأ من 2,000 ريال قطري، ومتاجر من 8,000 ريال مع بوابات الدفع المحلية. استشارة مجانية.",
    badge: "وكالة رقمية وشركة برمجيات —",
    badgeB: "واحة قطر للعلوم والتكنولوجيا",
    h1: "تصميم المواقع وتطويرها",
    h1Accent: "والنمو الرقمي في قطر.",
    sub: "نبني العلامات التجارية والمواقع والمنتجات الرقمية لشركات طموحة في قطر والسعودية ودول الخليج، والبرمجيات التي نبيعها تشغّل أعمالها كل يوم.",
    start: "ابدأ مشروعك ←",
    work: "شاهد أعمالنا",
    trusted: "يثق بنا أكثر من 20 جهة كل عام",
    carousel: "ما نقدمه",
    webImgAlt: "مصمم يمر بجانب جدار من تخطيطات الصفحات والرسومات",
    webTag: "تصميم المواقع وتطويرها",
    coreKicker: "عملنا الأساسي",
    coreTitle: "مواقع ومتاجر",
    coreAccent: "مصممة لتبيع.",
    coreLede:
      "التصميم والتطوير هو أكثر ما نقوم به: مواقع ومتاجر إلكترونية وتطبيقات ويب للشركات في قطر والسعودية والخليج. الفريق نفسه يخطط ويصمم ويبني كل مشروع، فما توافق عليه هو ما يُطلق فعلاً.",
    offers: [
      { label: "تصميم المواقع", price: "من 2,000 ريال", desc: "مواقع مخصصة تحوّل الزوار إلى عملاء للشركات في قطر والخليج" },
      { label: "تطوير المواقع", price: "عرض سعر ثابت", desc: "مواقع سريعة وآمنة بأحدث التقنيات، من المواقع التسويقية إلى منصات الويب" },
      { label: "المتاجر الإلكترونية", price: "من 8,000 ريال", desc: "متاجر WooCommerce وShopify ومتاجر مخصصة مع بوابات الدفع المحلية" },
      { label: "تطبيقات الويب والبرمجيات", price: "من 10,000 ريال", desc: "بوابات ولوحات تحكم ومنصات SaaS، تبدأ بإصدار أول مركّز" },
    ],
    quote: "احصل على عرض سعر ثابت ←",
    svcKicker: "الخدمات",
    svcTitle: "من الاستراتيجية إلى الإطلاق والنمو،",
    svcAccent: "فريق واحد.",
    svcBody: "لا تنقّل بين الوكالات. من يضع الاستراتيجية هو نفسه من يصمم ويبني ويطوّر.",
    band: [
      { alt: "أغلفة هوية تجارية بالأصفر والبرتقالي والأحمر على جدار أبيض", tag: "التصميم" },
      { alt: "مطوّر يكتب على حاسوب محمول فوق مكتب خشبي", tag: "الهندسة" },
      { alt: "زميلان يراجعان الخطط معاً على طاولة مشمسة", tag: "النمو" },
    ],
    prodKicker: "المنتجات",
    prodTitle: "برمجيات بنيناها،",
    prodAccent: "ونملكها ونشغّلها.",
    allProducts: "كل المنتجات ←",
    allProductsSmall: "المزايا والصور والأسعار",
    ctaTitle: "رحلتك الرقمية",
    ctaAccent: "تبدأ من هنا.",
    ctaBody: "أخبرنا بما تبنيه. نرد عليك خلال يوم عمل واحد، من الدوحة.",
  },
};

const OFFER_HREFS = [
  "/website-design-company-in-qatar",
  "/website-development-company-qatar",
  "/ecommerce-development-company-qatar",
  "/software-development-company-qatar",
];

const BAND = [
  { src: "/images/home-design.webp", w: 1200, h: 801, sizes: "(max-width: 920px) 100vw, 40vw" },
  { src: "/images/home-engineering.webp", w: 800, h: 1200, sizes: "(max-width: 920px) 100vw, 30vw" },
  { src: "/images/home-growth.webp", w: 1200, h: 800, sizes: "(max-width: 920px) 100vw, 30vw" },
];

// Real case-study figures (lib/case-studies.ts), never invented ones.
const PROOF = [
  { slug: "eleganza", index: 0 },
  { slug: "rafea-line", index: 0 },
  { slug: "eleganza", index: 1 },
];

export const homeMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/"), absoluteTitle: true });

export function HomePage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const L = (href: string) => lp(locale, href);
  const cases = getCaseStudies(locale);
  const proof = PROOF.map(({ slug, index }) => {
    const cs = cases.find((x) => x.slug === slug)!;
    return { value: cs.results[index].value, label: cs.results[index].label, name: cs.name, href: L(`/work/${cs.slug}`) };
  });
  const testimonial = getTestimonial(locale);

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <header className="hero">
        <div className="orb" aria-hidden="true" />
        <div className="wrap">
          <span className="hero-badge">
            ✦ &nbsp;{c.badge} <b>{c.badgeB}</b>
          </span>
          <h1>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </h1>
          <Reveal>
            <p className="hero-sub">{c.sub}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={L("/contact")}>
                {c.start}
              </Link>
              <Link className="btn btn-secondary" href={L("/work")}>
                {c.work}
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-logos">
              <span className="mono">{c.trusted}</span>
              <div className="client-logos">
                {clientLogos.map((x) => (
                  <Image src={x.file} alt={x.name} title={x.name} key={x.file} width={140} height={34} style={{ width: "auto" }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- Service card carousel ---------- */}
      <ServiceCarousel tiles={getCarouselTiles(locale)} rtl={locale === "ar"} label={c.carousel} />

      {/* ---------- Web design & development ---------- */}
      <section className="section" id="web">
        <div className="wrap">
          <div className="home-feature">
            <Reveal className="img-frame home-feature-img">
              <Image src="/images/home-webdev.webp" alt={c.webImgAlt} width={1146} height={1200} sizes="(max-width: 920px) 100vw, 45vw" />
              <span className="img-tag">{c.webTag}</span>
            </Reveal>
            <Reveal>
              <span className="kicker">{c.coreKicker}</span>
              <h2>
                {c.coreTitle} <span className="serif">{c.coreAccent}</span>
              </h2>
              <p className="home-feature-lede">{c.coreLede}</p>
              <div className="home-svc-list">
                {c.offers.map((o, i) => (
                  <Link className="home-svc" href={L(OFFER_HREFS[i])} key={OFFER_HREFS[i]}>
                    <b>{o.label}</b>
                    <span className="home-svc-price">{o.price}</span>
                    <small>{o.desc}</small>
                  </Link>
                ))}
              </div>
              <div className="hero-actions home-feature-actions">
                <Link className="btn btn-primary" href={L("/contact")}>
                  {c.quote}
                </Link>
                <Link className="btn btn-secondary" href={L("/work")}>
                  {c.work}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="stat-row home-proof">
            {proof.map((p) => (
              <Link className="stat" href={p.href} key={`${p.name}-${p.label}`}>
                <b>
                  <bdi dir="ltr">{p.value}</bdi>
                </b>
                <span>
                  {p.label} · {p.name}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section" id="services">
        <div className="wrap">
          <SectionHead
            kicker={c.svcKicker}
            title={
              <>
                {c.svcTitle} <span className="serif">{c.svcAccent}</span>
              </>
            }
          >
            {c.svcBody}
          </SectionHead>
          <Reveal className="grid-3">
            {getServices(locale).map((s) => (
              <Link className="card" href={s.slug} key={s.title}>
                <span className="num">{s.numeral}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Studio imagery ---------- */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal className="img-band img-band--fixed">
            {BAND.map((b, i) => (
              <div className="img-frame" key={b.src}>
                <Image src={b.src} alt={c.band[i].alt} width={b.w} height={b.h} sizes={b.sizes} />
                <span className="img-tag">{c.band[i].tag}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Products (kept brief: the homepage leads with services) ---------- */}
      <section className="section section--flush-top" id="products">
        <div className="wrap">
          <SectionHead
            kicker={c.prodKicker}
            title={
              <>
                {c.prodTitle} <span className="serif">{c.prodAccent}</span>
              </>
            }
          />
          <Reveal className="prod-mini-grid">
            {getProducts(locale).map((p) => (
              <Link className="prod-mini" href={p.slug} key={p.name}>
                {p.logo && <Image src={p.logo} alt="" width={56} height={56} />}
                <span>
                  <b>{p.name}</b>
                  <small>{p.chip}</small>
                </span>
              </Link>
            ))}
            <Link className="prod-mini prod-mini--all" href={L("/products")}>
              <span>
                <b>{c.allProducts}</b>
                <small>{c.allProductsSmall}</small>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section className="section quote-sec">
        <div className="wrap">
          <Reveal>
            <blockquote className="quote">
              <span className="mark">“</span>
              <p>{testimonial.quote}</p>
              <cite>
                <b>{testimonial.author}</b>
                {testimonial.role}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section" id="contact">
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
    </main>
  );
}
