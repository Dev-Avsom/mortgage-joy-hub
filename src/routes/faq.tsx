import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Mortgage FAQ — HomeBridge Mortgage" },
      { name: "description", content: "Answers to common questions about mortgages, rates, pre-qualification, closing costs, and the loan process." },
      { property: "og:title", content: "Mortgage FAQ — HomeBridge Mortgage" },
      { property: "og:description", content: "Answers to common mortgage questions." },
    ],
  }),
  component: FAQPage,
});

const SECTIONS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Getting started",
    items: [
      { q: "What's the difference between pre-qualified and pre-approved?", a: "Pre-qualification is a quick estimate based on the info you share. Pre-approval is a verified review of your credit, income, and assets — sellers take it much more seriously." },
      { q: "How much down payment do I need?", a: "As little as 0% with VA or USDA, 3% with conventional, or 3.5% with FHA. We'll show you every option side by side." },
      { q: "Will checking rates hurt my credit?", a: "No. Our pre-qualification uses a soft pull — no impact to your score." },
      { q: "How long does it take to close?", a: "Most purchase loans close in 21–30 days. Refinances typically take 30–45 days." },
    ],
  },
  {
    title: "Rates & costs",
    items: [
      { q: "What determines my interest rate?", a: "Credit score, loan-to-value, loan type, property type, occupancy, and current market conditions all factor in." },
      { q: "What are typical closing costs?", a: "Closing costs usually run 2–5% of the loan amount. We provide a Loan Estimate within 3 business days of application." },
      { q: "Can I lock my rate?", a: "Yes — we offer 30, 45, 60, and 90-day rate locks, plus float-down options on most programs." },
      { q: "Do you charge lender fees?", a: "Our pricing is transparent and competitive. You'll see every fee on your Loan Estimate before committing." },
    ],
  },
  {
    title: "Process & documents",
    items: [
      { q: "What documents will I need?", a: "Typically: 2 years W-2s or tax returns, 30 days of pay stubs, 2 months of bank statements, and ID. Self-employed borrowers may need additional business documents." },
      { q: "Do I need a real estate agent first?", a: "Not at all. Many buyers get pre-approved first to know their budget, then shop." },
      { q: "Can I use gift funds for my down payment?", a: "Yes — most loan programs allow gift funds from family members with a simple gift letter." },
    ],
  },
  {
    title: "Refinancing",
    items: [
      { q: "When does refinancing make sense?", a: "Generally when you can lower your rate by 0.5–0.75%, shorten your term, eliminate PMI, or tap equity for a major need." },
      { q: "What's a cash-out refinance?", a: "It replaces your current loan with a larger one and gives you the difference in cash — useful for renovations or debt consolidation." },
    ],
  },
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
      <p className="mt-2 text-muted-foreground">Quick answers to the questions we hear most.</p>
      <div className="mt-8 space-y-8">
        {SECTIONS.map((s) => (
          <Card key={s.title} className="p-6">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <Accordion type="single" collapsible className="mt-3">
              {s.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${s.title}-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>
      <div className="mt-10 rounded-2xl p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Still Have Questions?</h2>
        <p className="mt-2 text-white/80">Talk to a licensed loan officer — no pressure, no obligation.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="secondary"><Link to="/contact">Contact us</Link></Button>
          <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
        </div>
      </div>
    </div>
  );
}