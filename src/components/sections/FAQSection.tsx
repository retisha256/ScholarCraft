'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { FAQS } from '@/lib/constants'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-py bg-[#0A1020]" aria-labelledby="faq-heading">
      <div className="container-xl">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked "
          titleHighlight="Questions"
          subtitle="Everything you need to know before getting started with us."
        />

        <div className="max-w-3xl mx-auto space-y-3" role="list">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                open === idx ? 'border-[#2563EB]/30 shadow-[0_0_24px_rgba(37,99,235,0.1)]' : 'border-white/[0.06]'
              }`}
              role="listitem"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                aria-expanded={open === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="font-[family-name:var(--font-poppins)] font-medium text-[#F8FAFC] text-sm sm:text-base leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    open === idx ? 'bg-[#2563EB]/20 text-[#2563EB]' : 'bg-white/[0.06] text-[#CBD5E1]'
                  }`}
                >
                  {open === idx
                    ? <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                    : <Plus  className="w-3.5 h-3.5" aria-hidden="true" />
                  }
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    role="region"
                  >
                    <div className="px-7 pb-6 text-[#CBD5E1] text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.answer}
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
