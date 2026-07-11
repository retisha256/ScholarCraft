'use client'

import { cn } from '@/lib/utils'
import Button from './Button'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  children?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  centered = false,
  actions,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-4xl', centered ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p className="label-pill mb-6 inline-flex">{eyebrow}</p>
      ) : null}

      <h1 className="section-heading mb-6">{title}</h1>

      {description ? (
        <p className="section-copy mb-8">{description}</p>
      ) : null}

      {actions ? <div className={cn('flex flex-col gap-4 sm:flex-row sm:justify-center', centered ? 'justify-center' : '')}>{actions}</div> : null}

      {children}
    </div>
  )
}
