ALTER TABLE public.loan_officers
ADD COLUMN IF NOT EXISTS licensed_states text[] NOT NULL DEFAULT '{}'::text[];