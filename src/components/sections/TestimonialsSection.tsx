'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/constants'
import { EASE } from '@/lib/motion'

export default function TestimonialsSection() {
  return (
    <section className="section-py bg-[#fdfbf7]" aria-labelledby="testimonials-heading">
      <div className="container-xl">
        <SectionHeader badge="Testimonials" title="Students and researchers trust us for thoughtful guidance" subtitle="Here is what clients say about our approach to quality, clarity, and support." />

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <motion.article key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }} className="rounded-[1.75rem] border border-[#e8e5df] bg-white p-7 shadow-[0_10px_35px_rgba(0,33,71,0.05)]">
              <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className={`h-4 w-4 ${starIndex < testimonial.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-[#e8e5df]'}`} aria-hidden="true" />
                ))}
              </div>
              <Quote className="mt-6 h-8 w-8 text-[#e07a5f]/30" aria-hidden="true" />
              <blockquote className="mt-4 text-sm leading-8 text-[#4a5568]">“{testimonial.content}”</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-[#f8f6f2] pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#002147] font-semibold text-white">{testimonial.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-[#002147]">{testimonial.name}</p>
                  <p className="text-sm text-[#718096]">{testimonial.role} · {testimonial.institution}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
