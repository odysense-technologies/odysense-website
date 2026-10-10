import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { PostCard } from "@/components/post-card";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { postsNewestFirst } from "@/lib/blog";

export const metadata: Metadata = seoMeta({
  title: "Blog — Web, E-commerce & SEO Guides for Qatar",
  description: "Practical guides on websites, e-commerce, SEO and WhatsApp commerce for businesses in Qatar & the GCC — from the Odysense team.",
  path: "/blog/",
});

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
        lede="Practical, no-fluff guides on websites, e-commerce, SEO and WhatsApp commerce in the GCC — written by the team that builds them, not theory."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-2">
            {postsNewestFirst().map((p) => (
              <PostCard
                post={p}
                key={p.slug}
                meta={`${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · ${p.minutes} min read`}
              />
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
