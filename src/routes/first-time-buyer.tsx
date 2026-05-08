import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, PiggyBank, FileText, Calculator, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GradientOrb } from "@/components/site/GradientOrb";

export const Route = createFileRoute("/first-time-buyer")({
  head: () => ({
    meta: [
      { title: "First-Time Buyer Guide — Ensure Home Loans" },
      { name: "description", content: "Step-by-step guide to buying your first home: budgeting, pre-approval, programs with low down payments, and closing." },
      { property: "og:title", content: "First-Time Home Buyer Guide" },
      { property: "og:description", content: "Everything first-time buyers need — programs, pre-approval, and closing checklist." },
    ],
  }),
  component: FirstTimeBuyer,
});

const tones = ["brand", "gold", "teal", "rose", "violet", "brand"] as const;
const steps = [
  { icon: PiggyBank, title: "Know your budget", body: "Use our affordability calculator to set a realistic price range based on income, debts, and down payment." },
  { icon: FileText, title: "Get pre-qualified", body: "A pre-qualification letter shows sellers you're serious. Takes minutes and uses a soft credit pull." },
  { icon: Home, title: "Shop with confidence", body: "Tour homes within your budget. Your loan officer is on standby for quick offer-letter turnarounds." },
  { icon: Calculator, title: "Lock your rate", body: "Once your offer is accepted, lock today's rate for 30–60 days while underwriting completes." },
  { icon: Users, title: "Underwrite & appraise", body: "We coordinate the appraisal, title, and final approval. You'll get a clear-to-close in days, not weeks." },
  { icon: CheckCircle2, title: "Close & move in", body: "Sign at closing, get your keys, and start building equity in your first home." },
];

const programs = [
  { name: "FHA Loan", down: "3.5% down", note: "Flexible credit (580+)" },
  { name: "Conventional 97", down: "3% down", note: "PMI removable later" },
  { name: "VA Loan", down: "0% down", note: "Veterans & active duty" },
  { name: "USDA Loan", down: "0% down", note: "Eligible rural areas" },
];

function FirstTimeBuyer() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh">
        <GradientOrb className="-top-20 -left-10" color="oklch(0.82 0.14 80 / 0.45)" size={420} />
        <GradientOrb className="-top-10 right-0" color="oklch(0.68 0.11 195 / 0.4)" size={360} delay={2000} />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <span className="eyebrow">For first-time buyers</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Your first home, <span className="gradient-text">made simple</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A clear roadmap from budgeting to keys-in-hand, plus the programs designed to help
            first-timers get in with less down.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="glow-on-hover"><Link to="/get-prequalified">Get pre-qualified</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/affordability">Check affordability</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading eyebrow="The roadmap" title="The 6-step path to your first home" gradientWords="6-step path" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card-elevated rounded-xl p-6">
              <div className="flex items-center gap-3">
                <span className={`icon-chip ${tones[i]}`}><s.icon className="h-5 w-5" /></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-warm">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading eyebrow="Programs" title="Built for first-time buyers" subtitle="Lower down payments, flexible credit, and benefits you may qualify for." gradientWords="first-time buyers" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <div key={p.name} className="gradient-border p-6">
                <span className={`icon-chip ${tones[i]} mb-4`}><Home className="h-5 w-5" /></span>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold gradient-text">{p.down}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="cta-banner relative flex flex-wrap items-center justify-between gap-4 p-8 md:p-10">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">Ready to take the first step?</h3>
            <p className="mt-1 text-primary-foreground/80">Get pre-qualified in minutes — no commitment.</p>
          </div>
          <Button asChild size="lg" className="relative z-10 bg-[oklch(0.84_0.13_75)] text-[oklch(0.2_0.05_40)] hover:opacity-90">
            <Link to="/get-prequalified">Start now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
