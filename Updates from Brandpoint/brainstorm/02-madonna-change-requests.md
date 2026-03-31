# MaDonna's Change Requests — Consolidated

**Sources:** Email (3/30/2026 3:42 PM), Teams VTT transcript, attached assets
**Status:** Analysis complete, brainstorming in progress

---

## Change List

### NEW SECTIONS (4)

#### CHG-01: Sticky Top Navigation
- **Source:** VTT 00:00:15–00:00:49, Email
- **Spec:** Sticky nav that stays visible on scroll
- **Content:** Brandpoint logo (left) + links: Who We Are, Who We Work With, Blog, Editorial Content Library, Contact Us (orange button treatment)
- **Links needed:**
  - Who We Are → /who-we-are/
  - Who We Work With → /who-we-work-with/
  - Blog → /blog/
  - Editorial Content Library → https://www.brandpointcontent.com (RESOLVED — Brandpoint's free editorial content platform for publishers)
  - Contact Us → /contact/ (or /contact-2/ — needs resolution)
- **Asset needed:** Brandpoint logo (can source from current site or use provided assets)

#### CHG-02: Value Prop Section (Between Hero and Social Proof)
- **Source:** VTT 00:01:00–00:01:19, Email
- **Spec:** New section below hero, above "Trusted by" slider
- **Content:** Lorem ipsum placeholder — MaDonna will provide final copy
- **Purpose:** "Longer value prop" area
- **Asset needed:** None (text only)

#### CHG-03: Premium Publisher Network Logo Reel
- **Source:** VTT 00:02:42–00:02:57, Email
- **Spec:** New carousel/reel placed BETWEEN Campaign Customizations (SEC-06) and Case Study (SEC-07)
- **Title:** "Premium Publisher Network" (MaDonna corrected herself in VTT — not "Trusted by")
- **Subtitle from email:** "Premium publisher network with exclusive partnerships in key media outlets"
- **Assets:** 16 outlet logos to use (17 listed originally, Boston Herald omitted per Jake's direction):
  1. Albany Times Union
  2. Baltimore Sun
  3. Chicago Tribune
  4. Connecticut Post
  5. Daily News
  6. Daily Press
  7. Houston Chronicle
  8. Los Angeles Times
  9. Miami Herald
  10. Morning Call
  11. Orlando Sentinel
  12. San Antonio Express-News
  13. San Francisco Chronicle / SFGATE
  14. Seattle Post Intelligencer
  15. Sun Sentinel
  16. The Virginian Pilot
  17. Boston Herald (NOT in folder — may need to source separately or it was omitted)
- **NOTE:** Boston Herald was in the original map/packages but is NOT in the Outlet Logos folder. Miami Herald IS included.

#### CHG-04: Footer
- **Source:** VTT 00:03:11–00:03:44, Email
- **Spec:** Mimic brandpoint.com footer but in the new look/feel
- **Style:** Smaller font, not italicized
- **Left side:** Brandpoint logo, address, contact info
- **Address:** 850 5th St S, Hopkins, MN 55343 (from email signature)
- **Links (from VTT):** Careers, Blog, Free Resources, Contact Us, Editorial Content, LinkedIn, Privacy Policy
- **Links mapped to current site:**
  - Careers → https://www.indeed.com/cmp/Brandpoint-3
  - Blog → /blog/
  - Free Resources → /solutions/resources/
  - Contact Us → /contact/ or /contact-2/
  - Editorial Content → https://www.brandpointcontent.com (RESOLVED)
  - LinkedIn → https://www.linkedin.com/company/brandpoint/
  - Privacy Policy → /privacy/
- **Copyright:** © 2026 Brandpoint
- **RESOLVED:** Carry forward ALL elements from current brandpoint.com footer: phone, email, all 4 social icons (LinkedIn, Facebook, X, YouTube), CA Privacy Rights, ARAnet attribution, "Founded in 1996. Independently owned." — styled in our new design language.

---

### ASSET SWAPS (6)

#### CHG-05: Replace Hero Map
- **Source:** VTT 00:00:49–00:00:58, Email
- **Spec:** Replace current SVG map with provided `Distribution Map-Dots.png`
- **Asset:** Light blue US map with state lines, white dots showing distribution network, orange markers for 5 premium outlets (LA Times, Chicago Tribune, NY Daily News, Miami Herald + Brandpoint cross logo in bottom right)
- **NOTE:** New map does NOT label Boston Herald. Only 4 city labels visible. Need to confirm if this is intentional.

#### CHG-06: Replace Social Proof Logos with Real PR Agency Logos
- **Source:** VTT 00:01:19–00:01:29, Email
- **Spec:** Replace 6 placeholder SVGs with 10 real PR agency logos
- **Assets:** 10 PNGs in `PR Agency Logos/PR Agency Logos/`:
  1. FINN Partners
  2. Coyne PR
  3. FleishmanHillard
  4. Hill+Knowlton Strategies
  5. Zeno
  6. Golin
  7. GCI Health
  8. Ogilvy
  9. Weber Shandwick
  10. Carmichael Lynch

#### CHG-07: Replace Optimize Text with Logo
- **Source:** VTT 00:01:46–00:01:53, Email
- **Spec:** In "Meet Brandpoint Optimize" header, replace CSS/text treatment with actual logo image
- **Assets:** Two versions provided:
  - `BPTOPTIMIZE326BLU.png` — Full "Brandpoint Optimize" in navy+orange (for the header)
  - `Brandpoint Optimize Logo.png` — Just "Optimize" in orange (partial, for potential other uses)
- **Use:** `BPTOPTIMIZE326BLU.png` replaces the H2 text per email instruction

#### CHG-08: Replace SEC-06 Placeholder Images
- **Source:** VTT 00:02:26–00:02:39, Email
- **Spec:** Replace all 3 customization section images with provided assets
- **Assets:**
  - Row 1 (Specialty Publications): `AP.png`, `USA_Today.png`, `The Business Journals.png` — replace placeholder SVGs
  - Row 2 (Specialty Formats): `Specialty Formats.png` — replace SVG icons with composite image showing infographic, Chicago Tribune article, Houston Chronicle article
  - Row 3 (Amplification): `Native Ads.png` — replace styled placeholder with composite showing sponsored content examples (USA Today, native ad cards)

#### CHG-09: Case Study Image
- **Source:** VTT 00:03:02–00:03:10, Email
- **Spec:** Add `See Our Work in Action.png` to LEFT side of case study section
- **Asset:** Composite image showing SFGate Health & Fitness page with CooperVision sponsored content callout
- **Layout change:** Current section is centered text-only → becomes 2-column (image left, text right)

#### CHG-10: Brandpoint Nav Logo
- **Source:** Implied by CHG-01 (nav needs logo)
- **Asset needed:** Brandpoint primary logo — can be extracted from current site or may be among assets
- **NOTE:** The email signature shows the Brandpoint logo. May need to source high-res version.

---

### TEXT/CONTENT EDITS (4)

#### CHG-11: Remove Prices from Distribution Packages
- **Source:** VTT 00:01:29–00:01:34, Email
- **Spec:** Remove all price elements from SEC-03
- **Implementation:** Delete or hide `.bp-price` elements (already designed for easy removal)

#### CHG-12: Remove "Most Popular" Badge from Signature Plus
- **Source:** VTT 00:01:35–00:01:41
- **Spec:** Remove the orange "Most Popular" badge from Signature Plus card
- **NOTE:** "NEW" badge on Optimize was NOT mentioned for removal — keep it

#### CHG-13: Add Quote Placeholder Before AI Visibility Section
- **Source:** VTT 00:01:57–00:02:05
- **Spec:** Add a new blockquote/quote section BEFORE "Measure your AI Visibility over time"
- **Content:** Lorem ipsum placeholder — MaDonna will provide real quote later
- **Position:** After SEC-05a feature cards, before SEC-05b AI Visibility gauge

#### CHG-14: Change Gauge Sub-header Text
- **Source:** VTT 00:02:06–00:02:23
- **Spec:** Replace "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking" with "Generated by Brandpoint Intelligence proprietary formula"

---

### CROSS-CUTTING (2)

#### CHG-15: SEO Review
- **Source:** Email
- **Spec:** Review SEO title of page, alt tags on all images, meta description
- **Context:** Page is now homepage — meta must reflect that
- **Current title:** "Strategic Distribution Solutions | Brandpoint"
- **Needs to become:** Something appropriate for a homepage (e.g., "Brandpoint | Premium Content Distribution & AI Visibility")

#### CHG-16: Ensure All Forms Work
- **Source:** Email
- **Spec:** All forms on these pages must remain functional:
  - /contact/ (or /contact-2/) — contact form
  - /solutions/resources/ — resource pages
  - /blog/how-to-turn-seasonal-trends-into-meaningful-brand-stories/ — Trending Topics newsletter signup
- **Our responsibility:** Ensure our nav/footer links point to correct pages. The forms themselves live on WordPress — we just link to them.

---

## Open Questions

| # | Question | Impact | Source |
|---|---|---|---|
| ~~OQ-01~~ | ~~Editorial Content Library~~ → **RESOLVED: https://www.brandpointcontent.com** | Nav + Footer | Brandpoint's free editorial content platform for publishers |
| ~~OQ-02~~ | ~~`/contact/` vs `/contact-2/`~~ → **RESOLVED: `/contact-2/` redirects to `/contact/`. They are the same page. Use `/contact/` everywhere.** | All CTA buttons | Confirmed via Playwright — 301 redirect |
| ~~OQ-03~~ | ~~Boston Herald missing from Outlet Logos~~ → **RESOLVED: Go with what MaDonna provided. 16 usable logos (Boston Herald omitted).** | CHG-03 publisher reel | Jake confirmed |
| ~~OQ-04~~ | ~~New map only shows 4 cities~~ → **RESOLVED: Go with what MaDonna provided. 4 labeled cities, no Boston.** | CHG-05 hero map | Jake confirmed |
| ~~OQ-05~~ | ~~Social media beyond LinkedIn?~~ → **RESOLVED: Yes, carry forward all 4 (LinkedIn, Facebook, X, YouTube)** | CHG-04 footer | Jake confirmed: carry forward everything |
| ~~OQ-06~~ | ~~Phone/email in footer?~~ → **RESOLVED: Yes, include both** | CHG-04 footer | Jake confirmed: carry forward everything |
| ~~OQ-07~~ | ~~ARAnet attribution?~~ → **RESOLVED: Yes, include it** | CHG-04 footer | Jake confirmed: carry forward everything |
| ~~OQ-08~~ | ~~"Editorial Content" in footer — same as "Editorial Content Library" in nav?~~ → **RESOLVED: Yes, both → https://www.brandpointcontent.com** | CHG-01 + CHG-04 | Same destination, MaDonna used shorter name in footer context |
| ~~OQ-09~~ | ~~Search in nav?~~ → **RESOLVED: No. MaDonna was specific about nav items and didn't include search. Skip it.** | CHG-01 nav | Jake confirmed |
