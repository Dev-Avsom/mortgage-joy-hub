import { Phone, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-2 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.1)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={siteConfig.phoneHref}
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse-ring flex items-center justify-center gap-2 rounded-md bg-[oklch(0.62_0.16_150)] px-3 py-2.5 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
