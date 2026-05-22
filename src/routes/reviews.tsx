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

// Real Google reviews sourced from Google Maps / Ensure Home Loans LLC public profile.
const REVIEWS = [
  { name: "Manas Bagde", source: "Google", rating: 5, body: "Knowledgeable on the Texas property taxes and loan process. He was always available for the customers and responsive. Closed the loan on the promised date. Highly recommend if anyone is looking for a mortgage loan or to refinance." },
  { name: "Venugopal Valiveti", source: "Google", rating: 5, body: "I would like to sincerely thank Satish at Ensure Home Loans for handling my house refinance process so smoothly. From start to finish, he managed everything professionally and guided me through every obstacle with patience and clarity. His constant follow-up, timely communication, and dedication made the entire process stress-free." },
  { name: "Neha Singhal", source: "Google", rating: 5, body: "A huge thank you to Nizar for helping us navigate this journey. We were working with some very tight deadlines, and despite the pressure, he made sure everything was completed exactly when it needed to be. We really appreciated his dedication to getting us across the finish line on time." },
  { name: "Rajesh Chavva", source: "Google", rating: 5, body: "We had a very good experience with Loan Officer Banarasi Thippa. He helped us understand each stage of the process and was active in communication all the time." },
  { name: "Santosh M.", source: "Google", rating: 5, body: "The entire mortgage process was handled with exceptional professionalism, transparency, and efficiency from start to finish. Communication was outstanding throughout, with every question answered promptly. Their expertise and commitment to customer satisfaction truly exceeded our expectations." },
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
        <p className="mt-2 text-sm text-muted-foreground">4.9 average from 840+ verified Google reviews</p>
      </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, idx) => (
          <Reveal key={r.name} delay={idx * 70}>
          <Card className="hover-lift flex h-full flex-col p-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">"{r.body}"</p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground">via {r.source}</p>
            </div>
          </Card>
          </Reveal>
        ))}
      </div>
      <div className="animated-bg mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
        <h2 className="text-2xl font-bold">Join 840+ Happy Homeowners</h2>
        <p className="mt-2 text-white/80">Get pre-qualified in 5 minutes. Soft credit pull, no obligation.</p>
        <Button asChild size="lg" variant="secondary" className="glow-on-hover mt-4"><Link to="/get-prequalified">Get Pre-Qualified</Link></Button>
      </div>
    </div>
  );
}