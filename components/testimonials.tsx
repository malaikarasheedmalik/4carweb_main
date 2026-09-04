'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { fadeUp, viewportOnce } from '@/lib/animations';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? 'h-4 w-4 fill-terracotta text-terracotta' : 'h-4 w-4 text-beige-dark'}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const perView = 3;
  const maxIndex = Math.max(0, total - perView);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <div>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `calc(${-index * (100 / perView)}% - ${index * 24 / perView}px)` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative flex w-full shrink-0 flex-col rounded-2xl border border-beige bg-offwhite p-6 shadow-warm transition-all duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-warm-lg md:w-[calc(33.333%-1rem)]"
            >
              <Quote className="h-7 w-7 text-terracotta/40" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-warmgray">
                "{t.quote}"
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-beige pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy font-display text-sm font-bold text-offwhite">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-burgundy">{t.name}</p>
                  <p className="text-xs text-warmgray">{t.vehicle}</p>
                  <Stars rating={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-beige bg-offwhite text-burgundy transition-all hover:border-terracotta hover:text-terracotta disabled:opacity-40"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? 'h-2 w-6 rounded-full bg-terracotta'
                  : 'h-2 w-2 rounded-full bg-beige-dark transition-colors hover:bg-terracotta/60'
              }
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={index >= maxIndex}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-beige bg-offwhite text-burgundy transition-all hover:border-terracotta hover:text-terracotta disabled:opacity-40"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function TestimonialsGrid() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {testimonials.map((t) => (
        <motion.div
          key={t.name}
          variants={fadeUp}
          className="group h-[300px] [perspective:1200px]"
        >
          <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 flex flex-col rounded-2xl border border-beige bg-offwhite p-6 shadow-warm [backface-visibility:hidden]">
              <Quote className="h-7 w-7 text-terracotta/40" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-warmgray">&quot;{t.quote}&quot;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-beige pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy font-display text-sm font-bold text-offwhite">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-burgundy">{t.name}</p>
                  <p className="text-xs text-warmgray">{t.vehicle}</p>
                  <Stars rating={t.rating} />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex rotate-y-180 flex-col justify-center rounded-2xl border border-terracotta/30 bg-burgundy p-6 text-offwhite shadow-warm-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-beige">Verified customer</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-beige">{t.vehicle}</p>
              <div className="mt-4"><Stars rating={t.rating} /></div>
              <p className="mt-4 text-sm leading-relaxed text-offwhite/80">{t.quote}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
