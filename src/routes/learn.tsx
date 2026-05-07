import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { articles } from "@/lib/articles";
import { BookOpen, Clock } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Center — HomeBridge Mortgage" },
      { name: "description", content: "Free mortgage guides: first-time buyers, FHA vs conventional, when to refinance, and more." },
      { property: "og:title", content: "Mortgage Learning Center" },
      { property: "og:description", content: "Plain-English guides on home loans, refinance, and credit." },
    ],
  }),
  component: LearnIndex,
});

function LearnIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10 flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Learning Center</h1>
          <p className="mt-1 text-muted-foreground">Plain-English guides to help you make smarter mortgage decisions.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.slug} to="/learn/$slug" params={{ slug: a.slug }} className="group">
            <Card className="h-full p-6 transition group-hover:shadow-[var(--shadow-elegant)]">
              <div className="text-xs font-medium uppercase tracking-wide text-primary">{a.category}</div>
              <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {a.readTime}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}