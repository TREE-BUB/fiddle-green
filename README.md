# Fiddle Green

Marketing site for Fiddle Green — a Maine technology consulting company for
organizations too small to be anyone else's priority (legal entity: MIXHEL
SERVICES, LLC). Jekyll, deployed to GitHub Pages at
[fiddle.green](https://fiddle.green).

In prose, always write "Fiddle Green." The comma in the wordmark is a logo
device only and does not appear in body copy, headings, or alt text.

## Running locally

```sh
bundle install
bundle exec jekyll serve
```

## How it is put together

- **`_data/nav.yml`** is the single source of truth for navigation. The header
  dropdowns, the mobile drawer, the hub hero rails, and the footer sitemap all
  render from it. Three per-child switches shape the differences:
  `in_footer: false` (omit from the footer column), `footer_only: true` (footer
  only), and `rail_url:` (override the hub rail button's destination).
- **`_data/segments.yml` / `_data/expertise.yml`** carry the card copy reused
  across the home page and the two hubs.
- **`_data/seg_pages.yml` / `_data/exp_pages.yml`** carry the body copy for the
  data-driven sub-pages. A page like `who-we-help/startups.html` is front
  matter only; the `segment` layout looks its copy up by `seg_key`.
- **`assets/css/style.scss`** is the whole stylesheet. Design tokens are CSS
  custom properties on `:root`.
- **`assets/js/`** is two small vanilla scripts: `nav.js` (dropdowns and the
  mobile drawer) and `blog.js` (category filters and the home carousel).

## Blog

Posts live in `_posts/` and publish at `/about/blog/:title/`. The category in
front matter (`categories: ["Nonprofits"]`) drives the filter pills on the blog
index; it must match one of the labels in the pill list on `about/blog.html`.

## Assets

| File | Use |
| --- | --- |
| `assets/fiddlehead.png` | hero watermark on Home, small mark beside headings and on cards |
| `assets/wordmark-light.png` | wordmark for green backgrounds (header, footer) |
| `assets/wordmark-dark.png` | wordmark for cream backgrounds (unused on the site; kept for print and light-header contexts) |
| `assets/favicon.png` | browser tab icon |

The three above were derived from the brand source files also in `assets/`
(`Fiddlehead.png`, `wordmark.png`, `wordmark-tight.png`), which carry a baked-in
green background. If transparent originals become available, drop them in at the
same filenames — no code change is needed.

Team portraits live in `assets/team/`. The `person` partial falls back to a
striped circular placeholder for anyone without a `photo`.

## Deploying

The site keeps to GitHub Pages' whitelisted plugin set, so it builds either
through Pages' own builder or through `.github/workflows/jekyll.yml`, which
builds with the Jekyll version pinned in the `Gemfile` and deploys the result.
`CNAME` points that at `fiddle.green`.

### Cloudflare (staging)

`wrangler.jsonc` serves `./_site`, Jekyll's build output — not the repo root,
which is source and would otherwise expose `_config.yml`, the `Gemfile`, and
templates with their front matter served verbatim.

`_site/` is committed on the staging branch so the deploy works whether or not
a build step is configured in Cloudflare. **Rebuild and commit it whenever you
change the site**, or it will serve stale:

```sh
bundle exec jekyll build && git add _site && git commit
```

To have Cloudflare build instead, set the build command to
`bundle exec jekyll build` and the output directory to `_site`; `_site/` can
then be dropped from the branch and re-ignored.

## Still to confirm

- The blog posts carry final titles, summaries, categories, and dates from the
  approved design, but their bodies are placeholders.
- `/about/history-and-testimonials/` still carries the invented milestone
  timeline and named testimonials from the design comp, and is the one page
  still writing the wordmark as "FIDDLE,GREEN" in prose.
- `/who-we-help/government/` has not been revised against the positioning
  document, still writes "FIDDLE,GREEN" in prose, and shows `[ pending ]` for
  UEI and CAGE with placeholder rows under Past performance.
