import { useEffect, useState } from "react";
import { MessageCircle, X, Phone, Send } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { notifySubmission } from "@/lib/notify";
import agent1 from "@/assets/agent-avatar.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";
import agent4 from "@/assets/agent-4.jpg";

const AGENTS = [
  { photo: agent1, name: "our team", title: "Licensed Loan Officer Team", reply: "shortly" },
  { photo: agent2, name: "our team", title: "Licensed Loan Officer Team", reply: "shortly" },
  { photo: agent3, name: "our team", title: "Licensed Loan Officer Team", reply: "shortly" },
  { photo: agent4, name: "our team", title: "Licensed Loan Officer Team", reply: "shortly" },
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(32).regex(/^[+\d().\-\s]+$/, "Invalid phone"),
  message: z.string().trim().min(1).max(2000),
});

function isOnline() {
  // Mon–Sat, 7am–9pm local
  const d = new Date();
  const day = d.getDay();
  const hr = d.getHours();
  return day !== 0 && hr >= 7 && hr < 21;
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agent, setAgent] = useState(AGENTS[0]);

  useEffect(() => {
    setMounted(true);
    setOnline(isOnline());
    setAgent(AGENTS[Math.floor(Math.random() * AGENTS.length)]);
    const t = setInterval(() => setOnline(isOnline()), 60_000);
    return () => clearInterval(t);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error("Please fill all fields with a valid phone & email.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: "live-chat",
    });
    setSending(false);
    if (error) {
      toast.error("Could not send. Try WhatsApp or phone.");
      return;
    }
    void notifySubmission({
      source: "live-chat",
      subject: "New live chat message",
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone,
      },
      message: parsed.data.message,
    });
    toast.success("Sent! A loan officer will reply within 5 minutes.");
    (e.target as HTMLFormElement).reset();
    setOpen(false);
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat with a loan officer"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition hover:scale-105 lg:bottom-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {mounted && !open && online && (
          <span className="absolute right-1 top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[oklch(0.62_0.16_150)] ring-2 ring-background" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-36 right-4 z-40 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl lg:bottom-24">
          <div className="flex items-start gap-3 p-4 text-white" style={{ background: "var(--gradient-hero)" }}>
            <img src={agent.photo} alt={agent.name} className="h-12 w-12 shrink-0 rounded-full border-2 border-white/40 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">Chat With {agent.name}</p>
              <p className="mt-0.5 text-[11px] text-white/80">{agent.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/80">
                <span className={`h-2 w-2 rounded-full ${online ? "bg-[oklch(0.7_0.18_150)]" : "bg-amber-400"}`} />
                {online ? `Online · Typically replies in ${agent.reply}` : "Offline · We'll reply next business hour"}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
          </div>

          <div className="grid grid-cols-2 gap-2 border-b border-border p-3">
            <Button asChild size="sm" variant="outline">
              <a href={siteConfig.phoneHref}><Phone className="mr-1 h-3.5 w-3.5" /> Call</a>
            </Button>
            <Button asChild size="sm" className="bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-3.5 w-3.5" /> WhatsApp
              </a>
            </Button>
          </div>

          <form onSubmit={onSubmit} className="space-y-2.5 p-4">
            <div>
              <Label htmlFor="lc-name" className="text-xs">Name</Label>
              <Input id="lc-name" name="name" required maxLength={100} className="h-9" />
            </div>
            <div>
              <Label htmlFor="lc-email" className="text-xs">Email</Label>
              <Input id="lc-email" name="email" type="email" required maxLength={255} className="h-9" />
            </div>
            <div>
              <Label htmlFor="lc-phone" className="text-xs">Phone</Label>
              <Input id="lc-phone" name="phone" type="tel" required maxLength={32} className="h-9" placeholder="+1 555 123 4567" />
            </div>
            <div>
              <Label htmlFor="lc-msg" className="text-xs">How can we help?</Label>
              <Textarea id="lc-msg" name="message" required rows={3} maxLength={2000} placeholder="e.g. I'm looking to buy a $400k home in Austin…" />
            </div>
            <Button type="submit" disabled={sending} className="w-full">
              {sending ? "Sending…" : <><Send className="mr-1 h-3.5 w-3.5" /> Send message</>}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
