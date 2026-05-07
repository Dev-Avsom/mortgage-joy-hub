import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

interface Props {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ to, duration = 1500, prefix = "", suffix = "", decimals = 0, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(eased * to);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}