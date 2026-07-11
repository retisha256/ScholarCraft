'use client'

import toast, { type Toast } from 'react-hot-toast'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

type ToastVariant = 'success' | 'error' | 'info'

interface SmartToastOptions {
  /** Duration in ms. Use Infinity for persistent toasts. Default 4000 */
  duration?: number
  /** Show an undo button */
  undoAction?: {
    label?: string
    onUndo: () => void
  }
  /** Unique toast ID (prevents duplicates) */
  id?: string
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" aria-hidden="true" />,
  error:   <XCircle    className="w-4 h-4 text-[#EF4444] flex-shrink-0" aria-hidden="true" />,
  info:    <Info       className="w-4 h-4 text-[#60A5FA] flex-shrink-0" aria-hidden="true" />,
}

function ToastContent({
  t,
  variant,
  message,
  undoAction,
}: {
  t: Toast
  variant: ToastVariant
  message: string
  undoAction?: SmartToastOptions['undoAction']
}) {
  return (
    <div className="flex items-start gap-3 max-w-sm">
      {ICONS[variant]}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#F8FAFC] leading-snug">{message}</p>
        {undoAction && (
          <button
            onClick={() => {
              toast.dismiss(t.id)
              undoAction.onUndo()
            }}
            className="mt-1 text-xs font-semibold text-[#F59E0B] hover:underline"
          >
            {undoAction.label ?? 'Undo'}
          </button>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="p-1 rounded-lg hover:bg-white/[0.08] text-[#475569] hover:text-[#CBD5E1] transition-colors flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}

/**
 * SmartToast — enhanced toast helper wrapping react-hot-toast.
 * Supports undo actions and consistent styling.
 *
 * Usage:
 *   smartToast.success('Saved!', { undoAction: { onUndo: handleUndo } })
 *   smartToast.error('Failed to save')
 *   smartToast.info('Processing…', { duration: Infinity })
 */
export const smartToast = {
  success(message: string, options: SmartToastOptions = {}) {
    return toast.custom(
      (t) => <ToastContent t={t} variant="success" message={message} undoAction={options.undoAction} />,
      { id: options.id, duration: options.duration ?? 4000 }
    )
  },

  error(message: string, options: SmartToastOptions = {}) {
    return toast.custom(
      (t) => <ToastContent t={t} variant="error" message={message} undoAction={options.undoAction} />,
      { id: options.id, duration: options.duration ?? 5000 }
    )
  },

  info(message: string, options: SmartToastOptions = {}) {
    return toast.custom(
      (t) => <ToastContent t={t} variant="info" message={message} undoAction={options.undoAction} />,
      { id: options.id, duration: options.duration ?? 4000 }
    )
  },

  dismiss: toast.dismiss,
  loading: toast.loading,
}
