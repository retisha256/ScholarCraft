'use client'

import { motion } from 'framer-motion'
import { Target, Heart, Award, Globe } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { EASE } from '@/lib/motion'

const TEAM = [
  { name: 'Dr. Elizabeth Carter',  role: 'Founder & Academic Director', spec: 'Educational Psychology · Oxford',  init: 'EC', color: '#002147' },
  { name: 'Prof. Michael Adebayo', role: 'Head of Research',             spec: 'Social Sciences · Harvard',       init: 'MA', color: '#E07A5F' },
  { name: 'Dr. Priya Sharma',      role: 'Lead Statistical Analyst',     spec: 'Biostatistics · Johns Hopkins',   init: 'PS', color: '#16A34A' },
  { name: 'James Whitfield',       role: 'Senior Academic Writer',       spec: 'English Literature · Edinburgh',  init: 'JW', color: '#D4AF37' },
]

const VALUES = [
  { icon: Target, title: 'Purpose-Driven',  desc: 'Every service designed to maximise your academic success.',    color: '#002147' },
  { icon: Heart,  title: 'Student-First',   desc: 'Your wellbeing and learning journey are always our priority.', color: '#E07A5F' },
  { icon: Award,  title: 'Excellence',      desc: 'We maintain the highest standards for every project we handle.', color: '#D4AF37' },
  { icon: Globe,  title: 'Inclusive',       desc: 'Serving students from every discipline and background.',        color: '#16A34A' },
]

const MILESTONES = [
  { year: '2018', event: 'Founded with a mission to democratise access to academic support' },
  { year: '2019', event: 'Reached 1,000 satisfied clients across 20 countries' },
  { year: '2021', event: 'Expanded team to 50+ expert academics and research specialists' },
  { year: '2023', event: 'Surpassed 10,000 completed projects globally' },
  { year: '2024', event: 'Launched advanced statistical analysis services' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: '-50px' as const },
  transition: { duration: 0.6, delay, ease: EASE },
})

export default function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 left-1/3 w-[500px] h-[400px] bg-[#002147]/5 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <motion.span className="label-pill mb-5 inline-flex" {...fade()}>About Us</motion.span>
          <motion.h1
            {...fade(0.08)}
            className="font-serif font-bold text-[#002147] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5"
          >
            Our Story &amp; <span className="text-gradient">Mission</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-[#2D3748] text-lg leading-relaxed font-sans">
            Founded by academics, for academics. We believe every student deserves access
            to expert guidance regardless of background or institution.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-py bg-[#F5F1EB]">
        <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()}>
            <span className="label-pill mb-5 inline-flex">Our Mission</span>
            <h2 className="font-serif font-bold text-[#002147] text-[32px] lg:text-[40px] leading-tight tracking-tight mb-5">
              Empowering Academic Excellence Worldwide
            </h2>
            <p className="text-[#2D3748] text-base leading-relaxed mb-4 font-sans max-w-prose">
              ScholarCraft was born from a simple belief: every student deserves access to
              high-quality academic guidance, regardless of their institution or location.
              Founded in 2018 by a team of academics, we set out to bridge the gap between
              academic potential and genuine achievement.
            </p>
            <p className="text-[#2D3748] text-base leading-relaxed mb-8 font-sans max-w-prose">
              Today, we&apos;ve supported over 10,000 students and researchers across 50+ countries,
              helping them produce stronger dissertations, more compelling essays, and the grades
              their hard work deserves.
            </p>
            <Link
              href="/request"
              className="btn-primary inline-flex"
            >
              Work With Us
            </Link>
          </motion.div>

          <motion.div {...fade(0.1)} className="grid grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-[#E2D9CC] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                </div>
                <p className="font-serif font-semibold text-[#002147] text-sm mb-1">{title}</p>
                <p className="text-[#6B7280] text-xs leading-relaxed font-sans">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-[#FDFBF7]">
        <div className="container-xl">
          <SectionHeader
            badge="Our Team"
            title="Meet the Experts"
            subtitle="PhD holders and Master's graduates from the world's top universities."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                {...fade(i * 0.08)}
                className="bg-white rounded-2xl p-7 text-center border border-[#E2D9CC] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-sans mx-auto mb-5"
                  style={{ background: m.color }}
                  aria-hidden="true"
                >
                  {m.init}
                </div>
                <p className="font-serif font-semibold text-[#002147] text-sm mb-1">{m.name}</p>
                <p className="text-xs text-[#E07A5F] font-sans mb-1">{m.role}</p>
                <p className="text-xs text-[#9CA3AF] font-sans">{m.spec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-[#002147]">
        <div className="container-xl max-w-2xl mx-auto">
          <SectionHeader
            badge="Our Journey"
            title="Growth & Milestones"
            subtitle="Six years of serving students and expanding our global impact."
            light
          />
          <div className="relative pl-8 border-l border-white/[0.12] space-y-8">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} {...fade(i * 0.08)} className="relative">
                <div
                  className="absolute -left-[2.15rem] w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#002147]"
                  aria-hidden="true"
                />
                <div className="bg-white/[0.06] border border-white/[0.10] rounded-2xl p-5">
                  <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase font-sans">
                    {m.year}
                  </span>
                  <p className="text-blue-200 text-sm mt-1 leading-relaxed font-sans">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
