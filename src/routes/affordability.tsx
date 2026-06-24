import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcAffordability, usd, usd2 } from "@/lib/mortgage";
import { Home as HomeIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/affordability")({
  head: () => ({
    meta: [
      { title: "How Much House Can I Afford? — Ensure Home Loans" },
      { name: "description", content: "Free affordability calculator. See your maximum home price based on income, debts, and down payment." },
      { property: "og:title", content: "How Much House Can I Afford?" },
      { property: "og:description", content: "Calculate your max home price using the 28/36 DTI rule." },
    ],
  }),
  component: AffordabilityPage,
});

function AffordabilityPage() {
  const [income, setIncome] = useState(120000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);

  const r = useMemo(
    () => calcAffordability({ annualIncome: income, monthlyDebts: debts, rate, termYears: term, downPayment: down }),
    [income, debts, down, rate, term],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">How Much House Can I Afford?</h1>
        <p className="mt-2 text-muted-foreground">
          Based on the 28/36 debt-to-income rule used by most US lenders.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-4 p-6">
          <Field label="Annual household income" prefix="$" value={income} onChange={setIncome} step={1000} />
          <Field label="Monthly debt payments (cars, student loans, cards)" prefix="$" value={debts} onChange={setDebts} step={50} />
          <Field label="Down payment available" prefix="$" value={down} onChange={setDown} step={500} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
            <Field label="Term (years)" value={term} onChange={setTerm} step={5} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="p-6 text-white" style={{ background: "var(--gradient-hero)" }}>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <HomeIcon className="h-4 w-4" /> You can afford a home up to
              </div>
              <div className="mt-1 text-4xl font-bold md:text-5xl">{usd(r.maxPrice)}</div>
              <div className="mt-2 text-sm opacity-80">
                With a monthly housing payment of about {usd2(r.monthlyTotal)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
              <Stat label="Loan amount" value={usd(r.loanAmount)} />
              <Stat label="P&I" value={usd2(r.monthlyPI)} />
              <Stat label="Tax (est.)" value={usd2(r.monthlyTax)} />
              <Stat label="Insurance" value={usd2(r.monthlyIns)} />
            </div>
            <div className="border-t border-border p-6">
              <Button asChild size="lg" className="w-full">
                <Link to="/get-prequalified">
                  Get Pre-Qualified <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 text-sm text-muted-foreground">
            <strong className="text-foreground">How we calculate this:</strong> We use the 36% back-end DTI ratio
            (total monthly debts including housing should not exceed 36% of gross income). Property tax is
            estimated at 1.1% of home value, insurance at 0.4%. Your actual rates and qualification depend on
            credit, location, and full underwriting.
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, step = 1, prefix, suffix,
}: { label: string; value: number; onChange: (v: number) => void; step?: number; prefix?: string; suffix?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <Input
          type="number"
          step={step}
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Number(e.target.value.replace(/^0+(?=\d)/, "")) || 0)}
          className={prefix ? "pl-7" : suffix ? "pr-8" : ""}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}