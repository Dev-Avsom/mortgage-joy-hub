interface Props {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
}

export function GradientOrb({ className = "", color = "var(--primary-glow, var(--primary))", size = 420, delay = 0 }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-50 animate-blob ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}