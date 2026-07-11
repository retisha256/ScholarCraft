'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * AnimatedCounter — animates from 0 to `value` using easeOutCubic
 * when the element enters the viewport.
 *
 * Usage:
 *   <AnimatedCounter value={5000} suffix="+" className="text-4xl font-bold" />
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  delay = 0,
  className = '',
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(inView ? value : 0, duration, delay)

  return (
    <span ref={ref} className={className} style={style} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
