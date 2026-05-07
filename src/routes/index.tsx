import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ShieldCheck, TrendingDown, Phone, ArrowRight, Home, FileCheck, Award, Star, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Reviews } from "@/components/site/Reviews";
import { RateQuoteWidget } from "@/components/site/RateQuoteWidget";
import { RateAlertForm } from "@/components/site/RateAlertForm";
import { BestRateBadge } from "@/components/site/BestRateBadge";
import heroHome from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ensure Home Loans — Your One Stop Shop for Home Loans" },
      { name: "description", content: "Conventional, FHA, VA, Jumbo, DSCR & Non-QM loans from 40+ lenders. Get pre-qualified, run real numbers, and connect with a licensed loan officer." },
      { property: "og:title", content: "Ensure Home Loans" },
      { property: "og:description", content: "Smarter home loans, made simple. Compare rates from 40+ lenders and talk to a real licensed loan officer." },
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
      >
        <div className="absolute inset-0">
          <img
            src={heroHome}
            alt="Modern family home at sunset"
            className="h-full w-full object-cover"
            width={1600}
            height={1024}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, oklch(0.22 0.07 45 / 0.92) 0%, oklch(0.32 0.12 50 / 0.78) 55%, oklch(0.32 0.12 50 / 0.45) 100%)" }}
          />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                Licensed · {siteConfig.nmlsId}
              </span>
              <BestRateBadge />
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Your one stop shop <span className="text-[oklch(0.86_0.15_75)]">for home loans.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Compare options from <strong>40+ wholesale lenders</strong>, run real numbers in seconds, and talk to a licensed loan officer — no spam, no pressure.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
              {[
                "Conventional, FHA, VA, Jumbo",
                "DSCR & Non-QM specialists",
                "Same-day pre-qualification",
                "Close in as fast as 14 days",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.86_0.15_75)]" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[oklch(0.86_0.15_75)] text-[oklch(0.22_0.07_45)] hover:opacity-90">
                <Link to="/get-prequalified">
                  <FileCheck className="mr-2 h-5 w-5" /> Get pre-qualified
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" /> {siteConfig.phone}
                </a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm">
              <div><div className="text-2xl font-bold">250+</div><div className="text-white/70">MLO partners</div></div>
              <div><div className="text-2xl font-bold">29+</div><div className="text-white/70">States served</div></div>
              <div><div className="text-2xl font-bold">40+</div><div className="text-white/70">Lender network</div></div>
            </div>
          </div>
          <div className="relative">
            <RateQuoteWidget />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-[oklch(0.78_0.16_75)] text-[oklch(0.78_0.16_75)]" /> 4.9/5 client rating</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> {siteConfig.nmlsId}</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Avg close: 14–21 days</span>
          <span className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> 40+ lender network</span>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Why borrowers choose Ensure</h2>
          <p className="mt-2 text-muted-foreground">A better mortgage experience — built around you, not the lender.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: TrendingDown, title: "Competitive rates", body: "We shop multiple lenders to find the best rate for your profile." },
            { icon: ShieldCheck, title: "No surprises", body: "Transparent fees and a clear timeline from application to closing." },
            { icon: Users, title: "Real loan officers", body: "Talk to a licensed expert — not a chatbot. Available 7 days a week." },
          ].map((v) => (
            <Card key={v.title} className="group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition group-hover:scale-125" />
              <v.icon className="relative h-10 w-10 text-primary" />
              <h3 className="relative mt-3 text-lg font-semibold">{v.title}</h3>
              <p className="relative mt-1 text-sm text-muted-foreground">{v.body}</p>
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
              <p className="mt-2 text-muted-foreground">Conventional to creative — we have a program for every borrower.</p>
            </div>
            <Link to="/loan-programs" className="hidden text-sm font-medium text-primary hover:underline md:inline-flex">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, name: "Conventional", desc: "Stable rates with as little as 3% down.", slug: "conventional" },
              { icon: ShieldCheck, name: "FHA", desc: "Flexible credit and 3.5% down options.", slug: "fha" },
              { icon: Award, name: "VA", desc: "Zero-down financing for eligible veterans.", slug: "va" },
              { icon: FileCheck, name: "DSCR", desc: "Investor loans qualified by rental income.", slug: "dscr" },
            ].map((p) => (
              <Link
                key={p.name}
                to="/loan-programs/$slug"
                params={{ slug: p.slug }}
                className="group"
              >
                <Card className="h-full p-6 transition group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-elegant)]">
                  <p.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">From "what if" to keys in 4 steps</h2>
          <p className="mt-2 text-muted-foreground">A simple, transparent process — guided by a licensed loan officer.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Get pre-qualified", d: "Soft credit pull, ~10 minutes." },
            { n: "02", t: "Shop with confidence", d: "Know your budget and lock a rate." },
            { n: "03", t: "Underwriting", d: "We handle paperwork and lender coordination." },
            { n: "04", t: "Close & move in", d: "Sign, fund, and get the keys." },
          ].map((s) => (
            <Card key={s.n} className="relative p-6">
              <div className="text-3xl font-bold text-primary/30">{s.n}</div>
              <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/process">See full process <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
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
