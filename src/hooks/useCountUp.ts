import { useState, useEffect } from 'react'

export function useCountUp(target: number, duration = 2000, delay = 0): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (target === 0) { setCount(0); return }

    let start: number | null = null
    let rafId: number

    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) rafId = requestAnimationFrame(step)
        else setCount(target)
      }
      rafId = requestAnimationFrame(step)
    }, delay * 1000)

    return () => { clearTimeout(delayTimer); cancelAnimationFrame(rafId) }
  }, [target, duration, delay])

  return count
}
