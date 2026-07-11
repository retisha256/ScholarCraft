'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Search, BookOpen, PenTool, Library, FileText, AlignLeft, BarChart2, Monitor } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES } from '@/lib/constants'
import { EASE } from '@/lib/motion'

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, PenTool, Library, FileText, AlignLeft, BarChart2, Monitor,
}

const PREVIEW = SERVICES.slice(0, 6)

export default function ServicesOverview() {
  return (
    <section className="section-py bg-[#fdfbf7]" aria-labelledby="services-heading">
      <div className="container-xl">
        <SectionHeader badge="Our Services" title="Specialist support for every stage of academic work" subtitle="From undergraduate essays to doctoral dissertations, we offer calm, reliable support that strengthens your work without compromising standards." />

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {PREVIEW.map((service, index) => {
            const Icon = ICON_MAP[service.icon]
            return (
              <motion.article key={service.id} id={service.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }} className="group card-base p-10 border-[#e8e5df]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8f6f2] text-[#002147]">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </div>
                  <span className="rounded-full border border-[#e8e5df] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e07a5f]">{service.price}</span>
                </div>
                <h3 className="mt-8 font-serif text-[1.35rem] font-semibold text-[#002147]">{service.title}</h3>
                <p className="mt-5 text-sm leading-8 text-[#4a5568]">{service.description}</p>
                <ul className="mt-8 space-y-3" aria-label="Service highlights">
                  {service.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#4a5568]">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#2f855a]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/request?service=${service.id}`} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] transition-colors hover:text-[var(--accent-dark)]">
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn-outline inline-flex">View all services</Link>
        </div>
      </div>
    </section>
  )
}
