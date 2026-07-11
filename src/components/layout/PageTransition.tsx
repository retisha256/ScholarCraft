'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * PageTransition — wraps page content with a smooth fade-up transition
 * on route change. Respects prefers-reduced-motion.
 *
 * Integration: wrap children in (public)/layout.tsx
 *
 *   <PageTransition>
 *     <main id="main-content">{children}</main>
 *   </PageTransition>
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { prefersReduced } = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
        transition={{
          duration: prefersReduced ? 0.01 : 0.35,
          ease: EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
