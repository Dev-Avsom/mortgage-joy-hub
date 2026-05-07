## US Mortgage Website — Build Plan

A professional, mobile-optimized mortgage site for a US client with a working mortgage calculator, lead capture, WhatsApp/Call CTAs, and Loan Officer profile pages.

### Design direction
- **Style:** Trustworthy corporate look — deep navy primary, gold/amber accent, white surfaces, subtle shadows. Inter for body, tighter weight for headings. Fully responsive.
- All colors as semantic tokens in `src/styles.css` (oklch). Light mode primary, optional dark.

### Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx          shared header + footer + sticky CTA bar
  index.tsx           Hero, value props, calculator preview, featured MLOs, CTA
  calculator.tsx      Full mortgage calculator + amortization chart + lead form
  loan-programs.tsx   Conventional, FHA, VA, Jumbo, Refi cards
  loan-officers.tsx   Grid of MLO cards (up to 10)
  loan-officers.$slug.tsx  Individual MLO profile page
  about.tsx
  contact.tsx         Lead form + phone + WhatsApp + office info
  api/public/lead.ts  POST endpoint to store leads (server route)
```
Each route gets its own `head()` meta (title, description, og tags).

### Calculator (`/calculator`)
- Inputs: home price, down payment ($/%), loan term (15/20/30), interest rate, property tax, home insurance, HOA, PMI.
- Outputs: **Monthly PITI breakdown**, total interest, payoff date.
- **Amortization schedule** chart (Recharts line/area) + collapsible yearly table.
- "Get full PDF report" button → opens lead form modal (name, email, phone) → on submit, saves lead and triggers client-side PDF download (jsPDF) with results + branding.
- Calculator state lives in URL search params (`validateSearch` + zod) so results are shareable.

### Lead generation & engagement
- **Sticky bottom bar (mobile)** + header buttons: Call now (`tel:`) and WhatsApp (`https://wa.me/...`).
- **Lead capture forms** on: calculator (gates PDF), contact page, MLO profile pages, "Get pre-qualified" CTA.
- All forms POST to `/api/public/lead` → stored in Cloud DB.
- Toast confirmation on success (sonner).

### Loan Officer profiles
- Grid page with photo, name, NMLS ID, designation, short bio, Call + WhatsApp buttons.
- Individual profile route with full bio, experience, languages, specialties, contact form scoped to that officer.
- Seeded with sample data; structure scales beyond 10.

### Backend (Lovable Cloud)
Enable Cloud and create:
- `leads` table: id, name, email, phone, source (calculator/contact/mlo), mlo_id (nullable), calc_inputs (jsonb), calc_results (jsonb), message, created_at. RLS: insert allowed for anon; select restricted (admin only later).
- `loan_officers` table: id, slug, name, photo_url, nmls_id, title, bio, phone, whatsapp, email, languages[], specialties[], display_order. RLS: public select; insert/update admin-only.
- Server function / API route to insert lead with zod validation.

### SEO & analytics
- Per-route meta + JSON-LD `MortgageLoan` / `FinancialService` on home, `Person` on MLO pages.
- Semantic HTML, single H1 per page, alt text, sitemap-friendly routes.
- Analytics-ready (gtag stub in `__root.tsx`, no key required up front).

### Tech details
- shadcn/ui primitives already installed.
- Add deps: `recharts` (already common), `jspdf`, `zod`, `@tanstack/zod-adapter`.
- Form handling: react-hook-form + zod.
- Calculator math: standard amortization formula `M = P * r(1+r)^n / ((1+r)^n - 1)`, plus monthly tax/ins/PMI.
- WhatsApp/phone numbers and brand name configurable via a single `src/lib/site-config.ts`.

### Implementation order
1. Enable Lovable Cloud + create tables.
2. Design tokens + shared header/footer/sticky CTA.
3. Home page with hero + calculator teaser + MLO highlights.
4. Full calculator page with chart + URL state + PDF + lead modal.
5. Loan officers list + dynamic profile page.
6. Loan programs, About, Contact pages.
7. Lead API route + wiring all forms.
8. SEO meta + JSON-LD pass + final responsive QA.
