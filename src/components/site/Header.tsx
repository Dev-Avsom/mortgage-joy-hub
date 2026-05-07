import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/calculator", label: "Calculator" },
  { to: "/loan-programs", label: "Loan Programs" },
  { to: "/process", label: "How It Works" },
  { to: "/find-officer", label: "Find an Officer" },
  { to: "/learn", label: "Learn" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            HB
          </span>
          <span className="text-lg leading-tight">{siteConfig.brand}</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={siteConfig.phoneHref}>
              <Phone className="mr-1 h-4 w-4" /> Call
            </a>
          </Button>
          <Button asChild size="sm" className="bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
