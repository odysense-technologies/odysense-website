import type { MetadataRoute } from "next";
import { site, products } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { servicePages } from "@/lib/service-pages";
import { posts } from "@/lib/blog";

export const dynamic = "force-static";

// lastModified only where we know the real date (blog posts). A build timestamp on every page
// teaches Google to ignore lastmod entirely.
export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "services/", "products/", "work/", "about/", "contact/", "blog/", "ecommerce-development-company-qatar/", "gamification-brand-activation-qatar/"].map((r) => ({
    url: `${site.url}/${r}`,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const svc = servicePages.map((s) => ({
    url: `${site.url}/${s.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const prods = products.map((p) => ({
    url: `${site.url}${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const work = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const blog = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...core, ...svc, ...prods, ...work, ...blog];
}
