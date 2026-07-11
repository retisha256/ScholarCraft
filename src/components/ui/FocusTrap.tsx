'use client'

import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface Props {
  active: boolean
  children: React.ReactNode
  onEscape?: () => void
}

/**
 * FocusTrap — traps keyboard focus inside its children when `active`.
 * Restores focus to the previously focused element on deactivation.
 * Calls `onEscape` when the Escape key is pressed.
 *
 * Usage:
 *   <FocusTrap active={drawerOpen} onEscape={() => setDrawerOpen(false)}>
 *     <nav>...</nav>
 *   </FocusTrap>
 */
export default function FocusTrap({ active, children, onEscape }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<Element | null>(null)

  useEffect(() => {
    if (!active) return

    // Save and move focus inside the trap
    previousFocus.current = document.activeElement
    const el = ref.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE)
    focusable[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.()
        return
      }
      if (e.key !== 'Tab') return

      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Restore focus on deactivation
      ;(previousFocus.current as HTMLElement | null)?.focus()
    }
  }, [active, onEscape])

  return (
    <div ref={ref} tabIndex={-1} style={{ outline: 'none' }}>
      {children}
    </div>
  )
}
