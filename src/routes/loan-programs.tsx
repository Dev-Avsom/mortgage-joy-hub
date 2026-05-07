import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ShieldCheck, Award, FileCheck, TrendingUp, DollarSign } from "lucide-react";

export const Route = createFileRoute("/loan-programs")({
  head: () => ({
    meta: [
      { title: "Loan Programs — HomeBridge Mortgage" },
      { name: "description", content: "Conventional, FHA, VA, Jumbo, USDA, and Refinance loan programs to fit every buyer." },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  { icon: Home, name: "Conventional", body: "As little as 3% down. Great for buyers with steady income and good credit.", bullets: ["Loans up to $806,500", "Fixed and adjustable rates", "PMI removable at 80% LTV"] },
  { icon: ShieldCheck, name: "FHA", body: "Government-backed loans with flexible credit and 3.5% down.", bullets: ["Credit scores from 580", "Gift funds allowed", "Lower closing costs"] },
  { icon: Award, name: "VA", body: "Zero-down financing for active-duty service members and veterans.", bullets: ["No down payment", "No PMI required", "Competitive rates"] },
  { icon: DollarSign, name: "Jumbo", body: "Financing for higher-priced homes above conventional limits.", bullets: ["Up to $3M loan amount", "Fixed and ARM options", "Custom underwriting"] },
  { icon: FileCheck, name: "USDA", body: "100% financing for eligible rural and suburban properties.", bullets: ["No down payment", "Lower mortgage insurance", "Income limits apply"] },
  { icon: TrendingUp, name: "Refinance", body: "Lower your rate, shorten your term, or tap into home equity.", bullets: ["Rate-and-term refinance", "Cash-out refinance", "Streamline options"] },
];

function ProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Loan programs</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        From first-time buyers to seasoned investors, we have a loan program built for you.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <Card key={p.name} className="flex flex-col p-6 transition hover:shadow-[var(--shadow-elegant)]">
            <p.icon className="h-9 w-9 text-primary" />
            <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-[oklch(0.62_0.16_150)]">✓</span> {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Talk to a loan officer</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
