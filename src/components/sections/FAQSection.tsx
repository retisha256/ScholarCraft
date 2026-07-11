'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { FAQS } from '@/lib/constants'
import { EASE } from '@/lib/motion'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-py bg-[#fdfbf7]" aria-labelledby="faq-heading">
      <div className="container-xl">
        <SectionHeader badge="FAQ" title="Frequently asked questions" subtitle="A few of the questions we hear most often before a first consultation." />

        <div className="mx-auto max-w-3xl space-y-4" role="list">
          {FAQS.map((faq, index) => (
            <motion.div key={`${faq.question}-${index}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.35, delay: index * 0.04, ease: EASE }} className={`overflow-hidden card-base transition-all duration-300 ${open === index ? 'border-[var(--accent-dark)]/30 shadow-[0_12px_30px_rgba(0,33,71,0.05)]' : 'border-[var(--border)] shadow-sm'}`} role="listitem">
              <button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-7" aria-expanded={open === index} aria-controls={`faq-answer-${index}`}>
                <span className="font-serif text-[1rem] font-semibold text-[var(--text-primary)] sm:text-[1.05rem]">{faq.question}</span>
                <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors ${open === index ? 'bg-[#fff4ec] text-[var(--accent-dark)]' : 'bg-[#f8f6f2] text-[#718096]'}`}>
                  {open === index ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div id={`faq-answer-${index}`} key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: EASE }} role="region">
                    <div className="border-t border-[#f8f6f2] px-6 pb-6 pt-4 sm:px-7">
                      <p className="max-w-prose text-sm leading-8 text-[#4a5568]">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
