import { PostCard } from "@/components/post-card";
import { Reveal, SectionHead } from "@/components/ui";
import { postsNewestFirst } from "@/lib/blog";

/** "Related reading": the newest articles whose related service is this page — internal links from money pages to their guides. */
export function RelatedPosts({ href, limit = 4 }: { href: string; limit?: number }) {
  const norm = (h: string) => h.replace(/\/$/, "");
  const list = postsNewestFirst().filter((p) => norm(p.relatedService.href) === norm(href)).slice(0, limit);
  if (!list.length) return null;
  return (
    <section className="section section--flush-top">
      <div className="wrap">
        <SectionHead
          kicker="Guides"
          title={
            <>
              Related <span className="serif">reading.</span>
            </>
          }
        />
        <Reveal className="grid-2">
          {list.map((p) => (
            <PostCard post={p} key={p.slug} meta={`${p.minutes} min read →`} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
