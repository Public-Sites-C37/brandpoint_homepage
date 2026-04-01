# brandpoint.com — WordPress Site Audit for API Integration

**Audited:** 2026-04-01

## REST API Status: ACCESSIBLE

`GET https://brandpoint.com/wp-json/wp/v2/pages` returns 200 with JSON.
Note: redirects from `brandpoint.com` to `www.brandpoint.com` (301), then serves JSON.

## Current Homepage

| Field | Value |
|-------|-------|
| **Page ID** | `39965` |
| **Title** | Brandpoint Home 2025 |
| **Slug** | `brandpoint-jk-draft-6-24` |
| **Status** | publish |
| **Template** | (default) |
| **Link** | `https://www.brandpoint.com/` |
| **Content size** | 95,209 characters |
| **Page builder** | **None** — raw HTML in `post_content` |

This is the best-case scenario for API integration. The page uses standard WordPress content (no Elementor/Divi/WPBakery), so we can push raw HTML directly via the REST API `content` field.

## Yoast SEO: ACTIVE

| Field | Current Value |
|-------|---------------|
| SEO Title | Branded Content & Promotion \| Brandpoint |
| Meta Description | Brandpoint is a full-service branded content solution agency that helps brands d... |

Yoast head JSON is exposed in API responses (`yoast_head_json` field), confirming REST API meta field support.

## All Published Pages

| ID | Slug | Title | URL |
|----|------|-------|-----|
| 39965 | brandpoint-jk-draft-6-24 | **Brandpoint Home 2025** | `https://www.brandpoint.com/` |
| 40541 | contact | Contact | `/contact/` |
| 40512 | who-we-work-with | Who We Work With | `/who-we-work-with/` |
| 40503 | who-we-are | Who We Are | `/who-we-are/` |
| 40270 | news | News | `/news/` |
| 38498 | resources | 2024 Resources – Content Promotion | `/solutions/resources/` |
| 38448 | blog | Brandpoint Blog | `/blog/` |
| 37636 | privacy-notice-california | Privacy Notice – California | `/privacy-notice-california/` |
| 21671 | privacy | Privacy | `/privacy/` |
| 40825 | chicago2025-signin | Chicago 2025 Sign In | `/chicago2025-signin/` |
| 40822 | thank-you-marquardt | Thank you for meeting with me! | `/thank-you-marquardt/` |
| 40799 | thank-you-chicago | Thank you, Chicago! | `/thank-you-chicago/` |
| 40235 | post-event-information | Post-Event Information | `/post-event-information/` |
| 19812 | sign-up | Blog Subscription | `/blogg/sign-up/` |
| 15432 | resource-download | Thank You – Resource Download | `/resource-download/` |
| 15410 | ebook-download | Thank You – Download eBook | `/ebook-download/` |
| 14906 | thank-you | Thank you | `/contact-us/thank-you/` |

## Deployment Plan

To replace the homepage with our new design:

1. **Upload all images** to WordPress media library via REST API
2. **Extract page body content** from `index.html` (sections only — WordPress theme provides nav/footer, OR we include our own nav/footer and use a blank template)
3. **Update page 39965** with new HTML content via `PUT /wp-json/wp/v2/pages/39965`
4. **Update Yoast SEO meta** in the same API call
5. **Enqueue CSS/JS** — either inline in the content, or upload as media and reference

### Key Question: Nav/Footer Strategy

The current brandpoint.com has its own WordPress theme nav and footer. Our landing page includes custom nav and footer. Two options:

**Option A: Use WordPress theme nav/footer**
- Strip our `<header>` and `<footer>` from the HTML
- Push only the section content (hero through final CTA)
- Relies on WordPress theme for consistent nav/footer across site
- Simpler, more maintainable

**Option B: Full custom page (blank template)**
- Use a blank/full-width page template
- Push our complete HTML including nav and footer
- Requires a custom WordPress template (e.g., `template-blank.php`)
- Gives us full control but diverges from rest of site

**Recommendation:** Discuss with MaDonna which approach she prefers. If this IS the new homepage, Option A (using WP theme nav/footer) keeps the site consistent. If she wants pixel-perfect control, Option B with a blank template.

### CSS/JS Delivery

Options for including our custom CSS and JS:

1. **Inline in content** — Wrap CSS in `<style>` tags and JS in `<script>` tags within the page content. WordPress may strip these depending on the user role and editor settings.

2. **Upload as media files** — Upload `styles.css` and `main.js` to the media library, then reference them in the HTML with `<link>` and `<script>` tags pointing to the WordPress media URLs.

3. **Child theme** — Add our CSS/JS to the WordPress theme's child theme directory and enqueue them for the homepage template only.

4. **Plugin** — Create a simple WordPress plugin that enqueues our CSS/JS only on the homepage.

**Recommendation:** Option 2 (upload as media) is the simplest and doesn't require theme/plugin access.
