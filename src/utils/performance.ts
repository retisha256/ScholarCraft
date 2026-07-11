/**
 * Performance utilities
 * - Connection speed detection
 * - Conditional animation loading
 * - Lazy load helpers
 */

/** Connection speed tiers */
export type ConnectionSpeed = 'fast' | 'moderate' | 'slow' | 'unknown'

/**
 * Detect effective connection speed using the Network Information API.
 * Falls back to 'fast' on unsupported browsers (desktop Safari, Firefox).
 */
export function getConnectionSpeed(): ConnectionSpeed {
  if (typeof navigator === 'undefined') return 'unknown'

  // Network Information API (Chrome/Edge/Android)
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string
      saveData?: boolean
      downlink?: number
    }
    mozConnection?: { effectiveType?: string }
    webkitConnection?: { effectiveType?: string }
  }

  const conn = nav.connection || nav.mozConnection || nav.webkitConnection
  if (!conn) return 'fast' // assume fast on unsupported browsers

  // Respect data-saver mode
  if ((conn as { saveData?: boolean }).saveData) return 'slow'

  switch (conn.effectiveType) {
    case '4g':  return 'fast'
    case '3g':  return 'moderate'
    case '2g':
    case 'slow-2g': return 'slow'
    default:    return 'fast'
  }
}

/**
 * Returns true when heavy animations should be used:
 * fast connection + no reduced-motion preference
 */
export function shouldUseHeavyAnimations(): boolean {
  if (typeof window === 'undefined') return false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return false
  const speed = getConnectionSpeed()
  return speed === 'fast' || speed === 'unknown'
}

/**
 * Debounce — standard implementation, used for search inputs
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle — for scroll/resize handlers
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      fn(...args)
    }
  }
}

/** Trigger haptic feedback if supported (mobile) */
export function triggerHaptic(pattern: number | number[] = 10): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

/** Preload a route on hover/focus — call in onMouseEnter */
export function prefetchRoute(href: string): void {
  if (typeof window === 'undefined') return
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}
