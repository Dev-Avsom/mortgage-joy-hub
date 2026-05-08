import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LeadForm } from "@/components/site/LeadForm";

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
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-semibold">Get in touch with {officer.name.split(" ")[0]}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Send a quick note and they'll reach out today.</p>
            <div className="mt-4">
              <LeadForm source="mlo-profile" loanOfficerId={officer.id} submitLabel="Send message" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
