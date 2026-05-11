import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").startsWith("es") ? "es" : "en";

  const setLang = (lng: "en" | "es") => {
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
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={current === "en"}
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
          current === "en"
            ? "bg-primary text-primary-foreground"
            : "text-foreground/70 hover:text-primary"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={current === "es"}
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
          current === "es"
            ? "bg-primary text-primary-foreground"
            : "text-foreground/70 hover:text-primary"
        }`}
      >
        ES
      </button>
    </div>
  );
}
