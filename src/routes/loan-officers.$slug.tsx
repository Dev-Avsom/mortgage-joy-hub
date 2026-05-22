import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, ArrowLeft, ArrowRight, Linkedin, Facebook, Instagram, Twitter, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { US_STATES } from "@/lib/us-states";

const DEFAULT_APPLY_URL = "https://ensurehomeloans.my1003app.com/950536/register?time=1779206112172";

export const Route = createFileRoute("/loan-officers/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("loan_officers")
      .select("*")
      .eq("slug", params.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return { officer: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.officer.name} — Loan Officer | HomeBridge Mortgage` },
          { name: "description", content: loaderData.officer.bio?.slice(0, 155) ?? "Licensed mortgage loan officer." },
          { property: "og:title", content: `${loaderData.officer.name} — Loan Officer` },
          { property: "og:description", content: loaderData.officer.bio?.slice(0, 155) ?? "Licensed mortgage loan officer." },
          ...(loaderData.officer.photo_url ? [{ property: "og:image", content: loaderData.officer.photo_url }] : []),
        ]
      : [{ title: "Loan Officer — HomeBridge Mortgage" }],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Profile unavailable</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Loan officer not found</h1>
      <Link to="/loan-officers" className="mt-4 inline-block text-primary hover:underline">
        Browse all loan officers
      </Link>
    </div>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { officer } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/loan-officers" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-1 h-4 w-4" /> All loan officers
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Card className="overflow-hidden p-0">
          {officer.photo_url && (
            <img src={officer.photo_url} alt={officer.name} className="aspect-square w-full object-cover" />
          )}
          <div className="space-y-2 p-5">
            {officer.phone && (
              <Button asChild variant="outline" className="w-full">
                <a href={`tel:${officer.phone}`}><Phone className="mr-2 h-4 w-4" /> {officer.phone}</a>
              </Button>
            )}
            {officer.whatsapp && (
              <Button asChild className="w-full bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
                <a href={`https://wa.me/${officer.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            )}
            {officer.email && (
              <Button asChild variant="outline" className="w-full">
                <a href={`mailto:${officer.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a>
              </Button>
            )}
          </div>
        </Card>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{officer.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{officer.title}</p>
          {officer.nmls_id && <p className="mt-1 text-sm text-muted-foreground">NMLS #{officer.nmls_id}</p>}
          {(officer.linkedin_url || officer.facebook_url || officer.instagram_url || officer.twitter_url || officer.website_url) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {officer.linkedin_url && (
                <a href={officer.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-[#0A66C2]/40">
                  <Linkedin className="h-4 w-4 text-[#0A66C2] transition-transform group-hover:scale-110" />
                </a>
              )}
              {officer.facebook_url && (
                <a href={officer.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-[#1877F2]/40">
                  <Facebook className="h-4 w-4 text-[#1877F2] transition-transform group-hover:scale-110" />
                </a>
              )}
              {officer.instagram_url && (
                <a href={officer.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-[#E1306C]/40">
                  <Instagram className="h-4 w-4 text-[#E1306C] transition-transform group-hover:scale-110" />
                </a>
              )}
              {officer.twitter_url && (
                <a href={officer.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="X/Twitter"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-[#1DA1F2]/40">
                  <Twitter className="h-4 w-4 text-[#1DA1F2] transition-transform group-hover:scale-110" />
                </a>
              )}
              {officer.website_url && (
                <a href={officer.website_url} target="_blank" rel="noopener noreferrer" aria-label="Website"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/40">
                  <Globe className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                </a>
              )}
            </div>
          )}
          {officer.about ? (
            <div className="mt-5 space-y-3 leading-relaxed whitespace-pre-line">{officer.about}</div>
          ) : (
            <p className="mt-5 leading-relaxed">{officer.bio}</p>
          )}
          {officer.achievements && officer.achievements.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Achievements</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {officer.achievements.map((a: string) => (<li key={a}>{a}</li>))}
              </ul>
            </div>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {officer.specialties.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Specialties</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {officer.specialties.map((s: string) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {officer.languages.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Languages</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {officer.languages.map((s: string) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {officer.licensed_states && officer.licensed_states.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Licensed in {officer.licensed_states.length} {officer.licensed_states.length === 1 ? "state" : "states"}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {officer.licensed_states.map((code: string) => {
                  const s = US_STATES.find((x) => x.code === code);
                  return (
                    <span key={code} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {s?.name ?? code}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-semibold">Ready to apply with {officer.name.split(" ")[0]}?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start your secure 1003 mortgage application in minutes.
            </p>
            <Button asChild size="lg" className="mt-4 w-full">
              <a
                href={(officer.portal_link && officer.portal_link.trim().length > 0) ? officer.portal_link : DEFAULT_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply with {officer.name.split(" ")[0]} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
