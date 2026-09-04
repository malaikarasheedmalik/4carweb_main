import type { Variants } from 'framer-motion';

export const easeSmooth = [0.22, 1, 0.36, 1] as const;
export const easeElastic = [0.68, -0.55, 0.265, 1.55] as const;
export const easeBounce = [0.34, 1.56, 0.64, 1] as const;
export const easeDramatic = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════
   BASIC REVEAL VARIANTS
   ═══════════════════════════════════════════ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeSmooth } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeSmooth },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeSmooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeSmooth },
  },
};

/* ═══════════════════════════════════════════
   ADVANCED REVEAL VARIANTS
   ═══════════════════════════════════════════ */

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeDramatic },
  },
};

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeDramatic },
  },
};

export const flipInX: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.7, ease: easeBounce },
  },
};

export const flipInY: Variants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.7, ease: easeBounce },
  },
};

export const zoomBounce: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeBounce },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeBounce },
  },
};

export const elasticIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeElastic },
  },
};

export const spiralIn: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.9, ease: easeBounce },
  },
};

export const dramaticReveal: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easeDramatic },
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeDramatic },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

/* ═══════════════════════════════════════════
   STAGGER & CONTAINER VARIANTS
   ═══════════════════════════════════════════ */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const staggerWave: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerScale: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerFade: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerFromLeft: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05, from: 'left' as const },
  },
};

export const staggerFromRight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05, from: 'right' as const },
  },
};

export const staggerFromCenter: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05, from: 'center' as const },
  },
};

/* ═══════════════════════════════════════════
   HOVER & INTERACTION VARIANTS
   ═══════════════════════════════════════════ */

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: easeSmooth },
  },
};

export const cardHover3D = {
  rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
  hover: {
    y: -10,
    scale: 1.02,
    rotateX: 2,
    rotateY: -2,
    transition: { duration: 0.4, ease: easeSmooth },
  },
};

export const magneticHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, type: 'spring', stiffness: 400, damping: 17 },
  },
};

export const glowHover = {
  rest: { boxShadow: '0 0 0 0 hsl(174 72% 40% / 0)' },
  hover: {
    boxShadow: '0 0 30px hsl(174 72% 40% / 0.3), 0 0 60px hsl(174 72% 40% / 0.15)',
    transition: { duration: 0.4 },
  },
};

export const iconSpin = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: 0.6, ease: easeBounce },
  },
};

export const iconBounce = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.3, type: 'spring', stiffness: 500, damping: 15 },
  },
};

export const underlineExpand = {
  rest: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: easeSmooth },
  },
};

export const arrowSlide = {
  rest: { x: 0 },
  hover: {
    x: 6,
    transition: { duration: 0.3, ease: easeSmooth },
  },
};

export const pressScale = {
  tap: { scale: 0.95 },
  hover: { scale: 1.02 },
};

export const springPress = {
  tap: { scale: 0.92 },
  hover: { scale: 1.05 },
  rest: { scale: 1 },
};

/* ═══════════════════════════════════════════
   SPECIAL EFFECTS
   ═══════════════════════════════════════════ */

export const parallaxScroll = (speed: number = 0.3): Variants => ({
  hidden: { y: speed * 100 },
  visible: {
    y: -speed * 100,
    transition: { duration: 0.8, ease: easeSmooth },
  },
});

export const counterUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const floatingSlowAnimation = {
  y: [-8, 8, -8],
  x: [-4, 4, -4],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const breatheAnimation = {
  scale: [1, 1.03, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const rotateContinuous = {
  rotate: 360,
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

export const orbitAnimation = (radius: number = 100, duration: number = 10) => ({
  rotate: 360,
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear',
  },
});

export const shimmerLoop = {
  backgroundPosition: ['-200% 0', '200% 0'],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'linear',
  },
};

export const gradientShiftAnimation = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/* ═══════════════════════════════════════════
   LAYOUT ANIMATIONS
   ═══════════════════════════════════════════ */

export const layoutTransition = {
  layout: { transition: { duration: 0.4, ease: easeSmooth } },
};

export const layoutSpring = {
  layout: { type: 'spring', stiffness: 300, damping: 30 },
};

export const morphTransition = {
  layout: { type: 'spring', stiffness: 200, damping: 25 },
};

/* ═══════════════════════════════════════════
   PAGE TRANSITION VARIANTS
   ═══════════════════════════════════════════ */

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: easeSmooth },
  },
};

export const pageSlideUp = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeDramatic, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.3 },
  },
};

export const pageFadeScale = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

/* ═══════════════════════════════════════════
   ANIMATED COMPONENT PROPS
   ═══════════════════════════════════════════ */

export const textCharByChar = (text: string) => ({
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
});

export const textWordByWord = (words: string[]) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
});

export const textWordVariant: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: easeSmooth },
  },
};

/* ═══════════════════════════════════════════
   SCROLL-LINKED VARIANTS
   ═══════════════════════════════════════════ */

export const scrollFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const scrollScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const scrollRotate: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const scrollClipLeft: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1, ease: easeSmooth },
  },
};

export const scrollClipRight: Variants = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    transition: { duration: 1, ease: easeSmooth },
  },
};

export const scrollClipCircle: Variants = {
  hidden: { clipPath: 'circle(0% at 50% 50%)' },
  visible: {
    clipPath: 'circle(100% at 50% 50%)',
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

/* ═══════════════════════════════════════════
   COMBINED / COMPOUND VARIANTS
   ═══════════════════════════════════════════ */

export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const staggerListItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeSmooth },
  },
};

export const staggerTextLine: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const staggerImageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

export const staggerIconPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeBounce },
  },
};

/* ═══════════════════════════════════════════
   UTILITY / VIEWPORT
   ═══════════════════════════════════════════ */

export const viewportOnce = { once: true, amount: 0.2 };
export const viewportAlways = { once: false, amount: 0.1 };
export const viewportTop = { once: true, amount: 0.1 };
export const viewportMiddle = { once: true, amount: 0.4 };
export const viewportFull = { once: true, amount: 0.8 };
