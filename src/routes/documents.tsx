import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileUp, FileText, Trash2, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Secure Document Upload — HomeBridge Mortgage" },
      { name: "description", content: "Securely upload your loan documents — W-2s, paystubs, bank statements, and ID — for pre-approval." },
    ],
  }),
  component: DocumentsPage,
});

const CHECKLIST = [
  { key: "id", label: "Photo ID (driver's license / passport)" },
  { key: "paystubs", label: "Last 2 paystubs" },
  { key: "w2", label: "Last 2 years of W-2s" },
  { key: "tax_returns", label: "Last 2 years of tax returns" },
  { key: "bank_statements", label: "Last 2 months of bank statements" },
  { key: "other", label: "Other (gift letters, divorce decree, etc.)" },
];

interface DocRow {
  id: string;
  file_name: string;
  category: string;
  size_bytes: number | null;
  created_at: string;
  storage_path: string;
}

function DocumentsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("paystubs");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("documents")
      .select("id,file_name,category,size_bytes,created_at,storage_path")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error("Could not load your documents");
        else setDocs(data ?? []);
      });
  }, [user]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const mode = String(fd.get("mode") || "signin");
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/documents` },
      });
      if (error) return toast.error(error.message);
      toast.success("Account created — check your email to confirm.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return toast.error(error.message);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File too large (max 25MB).");
      return;
    }
    setUploading(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${user.id}/${Date.now()}-${safeName}`;
    const { error: upErr } = await supabase.storage.from("loan-documents").upload(path, file);
    if (upErr) {
      setUploading(false);
      toast.error(upErr.message);
      return;
    }
    const { data: row, error: insErr } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        storage_path: path,
        file_name: file.name,
        category,
        size_bytes: file.size,
      })
      .select("id,file_name,category,size_bytes,created_at,storage_path")
      .single();
    setUploading(false);
    e.target.value = "";
    if (insErr || !row) {
      toast.error("Upload saved but record failed. Contact us.");
      return;
    }
    setDocs((d) => [row as DocRow, ...d]);
    toast.success("Uploaded securely.");
  }

  async function handleDelete(d: DocRow) {
    if (!confirm(`Delete ${d.file_name}?`)) return;
    await supabase.storage.from("loan-documents").remove([d.storage_path]);
    const { error } = await supabase.from("documents").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    setDocs((arr) => arr.filter((x) => x.id !== d.id));
    toast.success("Deleted.");
  }

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" /><span className="font-semibold">Secure document portal</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold">Sign In to Upload</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create an account or sign in to securely send us your loan documents.
          </p>
          <form onSubmit={signIn} className="mt-5 space-y-3">
            <input type="hidden" name="mode" value="signin" />
            <div>
              <Label htmlFor="d-email">Email</Label>
              <Input id="d-email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="d-pw">Password</Label>
              <Input id="d-pw" name="password" type="password" required minLength={6} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="submit">Sign in</Button>
              <Button type="submit" variant="outline" onClick={(e) => {
                const form = (e.currentTarget as HTMLButtonElement).form!;
                (form.elements.namedItem("mode") as HTMLInputElement).value = "signup";
              }}>
                Create account
              </Button>
            </div>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Your files are stored encrypted and only visible to you and our licensed team.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Your Loan Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,320px]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Upload a Document</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-[200px,1fr]">
            <div>
              <Label htmlFor="cat" className="text-xs">Category</Label>
              <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {CHECKLIST.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="file" className="text-xs">File (PDF, JPG, PNG · max 25MB)</Label>
              <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.heic,.webp" onChange={handleUpload} disabled={uploading} />
            </div>
          </div>
          {uploading && <p className="mt-3 text-sm text-muted-foreground">Uploading securely…</p>}

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Uploaded files</h3>
          {docs.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No documents yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="h-5 w-5 flex-none text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{d.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {CHECKLIST.find((c) => c.key === d.category)?.label ?? d.category} ·{" "}
                        {d.size_bytes ? `${(d.size_bytes / 1024).toFixed(0)} KB` : ""}
                      </p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(d)} aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Pre-Approval Checklist</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {CHECKLIST.map((c) => {
              const done = docs.some((d) => d.category === c.key);
              return (
                <li key={c.key} className="flex items-start gap-2">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${done ? "text-[oklch(0.62_0.16_150)]" : "text-muted-foreground/40"}`} />
                  <span className={done ? "line-through text-muted-foreground" : ""}>{c.label}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 rounded-lg bg-secondary/60 p-4 text-xs text-muted-foreground">
            <FileUp className="mb-1 inline h-4 w-4" /> Files are encrypted at rest and visible only to you and your assigned loan officer.
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/contact">Need help? Talk to us</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
