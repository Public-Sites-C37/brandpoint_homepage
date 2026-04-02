# home_page — MemSearch Log

## Project
Brandpoint Product Landing Page — static HTML/CSS/JS site for `brandpoint.com/distribution-solutions`

## Key Facts
- **Client:** MaDonna Sheehy, Director of Marketing, Brandpoint
- **Stack:** Vanilla HTML/CSS/JS (no frameworks), WordPress-pasteable
- **Font:** Inter (Google Fonts)
- **Colors:** Navy #1B2541, Orange #E8632B, Teal #2A8F7D
- **CSS Namespace:** All classes prefixed `bp-landing-`
- **Live Preview:** https://public-sites-c37.github.io/brandpoint_homepage/

## Remotes
- `origin` fetch: `Brandpoint-C37/home_page` (GH Enterprise, jake_c37 SSH via org-257209038)
- `origin` push: mirror to both `Brandpoint-C37/home_page` AND `Public-Sites-C37/brandpoint_homepage`
- `public`: `Public-Sites-C37/brandpoint_homepage` (DrTrippel SSH)
- CI: GitHub Actions deploys to GitHub Pages on push to main

## Architecture
- `index.html` — 8 sections (Hero, Social Proof, Packages, CTA Band, Optimize [3 sub-sections], Customizations, Case Study, Final CTA)
- `css/styles.css` — 1092 lines, CSS custom properties for brand tokens, responsive at 1440/1024/768/480
- `js/main.js` — IntersectionObserver scroll-reveal + gauge donut animation
- `assets/images/distribution-map.svg` — Custom US map with 5 publisher markers
- `assets/logos/` — 6 placeholder brand SVGs + 3 specialty pub logos

## Spec Docs
- `SPEC.md` — 13 acceptance criteria, 8 open items
- `PLAN.md` — 5-phase, 22-step implementation plan
- `TESTS.md` — 16 manual test suites, 70+ checks

## Open Items (Unresolved)
- OI-01: Prices on live page? (included with `.bp-price` class for easy removal)
- OI-02: Real brand logos for social proof slider (placeholders now)
- OI-05: SFGate screenshot approved? (styled placeholder)
- OI-07: Brandpoint Optimize logo asset (CSS/text recreation currently)

## Session History

### 2026-03-27 — Initial Build
- Analyzed 5 source materials (brief PDF, Teams transcript, email, Distribution Guide, Optimize One-Pager)
- Created SPEC.md, PLAN.md, TESTS.md — reviewed by 4 parallel agents
- Built all 8 sections with scroll-reveal animations, AI Visibility gauge, logo slider
- Deployed via GitHub Pages; set up mirror push to public repo
- Live at https://public-sites-c37.github.io/brandpoint_homepage/

### 2026-03-31 — Homepage v2 Full Implementation
- Analyzed 16 MaDonna change requests (email + VTT + 11 attachments)
- Audited brandpoint.com: nav, footer, all links, forms — resolved 9 open questions
- Created full spec-driven docs: FUNCTIONAL-REQUIREMENTS, TECHNICAL-REQUIREMENTS, SPEC (19 ACs), PLAN (27 steps), TESTS (100+ checks)
- 5 parallel agents ran quality review — found/fixed 26 issues across all docs
- Implemented all 16 changes in single pass: sticky nav, value prop, 10 PR agency logos, prices/badge removed, Optimize logo image, quote placeholder, gauge text, 3 real customization images, 16-outlet publisher reel, 2-col case study, full footer, SEO meta
- Playwright verification: 19/19 ACs PASS
- Post-polish: fixed footer logo (high-res + CSS invert), Optimize card "New" badge (absolute pill + accent border)
- Committed `7a032dd`, pushed to both remotes, GitHub Pages deploy succeeded
- Live: https://public-sites-c37.github.io/brandpoint_homepage/
- Open: MaDonna to provide value prop copy + new quote copy

### 2026-04-01 — MaDonna Final Round + WordPress API Connection

#### MaDonna Final Round Changes
- Replaced lorem ipsum quotes with final copy: Agency Leader (ROI quote) + Digital Strategy Leader
- Swapped quote positions per MaDonna's request (Agency Leader first, Digital Strategy Leader second)
- Fixed Signature Plus and Optimize audience from 90M → 120M
- Replaced Optimize logo image with styled text (`Meet Brandpoint <span class="bp-landing-optimize-text">Optimize</span>`) to fix font mismatch
- Removed Facebook, X, YouTube from footer — LinkedIn only
- Fixed scroll reveal progressive enhancement: content visible by default, JS adds `.bp-reveal-ready` to enable animations

#### WordPress REST API Connection Established
- **REST API accessible** at `https://www.brandpoint.com/wp-json/wp/v2/`
- **No page builder** on homepage — raw HTML in `post_content` (95K chars), can push directly via API
- **Homepage page ID:** `39965` (slug: `brandpoint-jk-draft-6-24`, title: "Brandpoint Home 2025")
- **Yoast SEO active** with REST API fields exposed
- **Authentication:** Application Password for `jtrippel` (user ID 78) — stored in `.wp-credentials.env` (gitignored)
- **Wordfence note:** Had to uncheck "Disable WordPress application passwords" in Wordfence All Options to enable App Passwords
- **Credentials file:** `.wp-credentials.env` with `WP_SITE`, `WP_USER`, `WP_APP_PASSWORD` env vars
- **17 published pages** mapped — see `WordPress config/SITE-AUDIT.md`

#### WordPress Config Documentation Created
- `WordPress config/RESEARCH.md` — Full evaluation of 4 integration approaches (REST API, MCP Server, WP-CLI, WPGraphQL)
- `WordPress config/SETUP-GUIDE.md` — Step-by-step setup, curl commands, troubleshooting
- `WordPress config/SITE-AUDIT.md` — Live site audit: page IDs, Yoast status, no page builder, deployment strategy

#### Open Decision: Nav/Footer Strategy
- **Option A:** Use WordPress theme nav/footer (strip ours, push body sections only)
- **Option B:** Full custom page with blank template (push everything including our nav/footer)
- **RESOLVED:** Option B chosen — `elementor_canvas` template, full custom page with our nav/footer

### 2026-04-01 — WordPress Deployment LIVE
- Deployed new homepage to WordPress via REST API — **page 40991 is now the live homepage**
- Old homepage (page 39965) preserved at `/brandpoint-jk-draft-6-24/`
- Spec-driven development: SPEC.md, PLAN.md, TESTS.md created, quality-reviewed (3 agents), 55/55 checks passed
- Key fixes during deployment: `<!-- wp:html -->` block to prevent wpautop CSS corruption, `!important` overrides for Elementor Kit global typography
- Added GA4 event tracking: `cta_click`, `section_view`, `nav_click` via gtag() + dataLayer
- Added JSON-LD Organization structured data
- Rollback: `PUT /settings {"show_on_front":"page","page_on_front":39965}`
