import Link from "next/link";
import Image from "next/image";
import { seoMeta } from "@/lib/seo";
import { Reveal, SectionHead, CtaBox, PageHero, Byline } from "@/components/ui";
import { webPageSchema } from "@/lib/schema";
import { RelatedPosts } from "@/components/related-posts";
import { pageUpdated } from "@/lib/site";
import { gatewayListL } from "@/lib/content";
import { getStoreCaseStudies } from "@/lib/localized";
import { lp, ui, type Locale } from "@/lib/i18n";

/** Flagship e-commerce page. Prices and gateways are owner-confirmed (CLAUDE.md section 5); keep both languages in step. */
const COPY = {
  en: {
    metaTitle: "E-commerce Development Company in Qatar",
    metaDescription:
      "Odysense builds high-performing online stores for brands in Qatar & the GCC — WooCommerce, Shopify and custom builds with local payment gateways, from Doha.",
    faqs: [
      {
        q: "How much does an e-commerce website cost in Qatar?",
        a: "A launch-ready store with custom design — including one year of domain registration and one year of hosting — typically costs QAR 8,000–10,000. More advanced stores cost more depending on features and design, and every project starts with a fixed, itemized quote. Every Odysense e-commerce build also includes Store Portal, our store management platform, free for the first year.",
      },
      {
        q: "Which payment gateways do you integrate for Qatar and KSA?",
        a: (qa: string, sa: string) =>
          `In Qatar we integrate ${qa}. For Saudi Arabia we integrate ${sa}. If you need a gateway that isn't listed, we can integrate that too. We advise on the right mix for your market and handle the full technical setup and testing.`,
      },
      {
        q: "WooCommerce, Shopify or a custom build — which should I choose?",
        a: "WooCommerce suits brands that want full ownership and flexibility at low running cost. Shopify suits teams that want managed simplicity and fast scaling. Custom/headless builds suit high-traffic or unusual requirements. We've shipped all three — we'll recommend based on your catalogue, team and growth plans, not on what's easiest for us.",
      },
      {
        q: "How long does it take to launch an online store?",
        a: "A well-scoped store typically launches in 4–8 weeks: discovery and design first, then build, payment testing and content. Complex catalogues, custom features or bilingual content extend that. You'll get a concrete timeline with milestones before we start.",
      },
      {
        q: "Do you support Arabic and right-to-left layouts?",
        a: "Yes — we build stores bilingual-ready from day one, with proper RTL layouts, Arabic typography and localized checkout, so adding Arabic later is a content task rather than a rebuild.",
      },
      {
        q: "What happens after launch?",
        a: "We don't disappear. Odysense offers ongoing care: performance monitoring, updates, conversion optimization and growth work (SEO, ads, analytics). Many of our client relationships run for years past the first launch.",
      },
    ],
    crumb: "E-commerce",
    h1: "E-commerce development",
    h1Accent: "in Qatar.",
    lede: "Odysense builds online stores for brands in Qatar and the GCC on WooCommerce, Shopify or a custom stack. A launch-ready store typically costs QAR 8,000–10,000, including a year of domain and hosting, with local payment gateways, Arabic and English, and Store Portal free for the first year. Built in Doha, at Qatar Science & Technology Park.",
    quote: "Get a fixed quote →",
    stores: "See our stores",
    stats: [
      { b: "20", accent: "+", text: "clients every year across Qatar & the GCC" },
      { b: "3", accent: "", text: "platforms mastered — WooCommerce, Shopify & custom" },
      { b: "E-commerce", accent: " first", text: "our deepest specialty — stores like Eleganza, Rafea Line & Sharqiyat Line" },
    ],
    incKicker: "What's included",
    incTitle: "Everything a store needs",
    incAccent: "to sell.",
    incBody: "One team handles the whole build — no juggling separate designers, developers and payment consultants.",
    includes: [
      { h: "Store design", p: "Custom storefront design around your catalogue and brand — not a template with your logo on it." },
      { h: "Development", p: "Fast, secure builds on WooCommerce, Shopify or custom stacks — engineered for mobile-first GCC shoppers." },
      { h: "Local payments", p: "MyFatoorah, Tap, PayTabs, SADAD, QNB and more across the GCC — integrated, tested and reconciled." },
      { h: "WhatsApp commerce", p: "Order notifications, support and re-engagement on WhatsApp via our own WASL platform." },
      { h: "Bilingual-ready", p: "Arabic/English architecture with proper RTL from day one — adding a language is a content task, not a rebuild." },
      { h: "SEO & analytics", p: "Technical SEO, structured data and conversion tracking built in — so the store gets found and you see what works." },
    ],
    imgAlt: "E-commerce order packaging ready for delivery",
    recentKicker: "Recent stores",
    recentTitle: "Built by Odysense,",
    recentAccent: "selling today.",
    read: "Read the case study →",
    faqKicker: "Questions",
    faqTitle: "Before you ask",
    faqAccent: "for a quote.",
    ctaTitle: "Ready to open",
    ctaAccent: "your store?",
    ctaBody: "Tell us about your products and market. You'll get a fixed, itemized quote — usually within two business days.",
  },
  ar: {
    metaTitle: "شركة تطوير متاجر إلكترونية في قطر",
    metaDescription:
      "تبني Odysense متاجر إلكترونية عالية الأداء للعلامات التجارية في قطر والخليج على WooCommerce وShopify وبحلول مخصصة، مع بوابات الدفع المحلية، من الدوحة.",
    faqs: [
      {
        q: "كم تكلفة إنشاء متجر إلكتروني في قطر؟",
        a: "يكلف المتجر الجاهز للإطلاق بتصميم مخصص، شاملاً تسجيل النطاق لمدة عام والاستضافة لمدة عام، عادةً من 8,000 إلى 10,000 ريال قطري. المتاجر الأكثر تقدماً تكلف أكثر حسب المزايا والتصميم، وكل مشروع يبدأ بعرض سعر ثابت ومفصّل. ويشمل كل متجر تبنيه Odysense منصة Store Portal لإدارة المتجر مجاناً في السنة الأولى.",
      },
      {
        q: "ما بوابات الدفع التي تربطونها في قطر والسعودية؟",
        a: (qa: string, sa: string) =>
          `في قطر نربط ${qa}. وفي السعودية نربط ${sa}. وإذا احتجت بوابة غير موجودة في القائمة، يمكننا ربطها أيضاً. ننصحك بالمزيج المناسب لسوقك ونتولى الإعداد التقني والاختبار بالكامل.`,
      },
      {
        q: "WooCommerce أم Shopify أم متجر مخصص: أيها أختار؟",
        a: "يناسب WooCommerce العلامات التي تريد ملكية كاملة ومرونة بتكلفة تشغيل منخفضة. ويناسب Shopify الفرق التي تريد بساطة الخدمة المُدارة وسرعة التوسع. أما الحلول المخصصة أو headless فتناسب المتاجر عالية الزيارات أو المتطلبات غير المعتادة. أطلقنا متاجر على الثلاثة، وسننصحك بناءً على منتجاتك وفريقك وخطط نموك، لا على ما هو أسهل لنا.",
      },
      {
        q: "كم يستغرق إطلاق متجر إلكتروني؟",
        a: "يُطلق المتجر محدد النطاق عادةً خلال 4 إلى 8 أسابيع: الاكتشاف والتصميم أولاً، ثم البناء واختبار الدفع والمحتوى. الكتالوجات المعقدة والمزايا المخصصة والمحتوى ثنائي اللغة تطيل هذه المدة. ستحصل على جدول زمني واضح بمراحل محددة قبل أن نبدأ.",
      },
      {
        q: "هل تدعمون العربية والتصميم من اليمين إلى اليسار؟",
        a: "نعم، نبني المتاجر جاهزة للغتين من اليوم الأول، بتخطيط صحيح من اليمين إلى اليسار وخطوط عربية مناسبة وصفحة دفع معرّبة، فتصبح إضافة العربية لاحقاً مهمة محتوى لا إعادة بناء.",
      },
      {
        q: "ماذا يحدث بعد الإطلاق؟",
        a: "لا نختفي. تقدم Odysense رعاية مستمرة: مراقبة الأداء والتحديثات وتحسين معدل التحويل وأعمال النمو (تحسين البحث والإعلانات والتحليلات). كثير من علاقاتنا مع العملاء تمتد سنوات بعد الإطلاق الأول.",
      },
    ],
    crumb: "التجارة الإلكترونية",
    h1: "تطوير المتاجر الإلكترونية",
    h1Accent: "في قطر.",
    lede: "تبني Odysense متاجر إلكترونية للعلامات التجارية في قطر والخليج على WooCommerce أو Shopify أو بحلول مخصصة. يكلف المتجر الجاهز للإطلاق عادةً من 8,000 إلى 10,000 ريال قطري، شاملاً عاماً من النطاق والاستضافة، مع بوابات الدفع المحلية والعربية والإنجليزية، ومنصة Store Portal مجاناً في السنة الأولى. نبنيه في الدوحة، في واحة قطر للعلوم والتكنولوجيا.",
    quote: "احصل على عرض سعر ثابت ←",
    stores: "شاهد متاجرنا",
    stats: [
      { b: "20", accent: "+", text: "عميلاً كل عام في قطر ودول الخليج" },
      { b: "3", accent: "", text: "منصات نتقنها: WooCommerce وShopify والحلول المخصصة" },
      { b: "التجارة الإلكترونية", accent: " أولاً", text: "أعمق تخصصاتنا، بمتاجر مثل Eleganza وRafea Line وSharqiyat Line" },
    ],
    incKicker: "ما الذي يشمله",
    incTitle: "كل ما يحتاجه المتجر",
    incAccent: "ليبيع.",
    incBody: "فريق واحد يتولى البناء كاملاً، فلا تضطر للتنسيق بين مصممين ومطورين ومستشاري دفع منفصلين.",
    includes: [
      { h: "تصميم المتجر", p: "واجهة متجر مصممة خصيصاً حول منتجاتك وعلامتك، لا قالب جاهز عليه شعارك." },
      { h: "التطوير", p: "متاجر سريعة وآمنة على WooCommerce أو Shopify أو حلول مخصصة، مصممة لمتسوقي الخليج الذين يشترون من الجوال أولاً." },
      { h: "الدفع المحلي", p: "MyFatoorah وTap وPayTabs وSADAD وQNB وغيرها في دول الخليج: ربط واختبار ومطابقة." },
      { h: "التجارة عبر واتساب", p: "إشعارات الطلبات وخدمة العملاء وإعادة التفاعل على واتساب عبر منصتنا WASL." },
      { h: "جاهز للغتين", p: "بنية عربية وإنجليزية مع تخطيط صحيح من اليمين إلى اليسار منذ اليوم الأول: إضافة لغة تصبح مهمة محتوى لا إعادة بناء." },
      { h: "تحسين البحث والتحليلات", p: "تحسين تقني لمحركات البحث وبيانات منظمة وتتبع التحويلات مدمجة، ليظهر المتجر في البحث وترى ما ينجح." },
    ],
    imgAlt: "طلبات متجر إلكتروني مغلفة وجاهزة للتوصيل",
    recentKicker: "متاجر حديثة",
    recentTitle: "بنتها Odysense،",
    recentAccent: "وتبيع اليوم.",
    read: "اقرأ دراسة الحالة ←",
    faqKicker: "أسئلة",
    faqTitle: "قبل أن تطلب",
    faqAccent: "عرض السعر.",
    ctaTitle: "مستعد لافتتاح",
    ctaAccent: "متجرك؟",
    ctaBody: "أخبرنا عن منتجاتك وسوقك. ستحصل على عرض سعر ثابت ومفصّل، عادةً خلال يومي عمل.",
  },
};

const PATH = "/ecommerce-development-company-qatar";

export const ecommerceMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, `${PATH}/`) });

export function EcommercePage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const L = (href: string) => lp(locale, href);
  const updated = pageUpdated[PATH];
  const faqs = c.faqs.map((f) => ({ q: f.q, a: typeof f.a === "function" ? f.a(gatewayListL("Qatar", locale), gatewayListL("Saudi Arabia", locale)) : f.a }));
  const pageSchema = webPageSchema({ path: L(PATH), name: c.metaTitle, description: c.metaDescription, modified: updated });
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <PageHero
        crumbs={[{ label: t.crumbs.home, href: L("/") }, { label: t.crumbs.services, href: L("/services") }, { label: c.crumb }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
        meta={<Byline updated={updated} locale={locale} />}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href={L("/contact")}>
            {c.quote}
          </Link>
          <Link className="btn btn-secondary" href={L("/work")}>
            {c.stores}
          </Link>
        </div>
      </PageHero>

      {/* Proof strip */}
      <section className="section">
        <div className="wrap">
          <Reveal className="stat-row">
            {c.stats.map((s) => (
              <div className="stat" key={s.text}>
                <b>
                  {s.b}
                  {s.accent && <span className="serif">{s.accent}</span>}
                </b>
                <span>{s.text}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker={c.incKicker}
            title={
              <>
                {c.incTitle} <span className="serif">{c.incAccent}</span>
              </>
            }
          >
            {c.incBody}
          </SectionHead>
          <Reveal className="grid-3">
            {c.includes.map((x, i) => (
              <div className="card" key={x.h}>
                <span className="num">{["i.", "ii.", "iii.", "iv.", "v.", "vi."][i]}</span>
                <h3>{x.h}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Imagery */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <div className="img-inline">
              <Image src="/images/ecom-packages.webp" alt={c.imgAlt} width={1200} height={673} sizes="(max-width: 920px) 100vw, 1200px" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case studies */}
      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker={c.recentKicker}
            title={
              <>
                {c.recentTitle} <span className="serif">{c.recentAccent}</span>
              </>
            }
          />
          <Reveal className="cs-grid">
            {getStoreCaseStudies(locale).map((cs) => (
              <Link className="cs-card" href={L(`/work/${cs.slug}`)} key={cs.slug}>
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

      <RelatedPosts href={PATH} limit={6} locale={locale} />

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={c.faqKicker}
            title={
              <>
                {c.faqTitle} <span className="serif">{c.faqAccent}</span>
              </>
            }
          />
          <Reveal>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
