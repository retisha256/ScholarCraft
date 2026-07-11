'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestFormSchema, type RequestFormData } from '@/lib/validations'
import { ACADEMIC_LEVELS, CITATION_STYLES, SERVICES } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Shield, Clock, Award, RotateCcw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { useFormPersistence } from '@/hooks/useFormPersistence'
import FileUploader from '@/components/ui/FileUploader'
import { apiClient } from '@/utils/apiClient'

const TRUST = [
  { icon: Shield, text: '100% Confidential' },
  { icon: Award,  text: 'Expert Assigned Within 2h' },
  { icon: Clock,  text: 'Deadline Guaranteed' },
]

export default function RequestFormClient() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
  })

  const { register, handleSubmit, reset, formState: { errors } } = form

  const { clearSaved, hasSavedData } = useFormPersistence({
    key: 'request-form-v1',
    form,
    exclude: ['budget'],
  })

  const onSubmit = async (data: RequestFormData) => {
    setState('loading')
    try {
      const supabase = createClient()
      let fileUrl: string | undefined

      if (file) {
        const name = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const { error: upErr } = await supabase.storage.from('project-files').upload(name, file)
        if (upErr) throw upErr
        fileUrl = supabase.storage.from('project-files').getPublicUrl(name).data.publicUrl
      }

      const { error } = await supabase.from('project_requests').insert({
        ...data,
        number_of_pages: data.number_of_pages || null,
        institution:             data.institution || null,
        citation_style:          data.citation_style || null,
        budget:                  data.budget || null,
        additional_instructions: data.additional_instructions || null,
        file_url: fileUrl ?? null,
        status: 'new',
      })
      if (error) throw error

      // Fire-and-forget admin notification with retry
      apiClient('/api/notify-admin', {
        method: 'POST',
        body: JSON.stringify({
          name: data.full_name,
          email: data.email,
          service: data.service_required,
        }),
        retries: 2,
      }).catch(console.warn)

      clearSaved()
      setState('success')
      reset()
      setFile(null)
    } catch (e) {
      console.error(e)
      setState('error')
      toast.error('Submission failed. Please try again.')
    }
  }

  /* shared input styles */
  const input = `w-full bg-[#0F172A] border border-white/[0.08] rounded-xl px-5 py-3.5
    text-[#F8FAFC] placeholder-[#334155] text-sm
    focus:outline-none focus:border-[#2563EB]/60 focus:ring-1 focus:ring-[#2563EB]/30
    transition-all duration-200`
  const selectCls = `${input} cursor-pointer appearance-none`
  const labelCls = 'block text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2'
  const errCls   = 'flex items-center gap-1.5 text-xs text-[#EF4444] mt-1.5'

  return (
    <section className="min-h-screen bg-[#0F172A] pt-28 pb-24">
      <div className="container-xl max-w-4xl">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="label-pill mb-4 inline-flex">Free Consultation</span>
          <h1 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[38px] lg:text-[48px] leading-tight tracking-tight mb-4">
            Request a Quote
          </h1>
          <p className="text-[#CBD5E1] text-base max-w-lg mx-auto">
            Fill in the form below and we&apos;ll respond with a personalised quote within 2 hours.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#22C55E]" aria-hidden="true" />
                <span className="text-sm text-[#CBD5E1]">{text}</span>
              </div>
            ))}
          </div>

          {/* Saved-data restore banner */}
          {hasSavedData() && state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mt-5 glass rounded-xl px-5 py-3 text-sm text-[#CBD5E1] border-[#2563EB]/30"
            >
              <RotateCcw className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              Your previous progress has been restored.
              <button
                type="button"
                onClick={() => { clearSaved(); reset() }}
                className="text-[#F59E0B] hover:underline text-xs"
              >
                Clear
              </button>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── Success state ───────────────────────────── */}
          {state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-16 text-center border-white/[0.12]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-[#22C55E]" aria-hidden="true" />
              </motion.div>
              <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-2xl mb-3">
                Request Submitted!
              </h2>
              <p className="text-[#CBD5E1] text-sm max-w-md mx-auto mb-8">
                Our team will review your project details and contact you with a personalised quote within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setState('idle')}
                  className="px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors"
                >
                  Submit Another
                </button>
                <a
                  href="/services"
                  className="px-7 py-3.5 rounded-xl border border-white/[0.08] text-[#CBD5E1] hover:text-[#F8FAFC] font-medium text-sm transition-colors text-center"
                >
                  Browse Services
                </a>
              </div>
            </motion.div>
          ) : (
            /* ── Form ──────────────────────────────────── */
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {state === 'error' && (
                <div
                  className="flex items-center gap-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-2xl p-4 mb-6"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-[#FCA5A5]">
                    Something went wrong. Please try again or{' '}
                    <a href="/contact" className="underline">contact us directly</a>.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="glass rounded-3xl p-8 lg:p-10 border-white/[0.08]"
                aria-label="Project request form"
              >
                {/* ── Personal Information ─────────────── */}
                <fieldset className="mb-8">
                  <legend className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-base pb-4 border-b border-white/[0.06] w-full block mb-5">
                    Personal Information
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fn" className={labelCls}>
                        Full Name <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="fn" type="text" placeholder="Dr. Jane Smith"
                        {...register('full_name')} className={input}
                        aria-describedby={errors.full_name ? 'fn-err' : undefined}
                        aria-invalid={!!errors.full_name} />
                      {errors.full_name && (
                        <p id="fn-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.full_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="em" className={labelCls}>
                        Email <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="em" type="email" placeholder="jane@example.com"
                        {...register('email')} className={input}
                        aria-describedby={errors.email ? 'em-err' : undefined}
                        aria-invalid={!!errors.email} />
                      {errors.email && (
                        <p id="em-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ph" className={labelCls}>
                        Phone <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="ph" type="tel" placeholder="+1 234 567 890"
                        {...register('phone')} className={input}
                        aria-describedby={errors.phone ? 'ph-err' : undefined}
                        aria-invalid={!!errors.phone} />
                      {errors.phone && (
                        <p id="ph-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="co" className={labelCls}>
                        Country <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="co" type="text" placeholder="United Kingdom"
                        {...register('country')} className={input}
                        aria-describedby={errors.country ? 'co-err' : undefined}
                        aria-invalid={!!errors.country} />
                      {errors.country && (
                        <p id="co-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ins" className={labelCls}>
                        Institution{' '}
                        <span className="text-[#475569] normal-case tracking-normal text-xs">(optional)</span>
                      </label>
                      <input id="ins" type="text" placeholder="University of Oxford"
                        {...register('institution')} className={input} />
                    </div>
                  </div>
                </fieldset>

                {/* ── Project Details ──────────────────── */}
                <fieldset className="mb-8">
                  <legend className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-base pb-4 border-b border-white/[0.06] w-full block mb-5">
                    Project Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="al" className={labelCls}>
                        Academic Level <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <select id="al" {...register('academic_level')} className={selectCls}
                        aria-describedby={errors.academic_level ? 'al-err' : undefined}
                        aria-invalid={!!errors.academic_level}>
                        <option value="">Select level</option>
                        {ACADEMIC_LEVELS.map((l) => (
                          <option key={l.value} value={l.value} className="bg-[#1E293B]">{l.label}</option>
                        ))}
                      </select>
                      {errors.academic_level && (
                        <p id="al-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.academic_level.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="sr" className={labelCls}>
                        Service Required <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <select id="sr" {...register('service_required')} className={selectCls}
                        aria-describedby={errors.service_required ? 'sr-err' : undefined}
                        aria-invalid={!!errors.service_required}>
                        <option value="">Select service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#1E293B]">{s.title}</option>
                        ))}
                      </select>
                      {errors.service_required && (
                        <p id="sr-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.service_required.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pt" className={labelCls}>
                        Project Topic / Title <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="pt" type="text"
                        placeholder="The Impact of Social Media on Academic Performance"
                        {...register('project_topic')} className={input}
                        aria-describedby={errors.project_topic ? 'pt-err' : undefined}
                        aria-invalid={!!errors.project_topic} />
                      {errors.project_topic && (
                        <p id="pt-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.project_topic.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dl" className={labelCls}>
                        Deadline <span className="text-[#EF4444]" aria-hidden="true">*</span>
                      </label>
                      <input id="dl" type="date"
                        {...register('deadline')}
                        min={new Date().toISOString().split('T')[0]}
                        className={input}
                        aria-describedby={errors.deadline ? 'dl-err' : undefined}
                        aria-invalid={!!errors.deadline} />
                      {errors.deadline && (
                        <p id="dl-err" className={errCls} role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" />
                          {errors.deadline.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="np" className={labelCls}>
                        Number of Pages{' '}
                        <span className="text-[#475569] normal-case tracking-normal text-xs">(optional)</span>
                      </label>
                      <input id="np" type="number" min={1} placeholder="e.g. 20"
                        {...register('number_of_pages', { valueAsNumber: true })}
                        className={input} />
                    </div>

                    <div>
                      <label htmlFor="cs" className={labelCls}>
                        Citation Style{' '}
                        <span className="text-[#475569] normal-case tracking-normal text-xs">(optional)</span>
                      </label>
                      <select id="cs" {...register('citation_style')} className={selectCls}>
                        <option value="">Select style</option>
                        {CITATION_STYLES.map((s) => (
                          <option key={s.value} value={s.value} className="bg-[#1E293B]">{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bu" className={labelCls}>
                        Budget{' '}
                        <span className="text-[#475569] normal-case tracking-normal text-xs">(optional)</span>
                      </label>
                      <input id="bu" type="text" placeholder="e.g. $100–$200"
                        {...register('budget')} className={input} />
                    </div>
                  </div>
                </fieldset>

                {/* ── File upload ──────────────────────── */}
                <fieldset className="mb-8">
                  <legend className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-base pb-4 border-b border-white/[0.06] w-full block mb-5">
                    Supporting Files
                  </legend>
                  <FileUploader
                    value={file}
                    onChange={setFile}
                    label="Upload Project Files"
                  />
                </fieldset>

                {/* ── Additional instructions ──────────── */}
                <div className="mb-8">
                  <label htmlFor="ai" className={labelCls}>
                    Additional Instructions{' '}
                    <span className="text-[#475569] normal-case tracking-normal text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="ai"
                    rows={4}
                    placeholder="Any specific requirements, guidelines, rubric, or notes for your project…"
                    {...register('additional_instructions')}
                    className={`${input} resize-none`}
                    maxLength={2000}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60
                             text-white font-semibold text-base
                             shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:shadow-[0_0_36px_rgba(37,99,235,0.6)]
                             transition-all duration-300 active:scale-[0.98]"
                  aria-busy={state === 'loading'}
                >
                  {state === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : 'Submit Request'}
                </button>

                <p className="text-center text-xs text-[#475569] mt-4">
                  By submitting you agree to our{' '}
                  <a href="/privacy-policy" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
                  All information is strictly confidential.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
