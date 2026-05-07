import { Star } from "lucide-react";

const QUOTES = [
  { name: "Marcus & Lena", body: "Closed in 19 days on our first home. Effortless." },
  { name: "Priya S.", body: "Saved $640/mo on our refinance. Real humans answer the phone." },
  { name: "James O.", body: "VA loan with zero down. Forever grateful." },
  { name: "The Nguyens", body: "Closed at $14k under what we'd budgeted." },
  { name: "Sarah K.", body: "Self-employed approval in 2 weeks." },
  { name: "Carlos M.", body: "On my 4th DSCR loan with them." },
];

export function TestimonialMarquee() {
  const loop = [...QUOTES, ...QUOTES];
  return (
    <section className="overflow-hidden border-y border-border bg-secondary/30 py-10 marquee-pause">
      <div className="flex w-max marquee-track gap-4">
        {loop.map((q, i) => (
          <div
            key={i}
            className="flex w-[320px] shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 flex-1 text-sm text-foreground/85">"{q.body}"</p>
            <p className="mt-3 text-xs font-semibold text-muted-foreground">— {q.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}