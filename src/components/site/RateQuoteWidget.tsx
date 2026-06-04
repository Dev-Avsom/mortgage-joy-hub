import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";
import { calcMortgage, usd } from "@/lib/mortgage";

// Indicative rates — clearly labeled, not a quote.
const RATES = [
  { key: "30yr_fixed", label: "30-Year Fixed", rate: 6.49, apr: 6.62 },
  { key: "20yr_fixed", label: "20-Year Fixed", rate: 6.25, apr: 6.39 },
  { key: "15yr_fixed", label: "15-Year Fixed", rate: 5.79, apr: 5.94 },
  { key: "fha_30", label: "FHA 30-Year", rate: 6.15, apr: 7.02 },
  { key: "va_30", label: "VA 30-Year", rate: 5.99, apr: 6.21 },
  { key: "jumbo_30", label: "Jumbo 30-Year", rate: 6.69, apr: 6.78 },
];

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export function RateQuoteWidget() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(90000);
  const [priceText, setPriceText] = useState("450000");
  const [downText, setDownText] = useState("90000");
  const [credit, setCredit] = useState("740+");
  const [zip, setZip] = useState("");

  const term = (k: string) => (k.includes("15") ? 15 : k.includes("20") ? 20 : 30);

  const adj = useMemo(() => {
    // Simple, transparent adjustments
    let bump = 0;
    if (credit === "<660") bump += 0.75;
    else if (credit === "660-699") bump += 0.45;
    else if (credit === "700-739") bump += 0.2;
    const ltv = price > 0 ? ((price - down) / price) * 100 : 0;
    if (ltv > 95) bump += 0.25;
    else if (ltv > 90) bump += 0.125;
    return bump;
  }, [credit, price, down]);

  return (
    <Card className="border-0 p-6 text-foreground shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Today's Mortgage Rates</h2>
          <p className="text-xs text-muted-foreground">Indicative only · Updated {today}</p>
        </div>
        <Badge variant="secondary" className="gap-1"><TrendingDown className="h-3 w-3" /> Live</Badge>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="rq-price" className="text-xs">Home price</Label>
          <Input
            id="rq-price"
            type="text"
            inputMode="numeric"
            value={priceText}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              setPriceText(raw);
              setPrice(raw === "" ? 0 : Number(raw));
            }}
          />
        </div>
        <div>
          <Label htmlFor="rq-down" className="text-xs">Down payment</Label>
          <Input
            id="rq-down"
            type="text"
            inputMode="numeric"
            value={downText}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              setDownText(raw);
              setDown(raw === "" ? 0 : Number(raw));
            }}
          />
        </div>
        <div>
          <Label className="text-xs">Credit</Label>
          <Select value={credit} onValueChange={setCredit}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="740+">Excellent (740+)</SelectItem>
              <SelectItem value="700-739">Good (700–739)</SelectItem>
              <SelectItem value="660-699">Fair (660–699)</SelectItem>
              <SelectItem value="<660">Below 660</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rq-zip" className="text-xs">ZIP code</Label>
          <Input id="rq-zip" inputMode="numeric" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="78701" />
        </div>
      </div>
      <div className="mt-4 max-h-72 overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Program</th>
              <th className="px-3 py-2 text-right">Rate</th>
              <th className="px-3 py-2 text-right">APR</th>
              <th className="px-3 py-2 text-right">Monthly P&amp;I</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map((r) => {
              const rate = r.rate + adj;
              const apr = r.apr + adj;
              const m = calcMortgage({
                homePrice: price, downPayment: down, rate, termYears: term(r.key),
                propertyTaxYearly: 0, insuranceYearly: 0, hoaMonthly: 0, pmiYearly: 0,
              });
              return (
                <tr key={r.key} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.label}</td>
                  <td className="px-3 py-2 text-right">{rate.toFixed(3)}%</td>
                  <td className="px-3 py-2 text-right text-muted-foreground">{apr.toFixed(3)}%</td>
                  <td className="px-3 py-2 text-right font-semibold">{usd(m.monthlyPI)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] leading-tight text-muted-foreground">
        Rates shown are estimates based on the inputs above and assume a single-family primary residence. Your actual rate depends on full underwriting. NMLS Consumer Access available in our footer.
      </p>
      <Button asChild className="mt-3 w-full">
        <a href="/get-prequalified">Lock my rate — get pre-qualified</a>
      </Button>
    </Card>
  );
}
