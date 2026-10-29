import type { MetadataRoute } from "next";
import { site, products, pageUpdated } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { servicePages } from "@/lib/service-pages";
import { posts } from "@/lib/blog";
import { gccPages } from "@/lib/gcc-pages";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Every page in English and Arabic (/ar/ + the same path), each entry listing both versions as
 * hreflang alternates. lastModified only where we know the real date (blog posts, service and GCC
 * pages, pageUpdated): a build timestamp on every page teaches Google to ignore lastmod entirely.
 */
function both(path: string, rest: Omit<Entry, "url" | "alternates">): Entry[] {
  const en = `${site.url}${path}`;
  const ar = `${site.url}/ar${path}`;
  const alternates = { languages: { en, ar, "x-default": en } };
  return [
    { url: en, ...rest, alternates },
    { url: ar, ...rest, priority: rest.priority !== undefined ? Math.round(rest.priority * 0.9 * 100) / 100 : undefined, alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "services/", "products/", "work/", "about/", "contact/", "blog/", "ecommerce-development-company-qatar/", "gamification-brand-activation-qatar/"].flatMap((r) => {
    const updated = pageUpdated[`/${r.replace(/\/$/, "")}`];
    return both(`/${r}`, {
      ...(updated && { lastModified: new Date(updated) }),
      changeFrequency: "weekly",
      priority: r === "" ? 1 : 0.8,
    });
  });
  const svc = servicePages.flatMap((s) => both(`/${s.slug}/`, { lastModified: new Date(s.updated), changeFrequency: "weekly", priority: 0.8 }));
  const gcc = gccPages.flatMap((g) =>
    both(`/${g.slug}/`, { lastModified: new Date(g.updated), changeFrequency: "weekly", priority: g.slug === "ecommerce" ? 0.9 : 0.8 }),
  );
  const prods = products.flatMap((p) => both(`${p.slug}/`, { changeFrequency: "monthly", priority: 0.7 }));
  const work = caseStudies.flatMap((c) => both(`/work/${c.slug}/`, { changeFrequency: "monthly", priority: 0.7 }));
  const blog = posts.flatMap((p) => both(`/blog/${p.slug}/`, { lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly", priority: 0.6 }));
  return [...core, ...svc, ...gcc, ...prods, ...work, ...blog];
}
