#!/usr/bin/env python3
"""
Audit pages that reference Odysense (product About pages, client sites with the footer credit).

For each URL: HTTP status and final URL, <title>, meta description, canonical, robots, hreflang,
JSON-LD types and whether they point at https://odysense.com/#organization, every link to odysense.com
with its anchor text and rel, a word count of the server-rendered text, and phrases the site rules forbid
(founder, founding year, years in market).

Used by .github/workflows/live-check.yml (Claude's sandbox can't reach these sites).
Usage: python3 scripts/page_audit.py URL [URL ...]
"""
import html
import json
import re
import sys
import urllib.request

UA = "Mozilla/5.0 (compatible; OdysenseAudit/1.0; +https://odysense.com/)"
FORBIDDEN = re.compile(r"\b(founder|co-founder|founded in|since (19|20)\d\d|\d+\+?\s+years? (of experience|in business|in the market))\b", re.I)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.geturl(), r.read().decode("utf-8", "replace")


def attr(tag, name):
    m = re.search(rf'\b{name}\s*=\s*"([^"]*)"', tag, re.I) or re.search(rf"\b{name}\s*=\s*'([^']*)'", tag, re.I)
    return html.unescape(m.group(1)) if m else None


def audit(url):
    print(f"\n=== {url}")
    try:
        status, final, page = fetch(url)
    except Exception as e:  # noqa: BLE001 - report any failure and carry on with the next URL
        print(f"FETCH FAILED: {e}")
        return
    print(f"status {status}  final {final}")
    head = page.split("</head>")[0]
    title = re.search(r"<title[^>]*>(.*?)</title>", page, re.S | re.I)
    print("title:", html.unescape(title.group(1).strip()) if title else "-", f"({len(html.unescape(title.group(1).strip())) if title else 0} chars)")
    for tag in re.findall(r"<meta[^>]+>", head, re.I):
        name = (attr(tag, "name") or attr(tag, "property") or "").lower()
        if name in ("description", "robots", "og:title", "og:url"):
            print(f"{name}: {attr(tag, 'content')}")
    for tag in re.findall(r"<link[^>]+>", head, re.I):
        rel = (attr(tag, "rel") or "").lower()
        if rel == "canonical":
            print("canonical:", attr(tag, "href"))
        if rel == "alternate" and attr(tag, "hreflang"):
            print(f"hreflang {attr(tag, 'hreflang')}: {attr(tag, 'href')}")

    blocks = re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', page, re.S | re.I)
    types = []
    for b in blocks:
        try:
            data = json.loads(b)
        except json.JSONDecodeError:
            types.append("INVALID JSON")
            continue
        items = data.get("@graph", [data]) if isinstance(data, dict) else data
        types += [str(i.get("@type")) for i in items if isinstance(i, dict)]
    print("json-ld:", ", ".join(types) or "none", "| references odysense #organization:", "https://odysense.com/#organization" in page)

    body = re.sub(r"<(script|style|noscript)\b.*?</\1>", " ", page, flags=re.S | re.I)
    links = re.findall(r"<a\b[^>]*>.*?</a>", body, re.S | re.I)
    ody = [(attr(a, "href"), re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", a))).strip(), attr(a, "rel")) for a in links if "odysense.com" in (attr(a, "href") or "")]
    print(f"links to odysense.com: {len(ody)}")
    for href, text, rel in ody:
        print(f"  [{text or '(no text)'}] -> {href}" + (f"  rel={rel}" if rel else ""))
    text = html.unescape(re.sub(r"<[^>]+>", " ", body))
    words = len(re.findall(r"\w+", text))
    print(f"server-rendered words: {words}" + ("  (low: content may be rendered by JavaScript only)" if words < 150 else ""))
    hits = sorted({m.group(0) for m in FORBIDDEN.finditer(text)})
    print("rule check:", "OK" if not hits else f"REVIEW {hits}")


if __name__ == "__main__":
    for u in sys.argv[1:]:
        audit(u)
