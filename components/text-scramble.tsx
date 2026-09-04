'use client';

import { useEffect, useRef, useState } from 'react';

type TextScrambleProps = {
  text: string;
  className?: string;
  scrambleChars?: string;
  speed?: number;
};

export function TextScramble({
  text,
  className = '',
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  speed = 30,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrambling) {
            startScramble();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startScramble = () => {
    setIsScrambling(true);
    let iteration = 0;
    const len = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayed(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  return (
    <span ref={ref} className={className}>
      {displayed || text.split('').map(() => ' ').join('')}
    </span>
  );
}
