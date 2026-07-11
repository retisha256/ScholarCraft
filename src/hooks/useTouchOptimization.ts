'use client'

import { useCallback } from 'react'
import { triggerHaptic } from '@/utils/performance'

/**
 * useTouchOptimization
 * Returns event handlers that add haptic feedback and prevent
 * the 300ms tap delay on mobile browsers.
 *
 * Usage:
 *   const { touchProps } = useTouchOptimization()
 *   <button {...touchProps(onClick)}>Click me</button>
 */
export function useTouchOptimization() {
  const touchProps = useCallback(
    (
      onClick?: () => void,
      hapticPattern: number | number[] = 8
    ) => ({
      onClick: () => {
        triggerHaptic(hapticPattern)
        onClick?.()
      },
      // Prevent ghost clicks on mobile
      onTouchStart: (e: React.TouchEvent) => {
        // mark as handled so desktop mousedown doesn't also fire
        e.currentTarget.setAttribute('data-touch', 'true')
      },
      style: {
        // Ensure minimum 44×44 px touch target (WCAG 2.5.5)
        minHeight: '44px',
        minWidth: '44px',
        touchAction: 'manipulation' as const,
        WebkitTapHighlightColor: 'transparent',
      },
    }),
    []
  )

  return { touchProps }
}
