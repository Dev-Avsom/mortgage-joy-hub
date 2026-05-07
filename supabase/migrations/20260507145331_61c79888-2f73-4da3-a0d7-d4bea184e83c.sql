-- Allow admins full CRUD on loan_officers
CREATE POLICY "Admins can insert loan officers"
ON public.loan_officers
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update loan officers"
ON public.loan_officers
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete loan officers"
ON public.loan_officers
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all loan officers"
ON public.loan_officers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));