import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-[family-name:var(--font-poppins)] text-[120px] font-bold leading-none text-[#2563EB]/20 select-none">
          404
        </p>
        <h1 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-3xl -mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-[#CBD5E1] text-base mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-colors">
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.08] text-[#CBD5E1] hover:text-[#F8FAFC] font-semibold transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
