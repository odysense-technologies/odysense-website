import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Insights on Web, E-commerce & Growth in the GCC",
  description:
    "Practical guides on websites, e-commerce, SEO and WhatsApp commerce for businesses in Qatar & the GCC — from the Odysense team.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title={
          <>
            Insights from <span className="serif">the workshop.</span>
          </>
        }
        lede="Practical, no-fluff guides on websites, e-commerce, SEO and WhatsApp commerce in the GCC — written from twelve years of building, not theory."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-2">
            {posts.map((p) => (
              <Link className="card post-card" href={`/blog/${p.slug}`} key={p.slug}>
                <div>
                  <span className="cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <span className="meta">
                  {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.minutes} min read
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker="Ask us"
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
