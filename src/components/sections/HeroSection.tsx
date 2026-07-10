'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Clock } from 'lucide-react'

const TRUST_BADGES = [
  { icon: Shield, text: 'Confidential' },
  { icon: Star,   text: 'Expert Support' },
  { icon: Clock,  text: 'On-Time Delivery' },
]

/* reusable fade-up variant */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A] pt-20"
    >
      {/* ── background ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* blobs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/8 blur-[100px]" />
      </div>

      <div className="container-xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20 lg:py-28">

          {/* ── LEFT ─────────────────────────────────────── */}
          <div className="flex flex-col items-start gap-8">
            {/* pill label */}
            <motion.div {...fadeUp(0)}>
              <span className="label-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                Trusted by 10,000+ students worldwide
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              {...fadeUp(0.08)}
              className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] leading-[1.1] tracking-tight
                         text-[38px] sm:text-[52px] lg:text-[64px] xl:text-[72px]"
            >
              Expert Academic{' '}
              <span className="text-gradient">Support</span>
              {' '}for{' '}
              <span className="relative inline-block">
                Your Success
                {/* underline squiggle */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 320 10" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2 7 Q80 2 160 7 Q240 12 318 5" stroke="#F59E0B" strokeWidth="3"
                    strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h1>

            {/* subtext */}
            <motion.p
              {...fadeUp(0.14)}
              className="text-[#CBD5E1] text-lg leading-relaxed max-w-[520px]"
            >
              From dissertation guidance to statistical analysis, our team of
              PhD-qualified experts helps you achieve excellence at every stage of
              your academic journey — confidentially and on time.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/request"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                           bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-base
                           shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:shadow-[0_0_36px_rgba(37,99,235,0.65)]
                           transition-all duration-300 active:scale-[0.97] w-full sm:w-auto"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                           border border-white/[0.12] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-white/20
                           hover:bg-white/[0.04] font-semibold text-base transition-all duration-300
                           active:scale-[0.97] w-full sm:w-auto"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* trust badges */}
            <motion.div {...fadeUp(0.26)} className="flex flex-wrap items-center gap-4 pt-2">
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#22C55E]/15 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-[#22C55E]" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-[#CBD5E1] font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — academic illustration card ────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* glow */}
            <div className="absolute inset-0 rounded-3xl bg-[#2563EB]/15 blur-3xl scale-95" aria-hidden="true" />

            <div className="relative glass rounded-3xl p-10 w-full max-w-[440px]">
              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 glass rounded-2xl px-5 py-3 shadow-xl"
              >
                <p className="text-xs text-[#CBD5E1] font-medium">Projects Completed</p>
                <p className="text-2xl font-bold text-[#F8FAFC] font-[family-name:var(--font-poppins)]">50,000+</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-3 shadow-xl"
              >
                <p className="text-xs text-[#CBD5E1] font-medium">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-[#22C55E] font-[family-name:var(--font-poppins)]">98%</p>
              </motion.div>

              {/* Central illustration placeholder */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#2563EB]/20 via-[#1E293B] to-[#F59E0B]/10 flex flex-col items-center justify-center gap-6 border border-white/[0.06]">
                {/* Academic icon grid */}
                <div className="grid grid-cols-3 gap-4">
                  {['📄','📚','🔬','📊','✍️','🎓','📐','🧪','🏆'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 rounded-xl bg-[#1E293B] border border-white/[0.06] flex items-center justify-center text-2xl hover:border-[#2563EB]/50 transition-colors cursor-default"
                      aria-hidden="true"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-[#CBD5E1] text-center px-4">
                  Supporting every academic discipline
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── stats bar ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16 border border-white/[0.06]"
          role="list"
          aria-label="Key statistics"
        >
          {[
            { value: '10,000+', label: 'Students Helped' },
            { value: '50,000+', label: 'Projects Completed' },
            { value: '4.9 / 5', label: 'Average Rating' },
            { value: '50+',     label: 'Countries Served' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#0F172A] px-6 py-5 text-center"
              role="listitem"
            >
              <p className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-2xl lg:text-3xl">
                {value}
              </p>
              <p className="text-[#CBD5E1] text-sm mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
