'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { CheckCircle2, Clock3, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import SectionHeader from '@/components/ui/SectionHeader'
import { EASE } from '@/lib/motion'
import { apiClient } from '@/utils/apiClient'

const PHONE = '+256 764 929546'
const PHONE_HREF = 'tel:+256764929546'
const WA_HREF = 'https://wa.me/256764929546?text=Hello%21%20I%20am%20interested%20in%20your%20academic%20support%20services.'

const INFO = [
  { icon: Mail, label: 'Email', value: 'support@scholarcraft.com', href: 'mailto:support@scholarcraft.com' },
  { icon: MessageSquare, label: 'WhatsApp', value: PHONE, href: WA_HREF },
  { icon: Phone, label: 'Phone', value: PHONE, href: PHONE_HREF },
  { icon: Clock3, label: 'Office Hours', value: 'Mon – Sat, 8am – 10pm', href: undefined },
  { icon: MapPin, label: 'Location', value: 'Available Worldwide', href: undefined },
]

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.from('contact_messages').insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        replied: false,
      })

      if (error) throw error

      await apiClient('/api/notify-admin', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: data.subject,
        }),
        retries: 1,
      }).catch(() => undefined)

      setSubmitState('success')
      toast.success('Thank you! Your message has been received. We will contact you shortly.')
      reset()
      window.setTimeout(() => setSubmitState('idle'), 5000)
    } catch (err) {
      console.error('[ContactForm] Unexpected error:', err)
      setSubmitState('error')
      toast.error('We could not send your message right now. Please try again or reach us on WhatsApp.')
    }
  }

  const inputCls = 'input-light'
  const labelCls = 'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#4a5568]'
  const errCls = 'mt-1.5 text-xs text-[#e53e3e]'

  return (
    <section id="contact" className="section-py bg-[#fdfbf7]" aria-labelledby="contact-heading">
      <div className="container-xl">
        <SectionHeader badge="Contact" title="Get in touch with our team" subtitle="Whether you are planning a project or need an expert perspective, we are ready to help." />

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }} className="card-base p-10 border-[#e8e5df]">
            <h3 className="font-serif text-[1.5rem] font-semibold text-[var(--text-primary)]">We are here to help</h3>
            <p className="mt-4 max-w-prose text-sm leading-8 text-[var(--text-secondary)]">Expect a thoughtful response with clear guidance, whether you are seeking a quote or need a quick answer about one of our services.</p>
            <div className="mt-10 space-y-5">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8f6f2] text-[var(--brand)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">{label}</p>
                    {href ? <a href={href} className="mt-2 inline-block text-sm text-[var(--text-primary)] transition-colors hover:text-[var(--accent-dark)]">{value}</a> : <p className="mt-2 text-sm text-[var(--text-primary)]">{value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[var(--success)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#276749]">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }} className="card-base p-10 border-[#e8e5df] sm:p-10">
            <AnimatePresence mode="wait">
              {submitState === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-[1.5rem] border border-[#e8e5df] bg-[#f8f6f2] p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2f855a]/15 text-[#2f855a]">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-serif text-[1.4rem] font-semibold text-[#002147]">Message received</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-[#4a5568]">Thank you! Your message has been received. We will contact you shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Contact form">
                  {submitState === 'error' && (
                    <div className="rounded-2xl border border-[#e53e3e]/20 bg-[#fff5f5] p-4 text-sm text-[#b42318]" role="alert">
                      We could not send your message right now. Please try again or reach us on WhatsApp.
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className={labelCls}>Full Name <span className="text-[#e53e3e]">*</span></label>
                      <input id="c-name" type="text" placeholder="John Smith" {...register('name')} className={inputCls} aria-describedby={errors.name ? 'c-name-err' : undefined} aria-invalid={!!errors.name} />
                      {errors.name && <p id="c-name-err" className={errCls} role="alert">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className={labelCls}>Email <span className="text-[#e53e3e]">*</span></label>
                      <input id="c-email" type="email" placeholder="john@example.com" {...register('email')} className={inputCls} aria-describedby={errors.email ? 'c-email-err' : undefined} aria-invalid={!!errors.email} />
                      {errors.email && <p id="c-email-err" className={errCls} role="alert">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-subject" className={labelCls}>Subject <span className="text-[#e53e3e]">*</span></label>
                    <input id="c-subject" type="text" placeholder="How can we help you?" {...register('subject')} className={inputCls} aria-describedby={errors.subject ? 'c-subject-err' : undefined} aria-invalid={!!errors.subject} />
                    {errors.subject && <p id="c-subject-err" className={errCls} role="alert">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-msg" className={labelCls}>Message <span className="text-[#e53e3e]">*</span></label>
                    <textarea id="c-msg" rows={5} placeholder="Tell us about your project or question..." {...register('message')} className={`${inputCls} resize-none`} aria-describedby={errors.message ? 'c-msg-err' : undefined} aria-invalid={!!errors.message} />
                    {errors.message && <p id="c-msg-err" className={errCls} role="alert">{errors.message.message}</p>}
                  </div>

                  <button type="submit" disabled={submitState === 'loading'} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#002147] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e07a5f] disabled:cursor-not-allowed disabled:opacity-70" aria-busy={submitState === 'loading'}>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {submitState === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
