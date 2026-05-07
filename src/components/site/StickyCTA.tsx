import { Phone, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import agentAvatar from "@/assets/agent-avatar.jpg";

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-2 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.1)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        {/* Agent profile */}
        <div className="relative shrink-0">
          <img
            src={agentAvatar}
            alt="Live loan officer"
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 rounded-full border-2 border-primary/30 object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[oklch(0.62_0.16_150)] ring-2 ring-background" />
          </span>
        </div>

        {/* Name + status */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">Sarah · Loan Officer</p>
          <p className="text-[11px] text-[oklch(0.55_0.14_150)]">Online · replies in ~2 min</p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5">
          <a
            href={siteConfig.phoneHref}
            aria-label="Call now"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition active:scale-95"
          >
            <Phone className="h-4.5 w-4.5" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="animate-pulse-ring flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.62_0.16_150)] text-white shadow-sm transition active:scale-95"
          >
            <MessageCircle className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
