'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp, fadeIn, slideInLeft, slideInRight, scaleIn, imageReveal, staggerContainer, staggerFast, viewportOnce } from '@/lib/nexora-animations';

type Direction = 'up' | 'in' | 'left' | 'right' | 'scale' | 'image';

const map: Record<Direction, Variants> = {
  up: fadeUp,
  in: fadeIn,
  left: slideInLeft,
  right: slideInRight,
  scale: scaleIn,
  image: imageReveal,
};

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  variant?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={map[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  fast = false,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
  as?: 'div' | 'section' | 'ul';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
