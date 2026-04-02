# TESTS.md — Verification Checklist for WordPress Deployment

## Test Suite 1: Environment Validation (Step 1)

### T1.1 — API Authentication
- [ ] `GET /wp-json/wp/v2/users/me` returns user 78 (jtrippel)
- [ ] Response includes admin-level capabilities

### T1.2 — Style/Script/SVG Tag Preservation
- [ ] Create test page with `<style>body{color:red}</style>` in content
- [ ] Retrieve page via API (`context=edit`) — `<style>` tag present in raw content
- [ ] Create test page with `<script>console.log('ok')</script>` in content
- [ ] Retrieve page via API — `<script>` tag present in raw content
- [ ] Create test page with inline `<svg>` element in content
- [ ] Retrieve page via API — `<svg>` tag present in raw content (needed for LinkedIn footer icon)
- [ ] Delete test page

### T1.3 — Elementor Canvas Template
- [ ] Create test page with `template: "elementor_canvas"`
- [ ] Preview renders content without theme header/footer
- [ ] No Elementor widget wrapper divs in rendered HTML
- [ ] No Elementor CSS/JS loaded in page source (beyond minimal theme styles)
- [ ] Delete test page

### T1.4 — Google Fonts Link Tag
- [ ] `<link>` tag for Google Fonts survives in page content
- [ ] Inter font loads on the preview page
- [ ] If `<link>` stripped: `@import` fallback works inside `<style>` block

---

## Test Suite 2: Image Uploads (Step 2)

### T2.1 — Upload Success
- [ ] All images in `assets/images/` uploaded (4 files — distribution-map.png, native-ads.png, see-our-work.png, specialty-formats.png; `bpt-optimize-logo.png` excluded — no longer referenced in HTML)
- [ ] `assets/logos/brandpoint-logo.png` uploaded
- [ ] All 16 images in `assets/logos/outlets/` uploaded
- [ ] All 10 images in `assets/logos/pr-agency/` uploaded
- [ ] All 3 images in `assets/logos/specialty/` uploaded
- [ ] Each upload returned a valid `source_url`

### T2.2 — Image Accessibility
- [ ] Spot-check: `distribution-map.png` WordPress URL loads in browser (200 OK)
- [ ] Spot-check: `brandpoint-logo.png` WordPress URL loads in browser (200 OK)
- [ ] Spot-check: one outlet logo WordPress URL loads in browser (200 OK)

### T2.3 — Image Map Completeness
- [ ] `image-map.json` contains entries for all 34 images
- [ ] Every `src="assets/..."` path in `index.html` has a corresponding entry in the map
- [ ] No local paths remain unmapped

---

## Test Suite 3: Page Content Assembly (Step 3)

### T3.1 — Content Structure
- [ ] Content starts with Google Fonts `<link>` tag
- [ ] `<style>` block contains full `css/styles.css` contents
- [ ] HTML sections present: nav, hero, value-prop, social-proof, packages, cta-band, optimize, customizations, publisher-network, case-study, final-cta, footer
- [ ] `<script>` block contains full `js/main.js` contents
- [ ] No `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` wrapper tags
- [ ] No `<script src="js/main.js">` external reference (JS is inlined)
- [ ] No `<link rel="stylesheet" href="css/styles.css">` external reference (CSS is inlined)

### T3.2 — Image Path Rewriting
- [ ] Zero occurrences of `src="assets/` in final content
- [ ] All image `src` attributes point to `https://www.brandpoint.com/wp-content/uploads/...`
- [ ] Nav logo `src` rewritten
- [ ] Footer logo `src` rewritten
- [ ] All 10 PR agency logos `src` rewritten (x2 for duplicated slider)
- [ ] All 16 outlet logos `src` rewritten (x2 for duplicated slider)
- [ ] All 3 specialty logos `src` rewritten
- [ ] Distribution map `src` rewritten
- [ ] Native ads, specialty formats, see-our-work images `src` rewritten

### T3.3 — Page Created in WordPress
- [ ] `POST /wp-json/wp/v2/pages` returns 201 with new page ID
- [ ] Page title: "Brandpoint Homepage 2026"
- [ ] Page status: "draft"
- [ ] Page template: "elementor_canvas"
- [ ] Page slug: "homepage-2026"

### T3.4 — Yoast SEO Metadata (manual — set during Step 4.4)
- [ ] Yoast REST API is read-only — SEO fields set manually in wp-admin, not via API
- [ ] SEO title set in Yoast panel: "Brandpoint | Premium Content Distribution & AI Visibility Solutions"
- [ ] Meta description set in Yoast panel: correct description
- [ ] OG image set in Yoast panel: existing `Device-Stack-827x1024.png` from media library
- [ ] Page saved in wp-admin to trigger Yoast indexable update

---

## Test Suite 4: Draft Preview Verification (Step 4)

### T4.1 — Navigation
- [ ] Sticky nav renders at top of page
- [ ] Brandpoint logo visible in nav
- [ ] "Who We Are" link → `https://www.brandpoint.com/who-we-are/`
- [ ] "Who We Work With" link → `https://www.brandpoint.com/who-we-work-with/`
- [ ] "Blog" link → `https://www.brandpoint.com/blog/`
- [ ] "Editorial Content Library" link → `https://www.brandpointcontent.com`
- [ ] "Contact Us" button → `https://www.brandpoint.com/contact/`
- [ ] Nav gets scroll shadow on scroll
- [ ] Hamburger menu works at 768px width

### T4.2 — Hero Section
- [ ] Eyebrow text: "Strategic Distribution Solutions"
- [ ] H1 renders with line breaks
- [ ] Distribution map image loads
- [ ] "Request a Demo" button links to `/contact/`

### T4.3 — Value Proposition
- [ ] MaDonna's copy renders (not lorem ipsum)

### T4.4 — Social Proof
- [ ] "Trusted by top brands and 90% of the nation's top PR agencies" heading
- [ ] 10 PR agency logos visible
- [ ] Logos scroll/animate continuously
- [ ] Edge fade effect on slider

### T4.5 — Distribution Packages
- [ ] 5 package cards: Signature, Signature Plus, Optimize, Pharma, Regional
- [ ] Signature Plus: "Site audience over 120M" (not 90M)
- [ ] Optimize: "Site audience over 120M" (not 90M)
- [ ] Optimize card: orange accent border, "New" badge, gradient top bar
- [ ] Optimize card: 4 highlighted features in bold with orange bullets

### T4.6 — CTA Band
- [ ] "Let's get started today!" text
- [ ] "Contact Us" button links to `/contact/`

### T4.7 — Meet Brandpoint Optimize
- [ ] Heading: "Meet Brandpoint Optimize" — all same font, "Optimize" in orange
- [ ] No logo image — pure text heading
- [ ] 4 feature cards with numbered badges (01-04)

### T4.8 — Quotes
- [ ] Quote before gauge (between feature cards and AI Visibility section): Agency Leader — "We're constantly being asked by our clients, 'what's the ROI?' Now we can show that in a much more quantitative, data-driven way."
- [ ] Quote after gauge (after AI Visibility section): Digital Strategy Leader — "This report gives me agency what to do next."

### T4.9 — AI Visibility Gauge
- [ ] Gauge card renders with teal accent bar
- [ ] Donut chart shows 71.6%
- [ ] Donut starts at 0% when off-screen, then fill-animates to 71.6% when scrolled into viewport (verify by scrolling to section — not just checking final state)
- [ ] Sub-metrics: Since Day 1 (+2.1), Last 7 Days (down 0.2), Highest Score Achieved (72.8% - Jan 14), Change From Peak (down 1.2)
- [ ] "Request a demo" pill button

### T4.10 — Campaign Customizations
- [ ] 3 alternating rows
- [ ] Row 1: Specialty Publications text + AP/USA Today/Business Journals logos
- [ ] Row 2: Specialty Formats image + text (reversed layout)
- [ ] Row 3: "Amplification and Audience Engagement" heading + Native Ads image + copy mentioning native ad campaigns and Spanish language options

### T4.11 — Publisher Network Reel
- [ ] "Premium Publisher Network" heading
- [ ] 16 outlet logos visible and scrolling
- [ ] Scroll speed slower than PR agency slider (40s vs 25s)

### T4.12 — Case Study
- [ ] CooperVision image on left
- [ ] "See our work in action" heading
- [ ] "Read about their campaign" outline button → `/case-studies/coopervision/`

### T4.13 — Final CTA
- [ ] Navy gradient background
- [ ] "Ready to get your brand in front of millions?"
- [ ] "Let's get started!" orange button → `/contact/`

### T4.14 — Footer
- [ ] Brandpoint logo (white via CSS filter)
- [ ] "An ARAnet Company" with link
- [ ] Address: 850 5th St S, Hopkins, MN 55343
- [ ] Phone and email
- [ ] Links column: Careers, Blog, Free Resources, Contact Us, Editorial Content, Privacy Policy
- [ ] Social: LinkedIn ONLY (no Facebook, X, YouTube)
- [ ] Bottom bar: "Founded in 1996. Independently owned." + copyright + privacy links

### T4.15 — Scroll Reveal Animations
- [ ] Elements below fold start hidden (opacity 0)
- [ ] Elements fade in and slide up when scrolled into view
- [ ] Staggered delays on grouped elements (cards, features)
- [ ] Content visible by default if JS fails (progressive enhancement)

### T4.16 — Mobile Responsiveness
- [ ] At 768px: hamburger nav, single-column hero, 2-column packages, stacked customization rows
- [ ] At 480px: single-column packages, single-column optimize cards, full-width CTA button

### T4.17 — No Elementor Contamination
- [ ] View page source — no `elementor-widget` classes
- [ ] No `elementor-element` wrappers around content
- [ ] No Elementor CSS/JS loaded (beyond minimal theme styles)

---

## Test Suite 5: Go Live Verification (Step 5)

### T5.1 — Published Page Spot-Check (before front-page swap)
- [ ] Page published via API — status changed to "publish"
- [ ] Visit `https://www.brandpoint.com/homepage-2026/` (published at slug, NOT yet front page)
- [ ] Page renders correctly — images load, CSS applied, JS works
- [ ] If broken: revert to draft and fix before proceeding

### T5.2 — Homepage Swap
- [ ] `PUT /wp-json/wp/v2/settings` with `show_on_front: "page"` and `page_on_front: {new_id}` returns 200
- [ ] `GET /wp-json/wp/v2/settings` confirms `show_on_front === "page"` AND `page_on_front === {new_id}`

### T5.3 — Production Verification
- [ ] `https://www.brandpoint.com/` serves the new homepage
- [ ] All Test Suite 4 checks pass on production URL
- [ ] Page loads in under 5 seconds

### T5.4 — Old Homepage Preserved
- [ ] `https://www.brandpoint.com/brandpoint-jk-draft-6-24/` serves the old homepage
- [ ] Old homepage content unchanged

### T5.5 — SEO Verification
- [ ] View source: `<title>` tag contains Yoast SEO title
- [ ] View source: `<meta name="description">` contains Yoast description
- [ ] View source: `<meta property="og:title">` present
- [ ] View source: `<meta property="og:description">` present
- [ ] View source: `<meta property="og:image">` present and URL resolves

### T5.6 — Rollback Readiness
- [ ] Rollback command documented: `PUT /wp-json/wp/v2/settings {"show_on_front": "page", "page_on_front": 39965}`
- [ ] Command is syntactically verified and saved in deployment docs for emergency use
