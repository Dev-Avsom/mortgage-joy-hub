import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ShieldCheck, Award, FileCheck, DollarSign, TrendingUp, Briefcase, Landmark, Wallet } from "lucide-react";
import { LOAN_PROGRAMS } from "@/lib/loan-programs";

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

export const Route = createFileRoute("/loan-programs")({
  head: () => ({
    meta: [
      { title: "Loan Programs — HomeBridge Mortgage" },
      { name: "description", content: "Conventional, FHA, VA, Jumbo, USDA, and Refinance loan programs to fit every buyer." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Loan programs</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        From first-time buyers to seasoned investors, we have a loan program built for you.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LOAN_PROGRAMS.map((p) => {
          const Icon = ICONS[p.slug] ?? Home;
          return (
            <Card key={p.slug} className="flex flex-col p-6 transition hover:shadow-[var(--shadow-elegant)]">
              <Icon className="h-9 w-9 text-primary" />
              <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
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
            </Card>
          );
        })}
        <Card className="flex flex-col p-6 transition hover:shadow-[var(--shadow-elegant)]">
          <TrendingUp className="h-9 w-9 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Refinance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Lower your rate, shorten your term, or tap into home equity.</p>
          <div className="mt-auto pt-5">
            <Button asChild variant="outline" className="w-full">
              <Link to="/refinance">Refinance calculator</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
