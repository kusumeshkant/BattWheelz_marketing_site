# Battwheelz Marketing Site

The public marketing website. Not the ops dashboard, not the rider app, not the API — this
project has **no backend dependency at all** and never talks to `battwheelz-backend-demo/backend`.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
npm run lint     # REQUIRED before declaring done
npm start        # serves the production build
```

`npm run build` produces a fully static `out/` directory (`output: "export"` in
`next.config.mjs`). No Node server is needed in production — any CDN or static host serves it.

## Why Next.js and not Vite

The rest of the repo uses Vite, but this is the one deliverable whose **entire purpose is
being found by strangers**. Next's App Router gives static pre-rendering (crawlers get
complete HTML, not an empty `<div id="root">`), the Metadata API (title/OG/Twitter/canonical
generated from one config), file-based `sitemap.js` / `robots.js`, and `next/font`
self-hosting. Reproducing that on Vite is several plugins and a lot of hand-rolling.

Nothing here is server-rendered at request time — the build is a static export, so the
hosting story is as simple as the Vite dashboard's.

## Deployment

Cloudflare Pages, project **`battwheelz-marketing`**, deployed as a static export.

```bash
npm run build
wrangler pages deploy out --project-name=battwheelz-marketing --branch=main --commit-dirty=true
```

Live preview: <https://battwheelz-marketing.pages.dev> → `battwheelz-demo.dqstore.in`

**`wrangler pages domain` does not exist in wrangler 4.x** — Pages custom domains moved to
the dashboard/API. Attaching one is a `POST` to
`/accounts/{account}/pages/projects/{project}/domains`, and the DNS record has to be created
separately: wrangler's OAuth token carries zone *metadata* read but **no DNS record
permission**, so it returns 403 on `/zones/{zone}/dns_records`. The CNAME is a dashboard job
(or needs an API token with `Zone > DNS: Edit`).

### This is a PREVIEW deployment

`.env.production` sets `NEXT_PUBLIC_IS_DEMO_ENV=true`, which serves the whole site
`noindex, nofollow, noimageindex, nocache` and makes `robots.txt` disallow everything.

**Going live** is two edits in `.env.production` plus a rebuild and redeploy:
set `NEXT_PUBLIC_SITE_URL` to the real domain, and `NEXT_PUBLIC_IS_DEMO_ENV=false`.
Both values are inlined at build time, so a redeploy alone will not pick them up.

## Architecture

```
src/
  theme/        Design tokens. The ONLY place a hex, font stack or spacing value is written.
  content/      siteContent.js — ALL page copy. No component contains a copy string.
  assets/       logo.js (single source of truth for the mark) + placeholder images.
  components/
    common/     Reusable primitives — Button, Container, Section, AnimatedReveal, Logo.
    layout/     Header, Footer. Present on every route.
    sections/   Page bands — built FROM common/, never the reverse.
  hooks/        Reusable behaviour: useInView, useCountUp, useScrollCondense, ...
  utils/        seo.js, constants.js (route table), clsx.js
  app/          Routes, root layout, sitemap.js, robots.js, globals.css
```

**The dependency rule: `sections/` may import `common/`; `common/` may never import
`sections/`.** Everything imports `theme/` and `content/`; neither imports anything back.

### How the theme reaches the CSS

`src/theme/*.js` are plain JS objects. `cssVariables.js` flattens them into one `:root` rule
of `--bw-*` custom properties, which `app/layout.jsx` inlines into `<head>` at build time.
Components are written in CSS Modules against `var(--bw-color-brand-primary)` and friends.

That is what makes the "no hex codes in components" rule enforceable rather than aspirational,
and it means **changing `theme/colors.js` re-skins the entire site**. There is no runtime
styling library and no per-render style cost.

A handful of values are needed in JS too (motion variants, the `matchMedia` breakpoint) — those
import from `@/theme` directly, so JS and CSS read the same source and cannot drift.

## Handover checklist — what the client still owes us

Everything below is deliberately placeholder. `grep -rn "PLACEHOLDER" src/` finds all of it.

| What | Where | Notes |
|---|---|---|
| Logo | `src/assets/logo.js` + `public/icon.svg` | Replace both together |
| Brand colours | `src/theme/colors.js` | One file re-skins the site |
| Fonts | `src/theme/typography.js` + the `next/font` calls in `app/layout.jsx` | Change both |
| All copy | `src/content/siteContent.js` | |
| Images | `src/assets/images/placeholder-*` + the registry in `index.js` | |
| Real domain | `seo.siteUrl` in `siteContent.js` | **Set before generating the sitemap** |
| OG card | `public/og-image.png` | Generated placeholder. `node scripts/generate-og-image.mjs` |
| Contact details | `brand.contact` in `siteContent.js` | Address feeds the JSON-LD |
| **Stat figures** | `home.liveStats` | Invented. See "Blocking the real launch" below. (The Impact page's stat row is NOT in this category — those figures are client-supplied.) |

## Conventions

- **No component contains a hex colour, a font stack, or a copy string.** Pull from
  `@/theme` and `@/content/siteContent`.
- **One `<h1>` per page.** `SectionHeader` defaults to `h2` so sections cannot break this.
- **Reference-only structure.** The home and About page section ORDERS follow proven
  competitor layouts, by request. Everything else — palette, type, copy, icons, illustrations — is
  original. Per the repo's branding rule, no competitor is named anywhere in this codebase,
  and no third-party or partner logos appear in the UI.
- **All animation goes through `AnimatedReveal` / `Stagger` / `StaggerItem`.** They are the
  only components that touch Framer Motion variants, and they are where the reduced-motion
  branch is written — once. Adding a bespoke `motion.div` with its own variants bypasses it.
- **Only animate `transform` and `opacity`.** Both composite; neither triggers layout.
- **`"use client"` is opt-in per component, not per page.** Pages stay server components so
  the shipped HTML is complete for crawlers.
- **Add a route to `utils/constants.js`**, never as a raw string — the nav, footer, CTAs and
  sitemap all read from there.

## Status

**Home is complete** — eleven sections, in this order:

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Hero | `Hero` | |
| 2 | What's included in your lease | `WhatsIncluded` | 6 cards |
| 3 | Live stats bar | `LiveStats` | count-up on scroll |
| 4 | Why Battwheelz | `WhyChoose` | 4 cards |
| 5 | How to get started | `HowToStart` | connected 4-step flow |
| 6 | Savings calculator | `SavingsCalculator` | interactive |
| 7 | Rider testimonials | `Testimonials` | **placeholder quotes** |
| 8 | FAQ | `FaqAccordion` | + FAQPage JSON-LD |
| 9 | Closing CTA | `ClosingCta` | |
| 10 | Enquiry form | `ContactSection` | **not wired to a backend** |

The fleet-impact stat row moved off Home to the Impact page — see
`impactPage.environmental.stats`. Its figures are client-supplied and real.

**Pages built:** Home, About, Contact, B2B, Rent to own, FoCO (franchise), Last mile
delivery, Investor relations, Careers.

**Still coming-soon stubs:** Privacy, Terms (`sections/ComingSoon`, copy under
`content.comingSoon`) so nothing 404s.

`/how-it-works` and `/for-riders` were **retired** — their ground is covered by the
specific offering pages, and two generic stubs beside six specific pages helped nobody.

**Navigation is content-driven.** `navigation.primary` in siteContent.js holds entries that
are either a link (`href`) or a group (`items`); the header renders groups as accessible
disclosure dropdowns on desktop and accordions in the mobile drawer. Adding a page to the
menu is a content edit, not a component change. Investor relations is deliberately excluded
from the header — footer and direct links only.

Copy for the offering and company pages lives in `src/content/pagesContent.js`, split from
`siteContent.js` for file size only — same rules apply.

Three deliberate reductions from the reference structure these pages follow, all documented
in-code at the top of the relevant content block:

- **Investor relations** carries no revenue, funding, EBITDA, valuation, ROI or growth
  figures — real or placeholder — and no charts or milestones. Adding figures there is a
  conversation with the client's counsel, not a content edit.
- **FoCO** has no investment calculator and no return/payback figure. A stated return is a
  financial promotion whether the number is real or invented.
- **Careers** has an honest empty state instead of a job board. Invented listings would have
  real people applying for jobs that do not exist.
- **Partner-impact and investor-logo sections are dropped site-wide.**

Replacing a stub with the real page: write the page, delete its entry from
`content.comingSoon.pages`, and drop the `stub: true` flag from its row in
`sitemapRoutes` — that restores its intended sitemap priority automatically.

### Blocking the real launch

None of these are bugs. They are places where invented content is standing in for
something only the client can supply.

| What | Where | Why it blocks |
|---|---|---|
| **Rider testimonials** | `home.testimonials` | Every quote, name and figure is invented. The section renders a visible "illustrative examples" notice for exactly this reason — do not remove it before the quotes are real and consented. Publishing a fabricated endorsement as genuine is a consumer-protection issue. |
| **Live stats** | `home.liveStats` | Four invented operational figures. |
| **Savings assumptions** | `home.savings.assumptions` | Eight placeholder cost figures drive a rupee number a rider may act on. Shown to the visitor in-page so the maths is auditable; the client still needs to confirm each one. |
| **Team members** | `about.team` | All four people are invented — names, roles, bios and portraits. Portraits are deliberately faceless flat illustrations so they cannot pass as photos of real people, and the section renders a visible "placeholder profiles" badge. Needs real, consented team members. |
| **Roadmap targets** | `about.roadmap` | Written as forward-looking goals rather than history, but the goals themselves are invented. |
| **Rent-to-own terms** | `rentToOwnPage.eligibility` | The ₹10,000 down payment and 12-month term are invented round numbers. A rider reads these as a commitment. |
| **Operating cities** | `b2bPage.cities` | Four placeholder cities. Do not publish a footprint the company does not have — a fleet buyer will plan around it. |
| **Legal pages** | `/privacy`, `/terms` | Stubs. Text is the client's to supply with legal review. |
| **Enquiry form endpoint** | `common/EnquiryForm` | Submitting shows a "not connected yet" notice instead of a fake success. See the `TODO` in `handleSubmit`. |
| **Brand assets and copy** | see the handover table above | |

### Still to build

- How It Works and For Riders & Partners, for real. Contact should reuse `<EnquiryForm />` un-condensed
- Real art to replace `public/og-image.png` (regenerate with
  `node scripts/generate-og-image.mjs`, or drop in a designed 1200×630 card)

Responsive layout is authored mobile-first (single column by default; desktop is a set of
`min-width` overrides), has no fixed widths or `min-width` values above 375px, and shows no
horizontal overflow. It has **only been verified at desktop width** — a real-device pass is
still outstanding.
