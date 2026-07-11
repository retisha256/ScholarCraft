'use client'

import { useOfflineDetector } from '@/hooks/useOfflineDetector'

/**
 * OfflineDetector — renders nothing but activates the offline/online
 * toast listeners as a side effect. Drop anywhere inside a client tree.
 */
export default function OfflineDetector() {
  useOfflineDetector()
  return null
}
