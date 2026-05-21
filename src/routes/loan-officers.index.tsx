import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/lib/site-config";
import type { Tables } from "@/integrations/supabase/types";
import { GradientOrb } from "@/components/site/GradientOrb";

type Officer = Tables<"loan_officers">;

export const Route = createFileRoute("/loan-officers/")({
  head: () => ({
    meta: [
      { title: "Our Loan Officers — HomeBridge Mortgage" },
      { name: "description", content: "Meet our licensed mortgage loan officers and find the right expert for your home loan." },
    ],
  }),
  loader: async () => {
    const { data, error } = await supabase
      .from("loan_officers")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return { officers: data ?? [] };
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Could not load loan officers</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: OfficersPage,
});

function OfficersPage() {
  const { officers } = Route.useLoaderData();
  return (
    <div>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.68 0.11 195 / 0.4)" size={420} />
        <GradientOrb className="-top-10 right-0" color="oklch(0.82 0.14 80 / 0.4)" size={360} delay={2000} />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <span className="eyebrow">Our team</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Meet our <span className="gradient-text">loan officers</span></h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Licensed experts ready to help you navigate every step of your home loan.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(officers as Officer[]).map((o) => (
          <Card key={o.id} className="card-elevated overflow-hidden p-0">
            {o.photo_url && (
              <Link to="/loan-officers/$slug" params={{ slug: o.slug }} aria-label={`View ${o.name}'s profile`}>
                <img src={o.photo_url} alt={`${o.name}, ${o.title ?? "Loan officer"}`} className="h-56 w-full object-cover transition hover:opacity-90" loading="lazy" />
              </Link>
            )}
            <div className="p-5">
              <h2 className="text-lg font-semibold">
                <Link to="/loan-officers/$slug" params={{ slug: o.slug }} className="hover:text-primary hover:underline">
                  {o.name}
                </Link>
              </h2>
              <p className="text-sm gradient-text font-medium">{o.title}</p>
              {o.nmls_id && <p className="mt-1 text-xs text-muted-foreground">NMLS #{o.nmls_id}</p>}
              <p className="mt-3 line-clamp-3 text-sm">{o.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {o.specialties.slice(0, 3).map((s: string) => (
                  <span key={s} className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs text-primary">{s}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {o.phone && (
                  <Button asChild variant="outline" size="sm">
                    <a href={`tel:${o.phone}`}><Phone className="mr-1 h-3.5 w-3.5" /> Call</a>
                  </Button>
                )}
                {o.whatsapp && (
                  <Button asChild size="sm" className="bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
                    <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1 h-3.5 w-3.5" /> Chat
                    </a>
                  </Button>
                )}
              </div>
              <Link
                to="/loan-officers/$slug"
                params={{ slug: o.slug }}
                className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
              >
                View profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
      {officers.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          Profiles coming soon. Reach us at {siteConfig.phone}.
        </p>
      )}
      </div>
    </div>
  );
}
