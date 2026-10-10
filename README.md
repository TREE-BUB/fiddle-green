# FIDDLE,GREEN

Marketing site for FIDDLE,GREEN — a Maine technology consultancy built for
small organizations (legal entity: MIXHEL SERVICES, LLC). Jekyll, deployed
to GitHub Pages at [fiddle.green](https://fiddle.green).

The name is written "FIDDLE,GREEN" everywhere, in body copy and headings as
well as the wordmark.

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
front matter (`categories: ["Nonprofits"]`) drives the filter pills on both the
blog index and the home carousel; it must match one of the labels in the pill
lists on `index.html` and `about/blog.html`.

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

Team portraits are not yet supplied; the roster on `/about/team/` uses striped
circular placeholders.

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

## Parked: public sector

The public sector is not offered at launch. Its page and copy are kept in the
source but switched off, so bringing it back is a matter of undoing these
flags (each is marked "parked for launch"):

- `who-we-help/public-sector.html`, `retired/who-we-help/government.html`, and
  the two "Public Sector" posts in `_posts/`: delete `published: false`.
- `_data/nav.yml`: delete `hidden: true` on the Public Sector child.
- `_data/segments.yml`: delete `on_home: false` on `public-sector`.
- `about/testimonials.html`: add public sector quotes with `segment: Public Sector`
  (the placeholder group from the original design is in git history).
- `about/blog.html`: add "Public Sector" back to the filter pills.

Site-wide copy that named public agencies was rewritten to name startups,
small businesses, and nonprofits only; commit `55f38ad`
marks the last commit with the original wording.

Before relaunching it, `/who-we-help/public-sector/` still needs revising
against the positioning document; it shows `[ pending ]` for UEI and CAGE
with placeholder rows under Past performance.

## Parked: training and education

Training & Education is not offered at launch either, and is switched off the
same way:

- `services/training-and-education.html` and its two old-URL redirects,
  `retired/services/education.html` and `retired/expertise/education.html`:
  delete `published: false`.
- `_data/nav.yml`: delete `hidden: true` on the Training & Education child.
- `_data/expertise.yml`: delete `on_home: false` on `training`.

Its body copy stays in `_data/exp_pages.yml` under `training`, untouched.

## Still to confirm

- The blog posts carry final titles, summaries, categories, and dates from
  the approved design, but their bodies are placeholders.
- `/about/testimonials/` carries five mock-up quotes (two startup founders, two
  nonprofit leaders, one small-business owner) with bracketed placeholder names.
  Each needs replacing with a real client's words, and their permission, before
  launch.
