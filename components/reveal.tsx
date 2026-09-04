'use client';

import { motion, type Variants } from 'framer-motion';
import {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
  imageReveal,
  blurReveal,
  flipInX,
  flipInY,
  zoomBounce,
  rotateIn,
  elasticIn,
  spiralIn,
  dramaticReveal,
  textReveal,
  clipReveal,
  maskReveal,
  slideInDown,
  slideInUp,
  staggerContainer,
  staggerFast,
  staggerSlow,
  staggerWave,
  staggerScale,
  staggerFade,
  staggerCard,
  staggerListItem,
  staggerTextLine,
  staggerImageReveal,
  staggerIconPop,
  viewportOnce,
} from '@/lib/animations';

type Direction = 'up' | 'in' | 'left' | 'right' | 'scale' | 'image' | 'blur' | 'flipX' | 'flipY' | 'zoom' | 'rotate' | 'elastic' | 'spiral' | 'dramatic' | 'text' | 'clip' | 'mask' | 'down' | 'slide-up';

const map: Record<Direction, Variants> = {
  up: fadeUp,
  in: fadeIn,
  left: slideInLeft,
  right: slideInRight,
  scale: scaleIn,
  image: imageReveal,
  blur: blurReveal,
  flipX: flipInX,
  flipY: flipInY,
  zoom: zoomBounce,
  rotate: rotateIn,
  elastic: elasticIn,
  spiral: spiralIn,
  dramatic: dramaticReveal,
  text: textReveal,
  clip: clipReveal,
  mask: maskReveal,
  down: slideInDown,
  'slide-up': slideInUp,
};

type RevealProps = {
  children: React.ReactNode;
  variant?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
};

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];
  const v = map[variant];
  return (
    <MotionTag
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
  slow?: boolean;
  wave?: boolean;
  scale?: boolean;
  as?: 'div' | 'section' | 'ul';
};

export function Stagger({ children, className, fast = false, slow = false, wave = false, scale = false, as = 'div' }: StaggerProps) {
  const MotionTag = motion[as];
  let variant = staggerContainer;
  if (fast) variant = staggerFast;
  else if (slow) variant = staggerSlow;
  else if (wave) variant = staggerWave;
  else if (scale) variant = staggerScale;

  return (
    <MotionTag
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
  variant?: 'fade' | 'card' | 'list' | 'text' | 'image' | 'icon';
};

const staggerItemVariants: Record<string, Variants> = {
  fade: fadeUp,
  card: staggerCard,
  list: staggerListItem,
  text: staggerTextLine,
  image: staggerImageReveal,
  icon: staggerIconPop,
};

export function StaggerItem({ children, className, as = 'div', variant = 'fade' }: StaggerItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={staggerItemVariants[variant]}>
      {children}
    </MotionTag>
  );
}
