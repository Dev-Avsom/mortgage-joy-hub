# Visual Upgrade Plan — Modern & Lively

Bring the site to life with a modern, animated feel while keeping it professional for a mortgage brand. All work is presentation-only (CSS, SVG, light React) — no backend changes.

## 1. Foundation — animation utilities

Add reusable building blocks once, use everywhere:

- New keyframes in `src/styles.css`: `fade-in-up`, `scale-in`, `gradient-shift`, `float`, `shimmer`, `blob`, `marquee`.
- New utility classes: `.animate-on-scroll` (fade-up when in view), `.hover-lift` (translate + shadow), `.glass` (backdrop-blur card), `.gradient-text`, `.animated-bg` (slow-moving brand gradient).
- New hook `src/hooks/use-in-view.ts` — IntersectionObserver wrapper that toggles a `.in-view` class for scroll-triggered reveals.
- Reusable components in `src/components/site/`:
  - `AnimatedCounter.tsx` — counts from 0 → target when visible.
  - `Reveal.tsx` — wrapper that fades/slides children in on scroll.
  - `GradientOrb.tsx` — animated background blobs for hero sections.

## 2. Homepage hero — animated gradient + floating cards

Rebuild the hero section on `src/routes/index.tsx`:

- Animated gradient background (slow oklch shift between primary & primary-glow) with two soft `GradientOrb` blobs floating behind content.
- Headline with `gradient-text` accent on key word + staggered fade-in-up for headline → subhead → CTAs.
- Floating glass rate cards on the right (30yr Fixed, 15yr Fixed, FHA) with subtle `float` animation, hover-lift, and a live "rates updated today" shimmer dot.
- Trust strip below: NMLS badge, "29+ states", "250+ MLOs", star rating — all fade-in on load.

## 3. Infographics

Three new components, used on Home and relevant inner pages:

**a. `LoanProcessTimeline.tsx`** — 5-step animated journey
- Steps: Apply → Pre-approve → Shop → Underwrite → Close.
- Horizontal on desktop, vertical on mobile.
- Animated connecting line that "draws" as user scrolls; each step icon scales in with a bounce.
- Used on Home and `/process`.

**b. `StatsCounters.tsx`** — animated number band
- 250+ MLO partners, 29+ states, 10K+ families helped, 4.9★ average review.
- Uses `AnimatedCounter` triggered on scroll, with icons and a subtle gradient backdrop.
- Used on Home, `/about`, `/find-officer`.

**c. `LoanComparisonChart.tsx`** — visual side-by-side
- Compares Conventional, FHA, VA, Jumbo, DSCR across: min down %, min credit, key benefit.
- Cards animate in staggered; on hover the matching column highlights with a colored bar that scales from 0 → 100%.
- Used on Home (condensed 4-card row) and `/loan-programs` (full).

## 4. Site-wide micro-interactions

- **Header**: dropdown menus get a smoother fade+slide (already partially there) plus a subtle underline-grow on active links via `.story-link` style.
- **Buttons**: primary CTAs get a soft glow on hover (box-shadow with primary at low alpha) and a tiny scale (1.02).
- **Cards** (loan programs, reviews, officers): `hover-lift` + image/icon zoom on hover.
- **Section transitions**: wrap major sections on every page in `<Reveal>` so they fade-up as the user scrolls.
- **Sticky CTA / WhatsApp**: gentle pulse ring on the WhatsApp button to draw the eye.

## 5. Per-page touches (site-wide rollout)

- `/` Home: hero rebuild + Process Timeline + Stats Counters + Loan Comparison + animated testimonial marquee (continuous horizontal scroll, pauses on hover).
- `/loan-programs`: full Comparison Chart at top, animated program cards grid.
- `/loan-programs/$slug`: hero gradient strip, animated benefit checklist (staggered check-in), mini-process timeline.
- `/about`: Stats Counters + animated company timeline (year markers with reveals).
- `/process`: feature the full Loan Process Timeline as the page's centerpiece.
- `/reviews`: animated star ratings + testimonial cards reveal in masonry.
- `/calculator`, `/affordability`, `/refinance`: animated result numbers using `AnimatedCounter`, gradient header strip.
- `/contact`, `/get-prequalified`: gradient hero, form fields with focus-glow.

## 6. Performance & accessibility

- All animations respect `prefers-reduced-motion: reduce` (disable transforms, keep opacity-only fades).
- IntersectionObserver-based reveals (no scroll listeners) → no jank.
- No new heavy dependencies. Pure CSS + small React helpers. Lottie/video deliberately skipped per "modern & lively" tier.
- Animations target `transform` + `opacity` only (GPU-friendly).

## Technical summary

- **New files**: `src/hooks/use-in-view.ts`, `src/components/site/Reveal.tsx`, `src/components/site/AnimatedCounter.tsx`, `src/components/site/GradientOrb.tsx`, `src/components/site/LoanProcessTimeline.tsx`, `src/components/site/StatsCounters.tsx`, `src/components/site/LoanComparisonChart.tsx`, `src/components/site/RateCardsFloating.tsx`, `src/components/site/TestimonialMarquee.tsx`.
- **Edited**: `src/styles.css` (keyframes + utilities + reduced-motion guard), `src/routes/index.tsx` (hero + infographics integration), `src/routes/loan-programs.tsx`, `src/routes/loan-programs.$slug.tsx`, `src/routes/about.tsx`, `src/routes/process.tsx`, `src/routes/reviews.tsx`, `src/components/site/Header.tsx` (link underline polish), `src/components/site/StickyCTA.tsx` (pulse).
- **No** schema, route, or business-logic changes.

## Out of scope (can do later)

- Lottie/video hero, 3D illustrations, custom SVG mascots, dark mode polish, full content rewrite.
