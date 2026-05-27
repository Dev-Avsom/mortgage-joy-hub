import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/site/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoBlue from "@/assets/logo-blue.png";
import logoBrown from "@/assets/logo-brown.png";

type NavLeaf = { to: string; label: string; params?: Record<string, string> };
type NavGroup = { label: string; to?: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const isGroup = (n: NavItem): n is NavGroup => "children" in n;

export function Header() {
  const { t } = useTranslation();
  const nav: NavItem[] = [
    { to: "/", label: t("nav.home") },
    {
      label: t("nav.about"),
      to: "/about",
      children: [
        { to: "/about", label: t("nav.ourCompany") },
        { to: "/loan-officers", label: t("nav.ourTeam") },
        { to: "/reviews", label: t("nav.reviews") },
        { to: "/licenses", label: t("nav.licenses") },
      ],
    },
    {
      label: t("nav.loanPrograms"),
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
      label: t("nav.resources"),
      children: [
        { to: "/process", label: t("nav.howItWorks") },
        { to: "/calculator", label: t("nav.calculator") },
        { to: "/affordability", label: t("nav.affordability") },
        { to: "/refinance", label: t("nav.refinance") },
        { to: "/learn", label: t("nav.learningCenter") },
        { to: "/faq", label: t("nav.faq") },
        { to: "/documents", label: t("nav.documentsChecklist") },
      ],
    },
    {
      label: t("nav.partners"),
      children: [
        { to: "/find-officer", label: t("nav.findOfficer") },
        { to: "/join", label: t("nav.joinAsMLO") },
      ],
    },
    { to: "/contact", label: t("nav.contact") },
  ];
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <img src={logoBlue} alt={siteConfig.brand} className="brand-logo-blue h-14 w-auto md:h-16" />
          <img src={logoBrown} alt={siteConfig.brand} className="brand-logo-brown h-14 w-auto md:h-16" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((n) =>
            isGroup(n) ? (
              <DropdownMenu key={n.label}>
                <DropdownMenuTrigger
                  className="group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus:outline-none data-[state=open]:text-primary"
                >
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[220px]">
                  {n.children.map((c) => (
                    <DropdownMenuItem key={c.label} asChild>
                      <Link
                        to={c.to}
                        params={c.params as never}
                        className="block w-full cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                        activeProps={{ className: "bg-secondary text-primary" }}
                      >
                        {c.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher compact />
          <ThemeSwitcher compact />
          <Button asChild variant="outline" size="sm">
            <a href={siteConfig.phoneHref}>
              <Phone className="mr-1 h-4 w-4" /> {t("common.call")}
            </a>
          </Button>
          <Button asChild size="sm" className="bg-[oklch(0.62_0.16_150)] text-white hover:opacity-90">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> {t("common.whatsapp")}
            </a>
          </Button>
          <Button asChild size="sm">
            <Link to="/get-prequalified">{t("common.applyNow")}</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher compact />
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
        <div className="border-t border-border bg-background xl:hidden">
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
                          key={c.label}
                          to={c.to}
                          params={c.params as never}
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
              {t("common.applyNow")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
