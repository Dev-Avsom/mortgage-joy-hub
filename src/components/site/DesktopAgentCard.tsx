import { useEffect, useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
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

export function DesktopAgentCard() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * AGENTS.length));
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => {
          let n = Math.floor(Math.random() * AGENTS.length);
          if (n === i) n = (n + 1) % AGENTS.length;
          return n;
        });
        setShow(true);
      }, 320);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;
  const a = AGENTS[idx];

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
      <div className="group relative flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 pr-4 shadow-2xl backdrop-blur transition hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow group-hover:flex hover:text-foreground"
        >
          <X className="h-3 w-3" />
        </button>

        <div className="relative shrink-0">
          <img
            key={a.photo}
            src={a.photo}
            alt={`${a.name}, ${a.title}`}
            width={48}
            height={48}
            className={`h-12 w-12 rounded-full border-2 border-primary/30 object-cover transition-all duration-300 ${
              show ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[oklch(0.62_0.16_150)] ring-2 ring-background" />
          </span>
        </div>

        <div
          className={`min-w-0 transition-all duration-300 ${
            show ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold leading-tight text-foreground">
            {a.name} · {a.title}
          </p>
          <p className="text-[11px] text-[oklch(0.55_0.14_150)]">
            Online · replies in {a.reply}
          </p>
        </div>

        <div className="flex items-center gap-1.5 pl-1">
          <a
            href={siteConfig.phoneHref}
            aria-label="Call now"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:scale-105 active:scale-95"
          >
            <Phone className="h-[16px] w-[16px]" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="animate-pulse-ring flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.62_0.16_150)] text-white shadow-sm transition hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-[16px] w-[16px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
