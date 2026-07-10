'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star } from 'lucide-react'
import { PRICING_PLANS, SERVICES } from '@/lib/constants'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQSection from '@/components/sections/FAQSection'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

export default function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-[#F59E0B]/6 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center">
          <motion.span className="label-pill mb-5 inline-flex" {...fade()}>Pricing</motion.span>
          <motion.h1 {...fade(0.08)}
            className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-[#CBD5E1] text-lg max-w-xl mx-auto">
            No hidden fees. Get a personalised quote based on your specific requirements.
          </motion.p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-py bg-[#0A1020]">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fade(i * 0.12)}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-[#2563EB] shadow-[0_0_60px_rgba(37,99,235,0.4)] scale-[1.03]'
                    : 'glass'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-[#0F172A] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-current" aria-hidden="true" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-[family-name:var(--font-poppins)] font-bold text-xl mb-1 ${plan.highlighted ? 'text-white' : 'text-[#F8FAFC]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-[#CBD5E1]'}`}>{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className={`font-[family-name:var(--font-poppins)] font-bold text-4xl ${plan.highlighted ? 'text-white' : 'text-[#F8FAFC]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlighted ? 'text-blue-200' : 'text-[#CBD5E1]'}`}>/project</span>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-[#22C55E]'}`} aria-hidden="true" />
                      <span className={plan.highlighted ? 'text-blue-100' : 'text-[#CBD5E1]'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/request"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] shadow-lg'
                      : 'bg-white/[0.06] hover:bg-white/[0.10] text-[#F8FAFC] border border-white/[0.08]'
                  }`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.3)} className="mt-10 glass rounded-2xl p-5 max-w-2xl mx-auto text-center">
            <p className="text-[#CBD5E1] text-sm">
              <span className="font-semibold text-[#F59E0B]">Note:</span> Prices are indicative.
              Final pricing depends on complexity, word count, academic level, and deadline.
              Submit a request for an exact quote at no obligation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service price table */}
      <section className="section-py bg-[#0F172A]">
        <div className="container-xl max-w-4xl">
          <SectionHeader badge="Service Pricing" title="Starting Prices " titleHighlight="by Service"
            subtitle="All projects receive personalised quotes. These are indicative starting prices." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((s, i) => (
              <motion.div key={s.id} {...fade(i * 0.05)}
                className="glass rounded-2xl p-4 flex items-center justify-between hover:border-white/[0.14] transition-all">
                <span className="text-[#CBD5E1] text-sm">{s.title}</span>
                <span className="text-[#F59E0B] font-bold text-sm flex-shrink-0 ml-3">{s.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
