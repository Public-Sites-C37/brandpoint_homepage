# Functional Requirements — Brandpoint Homepage Update v2

**Document:** FR-v2
**Date:** 2026-03-31
**Source Materials:** MaDonna Sheehy email (3/30/2026), Teams VTT transcript, 11 image attachments, brandpoint.com site audit
**Stakeholder:** MaDonna Sheehy, Director of Marketing, Brandpoint
**Delivery:** Static HTML/CSS/JS — conceptual homepage for brandpoint.com

---

## FR-01: Sticky Top Navigation

### FR-01.1: Structure
- Fixed/sticky navigation bar at the top of the page
- Remains visible at all scroll positions
- Contains Brandpoint logo (left-aligned) and navigation links (right-aligned)

### FR-01.2: Logo
- Brandpoint primary logo on the left
- Logo links to page top (anchor `#`) since this IS the homepage
- Source: Extract from brandpoint.com or request from MaDonna

### FR-01.3: Navigation Links (in order, per VTT 00:00:32–00:00:49)
| # | Label | URL | Notes |
|---|---|---|---|
| 1 | Who We Are | https://www.brandpoint.com/who-we-are/ | Existing BPT page |
| 2 | Who We Work With | https://www.brandpoint.com/who-we-work-with/ | Existing BPT page |
| 3 | Blog | https://www.brandpoint.com/blog/ | Existing BPT page |
| 4 | Editorial Content Library | https://www.brandpointcontent.com | External — BPT content platform |
| 5 | Contact Us | https://www.brandpoint.com/contact/ | Orange button treatment (CTA style) |

### FR-01.4: Behavior
- Sticky on scroll (CSS `position: sticky` or `position: fixed`)
- Must not overlap or obscure page content on initial load
- Should have a subtle background/shadow when scrolled to distinguish from page content
- Responsive: collapses to hamburger menu on mobile viewports

---

## FR-02: Hero Section Update

### FR-02.1: Map Replacement
- Replace current `assets/images/distribution-map.svg` (custom SVG) with provided `Distribution Map-Dots.png`
- New map: light blue US silhouette with state lines, white dots showing distribution network, orange markers for 4 premium outlets (Los Angeles Times, Chicago Tribune, New York Daily News, Miami Herald), Brandpoint cross logo in bottom-right corner
- Image format: PNG (as provided)
- Alt text must be descriptive for SEO

### FR-02.2: No Other Hero Changes
- Hero copy, eyebrow text, H1, and CTA button remain unchanged
- Layout remains 2-column (content left, map right)

---

## FR-03: Value Proposition Section (NEW)

### FR-03.1: Position
- Inserted between Hero (SEC-01) and Social Proof Bar (SEC-02)

### FR-03.2: Content
- Lorem ipsum placeholder text — MaDonna will provide final copy
- Must be clearly marked as placeholder for editorial replacement
- Per VTT 00:01:00–00:01:09: "where our longer value prop will go"

### FR-03.3: Design
- Clean section with adequate visual weight between hero and social proof
- Should complement the overall page flow and visual rhythm
- Centered text layout appropriate for a value proposition statement

---

## FR-04: Social Proof Bar Update

### FR-04.1: Logo Replacement
- Replace 6 placeholder SVGs with 10 real PR agency logos (PNGs provided)
- Logos: FINN Partners, Coyne PR, FleishmanHillard, Hill+Knowlton Strategies, Zeno, Golin, GCI Health, Ogilvy, Weber Shandwick, Carmichael Lynch

### FR-04.2: Slider Behavior
- Maintain existing auto-scrolling horizontal slider animation
- Seamless loop (duplicate logos for continuous scroll)
- Logos should display with consistent visual treatment (grayscale with hover color, or as-is per brand guidelines)

### FR-04.3: Heading
- Heading "Trusted by the nation's top brands and agencies" remains unchanged

---

## FR-05: Distribution Packages Update

### FR-05.1: Remove Prices
- Remove ALL price elements from all 5 package cards
- Elements with `.bp-price` class should be deleted (not just hidden)
- Layout must remain intact without price elements — no visual gaps

### FR-05.2: Remove "Most Popular" Badge
- Remove the "Most Popular" badge from Signature Plus card
- Also remove the `bp-landing-package-featured` class from the Signature Plus card `<div>` (this class adds the orange border associated with the badge)
- Per VTT 00:01:35–00:01:41: "remove the most popular button on the signature plus"

### FR-05.3: Retain
- Keep "New" badge on Optimize
- Keep all feature bullet lists unchanged
- Keep 5-column grid layout
- Keep semantic HTML (no images for text content)

---

## FR-06: Thin CTA Band
- No changes required — remains as-is

---

## FR-07: Meet Brandpoint Optimize Update

### FR-07.1: Logo Replacement
- Replace the CSS/text treatment "Meet Brandpoint Optimize" H2 with the provided `BPTOPTIMIZE326BLU.png` logo image
- Logo shows "Brandpoint" in navy + "Optimize" in orange with sparkle icon
- Prefix with plain-text "Meet " before the logo image — per resolved design decision. MaDonna's VTT 00:01:49–00:01:53: "I will be including the logo there to use instead of the font"

### FR-07.2: Feature Cards
- 4 feature cards (01–04) remain unchanged

---

## FR-08: New Quote Placeholder (NEW)

### FR-08.1: Position
- Inserted AFTER the 4 feature cards (SEC-05a) and BEFORE "Measure your AI Visibility over time" (SEC-05b)
- Per VTT 00:01:57–00:02:05: "Right before that add a new lorem ips in place for another quote"

### FR-08.2: Content
- Lorem ipsum placeholder blockquote
- MaDonna will provide final copy
- Must be clearly marked as placeholder

### FR-08.3: Design
- Style consistent with existing client quote (SEC-05c) — decorative quotation marks, centered, visually distinct
- Attribution line placeholder (e.g., "— [Name], [Title]")

---

## FR-09: AI Visibility Score Update

### FR-09.1: Sub-header Text Change
- Old: "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking"
- New: "Generated by Brandpoint Intelligence proprietary formula"
- Per VTT 00:02:06–00:02:23

### FR-09.2: All Other Elements Unchanged
- Gauge graphic, score (71.6%), sub-metrics, layout — all remain as-is

---

## FR-10: Campaign Customizations Update

### FR-10.1: Row 1 — Specialty Publications
- Replace placeholder SVG logos with provided PNGs: `AP.png`, `USA_Today.png`, `The Business Journals.png`
- Text copy remains unchanged

### FR-10.2: Row 2 — Specialty Formats
- Replace SVG format icons (Print/Video/Infographic) with provided `Specialty Formats.png`
- Composite image shows: infographic (Quality of Life Grants Program), Chicago Tribune article, Houston Chronicle article
- Text copy remains unchanged

### FR-10.3: Row 3 — Amplification and Audience Engagement
- Replace styled native ad placeholder with provided `Native Ads.png`
- Composite image shows: sponsored content card, USA Today branded content, native ad with "Learn More" CTA
- Text copy remains unchanged

---

## FR-11: Premium Publisher Network Reel (NEW)

### FR-11.1: Position
- Inserted between Campaign Customizations (SEC-06) and Case Study (SEC-07)
- Per VTT 00:02:42–00:02:57

### FR-11.2: Heading
- Title: "Premium Publisher Network"
- Subtitle: "Premium publisher network with exclusive partnerships in key media outlets" (from email)

### FR-11.3: Logo Reel
- Auto-scrolling horizontal logo carousel (same pattern as Social Proof Bar)
- 16 outlet logos (PNGs provided in Outlet Logos/ folder; Boston Herald omitted per Jake's direction):

| # | Publication | File |
|---|---|---|
| 1 | Albany Times Union | Albany Times Union.png |
| 2 | Baltimore Sun | Baltimore Sun.png |
| 3 | Chicago Tribune | Chicago Tribune.png |
| 4 | Connecticut Post | Connecticut Post.png |
| 5 | NY Daily News | Daily News.png |
| 6 | Daily Press | Daily Press.png |
| 7 | Houston Chronicle | Houston Chronicle.png |
| 8 | Los Angeles Times | Los Angeles Times.png |
| 9 | Miami Herald | Miami Herald.png |
| 10 | Morning Call | Morning Call.png |
| 11 | Orlando Sentinel | Orlando Sentinel.png |
| 12 | San Antonio Express-News | San Antonion Express-News.png |
| 13 | SF Chronicle / SFGATE | San Francisco Chronicle SFGATE.png |
| 14 | Seattle Post-Intelligencer | Seattle Post Intelligencer.png |
| 15 | Sun Sentinel | Sun Sentinel.png |
| 16 | The Virginian-Pilot | The Virginian Pilot.png |
| 17 | Boston Herald | NOT PROVIDED — omit per Jake's direction |

### FR-11.4: Behavior
- Seamless infinite scroll (duplicate logos for continuous loop)
- Edge-fade mask (same as Social Proof slider)
- Grayscale with hover color (or consistent treatment with Social Proof slider)

---

## FR-12: Case Study Update

### FR-12.1: Layout Change
- Change from centered text-only to 2-column layout
- LEFT: `See Our Work in Action.png` (SFGate CooperVision sponsored content screenshot)
- RIGHT: Existing text + link
- Per VTT 00:03:02–00:03:10: "I would like that with the image on the left hand side"

### FR-12.2: Content
- H2 "See our work in action" — unchanged
- Body copy — unchanged
- Link "Read about their campaign" → /case-studies/coopervision/ — unchanged

---

## FR-13: Final CTA
- No changes required — remains as-is

---

## FR-14: Site Footer (NEW)

### FR-14.1: Design Direction
- Per VTT 00:03:11–00:03:25: "mimic the brandpoint.com footer, but in this new look and feel and maybe make the font smaller and not italicized"
- Navy background consistent with page design language
- Inter font (not italic), smaller than body text

### FR-14.2: Left Column — Company Info
- Brandpoint primary logo
- Address: 850 5th St S, Hopkins, MN 55343 (from MaDonna's email signature)
- Phone: (952) 278-0780
- Email: contact@brandpoint.com
- Google Maps link for address (carry forward from current footer)

### FR-14.3: Right Column — Links
| Label | URL | Source |
|---|---|---|
| Careers | https://www.indeed.com/cmp/Brandpoint-3 | Current footer (external) |
| Blog | https://www.brandpoint.com/blog/ | Current footer |
| Free Resources | https://www.brandpoint.com/solutions/resources/ | Current footer |
| Contact Us | https://www.brandpoint.com/contact/ | Current footer (resolved: /contact-2/ redirects here) |
| Editorial Content | https://www.brandpointcontent.com | MaDonna VTT (resolved) |
| Privacy Policy | https://www.brandpoint.com/privacy/ | Current footer |

### FR-14.4: Social Media Links
| Platform | URL | Icon |
|---|---|---|
| LinkedIn | https://www.linkedin.com/company/brandpoint/ | LinkedIn icon |
| Facebook | https://www.facebook.com/Brandpoint/ | Facebook icon |
| X/Twitter | https://x.com/brandpointco | X icon |
| YouTube | https://www.youtube.com/user/BrandpointContent | YouTube icon |

### FR-14.5: Bottom Bar
- "An ARAnet Company" with link to https://www.aranet.io/
- "Founded in 1996. Independently owned." (carry forward from current footer)
- Copyright: © Brandpoint 2026
- Privacy Policy link: /privacy/
- Your California Privacy Rights: /privacy-notice-california/

---

## FR-15: SEO Updates

### FR-15.1: Meta Tags
- Update `<title>` for homepage context (current: "Strategic Distribution Solutions | Brandpoint")
- Update `<meta name="description">` for homepage context
- Update OG tags (og:title, og:description)

### FR-15.2: Alt Tags
- All new images must have descriptive alt text
- Review existing alt tags for accuracy
- No alt text should start with "Placeholder:" in final version (replace placeholders)

### FR-15.3: Heading Hierarchy
- Verify single H1 (hero)
- Logical H2/H3 nesting throughout all sections including new ones

---

## FR-16: Forms and Links Integrity

### FR-16.1: All CTAs Must Work
- Every CTA button must point to https://www.brandpoint.com/contact/
- Case study link must point to https://www.brandpoint.com/case-studies/coopervision/

### FR-16.2: Nav Links Must Work
- All 5 nav links must resolve to live pages
- All footer links must resolve to live pages

### FR-16.3: External Pages to Verify (forms MaDonna mentioned)
- https://www.brandpoint.com/contact/ — contact form
- https://www.brandpoint.com/solutions/resources/ — resources page
- https://www.brandpoint.com/blog/how-to-turn-seasonal-trends-into-meaningful-brand-stories/ — trending topics newsletter form
- These are WordPress pages — our responsibility is correct linking, not form functionality
