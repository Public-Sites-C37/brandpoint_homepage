# TESTS.md — Brandpoint Product Landing Page Verification Plan

No automated test runner exists for this project (static HTML site). This document defines manual verification checklists and browser-based testing procedures mapped to each acceptance criterion in SPEC.md.

---

## Test Environment

- **Browsers:** Chrome (latest), Firefox (latest), Safari (latest)
- **Viewports:** 1440px (desktop), 1024px (tablet landscape), 768px (tablet portrait), 375px (mobile)
- **Tools:** Browser DevTools, W3C HTML Validator, manual inspection
- **WordPress environment:** brandpoint.com WP admin (MaDonna has granted access)

---

## T-01: Section Order & Completeness (→ AC-01)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 1.1 | Load page, scroll top to bottom | All 8 sections visible in order: Hero → Social Proof Bar → Distribution Packages → Thin CTA Band → Meet Brandpoint Optimize (with sub-sections 5a: Feature Cards, 5b: AI Visibility Score, 5c: Client Quote) → Campaign Customizations → Case Study → Final CTA | |
| 1.2 | No missing sections | Count exactly 8 major sections; SEC-05 contains 3 distinct sub-sections | |
| 1.3 | No extra/unspecified sections | Nothing beyond what SPEC defines | |

## T-02: CTA Link Audit (→ AC-02)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 2.1 | Hero "Request a Demo" button | href = `https://www.brandpoint.com/contact/` (full URL with protocol) | |
| 2.2 | Thin CTA Band "Contact Us" button | href = `https://www.brandpoint.com/contact/` | |
| 2.3 | AI Visibility "Request a demo" bubble (SEC-05b) | href = `https://www.brandpoint.com/contact/` | |
| 2.4 | Final CTA "Let's get started!" button | href = `https://www.brandpoint.com/contact/` | |
| 2.5 | Case study "Read about their campaign" link | href = `https://www.brandpoint.com/case-studies/coopervision/` | |
| 2.6 | Inspect all `<a>` elements with CTA/button classes | No CTA points to wrong destination; all use full URL with `https://www.` | |

## T-03: Distribution Packages — Semantic HTML (→ AC-03)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 3.1 | View page source for SEC-03 | Package names in `<h3>` tags, features in `<ul>`/`<li>` tags, prices in elements with `.bp-price` class — NOT inside `<img>` | |
| 3.2 | Select all text in package grid | All text is selectable with cursor | |
| 3.3 | Disable images (DevTools → Network → Block images) | All package information still visible as text | |
| 3.4 | Count package columns at 1440px | Exactly 5 packages displayed | |
| 3.5 | Verify package names | Signature, Signature Plus, Optimize, Pharma, Regional | |
| 3.6 | Verify badges | "MOST POPULAR" on Signature Plus, "NEW" on Optimize | |
| 3.7 | View page source, search for package text | Package names and feature text appear in raw HTML (confirms crawlability) | |

## T-04: Typography (→ AC-04)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 4.1 | DevTools → Computed Styles on H1 | font-family includes "Inter" | |
| 4.2 | DevTools → Computed Styles on body text | font-family includes "Inter" | |
| 4.3 | DevTools → Computed Styles on CTA buttons | font-family includes "Inter" | |
| 4.4 | DevTools → Computed Styles on SEC-06 Row 3 caption | font-family includes "Inter" (MaDonna specifically requested this) | |
| 4.5 | Network tab | Google Fonts request for Inter loads successfully (200) | |
| 4.6 | Disable network, reload | Font fallback is reasonable sans-serif | |

## T-05: Color Palette (→ AC-05)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 5.1 | Hero background | Navy (`#1B2541` or close variant) | |
| 5.2 | CTA buttons | Orange/coral (`#E8632B` or close variant) | |
| 5.3 | "MOST POPULAR" / "NEW" badges | Orange (`#E8632B`) | |
| 5.4 | AI Visibility gauge accent | Teal (`#2A8F7D` or close variant) | |
| 5.5 | Card backgrounds | White (`#FFFFFF`) | |
| 5.6 | Alternating section backgrounds | Light gray (`#F5F5F5`) and white | |
| 5.7 | Primary body text color | Dark (`#333333` or close variant) | |
| 5.8 | Secondary/caption text color | Light (`#666666` or close variant) | |
| 5.9 | MaDonna brand review | MaDonna confirms visual feel matches Optimize One-Pager and Distribution Guide (approval gate, not automated check) | |

## T-06: Logo Slider (→ AC-06)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 6.1 | Social proof section loads | Slider container visible | |
| 6.2 | Logos auto-scroll | Continuous horizontal scrolling animation | |
| 6.3 | Slider loops seamlessly | No gap/jump when restarting | |

## T-07: Responsive Design (→ AC-07)

**Note:** Specific column counts below are implementation expectations derived from the grid layouts specified in SPEC. The SPEC requires "renders correctly" — these checks define what "correctly" means at each breakpoint.

### 1440px (Desktop)
| # | Check | Expected | Pass? |
|---|---|---|---|
| 7.1 | Hero | 2 columns side by side | |
| 7.2 | Packages | 5 columns | |
| 7.3 | Optimize cards (SEC-05a) | 4 columns | |
| 7.4 | AI Visibility Score (SEC-05b) | 2 columns | |
| 7.5 | Customizations | 2 columns per mini section, alternating sides | |
| 7.6 | No horizontal scroll | Page fits viewport width | |

### 1024px (Tablet Landscape)
| # | Check | Expected | Pass? |
|---|---|---|---|
| 7.7 | Packages | 3 columns (wrapping to second row) | |
| 7.8 | All text readable | No truncation or overflow | |

### 768px (Tablet Portrait)
| # | Check | Expected | Pass? |
|---|---|---|---|
| 7.9 | Hero | Stacked (single column) | |
| 7.10 | Packages | 2 columns | |
| 7.11 | Optimize cards | 2 columns | |
| 7.12 | Customizations | Stacked single column | |

### 375px (Mobile)
| # | Check | Expected | Pass? |
|---|---|---|---|
| 7.13 | All sections | Single column | |
| 7.14 | CTA buttons | Full width, easily tappable (min 44px height) | |
| 7.15 | Font sizes | Readable without zooming | |
| 7.16 | No horizontal scroll | Page fits viewport width | |

## T-08: WordPress Compatibility (→ AC-08)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 8.1 | Copy `index.html` body content into WP HTML editor on brandpoint.com | Renders without breaking | |
| 8.2 | Include `<style>` block or linked CSS | Styles apply correctly in WP context | |
| 8.3 | No JS framework dependencies | Only vanilla JS (if any); no React/Vue/etc imports | |
| 8.4 | CSS classes are namespaced | All classes prefixed `bp-landing-` | |
| 8.5 | No conflicts with brandpoint.com theme | Page renders correctly within existing site header/footer | |

## T-09: Copy Accuracy (→ AC-09)

| # | Section | Verbatim Copy to Verify | Pass? |
|---|---|---|---|
| 9.1 | Hero eyebrow | "Strategic Distribution Solutions" | |
| 9.2 | Hero title (H1) | "Premium paid placements. Earned editorial coverage. Measurable AI visibility." | |
| 9.3 | Hero CTA button | "Request a Demo" | |
| 9.4 | Social proof H2 | "Trusted by the nation's top brands and agencies" | |
| 9.5 | Packages H2 | "Distribution Packages" | |
| 9.6 | Packages sub-copy | "Built for how audiences find brands today" | |
| 9.7 | All 5 package names | Signature, Signature Plus, Optimize, Pharma, Regional | |
| 9.8 | Signature features | "Paid media placements on national publisher network", "Over 800 placements", "Site audience over 90M", "Article creation and/or editorial review", "Paid media placement report with site audience metrics" | |
| 9.9 | Signature Plus features | All Signature features PLUS: "5 premium outlets include: LA Times, Chicago Tribune, NY Daily News, Boston Herald, Miami Herald" | |
| 9.10 | Optimize features | All Sig Plus features PLUS: "Companion distribution article", "Earned media promotion", "AI Visibility Report", "Predictive brand visibility insights & recommendations" | |
| 9.11 | Pharma features | "Paid media placements on national publisher network", "130 ISI pharma-compliant placements", "Site audience over 100M", "Article creation and/or editorial review", "Paid media placement report with site audience metrics", "5 premium outlets include: LA Times, Chicago Tribune, NY Daily News, Boston Herald, Miami Herald" | |
| 9.12 | Regional features | "Paid media placements on national publisher network", "Placement quantity varies by region targeted", "Site audience varies by region targeted", "Article creation and/or editorial review", "Paid media placement report with site audience metrics", "Targeted distribution by region(s) or state(s)", "Single region or state options available" | |
| 9.13 | Package badges | "MOST POPULAR" on Signature Plus, "NEW" on Optimize | |
| 9.14 | Thin CTA text | "Let's get started today!" | |
| 9.15 | Thin CTA button | "Contact Us" | |
| 9.16 | Optimize H2 | "Meet Brandpoint Optimize" (with logo treatment, not just text) | |
| 9.17 | Feature card 01 | **Human-Written Branded Content** / "Optimized for AI discovery" | |
| 9.18 | Feature card 02 | **Signature Plus Network Distribution** / "Two distributions for one article" | |
| 9.19 | Feature card 03 | **Earned Media** / "Promoted to thousands of publishers" | |
| 9.20 | Feature card 04 | **Placement & AI Visibility Report** / "Measurable paid & earned placement results" | |
| 9.21 | AI Visibility title | "Measure your AI Visibility over time" | |
| 9.22 | AI Visibility copy | "Measure the impact your campaign has on your brand visibility in AI with an all new, predictive report – only available with Brandpoint Optimize" | |
| 9.23 | AI Visibility CTA | "Request a demo" | |
| 9.24 | Client quote | "We're constantly being asked by our clients, 'what's the ROI?' Now we can show that in a much more quantitative, data-driven way." — Agency Leader | |
| 9.25 | Customizations H2 | "Customize your campaign to meet your brand's goals" | |
| 9.26 | Customizations sub-copy | "Add these additional awareness options to amplify your content even further" | |
| 9.27 | Customization Row 1 title | "Specialty Publications" | |
| 9.28 | Customization Row 1 copy | "Add placement on USATODAY.com, APNews.com or the Business Journals for additional reach, credibility and site audience." | |
| 9.29 | Customization Row 2 title | "Specialty Formats" | |
| 9.30 | Customization Row 2 copy | "Diversify the type of content you distribute based on your audience and brand, including infographics, video and print placement" | |
| 9.31 | Customization Row 3 title | "Amplification and Audience Engagement" | |
| 9.32 | Customization Row 3 copy | "Drive even more targeted audiences to your content through native ad campaigns and Spanish language options" | |
| 9.33 | Case study H2 | "See our work in action" | |
| 9.34 | Case study copy | "Combining distribution on Brandpoint's publisher network with native ad campaigns on top sites led to 1.3 million impressions and over 1000 placements for CooperVision" | |
| 9.35 | Final CTA copy | "Ready to get your brand in front of millions? We can't wait to hear about your goals." | |
| 9.36 | Final CTA button | "Let's get started!" | |

## T-10: AI Visibility Gauge (→ AC-10)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 10.1 | Gauge renders | Donut/ring chart visible displaying 71.6% | |
| 10.2 | Header spelling | "AI VISIBILITY QUALITY SCORE" — not "QUALTIY" | |
| 10.3 | Sub-header | "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking" | |
| 10.4 | Primary metrics | Monitoring Start: 69.5, Current Score: 71.6 | |
| 10.5 | Sub-metrics | Since Day 1: +2.1, Last 7 Days: -0.2, Highest Score Achieved: 72.8% - Jan 14, Change From Peak: -1.2 | |
| 10.6 | Data date | "Data through: Jan 08 2026" | |
| 10.7 | Implementation type | CSS or SVG — not a raster image (PNG/JPG). Verify via DevTools Elements panel. | |
| 10.8 | Visual polish | Gauge is contained within a styled frame (border-radius, shadow, or border); centered in its column; adequate padding. MaDonna approval gate for "pretty" assessment. | |

## T-11: Map Graphic (→ AC-11)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 11.1 | Map renders in hero | US map visible on right side of hero section | |
| 11.2 | Brand colors applied | Navy/orange/teal palette — not the old blue outline style | |
| 11.3 | Publication markers | Chicago Tribune (near Chicago), Boston Herald (near Boston), NY Daily News (near NYC), Los Angeles Times (near LA), Miami Herald (near Miami) — all labeled and geographically correct | |
| 11.4 | Caption present | "Top sites on our distribution network" or similar | |
| 11.5 | Format | SVG (scalable, no pixelation at any viewport) | |

## T-12: Editability (→ AC-12)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 12.1 | Open HTML in text editor | All text content is immediately findable and editable | |
| 12.2 | Class names are readable | All classes use `bp-landing-` prefix; no minified/hashed names | |
| 12.3 | Change a heading in source | Change is reflected when reloading | |
| 12.4 | Structure is logical | Sections clearly delineated with HTML comments | |
| 12.5 | CSS is organized | Properties grouped by section with comments; colors use CSS custom properties (easy to modify in one place) | |

## T-13: Pricing Editability (→ AC-13)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 13.1 | Price elements identifiable | All price values are wrapped in elements with `.bp-price` class | |
| 13.2 | Prices easily findable | Search HTML for "bp-price" — all 5 package prices found | |
| 13.3 | Price removal test | Delete all `.bp-price` elements; page layout remains intact without gaps | |
| 13.4 | Price update test | Change a price value in source; renders correctly after reload | |

## T-14: Placeholder Assets (→ Constraint 4)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 14.1 | All images have alt text | Every `<img>` has a descriptive `alt` attribute | |
| 14.2 | Placeholders are identifiable | Placeholder images have alt text starting with "Placeholder:" | |
| 14.3 | No broken images | Zero broken image icons on page at any viewport | |

## T-15: SEC-05 Sub-section Structure

| # | Check | Expected | Pass? |
|---|---|---|---|
| 15.1 | SEC-05 contains 3 distinct sub-sections | 5a (4 feature cards), 5b (AI Visibility 2-column), 5c (client quote) all present and visually distinct | |
| 15.2 | SEC-05b is 2-column layout at desktop | Gauge on left, copy on right at 1440px | |
| 15.3 | SEC-05b stacks at mobile | Single column at 375px | |

## T-16: SEC-06 Alternating Layout

| # | Check | Expected | Pass? |
|---|---|---|---|
| 16.1 | Row 1 | Text on LEFT, logos on RIGHT | |
| 16.2 | Row 2 | Imagery on LEFT, text on RIGHT | |
| 16.3 | Row 3 | Text on LEFT, imagery on RIGHT | |
| 16.4 | Alternation pattern | Columns swap sides between rows 1→2 and stay for 2→3 (as specified in SPEC SEC-06 table) | |

---

## Supplementary Checks (Not Mapped to ACs)

These are best-practice checks not tied to formal acceptance criteria. Failures here are informational, not blocking.

| # | Check | Expected |
|---|---|---|
| S-1 | Lighthouse Performance | > 90 (target, not hard requirement) |
| S-2 | Lighthouse Accessibility | > 90 |
| S-3 | Lighthouse Best Practices | > 90 |
| S-4 | Lighthouse SEO | > 90 |
| S-5 | HTML validation | W3C validator passes with no errors |
| S-6 | Heading hierarchy | Single H1, logical H2/H3 nesting |
| S-7 | Meta description | Present and descriptive of page content |

---

## Post-Deployment Smoke Test

After pasting into WordPress at `brandpoint.com/distribution-solutions`:
1. Load page in incognito browser — confirm full render
2. Click every CTA button — confirm all go to contact page
3. Click case study link — confirm goes to CooperVision page
4. View on actual mobile device — confirm responsive layout
5. **(Long-term, not immediate):** After Google indexes the page, search `site:brandpoint.com distribution packages` — confirm package text appears in search results (validates SEO/crawlability goal)
