
-- 1) Officer photos: drop broad SELECT policy (CDN getPublicUrl access still works).
DROP POLICY IF EXISTS "Public read officer photos" ON storage.objects;

-- 2) Loan documents: add explicit UPDATE policy mirroring SELECT/DELETE ownership model.
CREATE POLICY "Users update own loan docs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'loan-documents'
  AND ((auth.uid())::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin'::app_role))
)
WITH CHECK (
  bucket_id = 'loan-documents'
  AND ((auth.uid())::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin'::app_role))
);

-- 3) Revoke direct EXECUTE on has_role from end-user roles.
--    The function still runs inside RLS policies because it is SECURITY DEFINER.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
