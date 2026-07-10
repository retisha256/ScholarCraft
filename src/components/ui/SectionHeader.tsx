'use client'

import { motion } from 'framer-motion'

interface Props {
  badge?: string
  title: string
  titleHighlight?: string   // part of title to render in gradient
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ badge, title, titleHighlight, subtitle, centered = true }: Props) {
  const titleParts = titleHighlight ? title.split(titleHighlight) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 mb-16 lg:mb-20 ${centered ? 'items-center text-center' : 'items-start'}`}
    >
      {badge && (
        <span className="label-pill">{badge}</span>
      )}

      <h2
        className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[36px] lg:text-[48px]
                   leading-[1.15] tracking-tight max-w-[800px]"
      >
        {titleParts ? (
          <>
            {titleParts[0]}
            <span className="text-gradient">{titleHighlight}</span>
            {titleParts[1]}
          </>
        ) : title}
      </h2>

      {subtitle && (
        <p className={`text-[#CBD5E1] text-lg leading-relaxed ${centered ? 'max-w-[600px] mx-auto' : 'max-w-[600px]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
