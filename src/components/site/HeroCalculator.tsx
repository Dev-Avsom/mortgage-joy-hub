import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Calculator, FileCheck } from "lucide-react";
import { calcMortgage, usd } from "@/lib/mortgage";

export function HeroCalculator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(90000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const result = useMemo(
    () =>
      calcMortgage({
        homePrice: price,
        downPayment: down,
        rate,
        termYears: term,
        propertyTaxYearly: 0,
        insuranceYearly: 0,
        hoaMonthly: 0,
        pmiYearly: 0,
      }),
    [price, down, rate, term],
  );

  return (
    <Card className="border-0 p-6 text-foreground shadow-2xl">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Mortgage Payment Calculator</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Estimate only. Actual rates, terms, and fees depend on credit profile, loan program, loan amount, property type, occupancy, market conditions, and underwriting approval.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="hc-price" className="text-xs">Home price</Label>
          <Input
            id="hc-price"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="hc-down" className="text-xs">Down payment</Label>
          <Input
            id="hc-down"
            inputMode="numeric"
            value={down}
            onChange={(e) => setDown(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="hc-rate" className="text-xs">Interest rate (%)</Label>
          <Input
            id="hc-rate"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value.replace(/[^0-9.]/g, "")) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="hc-term" className="text-xs">Term (years)</Label>
          <Input
            id="hc-term"
            inputMode="numeric"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value.replace(/[^0-9]/g, "")) || 30)}
          />
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-secondary/60 p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated monthly P&amp;I</p>
        <p className="mt-1 text-3xl font-bold text-primary">{usd(result.monthlyPI)}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Loan amount {usd(result.loanAmount)} · {term}-yr · {rate}%
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button asChild>
          <Link to="/get-prequalified"><FileCheck className="mr-1 h-4 w-4" /> Get Pre-Qualified</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/calculator">Full calculator</Link>
        </Button>
      </div>
    </Card>
  );
}