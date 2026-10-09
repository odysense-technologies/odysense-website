import type { Metadata } from "next";
import { site } from "./site";

type SeoImage = { url: string; width: number; height: number; alt: string };

const DEFAULT_IMAGE: SeoImage = { url: "/og.png", width: 1200, height: 630, alt: "Odysense — web design, e-commerce and software in Qatar" };

/**
 * Page metadata with matching canonical, Open Graph and Twitter tags.
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
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: SeoImage;
  type?: "website" | "article";
  published?: string;
  modified?: string;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(type === "article" ? { type, publishedTime: published, modifiedTime: modified } : { type }),
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
