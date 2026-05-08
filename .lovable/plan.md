## Goal

Make the site noticeably more visually attractive and lively — richer color, depth, and motion — while keeping the Ensure Home Loans brown/orange brand recognizable. No business-logic changes.

## Visual direction

- Keep brown/orange as the brand anchor, but introduce **two supporting accents**: a warm gold and a fresh teal, used sparingly for highlights, badges, icons, and gradient stops.
- Move from flat sections to **layered sections**: soft gradient backgrounds, blurred color "blobs", subtle grid/dot patterns, and glassy cards.
- Add depth via **elevated cards, gradient borders, and refined shadows**.
- Add tasteful **motion**: scroll-reveal, hover lift, gradient-shift on hero, floating accent shapes (already partly available in `styles.css`).

## Scope

Apply the upgrade across the public-facing site (homepage gets the biggest treatment; other content pages get the shared components and tokens automatically):

- Home (`index.tsx`) — hero, stats, programs, testimonials, CTA.
- Loan Programs list + detail.
- Loan Officers list + detail.
- About, Process, First-time buyer, Refinance, Calculator, Contact.
- Shared site chrome: Header, Footer, section wrappers.

Admin pages stay untouched.

## Changes

### 1. Design tokens (`src/styles.css`)
- Add accent tokens: `--accent-gold`, `--accent-teal`, plus `-foreground` pairs.
- Add gradient tokens: `--gradient-warm` (orange → gold), `--gradient-cool` (teal → primary), `--gradient-mesh` (multi-stop hero mesh).
- Add pattern utilities: `.bg-grid`, `.bg-dots`, `.bg-mesh`.
- Add `.section-gradient`, `.card-elevated`, `.gradient-border`, `.badge-soft` utilities.
- Tune existing `--shadow-elegant` / `--shadow-card` for warmer glow.

### 2. Reusable visual primitives (new files in `src/components/site/`)
- `SectionHeading.tsx` — eyebrow chip + gradient headline + subcopy, consistent across pages.
- `GradientBlob.tsx` — decorative animated background blob (positioned absolute).
- `FeatureCard.tsx` — icon-in-gradient-circle, hover-lift, gradient border.
- `StatStrip.tsx` — colorful stat tiles with count-up.

### 3. Home page upgrade (`src/routes/index.tsx`)
- Hero: gradient-mesh background + floating blobs + new headline with `gradient-text`, dual CTA, trust badges row.
- Programs grid: switch to `FeatureCard` with colored icons (each program a different accent shade).
- "Why us" section: alternating image/text with soft gradient panels.
- Testimonials: glassy cards on tinted gradient strip.
- Final CTA: full-width gradient banner with subtle pattern overlay.

### 4. Other pages
- Wrap headers in `SectionHeading` with eyebrow chip.
- Apply `card-elevated` + colored icon circles to existing card grids (about, process, first-time-buyer, agents, builders, careers).
- Add `GradientBlob` decoration to top of hero sections.
- Loan officer cards: gradient ring around avatar, role badge in accent color.

### 5. Header & Footer
- Header: glass effect on scroll, animated underline on active link, accent dot indicator.
- Footer: dark warm gradient background, brighter link hover state, social icons in colored circles.

### 6. Imagery
- Generate 2 new hero/section images (warm modern home + diverse family) for home page and first-time-buyer page. Other pages keep current imagery.

## Out of scope

- No changes to forms, data, auth, admin, routing, or business logic.
- No new pages.
- Dark mode tuning beyond what tokens require.

## Technical notes

- All colors added as `oklch` semantic tokens in `styles.css`; components consume via Tailwind utilities (`bg-accent-gold`, `text-accent-teal`, `bg-[image:var(--gradient-warm)]` etc.). No hex/RGB in components.
- Reuse existing animation utilities (`animate-blob`, `animate-fade-in-up`, `reveal`, `hover-lift`, `gradient-text`, `glass`) — no new animation libs.
- Respect `prefers-reduced-motion` (already handled in `styles.css`).
