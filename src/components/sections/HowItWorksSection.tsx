'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ClipboardList, MessageSquare, RefreshCw, UserCheck } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'
import { EASE } from '@/lib/motion'

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardList, MessageSquare, UserCheck, RefreshCw, CheckCircle2,
}

export default function HowItWorksSection() {
  return (
    <section className="section-py bg-[#fdfbf7]" aria-labelledby="how-it-works-heading">
      <div className="container-xl">
        <SectionHeader badge="How it works" title="A straightforward process built around your deadline" subtitle="From first enquiry to final delivery, we keep the experience clear, structured, and calm." />

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = ICON_MAP[step.icon]
            return (
              <motion.article key={step.step} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }} className="rounded-[1.5rem] border border-[#e8e5df] bg-white p-6 text-left shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8f6f2] text-[#002147]">
                  {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                </div>
                <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Step {index + 1}</p>
                <h3 className="mt-2 font-serif text-[1.15rem] font-semibold text-[#002147]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#2d3748]">{step.description}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2, ease: EASE }} className="mt-12 text-center">
          <Link href="/request" className="inline-flex items-center gap-2 rounded-full bg-[#e07a5f] px-6 py-3 font-semibold text-white transition duration-200 hover:bg-[#c7654c] hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            Start Your Request
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
