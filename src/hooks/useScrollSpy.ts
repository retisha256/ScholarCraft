'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * useScrollSpy
 * Observes multiple section IDs and returns the currently-visible one.
 * Used in Navbar to highlight the active section on scroll.
 *
 * Usage:
 *   const activeId = useScrollSpy(['hero', 'services', 'about'])
 */
export function useScrollSpy(
  ids: string[],
  options: IntersectionObserverInit = { rootMargin: '-20% 0px -60% 0px' }
): string {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      // find the first entry that is intersecting
      const visible = entries.find((e) => e.isIntersecting)
      if (visible) setActiveId(visible.target.id)
    }, options)

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [ids, options])

  return activeId
}
