'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterData } from '@/lib/validations'
import { Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterData) => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: data.email })
      if (error?.code === '23505') { toast.error('Already subscribed!') }
      else if (error) throw error
      else { toast.success('Subscribed! Check your inbox.'); reset() }
    } catch { toast.error('Something went wrong.') }
    finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-[#F59E0B]" aria-hidden="true" />
          <span className="label-pill" style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', color: '#FCD34D' }}>
            Newsletter
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-2xl mb-1">
          Stay Updated
        </h2>
        <p className="text-[#CBD5E1] text-sm">
          Academic tips, writing resources, and exclusive offers — straight to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className="w-full bg-white/[0.08] border border-white/[0.12] rounded-xl px-5 py-3.5 text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#2563EB]/50"
            aria-describedby={errors.email ? 'nl-email-err' : undefined}
          />
          {errors.email && <p id="nl-email-err" className="text-xs text-[#F59E0B] mt-1" role="alert">{errors.email.message}</p>}
        </div>
        <button
          type="submit" disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
          aria-busy={loading}
        >
          {loading ? 'Subscribing…' : 'Subscribe'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
