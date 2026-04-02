# SPEC.md — Deploy New Homepage to WordPress via REST API

## Problem Statement

Brandpoint's new homepage has been built as a static HTML/CSS/JS page in this repository (`index.html`, `css/styles.css`, `js/main.js`). It needs to be deployed to WordPress at `www.brandpoint.com` to replace the current homepage (Elementor-built page ID 39965, "Brandpoint Home 2025"). The current homepage must not be deleted — it should remain accessible but no longer serve as the front page.

## Expected Behavior

When a visitor navigates to `https://www.brandpoint.com/`:
- They see the new homepage with all sections rendering correctly (nav, hero, value prop, social proof, packages, CTA band, Optimize section with quotes/gauge, customizations, publisher reel, case study, final CTA, footer)
- All images load from WordPress media library URLs
- Scroll reveal animations work
- Mobile responsive at all breakpoints (1024/768/480)
- All CTA links point to `https://www.brandpoint.com/contact/`
- All nav links work (Who We Are, Who We Work With, Blog, Editorial Content Library, Contact Us)
- SEO metadata (title, description, Open Graph) is set via Yoast
- The page loads without any Elementor processing — pure HTML/CSS/JS

When navigating to the old homepage's slug URL:
- The old "Brandpoint Home 2025" page remains accessible and unchanged

## Observed Behavior

The new homepage currently exists only as static files in this Git repository, deployed to GitHub Pages at `https://public-sites-c37.github.io/brandpoint_homepage/`. It is not yet in WordPress.

## Affected Systems

| System | Action | Purpose |
|--------|--------|---------|
| WordPress Media Library | Upload 34 images | Host images at WordPress URLs |
| WordPress Pages | Create new page | Store homepage HTML/CSS/JS content |
| WordPress Settings | Update `page_on_front` | Point homepage to new page |
| WordPress Yoast SEO | Set meta fields | SEO title, description, OG tags |
| Old Homepage (page 39965) | No changes | Stays published, no longer front page |

## Technical Context

| Fact | Value |
|------|-------|
| WordPress site | `https://www.brandpoint.com` |
| Active theme | Hello Elementor 3.4.7 |
| Current homepage | Page ID 39965, Elementor-built, 12 sections |
| API auth | Application Password for `jtrippel` (user 78) |
| Credentials | `.wp-credentials.env` (gitignored) |
| API base | `https://www.brandpoint.com/wp-json/wp/v2/` |
| Page template | `elementor_canvas` (blank shell — no theme header/footer) |
| Elementor on new page | NOT enabled — raw HTML only |
| CSS delivery | Inline `<style>` block in page content |
| JS delivery | Inline `<script>` block in page content |
| Google Fonts | `<link>` tag for Inter font in page content |

## Assets to Upload

### Images (`assets/images/`)
| File | Purpose |
|------|---------|
| `distribution-map.png` | Hero section US map |
| `bpt-optimize-logo.png` | No longer used in HTML (replaced with text) — skip |
| `native-ads.png` | Customization row 3 |
| `see-our-work.png` | Case study section |
| `specialty-formats.png` | Customization row 2 |

### Logos (`assets/logos/`)
| File | Purpose |
|------|---------|
| `brandpoint-logo.png` | Nav + footer logo |
| `outlets/*.png` (16 files) | Publisher network reel |
| `pr-agency/*.png` (10 files) | Social proof slider |
| `specialty/*.png` (3 files) | Customization row 1 (AP, USA Today, Business Journals) |

**Total: 34 images to upload** (35 on disk; `bpt-optimize-logo.png` excluded — no longer referenced in HTML)

## Content Assembly Strategy

The page content pushed to WordPress will be structured as:

```
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
[full contents of css/styles.css]
</style>

<header class="bp-landing-nav" id="bp-landing-nav">
  [nav HTML]
</header>

[all section HTML from index.html — hero through footer]
[all image src attributes rewritten to WordPress media URLs]

<script>
[full contents of js/main.js]
</script>
```

Key considerations:
- The `<link>` tag for Google Fonts must be in the content since we don't control `<head>`
- The `elementor_canvas` template provides a minimal `<html><head>...</head><body>` shell
- Our CSS custom properties, reset, and all styles go in the inline `<style>` block
- Image paths are rewritten from relative (`assets/logos/...`) to absolute WordPress media URLs
- The `<script>` block goes at the end, same as our current `index.html` structure

## Acceptance Criteria

### AC-01: Images Uploaded
All 34 images are uploaded to WordPress media library and return valid URLs.

### AC-02: Page Created as Draft
A new WordPress page exists with:
- Title: "Brandpoint Homepage 2026"
- Slug: "homepage-2026"
- Status: draft
- Template: elementor_canvas
- Content: complete HTML with inline CSS/JS and WordPress image URLs

### AC-03: Draft Preview Renders Correctly
The draft page preview shows:
- Sticky navigation with all 5 links + Contact Us CTA
- Hero section with distribution map image
- Value prop section with MaDonna's copy
- Social proof slider with 10 PR agency logos scrolling
- 5 distribution package cards (Signature Plus and Optimize showing 120M)
- CTA band
- "Meet Brandpoint Optimize" heading (all text, "Optimize" in orange)
- 4 Optimize feature cards
- Agency Leader quote (before gauge) and Digital Strategy Leader quote (after gauge), separated by the AI Visibility gauge widget
- AI Visibility gauge with animated donut fill
- Campaign customizations (3 alternating rows with real images)
- Publisher network reel with 16 outlet logos scrolling
- Case study section (CooperVision)
- Final CTA section
- Footer with company info, links, LinkedIn only
- Scroll reveal animations functioning
- Mobile responsive at all breakpoints

### AC-04: No Elementor Processing
The new page renders as raw HTML. Elementor does NOT process or wrap the content. Verified by: no `elementor-widget` classes in the rendered output.

### AC-05: SEO Metadata Set
Yoast SEO fields populated:
- SEO title: "Brandpoint | Premium Content Distribution & AI Visibility Solutions"
- Meta description: "Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies across the nation's top publisher network."
- OG tags: Yoast auto-generates OG title and description from the SEO fields above. OG image will use the existing WordPress asset (`Device-Stack-827x1024.png`) already in the media library, set manually in wp-admin during MaDonna review gate.
- **Note:** Yoast's REST API is read-only for SEO fields. SEO metadata must be set by opening the page in wp-admin and saving via the Yoast panel. This is done during the MaDonna review gate (Step 4.4) before going live.

### AC-06: Homepage Swap
WordPress Settings → Reading → "Your homepage displays: A static page" → set to new page ID. Both `show_on_front: "page"` and `page_on_front: {new_page_id}` confirmed via API. `www.brandpoint.com` serves the new homepage.

### AC-07: Old Homepage Preserved
Page 39965 ("Brandpoint Home 2025") remains published and accessible at its slug URL. No content changes.

### AC-08: Rollback Documented
Rollback command documented and verified as syntactically correct: setting `page_on_front` to 39965 and `show_on_front` to "page" will restore the old homepage immediately. Command is ready for emergency execution without re-verification.

## Constraints

1. **No FTP/SSH required** — everything via REST API
2. **No theme file modifications** — use existing `elementor_canvas` template
3. **No Elementor involvement** — page uses classic/raw HTML content
4. **No deletion of existing content** — old homepage stays intact
5. **Draft first, publish second** — MaDonna reviews before going live
6. **Credentials never committed to git** — `.wp-credentials.env` is gitignored

## Risks

| Risk | Mitigation |
|------|-----------|
| WordPress strips `<style>` or `<script>` tags from content | Test with a small draft page first; if stripped, use `wp_insert_post` with `unfiltered_html` capability (admin users have this) |
| `elementor_canvas` template adds unwanted wrapper markup | Inspect rendered HTML of draft preview; if needed, find alternative blank template |
| Image upload fails for large files | Upload one at a time with error handling; retry on failure |
| Google Fonts `<link>` tag stripped | If stripped, use `@import url()` inside the `<style>` block as fallback |
| Wordfence blocks API requests | Already resolved — Application Passwords enabled |
| Old homepage URL conflicts with new | New page gets a unique slug; old page keeps its slug |
| WordPress strips inline `<svg>` from content via kses filter | Verify LinkedIn footer icon renders; fallback: replace with hosted PNG icon or text link |
| Yoast REST API is read-only for SEO fields | Set SEO metadata manually in wp-admin during MaDonna review gate; do not rely on API `meta` writes for Yoast fields |
| `show_on_front` setting reverts to "posts" | Always set both `show_on_front: "page"` and `page_on_front` together in the same API call |

## Open Items

| # | Item | Status |
|---|------|--------|
| OI-01 | Verify `elementor_canvas` template renders raw content without Elementor | Test in Step 1 |
| OI-02 | Verify WordPress doesn't strip `<style>`/`<script>`/`<svg>` tags for admin users | Test in Step 1 |
| OI-03 | Confirm Google Fonts `<link>` tag survives in page content | Test in Step 1 |
| OI-04 | MaDonna approval of draft preview before going live | Gate before Step 5 |
| OI-05 | Set Yoast SEO title, description, and OG image manually in wp-admin | During Step 4.4 MaDonna review gate |
