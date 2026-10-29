import type { Metadata } from "next";
import { site } from "./site";
import { altPath, isArabicPath } from "./i18n";

type SeoImage = { url: string; width: number; height: number; alt: string };

const DEFAULT_IMAGE: SeoImage = { url: "/og.png", width: 1200, height: 630, alt: "Odysense — web design, e-commerce and software in Qatar" };

/**
 * Page metadata with matching canonical, hreflang, Open Graph and Twitter tags.
 * The language follows the path: /ar/… is Arabic. Every page has its counterpart in the other language
 * (same slug with or without /ar), so hreflang en/ar/x-default is emitted unless `alternate` is false
 * (pages that exist in one language only, such as the noindex event kiosks and internal tools).
 * Next.js replaces (not merges) a parent's openGraph, so every page must set its own —
 * otherwise it inherits the homepage's og:title, og:description and og:url.
 */
export function seoMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_IMAGE,
  type = "website",
  published,
  modified,
  alternate = true,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: SeoImage;
  type?: "website" | "article";
  published?: string;
  modified?: string;
  alternate?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const ar = isArabicPath(path);
  const en = ar ? altPath(path) : path;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      ...(alternate && { languages: { en, ar: ar ? path : altPath(path), "x-default": en } }),
    },
    openGraph: {
      ...(type === "article" ? { type, publishedTime: published, modifiedTime: modified } : { type }),
      siteName: site.name,
      locale: ar ? "ar_QA" : "en_US",
      ...(alternate && { alternateLocale: ar ? "en_US" : "ar_QA" }),
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
