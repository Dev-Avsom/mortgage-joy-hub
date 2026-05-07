import { TrendingDown } from "lucide-react";

const RATES = [
  { label: "30-yr Fixed", rate: "6.49%", apr: "6.62% APR" },
  { label: "15-yr Fixed", rate: "5.74%", apr: "5.92% APR" },
  { label: "FHA 30-yr", rate: "6.12%", apr: "6.41% APR" },
];

export function RateCardsFloating() {
  return (
    <div className="relative h-[420px] w-full">
      {RATES.map((r, i) => (
        <div
          key={r.label}
          className="glass absolute w-64 rounded-2xl p-5 shadow-[var(--shadow-elegant)] animate-float"
          style={{
            top: `${i * 110}px`,
            left: i % 2 === 0 ? "0" : "auto",
            right: i % 2 === 1 ? "0" : "auto",
            animationDelay: `${i * 0.6}s`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{r.label}</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.62_0.16_150)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.62_0.16_150)]" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{r.rate}</span>
            <TrendingDown className="h-4 w-4 text-[oklch(0.62_0.16_150)]" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{r.apr}</p>
        </div>
      ))}
    </div>
  );
}