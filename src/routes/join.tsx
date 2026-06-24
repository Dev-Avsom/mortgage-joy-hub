import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/site/LeadForm";
import { TrendingUp, DollarSign, Users, Sparkles, Award, Headphones } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Our Team — Loan Officer Careers | Ensure Home Loans" },
      { name: "description", content: "Build your mortgage business with Ensure Home Loans — top splits, in-house ops, marketing, and 230+ lender access." },
    ],
  }),
  component: JoinPage,
});

const perks = [
  { icon: DollarSign, title: "Industry-leading splits", body: "Up to 275 BPS comp — keep more of every loan you close." },
  { icon: TrendingUp, title: "230+ wholesale lenders", body: "Beat retail rates and win more deals with broker pricing power." },
  { icon: Headphones, title: "In-house processing", body: "Dedicated processors and underwriting support so you can focus on selling." },
  { icon: Sparkles, title: "Marketing engine", body: "Done-for-you website, CRM, paid ads, and social content." },
  { icon: Users, title: "Mentorship", body: "Weekly coaching from $100M+ producers and a thriving LO community." },
  { icon: Award, title: "Tech that closes deals", body: "Modern POS, e-sign, automated milestones, and borrower portal." },
];

function JoinPage() {
  return (
    <>
      <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">For Loan Officers</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Build Your Mortgage Business — Without Giving Up Your Splits.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Top-tier comp, 230+ lender access, real ops support, and marketing that actually drives leads. Join a brokerage that bets on you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <Card key={p.title} className="p-6">
              <p.icon className="h-9 w-9 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Apply Confidentially</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about your production and goals. A principal will reach out within 24 hours.
          </p>
          <div className="mt-5">
            <LeadForm source="careers" submitLabel="Submit application" />
          </div>
        </Card>
      </section>
    </>
  );
}
