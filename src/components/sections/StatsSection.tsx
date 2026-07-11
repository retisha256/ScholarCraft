'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const STATS = [
  { end: 5000,  suffix: '+',  label: 'Projects Completed',    color: '#002147' },
  { end: 98,    suffix: '%',  label: 'Customer Satisfaction',  color: '#16A34A' },
  { end: 1500,  suffix: '+',  label: 'Happy Clients',          color: '#E07A5F' },
  { end: 24,    suffix: '/7', label: 'Expert Support',         color: '#D4AF37' },
]

export default function StatsSection() {
  return (
    <section className="section-py bg-[#F5F1EB]" aria-label="Key statistics">
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STATS.map(({ end, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              className="text-center"
            >
              <AnimatedCounter
                value={end}
                suffix={suffix}
                delay={i * 0.1}
                duration={2000}
                className="font-serif font-bold leading-none tabular-nums"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', color }}
              />
              <p className="text-[#6B7280] text-sm mt-3 font-sans">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
