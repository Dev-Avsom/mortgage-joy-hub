import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  gradientWords?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", gradientWords }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const renderTitle = () => {
    if (typeof title === "string" && gradientWords && title.includes(gradientWords)) {
      const [before, after] = title.split(gradientWords);
      return (
        <>
          {before}
          <span className="gradient-text">{gradientWords}</span>
          {after}
        </>
      );
    }
    return title;
  };
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{renderTitle()}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}