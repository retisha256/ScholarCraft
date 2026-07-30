'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Clock3, Sparkles } from 'lucide-react'
import { EASE } from '@/lib/motion'

const TRUST_BADGES = [
  { icon: ShieldCheck, text: 'Confidential' },
  { icon: Clock3, text: 'Timely delivery' },
  { icon: Sparkles, text: 'Personalised guidance' },
]

export default function HeroSection() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-[#fdfbf7] pt-24 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#e07a5f]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#002147]/8 blur-3xl" />
      </div>

      <div className="container-xl relative z-10 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-2xl">
            <h1 className="text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#002147] sm:text-[3rem] lg:text-[3.8rem]">
              Professional academic support for research, writing, editing, and dissertation success.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4a5568]">
              ScholarCraft provides thoughtful guidance for dissertations, essays, literature reviews, editing, and statistical analysis with a premium, human-centred approach.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/request"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-10 text-sm font-semibold text-white shadow-sm transition duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#e8e5df] bg-white px-10 text-sm font-semibold text-[#002147] shadow-sm transition duration-200 transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#f8f6f2]"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 rounded-full border border-[#e8e5df] bg-white px-4 py-2 text-sm font-medium text-[#2d3748] shadow-sm">
                  <Icon className="h-4 w-4 text-[#2f855a]" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[#002147]/8 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e8e5df] bg-white p-4 shadow-[0_18px_45px_rgba(0,33,71,0.08)] sm:p-6">
              <Image src="/hero-illustration.svg" alt="Illustration of academic research and writing support" width={760} height={640} priority className="w-full rounded-[1.5rem]" />
              <div className="mt-4 grid gap-3 rounded-[1.5rem] border border-[#e8e5df] bg-[#f8f6f2] p-5 sm:grid-cols-3">
                {[
                  { value: '50,000+', label: 'Projects supported' },
                  { value: '98%', label: 'Client satisfaction' },
                  { value: '24/7', label: 'Customer support' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-serif text-xl font-semibold text-[#002147]">{stat.value}</p>
                    <p className="mt-1 text-sm text-[#718096]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
