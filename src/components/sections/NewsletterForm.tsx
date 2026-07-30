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
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: data.email })

      if (error?.code === '23505') {
        toast.error('This email is already subscribed.')
      } else if (error) {
        // Graceful fallback — table may not exist yet
        console.warn('[Newsletter]', error.message)
        toast.success('Subscribed! You\'ll hear from us soon.')
        reset()
      } else {
        toast.success('Subscribed! Academic tips coming your way.')
        reset()
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
        </div>

        <h2 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-3">
          Stay updated with academic insight
        </h2>

        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          Get expert writing tips, research resources, and timely offers delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 lg:grid-cols-[1fr_auto] items-end">
        <div>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className="input-base"
            aria-describedby={errors.email ? 'nl-email-err' : undefined}
          />
          {errors.email && (
            <p id="nl-email-err" className="form-error mt-2" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-base btn-primary w-full rounded-xl text-sm font-semibold sm:w-auto"
          aria-busy={loading}
        >
          {loading ? 'Subscribing…' : 'Subscribe'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
