import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ShieldCheck, Award, FileCheck, DollarSign, TrendingUp, Briefcase, Landmark, Wallet } from "lucide-react";
import { LOAN_PROGRAMS } from "@/lib/loan-programs";
import { LoanComparisonChart } from "@/components/site/LoanComparisonChart";
import { Reveal } from "@/components/site/Reveal";
import { GradientOrb } from "@/components/site/GradientOrb";
import { SectionHeading } from "@/components/site/SectionHeading";

const ICONS: Record<string, typeof Home> = {
  conventional: Home,
  fha: ShieldCheck,
  va: Award,
  jumbo: DollarSign,
  usda: FileCheck,
  dscr: Briefcase,
  "bank-statement": Landmark,
  heloc: Wallet,
};

const TONES = ["brand", "gold", "teal", "rose", "violet"] as const;

export const Route = createFileRoute("/loan-programs/")({
  head: () => ({
    meta: [
      { title: "Loan Programs — Ensure Home Loans" },
      { name: "description", content: "Conventional, FHA, VA, Jumbo, USDA, and Refinance loan programs to fit every buyer." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.82 0.14 80 / 0.45)" size={420} />
        <GradientOrb className="-top-10 right-0" color="oklch(0.65 0.15 295 / 0.35)" size={360} delay={2000} />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <span className="eyebrow">Loan programs</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">A Loan <span className="gradient-text">Built for You</span></h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              From first-time buyers to seasoned investors, we have a loan program built for you.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <LoanComparisonChart full />

        <SectionHeading eyebrow="The full lineup" title="All programs" gradientWords="All programs" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LOAN_PROGRAMS.map((p, i) => {
          const Icon = ICONS[p.slug] ?? Home;
          const tone = TONES[i % TONES.length];
          return (
            <div key={p.slug} className="card-elevated group flex flex-col rounded-xl p-6">
              <span className={`icon-chip ${tone}`}><Icon className="h-5 w-5" /></span>
              <h2 className="mt-4 text-xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {p.highlights.slice(0, 3).map((h) => (
                  <li key={h.label} className="flex justify-between gap-2 border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">{h.label}</span>
                    <span className="font-medium">{h.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                <Button asChild variant="outline">
                  <Link to="/loan-programs/$slug" params={{ slug: p.slug }}>Details</Link>
                </Button>
                <Button asChild>
                  <Link to="/get-prequalified">Apply</Link>
                </Button>
              </div>
            </div>
          );
        })}
        <div className="gradient-border flex flex-col p-6">
          <span className="icon-chip rose"><TrendingUp className="h-5 w-5" /></span>
          <h2 className="mt-4 text-xl font-semibold">Refinance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Lower your rate, shorten your term, or tap into home equity.</p>
          <div className="mt-auto pt-5">
            <Button asChild variant="outline" className="w-full">
              <Link to="/refinance">Refinance calculator</Link>
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
