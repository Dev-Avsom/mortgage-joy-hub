import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/site/ThemeSwitcher";
import logoBlue from "@/assets/logo-blue.png";
import logoBrown from "@/assets/logo-brown.png";

type NavLeaf = { to: string; label: string; params?: Record<string, string> };
type NavGroup = { label: string; to?: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const isGroup = (n: NavItem): n is NavGroup => "children" in n;

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  {
    label: "About",
    to: "/about",
    children: [
      { to: "/about", label: "Our Company" },
      { to: "/loan-officers", label: "Our Team" },
      { to: "/reviews", label: "Reviews" },
      { to: "/licenses", label: "Licenses" },
    ],
  },
  {
    label: "Loan Programs",
    to: "/loan-programs",
    children: [
      { to: "/loan-programs/$slug", params: { slug: "conventional" }, label: "Conventional" },
      { to: "/loan-programs/$slug", params: { slug: "fha" }, label: "FHA" },
      { to: "/loan-programs/$slug", params: { slug: "va" }, label: "VA" },
      { to: "/loan-programs/$slug", params: { slug: "jumbo" }, label: "Jumbo" },
      { to: "/loan-programs/$slug", params: { slug: "usda" }, label: "USDA" },
      { to: "/loan-programs/$slug", params: { slug: "dscr" }, label: "DSCR" },
      { to: "/loan-programs/$slug", params: { slug: "bank-statement" }, label: "Bank Statement" },
      { to: "/loan-programs/$slug", params: { slug: "heloc" }, label: "HELOC" },
    ],
  },
  {
    label: "Resources",
    children: [
      { to: "/process", label: "How It Works" },
      { to: "/calculator", label: "Calculator" },
      { to: "/affordability", label: "Affordability" },
      { to: "/refinance", label: "Refinance" },
      { to: "/learn", label: "Learning Center" },
      { to: "/faq", label: "FAQ" },
      { to: "/documents", label: "Documents Checklist" },
    ],
  },
  {
    label: "Partners",
    children: [
      { to: "/find-officer", label: "Find a Loan Officer" },
      { to: "/join", label: "Join as MLO" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <img src={logoBlue} alt={siteConfig.brand} className="brand-logo-blue h-14 w-auto md:h-16" />
          <img src={logoBrown} alt={siteConfig.brand} className="brand-logo-brown h-14 w-auto md:h-16" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) =>
            isGroup(n) ? (
              <div key={n.label} className="group relative">
                <button
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                  type="button"
                >
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-md border border-border bg-popover p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {n.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="block rounded-sm px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                      activeProps={{ className: "bg-secondary text-primary" }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher compact />
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
          <Button asChild size="sm">
            <Link to="/get-prequalified">Apply Now</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher compact />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) =>
              isGroup(n) ? (
                <div key={n.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setOpenGroup((g) => (g === n.label ? null : n.label))}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  >
                    {n.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openGroup === n.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openGroup === n.label && (
                    <div className="ml-3 flex flex-col border-l border-border pl-2">
                      {n.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-primary"
                          activeProps={{ className: "bg-secondary text-primary" }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                >
                  {n.label}
                </Link>
              ),
            )}
            <Link
              to="/get-prequalified"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
