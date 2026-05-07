import { createFileRoute, Link } from "@tanstack/react-router";
import { US_STATES } from "@/lib/states";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/mortgage")({
  head: () => ({
    meta: [
      { title: "Mortgage Loans by State — All 50 States | HomeBridge Mortgage" },
      { name: "description", content: "Compare mortgage rates and loan programs in all 50 US states. Conventional, FHA, VA, and Jumbo loans available nationwide." },
    ],
  }),
  component: StatesIndex,
});

function StatesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Mortgage loans by state</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        We're licensed in all 50 states. Pick yours to see local rates, loan limits, and licensed loan officers near you.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {US_STATES.map((s) => (
          <Link key={s.code} to="/mortgage/$state" params={{ state: s.slug }}>
            <Card className="flex items-center gap-3 p-4 transition hover:border-primary hover:shadow-[var(--shadow-elegant)]">
              <MapPin className="h-5 w-5 flex-none text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">From {s.medianRate.toFixed(2)}%</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
