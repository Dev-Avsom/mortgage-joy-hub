import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Ensure Home Loans" },
      { name: "description", content: "Join Ensure Home Loans. Open roles for MLOs, ops, marketing, and tech. Remote-friendly culture." },
      { property: "og:title", content: "Careers at Ensure Home Loans" },
      { property: "og:description", content: "Build your career with a fast-growing mortgage company." },
    ],
  }),
  component: Careers,
});

const perks = [
  { icon: Heart, title: "Health & wellness", body: "Medical, dental, vision, plus mental health support." },
  { icon: TrendingUp, title: "Growth", body: "Learning stipend, mentorship, and clear promotion paths." },
  { icon: Briefcase, title: "Flexible work", body: "Remote-first with optional in-office hubs." },
];

function Careers() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Careers</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        We're building the modern mortgage company. If you love solving real problems for borrowers and
        want to work with a high-trust team, we'd love to meet you.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {perks.map((p) => (
          <Card key={p.title} className="p-5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 p-6">
        <h2 className="text-xl font-semibold">Open roles</h2>
        <p className="mt-2 text-muted-foreground">
          We're always looking for great talent. If you're a licensed MLO, see our partner program.
          For other roles, reach out and we'll be in touch when something opens up.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild><Link to="/join">For MLOs — Join our team</Link></Button>
          <Button asChild variant="outline"><a href={`mailto:${siteConfig.email}?subject=Career inquiry`}>Email us</a></Button>
        </div>
      </Card>
    </div>
  );
}
