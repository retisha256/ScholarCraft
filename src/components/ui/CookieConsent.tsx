'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const t = setTimeout(() => setShow(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept  = () => { localStorage.setItem('cookie-consent', 'accepted');  setShow(false) }
  const decline = () => { localStorage.setItem('cookie-consent', 'declined');  setShow(false) }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,33,71,0.14)] border border-[#E2D9CC] p-6">
            <button
              onClick={decline}
              className="absolute top-4 right-4 p-1.5 text-[#9CA3AF] hover:text-[#002147] hover:bg-[#F5F1EB] rounded-lg transition-colors"
              aria-label="Close cookie notice"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-[#002147] mb-1">We use cookies</h3>
                <p className="text-sm text-[#2D3748] mb-4 leading-relaxed font-sans">
                  We use cookies to enhance your experience and analyse site traffic. Read our{' '}
                  <Link href="/privacy-policy" className="text-[#002147] underline underline-offset-2">
                    Privacy Policy
                  </Link>.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={accept}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#002147] hover:bg-[#E07A5F] text-white text-sm font-semibold font-sans rounded-xl transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={decline}
                    className="flex-1 sm:flex-none px-5 py-2.5 border border-[#E2D9CC] text-[#2D3748] hover:bg-[#F5F1EB] text-sm font-medium font-sans rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
