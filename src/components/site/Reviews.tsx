import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    body: "Closed in 21 days. The team kept me updated daily and got me a rate 0.5% lower than my bank quoted.",
  },
  {
    name: "James & Priya R.",
    location: "Dallas, TX",
    rating: 5,
    body: "First-time buyers and they walked us through every step. No hidden fees, no surprises at closing.",
  },
  {
    name: "Marcus T.",
    location: "Houston, TX",
    rating: 5,
    body: "Refinanced and dropped my payment by $340/mo. Process took less than a month start to finish.",
  },
];

export function Reviews() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-[oklch(0.84_0.13_75)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <h2 className="mt-3 text-3xl font-bold">Rated 4.9 / 5 by 1,200+ Borrowers</h2>
          <p className="mt-2 text-muted-foreground">Real reviews from homeowners across the US.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} className="p-6">
              <div className="flex gap-0.5 text-[oklch(0.84_0.13_75)]">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-foreground/90">"{r.body}"</p>
              <div className="mt-4 text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.location}</div>
            </Card>
          ))}
        </div>
      </div>
      {/* AggregateRating JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Ensure Home Loans",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1200",
            },
          }),
        }}
      />
    </section>
  );
}