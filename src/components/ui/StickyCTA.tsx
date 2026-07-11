'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { triggerHaptic } from '@/utils/performance'

/**
 * StickyCTA — mobile-only sticky "Request a Quote" button.
 * Appears after the user scrolls past the hero section (300px).
 * Hidden on pages that already have a prominent CTA in view.
 *
 * Integration: add inside (public)/layout.tsx, below <main>
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          /* Show only on mobile, sits above bottom nav (bottom: 80px) */
          className="md:hidden fixed bottom-[84px] left-4 right-4 z-30"
        >
          <Link
            href="/request"
            onClick={() => triggerHaptic(10)}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl
                       bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.97]
                       text-white font-semibold text-sm
                       shadow-[0_8px_32px_rgba(37,99,235,0.5)]
                       transition-all duration-200"
            aria-label="Request a Quote"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
