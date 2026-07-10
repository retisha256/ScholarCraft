'use client'

import { motion } from 'framer-motion'
import { ClipboardList, MessageSquare, UserCheck, RefreshCw, CheckCircle, ArrowDown } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'
import Link from 'next/link'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardList, MessageSquare, UserCheck, RefreshCw, CheckCircle,
}

const GUARANTEES = [
  { title: '2-Hour Response',      desc: 'We review your request and respond with a quote within 2 hours.' },
  { title: 'Expert Matching',      desc: 'We match your project to the most qualified specialist in your field.' },
  { title: 'Quality Checked',      desc: 'Every deliverable is quality-checked before being sent to you.' },
  { title: 'Satisfaction Guarantee', desc: 'Free revisions until you are 100% satisfied with the result.' },
]

export default function HowItWorksPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2563EB]/8 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center max-w-2xl mx-auto">
          <motion.span className="label-pill mb-5 inline-flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Process</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5">
            How It <span className="text-gradient">Works</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="text-[#CBD5E1] text-lg">
            Getting expert academic support is straightforward. Five clear steps from request to delivery.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-py bg-[#0A1020]">
        <div className="container-xl max-w-2xl mx-auto">
          <div className="flex flex-col gap-0">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = ICON_MAP[step.icon]
              return (
                <div key={step.step} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full glass rounded-2xl p-6 flex items-start gap-5 hover:border-white/[0.14] transition-all duration-300 group"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center group-hover:bg-[#2563EB]/25 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />}
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#F59E0B] text-[#0F172A] text-[10px] font-bold flex items-center justify-center font-[family-name:var(--font-poppins)]">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#2563EB] tracking-widest uppercase mb-1">Step {String(i + 1).padStart(2,'0')}</p>
                      <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-lg mb-1.5">{step.title}</h3>
                      <p className="text-[#CBD5E1] text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                  {i < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="flex flex-col items-center py-3" aria-hidden="true">
                      <div className="w-px h-5 bg-gradient-to-b from-[#2563EB]/50 to-transparent" />
                      <ArrowDown className="w-4 h-4 text-[#2563EB]/40" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/request"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all">
              Start Your Request
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section-py bg-[#0F172A]">
        <div className="container-xl max-w-4xl">
          <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[32px] text-center mb-12">
            Our Guarantees to You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map((g, i) => (
              <motion.div key={g.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 text-center hover:border-[#22C55E]/30 transition-all hover:-translate-y-0.5 duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/25 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-5 h-5 text-[#22C55E]" aria-hidden="true" />
                </div>
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-2">{g.title}</p>
                <p className="text-[#CBD5E1] text-xs leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </>
  )
}
