#!/usr/bin/env python3
"""
IndexNow ping for odysense.com (Bing, Yandex, Seznam, Naver and others share submissions).
Google does not use IndexNow; it reads the sitemap.

The key is public by design: it is served at https://odysense.com/<KEY>.txt (public/<KEY>.txt).
To rotate it, add a new public/<key>.txt, change KEY below, and delete the old file.

Usage:
  python3 scripts/indexnow.py URL [URL ...]       submit specific URLs
  python3 scripts/indexnow.py --all               submit every URL in the live sitemap
  python3 scripts/indexnow.py --changed STATE     submit only pages whose content changed since the
                                                  last run (hashes kept in the STATE json file);
                                                  used by .github/workflows/indexnow.yml after deploys
  add --dry-run to print the URLs without submitting

Standard library only (runs on GitHub's ubuntu runner and in the Claude cloud sandbox, though the
sandbox's network policy blocks odysense.com).
"""
import hashlib
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request

SITE = "https://odysense.com"
HOST = "odysense.com"
KEY = "fef5c264e59917ec1437b4d43bce08f0"
ENDPOINT = "https://api.indexnow.org/indexnow"
UA = "Odysense-IndexNow/1.0 (+https://odysense.com/)"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def sitemap_urls():
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", get(f"{SITE}/sitemap.xml"))


def fingerprint(page):
    """Hash what a reader or crawler sees: title, meta description, structured data and visible text.
    Build-specific noise (script chunks, the RSC payload, CSS file names) is left out, so a redeploy
    that doesn't change a page doesn't resubmit it."""
    title = re.search(r"<title>(.*?)</title>", page, re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', page)
    ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)
    body = re.sub(r"<(script|style|noscript)\b.*?</\1>", " ", page, flags=re.S)
    text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", body))).strip()
    parts = [title.group(1) if title else "", desc.group(1) if desc else "", *ld, text]
    return hashlib.sha256("\n".join(parts).encode()).hexdigest()


def changed(state_path):
    try:
        with open(state_path) as f:
            old = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        old = {}
    new, out = {}, []
    for u in sitemap_urls():
        try:
            new[u] = fingerprint(get(u))
        except urllib.error.URLError as e:
            print(f"skip {u}: {e}", file=sys.stderr)
            if u in old:
                new[u] = old[u]
            continue
        if old.get(u) != new[u]:
            out.append(u)
    out += [u for u in old if u not in new]  # removed pages: IndexNow wants those too
    return out, new


def submit(urls, dry_run=False):
    urls = [u for u in dict.fromkeys(urls) if u.startswith(SITE + "/")]
    if not urls:
        print("Nothing to submit.")
        return
    print(f"{len(urls)} URL(s):", *urls, sep="\n  ")
    if dry_run:
        return
    for i in range(0, len(urls), 10000):
        body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt",
                           "urlList": urls[i:i + 10000]}).encode()
        req = urllib.request.Request(ENDPOINT, data=body, method="POST",
                                     headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print("IndexNow:", r.status)  # 200 or 202 = accepted
        except urllib.error.HTTPError as e:
            # 403 = key file not found/invalid, 422 = URLs don't match the host, 429 = too many requests
            sys.exit(f"IndexNow: {e.code} {e.read().decode()[:300]}")


if __name__ == "__main__":
    args = sys.argv[1:]
    dry = "--dry-run" in args
    args = [a for a in args if a != "--dry-run"]
    if not args:
        sys.exit(__doc__)
    if args[0] == "--all":
        submit(sitemap_urls(), dry)
    elif args[0] == "--changed":
        state = args[1] if len(args) > 1 else os.path.expanduser("~/.indexnow-state.json")
        urls, fingerprints = changed(state)
        submit(urls, dry)  # exits on failure, so the state below is only saved after a successful submit
        if not dry:
            with open(state, "w") as f:
                json.dump(fingerprints, f, indent=1, sort_keys=True)
    else:
        submit(args, dry)
