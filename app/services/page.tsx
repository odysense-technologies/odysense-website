import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Link from "next/link";
import { Reveal, CtaBox, PageHero, SectionHead } from "@/components/ui";
import { gccPages } from "@/lib/gcc-pages";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = seoMeta({
  title: "Services — Strategy, Design & Development, Growth",
  description: "Everything Odysense does: web design, e-commerce, event gamification, software and app development, branding, SEO, digital marketing and WhatsApp Business API — in Qatar & the GCC.",
  path: "/services/",
});

const featured = [
  {
    href: "/ecommerce-development-company-qatar",
    title: "E-commerce",
    desc: "Online stores on WooCommerce, Shopify and custom stacks — our deepest specialty.",
  },
  {
    href: "/gamification-brand-activation-qatar",
    title: "Gamification & Brand Activations",
    desc: "Event games, live quizzes, polls and Q&A that engage the room and capture consented leads.",
  },
  ...servicePages.map((s) => ({
    href: `/${s.slug}`,
    title: s.crumb,
    desc: s.lede.split("—")[0].trim(),
  })),
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Strategy, design &amp; development, <span className="serif">growth.</span>
          </>
        }
        lede="One team from first brief to compounding results — no handoffs, no gaps. Pick where you need us, or bring the whole problem."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-3">
            {featured.map((s) => (
              <Link className="card" href={s.href} key={s.href}>
                <span className="num serif">→</span>
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
            kicker="Across the GCC"
            title={
              <>
                E-commerce and web design <span className="serif">beyond Qatar.</span>
              </>
            }
          >
            Guides by market and platform for brands selling in Saudi Arabia, the UAE, Kuwait, Bahrain and Oman.
          </SectionHead>
          <Reveal className="grid-3">
            {gccPages.map((g) => (
              <Link className="card" href={`/${g.slug}`} key={g.slug}>
                <span className="num serif">→</span>
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
                  Not sure which <span className="serif">you need?</span>
                </>
              }
              body="Describe the problem in your own words — we'll tell you what it takes, and what it doesn't."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
