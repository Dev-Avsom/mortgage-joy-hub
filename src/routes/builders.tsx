import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Wrench, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/builders")({
  head: () => ({
    meta: [
      { title: "Builder Partners — Ensure Home Loans" },
      { name: "description", content: "Builder partner program: extended rate locks, construction-to-perm financing, and on-site MLO support for your buyers." },
      { property: "og:title", content: "Builder Partner Program" },
      { property: "og:description", content: "Extended locks, new-construction expertise, and dedicated MLO support." },
    ],
  }),
  component: Builders,
});

const perks = [
  { icon: BadgeCheck, title: "Extended rate locks", body: "Up to 360-day locks for new construction so buyers stay confident through build." },
  { icon: Wrench, title: "Construction-to-perm", body: "Single-close construction financing that converts to a permanent mortgage." },
  { icon: Building2, title: "Dedicated MLO", body: "On-site availability for sales centers and joint marketing programs." },
];

function Builders() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Builder Partner Program</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Built for production builders and custom builders alike. We help your buyers lock with
        confidence and close on time, every time.
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

      <Card className="mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold">Partner with us</h3>
          <p className="text-sm text-muted-foreground">Let's discuss a program tailored to your communities.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild><Link to="/contact">Get in touch</Link></Button>
          <Button asChild variant="outline"><a href={`mailto:${siteConfig.email}?subject=Builder partner inquiry`}>Email us</a></Button>
        </div>
      </Card>
    </div>
  );
}
