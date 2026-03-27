# SPEC.md — Brandpoint Product Landing Page

## Problem Statement

Brandpoint needs a product landing page at `brandpoint.com/distribution-solutions` that provides an overarching overview of their entire distribution product lineup and drives visitors to contact/request a demo. No such page currently exists. MaDonna Sheehy (Director of Marketing) has provided a detailed creative brief, voice walkthrough, and brand reference materials.

## Expected Behavior

A fully functional, WordPress-compatible HTML landing page that:
- Lives at `brandpoint.com/distribution-solutions`
- Showcases all 5 distribution packages as coded HTML (not images) for SEO/AI crawlability
- Highlights the Brandpoint Optimize product with detailed feature cards and AI Visibility Score
- Presents campaign customization options (specialty publications, formats, amplification)
- Includes a case study callout (CooperVision)
- Drives all CTAs to `https://www.brandpoint.com/contact/`
- Matches Brandpoint brand identity (Inter font, navy/orange color palette) married with the flow/feel of https://stacker.com/brands/native-distribution

## Observed Behavior

The repo is empty (README.md only). No page exists.

## Target Audience & Use Cases

- **Sales team:** Will link to this page in email outreach
- **Marketing:** Will direct paid ads to this page and include in email campaigns
- **Client reports:** Will be linked from client reports and visibility report CTAs ("learn more about our solutions")
- **Design implication:** Page must be fast-loading (ad traffic), scannable (sales context), and professional (client-facing)

## Affected Files/Modules

| File | Action | Purpose |
|---|---|---|
| `index.html` | Create | Main landing page with all sections |
| `css/styles.css` | Create | All styling — Inter font, brand colors, responsive layout |
| `assets/` | Create | Directory for images, logos, SVGs (`assets/images/`, `assets/logos/`) |
| `js/main.js` | Create | Logo slider, any scroll/interaction behavior |

## Target Platform & Delivery

- **CMS:** WordPress with Elementor (or custom HTML page)
- **Delivery format:** Clean, self-contained HTML/CSS/JS that can be pasted into a WordPress draft
- **MaDonna must be able to edit text directly** — markup must be clean and human-readable
- **Deadline:** Monday EOD draft on WordPress → MaDonna reviews Tuesday
- **WordPress admin access:** MaDonna has granted admin access to the WordPress account
- **Note:** This page will inherit the standard brandpoint.com header/footer/nav from the WordPress theme. Our deliverable is the page body content only.

## Design Reference

- **Layout/flow reference:** https://stacker.com/brands/native-distribution (mimic organizational flow and visual rhythm only — do not copy their code)
- **Brand reference 1:** BPT Optimize One-Pager (colors, fonts, logo treatment, tone)
- **Brand reference 2:** BPT Distribution Guide-NOPR (package structure, customization categories)
- **Font:** Inter (Google Fonts)
- **Colors (extracted from brand materials):**
  - Primary navy: `#1B2541` (dark headers, nav)
  - Accent orange/coral: `#E8632B` (CTAs, badges, highlights)
  - Teal/green: `#2A8F7D` (secondary accent, score gauge)
  - Light gray: `#F5F5F5` (section backgrounds)
  - White: `#FFFFFF` (cards, content areas)
  - Text dark: `#333333` (primary body text)
  - Text light: `#666666` (secondary/caption text)

## Page Sections (Ordered)

### SEC-01: Hero (Above the Fold)
- **Layout:** 2 columns
- **Left:** Eyebrow "Strategic Distribution Solutions" → Title "Premium paid placements. Earned editorial coverage. Measurable AI visibility." → CTA button "Request a Demo"
- **Right:** Distribution network map graphic (redesigned to new style — shows Chicago Tribune, Boston Herald, NY Daily News, Los Angeles Times, Miami Herald on US map with caption "Top sites on our distribution network")
- **All CTAs link to:** `https://www.brandpoint.com/contact/`

### SEC-02: Social Proof Bar
- **H2:** "Trusted by the nation's top brands and agencies"
- **Content:** Horizontal logo slider (brands + PR agencies)
- **Source:** Replicate from https://www.brandpoint.com/who-we-work-with/
- **Style:** Thin, minimal section

### SEC-03: Distribution Packages
- **H2:** "Distribution Packages"
- **Sub-copy:** "Built for how audiences find brands today"
- **Layout:** 5 equal columns, coded as semantic HTML (NOT an image — MaDonna explicitly requested this for SEO/AI readability)
- **Packages:**

| Package | Badge | Features |
|---|---|---|
| Signature | — | Paid media placements on national publisher network, Over 800 placements, Site audience over 90M, Article creation and/or editorial review, Paid media placement report with site audience metrics |
| Signature Plus | MOST POPULAR | Paid media placements on national publisher network, Over 800 placements, Site audience over 90M, Article creation and/or editorial review, Paid media placement report with site audience metrics, 5 premium outlets include: LA Times, Chicago Tribune, NY Daily News, Boston Herald, Miami Herald |
| Optimize | NEW (Introductory) | Paid media placements on national publisher network, Over 800 placements, Site audience over 90M, Article creation and/or editorial review, Paid media placement report with site audience metrics, 5 premium outlets include: LA Times, Chicago Tribune, NY Daily News, Boston Herald, Miami Herald, Companion distribution article, Earned media promotion, AI Visibility Report, Predictive brand visibility insights & recommendations |
| Pharma | — | Paid media placements on national publisher network, 130 ISI pharma-compliant placements, Site audience over 100M, Article creation and/or editorial review, Paid media placement report with site audience metrics, 5 premium outlets include: LA Times, Chicago Tribune, NY Daily News, Boston Herald, Miami Herald |
| Regional | — | Paid media placements on national publisher network, Placement quantity varies by region targeted, Site audience varies by region targeted, Article creation and/or editorial review, Paid media placement report with site audience metrics, Targeted distribution by region(s) or state(s), Single region or state options available |

- **NOTE:** Pricing is present in the brief (Signature $5,995 / Signature Plus $6,995 / Optimize $9,995 Introductory / Pharma $6,995 / Regional starts at $5,395) but Distribution Guide is marked NOPR. **OPEN ITEM OI-01: Confirm with MaDonna whether prices appear on live page.** Default: include with clearly labeled CSS classes for easy removal.

### SEC-04: Thin CTA Band
- **Copy:** "Let's get started today!"
- **Button:** "Contact Us" → `https://www.brandpoint.com/contact/`

### SEC-05: Meet Brandpoint Optimize
- **H2:** "Meet Brandpoint Optimize" — **use the Brandpoint Optimize logo** (not just text), per brief instruction

**Sub-section 5a — 4 Feature Cards (from Optimize One-Pager "The Solution"):**
| # | Title | Caption |
|---|---|---|
| 01 | Human-Written Branded Content | Optimized for AI discovery |
| 02 | Signature Plus Network Distribution | Two distributions for one article |
| 03 | Earned Media | Promoted to thousands of publishers |
| 04 | Placement & AI Visibility Report | Measurable paid & earned placement results |

- Cards should include numbered badges (01–04) and may include icons consistent with the Optimize One-Pager styling.

**Sub-section 5b — AI Visibility Score (2 columns):**
- Title: "Measure your AI Visibility over time"
- Left: AI Visibility Quality Score gauge. **Fix typo "QUALTIY" → "QUALITY"**. Polish visually: frame, center, clean ("clean it up, frame it, center it, make it pretty" — MaDonna). Gauge details:
  - Header: "AI VISIBILITY QUALITY SCORE"
  - Sub-header: "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking"
  - Monitoring Start: 69.5 → Current Score: 71.6
  - Display value: 71.6%
  - Sub-metrics: Since Day 1: +2.1, Last 7 Days: -0.2, Highest Score Achieved: 72.8% - Jan 14, Change From Peak: -1.2
  - Data through: Jan 08 2026
- Right: "Measure the impact your campaign has on your brand visibility in AI with an all new, predictive report – only available with Brandpoint Optimize" + CTA bubble "Request a demo" → `https://www.brandpoint.com/contact/`

**Sub-section 5c — Client Quote:**
- "We're constantly being asked by our clients, 'what's the ROI?' Now we can show that in a much more quantitative, data-driven way." — Agency Leader

### SEC-06: Campaign Customizations
- **H2:** "Customize your campaign to meet your brand's goals"
- **Sub-copy:** "Add these additional awareness options to amplify your content even further"
- **Layout:** 3 mini sections, each 2 columns (alternating image/text sides — text-left/image-right, then image-left/text-right, then text-left/image-right)

| # | Left | Right |
|---|---|---|
| 1 | **Specialty Publications** — "Add placement on USATODAY.com, APNews.com or the Business Journals for additional reach, credibility and site audience." | Logos: USA Today, AP News, Business Journals |
| 2 | Graphical representation of print/video/infographic formats | **Specialty Formats** — "Diversify the type of content you distribute based on your audience and brand, including infographics, video and print placement" |
| 3 | **Amplification and Audience Engagement** — "Drive even more targeted audiences to your content through native ad campaigns and Spanish language options" | Native ad imagery (SFGate screenshot). Caption font → Inter |

**Detailed customization options (from Distribution Guide, for reference if expanded content is needed):**

| Category | Options |
|---|---|
| Specialty Publications | AP News, USA TODAY, Local Sites on USA Today Co., Business Journal |
| Specialty Formats | Multimedia, Infographic or Video Distribution, Infographic Design, Print Placements |
| Amplification & Audience Engagement | Engagement (3,500 page views, 1,000 engaged views, audience targeting), Spanish Distribution, Enhanced Targeting |

### SEC-07: Case Study
- **H2:** "See our work in action"
- **Copy:** "Combining distribution on Brandpoint's publisher network with native ad campaigns on top sites led to 1.3 million impressions and over 1000 placements for CooperVision"
- **Link:** "Read about their campaign" → `https://www.brandpoint.com/case-studies/coopervision/`
- **Image:** Sponsored content article screenshot (CooperVision eye care)

### SEC-08: Final CTA (Big & Bold)
- **Copy:** "Ready to get your brand in front of millions? We can't wait to hear about your goals."
- **CTA:** "Let's get started!" → `https://www.brandpoint.com/contact/`
- **Style:** Large, bold, high visual impact — MaDonna says "relatively big and bold"

## Acceptance Criteria

| ID | Criterion | Testable Condition |
|---|---|---|
| AC-01 | Page renders all 8 sections in correct order | Visual inspection matches section sequence: Hero → Social Proof → Packages → Thin CTA → Optimize (5a/5b/5c) → Customizations → Case Study → Final CTA |
| AC-02 | All CTA buttons link to `https://www.brandpoint.com/contact/` | Every `<a>` with CTA class has correct href (full URL with protocol) |
| AC-03 | Distribution packages are semantic HTML | No `<img>` tags for the 5-column package grid; text is selectable and crawlable |
| AC-04 | Font is Inter throughout | Google Fonts loaded; computed font-family is Inter on all text elements |
| AC-05 | Color palette matches brand materials | Navy headers (#1B2541), orange CTAs/badges (#E8632B), teal accents (#2A8F7D), text dark (#333333), text light (#666666) match extracted hex values |
| AC-06 | Logo slider is functional | Brands scroll/slide horizontally |
| AC-07 | Page is responsive | Renders correctly at 1440px, 1024px, 768px, 375px viewports |
| AC-08 | HTML is WordPress-pasteable | Self-contained markup can be inserted into WP page editor without breaking |
| AC-09 | All copy matches brief exactly | Every heading, body text, caption matches the brief document word-for-word |
| AC-10 | AI Visibility Score gauge renders correctly | SVG/CSS gauge shows 71.6%, spelled "QUALITY" (not "QUALTIY"), all sub-metrics present |
| AC-11 | Map graphic is styled to new brand guide | Not the raw old map; redesigned with brand colors |
| AC-12 | MaDonna can edit text in WP | Markup is clean, no obfuscated class names, text is directly editable |
| AC-13 | Pricing elements (if included) use clearly labeled CSS classes | Price values can be easily found, updated, or removed by MaDonna |

## Constraints & Edge Cases

1. **No JavaScript frameworks** — must be vanilla HTML/CSS/JS for WordPress compatibility
2. **Pricing publication TBD** — prices are known but publication decision pending (OI-01). Include in markup with clear class names (e.g., `.bp-price`) so MaDonna can easily update or remove
3. **Distribution Guide not finalized** — package features/structure are confirmed; pricing and some details may change before final publication
4. **Images requiring creation/sourcing:** map graphic, AI Visibility gauge (SVG), format illustrations, publication logos. Placeholder approach for assets we can't generate directly — all placeholders must be clearly identified (alt text, visual indicator) so MaDonna knows what to replace
5. **WordPress Elementor** — if custom HTML page, ensure no conflicts with theme styles. All CSS classes must be namespaced with `bp-landing-` prefix from the start
6. **Stacker.com is reference only** — do not copy their code, only mimic the organizational flow and visual rhythm
7. **Header/footer/nav** — inherited from WordPress theme; our deliverable is page body content only

## Open Items Requiring MaDonna's Input

| # | Question | Impact | Default if unresolved |
|---|---|---|---|
| OI-01 | Should prices appear on the live page? (Distribution Guide is NOPR) | SEC-03 layout and content | Include with easily removable CSS classes |
| OI-02 | Which specific brand/agency logos for the social proof slider? | SEC-02 assets | Use placeholder logos sourced from brandpoint.com/who-we-work-with |
| OI-03 | Is the CooperVision case study the only one, or should we design for multiple? | SEC-07 layout | Design for single case study; structure allows easy addition of more |
| OI-04 | Should the map graphic be interactive or static? | SEC-01 complexity | Static SVG (brief says "cool looking in our new style sheet" — implies static redesign) |
| OI-05 | Is the SFGate/Curry Pizza House native ad screenshot approved for use in SEC-06 Section 3? | SEC-06 assets | Use as-is with Inter caption font |
| OI-06 | Should "Must be paired with an article package" disclaimer from Distribution Guide appear under campaign customizations? | SEC-06 legal/product accuracy | Omit from landing page (sales context, not contractual) |
| OI-07 | Do we have the Brandpoint Optimize logo as a separate asset file, or does it need to be sourced/recreated? | SEC-05 H2 treatment | Recreate in SVG/CSS matching the one-pager style |
| OI-08 | Should content from the Optimize One-Pager "The Challenge" section (60% zero-click, shrinking newsrooms, 10x AI visibility, Proving ROI) be incorporated? | Potential additional section or hero enhancement | Omit — brief does not include it in the page layout |
