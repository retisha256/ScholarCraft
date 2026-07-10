'use client'

import { motion } from 'framer-motion'
import { Target, Heart, Award, Globe } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Link from 'next/link'

const TEAM = [
  { name: 'Dr. Elizabeth Carter',  role: 'Founder & Academic Director', spec: 'Educational Psychology · Oxford', init: 'EC', color: '#2563EB' },
  { name: 'Prof. Michael Adebayo', role: 'Head of Research',            spec: 'Social Sciences · Harvard',     init: 'MA', color: '#F59E0B' },
  { name: 'Dr. Priya Sharma',      role: 'Lead Statistical Analyst',    spec: 'Biostatistics · Johns Hopkins', init: 'PS', color: '#22C55E' },
  { name: 'James Whitfield',       role: 'Senior Academic Writer',      spec: 'English Lit · Edinburgh',       init: 'JW', color: '#A855F7' },
]

const VALUES = [
  { icon: Target, title: 'Purpose-Driven',  desc: 'Every service designed to maximise your academic success.', color: '#2563EB' },
  { icon: Heart,  title: 'Student-First',   desc: 'Your wellbeing and learning are our top priority.',          color: '#EC4899' },
  { icon: Award,  title: 'Excellence',      desc: 'We set the highest standards for every project we handle.',  color: '#F59E0B' },
  { icon: Globe,  title: 'Inclusive',       desc: 'Serving students from all disciplines and backgrounds.',     color: '#22C55E' },
]

const MILESTONES = [
  { year: '2018', event: 'Founded with a mission to democratise academic support' },
  { year: '2019', event: 'Reached 1,000 satisfied clients across 20 countries' },
  { year: '2021', event: 'Expanded team to 50+ expert academics and specialists' },
  { year: '2023', event: 'Surpassed 10,000 completed projects globally' },
  { year: '2024', event: 'Launched advanced statistical analysis services' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

export default function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#2563EB]/8 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <motion.span className="label-pill mb-5 inline-flex" {...fade()}>About Us</motion.span>
          <motion.h1 {...fade(0.08)}
            className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5">
            Our Story &amp; <span className="text-gradient">Mission</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-[#CBD5E1] text-lg leading-relaxed">
            Founded by academics, for academics. We believe every student deserves access to
            expert guidance regardless of background.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-py bg-[#0A1020]">
        <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()}>
            <span className="label-pill mb-5 inline-flex">Our Mission</span>
            <h2 className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[32px] lg:text-[40px] leading-tight tracking-tight mb-5">
              Empowering Academic Excellence Worldwide
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed mb-4">
              AcademicPro was born from a simple belief: every student deserves access to
              high-quality academic guidance, regardless of their institution or location.
              Founded in 2018 by a team of academics, we set out to bridge the gap between
              academic potential and achievement.
            </p>
            <p className="text-[#CBD5E1] text-base leading-relaxed mb-8">
              Today, we&apos;ve supported over 10,000 students and researchers across 50+ countries,
              helping them submit stronger dissertations, write more compelling essays, and
              achieve the grades they are capable of.
            </p>
            <Link href="/request"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
              Work With Us
            </Link>
          </motion.div>

          <motion.div {...fade(0.1)} className="grid grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass rounded-2xl p-6 hover:border-white/[0.14] transition-all hover:-translate-y-0.5 duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                </div>
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-1">{title}</p>
                <p className="text-[#CBD5E1] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-[#0F172A]">
        <div className="container-xl">
          <SectionHeader badge="Our Team" title="Meet the " titleHighlight="Experts"
            subtitle="PhD holders and Master's graduates from the world's top universities." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} {...fade(i * 0.08)}
                className="glass rounded-2xl p-6 text-center hover:border-white/[0.14] transition-all hover:-translate-y-1 duration-300">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-[family-name:var(--font-poppins)] mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
                  {m.init}
                </div>
                <p className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-1">{m.name}</p>
                <p className="text-xs text-[#2563EB] mb-1">{m.role}</p>
                <p className="text-xs text-[#475569]">{m.spec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-[#0A1020]">
        <div className="container-xl max-w-2xl mx-auto">
          <SectionHeader badge="Our Journey" title="Growth &amp; " titleHighlight="Milestones"
            subtitle="Six years of serving students and expanding our global impact." />
          <div className="relative pl-8 border-l border-white/[0.06] space-y-8">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} {...fade(i * 0.08)} className="relative">
                <div className="absolute -left-[2.15rem] w-4 h-4 rounded-full bg-[#2563EB] border-4 border-[#0A1020]" aria-hidden="true" />
                <div className="glass rounded-2xl p-5">
                  <span className="text-xs font-bold text-[#2563EB] tracking-widest uppercase font-[family-name:var(--font-poppins)]">{m.year}</span>
                  <p className="text-[#CBD5E1] text-sm mt-1 leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
