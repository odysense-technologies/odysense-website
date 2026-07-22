import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Services — Strategy, Design & Development, Growth",
  description:
    "Everything Odysense does: web design, e-commerce, software and app development, branding, SEO, digital marketing and WhatsApp Business API — in Qatar & the GCC.",
  alternates: { canonical: "/services/" },
};

const featured = [
  {
    href: "/ecommerce-development-company-qatar",
    title: "E-commerce",
    desc: "Online stores on WooCommerce, Shopify and custom stacks — our deepest specialty.",
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
