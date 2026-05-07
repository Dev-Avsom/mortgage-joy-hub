import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ShieldCheck, TrendingDown, Phone, ArrowRight, Home, FileCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Reviews } from "@/components/site/Reviews";
import { RateQuoteWidget } from "@/components/site/RateQuoteWidget";
import { RateAlertForm } from "@/components/site/RateAlertForm";
import { BestRateBadge } from "@/components/site/BestRateBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HomeBridge Mortgage — Home Loans Made Simple" },
      { name: "description", content: "Get pre-qualified, calculate your monthly payment, and connect with a licensed US mortgage loan officer." },
      { property: "og:title", content: "HomeBridge Mortgage" },
      { property: "og:description", content: "Smarter home loans, made simple. Calculate payments and connect with a licensed loan officer." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                Licensed in 50 states · {siteConfig.nmlsId}
              </span>
              <BestRateBadge />
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Smarter home loans, <span className="text-[oklch(0.84_0.13_75)]">made simple.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              See live rates from <strong>230+ wholesale lenders</strong>, run real numbers in seconds, and talk to a real licensed loan officer — no spam, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_255)] hover:opacity-90">
                <Link to="/get-prequalified">
                  <FileCheck className="mr-2 h-5 w-5" /> Get pre-qualified
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link to="/find-officer">
                  <Users className="mr-2 h-5 w-5" /> Find an officer
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm">
              <div><div className="text-2xl font-bold">15+</div><div className="text-white/70">Years lending</div></div>
              <div><div className="text-2xl font-bold">$2B+</div><div className="text-white/70">Loans funded</div></div>
              <div><div className="text-2xl font-bold">4.9★</div><div className="text-white/70">Avg rating</div></div>
            </div>
          </div>
          <RateQuoteWidget />
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: TrendingDown, title: "Competitive rates", body: "We shop multiple lenders to find the best rate for your profile." },
            { icon: ShieldCheck, title: "No surprises", body: "Transparent fees and a clear timeline from application to closing." },
            { icon: Users, title: "Real loan officers", body: "Talk to a licensed expert — not a chatbot. Available 7 days a week." },
          ].map((v) => (
            <Card key={v.title} className="p-6">
              <v.icon className="h-9 w-9 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Loan programs we offer</h2>
              <p className="mt-2 text-muted-foreground">Find the right fit for your home-buying goals.</p>
            </div>
            <Link to="/loan-programs" className="hidden text-sm font-medium text-primary hover:underline md:inline-flex">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, name: "Conventional", desc: "Stable rates with as little as 3% down." },
              { icon: ShieldCheck, name: "FHA", desc: "Flexible credit and 3.5% down options." },
              { icon: Award, name: "VA", desc: "Zero-down financing for eligible veterans." },
              { icon: FileCheck, name: "Refinance", desc: "Lower payments or tap home equity." },
            ].map((p) => (
              <Card key={p.name} className="p-6 transition hover:shadow-[var(--shadow-elegant)]">
                <p.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <Reviews />

      {/* Rate alert */}
      <section className="mx-auto max-w-7xl px-4">
        <RateAlertForm />
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div
          className="flex flex-col items-center justify-between gap-6 rounded-2xl px-8 py-10 text-white shadow-[var(--shadow-elegant)] md:flex-row"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div>
            <h2 className="text-2xl font-bold">Ready to talk numbers?</h2>
            <p className="mt-1 text-white/80">Speak with a licensed loan officer today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href={siteConfig.phoneHref}><Phone className="mr-2 h-5 w-5" /> {siteConfig.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/loan-officers">Meet our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
