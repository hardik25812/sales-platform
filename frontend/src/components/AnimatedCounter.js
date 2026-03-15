import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({ value, prefix = '', suffix = '', duration = 800, decimals = 0, className = '' }) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const animFrame = useRef(null);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const diff = end - start;
    if (Math.abs(diff) < 0.01) { setDisplay(end); return; }
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(start + diff * eased);
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    };

    animFrame.current = requestAnimationFrame(animate);
    prevValue.current = value;

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [value, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function CurrencyCounter({ value, className = '' }) {
  return <AnimatedCounter value={value} prefix="$" className={className} />;
}

export function PercentCounter({ value, className = '', decimals = 0 }) {
  return <AnimatedCounter value={value} suffix="%" decimals={decimals} className={className} />;
}
