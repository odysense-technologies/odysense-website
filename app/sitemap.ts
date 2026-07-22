import type { MetadataRoute } from "next";
import { site, products } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { servicePages } from "@/lib/service-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "services/", "products/", "work/", "about/", "contact/", "ecommerce-development-company-qatar/"].map((r) => ({
    url: `${site.url}/${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const svc = servicePages.map((s) => ({
    url: `${site.url}/${s.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const prods = products.map((p) => ({
    url: `${site.url}${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const work = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...core, ...svc, ...prods, ...work];
}
