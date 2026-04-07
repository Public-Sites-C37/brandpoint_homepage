# Session Freeze — 2026-04-06 MaDonna Copy Edits Round 3

## Context
Repo: `Brandpoint-C37/home_page` (mirrored to `Public-Sites-C37/brandpoint_homepage`) — Brandpoint marketing homepage v2, deployed live to `https://www.brandpoint.com/` as WordPress page 40991 (`elementor_canvas` template, raw HTML in `<!-- wp:html -->` block).
Branch: `main`
Scope: Mastered the entire repo, re-verified WordPress REST API connection from CLI, then implemented MaDonna's round-3 copy edits (5 text changes + new hero map image) live to production.

## Work Done

### 1. Repo mastery
Read and indexed:
- `index.html` (484 lines, 12 sections, JSON-LD Organization schema)
- `css/styles.css` (1442 lines, brand tokens `--bp-navy #1B2541` / `--bp-orange #E8632B` / `--bp-teal #2A8F7D`, `bp-landing-` prefix, `!important` on h1-h4 to defeat Elementor Kit overrides)
- `js/main.js` (159 lines, IntersectionObserver scroll reveal + gauge donut animation + sticky nav rAF throttle + GA4 `cta_click`/`section_view`/`nav_click` via `gtag()`+dataLayer)
- `WordPress config/{RESEARCH,SETUP-GUIDE,SITE-AUDIT}.md`
- `WordPress config/Implementation/{SPEC,PLAN}.md`
- `WordPress config/Implementation/image-map.json` (34 local→WP URL mappings)

### 2. WordPress CLI connection verified
| Check | Result |
|---|---|
| `GET /wp-json/wp/v2/users/me` | `200` — id 78 "Jake Trippel" |
| Site info | Brandpoint, America/Chicago (-5), Hello Elementor 3.4.7 |
| Page 40991 | `publish`, slug `homepage-2026`, template `elementor_canvas`, modified `2026-04-01T19:29:43` |
| `GET /wp-json/wp/v2/settings` | `show_on_front=page`, `page_on_front=40991` |
| Media library | 3,171 items |
| Cloudflare front | `cf-cache-status: HIT`, `age: 13858s`, `max-age=600` |

Credentials confirmed working from `.wp-credentials.env` (gitignored): `WP_USER=jtrippel`, Application Password active.

### 3. MaDonna's 5 copy edits — applied locally + live
Source: `/home/jaket/Downloads/Madonna_homepage_edits.pdf` (Outlook email from msheehy@brandpoint.com, 4/2/2026 3:11 PM, cc Stacy Stusynski).

| # | Section | Old | New |
|---|---|---|---|
| 1 | `#value-prop` | `The result = stronger AI visibility` | `The result is stronger AI visibility` |
| 2 | Optimize package card | `insights &amp; recommendations` | `insights and recommendations` |
| 3 | Agency Leader quote | `&lsquo;what&rsquo;s the ROI?&rsquo;` | `&lsquo;What&rsquo;s the ROI?&rsquo;` |
| 4 | Digital Strategy Leader quote | `agency what to do next` | `agency on what to do next` |
| 5 | `#case-study` | `over 1000 placements for CooperVision` | `over 1,000 placements for CooperVision` |

Net delta to page content: `+3` chars (66942 → 66945). Math: +1 −2 +0 +3 +1 = +3. ✓

### 4. New hero distribution map image — deployed
Source: `/home/jaket/Downloads/Distribution Map-Dots (2).png` (1877×1010, RGBA, 340391 bytes). Visual change: premium-outlet highlight halos now visible on the map for LA Times, Chicago Tribune, NY Daily News, Miami area, plus AP legend marker bottom-right.

Procedure (overwrite-and-replace strategy):
1. Copied new file → `assets/images/distribution-map.png` (replacing 339369-byte old version)
2. `DELETE /wp-json/wp/v2/media/40957?force=true` (old media item)
3. `POST /wp-json/wp/v2/media` with `Content-Disposition: filename="distribution-map.png"` → new id 40993
4. WordPress assigned the same `source_url`: `https://www.brandpoint.com/wp-content/uploads/2026/04/distribution-map.png` — page src remained valid without modification

### 5. Page 40991 patch
- `POST /wp-json/wp/v2/pages/40991` with patched content
- Status remained `publish`, `modified` jumped to `2026-04-06T20:21:01`
- Re-save triggered WP Engine + Cloudflare cache invalidation

### 6. Verification
| Check | Result |
|---|---|
| WP raw content (context=edit) | All 5 new strings present, all 5 old strings gone |
| Live `https://www.brandpoint.com/` HTML | All 5 new strings present in 101400-byte rendered HTML |
| Live homepage cache | `cf-cache-status: MISS`, `last-modified: Tue, 07 Apr 2026 01:21:35 GMT` |
| New map image fetch | `HTTP 200`, `content-length: 340391` (matches local byte-exact), `cf-cache-status: MISS` |

### 7. Commit and push
Single commit `60f99f9` on `main`:
```
60f99f9 Apply MaDonna copy edits round 3 + new hero distribution map
 assets/images/distribution-map.png | Bin 339369 -> 340391 bytes
 index.html                         |  10 +++++-----
 2 files changed, 5 insertions(+), 5 deletions(-)
```
Pushed to both remotes (origin has dual push URLs):
- `Brandpoint-C37/home_page.git`: `49957a8..60f99f9 main -> main`
- `Public-Sites-C37/brandpoint_homepage.git`: `49957a8..60f99f9 main -> main`

## Key Technical Learnings

1. **Media replace via REST API works cleanly** — `DELETE /media/{id}?force=true` followed by `POST /media` with the same `Content-Disposition` filename will reclaim the same `source_url` slot, provided no other file collides in the same year/month upload folder. WordPress auto-regenerates all sized variants (`-300x161`, `-1024x551`, `-1536x827`, `-768x413`).
2. **WP entity preservation is consistent** — what we PUT as `&lsquo;` / `&rsquo;` / `&ldquo;` / `&rdquo;` / `&amp;` comes back identically via `context=edit`. Plain Python `str.replace()` on the entity-encoded form is reliable. Curly Unicode quotes (`\u2018` etc.) do NOT appear in the raw — they only render that way in the live HTML if the source had them; we use entities throughout.
3. **Page 40991 content size baseline:** ~67k chars raw, ~68k rendered, 101k full live HTML (after Elementor canvas template wrap).
4. **Re-saving page via REST API is the cache-bust mechanism** — `cf-cache-status` flips from HIT to MISS within seconds of `POST /pages/{id}`. No separate Cloudflare API call needed for content updates.
5. **Origin remote has dual push URLs** — single `git push origin main` simultaneously pushes to both `Brandpoint-C37/home_page` and `Public-Sites-C37/brandpoint_homepage`. Confirmed by push output showing both repos updated.
6. **MaDonna's wp-admin question** — she can safely make text-only edits in wp-admin IF she uses the **Code editor** (not Visual — `wpautop` will mangle the inline `<style>` block). She must touch only words between tags, never `class=`, `<style>`, `<script>`, or `<!-- wp:html -->` wrappers.

## Files Modified
| File | Change |
|---|---|
| `index.html` | 5 in-place text edits (lines ~59, 143, 220, 287, 392) |
| `assets/images/distribution-map.png` | Replaced (339369 → 340391 bytes) |
| `.memsearch/memory/session_freeze_20260406_madonna_copy_edits_round3.md` | This file |

## Live State
- **Homepage:** `https://www.brandpoint.com/` (WP page 40991, status `publish`, modified `2026-04-06T20:21:01`)
- **Hero map:** `https://www.brandpoint.com/wp-content/uploads/2026/04/distribution-map.png` (media id 40993, 340391 bytes)
- **Old media id 40957:** deleted (force=true)
- **Cache state:** Cloudflare MISS as of 01:21:35 GMT 2026-04-07; will warm to HIT within seconds of next request

## Open Items
- [ ] **OI-05** — Set Yoast SEO title, description, and OG image manually in wp-admin (Yoast REST API is read-only). Still pending from prior session.
- [ ] **MaDonna training** — walk her through making future copy edits in wp-admin via Code editor (not Visual)
- [ ] **Untracked `Updates from Brandpoint/` assets** — PR agency logos zip, outlet logos zip, AP/USA Today/Business Journals PNGs, native ads, see-our-work, specialty formats, Lisa_Jilek_homepage.pdf — need to decide whether to commit or .gitignore
- [ ] **Notify MaDonna** that all 5 copy edits + the new map are live and tell her to hard-refresh (Ctrl+Shift+R)

## Rollback Commands

Restore old homepage (page 39965) as front page:
```bash
source .wp-credentials.env
curl -sL -X PUT "$WP_SITE/wp-json/wp/v2/settings" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"show_on_front":"page","page_on_front":39965}'
```

Revert this commit (text edits + map):
```bash
git revert 60f99f9
git push origin main
# Then re-PUT the prior content to page 40991 via API
```

The new map file 340391-byte version is also preserved at `/home/jaket/Downloads/Distribution Map-Dots (2).png` if re-upload is needed.
