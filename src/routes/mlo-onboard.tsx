import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { US_STATES } from "@/lib/us-states";
import { notifySubmission } from "@/lib/notify";

export const Route = createFileRoute("/mlo-onboard")({
  head: () => ({
    meta: [
      { title: "MLO Onboarding — Ensure Home Loans" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardPage,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type Form = {
  name: string; title: string; nmls_id: string; email: string; phone: string; whatsapp: string;
  bio: string; about: string; photo_url: string; portal_link: string;
  languages: string; specialties: string;
  linkedin_url: string; facebook_url: string; instagram_url: string; twitter_url: string; website_url: string;
  licensed_states: string[];
};

const empty: Form = {
  name: "", title: "", nmls_id: "", email: "", phone: "", whatsapp: "",
  bio: "", about: "", photo_url: "", portal_link: "",
  languages: "", specialties: "",
  linkedin_url: "", facebook_url: "", instagram_url: "", twitter_url: "", website_url: "",
  licensed_states: [],
};

function OnboardPage() {
  const [form, setForm] = useState<Form>(empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhoto = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB photo");
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `onboard/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("officer-photos").upload(path, file, {
      cacheControl: "3600", upsert: false, contentType: file.type,
    });
    setUploading(false);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("officer-photos").getPublicUrl(path);
    set("photo_url", data.publicUrl);
    toast.success("Photo uploaded");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return toast.error("Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;
    setSaving(true);
    const { error } = await supabase.from("loan_officers").insert({
      name,
      slug,
      title: form.title || null,
      nmls_id: form.nmls_id || null,
      email: form.email || null,
      phone: form.phone || null,
      whatsapp: form.whatsapp || null,
      bio: form.bio || null,
      about: form.about || null,
      photo_url: form.photo_url || null,
      portal_link: form.portal_link || null,
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      specialties: form.specialties.split(",").map((s) => s.trim()).filter(Boolean),
      linkedin_url: form.linkedin_url || null,
      facebook_url: form.facebook_url || null,
      instagram_url: form.instagram_url || null,
      twitter_url: form.twitter_url || null,
      website_url: form.website_url || null,
      licensed_states: form.licensed_states,
      is_active: false,
      display_order: 999,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    void notifySubmission({
      source: "mlo-onboard",
      subject: `New MLO application — ${name}`,
      fields: {
        Name: name,
        Title: form.title,
        "NMLS ID": form.nmls_id,
        Email: form.email,
        Phone: form.phone,
        WhatsApp: form.whatsapp,
        Languages: form.languages,
        Specialties: form.specialties,
        "Licensed States": form.licensed_states.join(", "),
        "Portal Link": form.portal_link,
        LinkedIn: form.linkedin_url,
        Website: form.website_url,
        "Photo URL": form.photo_url,
      },
      message: form.bio || form.about,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h1 className="mt-4 text-2xl font-bold">Profile submitted!</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks! Our team will review your profile and publish it shortly.
        </p>
        <Button asChild className="mt-6"><Link to="/">Back to home</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <span className="eyebrow">MLO Onboarding</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Create your <span className="gradient-text">loan officer profile</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Fill out your details below. Your profile will be reviewed and published by our admin.
        </p>
      </div>

      <Card className="mt-8 p-6">
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-xs">Profile photo</Label>
            <div className="flex items-center gap-4">
              {form.photo_url ? (
                <img src={form.photo_url} alt="" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-secondary" />
              )}
              <input
                ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhoto(f); e.target.value = ""; }}
              />
              <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {form.photo_url ? "Replace photo" : "Upload photo"}
              </Button>
            </div>
          </div>

          <F label="Full name *"><Input required value={form.name} onChange={(e) => set("name", e.target.value)} /></F>
          <F label="Title (e.g. Senior Loan Officer)"><Input value={form.title} onChange={(e) => set("title", e.target.value)} /></F>
          <F label="NMLS ID"><Input value={form.nmls_id} onChange={(e) => set("nmls_id", e.target.value)} /></F>
          <F label="Email *"><Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} /></F>
          <F label="Phone"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} /></F>
          <F label="WhatsApp number"><Input placeholder="16824131045" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></F>

          <F label="Your personal 1003 application link" className="sm:col-span-2">
            <Input placeholder="https://ensurehomeloans.my1003app.com/XXXXXX/register?..." value={form.portal_link} onChange={(e) => set("portal_link", e.target.value)} />
          </F>

          <F label="Specialties (comma-separated)" className="sm:col-span-2">
            <Input placeholder="VA Loans, Jumbo, Refinance" value={form.specialties} onChange={(e) => set("specialties", e.target.value)} />
          </F>
          <F label="Languages (comma-separated)" className="sm:col-span-2">
            <Input placeholder="English, Spanish" value={form.languages} onChange={(e) => set("languages", e.target.value)} />
          </F>

          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-xs">Licensed states</Label>
            <p className="mb-2 text-xs text-muted-foreground">
              Select every state where you currently hold an active mortgage loan originator license.
            </p>
            {form.licensed_states.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {form.licensed_states.map((code) => {
                  const s = US_STATES.find((x) => x.code === code);
                  return (
                    <span key={code} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {s?.name ?? code}
                      <button
                        type="button"
                        aria-label={`Remove ${s?.name ?? code}`}
                        onClick={() => set("licensed_states", form.licensed_states.filter((c) => c !== code))}
                        className="rounded-full hover:bg-primary/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
            <div className="max-h-56 overflow-y-auto rounded-md border border-input p-3">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
                {US_STATES.map((s) => {
                  const checked = form.licensed_states.includes(s.code);
                  return (
                    <label key={s.code} className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-accent">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          set(
                            "licensed_states",
                            e.target.checked
                              ? [...form.licensed_states, s.code]
                              : form.licensed_states.filter((c) => c !== s.code),
                          );
                        }}
                        className="h-3.5 w-3.5"
                      />
                      <span className="truncate">{s.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <F label="Short bio (1–2 sentences, shown on cards)" className="sm:col-span-2">
            <Textarea rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
          </F>
          <F label="About (full description shown on your profile)" className="sm:col-span-2">
            <Textarea rows={5} value={form.about} onChange={(e) => set("about", e.target.value)} />
          </F>

          <div className="sm:col-span-2 mt-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Social links</h3>
          </div>
          <F label="LinkedIn URL"><Input placeholder="https://linkedin.com/in/..." value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} /></F>
          <F label="Facebook URL"><Input placeholder="https://facebook.com/..." value={form.facebook_url} onChange={(e) => set("facebook_url", e.target.value)} /></F>
          <F label="Instagram URL"><Input placeholder="https://instagram.com/..." value={form.instagram_url} onChange={(e) => set("instagram_url", e.target.value)} /></F>
          <F label="X / Twitter URL"><Input placeholder="https://x.com/..." value={form.twitter_url} onChange={(e) => set("twitter_url", e.target.value)} /></F>
          <F label="Personal website URL" className="sm:col-span-2"><Input placeholder="https://..." value={form.website_url} onChange={(e) => set("website_url", e.target.value)} /></F>

          <div className="sm:col-span-2 mt-2">
            <Button type="submit" size="lg" disabled={saving} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function F({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs">{label}</Label>
      {children}
    </div>
  );
}
