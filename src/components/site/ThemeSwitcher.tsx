import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type BrandTheme = "brown" | "blue";
const STORAGE_KEY = "brand-theme";

function applyTheme(t: BrandTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", t);
  const href = t === "brown" ? "/favicon-brown.png" : "/favicon.png";
  document.querySelectorAll<HTMLLinkElement>(
    'link[rel="icon"], link[rel="apple-touch-icon"]'
  ).forEach((el) => {
    if (el.type === "image/x-icon") return; // skip .ico
    el.href = href;
  });
}

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<BrandTheme>("brown");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as BrandTheme | null) ?? "brown";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function pick(t: BrandTheme) {
    setTheme(t);
    localStorage.setItem(STORAGE_KEY, t);
    applyTheme(t);
  }

  const swatch = (t: BrandTheme) => (t === "brown" ? "oklch(0.62 0.15 45)" : "oklch(0.42 0.13 255)");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={compact ? "icon" : "sm"} aria-label="Change brand color">
          <Palette className="h-4 w-4" />
          {!compact && <span className="ml-1">Theme</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Brand color preview</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["brown", "blue"] as BrandTheme[]).map((t) => (
          <DropdownMenuItem key={t} onClick={() => pick(t)} className="cursor-pointer">
            <span className="mr-2 inline-block h-4 w-4 rounded-full border border-border" style={{ background: swatch(t) }} />
            <span className="capitalize">{t}</span>
            {theme === t && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <p className="px-2 py-1 text-[11px] text-muted-foreground">Preview only — saved to this device.</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}