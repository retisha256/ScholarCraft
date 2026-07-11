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
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-[var(--border)] bg-white/95 shadow-[0_10px_30px_rgba(8,36,63,0.08)] backdrop-blur' : 'border-transparent bg-white/90 backdrop-blur'}`} role="banner">
        <div className="container-xl">
          <nav className="grid h-[80px] items-center gap-x-10 lg:grid-cols-[1fr_auto_1fr]" aria-label="Main navigation">
            <Link href="/" className="flex items-center gap-3 self-center justify-self-start" aria-label="ScholarCraft home">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-[var(--text-inverse)] transition-colors duration-200 group-hover:bg-[var(--accent-dark)]">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                Scholar<span className="text-[var(--accent-dark)]">Craft</span>
              </span>
            </Link>

            <div className="hidden items-center justify-center gap-x-12 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link key={link.href} href={link.href} className="relative px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]" aria-current={active ? 'page' : undefined}>
                    {link.label}
                    <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[var(--accent-dark)] transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'}`} />
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center justify-self-end gap-3">
              <Link href="/request" className="hidden btn-base btn-primary px-8 py-3 text-sm font-semibold sm:inline-flex">
                Request a Quote
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e5df] bg-[#ffffff] text-[#002147] transition-colors hover:bg-[#f8f6f2] lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-nav">
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div id="mobile-nav" key="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 24, stiffness: 220 }} className="fixed right-0 top-0 bottom-0 z-50 flex w-72 flex-col border-l border-[#e8e5df] bg-white shadow-2xl lg:hidden">
              <div className="flex h-16 items-center justify-between border-b border-[#f8f6f2] px-6">
                <span className="font-serif text-lg font-semibold text-[#002147]">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-[#002147] hover:bg-[#f8f6f2]" aria-label="Close menu">
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((link, index) => {
                  const active = isActive(link.href)
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                      <Link href={link.href} className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${active ? 'bg-[#f8f6f2] text-[#002147]' : 'text-[#2d3748] hover:bg-[#f8f6f2] hover:text-[#002147]'}`} aria-current={active ? 'page' : undefined}>
                        {link.label}
                        {active && <span className="ml-auto h-2 w-2 rounded-full bg-[#e07a5f]" aria-hidden="true" />}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <div className="border-t border-[#f8f6f2] px-4 py-5">
                <Link href="/request" className="flex w-full items-center justify-center rounded-full bg-[#002147] px-4 py-3 text-sm font-semibold text-[#fdfbf7]" onClick={() => setMobileOpen(false)}>
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
