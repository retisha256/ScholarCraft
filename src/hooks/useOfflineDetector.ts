'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

/**
 * useOfflineDetector
 * Listens to online/offline browser events and shows a toast banner.
 * Returns current online state.
 *
 * Usage:
 *   const isOnline = useOfflineDetector()
 */
export function useOfflineDetector(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const goOffline = () => {
      setIsOnline(false)
      toast.error(
        "You're offline. Some features may be unavailable.",
        {
          id: 'offline-toast',
          duration: Infinity,
          icon: '📡',
        }
      )
    }

    const goOnline = () => {
      setIsOnline(true)
      toast.dismiss('offline-toast')
      toast.success("You're back online!", { id: 'online-toast', duration: 3000 })
    }

    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)

    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  return isOnline
}
