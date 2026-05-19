
ALTER TABLE public.loan_officers
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS facebook_url text,
  ADD COLUMN IF NOT EXISTS instagram_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS website_url text;

-- Allow public submissions but force is_active=false so admin must approve
CREATE POLICY "Public can submit new MLO profile (inactive)"
ON public.loan_officers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  is_active = false
  AND char_length(name) BETWEEN 1 AND 120
  AND char_length(slug) BETWEEN 1 AND 120
  AND slug ~ '^[a-z0-9-]+$'
);

-- Storage: allow public uploads to officer-photos bucket
CREATE POLICY "Public can upload officer photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'officer-photos');
