'use client'

import { motion } from 'framer-motion'
import { Award, Clock3, Headphones, ShieldCheck, Sparkles, RefreshCcw } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { EASE } from '@/lib/motion'

const FEATURES = [
  { icon: ShieldCheck, title: 'Professional researchers', desc: 'Every brief is handled by experts with strong academic training and field experience.', accent: '#002147' },
  { icon: Award, title: 'Confidential service', desc: 'Your ideas, data, and documents remain private and secure throughout the process.', accent: '#e07a5f' },
  { icon: Clock3, title: 'Timely delivery', desc: 'Structured milestones and realistic timelines keep your work moving without stress.', accent: '#2f855a' },
  { icon: Sparkles, title: 'Expert editing', desc: 'From clarity to citation accuracy, every draft is refined with care and precision.', accent: '#d4af37' },
  { icon: RefreshCcw, title: 'Affordable pricing', desc: 'Transparent quotes and thoughtful packages designed to support your budget.', accent: '#002147' },
  { icon: Headphones, title: '24/7 support', desc: 'Receive guidance whenever you need it, from first enquiry to final review.', accent: '#e07a5f' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-[#f8f6f2]" aria-labelledby="why-heading">
      <div className="container-xl">
        <SectionHeader badge="Why choose us" title="A premium experience that feels calm, clear, and dependable" subtitle="We combine academic rigor with thoughtful communication so you feel supported at every step." />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc, accent }, index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }} className="card-base p-10 border-[#e8e5df]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${accent}16`, color: accent }}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-[1.2rem] font-semibold text-[#002147]">{title}</h3>
              <p className="mt-4 text-sm leading-8 text-[#4a5568]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
