# Indexing and AI-search readiness

How odysense.com is exposed to search engines and AI assistants, and the settings that live outside
this repo. Added in Phase 1 of the SEO + AI-search plan (2026-10-10).

## What the site serves

| URL | Source | Purpose |
|---|---|---|
| `/robots.txt` | `app/robots.ts` | Allows every crawler; names the search, answer and training bots explicitly; keeps `/api/` out; points to the sitemap |
| `/sitemap.xml` | `app/sitemap.ts` | Every indexable page, built from the `lib/` data files |
| `/llms.txt` | `app/llms.txt/route.ts` | Plain-Markdown summary for AI assistants ([llmstxt.org](https://llmstxt.org)): key facts, prices, gateways, services, products, case studies and every article. Built from `lib/`, so it updates itself |
| `/fef5c264e59917ec1437b4d43bce08f0.txt` | `public/` | IndexNow key file. **Don't delete or rename it** unless you rotate the key (see below) |
| `/googled6e8611648213367.html` | `public/` | Search Console verification file. **Never delete or edit it** |

### Crawler policy (`app/robots.ts`)

- **Search and answer bots** (they cite and link): Googlebot, Bingbot, Applebot, OAI-SearchBot,
  ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User.
- **Training bots**: GPTBot, ClaudeBot, Google-Extended. Allowed on purpose (owner decision,
  2026-10-10) so the models learn about Odysense. To block them later, change that group to
  `disallow: "/"`. It has no effect on Google rankings.
- `/tools/` is **not** disallowed: those pages carry `noindex`, and a crawler has to fetch the page to
  see it.

### Server-rendered content (audit 2026-10-10)

Everything a crawler needs is in the server HTML, with no JavaScript required: every FAQ question
and answer, all prices (including the Store Portal plans and 11 add-ons), case-study figures and
quotes, and the sitewide links (the Services and Products mega menus are rendered hidden and shown
on hover/click).

Client-only by design (not content):
- the five gamification demos in `components/arcade/`
- the Lottie animations on the WASL and QFlow pages
- the mobile burger menu (the same links are in the desktop mega menus and the footer)

## IndexNow

[IndexNow](https://www.indexnow.org) tells Bing, Yandex, Seznam, Naver and others that a page changed,
so they recrawl it within minutes instead of days. Google does not use IndexNow; it relies on the
sitemap and Search Console.

**Automatic:** `.github/workflows/indexnow.yml` runs after every successful Vercel **Production**
deployment. It waits 30 seconds for the new build to go live, fetches every URL in the sitemap,
fingerprints what a reader sees (title, description, structured data and visible text), and submits
only new, changed or removed pages. The fingerprints are kept in the GitHub Actions cache between
runs. The first run, or a run after the cache expires (7 days without a deploy), submits everything.
That's expected.

**Manual:** in GitHub → Actions → IndexNow → *Run workflow*, tick "Submit every URL in the sitemap" to
resubmit the whole site. From any machine with Python 3:

```
python3 scripts/indexnow.py --all --dry-run
python3 scripts/indexnow.py https://odysense.com/blog/some-post/
```

**Rotating the key:** add a new `public/<newkey>.txt` containing just the key, change `KEY` in
`scripts/indexnow.py`, deploy, then delete the old file.

Responses: `200`/`202` accepted · `403` key file not found · `422` URL not on odysense.com ·
`429` too many submissions.

## Owner checklist (settings outside the repo)

- [ ] **Vercel → Firewall → Bot Management:** set the **AI Bots** managed ruleset to *Allow* (off). If
      *Bot Protection* is on, leave it: it skips verified bots such as Googlebot and Bingbot. Don't
      add custom WAF rules that match the user agents above, and keep *Attack Challenge Mode* off
      except during an attack.
- [ ] **Google Search Console → Settings:** check the generative AI features setting (added June 2026)
      and leave odysense.com **included** in AI Overviews and AI Mode. Opting out removes the site from
      those answers. The matching report is under Performance → *Generative AI*.
- [ ] **Bing Webmaster Tools** (bing.com/webmasters): *Import from Google Search Console*, which copies
      the verified site and sitemap. Then confirm `https://odysense.com/sitemap.xml` under Sitemaps.
      Copilot uses Bing's index, and ChatGPT search draws on it in part.
- [ ] **Bing Webmaster Tools → IndexNow:** after the first deploy, check that submissions appear.
- [ ] **Brave Search:** search `site:odysense.com` on search.brave.com. Brave runs its own index, which
      some AI assistants use. If pages are missing, they usually appear once Bing and Google have them.
- [ ] **Bing Places for Business** (bingplaces.com): import the Google Business Profile.
- [ ] **Google Business Profile:** complete it (category, services, photos, weekly posts, reviews via
      `/tools/review-request`).
