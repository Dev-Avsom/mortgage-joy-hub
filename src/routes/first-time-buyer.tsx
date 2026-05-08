import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, PiggyBank, FileText, Calculator, Users } from "lucide-react";

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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold md:text-4xl">First-Time Home Buyer Guide</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Buying your first home is exciting — and a little overwhelming. Here's a clear roadmap from
          budgeting to keys-in-hand, plus the programs designed to help first-timers get in with less down.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link to="/get-prequalified">Get pre-qualified</Link></Button>
          <Button asChild variant="outline"><Link to="/affordability">Check affordability</Link></Button>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold">The 6-step path to your first home</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Card key={s.title} className="p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Step {i + 1}</span>
            </div>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </Card>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">Programs built for first-time buyers</h2>
      <p className="mt-2 text-muted-foreground">Lower down payments, flexible credit, and benefits you may qualify for.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <Card key={p.name} className="p-5">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-2 text-2xl font-bold text-primary">{p.down}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold">Ready to take the first step?</h3>
          <p className="text-sm text-muted-foreground">Get pre-qualified in minutes — no commitment.</p>
        </div>
        <Button asChild size="lg"><Link to="/get-prequalified">Start now</Link></Button>
      </Card>
    </div>
  );
}
