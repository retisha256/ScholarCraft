'use client'

import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-9xl font-bold font-poppins text-red-500 mb-4 opacity-50">500</div>
            <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'sans-serif' }}>
              Something Went Wrong
            </h1>
            <p className="text-blue-200 mb-8 max-w-sm mx-auto" style={{ fontFamily: 'sans-serif' }}>
              An unexpected error occurred. Our team has been notified.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 hover:border-white text-white font-semibold rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
