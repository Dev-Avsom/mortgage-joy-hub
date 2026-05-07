import { ShieldCheck } from "lucide-react";

export function BestRateBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-[oklch(0.84_0.13_75)]/40 bg-[oklch(0.84_0.13_75)]/15 px-3 py-1 text-xs font-semibold text-[oklch(0.84_0.13_75)] ${className}`}>
      <ShieldCheck className="h-3.5 w-3.5" />
      Best Rate Guarantee — $1,000 if we can't beat it
    </div>
  );
}
