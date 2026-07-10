'use client'

import { motion } from 'framer-motion'
import {
  Search, BookOpen, PenTool, Library, FileText,
  CheckCircle, AlignLeft, BarChart2, Monitor, ArrowRight,
} from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, PenTool, Library, FileText,
  CheckCircle, AlignLeft, BarChart2, Monitor,
}

export default function ServicesPageClient() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/8 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label-pill mb-5 inline-flex">
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5"
          >
            Expert Support for Every{' '}
            <span className="text-gradient">Academic Need</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-[#CBD5E1] text-lg max-w-xl mx-auto"
          >
            Nine specialised services covering every stage of your academic journey, at every level of study.
          </motion.p>
        </div>
      </section>

      {/* Services — alternating rows */}
      <section className="section-py bg-[#0F172A]">
        <div className="container-xl">
          <div className="flex flex-col gap-24">
            {SERVICES.map((service, idx) => {
              const Icon = ICON_MAP[service.icon]
              const isEven = idx % 2 === 0
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                  {/* Text */}
                  <div className={`flex flex-col gap-6 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center">
                        {Icon && <Icon className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1 rounded-full">
                        {service.price}
                      </span>
                    </div>

                    <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[28px] lg:text-[32px] leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[480px]">
                      {service.description}
                    </p>

                    <ul className="flex flex-col gap-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                          <span className="w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-[#22C55E]" aria-hidden="true" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/request?service=${service.id}`}
                      className="group self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 mt-2"
                    >
                      Request This Service
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-[#2563EB]/8 blur-2xl scale-90" aria-hidden="true" />
                      <div className="relative glass rounded-3xl p-10 flex flex-col items-center justify-center min-h-[300px] gap-5 hover:border-[#2563EB]/25 transition-colors duration-500">
                        <div className="w-20 h-20 rounded-3xl bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center">
                          {Icon && <Icon className="w-10 h-10 text-[#2563EB]" aria-hidden="true" />}
                        </div>
                        <div className="text-center">
                          <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-xl mb-2">{service.title}</p>
                          <p className="text-[#CBD5E1] text-sm">Confidential · Expert · On-Time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 bg-[#0A1020]">
        <div className="container-xl text-center">
          <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[36px] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[#CBD5E1] text-base mb-8 max-w-md mx-auto">
            Submit your request today and receive a personalised quote within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all">
              Request a Quote
            </Link>
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/[0.12] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-white/20 font-semibold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
