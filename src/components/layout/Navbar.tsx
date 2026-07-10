'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, GraduationCap } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-xl">
          <nav className="flex items-center justify-between h-16 lg:h-20" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="AcademicPro home">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-lg tracking-tight">
                Academic<span className="text-[#F59E0B]">Pro</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors duration-200 group"
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-px rounded-full bg-[#2563EB] transition-transform duration-300 origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/request"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)] active:scale-95"
              >
                Request a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-white/[0.06] transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x"
                      initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu"
                      initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0F172A] border-l border-white/[0.06] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-16">
                <span className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-[#CBD5E1] hover:bg-white/[0.06]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? 'bg-[#2563EB]/20 text-[#2563EB]'
                            : 'text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              <div className="px-4 py-6 border-t border-white/[0.06]">
                <Link
                  href="/request"
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
