import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

export const dynamic = "force-static";

const routes = ["", "work/", "ecommerce-development-company-qatar/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((r) => ({
    url: `${site.url}/${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const work = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...work];
}
