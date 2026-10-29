import Link from "next/link";
import { seoMeta } from "@/lib/seo";
import { Reveal, CtaBox, PageHero, SectionHead } from "@/components/ui";
import { getGccPages, getServicePages } from "@/lib/localized";
import { lp, ui, type Locale } from "@/lib/i18n";

const COPY = {
  en: {
    metaTitle: "Services — Strategy, Design & Development, Growth",
    metaDescription:
      "Everything Odysense does: web design, e-commerce, event gamification, software and app development, branding, SEO, digital marketing and WhatsApp Business API — in Qatar & the GCC.",
    crumb: "Services",
    h1: "Strategy, design & development,",
    h1Accent: "growth.",
    lede: "One team from first brief to compounding results — no handoffs, no gaps. Pick where you need us, or bring the whole problem.",
    featured: [
      { title: "E-commerce", desc: "Online stores on WooCommerce, Shopify and custom stacks — our deepest specialty." },
      { title: "Gamification & Brand Activations", desc: "Event games, live quizzes, polls and Q&A that engage the room and capture consented leads." },
    ],
    gccKicker: "Across the GCC",
    gccTitle: "E-commerce and web design",
    gccAccent: "beyond Qatar.",
    gccBody: "Guides by market and platform for brands selling in Saudi Arabia, the UAE, Kuwait, Bahrain and Oman.",
    ctaTitle: "Not sure which",
    ctaAccent: "you need?",
    ctaBody: "Describe the problem in your own words — we'll tell you what it takes, and what it doesn't.",
  },
  ar: {
    metaTitle: "خدماتنا: الاستراتيجية والتصميم والتطوير والنمو",
    metaDescription:
      "خدمات Odysense: تصميم المواقع والمتاجر الإلكترونية وألعاب الفعاليات والبرمجيات والتطبيقات والهوية التجارية وتحسين البحث والتسويق وواتساب للأعمال في قطر والخليج.",
    crumb: "الخدمات",
    h1: "الاستراتيجية والتصميم والتطوير،",
    h1Accent: "والنمو.",
    lede: "فريق واحد من أول فكرة حتى النتائج التي تتراكم، بلا تنقّل بين جهات ولا فجوات. اختر ما تحتاجه منا، أو أحضر لنا المشكلة كاملة.",
    featured: [
      { title: "المتاجر الإلكترونية", desc: "متاجر إلكترونية على WooCommerce وShopify وحلول مخصصة، وهي أعمق تخصصاتنا." },
      { title: "الألعاب التفاعلية وتفعيل العلامات التجارية", desc: "ألعاب للفعاليات ومسابقات واستطلاعات وجلسات أسئلة مباشرة تشد الحضور وتجمع بيانات العملاء المحتملين بموافقتهم." },
    ],
    gccKicker: "في دول الخليج",
    gccTitle: "متاجر إلكترونية وتصميم مواقع",
    gccAccent: "خارج قطر.",
    gccBody: "أدلة حسب السوق والمنصة للعلامات التجارية التي تبيع في السعودية والإمارات والكويت والبحرين وعُمان.",
    ctaTitle: "لست متأكداً مما",
    ctaAccent: "تحتاجه؟",
    ctaBody: "صف المشكلة بكلماتك، وسنخبرك بما تتطلبه وما لا تتطلبه.",
  },
};

const FEATURED_HREFS = ["/ecommerce-development-company-qatar", "/gamification-brand-activation-qatar"];

/** Card text from a service page's lede: the part before the dash, or its first sentence. */
const shortDesc = (lede: string) => {
  const head = lede.split("—")[0].trim();
  if (head.length <= 170) return head;
  const dot = head.indexOf(". ");
  return dot > 0 ? head.slice(0, dot + 1) : head;
};

export const servicesMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/services/") });

export function ServicesPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const featured = [
    ...c.featured.map((f, i) => ({ ...f, href: L(FEATURED_HREFS[i]) })),
    ...getServicePages(locale).map((s) => ({ href: L(`/${s.slug}`), title: s.crumb, desc: locale === "en" ? s.lede.split("—")[0].trim() : shortDesc(s.lede) })),
  ];
  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: c.crumb }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-3">
            {featured.map((s) => (
              <Link className="card" href={s.href} key={s.href}>
                <span className="num serif">{t.arrow}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker={c.gccKicker}
            title={
              <>
                {c.gccTitle} <span className="serif">{c.gccAccent}</span>
              </>
            }
          >
            {c.gccBody}
          </SectionHead>
          <Reveal className="grid-3">
            {getGccPages(locale).map((g) => (
              <Link className="card" href={L(`/${g.slug}`)} key={g.slug}>
                <span className="num serif">{t.arrow}</span>
                <h3>{g.cardTitle}</h3>
                <p>{g.cardDesc}</p>
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
