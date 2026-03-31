# TESTS.md — Brandpoint Homepage Update v2 Verification Plan

**Companion:** SPEC.md (AC-01 through AC-19)
**Method:** Manual verification + browser DevTools + Playwright automated checks where possible

---

## Test Environment

- **Browsers:** Chrome (latest), Firefox (latest), Safari (latest)
- **Viewports:** 1440px, 1024px, 768px, 375px
- **Tools:** Browser DevTools, Playwright MCP, manual inspection
- **Local server:** `npx serve .` or direct file open

---

## T-01: Sticky Navigation (→ AC-01)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 1.1 | Nav visible at top of page on load | `<header class="bp-landing-nav">` rendered before hero | |
| 1.2 | Brandpoint logo present | Logo image in nav, links to `#` | |
| 1.3 | "Who We Are" link | href = `https://www.brandpoint.com/who-we-are/` | |
| 1.4 | "Who We Work With" link | href = `https://www.brandpoint.com/who-we-work-with/` | |
| 1.5 | "Blog" link | href = `https://www.brandpoint.com/blog/` | |
| 1.6 | "Editorial Content Library" link | href = `https://www.brandpointcontent.com` | |
| 1.7 | "Contact Us" button | href = `https://www.brandpoint.com/contact/`; has orange button styling | |
| 1.8 | Sticky behavior | Scroll down 500px — nav still visible at top | |
| 1.9 | Scroll state styling | After scrolling past ~50px, nav has background/shadow change (`.bp-landing-nav-scrolled` class added) | |
| 1.10 | No content overlap | Hero content not hidden behind nav on initial load | |

## T-02: Nav Responsive (→ AC-02)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 2.1 | Desktop (1440px) | All 5 links + CTA visible inline | |
| 2.2 | Mobile (375px) | Links hidden; hamburger icon visible | |
| 2.3 | Hamburger tap | Menu opens showing all links | |
| 2.4 | Link tap in mobile menu | Menu closes after link tap | |
| 2.5 | Accessibility | Hamburger has `aria-expanded` attribute that toggles | |

## T-03: Hero Map Replaced (→ AC-03)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 3.1 | Image source | `src="assets/images/distribution-map.png"` | |
| 3.2 | Old SVG removed | No reference to `distribution-map.svg` in HTML | |
| 3.3 | Alt text | Descriptive alt text present (not "Placeholder:") | |
| 3.4 | Visual check | Light blue US map with dots visible in hero right column | |

## T-04: Value Prop Section (→ AC-04)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 4.1 | Section exists | `<section id="value-prop">` in DOM | |
| 4.2 | Position | Between hero and social proof in scroll order | |
| 4.3 | Content | Lorem ipsum text present | |
| 4.4 | Placeholder marked | HTML comment containing "PLACEHOLDER" and "MaDonna" (e.g., `<!-- PLACEHOLDER: MaDonna to provide value prop copy -->`) | |
| 4.5 | Visual consistency | Section spacing and typography match page design | |

## T-05: Social Proof Real Logos (→ AC-05)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 5.1 | Logo count | 10 unique logos (20 total with duplicates for loop) | |
| 5.2 | Logo sources | All `src` paths point to `assets/logos/pr-agency/` | |
| 5.3 | Logo names | FINN Partners, Coyne PR, FleishmanHillard, Hill+Knowlton, Zeno, Golin, GCI Health, Ogilvy, Weber Shandwick, Carmichael Lynch (check alt text) | |
| 5.4 | No placeholders | No `placeholder-brand-*.svg` references | |
| 5.5 | Slider animates | Continuous horizontal scroll | |
| 5.6 | Seamless loop | No gap/jump when restarting | |

## T-06: Prices Removed (→ AC-06)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 6.1 | Search HTML for "bp-price" | Zero results | |
| 6.2 | Search HTML for "$" in package cards | Zero results (no dollar amounts) | |
| 6.3 | Visual check | No price text visible in any package card | |
| 6.4 | Layout intact | Package cards still display name + features without gaps | |

## T-07: "Most Popular" Badge Removed (→ AC-07)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 7.1 | Search HTML for "Most Popular" | Zero results | |
| 7.2 | Search HTML for "bp-landing-package-featured" | Zero results | |
| 7.3 | Signature Plus card | No badge element | |
| 7.4 | Optimize card | "New" badge still present | |

## T-08: Optimize Logo Image (→ AC-08)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 8.1 | Logo image renders | `bpt-optimize-logo.png` visible in SEC-05 heading area | |
| 8.2 | Alt text | alt="Brandpoint Optimize" | |
| 8.3 | Readable at desktop | Logo clear at 1440px | |
| 8.4 | Readable at mobile | Logo scales down appropriately at 375px | |
| 8.5 | Old text removed | No `<span class="bp-landing-optimize-logo-accent">` in HTML | |
| 8.6 | "Meet " text prefix | Plain text "Meet " appears before the logo image in the H2 element | |

## T-09: New Quote Placeholder (→ AC-09)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 9.1 | Blockquote exists | `<blockquote>` element between feature cards and AI Visibility section | |
| 9.2 | Position correct | After `.bp-landing-optimize-cards`, before `.bp-landing-visibility-section` | |
| 9.3 | Placeholder marked | HTML comment containing "PLACEHOLDER" and "MaDonna" (e.g., `<!-- PLACEHOLDER: MaDonna to provide quote copy -->`) | |
| 9.4 | Styled consistently | Visual treatment matches SEC-05c client quote | |

## T-10: Gauge Sub-header Text (→ AC-10)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 10.1 | New text present | "Generated by Brandpoint Intelligence proprietary formula" | |
| 10.2 | Old text gone | No "Weighted average across AI Visibility" in HTML | |

## T-11: Customization Images (→ AC-11)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 11.1 | Row 1 logos | `ap.png`, `usa-today.png`, `business-journals.png` render | |
| 11.2 | Row 2 image | `specialty-formats.png` renders (composite with infographic + articles) | |
| 11.3 | Row 3 image | `native-ads.png` renders (composite with sponsored content examples) | |
| 11.4 | No SVG placeholders | No `<svg>` elements in SEC-06 media areas | |
| 11.5 | No old placeholder divs | No `.bp-landing-format-item` or `.bp-landing-native-ad-placeholder` in HTML | |

## T-12: Premium Publisher Network Reel (→ AC-12)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 12.1 | Section exists | `<section id="publisher-network">` in DOM | |
| 12.2 | Position | Between customizations and case study in scroll order | |
| 12.3 | H2 text | "Premium Publisher Network" | |
| 12.4 | Logo count | 16 unique outlet logos (32 total with duplicates) | |
| 12.5 | Logo sources | All `src` paths point to `assets/logos/outlets/` | |
| 12.6 | Slider animates | Continuous horizontal scroll | |
| 12.7 | Seamless loop | No gap/jump when restarting | |
| 12.8 | Independent animation | Does not interfere with Social Proof slider | |
| 12.9 | Subtitle text | "Premium publisher network with exclusive partnerships in key media outlets" present under H2 | |

## T-13: Case Study 2-Column (→ AC-13)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 13.1 | Image present | `see-our-work.png` renders in case study section | |
| 13.2 | Layout at desktop | Image on LEFT, text on RIGHT | |
| 13.3 | Layout at mobile | Stacked (image top, text bottom) | |
| 13.4 | Text unchanged | Copy and link unchanged from v1 | |
| 13.5 | Link href | `https://www.brandpoint.com/case-studies/coopervision/` | |

## T-14: Footer (→ AC-14)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 14.1 | Footer exists | `<footer class="bp-landing-footer">` in DOM | |
| 14.2 | Brandpoint logo | Logo image present in footer | |
| 14.3 | Address | "850 5th St S, Hopkins, MN 55343" visible | |
| 14.4 | Phone | "(952) 278-0780" visible and linked (`tel:`) | |
| 14.5 | Email | "contact@brandpoint.com" visible and linked (`mailto:`) | |
| 14.6 | Careers link | href = `https://www.indeed.com/cmp/Brandpoint-3` | |
| 14.7 | Blog link | href = `https://www.brandpoint.com/blog/` | |
| 14.8 | Free Resources link | href = `https://www.brandpoint.com/solutions/resources/` | |
| 14.9 | Contact Us link | href = `https://www.brandpoint.com/contact/` | |
| 14.10 | Editorial Content link | href = `https://www.brandpointcontent.com` | |
| 14.11 | Privacy Policy link | href = `https://www.brandpoint.com/privacy/` | |
| 14.12 | LinkedIn | href = `https://www.linkedin.com/company/brandpoint/` | |
| 14.13 | Facebook | href = `https://www.facebook.com/Brandpoint/` | |
| 14.14 | X/Twitter | href = `https://x.com/brandpointco` | |
| 14.15 | YouTube | href = `https://www.youtube.com/user/BrandpointContent` | |
| 14.16 | ARAnet | "An ARAnet Company" with link to `https://www.aranet.io/` | |
| 14.17 | Copyright | "© Brandpoint 2026" | |
| 14.18 | CA Privacy | Link to `/privacy-notice-california/` | |
| 14.19 | Founded text | "Founded in 1996. Independently owned." | |

## T-15: SEO (→ AC-15)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 15.1 | Title tag | Updated for homepage context (not "Strategic Distribution Solutions") | |
| 15.2 | Meta description | Updated, descriptive of homepage content | |
| 15.3 | OG title | Matches title tag | |
| 15.4 | OG description | Matches meta description | |
| 15.5 | OG image | `og:image` meta tag present with valid image URL | |
| 15.6 | Single H1 | Exactly one `<h1>` element in the document (hero heading) | |
| 15.7 | Heading hierarchy | All H2s at section level; H3s for sub-sections; no skipped levels | |
| 15.8 | Alt text audit | Every `<img>` has descriptive alt text; none start with "Placeholder:" | |

## T-16: All CTAs Functional (→ AC-16)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 16.1 | Hero CTA | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.2 | Thin CTA Band | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.3 | AI Visibility CTA | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.4 | Final CTA | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.5 | Nav Contact Us | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.6 | Footer Contact Us | href = `https://www.brandpoint.com/contact/` (absolute URL) | |
| 16.7 | Case study link | href = `https://www.brandpoint.com/case-studies/coopervision/` (absolute URL) | |
| 16.8 | All nav links absolute | All 5 nav hrefs use `https://` prefix | |
| 16.9 | All footer links absolute | All footer hrefs use `https://` prefix (including Indeed careers) | |
| 16.10 | External form pages resolve | https://www.brandpoint.com/contact/, /solutions/resources/, /blog/how-to-turn-seasonal-trends-into-meaningful-brand-stories/ all load | |

## T-17: Responsive (→ AC-17)

| # | Viewport | Check | Expected | Pass? |
|---|---|---|---|---|
| 17.1 | 1440px | Full page render | All sections visible; no horizontal scroll; nav inline | |
| 17.2 | 1024px | Tablet landscape | Packages 3-col; content readable; nav may condense | |
| 17.3 | 768px | Tablet portrait | Nav hamburger; packages 2-col; sections stack; case study stacks | |
| 17.4 | 375px | Mobile | All single column; CTA buttons full width; footer stacked; text readable | |
| 17.5 | All | No horizontal scroll | `document.body.scrollWidth <= window.innerWidth` at all breakpoints | |

## T-18: WordPress Compatible (→ AC-18)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 18.1 | Class prefixes | All classes use `bp-landing-` prefix | |
| 18.2 | No framework deps | No React/Vue/Angular imports | |
| 18.3 | Vanilla JS | Only standard DOM APIs used | |
| 18.4 | Self-contained | CSS in `styles.css`, JS in `main.js`, no external deps beyond Google Fonts | |

## T-19: No Regressions (→ AC-19)

| # | Check | Expected | Pass? |
|---|---|---|---|
| 19.1 | SEC-04 CTA Band | Text "Let's get started today!" + "Contact Us" button unchanged | |
| 19.2 | SEC-08 Final CTA | Text "Ready to get your brand in front of millions?" + button unchanged | |
| 19.3 | SEC-05c Client Quote | Quote text unchanged, styled correctly | |
| 19.4 | Scroll reveal | All `.bp-landing-reveal` elements still animate on scroll | |
| 19.5 | Gauge animation | AI Visibility donut fill animation still works on scroll | |

---

## Supplementary Checks (Non-Blocking)

| # | Check | Expected |
|---|---|---|
| S-1 | Lighthouse Performance | > 80 (images are unoptimized PNGs — score may be lower) |
| S-2 | Lighthouse Accessibility | > 90 |
| S-3 | Lighthouse SEO | > 90 |
| S-4 | HTML validation | W3C validator — no errors |
| S-5 | Image file sizes | Note total page weight; flag for future optimization |
