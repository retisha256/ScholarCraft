'use client'

import { useEffect, useCallback, useRef } from 'react'
import { type UseFormReturn, type FieldValues, type DefaultValues } from 'react-hook-form'

interface Options<T extends FieldValues> {
  /** localStorage key */
  key: string
  /** react-hook-form instance */
  form: UseFormReturn<T>
  /** Fields to exclude from persistence (e.g. passwords) */
  exclude?: (keyof T)[]
  /** Debounce ms before saving (default 800) */
  debounce?: number
}

/**
 * useFormPersistence
 * Auto-saves form state to localStorage and restores it on mount.
 * Clears stored data when you call `clearSaved()`.
 *
 * Usage:
 *   const form = useForm<RequestFormData>({ ... })
 *   const { clearSaved, hasSavedData } = useFormPersistence({
 *     key: 'request-form',
 *     form,
 *     exclude: ['budget'],
 *   })
 */
export function useFormPersistence<T extends FieldValues>({
  key,
  form,
  exclude = [],
  debounce: debounceMs = 800,
}: Options<T>) {
  const { watch, reset, getValues } = form
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const storageKey = `form-persist:${key}`

  // Restore saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const saved = JSON.parse(raw) as Partial<T>
      // Only restore non-excluded fields
      const cleaned = Object.fromEntries(
        Object.entries(saved).filter(([k]) => !exclude.includes(k as keyof T))
      ) as DefaultValues<T>
      reset(cleaned, { keepDefaultValues: true })
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-save on field changes (debounced)
  useEffect(() => {
    const subscription = watch(() => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        try {
          const values = getValues()
          const filtered = Object.fromEntries(
            Object.entries(values as Record<string, unknown>).filter(
              ([k]) => !exclude.includes(k as keyof T)
            )
          )
          localStorage.setItem(storageKey, JSON.stringify(filtered))
        } catch {
          // storage full or unavailable
        }
      }, debounceMs)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, getValues])

  const clearSaved = useCallback(() => {
    localStorage.removeItem(storageKey)
  }, [storageKey])

  const hasSavedData = useCallback((): boolean => {
    try {
      return !!localStorage.getItem(storageKey)
    } catch {
      return false
    }
  }, [storageKey])

  return { clearSaved, hasSavedData }
}
