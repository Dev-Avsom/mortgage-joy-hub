import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcRefi, usd, usd2 } from "@/lib/mortgage";
import { TrendingDown, ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/refinance")({
  head: () => ({
    meta: [
      { title: "Refinance Calculator — HomeBridge Mortgage" },
      { name: "description", content: "Should you refinance? See your new monthly payment, breakeven point, and lifetime savings." },
      { property: "og:title", content: "Refinance Calculator" },
      { property: "og:description", content: "Compare your current mortgage to a refi. See breakeven and lifetime savings." },
    ],
  }),
  component: RefiPage,
});

function RefiPage() {
  const [bal, setBal] = useState(320000);
  const [curRate, setCurRate] = useState(7.25);
  const [curMonths, setCurMonths] = useState(312); // ~26 years left
  const [newRate, setNewRate] = useState(6.0);
  const [newTerm, setNewTerm] = useState(30);
  const [closing, setClosing] = useState(4500);

  const r = useMemo(
    () => calcRefi({
      currentBalance: bal,
      currentRate: curRate,
      currentMonthsLeft: curMonths,
      newRate,
      newTermYears: newTerm,
      closingCosts: closing,
    }),
    [bal, curRate, curMonths, newRate, newTerm, closing],
  );

  const worthIt = r.monthlySavings > 0 && Number.isFinite(r.breakevenMonths) && r.breakevenMonths < 60;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Refinance calculator</h1>
        <p className="mt-2 text-muted-foreground">
          See if refinancing makes sense — including breakeven and lifetime savings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-5 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Your current loan</h3>
          <Field label="Remaining balance" prefix="$" value={bal} onChange={setBal} step={1000} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Current rate" suffix="%" value={curRate} onChange={setCurRate} step={0.125} />
            <Field label="Months left" value={curMonths} onChange={setCurMonths} step={12} />
          </div>

          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">New loan</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="New rate" suffix="%" value={newRate} onChange={setNewRate} step={0.125} />
            <Field label="New term (yrs)" value={newTerm} onChange={setNewTerm} step={5} />
          </div>
          <Field label="Estimated closing costs" prefix="$" value={closing} onChange={setClosing} step={250} />
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="p-6 text-white" style={{ background: "var(--gradient-hero)" }}>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <TrendingDown className="h-4 w-4" /> Estimated monthly savings
              </div>
              <div className="mt-1 text-4xl font-bold md:text-5xl">
                {r.monthlySavings > 0 ? usd2(r.monthlySavings) : "—"}
              </div>
              <div className="mt-2 text-sm opacity-80">
                New payment {usd2(r.newPayment)} vs. current {usd2(r.currentPayment)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
              <Stat
                label="Breakeven"
                value={Number.isFinite(r.breakevenMonths) ? `${r.breakevenMonths} mo` : "Never"}
                icon={<Calendar className="h-4 w-4" />}
              />
              <Stat label="Lifetime savings" value={r.lifetimeSavings > 0 ? usd(r.lifetimeSavings) : usd(0)} />
              <Stat label="Closing costs" value={usd(closing)} />
            </div>
            <div className="border-t border-border bg-secondary/30 p-6">
              <p className={`text-sm font-medium ${worthIt ? "text-[oklch(0.42_0.13_150)]" : "text-foreground/80"}`}>
                {worthIt
                  ? `✓ Refinancing looks worthwhile — you'll recoup closing costs in about ${r.breakevenMonths} months.`
                  : r.monthlySavings > 0
                  ? `Breakeven is over 5 years — only worthwhile if you'll stay in the home long-term.`
                  : `New rate doesn't lower your payment with this term.`}
              </p>
              <Button asChild size="lg" className="mt-4 w-full">
                <Link to="/get-prequalified">
                  Lock in a refi quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={prefix ? "pl-7" : suffix ? "pr-8" : ""}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
        {icon}{label}
      </div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}