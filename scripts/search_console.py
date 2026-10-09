#!/usr/bin/env python3
"""
Google Search Console helper for Claude Code sessions (not part of the website build).

Credentials come from the cloud environment, never from the repo:
  GSC_SERVICE_ACCOUNT_B64  base64 of the service-account JSON key
                           (seo-audit-agent@seo-audit-agent-511116.iam.gserviceaccount.com, "Full" user)
The property is the URL-prefix property https://odysense.com/.

Needs: python3 with PyJWT + cryptography (both present in the cloud sandbox).

Usage:
  python3 scripts/search_console.py sites
  python3 scripts/search_console.py perf [days] [query|page|country|date] [rows]
  python3 scripts/search_console.py inspect URL [URL ...]
  python3 scripts/search_console.py sitemaps
  python3 scripts/search_console.py submit-sitemap [URL]

The API cannot "Request indexing" for normal pages; the owner does that in the Search Console UI.
"""
import base64
import datetime
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

import jwt

SITE = "https://odysense.com/"
SCOPE = "https://www.googleapis.com/auth/webmasters"
API = "https://www.googleapis.com/webmasters/v3/sites/" + urllib.parse.quote(SITE, safe="")
_token = None


def _creds():
    return json.loads(base64.b64decode(os.environ["GSC_SERVICE_ACCOUNT_B64"]))


def _access_token():
    global _token
    if _token:
        return _token
    c = _creds()
    now = int(time.time())
    assertion = jwt.encode(
        {"iss": c["client_email"], "scope": SCOPE, "aud": c["token_uri"], "iat": now, "exp": now + 3600},
        c["private_key"],
        algorithm="RS256",
        headers={"kid": c["private_key_id"]},
    )
    body = urllib.parse.urlencode(
        {"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer", "assertion": assertion}
    ).encode()
    _token = json.load(urllib.request.urlopen(urllib.request.Request(c["token_uri"], data=body)))["access_token"]
    return _token


def call(method, url, body=None):
    req = urllib.request.Request(
        url,
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {_access_token()}", "Content-Type": "application/json"},
    )
    try:
        r = urllib.request.urlopen(req)
        raw = r.read()
        return r.status, (json.loads(raw) if raw else {})
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


def sites():
    print(json.dumps(call("GET", "https://www.googleapis.com/webmasters/v3/sites")[1], indent=1))


def perf(days="90", dim="query", rows="25"):
    end = datetime.date.today()
    start = end - datetime.timedelta(days=int(days))
    body = {"startDate": str(start), "endDate": str(end), "dimensions": [dim], "rowLimit": int(rows)}
    st, r = call("POST", f"{API}/searchAnalytics/query", body)
    if st != 200:
        sys.exit(f"{st} {r}")
    for x in r.get("rows", []):
        print(f"{x['keys'][0][:80]:80} clicks={x['clicks']:.0f} impr={x['impressions']:.0f} "
              f"ctr={x['ctr']*100:.1f}% pos={x['position']:.1f}")


def inspect(*urls):
    for u in urls:
        st, r = call("POST", "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                     {"inspectionUrl": u, "siteUrl": SITE})
        if st != 200:
            print(u, st, json.dumps(r)[:300])
            continue
        i = r["inspectionResult"]["indexStatusResult"]
        print(f"{u:70} {i.get('verdict')} | {i.get('coverageState')} | last={i.get('lastCrawlTime', '-')[:10]} "
              f"| google={i.get('googleCanonical', '-')}")


def sitemaps():
    print(json.dumps(call("GET", f"{API}/sitemaps")[1], indent=1))


def submit_sitemap(url=SITE + "sitemap.xml"):
    print(call("PUT", f"{API}/sitemaps/" + urllib.parse.quote(url, safe=""))[0])


if __name__ == "__main__":
    cmd, *args = sys.argv[1:] or ["sites"]
    {"sites": sites, "perf": perf, "inspect": inspect, "sitemaps": sitemaps,
     "submit-sitemap": submit_sitemap}[cmd](*args)
