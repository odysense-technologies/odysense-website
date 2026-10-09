import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
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
  return seoMeta({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    published: post.date,
    modified: post.updated ?? post.date,
    ...(post.image && { image: { url: post.image.src, width: post.image.w, height: post.image.h, alt: post.image.alt } }),
  });
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
    dateModified: post.updated ?? post.date,
    image: `${site.url}${post.image?.src ?? "/og.png"}`,
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
        breadcrumbSchema={false}
        title={<>{post.title}</>}
        lede={`${new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · ${post.minutes} min read`}
      />

      <section className="section">
        <div className="wrap">
          <article className="post-body">
            {post.image && (
              <div className="img-inline post-hero-img">
                <Image src={post.image.src} alt={post.image.alt} width={post.image.w} height={post.image.h} sizes="(max-width: 920px) 100vw, 760px" priority />
              </div>
            )}
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
            {post.relatedPosts && (
              <Reveal>
                <div className="post-sources">
                  <span className="mono">Keep reading</span>
                  <ul>
                    {post.relatedPosts.map((slug) => getPost(slug)).filter((p) => p !== undefined).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {post.sources && (
              <Reveal>
                <div className="post-sources">
                  <span className="mono">Sources</span>
                  <ul>
                    {post.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
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
