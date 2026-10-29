import { PostCard } from "@/components/post-card";
import { Reveal, SectionHead } from "@/components/ui";
import { postsNewestFirstL } from "@/lib/localized";
import { lp, ui, type Locale } from "@/lib/i18n";

/** "Related reading": the newest articles whose related service is this page — internal links from money pages to their guides. */
export function RelatedPosts({ href, limit = 4, locale = "en" }: { href: string; limit?: number; locale?: Locale }) {
  const t = ui(locale).related;
  const norm = (h: string) => h.replace(/\/$/, "");
  const target = norm(lp(locale, href));
  const list = postsNewestFirstL(locale).filter((p) => norm(p.relatedService.href) === target).slice(0, limit);
  if (!list.length) return null;
  return (
    <section className="section section--flush-top">
      <div className="wrap">
        <SectionHead
          kicker={t.kicker}
          title={
            <>
              {t.title} <span className="serif">{t.accent}</span>
            </>
          }
        />
        <Reveal className="grid-2">
          {list.map((p) => (
            <PostCard post={p} key={p.slug} meta={t.read(p.minutes)} locale={locale} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
