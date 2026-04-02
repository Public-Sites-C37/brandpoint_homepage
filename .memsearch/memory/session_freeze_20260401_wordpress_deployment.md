# Session Freeze — 2026-04-01 — WordPress Deployment + MaDonna Final Round

## Session Context
- **Duration:** ~3 hours (13:45–16:30 CDT)
- **Operator:** Jake Trippel (CTO, C37)
- **Machine:** HavokAI (Ubuntu)
- **Repo:** home_page (`/home/jaket/dev_c37/home_page/`)

## What Happened

### MaDonna Final Round Changes
MaDonna sent final feedback. All items implemented:
1. **Quotes:** Replaced lorem ipsum with Agency Leader ("ROI") and Digital Strategy Leader ("agency what to do next") quotes. Swapped positions per MaDonna's request — Agency Leader before gauge, Digital Strategy Leader after gauge.
2. **Package audience:** Signature Plus and Optimize updated from 90M → 120M
3. **"Meet Brandpoint Optimize" heading:** Replaced logo image with styled text (`Meet Brandpoint <span class="bp-landing-optimize-text">Optimize</span>`) to fix font mismatch
4. **Footer social:** Removed Facebook, X, YouTube — LinkedIn only remains
5. **Scroll reveal fix:** Progressive enhancement — content visible by default, JS adds `.bp-reveal-ready` class to enable animations

### WordPress REST API Connection Established
- **REST API accessible** at `https://www.brandpoint.com/wp-json/wp/v2/`
- **Application Password** generated for `jtrippel` (user 78) after enabling in Wordfence
- **Credentials:** `.wp-credentials.env` (gitignored) with `WP_SITE`, `WP_USER`, `WP_APP_PASSWORD`
- **Site audit:** Hello Elementor theme, 17 published pages, Yoast SEO active, no page builder on homepage (raw HTML)

### Full WordPress Deployment — NEW HOMEPAGE IS LIVE

#### Spec-Driven Development
- Created `WordPress config/Implementation/` with SPEC.md, PLAN.md, TESTS.md
- Ran 3-agent quality review — found 2 critical, 7 important issues, all fixed:
  - Yoast REST API is read-only (SEO fields must be set manually in wp-admin)
  - `show_on_front` must accompany `page_on_front` in settings API call
  - Template name is `elementor_canvas` (underscores, not hyphens)
  - WordPress `wpautop` corrupts CSS in `<style>` blocks → fix: wrap in `<!-- wp:html -->` block
  - Elementor Kit global styles override heading fonts → fix: `!important` on font-family, weight, style, color

#### Deployment Steps Executed
1. **Environment validation:** Confirmed `<style>`, `<script>`, `<svg>` tags survive in WordPress content. Confirmed `elementor_canvas` template renders blank page with no theme chrome.
2. **Image upload:** 34 images uploaded to WordPress media library via REST API. All returned valid URLs. Mapping saved to `WordPress config/Implementation/image-map.json`.
3. **Content assembly:** Built single content blob with inline CSS (`<style>`), inline JS (`<script>`), all HTML sections, WordPress image URLs. Wrapped in `<!-- wp:html -->` block to prevent wpautop corruption.
4. **Draft creation:** Created page 40991 ("Brandpoint Homepage 2026"), slug `homepage-2026`, template `elementor_canvas`. 55/55 verification checks passed.
5. **Go live:** Published page, set `page_on_front: 40991`. Cloudflare edge cache required re-save to bust (age was 3+ hours stale).

#### Issues Encountered & Resolved
| Issue | Root Cause | Fix |
|-------|-----------|-----|
| CSS not applying on WordPress | `wpautop` inserting `<p>` tags inside `<style>` block | Wrapped content in `<!-- wp:html -->` block |
| H1/H2/H3 wrong font (BPT Degular italic) | Elementor Kit global typography overriding our styles | Added `!important` to heading font-family, weight, style |
| H1 color blue instead of white in hero | Elementor Kit global `h1 { color: blue }` | Added `color: inherit !important` to `.bp-landing-h1` |
| Footer "LINKS" / "SOCIAL" headings invisible | Elementor Kit global `h4` color override on navy background | Added `!important` to `.bp-landing-footer-heading` color |
| Page set to "future" status after date update | UTC date was ahead of server local time | Fixed with explicit `status: "publish"` + past date |
| Cloudflare serving old homepage | Edge cache stale (11,000+ seconds) | Re-saved page via API to trigger WP Engine cache invalidation |

#### Analytics Enhancement
Added GA4 event tracking directly via `gtag()`:
- `cta_click` — fires on every CTA button click (text, URL, section)
- `section_view` — fires when visitor scrolls to packages, optimize, case-study, final-cta
- `nav_click` — fires on nav and footer link clicks
- JSON-LD structured data — Organization schema with address, phone, email, founding date, LinkedIn
- All events also push to `dataLayer` for GTM compatibility

## Current State

### Live Homepage
- **URL:** `https://www.brandpoint.com/`
- **Page ID:** 40991
- **Status:** publish
- **Template:** `elementor_canvas`
- **Settings:** `show_on_front: "page"`, `page_on_front: 40991`

### Old Homepage (preserved)
- **URL:** `https://www.brandpoint.com/brandpoint-jk-draft-6-24/`
- **Page ID:** 39965
- **Status:** publish (no longer front page)

### Rollback Command
```bash
source .wp-credentials.env
curl -sL -X PUT "$WP_SITE/wp-json/wp/v2/settings" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"show_on_front": "page", "page_on_front": 39965}'
```

## Key Technical Learnings

1. **`wpautop` breaks inline CSS** — WordPress's auto-paragraph filter inserts `<p>` tags inside `<style>` blocks. Fix: wrap content in `<!-- wp:html -->` Gutenberg block markers.
2. **Elementor Kit overrides everything** — Even on `elementor_canvas` pages where Elementor is NOT enabled, the Elementor Kit's global typography styles apply to `h1`–`h6` tags. Fix: `!important` on font-family, weight, style, and color.
3. **`elementor_canvas` uses underscores** — The template slug is `elementor_canvas`, not `elementor-canvas`. The API returns a 400 error with the hyphenated version.
4. **Cloudflare/WP Engine cache** — The site uses Cloudflare CDN via WP Engine. Cache purge is triggered by re-saving a page via the API. `max-age=600` but actual cache age can exceed this.
5. **Yoast REST API is read-only** — Cannot set SEO title/description via API. Must be set manually in wp-admin.
6. **GA4 gtag() works inside page content** — Since `gtag.js` is loaded by WordPress globally, inline `<script>` blocks can call `gtag('event', ...)` directly.

## Git State
- **Latest commit:** `60f96f5` — "Add WordPress API integration docs and establish REST API connection"
- **Uncommitted changes:** CSS `!important` fixes, JS analytics enhancements, JSON-LD structured data, WordPress config Implementation docs
- **Branch:** main
- **Both remotes:** `Brandpoint-C37/home_page` + `Public-Sites-C37/brandpoint_homepage`

## Open Items
- **OI-05:** Set Yoast SEO title, description, and OG image manually in wp-admin (during MaDonna review)
- **GTM triggers:** CTA and scroll events fire to GA4 directly via gtag(); GTM triggers optional but available via dataLayer
- **MaDonna training:** Walk her through making copy edits in wp-admin HTML editor

## File Inventory
```
WordPress config/
├── RESEARCH.md              — 4 integration approaches evaluated
├── SETUP-GUIDE.md           — Step-by-step API setup with curl commands
├── SITE-AUDIT.md            — Live site audit: page IDs, Yoast, no page builder
└── Implementation/
    ├── SPEC.md              — 8 acceptance criteria, risks, open items
    ├── PLAN.md              — 5 steps, 27 sub-steps
    ├── TESTS.md             — 5 test suites, 80+ checks
    └── image-map.json       — 34 local→WordPress URL mappings
```
