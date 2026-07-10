'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length)

  /* Show 3 visible cards — centre one is highlighted */
  const visible = [-1, 0, 1].map((offset) => {
    const idx = (active + offset + TESTIMONIALS.length) % TESTIMONIALS.length
    return { ...TESTIMONIALS[idx], offset }
  })

  return (
    <section className="section-py bg-[#0F172A] overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container-xl">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients "
          titleHighlight="Say"
          subtitle="Hear from students and researchers we've helped across the globe."
        />

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-6 min-h-[320px]">
          {visible.map(({ id, name, role, institution, content, rating, offset }) => (
            <AnimatePresence key={id} mode="popLayout">
              <motion.article
                key={id + offset}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.45,
                  scale: offset === 0 ? 1 : 0.88,
                  y: offset === 0 ? 0 : 20,
                  zIndex: offset === 0 ? 10 : 5,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-shrink-0 glass rounded-2xl p-8 flex flex-col gap-5
                            ${offset === 0
                              ? 'w-full max-w-[560px] border-white/[0.12]'
                              : 'hidden lg:flex w-full max-w-[380px] border-white/[0.05]'
                            }`}
              >
                {/* large quote mark */}
                <Quote className="w-8 h-8 text-[#2563EB]/40" aria-hidden="true" />

                {/* stars */}
                <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-white/10'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-[#CBD5E1] text-base leading-relaxed flex-1">
                  &ldquo;{content}&rdquo;
                </blockquote>

                <footer className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 font-[family-name:var(--font-poppins)]">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#F8FAFC] font-semibold text-sm">{name}</p>
                    <p className="text-[#CBD5E1] text-xs">{role} · {institution}</p>
                  </div>
                </footer>
              </motion.article>
            </AnimatePresence>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-xl glass border-white/[0.08] flex items-center justify-center text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-white/[0.2] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-[#2563EB]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-xl glass border-white/[0.08] flex items-center justify-center text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-white/[0.2] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
