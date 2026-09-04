'use client';

import Image from 'next/image';
import { useState } from 'react';

export function InteractiveImage({ src, alt }: { src: string; alt: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  return (
    <div
      className="interactive-image relative aspect-[4/3] overflow-hidden rounded-3xl shadow-warm-lg"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        setOffset({ x: -x * 18, y: -y * 18 });
        setPointer({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
      }}
      onMouseLeave={() => {
        setOffset({ x: 0, y: 0 });
        setPointer({ x: 50, y: 50 });
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="h-full w-full object-cover transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.08)` }}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle 125px at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.58), transparent 72%)` }}
      />
    </div>
  );
}
