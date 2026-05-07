
-- Rate alerts
CREATE TABLE public.rate_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  target_rate NUMERIC(5,3) NOT NULL,
  loan_type TEXT NOT NULL DEFAULT '30yr_fixed',
  zip TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rate_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create rate alert"
ON public.rate_alerts FOR INSERT TO public
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND target_rate > 0 AND target_rate < 30
  AND char_length(loan_type) <= 32
  AND (zip IS NULL OR char_length(zip) <= 10)
);

CREATE POLICY "Admins view rate alerts"
ON public.rate_alerts FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update rate alerts"
ON public.rate_alerts FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete rate alerts"
ON public.rate_alerts FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Documents
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  size_bytes BIGINT,
  status TEXT NOT NULL DEFAULT 'uploaded',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own documents"
ON public.documents FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own documents"
ON public.documents FOR SELECT TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users delete own documents"
ON public.documents FOR DELETE TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-documents', 'loan-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload own loan docs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'loan-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users read own loan docs"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'loan-documents'
  AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Users delete own loan docs"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'loan-documents'
  AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin'))
);
