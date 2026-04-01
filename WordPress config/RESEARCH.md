# WordPress + Claude Code Integration — Research

## Goal
Enable Claude Code to manage, edit, and deploy content from this static HTML repo directly to the live WordPress site at `brandpoint.com`.

---

## Approaches Evaluated

### 1. WordPress REST API (Direct curl — Recommended Phase 1)

WordPress ships with a comprehensive REST API (v2, available since WP 4.7+). Claude Code can use `curl` via the Bash tool immediately — zero additional tooling.

**Key Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/wp-json/wp/v2/pages` | GET | List pages |
| `/wp-json/wp/v2/pages` | POST | Create page |
| `/wp-json/wp/v2/pages/{id}` | PUT | Update page |
| `/wp-json/wp/v2/pages/{id}` | DELETE | Delete page |
| `/wp-json/wp/v2/media` | POST | Upload media (images) |
| `/wp-json/wp/v2/posts` | GET/POST/PUT | Manage posts |

**Authentication — Application Passwords (built into WP 5.6+):**
- Generate in WordPress Admin → Users → Profile → Application Passwords
- Use HTTP Basic Auth: `Authorization: Basic base64(username:app_password)`
- Each password can be independently revoked
- No plugins required

**Yoast SEO REST Fields (requires Yoast 14.0+):**
- Set via `meta` object when creating/updating pages:
  - `yoast_wpseo_title` — SEO title
  - `yoast_wpseo_metadesc` — Meta description
  - `yoast_wpseo_focuskw` — Focus keyword
  - `yoast_wpseo_canonical` — Canonical URL
  - `yoast_wpseo_opengraph-title` — OG title
  - `yoast_wpseo_opengraph-description` — OG description
  - `yoast_wpseo_opengraph-image` — OG image URL

**Pros:** Official, stable, well-documented, works today with zero setup on WP side
**Cons:** Verbose curl commands, manual image path rewriting, JSON escaping for complex HTML

---

### 2. WordPress MCP Server (Recommended Phase 2)

Community-built MCP servers wrap the WordPress REST API into native Claude Code tools.

**Available implementations:**
- `jeremypress/jeremypress` — TypeScript MCP server, posts/pages CRUD, media upload
- Various `wordpress-mcp` / `wp-mcp-server` packages on npm/GitHub
- Generic REST API MCP servers that can be configured for WordPress

**How it works:**
1. Install via npm
2. Configure in Claude Code MCP settings (`.mcp.json` or `~/.claude/mcp_servers.json`)
3. Provide WP site URL + Application Password as env vars
4. Claude Code gets tools like `wp_create_page`, `wp_upload_media`, `wp_update_post`

**Pros:** Native Claude Code integration, structured tool calls, clean abstraction
**Cons:** Community-maintained, may lag behind API changes, variable feature coverage

---

### 3. WP-CLI via SSH

WordPress Command Line Interface — requires SSH access to the server.

**Key commands:**
```bash
wp post create --post_type=page --post_title='Title' --post_content='<html>' --post_status=draft
wp post update 123 --post_content='<new HTML>'
wp media import /path/to/image.png --title='Image Title'
wp post meta update 123 _yoast_wpseo_title 'SEO Title'
wp menu list
wp menu item add-post main-menu 123
```

**Remote execution via alias:**
```yaml
# ~/.wp-cli/config.yml
@brandpoint:
  ssh: user@brandpoint-server/path/to/wordpress
```

**Pros:** Full control, database access, menu management, bulk operations
**Cons:** Requires SSH access (hosting-dependent), more setup, stdout parsing

---

### 4. WPGraphQL (Optional Enhancement)

WordPress plugin exposing a GraphQL API — more flexible than REST for complex queries.

- Plugin: `wp-graphql/wp-graphql` (free)
- Yoast extension: `wp-graphql/wp-graphql-yoast-seo`
- Supports mutations for content creation/updates
- Get exactly the fields you need in one query

---

## Critical Caveat: Page Builders

**If brandpoint.com uses Elementor, WPBakery, Divi, or Beaver Builder**, pushing raw HTML via the REST API `content` field will NOT render correctly. These builders store layout data in serialized post meta (e.g., `_elementor_data` for Elementor), not in `post_content`.

**If a page builder is in use, options are:**
1. Use the builder's own API (Elementor has one)
2. Designate specific pages as "Classic Editor" pages that accept raw HTML
3. Use a custom page template that renders `the_content()` without builder processing

**This must be verified before proceeding.**

---

## Comparative Summary

| Approach | Setup | HTML Push | Media | SEO Tags | Menus | Best For |
|----------|-------|-----------|-------|----------|-------|----------|
| REST API (curl) | Low | Yes | Yes | Yes (Yoast) | Limited | Quick start |
| MCP Server | Medium | Yes | Yes | Partial | Partial | Native integration |
| WP-CLI via SSH | Medium-High | Yes | Yes | Yes | Yes | Full server access |
| WPGraphQL | Medium | Yes | Yes | Yes (w/ext) | Yes | Complex queries |

---

## Recommended Phased Strategy

### Phase 1: Immediate (This Week)
- Verify REST API is accessible: `GET https://brandpoint.com/wp-json/wp/v2/pages`
- Generate WordPress Application Password for MaDonna's admin account
- Store credentials securely on HavokAI (env vars, not in git)
- Use `curl` via Claude Code's Bash tool for content pushes
- Create `deploy-to-wp.sh` script for repeatable deployments

### Phase 2: Short-Term
- Evaluate and install a WordPress MCP server
- Configure in Claude Code's MCP settings
- Replace manual curl with native tool calls

### Phase 3: Optional
- Install WPGraphQL on brandpoint.com for flexible queries
- Set up WP-CLI via SSH if hosting supports it
- Build GitHub Actions CI/CD: git push → auto-deploy to WordPress

---

## Prerequisites to Verify on brandpoint.com

1. **REST API accessible?** Visit `https://brandpoint.com/wp-json/wp/v2/pages`
2. **Hosting provider?** Determines SSH availability
3. **Yoast SEO version?** Need 14.0+ for REST meta fields
4. **Page builder in use?** Elementor/WPBakery/Divi would change the approach
5. **WordPress version?** Need 5.6+ for Application Passwords
6. **Current page template for homepage?** Needed for the `template` field in REST API
7. **MaDonna's admin role?** Needs Administrator or Editor for API access
