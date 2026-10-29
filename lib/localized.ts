/**
 * Localised page data (server-side only). English records come from lib/*.ts; the Arabic versions merge
 * the text in lib/ar/*.ts over the same records, so dates, images, prices, links and sources stay
 * single-sourced. Every English record must have Arabic text, because every English page points hreflang
 * at its /ar/ twin: a missing entry stops the build with a message naming the file and slug.
 */
import { posts, type Post } from "@/lib/blog";
import { servicePages, type ServiceDef } from "@/lib/service-pages";
import { gccPages, type GccPage } from "@/lib/gcc-pages";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { arPosts } from "@/lib/ar/blog";
import { arServicePages } from "@/lib/ar/service-pages";
import { arGccPages } from "@/lib/ar/gcc-pages";
import { arCaseStudies } from "@/lib/ar/case-studies";
import { lp, type Locale } from "@/lib/i18n";

function need<T>(rec: Record<string, T>, slug: string, file: string): T {
  const v = rec[slug];
  if (!v) throw new Error(`Missing Arabic text for "${slug}" in ${file}. Add it so /ar/ matches the English site.`);
  return v;
}

/* ------------------------------------------------------------------ blog */

export type PostText = Pick<Post, "title" | "description" | "category" | "sections"> & {
  metaTitle?: string;
  imageAlt?: string;
  relatedServiceLabel: string;
  sourceLabels?: string[];
};

function arPost(p: Post): Post {
  const a = need(arPosts, p.slug, "lib/ar/blog.ts");
  return {
    ...p,
    title: a.title,
    description: a.description,
    metaTitle: a.metaTitle,
    category: a.category,
    sections: a.sections,
    image: p.image && { ...p.image, alt: a.imageAlt ?? p.image.alt },
    relatedService: { label: a.relatedServiceLabel, href: lp("ar", p.relatedService.href) },
    sources: p.sources?.map((s, i) => ({ ...s, label: a.sourceLabels?.[i] ?? s.label })),
  };
}

export const getPosts = (l: Locale): Post[] => (l === "ar" ? posts.map(arPost) : posts);

export const getPostL = (slug: string, l: Locale) => getPosts(l).find((p) => p.slug === slug);

/** Same order as postsNewestFirst() in lib/blog.ts: newest date first, later entries first on the same date */
export const postsNewestFirstL = (l: Locale) =>
  getPosts(l)
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p.date.localeCompare(a.p.date) || b.i - a.i)
    .map(({ p }) => p);

/* --------------------------------------------------------- service pages */

export type ServiceText = Omit<ServiceDef, "slug" | "updated" | "image" | "related"> & {
  imageAlt?: string;
  relatedLabels?: string[];
};

function arService(d: ServiceDef): ServiceDef {
  const { imageAlt, relatedLabels, ...text } = need(arServicePages, d.slug, "lib/ar/service-pages.ts");
  return {
    ...d,
    ...text,
    image: d.image && { ...d.image, alt: imageAlt ?? d.image.alt },
    related: d.related?.map((r, i) => ({ label: relatedLabels?.[i] ?? r.label, href: r.href })),
  };
}

export const getServicePages = (l: Locale) => (l === "ar" ? servicePages.map(arService) : servicePages);

export const getServicePageL = (slug: string, l: Locale) => getServicePages(l).find((s) => s.slug === slug);

/* ------------------------------------------------------------ GCC pages */

export type GccText = Omit<
  GccPage,
  "slug" | "updated" | "areaServed" | "hub" | "gateways" | "sources" | "related" | "relatedService" | "parent" | "links"
> & {
  parentLabel?: string;
  linkLabels?: string[];
  sourceLabels?: string[];
};

function arGcc(g: GccPage): GccPage {
  const { parentLabel, linkLabels, sourceLabels, ...text } = need(arGccPages, g.slug, "lib/ar/gcc-pages.ts");
  return {
    ...g,
    ...text,
    parent: g.parent && { label: parentLabel ?? g.parent.label, href: g.parent.href },
    links: g.links?.map((x, i) => ({ label: linkLabels?.[i] ?? x.label, href: x.href })),
    sources: g.sources.map((s, i) => ({ ...s, label: sourceLabels?.[i] ?? s.label })),
  };
}

export const getGccPages = (l: Locale) => (l === "ar" ? gccPages.map(arGcc) : gccPages);

export const getGccPageL = (slug: string, l: Locale) => getGccPages(l).find((g) => g.slug === slug);

/* --------------------------------------------------------- case studies */

export type CaseText = Pick<CaseStudy, "name" | "industry" | "services" | "teaser" | "intro" | "challenge" | "approach" | "built"> & {
  siteLabel?: string; // only when the English label is words ("QSeat on the App Store") rather than a domain
  results: string[]; // labels, in the same order as the English results
  values?: (string | null)[]; // only where a value is a word ("Live") rather than a figure; null keeps the English
  quote?: { text: string; author: string; role: string };
};

function arCase(c: CaseStudy): CaseStudy {
  const a = need(arCaseStudies, c.slug, "lib/ar/case-studies.ts");
  return {
    ...c,
    ...a,
    results: c.results.map((r, i) => ({ ...r, value: a.values?.[i] ?? r.value, label: a.results[i] ?? r.label })),
    quote: c.quote && a.quote ? { ...c.quote, ...a.quote } : c.quote,
  };
}

export const getCaseStudies = (l: Locale) => (l === "ar" ? caseStudies.map(arCase) : caseStudies);

export const getCaseStudyL = (slug: string, l: Locale) => getCaseStudies(l).find((c) => c.slug === slug);

/** Stores (case studies whose English services include "E-commerce"), in the page's language */
export const getStoreCaseStudies = (l: Locale) => {
  const slugs = new Set(caseStudies.filter((c) => c.services.includes("E-commerce")).map((c) => c.slug));
  return getCaseStudies(l).filter((c) => slugs.has(c.slug));
};
