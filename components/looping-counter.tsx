'use client';

import { useEffect, useState } from 'react';

export function LoopingCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let started = performance.now();
    const duration = 2400;

    const animate = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      setCount(value * progress);
      if (progress >= 1) {
        started = now;
        setCount(0);
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}
