import type { Metadata } from "next";
import { Reveal, CtaBox, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog — Insights on Web, E-commerce & Growth in the GCC",
  description:
    "Practical guides on websites, e-commerce, SEO and WhatsApp commerce for businesses in Qatar & the GCC — from the Odysense team.",
  alternates: { canonical: "/blog/" },
  robots: { index: false, follow: true }, // flip to index:true when first articles publish
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title={
          <>
            Insights, <span className="serif">shipping soon.</span>
          </>
        }
        lede="Practical, no-fluff guides on websites, e-commerce, SEO and WhatsApp commerce in the GCC — written from twelve years of building, not theory. First articles are in production."
      />
      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker="Meanwhile"
              title={
                <>
                  Have a question <span className="serif">we should answer?</span>
                </>
              }
              body="Tell us what you're trying to figure out — the best articles start as real questions."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
