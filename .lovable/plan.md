
# Full Spanish localization across the site

## Goal
Make the EN/ES toggle in the header actually switch the entire site — every public page, admin page, and shared component — into professional Spanish. Today only the header nav, footer links, and the home page are wired to i18n; everything else is hard-coded English.

## Scope (full site)

**Public marketing routes (24)**
index, about, calculator, affordability, refinance, loan-programs.index, loan-programs.$slug, loan-officers, loan-officers.$slug, find-officer, learn, learn.$slug, faq, contact, get-prequalified, first-time-buyer, process, reviews, press, careers, join, agents, builders, documents

**Legal / utility routes (5)**
privacy, terms, tcpa, licenses, accessibility

**Admin routes (3)**
admin.index, admin.login, admin.officers

**Shared components**
Header, Footer (body copy + disclosures), LeadForm, CallbackWidget, LiveChat, RateQuoteWidget, RateAlertForm, StickyCTA, Reviews, TestimonialMarquee, LoanComparisonChart, LoanProcessTimeline, BestRateBadge, StatsCounters, AnimatedCounter labels, RateCardsFloating, ThemeSwitcher tooltips, SectionHeading consumers (eyebrows/titles passed in)

**Dynamic content data files**
- `src/lib/loan-programs.ts` — program names, descriptions, bullets
- `src/lib/articles.ts` — learning-center article titles/excerpts/bodies
- `src/lib/site-config.ts` — taglines and any user-visible strings
Database-sourced content (loan_officers bios, etc.) is left as-is (admin would need to add bilingual columns — out of scope unless requested).

## Approach

1. **Restructure `en.json` / `es.json`** into namespaced sections that mirror the site:
   ```
   nav, common, home, about, calculator, affordability, refinance,
   loanPrograms, loanOfficers, findOfficer, learn, faq, contact,
   getPrequalified, firstTimeBuyer, process, reviews, press, careers,
   join, agents, builders, documents, legal (privacy/terms/tcpa/licenses/accessibility),
   admin, footer, forms (leadForm, rateQuote, rateAlert, callback),
   chat, widgets (stickyCTA, bestRate, comparison, timeline, stats),
   programs (per-slug content), articles (per-slug content)
   ```

2. **Refactor every route + component** to use `const { t } = useTranslation()` and replace hard-coded strings with `t("namespace.key")`. Use the `Trans` component for strings containing inline JSX (links, `<strong>`, etc.).

3. **Translate to Spanish** — I write professional, mortgage-industry Spanish copy for every key. Numbers, brand names ("HomeBridge", "NMLS"), and legal IDs stay as-is. Disclosures use formal register ("usted").

4. **Locale-aware formatting**
   - Currency: keep `$` (USD) but use `Intl.NumberFormat(i18n.language, {style:"currency", currency:"USD"})` so thousands separators follow locale.
   - Dates: `Intl.DateTimeFormat(i18n.language, …)`.
   - Update `<html lang>` dynamically in `__root.tsx` based on `i18n.resolvedLanguage`.

5. **SEO `head()` per route** — make `meta` (title/description/og) read from `t()` so each page ships bilingual metadata.

6. **QA pass** — toggle ES on every route and confirm no English leaks, no layout breaks from longer Spanish strings (Spanish is ~20% longer; check buttons, nav, cards).

## Technical notes

- i18next is already initialized with `LanguageDetector` + `localStorage` cache (`site-lang`). No new deps needed.
- `head()` in TanStack route configs runs outside React, so it can't call `useTranslation()` directly. Solution: import the `i18n` instance from `src/i18n/index.ts` and call `i18n.t("…")` inside `head()`. Re-render of metadata on language change is handled by router invalidation; for SSR the detector falls back to `en` which is fine.
- For dynamic routes (`loan-programs/$slug`, `learn/$slug`, `loan-officers/$slug`), translation keys are keyed by slug (e.g. `programs.conventional.title`). Slugs that don't have an ES entry fall back to EN automatically (i18next default behavior).
- `Trans` component used for the home hero subtitle and any string with embedded `<strong>` / `<a>` / `<Link>`.
- Admin pages get a lighter translation pass (form labels, buttons, table headers) — they're internal but still toggled.

## Deliverable
After this runs, clicking ES in the header switches the entire site — every page, modal, form, toast, footer disclosure, and meta tag — into Spanish, and clicking EN switches it back. Nothing remains hard-coded.

## Out of scope (call out if you want them added)
- Translating database content (loan officer bios, leads, etc.)
- A `/es/...` URL prefix (current setup uses a single URL with client-side language). Add only if SEO for Spanish pages becomes a priority.
- RTL support (not needed for ES).
