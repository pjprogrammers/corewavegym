# Core Wave Gym — Next.js rebuild

A faithful Next.js + Tailwind CSS rebuild of [corewave.pages.dev](https://corewave.pages.dev/) for **Core Wave Gym, Bhajanpura, Delhi** — same layout, copy, images, theme, and interactions as the original site.

## Stack

- **Next.js 16.4.6** — App Router, Turbopack
- **React 19.3.1**
- **Tailwind CSS 4.3.5**
- **TypeScript**

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start          # http://localhost:3000
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero slider, stats, plans, reviews, BMI calculator, hours |
| `/about` | About — gym story, amenities, gallery slider |
| `/membership` | Plans, cost calculator, FAQ accordions |
| `/classes` | Class list and schedule |
| `/offers` | Offers page (shows “Coming soon” while no offer is live) |
| `/gallery` | Photo grid with keyboard/button lightbox |
| `/contact` | Contact form, map, reach details |

Unknown paths render the home page with home metadata, matching the original hosting behavior.

## Features

- Hero slideshow with auto-advance, hover pause, swipe, and reduced-motion support
- EN / हिं / HG language switcher with `localStorage` persistence (`cw-lang`)
- Expired-offer handling: offer ticker is hidden and `/offers` shows “Coming soon”
- BMI calculator and membership cost calculator
- FAQ accordions
- Gallery lightbox (arrows, Escape, scroll lock)
- Mobile menu with active-link states
- Contact form with client-side validation, Web3Forms submission, and WhatsApp fallback
- Client-side navigation with Next.js `Link`
- Responsive desktop/mobile layout, original glass/gradient styling and Google Fonts
- Per-page metadata, canonical/OG/Twitter tags, business JSON-LD
- Captcha-equivalent form validation behavior preserved from the original visitor flow

## Motion system

Animations follow the `emilkowalski/skills` design-engineering guidance:

- Shared easing tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`) with short UI timings (150–200ms)
- Press feedback (`scale: 0.97`) on buttons, the language switcher, lightbox controls, the menu button, and floating actions
- Hover lift and underline effects gated behind `(hover: hover) and (pointer: fine)`
- Opacity/transform crossfades and `@starting-style` entries for the hero, offer ticker, mobile menu, lightbox, FAQ answers, and contact success card
- Scroll reveals with 60–80ms stagger and a 480ms ease-out
- Full `prefers-reduced-motion` support: movement is removed while opacity/color feedback remains, counters jump to their final value, and slideshow autoplay is disabled

## Content and configuration

- `lib/site.json` — business details, plans, hours, images, offer settings, form endpoints
- `lib/i18n.json` — full EN / Hindi / Hinglish dictionary
- `lib/data.ts` — language helpers, formatting, offer-live logic, links
- `lib/metadata.ts` — per-route metadata
- `lib/schema.ts` — `HealthAndBeautyBusiness` JSON-LD
- `app/` — routes and root layout
- `components/` — header, footer, sliders, calculators, form, lightbox, icons
- `public/assets/images/` — original site images
- `app/globals.css` — theme and motion tokens, transitions, custom utilities, responsive and reduced-motion rules

## Notes

- The offer ended on **2026-11-10**. To re-enable it, update `offer.endsAt` in `lib/site.json`; the ticker and live offer page return automatically.
- The contact form posts to Web3Forms with the original access key and opens WhatsApp as a fallback after submission.
- A local `mirror/` folder containing the verified static capture used for pixel comparisons is git-ignored and is not part of the Next.js build.
- Language is stored in `localStorage` under `cw-lang` (`en`, `hi`, or `hg`) and sets `<html lang>` to `en` or `hi`.
- Custom cursor is enabled only for fine-pointer desktop devices.

## Verification

- All 7 routes visually match the original at **1440×900** and **390×844** once images load. Layout and content are identical; the only differences are minor Next.js image-optimisation noise on the two pages with large photos (under 0.6% of pixels).
- 31/31 functional checks pass: language switching/persistence, BMI, cost calculator, FAQ, gallery lightbox, mobile menu, client-side navigation, offer expiry state, and mocked contact-form submission.
- Motion was re-tested in the production build: hero autoplay/pause/resume, navigation transitions, mobile menu, lightbox, FAQ, contact success state, and reduced-motion rendering.
- No console or page errors in the production build.
