import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticle } from "@/lib/articles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article not found" }] };
    return {
      meta: [
        { title: `${a.title} — HomeBridge Mortgage` },
        { name: "description", content: a.description },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/learn">Back to Learning Center</Link></Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Couldn't load article</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  // Render markdown-ish (## headings + paragraphs)
  const blocks = article.body.split("\n\n").map((b, i) => {
    if (b.startsWith("## ")) {
      return <h2 key={i} className="mt-8 text-2xl font-bold">{b.replace(/^##\s+/, "")}</h2>;
    }
    if (b.startsWith("- ")) {
      const items = b.split("\n").map((l) => l.replace(/^-\s+/, ""));
      return (
        <ul key={i} className="my-4 list-disc space-y-1 pl-6 text-foreground/85">
          {items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />)}
        </ul>
      );
    }
    return <p key={i} className="my-4 leading-relaxed text-foreground/85" dangerouslySetInnerHTML={{ __html: renderInline(b) }} />;
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/learn" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Learning Center
      </Link>

      <div className="mt-6">
        <div className="text-xs font-medium uppercase tracking-wide text-primary">{article.category}</div>
        <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
          <span>·</span>
          <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      <div className="prose prose-slate mt-8 max-w-none">{blocks}</div>

      {article.faqs && article.faqs.length > 0 && (
        <Card className="mt-12 p-6">
          <h2 className="text-xl font-bold">Frequently asked questions</h2>
          <dl className="mt-4 space-y-4">
            {article.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-sm text-foreground/80">{f.a}</dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: article.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </Card>
      )}

      <div className="mt-12 rounded-2xl p-8 text-white" style={{ background: "var(--gradient-hero)" }}>
        <h3 className="text-2xl font-bold">Ready to take the next step?</h3>
        <p className="mt-2 text-white/85">Get pre-qualified in 60 seconds. No credit pull, no obligation.</p>
        <Button asChild size="lg" className="mt-4 bg-white text-primary hover:bg-white/90">
          <Link to="/get-prequalified">
            Get pre-qualified <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h3 className="text-lg font-semibold">More guides</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {articles.filter((a) => a.slug !== article.slug).slice(0, 2).map((a) => (
            <Link key={a.slug} to="/learn/$slug" params={{ slug: a.slug }} className="group">
              <Card className="p-4 transition group-hover:shadow-[var(--shadow-elegant)]">
                <div className="text-xs font-medium uppercase tracking-wide text-primary">{a.category}</div>
                <div className="mt-1 font-semibold group-hover:text-primary">{a.title}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function renderInline(text: string) {
  // very small subset: **bold**, [link](url), `code`
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code class='rounded bg-secondary px-1 py-0.5 text-sm'>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' class='text-primary hover:underline'>$1</a>");
}