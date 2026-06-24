import { useEffect, useState } from "react";
import { Phone, X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import agent1 from "@/assets/agent-avatar.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";
import agent4 from "@/assets/agent-4.jpg";

const AGENTS = [
  { photo: agent1, name: "Sarah", title: "Senior Loan Officer", reply: "~2 min" },
  { photo: agent2, name: "Diego", title: "Mortgage Advisor", reply: "~3 min" },
  { photo: agent3, name: "Amara", title: "Loan Officer", reply: "~2 min" },
  { photo: agent4, name: "Mark", title: "Branch Manager · NMLS", reply: "~4 min" },
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(7).max(32).regex(/^[+\d().\-\s]+$/),
  best_time: z.string().trim().max(50),
});

function isOnline() {
  const d = new Date();
  return d.getDay() !== 0 && d.getHours() >= 7 && d.getHours() < 21;
}

export function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [agent, setAgent] = useState(AGENTS[0]);
  const [online, setOnline] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setAgent(AGENTS[Math.floor(Math.random() * AGENTS.length)]);
    setOnline(isOnline());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      toast.error("Please agree to the consent terms to proceed.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      best_time: fd.get("best_time") || "Anytime",
    });
    if (!parsed.success) {
      toast.error("Please enter a valid name and phone number.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: "",
      phone: parsed.data.phone,
      message: `Callback request — best time: ${parsed.data.best_time}`,
      source: "callback-widget",
    });
    setSending(false);
    if (error) {
      toast.error("Couldn't submit. Please try the chat or call us directly.");
      return;
    }
    toast.success(`${agent.name} will call you shortly.`);
    (e.target as HTMLFormElement).reset();
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-border bg-background/95 py-2 pl-2 pr-4 shadow-2xl backdrop-blur transition hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
          aria-label="Request a callback"
        >
          <span className="relative">
            <img
              src={agent.photo}
              alt={agent.name}
              className="h-10 w-10 rounded-full border-2 border-primary/30 object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${online ? "animate-ping bg-[oklch(0.7_0.18_150)]" : "bg-amber-400"}`} />
              <span className={`relative inline-flex h-3 w-3 rounded-full ring-2 ring-background ${online ? "bg-[oklch(0.62_0.16_150)]" : "bg-amber-500"}`} />
            </span>
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold leading-tight text-foreground">
              Request a Callback
            </span>
            <span className="block text-[11px] text-[oklch(0.55_0.14_150)]">
              {online ? `${agent.name} is online · Calls back in ${agent.reply}` : "We'll call you next business hour"}
            </span>
          </span>
          <ChevronUp className="ml-1 h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5" />
        </button>
      ) : (
        <div className="w-[340px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-start gap-3 p-4 text-white" style={{ background: "var(--gradient-hero)" }}>
            <img src={agent.photo} alt={agent.name} className="h-12 w-12 shrink-0 rounded-full border-2 border-white/40 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">Get a Call from {agent.name}</p>
              <p className="mt-0.5 text-[11px] text-white/80">{agent.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/80">
                <span className={`h-2 w-2 rounded-full ${online ? "bg-[oklch(0.7_0.18_150)]" : "bg-amber-400"}`} />
                {online ? `Online · Typically calls back in ${agent.reply}` : "Offline · Replies next business hour"}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-2.5 p-4">
            <p className="text-xs text-muted-foreground">
              Free, no-obligation. A licensed loan officer will call your number — usually within minutes.
            </p>
            <div>
              <Label htmlFor="cb-name" className="text-xs">Your Name</Label>
              <Input id="cb-name" name="name" required maxLength={100} className="h-9" placeholder="Jane Smith" />
            </div>
            <div>
              <Label htmlFor="cb-phone" className="text-xs">Phone Number</Label>
              <Input id="cb-phone" name="phone" type="tel" required maxLength={32} className="h-9" placeholder="+1 555 123 4567" />
            </div>
            <div>
              <Label htmlFor="cb-time" className="text-xs">Best Time to Call</Label>
              <select
                id="cb-time"
                name="best_time"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="ASAP"
              >
                <option>ASAP</option>
                <option>Within the hour</option>
                <option>This afternoon</option>
                <option>This evening</option>
                <option>Tomorrow morning</option>
              </select>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="cb-consent"
                checked={consent}
                onCheckedChange={(c) => setConsent(c === true)}
                className="mt-0.5"
              />
              <Label htmlFor="cb-consent" className="cursor-pointer text-[11px] leading-tight text-muted-foreground">
                I agree to the{" "}
                <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>,{" "}
                <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>, and{" "}
                <Link to="/tcpa" className="underline hover:text-foreground">TCPA Consent</Link>.{" "}
                I consent to be contacted by phone and text at the number provided. Message and data rates may apply.
              </Label>
            </div>
            <Button type="submit" disabled={sending || !consent} className="w-full">
              {sending ? "Sending…" : <><Phone className="mr-1.5 h-3.5 w-3.5" /> Request My Callback</>}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="block w-full text-center text-[11px] text-muted-foreground hover:text-foreground"
            >
              No thanks
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
