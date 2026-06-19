# Handoff: FIDDLE,GREEN — "Coming Soon" Landing Page

## Overview
A single-page "Coming Soon" landing page for FIDDLE,GREEN, a new Portland, Maine–based
IT & digital consulting firm. The page introduces the firm in the founder's voice and
drives a single action: emailing `hello@fiddle.green`. Target domain: **fiddle.green**.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the
intended look and behavior, **not production code to copy directly**. The HTML entry file
(`Coming Soon.dc.html`) is authored in an internal "Design Component" format and includes a
runtime shim (`<x-dc>` wrapper, `support.js`) that is **not needed in production** — ignore it.

The task is to **recreate this design in the target codebase's environment** using its
established patterns and libraries. There is no existing app yet, so pick the most appropriate,
lightweight approach: a single static HTML/CSS page is entirely sufficient here (no framework
required). If you prefer Next.js / Astro / plain Vite, that's fine too — but this is one static
screen with one mailto link, so keep it simple.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and the single interaction are final.
Recreate the UI pixel-accurately. The only known content caveat is below.

> **Content note:** in the current prototype the opening "Hi! / I started…" framing was edited
> down over revisions. The final body copy is signed **"Jimi Michel, Founder"**. Confirm the
> exact final wording with the client before launch.

## Layout
Single full-viewport screen, dark forest-green background.

- **Page container:** `min-height: 100vh`, full width, `background: #1a4a28`.
  Flex column, `align-items: center`, `justify-content: space-between`, `padding: 56px 24px`,
  `overflow: hidden`. Font family `'Jost', sans-serif` for everything.
- **Content column:** centered, `max-width: 720px`, `text-align: center`, flex column,
  `align-items: center`, `justify-content: center`. Vertically centered in the viewport.
- Stacking order, top to bottom:
  1. "COMING SOON" eyebrow
  2. Wordmark logo image
  3. Body copy block (`max-width: 540px`)
  4. Email CTA button
  5. "Made with ❤️…" footer caption

## Components

### 1. Eyebrow — "Coming soon"
- Text: `Coming soon` (rendered uppercase via CSS)
- `font-size: 13px`, `font-weight: 500`, `letter-spacing: 0.42em`, `text-transform: uppercase`
- `color: #d4882a` (Amber)
- `margin-bottom: 2px`, `padding-left: 0.42em` (optical centering against the tracking)

### 2. Wordmark logo
- Image: `assets/wordmark-tight.png` (the horizontal wordmark, cropped tight to the artwork).
  The image background is the same forest green (`#1a4a28`) as the page, so it sits seamlessly.
- `display: block`, `width: 100%`, `max-width: 520px`, `height: auto`, `margin: 0`
- Source full-bleed asset: `assets/wordmark.png` (1200×600 with padding). `wordmark-tight.png`
  (1018×163) is the trimmed version used on the page. For production, prefer an **SVG** wordmark
  if the client can supply one (the "FIDDLE,GREEN" lettering with the amber fiddlehead comma).
- `alt="FIDDLE,GREEN"`

### 3. Body copy block
- Container: `max-width: 540px`, `margin-top: 6px`, flex column, `gap: 1.1em`,
  `text-wrap: pretty`, `text-align: center`
- Type: `font-size: 21px`, `line-height: 1.7`, `font-weight: 200`, `color: #ffffff`
- Paragraphs are **italic** (`font-style: italic`); the signature line is **not** italic.
- Current copy:
  - "FIDDLE,GREEN is a new business I started because I kept meeting people — neighbors,
    small business owners, and folks running nonprofits — who were stuck on technology problems
    and didn't know where to turn."
  - "Maybe you're not sure if your business is protected online. Maybe you've got questions
    about AI and don't know who to ask. Maybe someone offered you a tech solution and you just
    want a second opinion from someone you can trust."
  - "Whatever it is, you don't need to figure it out alone. That's exactly what we're here for.
    Click below to say hello — no jargon, no pressure, just a conversation to see if we can help."
  - "Jimi Michel, Founder"  *(this line is `font-style: normal`)*

### 4. Email CTA button
- Element: `<a href="mailto:hello@fiddle.green">`
- Layout: `display: inline-flex`, `align-items: center`, `gap: 12px`, `margin-top: 40px`
- Style: `background: #d4882a` (Amber), `color: #1a1f1a` (Deep), `padding: 16px 30px`,
  `border-radius: 999px` (pill), `text-decoration: none`
- Type: `font-size: 16px`, `font-weight: 500`, `letter-spacing: 0.02em`
- Leading dot: a `7px × 7px` circle, `border-radius: 50%`, `background: #1a4a28` (Forest)
- Label text: `hello@fiddle.green`
- **Hover:** `background: #e0974a`, `transform: translateY(-2px)`,
  `box-shadow: 0 12px 28px rgba(0,0,0,0.28)`
- **Transition:** `transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease`

### 5. Footer caption
- Text: `Made with ❤️ in Deering Center, Portland (Maine)`
- `margin-top: 28px`, `font-size: 14px`, `font-weight: 300`, `letter-spacing: 0.04em`
- `color: #a8b89c` (Sage)

## Interactions & Behavior
- Single interaction: clicking the CTA opens the user's mail client to `hello@fiddle.green`
  (standard `mailto:` link).
- Button hover lift + shadow + lighter amber, as specified above.
- No nav, no scroll, no forms, no JS state. Page is static.
- **Responsive:** the layout already fits small screens (logo and copy are `width: 100%`
  capped by `max-width`, container padding `56px 24px`). On narrow phones, consider reducing
  body copy to ~18px and CTA to fit; otherwise the centered single column scales down cleanly.

## Typography
- **Font family:** Jost (Google Fonts), weights **200, 300, 400, 500** plus **italic 200/400**.
  Import: `https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;1,200;1,400&display=swap`
- Body copy: 21px / 1.7 / weight 200 / italic
- Eyebrow: 13px / weight 500 / 0.42em tracking / uppercase
- CTA: 16px / weight 500
- Footer: 14px / weight 300

## Design Tokens (brand palette)
| Role | Name | Hex |
|---|---|---|
| Primary background | Forest | `#1a4a28` |
| Secondary background | Mist | `#f4f6f4` |
| Accent / CTA | Amber | `#d4882a` |
| CTA hover | (lighter amber) | `#e0974a` |
| Supporting accent | Sage | `#a8b89c` |
| Body text (light bg) | Deep | `#1a1f1a` |
| Body text (dark bg) | White | `#ffffff` |
| Muted text / captions | Pine Slate | `#3d4a3d` |
| Dividers / borders | Frost | `#dde4dd` |

This page uses Forest (bg), Amber (eyebrow + CTA), White (body), Deep (CTA text),
and Sage (footer). Mist/Frost/Pine Slate are part of the brand system for future light-bg pages.

Spacing values used: 56/24px page padding, 40px CTA top margin, 28px footer top margin,
6px copy top margin, 2px eyebrow bottom margin, 1.1em paragraph gap.
Radii: pill button `999px`. Shadow (hover): `0 12px 28px rgba(0,0,0,0.28)`.

## Assets
All in `assets/`:
- `wordmark-tight.png` — horizontal wordmark cropped tight to artwork (**used on page**), 1018×163
- `wordmark.png` — full-bleed horizontal wordmark (forest bg), 1200×600
- `Circle Wordmark.png`, `Square Wordmark.png`, `Fiddlehead.png` — other brand lockups
  (provided for reference / favicon / social use; not on this page)

All wordmark assets bake in the forest-green background. If you need a transparent or
recolorable mark, request the original vector/SVG from the client.

## Files
- `Coming Soon.dc.html` — the design prototype (ignore the `<x-dc>` wrapper and `support.js`
  reference; the relevant markup is the inner `<div>` tree and its inline styles).

## Suggested production starting point
A single `index.html` + small `<style>` (or one CSS file) reproducing the inline styles above,
the Jost `<link>`, and the wordmark image — deployed as a static site. Add a `<title>` and
favicon (use `Circle Wordmark.png` or `Fiddlehead.png`), plus basic Open Graph meta for sharing.
