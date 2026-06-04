import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { calcMortgage, usd, usd2 } from "@/lib/mortgage";
import { LeadForm } from "@/components/site/LeadForm";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Download, Calculator as CalcIcon } from "lucide-react";

const schema = z.object({
  price: fallback(z.number().min(10000).max(10000000), 450000).default(450000),
  down: fallback(z.number().min(0).max(10000000), 90000).default(90000),
  rate: fallback(z.number().min(0).max(25), 6.75).default(6.75),
  term: fallback(z.number().int().min(5).max(40), 30).default(30),
  tax: fallback(z.number().min(0).max(200000), 5400).default(5400),
  ins: fallback(z.number().min(0).max(50000), 1800).default(1800),
  hoa: fallback(z.number().min(0).max(5000), 0).default(0),
  pmi: fallback(z.number().min(0).max(5), 0.5).default(0.5),
});

export const Route = createFileRoute("/calculator")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Mortgage Calculator — HomeBridge Mortgage" },
      { name: "description", content: "Calculate your monthly mortgage payment with taxes, insurance, PMI and HOA. See full amortization." },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/calculator" });

  const inputs = {
    homePrice: s.price,
    downPayment: s.down,
    rate: s.rate,
    termYears: s.term,
    propertyTaxYearly: s.tax,
    insuranceYearly: s.ins,
    hoaMonthly: s.hoa,
    pmiYearly: s.pmi,
  };

  const result = useMemo(() => calcMortgage(inputs), [
    s.price, s.down, s.rate, s.term, s.tax, s.ins, s.hoa, s.pmi,
  ]);

  const set = (patch: Partial<typeof s>) =>
    navigate({ search: (prev: typeof s) => ({ ...prev, ...patch }), replace: true });

  const downPct = s.price > 0 ? (s.down / s.price) * 100 : 0;

  const [pdfOpen, setPdfOpen] = useState(false);

  const downloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("HomeBridge Mortgage — Payment Estimate", 14, 18);
    doc.setFontSize(11);
    let y = 30;
    const line = (label: string, val: string) => {
      doc.text(`${label}:`, 14, y);
      doc.text(val, 90, y);
      y += 7;
    };
    line("Home price", usd(s.price));
    line("Down payment", `${usd(s.down)} (${downPct.toFixed(1)}%)`);
    line("Loan amount", usd(result.loanAmount));
    line("Interest rate", `${s.rate.toFixed(3)}%`);
    line("Term", `${s.term} years`);
    y += 4;
    doc.setFont(undefined as never, "bold");
    line("Monthly payment", usd2(result.monthlyTotal));
    doc.setFont(undefined as never, "normal");
    line("  Principal & Interest", usd2(result.monthlyPI));
    line("  Property tax", usd2(result.monthlyTax));
    line("  Insurance", usd2(result.monthlyInsurance));
    line("  HOA", usd2(result.monthlyHOA));
    line("  PMI", usd2(result.monthlyPMI));
    y += 4;
    line("Total interest paid", usd(result.totalInterest));
    line("Payoff date", result.payoffDate);
    doc.save("mortgage-estimate.pdf");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Mortgage Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Adjust the numbers below. Your share-friendly URL updates automatically.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <Card className="space-y-5 p-6">
          <NumberField label="Home price" value={s.price} onChange={(v) => set({ price: v })} step={1000} prefix="$" />
          <div>
            <NumberField label={`Down payment (${downPct.toFixed(1)}%)`} value={s.down} onChange={(v) => set({ down: v })} step={500} prefix="$" />
            <Slider
              className="mt-3"
              value={[Math.min(downPct, 100)]}
              max={50}
              step={0.5}
              onValueChange={([v]) => set({ down: Math.round((v / 100) * s.price) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Interest rate (%)" value={s.rate} onChange={(v) => set({ rate: v })} step={0.125} suffix="%" />
            <SelectField label="Term" value={s.term} onChange={(v) => set({ term: v })} options={[10, 15, 20, 25, 30]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Property tax /yr" value={s.tax} onChange={(v) => set({ tax: v })} step={100} prefix="$" />
            <NumberField label="Insurance /yr" value={s.ins} onChange={(v) => set({ ins: v })} step={50} prefix="$" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="HOA /month" value={s.hoa} onChange={(v) => set({ hoa: v })} step={10} prefix="$" />
            <NumberField label="PMI rate /yr (%)" value={s.pmi} onChange={(v) => set({ pmi: v })} step={0.05} suffix="%" />
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="p-6 text-white" style={{ background: "var(--gradient-hero)" }}>
              <div className="text-sm opacity-80">Estimated monthly payment</div>
              <div className="mt-1 text-4xl font-bold md:text-5xl">{usd2(result.monthlyTotal)}</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
                {[
                  ["P&I", result.monthlyPI],
                  ["Tax", result.monthlyTax],
                  ["Ins.", result.monthlyInsurance],
                  ["HOA", result.monthlyHOA],
                  ["PMI", result.monthlyPMI],
                ].map(([l, v]) => (
                  <div key={l as string} className="rounded-lg bg-white/10 p-2">
                    <div className="text-xs opacity-75">{l}</div>
                    <div className="font-semibold">{usd2(v as number)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
              <Stat label="Loan amount" value={usd(result.loanAmount)} />
              <Stat label="Total interest" value={usd(result.totalInterest)} />
              <Stat label="Payoff" value={result.payoffDate} />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-border p-6 pt-4">
              <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
                <DialogTrigger asChild>
                  <Button><Download className="mr-2 h-4 w-4" /> Download PDF report</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Get your personalized estimate</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">
                    Enter your details and we'll prepare your PDF and have a loan officer reach out.
                  </p>
                  <LeadForm
                    source="calculator"
                    calcInputs={inputs}
                    calcResults={result}
                    submitLabel="Send me the report"
                    onSuccess={() => {
                      downloadPDF();
                      setPdfOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={downloadPDF}>
                <CalcIcon className="mr-2 h-4 w-4" /> Quick PDF
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold">Loan Balance Over Time</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.schedule}>
                  <defs>
                    <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.42 0.13 255)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="oklch(0.42 0.13 255)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 250)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => usd(v)} />
                  <Area type="monotone" dataKey="balance" stroke="oklch(0.28 0.09 255)" fill="url(#bal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label, value, onChange, step = 1, prefix, suffix,
}: { label: string; value: number; onChange: (v: number) => void; step?: number; prefix?: string; suffix?: string }) {
  const [text, setText] = useState<string>(value === 0 ? "" : String(value));
  // Keep local text in sync when value changes externally (e.g. slider, URL).
  const lastValue = useRef(value);
  useEffect(() => {
    if (value !== lastValue.current) {
      lastValue.current = value;
      const parsed = Number(text);
      // Don't overwrite an in-progress empty field.
      if (text !== "" && (!Number.isFinite(parsed) || parsed !== value)) {
        setText(value === 0 ? "" : String(value));
      }
    }
  }, [value, text]);
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        <Input
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, "");
            setText(raw);
            // Only propagate valid numbers; keep field empty without pushing 0
            // (parent schemas may reject 0 and snap the value back).
            if (raw !== "" && raw !== ".") {
              const n = Number(raw);
              if (Number.isFinite(n)) onChange(n);
            }
          }}
          className={prefix ? "pl-7" : suffix ? "pr-8" : ""}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: { label: string; value: number; onChange: (v: number) => void; options: number[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((o) => <option key={o} value={o}>{o} years</option>)}
      </select>
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
