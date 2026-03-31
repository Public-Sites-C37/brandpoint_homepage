# Brandpoint.com Site Audit — Current State

**Audited:** 2026-03-31
**Purpose:** Our landing page is replacing the brandpoint.com homepage. All existing links and functionality must be preserved.

---

## Current Site Navigation (Top Nav)

| Label | URL | Notes |
|---|---|---|
| Who We Work With | /who-we-work-with/ | Case studies + client logos |
| Who We Are | /who-we-are/ | Company values, team, 87% retention stat |
| Contact | /contact/ | Form: First, Last, Company, Phone, Email, Comment |
| Search | /?s= | Search widget |

**NOTE:** MaDonna's new nav adds: Blog, Editorial Content Library. These are additions to the current nav structure.

---

## Current Footer Links

| Label | URL | Notes |
|---|---|---|
| Blog | /blog/ | Card-based listing, paginated (7 pages) |
| Careers | https://www.indeed.com/cmp/Brandpoint-3 | External — Indeed |
| Contact Us | /contact-2/ | **Different from /contact/** — footer uses /contact-2/ |
| Free Resources | /solutions/resources/ | eBooks, webinars, checklists (2 pages) |
| Privacy Policy | /privacy/ | Full privacy policy |
| CA Privacy Rights | /privacy-notice-california/ | California-specific |

### Footer Contact Info
- **Phone:** (952) 278-0780
- **Email:** contact@brandpoint.com
- **Address:** Minneapolis Headquarters (Google Maps link — no street address shown)
- **Parent:** "An ARAnet Company" → https://www.aranet.io/

### Footer Social Media
| Platform | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/company/brandpoint/ |
| Facebook | https://www.facebook.com/Brandpoint/ |
| X/Twitter | https://x.com/brandpointco |
| YouTube | https://www.youtube.com/user/BrandpointContent |

### Footer Legal
- "Founded in 1996. Independently owned."
- Copyright © Brandpoint 2026

---

## Current Homepage Content (Being Replaced)

### Hero
- Tagline: "Where you want your brand seen. How you want your story told. Guaranteed in our publisher network."

### Sections
1. **Why Brandpoint** — Premium publisher network, custom campaigns, 30 years experience
2. **Four-Step Process** — Learn → Develop → Share → Measure
3. **Industries** — Health & Wellness, Consumer Goods, Home & Garden, Financial Services, Food & Drink, Non-Profits, B2B, Pharma, Travel
4. **Case Studies** — Links to 8 case studies:
   - /case-studies/emerson/
   - /case-studies/quarrix/
   - /case-studies/ad-council/
   - /case-studies/visa/
   - /case-studies/aaos/
   - /case-studies/christopher-dana-reeve-foundation/
   - /case-studies/minnesota-department-of-health
   - /case-studies/coopervision/
5. **CTAs** — Get in touch, See our work, Learn about us

### Homepage Meta
- Title: "Branded Content & Promotion | Brandpoint"
- Description: "Brandpoint is a full-service branded content solution agency..."

---

## Key Pages That Must Remain Accessible

### Pages MaDonna Specifically Mentioned (Forms Must Work)
1. **Contact page** — /contact/ (form: First, Last, Company, Phone, Email, Comment)
2. **Solutions/Resources** — /solutions/resources/ (downloadable eBooks, webinars, etc.)
3. **Blog post** — /blog/how-to-turn-seasonal-trends-into-meaningful-brand-stories/
   - Contains embedded **Trending Topics newsletter signup form** (First, Last, Company, Email, Dropdown: Home and Garden / B2B / Consumer Goods and Travel / Health / General)

### Other Key Internal Pages
| Page | URL |
|---|---|
| Who We Work With | /who-we-work-with/ |
| Who We Are | /who-we-are/ |
| Blog | /blog/ |
| All Case Studies | /case-studies/* (8 known) |
| All Resources | /resources/* (8 known, paginated) |
| Privacy Policy | /privacy/ |
| CA Privacy | /privacy-notice-california/ |

---

## URL Discrepancy: /contact/ vs /contact-2/ — RESOLVED

**`/contact-2/` redirects (301) to `/contact/`.** They are the same page. The footer's link to `/contact-2/` is legacy — it just redirects. **Use `/contact/` everywhere.** Confirmed via Playwright browser navigation on 2026-03-31.

---

## SEO Considerations for Homepage Takeover

1. **Title tag** must change — current: "Branded Content & Promotion | Brandpoint" → needs new title reflecting distribution solutions focus
2. **Meta description** must be updated for homepage context
3. **OG tags** need updating
4. **All 8 case study pages** remain accessible (linked from /who-we-work-with/)
5. **Blog** (7 pages, paginated) must remain navigable
6. **Resources** (2 pages) must remain navigable
7. **Structured data** — current site has Schema.org markup; our page should match
