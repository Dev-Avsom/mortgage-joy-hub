# Ensure Home Loans

Marketing and lead-capture web application for Ensure Home Loans (NMLS #1666674).

## Tech stack

- React 19 + TypeScript
- TanStack Start (SSR) + TanStack Router + TanStack Query
- Tailwind CSS v4 + shadcn/ui
- Supabase (Postgres, Auth, Storage)
- i18next (EN / ES)
- Cloudflare Workers (deploy target)

## Getting started

```bash
bun install
bun run dev
```

App runs at `http://localhost:8080`.

## Scripts

- `bun run dev` — start dev server
- `bun run build` — production build
- `bun run lint` — lint
- `bun run format` — prettier

## Project structure

- `src/routes/` — file-based routes (pages and API endpoints)
- `src/components/` — UI and site components
- `src/integrations/supabase/` — database client
- `src/i18n/` — English and Spanish translations
- `src/lib/` — shared utilities and server functions
- `supabase/` — database migrations and config

## Environment

Copy `.env.example` to `.env` and fill in the values (Supabase URL, anon key, project ID).

## License

Proprietary. All rights reserved.