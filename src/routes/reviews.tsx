import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — HomeBridge Mortgage" },
      { name: "description", content: "Real reviews from HomeBridge Mortgage clients across the US — purchase, refinance, and first-time buyers." },
      { property: "og:title", content: "Client Reviews — HomeBridge Mortgage" },
      { property: "og:description", content: "5-star reviews from real homeowners." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Marcus & Lena R.", city: "Austin, TX", program: "Conventional 30-yr", rating: 5, body: "Closed in 19 days on our first home. The team made every step feel effortless — we always knew what was happening next. Best decision we made." },
  { name: "Priya S.", city: "Seattle, WA", program: "Jumbo refinance", rating: 5, body: "Saved us $640/mo on our refinance. Their pricing beat two banks we'd been with for years. Real humans answer the phone." },
  { name: "James O.", city: "Tampa, FL", program: "VA purchase", rating: 5, body: "As a Marine, the VA process can be a maze. They handled my COE in a day and got us into our home with zero down. Forever grateful." },
  { name: "The Nguyens", city: "San Jose, CA", program: "FHA first-time buyer", rating: 5, body: "We thought we couldn't afford to buy. They walked us through down payment assistance and made it real. Closed at $14k under what we'd budgeted." },
  { name: "Sarah K.", city: "Denver, CO", program: "Bank statement loan", rating: 5, body: "Self-employed mortgage was always a no from big banks. HomeBridge looked at my actual cash flow and approved us in 2 weeks." },
  { name: "Carlos M.", city: "Phoenix, AZ", program: "DSCR investment", rating: 5, body: "On my 4th rental property with them. DSCR loans close fast, the team gets investor financing, and the rates are sharp." },
  { name: "Anita & Roy P.", city: "Charlotte, NC", program: "Cash-out refinance", rating: 5, body: "Used cash-out to pay off all credit card debt at a much lower rate. Saved us $1,200/mo total. Highly recommend." },
  { name: "Tom B.", city: "Chicago, IL", program: "HELOC", rating: 5, body: "Renovated our kitchen with a HELOC instead of refinancing our 2.9% mortgage. Smart move and the team made it painless." },
  { name: "Maria E.", city: "Miami, FL", program: "Conventional 15-yr", rating: 5, body: "Switched from 30-yr to 15-yr with almost no payment change. Will save us $187k in interest. Wow." },
];

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">What <span className="gradient-text">Clients Say</span></h1>
        <div className="mt-3 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 animate-scale-in" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">4.9 average from 1,200+ verified reviews</p>
      </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, idx) => (
          <Reveal key={r.name + r.city} delay={idx * 70}>
          <Card className="hover-lift flex h-full flex-col p-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">"{r.body}"</p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.city} · {r.program}</p>
            </div>
          </Card>
          </Reveal>
        ))}
      </div>
      <div className="animated-bg mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Join 1,200+ Happy Homeowners</h2>
        <p className="mt-2 text-white/80">Get pre-qualified in 5 minutes. Soft credit pull, no obligation.</p>
        <Button asChild size="lg" variant="secondary" className="glow-on-hover mt-4"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
      </div>
    </div>
  );
}