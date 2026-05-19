import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ShieldAlert, LogOut, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/officers")({
  head: () => ({ meta: [{ title: "Manage MLOs — Admin" }, { name: "robots", content: "noindex" }] }),
  component: OfficersAdmin,
});

type Officer = {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  nmls_id: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  bio: string | null;
  about: string | null;
  photo_url: string | null;
  years_experience: number | null;
  languages: string[];
  specialties: string[];
  achievements: string[];
  display_order: number;
  is_active: boolean;
  portal_link: string | null;
};

const empty: Partial<Officer> = {
  name: "", slug: "", title: "", nmls_id: "", email: "", phone: "", whatsapp: "",
  bio: "", about: "", photo_url: "", years_experience: 0,
  languages: [], specialties: [], achievements: [],
  display_order: 0, is_active: true, portal_link: "",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function OfficersAdmin() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Partial<Officer> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) { navigate({ to: "/admin/login" }); return; }
      setUserEmail(session.user.email ?? null);
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setAuthReady(true);
      if (admin) await load();
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("loan_officers")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });
    setLoading(false);
    if (error) return toast.error(error.message);
    setOfficers((data ?? []) as Officer[]);
  };

  const handlePhotoUpload = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("officer-photos").upload(path, file, {
      cacheControl: "3600", upsert: false, contentType: file.type,
    });
    setUploading(false);
    if (upErr) return toast.error(upErr.message);
    const { data } = supabase.storage.from("officer-photos").getPublicUrl(path);
    setEditing({ ...editing, photo_url: data.publicUrl });
    toast.success("Photo uploaded");
  };

  const save = async () => {
    if (!editing) return;
    const name = (editing.name ?? "").trim();
    if (!name) return toast.error("Name is required");
    const slug = (editing.slug?.trim() || slugify(name));
    const payload = {
      name, slug,
      title: editing.title || null,
      nmls_id: editing.nmls_id || null,
      email: editing.email || null,
      phone: editing.phone || null,
      whatsapp: editing.whatsapp || null,
      bio: editing.bio || null,
      about: editing.about || null,
      photo_url: editing.photo_url || null,
      portal_link: editing.portal_link || null,
      years_experience: editing.years_experience ? Number(editing.years_experience) : null,
      languages: editing.languages ?? [],
      specialties: editing.specialties ?? [],
      achievements: editing.achievements ?? [],
      display_order: Number(editing.display_order ?? 0),
      is_active: editing.is_active ?? true,
    };
    const isNew = !editing.id;
    const { error } = isNew
      ? await supabase.from("loan_officers").insert(payload)
      : await supabase.from("loan_officers").update(payload).eq("id", editing.id!);
    if (error) return toast.error(error.message);
    toast.success(isNew ? "MLO added" : "MLO updated");
    setEditing(null);
    load();
  };

  const remove = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("loan_officers").delete().eq("id", deleteId);
    setDeleteId(null);
    if (error) return toast.error(error.message);
    toast.success("MLO deleted");
    load();
  };

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = "/admin/login"; };

  if (!authReady) return <div className="p-12 text-center text-muted-foreground">Loading…</div>;

  if (isAdmin === false) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={signOut} variant="outline"><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Manage Loan Officers</h1>
          <p className="text-sm text-muted-foreground">Signed in as {userEmail}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setEditing({ ...empty })}><Plus className="mr-2 h-4 w-4" /> Add MLO</Button>
          <Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
        </div>
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">NMLS</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">Loading…</td></tr>
              ) : officers.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No MLOs yet. Click "Add MLO" to create one.</td></tr>
              ) : officers.map((o) => (
                <tr key={o.id} className="border-b last:border-b-0 hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    {o.photo_url ? (
                      <img src={o.photo_url} alt={o.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-secondary" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{o.name}<div className="text-xs text-muted-foreground">/{o.slug}</div></td>
                  <td className="px-4 py-3">{o.title ?? "—"}</td>
                  <td className="px-4 py-3 text-xs">{o.nmls_id ?? "—"}</td>
                  <td className="px-4 py-3 text-xs">{o.email ?? o.phone ?? "—"}</td>
                  <td className="px-4 py-3">{o.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${o.is_active ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {o.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(o)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(o.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit MLO" : "Add new MLO"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 py-2 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label className="mb-1.5 block text-xs">Profile photo</Label>
                <div className="flex items-center gap-4">
                  {editing.photo_url ? (
                    <img src={editing.photo_url} alt="" className="h-20 w-20 rounded-full object-cover" />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-secondary" />
                  )}
                  <input
                    ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); e.target.value = ""; }}
                  />
                  <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
                    {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    {editing.photo_url ? "Replace photo" : "Upload photo"}
                  </Button>
                  {editing.photo_url && (
                    <Button type="button" variant="ghost" onClick={() => setEditing({ ...editing, photo_url: "" })}>Remove</Button>
                  )}
                </div>
              </div>

              <Field label="Name *">
                <Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </Field>
              <Field label="Slug (URL)">
                <Input placeholder="auto from name" value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </Field>
              <Field label="Title"><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="NMLS ID"><Input value={editing.nmls_id ?? ""} onChange={(e) => setEditing({ ...editing, nmls_id: e.target.value })} /></Field>
              <Field label="Email"><Input type="email" value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
              <Field label="Phone"><Input value={editing.phone ?? ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></Field>
              <Field label="WhatsApp"><Input value={editing.whatsapp ?? ""} onChange={(e) => setEditing({ ...editing, whatsapp: e.target.value })} /></Field>
              <Field label="Portal/Application link (1003 URL)" className="sm:col-span-2">
                <Input
                  placeholder="https://ensurehomeloans.my1003app.com/XXXXXX/register?..."
                  value={editing.portal_link ?? ""}
                  onChange={(e) => setEditing({ ...editing, portal_link: e.target.value })}
                />
              </Field>
              <Field label="Years experience">
                <Input type="number" value={editing.years_experience ?? 0} onChange={(e) => setEditing({ ...editing, years_experience: Number(e.target.value) })} />
              </Field>
              <Field label="Languages (comma-separated)" className="sm:col-span-2">
                <Input value={(editing.languages ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, languages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              </Field>
              <Field label="Specialties (comma-separated)" className="sm:col-span-2">
                <Input value={(editing.specialties ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, specialties: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              </Field>
              <Field label="Short bio (shown on cards)" className="sm:col-span-2">
                <Textarea rows={3} value={editing.bio ?? ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
              </Field>
              <Field label="About (full description on profile)" className="sm:col-span-2">
                <Textarea rows={5} value={editing.about ?? ""} onChange={(e) => setEditing({ ...editing, about: e.target.value })} />
              </Field>
              <Field label="Achievements (one per line)" className="sm:col-span-2">
                <Textarea
                  rows={4}
                  placeholder="Top 1% MLO 2024&#10;NMLS Certified Mentor&#10;$50M+ funded in 2023"
                  value={(editing.achievements ?? []).join("\n")}
                  onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
              <Field label="Display order">
                <Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
              </Field>
              <div className="flex items-end gap-3">
                <Switch checked={editing.is_active ?? true} onCheckedChange={(v) => setEditing({ ...editing, is_active: v })} />
                <Label>Active (visible on site)</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>{editing?.id ? "Save changes" : "Create MLO"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this MLO?</AlertDialogTitle>
            <AlertDialogDescription>This permanently removes the loan officer profile.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs">{label}</Label>
      {children}
    </div>
  );
}
