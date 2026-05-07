import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
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

export function StickyCTA() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  // Pick a random agent on mount and rotate every 8s with a fade
  useEffect(() => {
    setIdx(Math.floor(Math.random() * AGENTS.length));
    const rotate = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => {
          let next = Math.floor(Math.random() * AGENTS.length);
          if (next === i) next = (next + 1) % AGENTS.length;
          return next;
        });
        setShow(true);
      }, 320);
    }, 8000);
    return () => clearInterval(rotate);
  }, []);

  const agent = AGENTS[idx];

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-2 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.1)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        {/* Agent profile */}
        <div className="relative shrink-0">
          <img
            key={agent.photo}
            src={agent.photo}
            alt={`${agent.name}, ${agent.title}`}
            width={44}
            height={44}
            loading="lazy"
            className={`h-11 w-11 rounded-full border-2 border-primary/30 object-cover transition-all duration-300 ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[oklch(0.62_0.16_150)] ring-2 ring-background" />
          </span>
        </div>

        {/* Name + status */}
        <div
          className={`min-w-0 flex-1 transition-all duration-300 ${
            show ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <p className="truncate text-sm font-semibold leading-tight">
            {agent.name} · {agent.title}
          </p>
          <p className="text-[11px] text-[oklch(0.55_0.14_150)]">
            Online · replies in {agent.reply}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5">
          <a
            href={siteConfig.phoneHref}
            aria-label="Call now"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition active:scale-95"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="animate-pulse-ring flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.62_0.16_150)] text-white shadow-sm transition active:scale-95"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
