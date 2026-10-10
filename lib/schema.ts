import { site } from "./site";

/** Stable JSON-LD ids, so every page points at the one Organization and WebSite defined in app/layout.tsx. */
export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const orgRef = { "@id": ORG_ID };

/** "9 October 2026" */
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** WebPage node with a real last-modified date (from the page's data, never the build time). */
export function webPageSchema({ path, name, description, modified }: { path: string; name: string; description: string; modified: string }) {
  const url = `${site.url}${path.replace(/\/?$/, "/")}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    dateModified: modified,
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef,
    author: orgRef,
    publisher: orgRef,
  };
}
