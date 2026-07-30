'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface Props {
  badge?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  badge, title, titleHighlight, subtitle, centered = true, light = false,
}: Props) {
  const titleParts = titleHighlight ? title.split(titleHighlight) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`flex flex-col gap-4 mb-14 lg:mb-20 ${centered ? 'items-center text-center' : 'items-start'}`}
    >


      <h2 className={`section-heading ${light ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        {titleParts ? (
          <>
            {titleParts[0]}
            <span className={light ? 'text-[var(--accent)]' : 'text-gradient'}>{titleHighlight}</span>
            {titleParts[1]}
          </>
        ) : title}
      </h2>

      {subtitle && (
        <p className={`section-copy ${centered ? 'mx-auto' : ''} ${light ? 'text-blue-100' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
