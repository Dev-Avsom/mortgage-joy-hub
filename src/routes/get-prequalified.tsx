import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

const DEFAULT_APPLY_URL = "https://ensurehomeloans.my1003app.com/950536/register?time=1779206112172";

export const Route = createFileRoute("/get-prequalified")({
  head: () => ({
    meta: [
      { title: "Apply Now — Ensure Home Loans" },
      { name: "description", content: "Choose your loan officer and start your mortgage application with Ensure Home Loans." },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("loan_officers")
      .select("id, name, title, photo_url, nmls_id, portal_link, slug, languages, specialties, licensed_states")
      .eq("is_active", true)
      .order("name", { ascending: true });
    return { officers: data ?? [] };
  },
  component: ChooseOfficerPage,
});

function ChooseOfficerPage() {
  const { officers } = Route.useLoaderData();
  const list = officers as Array<{
    id: string; name: string; title: string | null; photo_url: string | null;
    nmls_id: string | null; portal_link: string | null; slug: string;
    languages: string[]; specialties: string[]; licensed_states: string[];
  }>;

  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [lang, setLang] = useState("");
  const [specialty, setSpecialty] = useState("");

  const states = useMemo(() => {
    const set = new Set<string>();
    list.forEach((o) => (o.licensed_states ?? []).forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [list]);
  const langs = useMemo(() => {
    const set = new Set<string>();
    list.forEach((o) => (o.languages ?? []).forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [list]);
  const specialties = useMemo(() => {
    const set = new Set<string>();
    list.forEach((o) => (o.specialties ?? []).forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [list]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return list.filter((o) => {
      const blob = `${o.name} ${o.title ?? ""} ${(o.specialties ?? []).join(" ")} ${(o.languages ?? []).join(" ")}`.toLowerCase();
      const matchQ = !needle || blob.includes(needle);
      const matchState = !state || (o.licensed_states ?? []).includes(state);
      const matchLang = !lang || (o.languages ?? []).includes(lang);
      const matchSpec = !specialty || (o.specialties ?? []).includes(specialty);
      return matchQ && matchState && matchLang && matchSpec;
    });
  }, [list, q, state, lang, specialty]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <span className="eyebrow">Start your application</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Choose your <span className="gradient-text">loan officer</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Select an MLO to continue to their secure 1003 application portal.
        </p>
        {list.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Not sure who to pick?</p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95 ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
            >
              <a href={DEFAULT_APPLY_URL} target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-1 h-4 w-4" /> Use our general application <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>

      {list.length > 0 && (
        <Card className="mt-8 p-5">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr,160px,200px,160px,auto]">
            <div>
              <Label htmlFor="q" className="text-xs">Search by name or specialty</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="e.g. FHA, Spanish, Smith" />
              </div>
            </div>
            <div>
              <Label htmlFor="state" className="text-xs">State</Label>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Any</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="specialty" className="text-xs">Loan type / specialty</Label>
              <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Any</option>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="lang" className="text-xs">Language</Label>
              <select id="lang" value={lang} onChange={(e) => setLang(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Any</option>
                {langs.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <Button type="button" variant="outline" onClick={() => { setQ(""); setState(""); setLang(""); setSpecialty(""); }}>Reset</Button>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{filtered.length} officer{filtered.length === 1 ? "" : "s"} match</p>
        </Card>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => {
          const url = o.portal_link && o.portal_link.trim().length > 0
            ? o.portal_link
            : DEFAULT_APPLY_URL;
          return (
          <Card key={o.id} className="card-elevated overflow-hidden p-0">
            {o.photo_url && (
              <img src={o.photo_url} alt={o.name} className="h-48 w-full object-cover" loading="lazy" />
            )}
            <div className="p-5">
              <h2 className="text-lg font-semibold">{o.name}</h2>
              {o.title && <p className="text-sm gradient-text font-medium">{o.title}</p>}
              {o.nmls_id && <p className="mt-1 text-xs text-muted-foreground">NMLS #{o.nmls_id}</p>}
              <Button asChild className="mt-4 w-full">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Apply with {o.name.split(" ")[0]} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
          );
        })}
      </div>

      {list.length > 0 && filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No officers match. Try clearing filters or use our general application above.</p>
      )}

      {list.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Continue to our general application portal.</p>
          <Button asChild className="mt-4">
            <a href={DEFAULT_APPLY_URL} target="_blank" rel="noopener noreferrer">
              Start application <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

    </div>
  );
}
