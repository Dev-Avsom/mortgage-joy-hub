import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Clock, FileCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agent Partners — Ensure Home Loans" },
      { name: "description", content: "Real estate agent partner program. Fast pre-approvals, on-time closings, dedicated MLO support for your clients." },
      { property: "og:title", content: "Agent Partner Program" },
      { property: "og:description", content: "Win more deals with same-day pre-approvals and on-time closings." },
    ],
  }),
  component: Agents,
});

const perks = [
  { icon: Clock, title: "Same-day pre-approvals", body: "Quick, reliable letters so your buyers can write competitive offers fast." },
  { icon: FileCheck, title: "On-time closings", body: "Clear-to-close in 14–21 days on most loans. We hit the dates we promise." },
  { icon: Handshake, title: "Dedicated MLO", body: "One point of contact for you and your client — not a call center." },
];

function Agents() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Agent Partner Program</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Partner with Ensure Home Loans and give your clients a smoother path to closing. Faster
        approvals, real communication, and on-time funding.
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
          <h3 className="text-lg font-semibold">Become a partner agent</h3>
          <p className="text-sm text-muted-foreground">We'll match you with an MLO in your market.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild><Link to="/contact">Get in touch</Link></Button>
          <Button asChild variant="outline"><a href={`mailto:${siteConfig.email}?subject=Agent partner inquiry`}>Email us</a></Button>
        </div>
      </Card>
    </div>
  );
}
