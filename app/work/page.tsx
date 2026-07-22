import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Our Work — Web Design & E-commerce Portfolio",
  description:
    "Selected projects by Odysense: e-commerce stores, websites and digital products built for brands across Qatar and the GCC.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        title={
          <>
            Work that <span className="serif">works.</span>
          </>
        }
        lede="Selected projects — each one a real business, live today. More case studies are added regularly."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="cs-grid">
            {caseStudies.map((c) => (
              <Link className="cs-card" href={`/work/${c.slug}`} key={c.slug}>
                <div>
                  <span className="mono">
                    {c.industry} · {c.year}
                  </span>
                  <h3>{c.name}</h3>
                  <p>{c.teaser}</p>
                </div>
                <span className="prod-link">Read the case study →</span>
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
                  Your project could be <span className="serif">next on this page.</span>
                </>
              }
              body="Tell us what you're building. We reply within one business day, from Doha."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
