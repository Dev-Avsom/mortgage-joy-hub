import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ShieldCheck, TrendingDown, ArrowRight, FileCheck, Star, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Reviews } from "@/components/site/Reviews";
import { RateQuoteWidget } from "@/components/site/RateQuoteWidget";
import { BestRateBadge } from "@/components/site/BestRateBadge";
import { GradientOrb } from "@/components/site/GradientOrb";
import { Reveal } from "@/components/site/Reveal";
import { LoanProcessTimeline } from "@/components/site/LoanProcessTimeline";

import { LoanComparisonChart } from "@/components/site/LoanComparisonChart";

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
        className="relative overflow-hidden text-white animated-bg"
        style={{ background: "var(--gradient-hero)" }}
      >
        <GradientOrb className="-top-32 -left-20" color="oklch(0.78 0.14 75 / 0.55)" size={520} />
        <GradientOrb className="-bottom-32 -right-20" color="oklch(0.62 0.16 50 / 0.6)" size={460} delay={3000} />
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="animate-fade-in-up inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[oklch(0.84_0.13_75)]" />
                Licensed in 50 states · NMLS {siteConfig.nmlsId}
              </span>
              <BestRateBadge />
            </div>
            <h1 className="animate-fade-in-up mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl" style={{ animationDelay: "120ms" }}>
              Your dream home,{" "}
              <span className="relative inline-block text-[oklch(0.84_0.13_75)]">
                funded faster
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" fill="none">
                  <path d="M2 5 Q 50 1, 100 4 T 198 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
                </svg>
              </span>
              .
            </h1>
            <p className="animate-fade-in-up mt-5 max-w-xl text-lg text-white/85" style={{ animationDelay: "240ms" }}>
              Compare live rates from <strong>230+ wholesale lenders</strong> in 60 seconds and talk to a licensed loan officer — no spam, no pressure.
            </p>
            <ul className="animate-fade-in-up mt-5 grid max-w-md gap-2 text-sm text-white/85" style={{ animationDelay: "300ms" }}>
              {["Soft credit check — won't affect your score", "Close in as little as 15 days", "Real humans, available 7 days a week"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.84_0.13_75)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <Button asChild size="lg" className="glow-on-hover bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_255)] hover:opacity-90">
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
            <div className="animate-fade-in-up mt-8 flex flex-wrap items-center gap-5 border-t border-white/15 pt-6 text-sm" style={{ animationDelay: "480ms" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["oklch(0.84_0.13_75)", "oklch(0.7_0.15_30)", "oklch(0.65_0.18_260)", "oklch(0.7_0.15_180)"].map((c, i) => (
                    <div key={i} className="h-7 w-7 rounded-full border-2 border-[oklch(0.2_0.05_255)]" style={{ background: c }} />
                  ))}
                </div>
                <div className="text-white/85">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.84_0.13_75)] text-[oklch(0.84_0.13_75)]" />)}
                    <span className="ml-1 font-semibold">4.9</span>
                  </div>
                  <div className="text-xs text-white/65">10,000+ families funded</div>
                </div>
              </div>
              <div className="hidden h-10 w-px bg-white/15 sm:block" />
              <div className="flex items-center gap-2 text-white/85">
                <TrendingUp className="h-5 w-5 text-[oklch(0.84_0.13_75)]" />
                <div>
                  <div className="font-semibold">$2B+ funded</div>
                  <div className="text-xs text-white/65">across 29+ states</div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-scale-in relative" style={{ animationDelay: "300ms" }}>
            <div aria-hidden className="absolute -inset-3 rounded-3xl bg-white/5 blur-2xl" />
            <div className="relative">
              <RateQuoteWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: TrendingDown, title: "Competitive rates", body: "We shop multiple lenders to find the best rate for your profile." },
            { icon: ShieldCheck, title: "No surprises", body: "Transparent fees and a clear timeline from application to closing." },
            { icon: Users, title: "Real loan officers", body: "Talk to a licensed expert — not a chatbot. Available 7 days a week." },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <Card className="hover-lift p-6">
                <v.icon className="h-9 w-9 text-primary transition-transform group-hover:scale-110" />
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Loan comparison infographic */}
      <section className="bg-secondary/40">
        <LoanComparisonChart />
        <div className="mx-auto max-w-7xl px-4 pb-12 text-center">
          <Link to="/loan-programs" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            View all loan programs <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Process timeline */}
      <LoanProcessTimeline />

      {/* Social proof */}
      <Reviews />
    </>
  );
}
