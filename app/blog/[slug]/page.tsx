import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { posts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Odysense", url: site.url },
    publisher: { "@type": "Organization", name: "Odysense", url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}/` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}
        title={<>{post.title}</>}
        lede={`${new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · ${post.minutes} min read`}
      />

      <section className="section">
        <div className="wrap">
          <article className="post-body">
            {post.sections.map((s, i) => (
              <Reveal key={i}>
                {s.h && (
                  <h2>
                    {s.h}
                    <span className="serif" style={{ color: "var(--purple)" }}>
                      .
                    </span>
                  </h2>
                )}
                {s.ps?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
            <Reveal>
              <div className="post-related">
                <span>Related service</span>
                <Link className="btn btn-secondary" href={post.relatedService.href}>
                  {post.relatedService.label} →
                </Link>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  Put this into practice <span className="serif">with us.</span>
                </>
              }
              body="Tell us what you're building. We reply within one business day, from Doha."
            />
          </Reveal>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 40 }}>
        <Link href="/blog" style={{ fontSize: 14, fontWeight: 600 }}>
          ← All articles
        </Link>
      </div>
    </main>
  );
}
