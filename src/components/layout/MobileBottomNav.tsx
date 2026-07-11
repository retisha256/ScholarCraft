/**
 * MobileBottomNav
 * Floating bottom navigation bar, visible only on mobile (< 768px).
 * Includes safe-area padding for notched phones.
 *
 * Integration: add <MobileBottomNav /> inside (public)/layout.tsx
 */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, LayoutGrid, MessageCircle, Menu, X, GraduationCap } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { triggerHaptic } from '@/utils/performance'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+256 764 929546'
const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I'm interested in your academic support services. Could you provide more information?"
)

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)

  /* Hide on scroll down, show on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  /* Close drawer on route change */
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const TAB_ITEMS = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      action: undefined as (() => void) | undefined,
    },
    {
      label: 'Services',
      href: '/services',
      icon: LayoutGrid,
      action: undefined,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${WHATSAPP_MSG}`,
      icon: MessageCircle,
      action: undefined,
      external: true,
      accent: true,
    },
    {
      label: 'Menu',
      href: '#',
      icon: drawerOpen ? X : Menu,
      action: () => {
        triggerHaptic(8)
        setDrawerOpen((v) => !v)
      },
    },
  ]

  return (
    <>
      {/* ── Bottom bar ───────────────────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="bottom-nav"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="md:hidden fixed bottom-4 left-4 right-4 z-40"
            aria-label="Mobile navigation"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="glass border border-white/[0.1] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-2 py-2 flex items-center justify-around">
              {TAB_ITEMS.map(({ label, href, icon: Icon, action, external, accent }) => {
                const active = !action && isActive(href)
                const isWhatsApp = accent

                const inner = (
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isWhatsApp
                          ? 'bg-[#22C55E] shadow-[0_0_16px_rgba(34,197,94,0.4)]'
                          : active
                          ? 'bg-[#2563EB]/20'
                          : 'hover:bg-white/[0.06]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isWhatsApp ? 'text-white' : active ? 'text-[#2563EB]' : 'text-[#CBD5E1]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`text-[10px] font-medium leading-none ${
                        isWhatsApp ? 'text-[#22C55E]' : active ? 'text-[#2563EB]' : 'text-[#475569]'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                )

                if (action) {
                  return (
                    <button
                      key={label}
                      onClick={action}
                      className="flex-1 flex items-center justify-center min-h-[44px] active:scale-95 transition-transform"
                      aria-label={label}
                      aria-expanded={label === 'Menu' ? drawerOpen : undefined}
                    >
                      {inner}
                    </button>
                  )
                }

                return (
                  <Link
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex-1 flex items-center justify-center min-h-[44px] active:scale-95 transition-transform"
                    aria-label={label}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => triggerHaptic(8)}
                  >
                    {inner}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Full-screen drawer (triggered by Menu tab) ────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A] border-t border-white/[0.06] rounded-t-3xl pb-safe"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 80px)` }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-4">
                <div className="w-10 h-1 rounded-full bg-white/20" aria-hidden="true" />
              </div>

              {/* Logo */}
              <div className="flex items-center gap-2.5 px-6 pb-5 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-lg">
                  Academic<span className="text-[#F59E0B]">Pro</span>
                </span>
              </div>

              {/* Nav links */}
              <nav className="px-4 pt-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? 'bg-[#2563EB]/15 text-[#2563EB]'
                            : 'text-[#CBD5E1] hover:bg-white/[0.04] hover:text-[#F8FAFC]'
                        }`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => { triggerHaptic(6); setDrawerOpen(false) }}
                      >
                        {link.label}
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* CTA */}
              <div className="px-4 pt-5">
                <Link
                  href="/request"
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-colors"
                  onClick={() => setDrawerOpen(false)}
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
