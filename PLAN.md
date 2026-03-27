# PLAN.md — Brandpoint Product Landing Page Implementation

## Prerequisites

- SPEC.md approved by Jake
- Open items (OI-01 through OI-08) resolved or deferred with documented defaults
- Default assumption for OI-01: include prices with `bp-price` CSS class for easy removal

---

## Phase 1: Project Scaffolding & Asset Creation

### Step 1.1 — Create directory structure
- **Files:** `css/`, `assets/`, `assets/logos/`, `assets/images/`, `js/`
- **Outcome:** Empty directory tree ready for assets and code
- **Verify:** `ls -R` shows all directories

### Step 1.2 — Create base HTML skeleton
- **File:** `index.html`
- **Changes:** HTML5 boilerplate, Google Fonts (Inter) link, CSS/JS references, meta tags (viewport, description, OG tags for social sharing), 8 empty `<section>` elements with IDs matching SEC-01 through SEC-08
- **Outcome:** Valid HTML5 page loads in browser with correct font, empty sections visible
- **Verify:** W3C HTML validator passes; Inter font request returns 200 in Network tab

### Step 1.3 — Create base stylesheet with CSS custom properties and namespacing convention
- **File:** `css/styles.css`
- **Changes:** CSS reset/normalize, **all classes prefixed with `bp-landing-`** (established now, not retrofitted later), custom properties for all brand colors (`--bp-navy: #1B2541`, `--bp-orange: #E8632B`, `--bp-teal: #2A8F7D`, `--bp-gray-bg: #F5F5F5`, `--bp-white: #FFFFFF`, `--bp-text-dark: #333333`, `--bp-text-light: #666666`), base typography (Inter), container widths (max-width: 1200px centered), section spacing, button base styles
- **Outcome:** Consistent design tokens available, namespacing established, base layout visible
- **Verify:** Inspect computed styles — all custom properties resolve correctly; all class names begin with `bp-landing-`

### Step 1.4 — Create `js/main.js` base file
- **File:** `js/main.js`
- **Changes:** Empty module with placeholder for logo slider functionality
- **Outcome:** JS file exists and loads without errors
- **Verify:** No console errors on page load

### Step 1.5 — Create SVG map graphic for hero
- **File:** `assets/images/distribution-map.svg`
- **Changes:** Stylized US map with publication location markers (Chicago Tribune near Chicago, Boston Herald near Boston, NY Daily News near NYC, Los Angeles Times near LA, Miami Herald near Miami) in brand colors. Caption: "Top sites on our distribution network"
- **Outcome:** Clean SVG matching new style guide (navy/orange/teal palette, not the old blue outline)
- **Verify:** Renders at multiple sizes without distortion; brand colors match CSS custom properties; all 5 publications labeled at correct geographic locations

### Step 1.6 — Create CSS/SVG AI Visibility gauge
- **Implementation:** CSS-only donut gauge built inline in HTML (not a separate SVG file) for easier editing
- **Details:** 71.6% score, header "AI VISIBILITY QUALITY SCORE", sub-header "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking", Monitoring Start 69.5 → Current Score 71.6, sub-metrics (Since Day 1: +2.1, Last 7 Days: -0.2, Highest: 72.8% Jan 14, Change From Peak: -1.2), Data through Jan 08 2026
- **Outcome:** Polished, framed gauge matching the brief screenshot but with correct "QUALITY" spelling
- **Verify:** "QUALITY" spelled correctly; all numbers match; gauge is CSS/SVG not a raster image; visually polished (border-radius, box-shadow, centered in container, padding)

### Step 1.7 — Create placeholder logos and imagery
- **Files:** `assets/logos/` directory
- **Changes:** Placeholder SVGs for: publication logos (USA Today, AP News, Business Journals), brand slider logos (sourced from brandpoint.com/who-we-work-with), format illustrations (print/video/infographic). All placeholders include alt text indicating "placeholder — replace with actual asset"
- **Outcome:** All image slots populated with identifiable placeholders
- **Verify:** No broken image icons on page; each placeholder has descriptive alt text

---

## Phase 2: Section Implementation (Top to Bottom)

### Step 2.1 — SEC-01: Hero Section
- **Files:** `index.html` (hero section), `css/styles.css`
- **Changes:**
  - Two-column CSS grid layout
  - Left: eyebrow text, h1 title, CTA button
  - Right: distribution map SVG (created in Step 1.5)
  - Responsive: stacks to single column at 768px
- **Copy (exact):**
  - Eyebrow: "Strategic Distribution Solutions"
  - H1: "Premium paid placements. Earned editorial coverage. Measurable AI visibility."
  - Button: "Request a Demo" → `https://www.brandpoint.com/contact/`
- **Outcome:** Hero renders with two columns, navy background, white text, orange CTA button, map on right
- **Verify:** Button href is exactly `https://www.brandpoint.com/contact/`; map SVG renders; 2-column at 1440px, single-column at 768px

### Step 2.2 — SEC-02: Social Proof Bar
- **Files:** `index.html`, `css/styles.css`, `js/main.js`
- **Changes:**
  - Thin section with centered H2
  - Horizontal auto-scrolling logo slider (CSS `@keyframes` infinite scroll)
  - Placeholder logo images from Step 1.7
- **Copy (exact):**
  - H2: "Trusted by the nation's top brands and agencies"
- **Outcome:** Logo slider auto-scrolls horizontally, section is visually thin (max 120px height for slider area)
- **Verify:** Slider animates continuously; no gaps in loop; H2 centered; section height ≤ 200px total

### Step 2.3 — SEC-03: Distribution Packages Grid
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - Centered H2 and sub-copy
  - 5-column CSS grid with card styling
  - Each card: package name (`<h3>`), badge (if applicable), price (with `.bp-price` class), feature bullet list (`<ul>`/`<li>`)
  - "MOST POPULAR" badge on Signature Plus (orange background)
  - "NEW" badge on Optimize (orange background)
  - All text is semantic HTML — NO images for text content
  - Responsive: 5 columns at 1440px → 3 at 1024px → 2 at 768px → 1 at 375px
- **Copy (exact):**
  - H2: "Distribution Packages"
  - Sub-copy: "Built for how audiences find brands today"
  - Package names, badges, and features exactly as in SPEC.md SEC-03 table (verbatim from Distribution Guide)
- **Outcome:** 5 cards render across, all text selectable/crawlable, badges visible
- **Verify:** Select all text (must be selectable); view page source (no `<img>` for package content); all 5 package names present; feature lists match SPEC word-for-word; responsive collapse at each breakpoint; price elements have `.bp-price` class

### Step 2.4 — SEC-04: Thin CTA Band
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - Full-width band (navy background, white text)
  - Centered text + button
- **Copy (exact):**
  - Text: "Let's get started today!"
  - Button: "Contact Us" → `https://www.brandpoint.com/contact/`
- **Outcome:** Thin, high-contrast CTA strip separating packages from Optimize section
- **Verify:** Button href is exactly `https://www.brandpoint.com/contact/`; background contrasts with adjacent sections

### Step 2.5 — SEC-05a: Meet Brandpoint Optimize — Feature Cards
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - H2 using the Brandpoint Optimize logo (SVG/CSS recreation or image from OI-07) — not just text
  - 4-column card grid with numbered badges (01–04)
  - Each card: number badge, bold title, caption
  - Responsive: 4 columns at 1440px → 2 at 768px → 1 at 375px
- **Copy (exact):**
  - H2: "Meet Brandpoint Optimize" (with logo treatment)
  - Card 01: **Human-Written Branded Content** / "Optimized for AI discovery"
  - Card 02: **Signature Plus Network Distribution** / "Two distributions for one article"
  - Card 03: **Earned Media** / "Promoted to thousands of publishers"
  - Card 04: **Placement & AI Visibility Report** / "Measurable paid & earned placement results"
- **Outcome:** 4 cards render matching the Optimize One-Pager "The Solution" section style
- **Verify:** Card count = 4; numbering 01–04 correct; H2 includes logo element; 4-column at 1440px, 2-column at 768px, 1-column at 375px

### Step 2.6 — SEC-05b: AI Visibility Score
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - 2-column layout
  - Left: inline CSS/SVG donut gauge (built in Step 1.6, integrated here)
  - Right: descriptive copy + "Request a demo" bubble CTA (visually distinct from standard buttons — rounded/pill shape)
- **Copy (exact):**
  - Title: "Measure your AI Visibility over time"
  - Right copy: "Measure the impact your campaign has on your brand visibility in AI with an all new, predictive report – only available with Brandpoint Optimize"
  - CTA bubble: "Request a demo" → `https://www.brandpoint.com/contact/`
- **Outcome:** Polished gauge graphic (framed, centered) beside copy with CTA
- **Verify:** Gauge renders as CSS/SVG (not raster image); "QUALITY" spelled correctly; all sub-metrics present and matching SPEC; CTA href correct; 2-column at desktop, stacked at mobile

### Step 2.7 — SEC-05c: Client Quote
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - Styled `<blockquote>` with decorative quotation mark treatment
  - Attribution line
- **Copy (exact):**
  - Quote: "We're constantly being asked by our clients, 'what's the ROI?' Now we can show that in a much more quantitative, data-driven way."
  - Attribution: "— Agency Leader"
- **Outcome:** Visually distinctive quote callout
- **Verify:** Copy matches exactly character-for-character; attribution present; quote is visually set apart from surrounding content

### Step 2.8 — SEC-06: Campaign Customizations
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - H2 + sub-copy centered
  - 3 alternating two-column sections (text/image sides swap each row):
    1. Left text / Right logos (Specialty Publications)
    2. Left imagery / Right text (Specialty Formats)
    3. Left text / Right imagery (Amplification and Audience Engagement)
  - Responsive: stack to single column at 768px
- **Copy (exact):**
  - H2: "Customize your campaign to meet your brand's goals"
  - Sub-copy: "Add these additional awareness options to amplify your content even further"
  - Row 1 — **Specialty Publications**: "Add placement on USATODAY.com, APNews.com or the Business Journals for additional reach, credibility and site audience."
  - Row 2 — **Specialty Formats**: "Diversify the type of content you distribute based on your audience and brand, including infographics, video and print placement"
  - Row 3 — **Amplification and Audience Engagement**: "Drive even more targeted audiences to your content through native ad campaigns and Spanish language options"
- **Outcome:** 3 mini sections with alternating left/right layout
- **Verify:** Column sides alternate (text-left/image-right → image-left/text-right → text-left/image-right); all copy matches verbatim; responsive stacking works; native ad caption uses Inter font

### Step 2.9 — SEC-07: Case Study
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - H2 centered
  - Copy block with stats
  - Link to case study
  - Placeholder for CooperVision article screenshot
- **Copy (exact):**
  - H2: "See our work in action"
  - Copy: "Combining distribution on Brandpoint's publisher network with native ad campaigns on top sites led to 1.3 million impressions and over 1000 placements for CooperVision"
  - Link text: "Read about their campaign" → `https://www.brandpoint.com/case-studies/coopervision/`
- **Outcome:** Case study section with compelling stats and clear link
- **Verify:** Link href is exactly `https://www.brandpoint.com/case-studies/coopervision/`; copy matches verbatim (note: "CooperVision" with capital V)

### Step 2.10 — SEC-08: Final CTA
- **Files:** `index.html`, `css/styles.css`
- **Changes:**
  - Large, bold section with prominent styling
  - Centered copy + oversized CTA button
  - Navy or gradient background for visual weight
- **Copy (exact):**
  - Text: "Ready to get your brand in front of millions? We can't wait to hear about your goals."
  - Button: "Let's get started!" → `https://www.brandpoint.com/contact/`
- **Outcome:** Unmissable final conversion section
- **Verify:** Button href is exactly `https://www.brandpoint.com/contact/`; section has significantly larger text/button than other sections; background creates strong visual weight

---

## Phase 3: Polish & Compatibility

### Step 3.1 — Responsive polish
- **File:** `css/styles.css`
- **Changes:** Test and refine media queries at 1440px, 1024px, 768px, 375px; fix any grid collapse issues, font scaling, spacing, touch target sizes (min 44px)
- **Outcome:** Page renders correctly at all 4 standard viewports
- **Verify:** At each breakpoint: no horizontal scroll, no text overflow, no overlapping elements, CTA buttons are easily tappable on mobile

### Step 3.2 — Stacker.com layout flow review
- **Action:** Review https://stacker.com/brands/native-distribution and compare our page's organizational flow and visual rhythm
- **Outcome:** Page flow (hero → social proof → product details → CTA → features → customization → proof → final CTA) matches the Stacker pattern of progressive disclosure
- **Verify:** Side-by-side comparison confirms visual rhythm alignment; no Stacker code was copied

### Step 3.3 — WordPress compatibility verification
- **Files:** `index.html`, `css/styles.css`
- **Changes:** Verify all CSS classes use `bp-landing-` prefix (established in Step 1.3); ensure no external build tool dependencies; test clean paste into WP HTML editor
- **Outcome:** Self-contained, conflict-free markup ready for WordPress
- **Verify:** Copy HTML body content into WordPress page editor on brandpoint.com; page renders without style conflicts with existing theme

---

## Phase 4: Verification

### Step 4.1 — Full acceptance criteria check
- Run through all AC-01 through AC-13 from SPEC.md
- Document pass/fail for each with evidence
- Fix any failures before proceeding

### Step 4.2 — Link audit
- Verify every CTA href points to `https://www.brandpoint.com/contact/` (full URL with protocol)
- Verify case study link points to `https://www.brandpoint.com/case-studies/coopervision/`
- Verify no dead/broken links

### Step 4.3 — Content audit
- Compare every heading, body text, caption, and quote against the brief document and SPEC.md word-for-word
- Flag any deviations

### Step 4.4 — SEO check
- Verify Distribution Packages grid is all HTML text (no text-as-image)
- Check meta description is present and descriptive
- Verify proper heading hierarchy (single H1 in hero, logical H2/H3 structure)
- Verify all images have descriptive alt text

---

## Phase 5: Delivery & Handoff

### Step 5.1 — Prepare WordPress deployment package
- **Action:** Extract page body HTML, CSS, and JS into a format ready for WordPress insertion
- **Outcome:** Clear instructions for MaDonna on how to create the page at `brandpoint.com/distribution-solutions`
- **Verify:** HTML pastes cleanly; CSS can be added via Elementor custom CSS or `<style>` block; JS (if any) can be added via custom code widget

### Step 5.2 — Document placeholder assets for replacement
- **Action:** Create a list of all placeholder images/logos that need to be replaced with real assets
- **Outcome:** MaDonna has a clear checklist of assets to provide/replace
- **Verify:** Every placeholder has alt text starting with "Placeholder:"

---

## Execution Notes

- Each step is atomic — complete and verify before moving to next
- If any step deviates from spec, STOP and update SPEC.md/PLAN.md before continuing
- Phase 1 creates ALL assets before Phase 2 uses them — no forward dependencies
- CSS namespacing (`bp-landing-` prefix) is established in Step 1.3, not retrofitted
- Steps 1.5, 1.6, and 1.7 are independent and can be parallelized
- Phase 4 steps 4.1–4.4 are independent and can be parallelized
- OI-01 through OI-08 should ideally be resolved before Phase 2 begins; documented defaults will be used for any unresolved items
