import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

type Lang = "en" | "es" | "hi" | "te";
const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "hi", label: "हि" },
  { code: "te", label: "తె" },
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

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-background/60 ${
        compact ? "p-0.5" : "p-1"
      }`}
      role="group"
      aria-label="Language selector"
    >
      <Globe className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={current === code}
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
            current === code
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
