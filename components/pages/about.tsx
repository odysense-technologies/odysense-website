import Image from "next/image";
import { seoMeta } from "@/lib/seo";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import { lp, ui, type Locale } from "@/lib/i18n";

const COPY = {
  en: {
    metaTitle: "About Odysense — Digital Agency at QSTP, Doha",
    metaDescription:
      "Odysense is a digital agency and software company at Qatar Science & Technology Park — a studio that thinks like an owner, bringing strategy, design, development and growth to GCC brands.",
    crumb: "About",
    h1: "A studio that thinks",
    h1Accent: "like an owner.",
    lede: "Odysense works from the Innovation Centre at Qatar Science & Technology Park, and it is two things at once: a digital agency trusted by 20+ organizations a year — from F&B to banking to the European Union's delegation in Qatar — and a software company whose own products run businesses across the region every day.",
    stats: [
      { b: "7", accent: " products", text: "built and run in-house — headquartered at Qatar Science & Technology Park" },
      { b: "20", accent: "+", text: "diverse clients per year across F&B, technology, banking and more" },
      { b: "Both", accent: " sides", text: "agency craft and product ownership — we build for clients like we build for ourselves" },
    ],
    imgAlt: "The Odysense workspace",
    howKicker: "How we work",
    howTitle: "What we",
    howAccent: "believe.",
    values: [
      { h: "Forward-thinking", p: "We craft solutions with tomorrow in mind — seamless, scalable experiences that stay ahead of digital trends." },
      { h: "User-centric", p: "We design for people. Every layout, interaction and line of code is driven by user needs and behaviors." },
      { h: "Bold & adaptive", p: "We don't shy away from new technologies or unconventional ideas. Staying flexible lets us deliver cutting-edge solutions." },
      { h: "Reliable execution", p: "From planning to launch, we're transparent, efficient and committed to helping you thrive." },
    ],
    ctaTitle: "Your next launch starts",
    ctaAccent: "with one brief.",
    ctaBody: "Tell us what you're building. We reply within one business day, from Doha.",
  },
  ar: {
    metaTitle: "من نحن: وكالة رقمية وشركة برمجيات في الدوحة",
    metaDescription:
      "Odysense وكالة رقمية وشركة برمجيات في واحة قطر للعلوم والتكنولوجيا: استوديو يفكر بعقلية المالك، يقدّم الاستراتيجية والتصميم والتطوير والنمو للعلامات التجارية في الخليج.",
    crumb: "من نحن",
    h1: "استوديو يفكر",
    h1Accent: "بعقلية المالك.",
    lede: "تعمل Odysense من مركز الابتكار في واحة قطر للعلوم والتكنولوجيا، وهي أمران في الوقت نفسه: وكالة رقمية يثق بها أكثر من 20 جهة سنوياً، من المطاعم والمقاهي إلى البنوك وبعثة الاتحاد الأوروبي في قطر، وشركة برمجيات تشغّل منتجاتها الخاصة أعمالاً في أنحاء المنطقة كل يوم.",
    stats: [
      { b: "7", accent: " منتجات", text: "نبنيها ونشغّلها داخلياً، ومقرنا في واحة قطر للعلوم والتكنولوجيا" },
      { b: "20", accent: "+", text: "عميلاً متنوعاً كل عام في قطاعات الأغذية والمشروبات والتقنية والبنوك وغيرها" },
      { b: "الجانبان", accent: " معاً", text: "حِرفية الوكالة وملكية المنتج: نبني لعملائنا كما نبني لأنفسنا" },
    ],
    imgAlt: "مساحة عمل Odysense",
    howKicker: "طريقة عملنا",
    howTitle: "ما",
    howAccent: "نؤمن به.",
    values: [
      { h: "تفكير مستقبلي", p: "نصمم الحلول ونحن نفكر في الغد: تجارب سلسة وقابلة للتوسع تسبق التوجهات الرقمية." },
      { h: "المستخدم أولاً", p: "نصمم للناس. كل تخطيط وكل تفاعل وكل سطر برمجي ينطلق من احتياجات المستخدمين وسلوكهم." },
      { h: "جرأة ومرونة", p: "لا نتردد أمام التقنيات الجديدة أو الأفكار غير التقليدية. مرونتنا تتيح لنا تقديم حلول متقدمة." },
      { h: "تنفيذ موثوق", p: "من التخطيط إلى الإطلاق، نعمل بشفافية وكفاءة والتزام بنجاحك." },
    ],
    ctaTitle: "إطلاقك القادم يبدأ",
    ctaAccent: "بفكرة واحدة.",
    ctaBody: "أخبرنا بما تبنيه. نرد عليك خلال يوم عمل واحد، من الدوحة.",
  },
};

export const aboutMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/about/") });

export function AboutPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  return (
    <main>
      <PageHero
        crumbs={[{ label: t.crumbs.home, href: lp(locale, "/") }, { label: c.crumb }]}
        title={
          <>
            {c.h1} <span className="serif">{c.h1Accent}</span>
          </>
        }
        lede={c.lede}
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="stat-row">
            {c.stats.map((s) => (
              <div className="stat" key={s.text}>
                <b>
                  {s.b}
                  <span className="serif">{s.accent}</span>
                </b>
                <span>{s.text}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <div className="img-inline">
              <Image src="/images/about-workspace.webp" alt={c.imgAlt} width={1200} height={670} sizes="(max-width: 920px) 100vw, 1200px" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top quote-sec">
        <div className="wrap">
          <SectionHead
            kicker={c.howKicker}
            title={
              <>
                {c.howTitle} <span className="serif">{c.howAccent}</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {c.values.map((v, i) => (
              <div className="card" key={v.h}>
                <span className="num">{["i.", "ii.", "iii.", "iv."][i]}</span>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

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
    </main>
  );
}
