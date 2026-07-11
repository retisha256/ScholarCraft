/**
 * useReducedMotion
 * Reads prefers-reduced-motion and returns motion-safe variants
 * for Framer Motion. Use this everywhere you define animation props.
 *
 * Usage:
 *   const { fade, slide, scale } = useReducedMotion()
 *   <motion.div {...fade(0.1)} />
 */
'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

interface MotionVariant {
  initial: Record<string, unknown>
  animate: Record<string, unknown>
  exit?: Record<string, unknown>
  transition?: Record<string, unknown>
}

export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion()

  /** Fade + slide up */
  const fade = (delay = 0, distance = 24): MotionVariant => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : distance },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { opacity: 0, y: prefersReduced ? 0 : -distance },
  })

  /** Scale + fade */
  const scale = (delay = 0): MotionVariant => ({
    initial: { opacity: 0, scale: prefersReduced ? 1 : 0.92 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReduced ? 0.01 : 0.5,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { opacity: 0, scale: prefersReduced ? 1 : 0.92 },
  })

  /** Slide from side */
  const slide = (direction: 'left' | 'right' = 'left', delay = 0): MotionVariant => {
    const x = direction === 'left' ? -32 : 32
    return {
      initial: { opacity: 0, x: prefersReduced ? 0 : x },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: prefersReduced ? 0.01 : 0.6,
          delay: prefersReduced ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: { opacity: 0, x: prefersReduced ? 0 : x },
    }
  }

  /** Simple opacity only (always safe) */
  const appear = (delay = 0): MotionVariant => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: prefersReduced ? 0.01 : 0.4, delay: prefersReduced ? 0 : delay },
    },
    exit: { opacity: 0 },
  })

  return { fade, scale, slide, appear, prefersReduced: !!prefersReduced }
}
