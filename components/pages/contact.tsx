import { seoMeta } from "@/lib/seo";
import { Reveal, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/lead-forms";
import { getSite } from "@/lib/content";
import { lp, ui, type Locale } from "@/lib/i18n";

const COPY = {
  en: {
    metaTitle: "Contact — Start a Project",
    metaDescription: "Start a project with Odysense. Email, WhatsApp or visit us at Qatar Science & Technology Park, Doha. We reply within one business day.",
    crumb: "Contact",
    h1: "Let's start",
    h1Accent: "the conversation.",
    lede: "Tell us what you're building — a website, a store, software or a brand. You'll hear back within one business day, from Doha.",
    waTitle: "WhatsApp",
    wa: "The fastest way — message us and we'll pick it up during Doha business hours, often sooner.",
    waLink: "Chat now →",
    email: "Email",
    emailText: "— briefs, RFPs and documents welcome. Fixed quotes usually within two business days.",
    emailLink: "Write to us →",
    visit: "Visit",
  },
  ar: {
    metaTitle: "تواصل معنا: ابدأ مشروعك",
    metaDescription: "ابدأ مشروعك مع Odysense. راسلنا بالبريد أو على واتساب أو زرنا في واحة قطر للعلوم والتكنولوجيا بالدوحة. نرد خلال يوم عمل واحد.",
    crumb: "تواصل معنا",
    h1: "لنبدأ",
    h1Accent: "الحديث.",
    lede: "أخبرنا بما تبنيه: موقع أو متجر أو برمجيات أو هوية تجارية. ستصلك إجابتنا خلال يوم عمل واحد، من الدوحة.",
    waTitle: "واتساب",
    wa: "الطريقة الأسرع: راسلنا وسنرد خلال ساعات العمل في الدوحة، وغالباً أسرع.",
    waLink: "تحدث معنا الآن ←",
    email: "البريد الإلكتروني",
    emailText: "نرحب بالملخصات وطلبات العروض والمستندات. عروض الأسعار الثابتة تصل عادة خلال يومي عمل.",
    emailLink: "راسلنا ←",
    visit: "زيارتنا",
  },
};

export const contactMeta = (locale: Locale) =>
  seoMeta({ title: COPY[locale].metaTitle, description: COPY[locale].metaDescription, path: lp(locale, "/contact/") });

export function ContactPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = ui(locale);
  const site = getSite(locale);
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
          <Reveal>
            <div className="contact-layout">
              <ContactForm locale={locale} />
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <a className="card" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <span className="num">i.</span>
                  <h3>{c.waTitle}</h3>
                  <p>{c.wa}</p>
                  <ul>
                    <li>{c.waLink}</li>
                  </ul>
                </a>
                <a className="card" href={`mailto:${site.email}`}>
                  <span className="num">ii.</span>
                  <h3>{c.email}</h3>
                  <p>
                    {site.email} {c.emailText}
                  </p>
                  <ul>
                    <li>{c.emailLink}</li>
                  </ul>
                </a>
                <div className="card">
                  <span className="num">iii.</span>
                  <h3>{c.visit}</h3>
                  <p>{site.address}</p>
                  <ul>
                    <li dir="ltr">{site.phone}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
