/**
 * Shared Framer Motion constants.
 * The `as const` tuple satisfies FM12's strict Easing type.
 */
import type { Transition } from 'framer-motion'

/** Standard cubic-bezier ease — use this everywhere */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Pre-built transition presets */
export const T = {
  fast:    { duration: 0.25, ease: EASE } satisfies Transition,
  normal:  { duration: 0.45, ease: EASE } satisfies Transition,
  slow:    { duration: 0.65, ease: EASE } satisfies Transition,
  spring:  { type: 'spring', damping: 24, stiffness: 200 } satisfies Transition,
} as const

/** Fade + slide up — spread directly onto motion elements */
export const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0, transition: { ...T.slow, delay } as Transition },
  exit:    { opacity: 0, y: -distance },
})

/** Fade only */
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, delay } as Transition },
  exit:    { opacity: 0 },
})

/** Scale + fade */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { ...T.normal, delay } as Transition },
  exit:    { opacity: 0, scale: 0.92 },
})
