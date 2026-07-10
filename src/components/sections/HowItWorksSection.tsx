'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardList, MessageSquare, UserCheck, RefreshCw, CheckCircle, ArrowDown } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const STEPS = [
  { icon: ClipboardList, step: '01', title: 'Submit Request',   desc: 'Fill out our detailed form with your project requirements, deadline, and any supporting files.' },
  { icon: MessageSquare, step: '02', title: 'Receive Quote',    desc: 'Within 2 hours, our team reviews your request and sends a personalised quote and timeline.' },
  { icon: UserCheck,     step: '03', title: 'Confirm Order',    desc: 'Accept the quote and we match your project to the most qualified expert in your discipline.' },
  { icon: RefreshCw,     step: '04', title: 'Work Begins',      desc: 'Your expert starts immediately. You receive regular updates and can provide direction throughout.' },
  { icon: CheckCircle,   step: '05', title: 'Delivery',         desc: 'Receive your completed work, request any revisions, and approve when you\'re fully satisfied.' },
]

export default function HowItWorksSection() {
  return (
    <section className="section-py bg-[#0F172A]" aria-labelledby="how-it-works-heading">
      <div className="container-xl">
        <SectionHeader
          badge="How It Works"
          title="Simple, Transparent "
          titleHighlight="Process"
          subtitle="Getting expert academic support is straightforward. Here's exactly how it works in five clear steps."
        />

        {/* Timeline */}
        <div className="max-w-2xl mx-auto flex flex-col gap-0">
          {STEPS.map(({ icon: Icon, step, title, desc }, idx) => (
            <div key={step} className="flex flex-col items-center">
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full glass rounded-2xl p-6 flex items-start gap-5 hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                {/* step number + icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center group-hover:bg-[#2563EB]/25 transition-colors">
                    <Icon className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#F59E0B] text-[#0F172A] text-[10px] font-bold flex items-center justify-center font-[family-name:var(--font-poppins)]">
                    {idx + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold text-[#2563EB] tracking-widest uppercase">Step {step}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-lg mb-1.5">
                    {title}
                  </h3>
                  <p className="text-[#CBD5E1] text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>

              {/* connector arrow */}
              {idx < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col items-center py-3 origin-top"
                  aria-hidden="true"
                >
                  <div className="w-px h-6 bg-gradient-to-b from-[#2563EB]/50 to-transparent" />
                  <ArrowDown className="w-4 h-4 text-[#2563EB]/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/request"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:shadow-[0_0_36px_rgba(37,99,235,0.6)] transition-all duration-300 active:scale-[0.97]"
          >
            Start Your Request
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
