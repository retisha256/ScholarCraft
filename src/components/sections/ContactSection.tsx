'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { Mail, MessageSquare, Phone, Clock, Send, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import SectionHeader from '@/components/ui/SectionHeader'

const INFO = [
  { icon: Mail,    label: 'Email',            value: 'support@academicpro.com', href: 'mailto:support@academicpro.com' },
  { icon: MessageSquare, label: 'WhatsApp',   value: '+1 (234) 567-890',        href: 'https://wa.me/1234567890' },
  { icon: Phone,   label: 'Phone',            value: '+1 (234) 567-890',        href: 'tel:+1234567890' },
  { icon: Clock,   label: 'Office Hours',     value: 'Mon – Sat, 8am – 10pm',   href: undefined },
  { icon: MapPin,  label: 'Location',         value: 'Available Worldwide',     href: undefined },
]

export default function ContactSection() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name, email: data.email, subject: data.subject, message: data.message,
      })
      if (error) throw error
      toast.success("Message sent! We'll respond within 2 hours.")
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = `w-full bg-[#0F172A] border border-white/[0.08] rounded-xl px-5 py-3.5 text-[#F8FAFC]
    placeholder-[#475569] text-sm transition-all duration-200
    focus:outline-none focus:border-[#2563EB]/60 focus:ring-1 focus:ring-[#2563EB]/30`

  return (
    <section id="contact" className="section-py bg-[#0F172A]" aria-labelledby="contact-heading">
      <div className="container-xl">
        <SectionHeader
          badge="Contact"
          title="Get in "
          titleHighlight="Touch"
          subtitle="Have a question or ready to get started? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-xl mb-3">
                We&apos;re here to help
              </h3>
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                Whether you have questions about our services, need a quote, or want to discuss
                your project, expect a response within 2 hours during business hours.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[#475569] font-medium uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-[#CBD5E1] text-sm hover:text-[#F8FAFC] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#CBD5E1] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass rounded-3xl p-8 flex flex-col gap-5"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2">
                    Full Name <span className="text-[#EF4444]" aria-hidden="true">*</span>
                  </label>
                  <input id="c-name" type="text" placeholder="John Smith"
                    {...register('name')} className={inputCls}
                    aria-describedby={errors.name ? 'c-name-err' : undefined} />
                  {errors.name && <p id="c-name-err" className="text-xs text-[#EF4444] mt-1.5" role="alert">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2">
                    Email <span className="text-[#EF4444]" aria-hidden="true">*</span>
                  </label>
                  <input id="c-email" type="email" placeholder="john@example.com"
                    {...register('email')} className={inputCls}
                    aria-describedby={errors.email ? 'c-email-err' : undefined} />
                  {errors.email && <p id="c-email-err" className="text-xs text-[#EF4444] mt-1.5" role="alert">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="c-subject" className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2">
                  Subject <span className="text-[#EF4444]" aria-hidden="true">*</span>
                </label>
                <input id="c-subject" type="text" placeholder="How can we help you?"
                  {...register('subject')} className={inputCls}
                  aria-describedby={errors.subject ? 'c-subject-err' : undefined} />
                {errors.subject && <p id="c-subject-err" className="text-xs text-[#EF4444] mt-1.5" role="alert">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="c-msg" className="block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2">
                  Message <span className="text-[#EF4444]" aria-hidden="true">*</span>
                </label>
                <textarea id="c-msg" rows={5} placeholder="Tell us about your project or question..."
                  {...register('message')} className={`${inputCls} resize-none`}
                  aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                {errors.message && <p id="c-msg-err" className="text-xs text-[#EF4444] mt-1.5" role="alert">{errors.message.message}</p>}
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl
                           bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-semibold
                           shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_32px_rgba(37,99,235,0.55)]
                           transition-all duration-300 active:scale-[0.98]"
                aria-busy={loading}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
