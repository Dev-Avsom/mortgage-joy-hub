
ALTER TABLE public.loan_officers ADD COLUMN IF NOT EXISTS achievements text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.loan_officers ADD COLUMN IF NOT EXISTS about text;

INSERT INTO storage.buckets (id, name, public) VALUES ('officer-photos', 'officer-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read officer photos" ON storage.objects;
CREATE POLICY "Public read officer photos" ON storage.objects FOR SELECT USING (bucket_id = 'officer-photos');

DROP POLICY IF EXISTS "Admins upload officer photos" ON storage.objects;
CREATE POLICY "Admins upload officer photos" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'officer-photos' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update officer photos" ON storage.objects;
CREATE POLICY "Admins update officer photos" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'officer-photos' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete officer photos" ON storage.objects;
CREATE POLICY "Admins delete officer photos" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'officer-photos' AND public.has_role(auth.uid(), 'admin'));
