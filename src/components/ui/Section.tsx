'use client'

import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'main' | 'article'
  children: React.ReactNode
  className?: string
}

export default function Section({ as: Component = 'section', className, children, ...props }: SectionProps) {
  return (
    <Component className={cn('section-base', className)} {...props}>
      {children}
    </Component>
  )
}
