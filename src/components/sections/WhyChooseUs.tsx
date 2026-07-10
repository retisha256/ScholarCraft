'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, Star, RefreshCw, HeadphonesIcon } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const FEATURES = [
  { icon: Shield,          title: '100% Confidential',    desc: 'NDA-protected. Your project and identity are never shared with anyone.', color: '#2563EB' },
  { icon: Award,           title: 'Qualified Experts',    desc: 'Every specialist holds a Master\'s or PhD from a top-ranked university.', color: '#F59E0B' },
  { icon: Clock,           title: 'On-Time Delivery',     desc: 'We guarantee delivery by your deadline — or your money back.', color: '#22C55E' },
  { icon: Star,            title: 'Exceptional Quality',  desc: 'Rigorous quality checks and plagiarism screening on every project.', color: '#A855F7' },
  { icon: RefreshCw,       title: 'Unlimited Revisions',  desc: 'Not satisfied? We revise until you\'re completely happy — no questions.', color: '#EC4899' },
  { icon: HeadphonesIcon,  title: '24/7 Support',         desc: 'Reach us any time via email, WhatsApp, or live chat. We\'re always here.', color: '#06B6D4' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-[#0A1020]" aria-labelledby="why-heading">
      {/* subtle top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-20" aria-hidden="true" />

      <div className="container-xl">
        <SectionHeader
          badge="Why Choose Us"
          title="The AcademicPro "
          titleHighlight="Advantage"
          subtitle="We combine world-class academic expertise with a genuine commitment to your success."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative glass rounded-2xl p-7 hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              {/* icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
              </div>

              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-lg mb-2">
                {title}
              </h3>
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                {desc}
              </p>

              {/* hover top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-20" aria-hidden="true" />
    </section>
  )
}
