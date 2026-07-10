'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, BookOpen, PenTool, Library, FileText,
  CheckCircle, AlignLeft, BarChart2, Monitor, ArrowRight,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, PenTool, Library, FileText,
  CheckCircle, AlignLeft, BarChart2, Monitor,
}

/* Only show first 4 on the home page */
const PREVIEW = SERVICES.slice(0, 4)

export default function ServicesOverview() {
  return (
    <section className="section-py bg-[#0F172A]" aria-labelledby="services-heading">
      <div className="container-xl">
        <SectionHeader
          badge="Our Services"
          title="Academic Excellence at "
          titleHighlight="Every Level"
          subtitle="Nine specialised services covering every stage of your academic journey, from undergraduate essays to doctoral dissertations."
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {PREVIEW.map((service, idx) => {
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
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
              >
                {/* Text block — alternates side */}
                <div className={`flex flex-col gap-6 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/15 flex items-center justify-center border border-[#2563EB]/20">
                      {Icon && <Icon className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[28px] leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-[#CBD5E1] text-base leading-relaxed max-w-[480px]">
                    {service.description}
                  </p>

                  <ul className="flex flex-col gap-3" aria-label="Service features">
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
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#60A5FA] transition-colors mt-2 self-start"
                  >
                    Request this service
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>

                {/* Visual card */}
                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    {/* glow */}
                    <div className="absolute inset-0 rounded-3xl bg-[#2563EB]/10 blur-2xl scale-90" aria-hidden="true" />
                    <div className="relative glass rounded-3xl p-10 flex flex-col items-center justify-center min-h-[320px] gap-5 border border-white/[0.08] hover:border-[#2563EB]/30 transition-colors duration-500">
                      <div className="w-20 h-20 rounded-3xl bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
                        {Icon && <Icon className="w-10 h-10 text-[#2563EB]" aria-hidden="true" />}
                      </div>
                      <div className="text-center">
                        <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-xl mb-2">
                          {service.title}
                        </p>
                        <p className="text-[#CBD5E1] text-sm">
                          Professional · Confidential · On-Time
                        </p>
                      </div>
                      {/* decorative dots */}
                      <div className="absolute bottom-6 right-6 flex gap-1.5" aria-hidden="true">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/40" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-[#CBD5E1] hover:text-[#F8FAFC] hover:border-white/20 hover:bg-white/[0.04] font-semibold transition-all duration-300"
          >
            View all 9 services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
