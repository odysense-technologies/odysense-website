import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Search engines and AI answer engines (they cite and link to the pages they read).
const searchBots = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

// Model-training crawlers. Allowed on purpose (owner decision, 2026-10-10) so the models learn
// about Odysense; blocking them would not change Google rankings.
const trainingBots = ["GPTBot", "ClaudeBot", "Google-Extended"];

// A bot that matches a named group ignores the "*" group, so every group repeats the same rules.
// /tools/ is not disallowed here: those pages carry a noindex tag, which crawlers must be able to read.
const rules = { allow: "/", disallow: "/api/" };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: searchBots, ...rules },
      { userAgent: trainingBots, ...rules },
      { userAgent: "*", ...rules },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
