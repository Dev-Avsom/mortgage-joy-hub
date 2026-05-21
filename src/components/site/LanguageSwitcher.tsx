import { useTranslation } from "react-i18next";
import { Globe, Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Lang = "en" | "es" | "hi" | "te";
const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "es", short: "ES", label: "Español" },
  { code: "hi", short: "हि", label: "हिन्दी" },
  { code: "te", short: "తె", label: "తెలుగు" },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const raw = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
  const current: Lang = raw.startsWith("es") ? "es"
    : raw.startsWith("hi") ? "hi"
    : raw.startsWith("te") ? "te"
    : "en";

  const setLang = (lng: Lang) => {
    i18n.changeLanguage(lng);
    try { localStorage.setItem("site-lang", lng); } catch {}
  };

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Select language"
        className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 font-semibold text-foreground/80 transition hover:text-primary ${
          compact ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs"
        }`}
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{active.short}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LANGS.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLang(code)}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span>{label}</span>
            {current === code ? <Check className="h-3.5 w-3.5 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
