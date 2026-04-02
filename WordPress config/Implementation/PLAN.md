# PLAN.md — Deploy New Homepage to WordPress

## Overview

5 steps, executed sequentially via the WordPress REST API from Claude Code. Each step is atomic and verifiable before moving to the next.

---

## Step 1: Validate Environment and Resolve Open Items

**Purpose:** Confirm all prerequisites before uploading anything.

### 1.1 — Verify API authentication is working
- Run: `GET /wp-json/wp/v2/users/me`
- Expected: Returns user 78 (jtrippel) with admin capabilities
- **Fail condition:** 401/403 → regenerate Application Password

### 1.2 — Test `<style>`, `<script>`, and `<svg>` tag preservation
- Create a throwaway draft page via API with content: `<style>body{color:red}</style><p>Test</p><svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><script>console.log('ok')</script>`
- Retrieve the page back via API (`context=edit`) and verify all three tag types survived
- Delete the test page
- **Fail condition:** Tags stripped → investigate `unfiltered_html` capability or `kses` filter bypass for admins. If `<svg>` specifically stripped, replace LinkedIn footer icon with a hosted PNG.
- **Resolves:** OI-02

### 1.3 — Test `elementor_canvas` template renders raw HTML
- Create a throwaway draft page with `template: "elementor_canvas"` and content: `<div style="background:red;padding:50px;color:white;font-size:48px">CANVAS TEST</div>`
- Preview the page in a browser (or via Playwright)
- Verify: red box renders full-width, no theme header/footer visible, no Elementor widget wrappers, no Elementor CSS/JS loaded (view source)
- Delete the test page
- **Fail condition:** Template doesn't work → try `elementor_header_footer` template or default template
- **Resolves:** OI-01

### 1.4 — Test Google Fonts `<link>` tag in content
- Include `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">` in the test page content
- Verify it survives and fonts load
- **Fail condition:** Tag stripped → use `@import url(...)` inside `<style>` block as fallback
- **Resolves:** OI-03

**Verification:** All 3 test pages created, validated, and cleaned up. All open items resolved.

---

## Step 2: Upload Images to WordPress Media Library

**Purpose:** Get all images hosted on WordPress with permanent URLs.

### 2.1 — Create image manifest
- List all image files referenced in `index.html`
- Map each local path to its file on disk
- Expected: 34 images to upload (4 from `assets/images/` — excluding `bpt-optimize-logo.png` which is unused, 1 `assets/logos/brandpoint-logo.png`, 16 from `assets/logos/outlets/`, 10 from `assets/logos/pr-agency/`, 3 from `assets/logos/specialty/`)

### 2.2 — Upload each image via REST API
- For each image:
  ```
  POST /wp-json/wp/v2/media
  Headers:
    Content-Disposition: attachment; filename="<filename>"
    Content-Type: image/png  (all assets are .png — adjust MIME type if non-PNG files are added in the future)
  Body: binary file data
  ```
- Capture the returned `source_url` for each upload
- Store the mapping: `local_path → wordpress_url`

### 2.3 — Verify all uploads succeeded
- Confirm all 34 images returned valid `source_url` values
- Spot-check 2-3 URLs in a browser to confirm they load

**Verification:** Complete mapping file of local paths to WordPress URLs. All images accessible.

**Output:** JSON mapping file saved to `WordPress config/Implementation/image-map.json`

---

## Step 3: Assemble and Push Page Content

**Purpose:** Build the complete page content and create the WordPress draft page.

### 3.1 — Read source files
- Read `index.html`, `css/styles.css`, `js/main.js`

### 3.2 — Extract page body content
- From `index.html`, extract everything between `<body>` and `</body>`:
  - `<header>` (nav)
  - All `<section>` elements
  - `<footer>`
- Exclude: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` tags, the `<link rel="stylesheet" href="css/styles.css">` reference, and the `<script src="js/main.js">` reference (CSS and JS are inlined instead)

### 3.3 — Rewrite image paths
- Using the image map from Step 2, replace every `src="assets/..."` with `src="https://www.brandpoint.com/wp-content/uploads/..."` (the actual WordPress URLs)

### 3.4 — Assemble final content
- Construct the content blob:
  ```
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>[css/styles.css contents]</style>
  [rewritten HTML sections]
  <script>[js/main.js contents]</script>
  ```

### 3.5 — Create WordPress draft page
- ```
  POST /wp-json/wp/v2/pages
  {
    "title": "Brandpoint Homepage 2026",
    "content": "[assembled content]",
    "status": "draft",
    "slug": "homepage-2026",
    "template": "elementor_canvas"
  }
  ```
- Capture the returned page ID

### 3.6 — Yoast SEO metadata (manual — during Step 4.4)
- **Yoast's REST API is read-only** — SEO fields cannot be set via the API
- SEO metadata will be set manually in wp-admin during the MaDonna review gate (Step 4.4):
  1. Open the draft page in WordPress editor
  2. In the Yoast SEO panel, set:
     - SEO title: `Brandpoint | Premium Content Distribution & AI Visibility Solutions`
     - Meta description: `Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies across the nation's top publisher network.`
     - OG image: Select existing `Device-Stack-827x1024.png` from media library
  3. Save/Update the page to trigger Yoast's indexable update
- **Resolves:** OI-05

**Verification:** Page created in WordPress. Visible in Pages list at `wp-admin/edit.php?post_type=page` with status "Draft".

**Output:** New page ID recorded.

---

## Step 4: Preview and Verify Draft

**Purpose:** Confirm the draft page renders correctly before going live.

### 4.1 — Get preview URL
- Use the `preview_link` field from the Step 3.5 API response — it includes a nonce and is valid for ~48 hours
- Do NOT manually construct the URL — draft previews require authentication
- MaDonna must be logged into WordPress to view the preview (she has admin access)

### 4.2 — Visual verification checklist
Verify each acceptance criterion from SPEC.md (AC-03):

| Check | Section | What to verify |
|-------|---------|---------------|
| 1 | Nav | Sticky, all 5 links work, hamburger on mobile |
| 2 | Hero | Map image loads, CTA button links to /contact/ |
| 3 | Value prop | MaDonna's copy renders |
| 4 | Social proof | 10 logos visible, slider animates |
| 5 | Packages | 5 cards, Sig Plus + Optimize show 120M, New badge on Optimize |
| 6 | CTA band | "Let's get started today!" with button |
| 7 | Optimize heading | "Meet Brandpoint Optimize" in consistent font, "Optimize" orange |
| 8 | Feature cards | 4 cards with numbered badges |
| 9 | Quote 1 | Agency Leader ROI quote |
| 10 | Gauge | AI Visibility donut animates on scroll |
| 11 | Quote 2 | Digital Strategy Leader quote |
| 12 | Customizations | 3 rows with real images, alternating layout |
| 13 | Publisher reel | 16 logos scrolling |
| 14 | Case study | CooperVision image + text |
| 15 | Final CTA | Navy background, orange button |
| 16 | Footer | Logo (white via CSS filter), address, LinkedIn only |
| 17 | Scroll reveals | Elements fade in on scroll |
| 18 | Mobile | Test at 768px and 480px widths |
| 19 | No Elementor | View source — no `elementor-widget` classes in output |

### 4.3 — Fix any issues
- If issues found, update content via `PUT /wp-json/wp/v2/pages/{id}` and re-verify

### 4.4 — MaDonna review gate
- **STOP HERE** — Send preview URL to MaDonna for approval
- Do NOT proceed to Step 5 until MaDonna approves

**Verification:** All 19 visual checks pass. MaDonna approves.

---

## Step 5: Go Live

**Purpose:** Swap the homepage and verify production.

### 5.1 — Publish the page
- ```
  PUT /wp-json/wp/v2/pages/{new_page_id}
  { "status": "publish" }
  ```

### 5.2 — Spot-check published page before front-page swap
- Visit `https://www.brandpoint.com/homepage-2026/` (the published page at its slug, NOT yet the front page)
- Verify it renders correctly — images load, CSS applied, JS works
- **Fail condition:** If rendering issues found, revert to draft (`PUT {id} {"status": "draft"}`) and fix before retrying. Do NOT proceed to 5.3.

### 5.3 — Set as front page
- ```
  PUT /wp-json/wp/v2/settings
  { "show_on_front": "page", "page_on_front": {new_page_id} }
  ```
- Verify: `GET /wp-json/wp/v2/settings` confirms both `show_on_front === "page"` and `page_on_front === {new_page_id}`

### 5.4 — Verify production
- Visit `https://www.brandpoint.com/` in a browser
- Confirm new homepage is serving
- Run through visual checklist from Step 4.2 again on production

### 5.5 — Verify old homepage is preserved
- Visit `https://www.brandpoint.com/brandpoint-jk-draft-6-24/` (old page slug)
- Confirm old homepage still renders

### 5.6 — Document rollback command
- Save the rollback command (do NOT execute unless needed):
  ```
  PUT /wp-json/wp/v2/settings
  { "show_on_front": "page", "page_on_front": 39965 }
  ```
- Confirm this is saved in the deployment docs for emergency use

**Verification:** `www.brandpoint.com` serves the new homepage. Old homepage accessible at its slug. Rollback command documented.

---

## Rollback Procedure

If anything goes wrong after Step 5, execute:

```bash
source .wp-credentials.env
curl -sL -X PUT "$WP_SITE/wp-json/wp/v2/settings" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"show_on_front": "page", "page_on_front": 39965}'
```

This instantly restores the old homepage. The new page remains as a published page but is no longer the front page.
