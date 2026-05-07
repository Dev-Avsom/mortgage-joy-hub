import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getStateBySlug, US_STATES } from "@/lib/states";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { siteConfig } from "@/lib/site-config";
import { Home, ShieldCheck, Award, FileCheck, MapPin, Phone } from "lucide-react";
import { usd } from "@/lib/mortgage";

export const Route = createFileRoute("/mortgage/$state")({
  loader: ({ params }) => {
    const state = getStateBySlug(params.state);
    if (!state) throw notFound();
    return { state };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.state;
    if (!s) return { meta: [{ title: "Mortgage Loans" }] };
    const title = `${s.name} Mortgage Loans — Rates from ${s.medianRate.toFixed(2)}% | HomeBridge`;
    const desc = `Get a ${s.name} home loan: conventional, FHA, VA & jumbo. Licensed lender serving ${s.popularCities.slice(0,3).join(", ")} and statewide.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { name: "geo.region", content: `US-${s.code}` },
        { name: "geo.placename", content: s.capital },
      ],
      links: [{ rel: "canonical", href: `https://mortgage-joy-hub.lovable.app/mortgage/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MortgageLoan",
            name: `${s.name} Home Loans`,
            provider: { "@type": "FinancialService", name: "HomeBridge Mortgage" },
            areaServed: { "@type": "State", name: s.name },
            loanType: ["Conventional","FHA","VA","Jumbo","Refinance"],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">State not found</h1>
      <Link to="/mortgage" className="mt-4 inline-block text-primary hover:underline">View all states</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p>{error.message}</p>
    </div>
  ),
  component: StatePage,
});

function StatePage() {
  const { state } = Route.useLoaderData();
  const programs = [
    { icon: Home, name: "Conventional", body: `As little as 3% down for ${state.name} homebuyers.` },
    { icon: ShieldCheck, name: "FHA", body: `${state.name} FHA loans with credit scores from 580 and 3.5% down.` },
    { icon: Award, name: "VA", body: `Zero-down VA loans for ${state.name} veterans and active service members.` },
    { icon: FileCheck, name: "Refinance", body: `Lower your ${state.name} mortgage rate or tap home equity.` },
  ];

  return (
    <>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <Link to="/mortgage" className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white">
            <MapPin className="h-3 w-3" /> All states
          </Link>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            {state.name} Mortgage Loans
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Licensed lender serving {state.popularCities.slice(0, 3).join(", ")} and all of {state.name}. Rates from <strong>{state.medianRate.toFixed(2)}%</strong> · Median home price {usd(state.avgHomePrice)}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_255)] hover:opacity-90">
              <Link to="/get-prequalified">Get pre-qualified in {state.name}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <a href={siteConfig.phoneHref}><Phone className="mr-2 h-5 w-5" /> {siteConfig.phone}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Loan programs in {state.name}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Card key={p.name} className="p-5">
              <p.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-2xl font-bold">Popular {state.name} cities we serve</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {state.popularCities.map((c: string) => (
            <span key={c} className="rounded-full border border-border bg-secondary px-3 py-1 text-sm">
              <MapPin className="mr-1 inline h-3 w-3" />{c}, {state.code}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Talk to a {state.name} loan officer</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll match you with a licensed loan officer who knows the {state.name} market.
          </p>
          <div className="mt-5">
            <LeadForm source={`state-${state.slug}`} submitLabel={`Connect me with a ${state.name} expert`} />
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Looking for a different state?</p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {US_STATES.filter((s) => s.code !== state.code).slice(0, 12).map((s) => (
              <Link key={s.code} to="/mortgage/$state" params={{ state: s.slug }} className="hover:text-primary hover:underline">
                {s.name}
              </Link>
            ))}
            <Link to="/mortgage" className="font-medium text-primary hover:underline">All 50 →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
