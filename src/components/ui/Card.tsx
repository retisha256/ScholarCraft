'use client'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'base' | 'soft' | 'glass'
  as?: 'div' | 'article' | 'section'
  children: React.ReactNode
  className?: string
}

export default function Card({
  variant = 'base',
  as: Component = 'div',
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    base: 'card-base',
    soft: 'card-soft',
    glass: 'card-glass',
  }

  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  )
}
