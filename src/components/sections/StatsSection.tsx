'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { end: 5000,  suffix: '+', label: 'Projects Completed',   color: '#2563EB' },
  { end: 98,    suffix: '%', label: 'Customer Satisfaction', color: '#22C55E' },
  { end: 1500,  suffix: '+', label: 'Happy Clients',         color: '#F59E0B' },
  { end: 24,    suffix: '/7', label: 'Expert Support',        color: '#A855F7' },
]

function StatItem({ end, suffix, label, color, delay }: typeof STATS[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(inView ? end : 0, 2000, delay)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="text-center"
    >
      <p
        className="font-[family-name:var(--font-poppins)] font-bold text-[48px] lg:text-[64px] leading-none tabular-nums"
        style={{ color }}
      >
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[#CBD5E1] text-base mt-3">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="section-py bg-[#0A1020]" aria-label="Key statistics">
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
