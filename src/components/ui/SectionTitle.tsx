'use client'

import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  eyebrow?: string
  centered?: boolean
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-12 max-w-4xl', centered ? 'mx-auto text-center' : '', className)}>
      {eyebrow ? <p className="label-pill mb-5 inline-flex">{eyebrow}</p> : null}
      <h2 className="section-heading">{title}</h2>
      {subtitle ? <p className="section-copy mt-6">{subtitle}</p> : null}
    </div>
  )
}
