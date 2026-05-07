import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Phone, MessageCircle, MapPin, Search } from "lucide-react";

type Officer = Tables<"loan_officers">;

export const Route = createFileRoute("/find-officer")({
  head: () => ({
    meta: [
      { title: "Find a Loan Officer Near You — HomeBridge Mortgage" },
      { name: "description", content: "Search licensed mortgage loan officers by ZIP, state, language, or specialty." },
    ],
  }),
  loader: async () => {
    const { data, error } = await supabase
      .from("loan_officers")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return { officers: (data ?? []) as Officer[] };
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Could not load loan officers</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: FindOfficerPage,
});

function FindOfficerPage() {
  const { officers } = Route.useLoaderData() as { officers: Officer[] };
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("");

  const langs = useMemo(() => {
    const set = new Set<string>();
    officers.forEach((o) => o.languages.forEach((l: string) => set.add(l)));
    return Array.from(set).sort();
  }, [officers]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return officers.filter((o) => {
      const blob = `${o.name} ${o.title ?? ""} ${o.bio ?? ""} ${o.specialties.join(" ")} ${o.languages.join(" ")}`.toLowerCase();
      const matchQ = !needle || blob.includes(needle);
      const matchLang = !lang || o.languages.includes(lang);
      return matchQ && matchLang;
    });
  }, [officers, q, lang]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Find a loan officer near you</h1>
        <p className="mt-2 text-muted-foreground">
          Search by ZIP code, state, language, or loan specialty. Every officer is NMLS-licensed.
        </p>
      </div>

      <Card className="mt-6 p-5">
        <div className="grid gap-3 md:grid-cols-[1fr,200px,auto]">
          <div>
            <Label htmlFor="q" className="text-xs">Search by ZIP, state, name, or specialty</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="e.g. 78701, Texas, FHA, Spanish" />
            </div>
          </div>
          <div>
            <Label htmlFor="lang" className="text-xs">Language</Label>
            <select
              id="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              {langs.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <Button type="button" variant="outline" onClick={() => { setQ(""); setLang(""); }}>Reset</Button>
          </div>
        </div>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">{filtered.length} officer{filtered.length === 1 ? "" : "s"} found</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => (
          <Card key={o.id} className="overflow-hidden p-0 transition hover:shadow-[var(--shadow-elegant)]">
            <div className="flex gap-4 p-5">
              {o.photo_url && (
                <img src={o.photo_url} alt={o.name} className="h-20 w-20 flex-none rounded-full object-cover" loading="lazy" />
              )}
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">{o.name}</h2>
                <p className="truncate text-xs text-muted-foreground">{o.title}</p>
                {o.nmls_id && <p className="text-[11px] text-muted-foreground">NMLS #{o.nmls_id}</p>}
                <div className="mt-2 flex flex-wrap gap-1">
                  {o.languages.slice(0, 3).map((l: string) => (
                    <span key={l} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px]">
                      <MapPin className="h-2.5 w-2.5" />{l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-border p-3">
              {o.phone && (
                <Button asChild size="sm" variant="outline"><a href={`tel:${o.phone}`}><Phone className="h-3.5 w-3.5" /></a></Button>
              )}
              {o.whatsapp && (
                <Button asChild size="sm" className="bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
                  <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-3.5 w-3.5" /></a>
                </Button>
              )}
              <Button asChild size="sm">
                <Link to="/loan-officers/$slug" params={{ slug: o.slug }}>Profile</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No matches. Try clearing filters.</p>
      )}
    </div>
  );
}
