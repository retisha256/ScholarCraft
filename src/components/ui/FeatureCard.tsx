'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  accent?: string
  index?: number
}

export default function FeatureCard({ icon: Icon, title, description, accent = '#002147', index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="card-base p-10 border-[var(--border)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${accent}16`, color: accent }}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-serif text-[1.2rem] font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{description}</p>
    </motion.div>
  )
}
