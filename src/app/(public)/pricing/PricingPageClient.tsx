'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star } from 'lucide-react'
import { PRICING_PLANS, SERVICES } from '@/lib/constants'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import FAQSection from '@/components/sections/FAQSection'
import { EASE } from '@/lib/motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.55, delay, ease: EASE },
})

export default function PricingPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-[#D4AF37]/6 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center">
          <motion.h1
            {...fade(0.08)}
            className="font-serif font-bold text-[#002147] text-[42px] lg:text-[60px] leading-tight tracking-tight mb-5"
          >
            Simple,{' '}
            <span className="text-gradient-gold">Transparent</span>
            {' '}Pricing
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-[#2D3748] text-lg max-w-xl mx-auto">
            No hidden fees. Every project receives a personalised quote based on your specific needs.
          </motion.p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-py bg-[#F5F1EB]">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fade(i * 0.12)}
                className={`relative rounded-2xl p-10 flex flex-col transition-all duration-300 ${plan.highlighted
                    ? 'bg-[#002147] text-white shadow-[0_20px_60px_rgba(0,33,71,0.25)] scale-[1.03]'
                    : 'bg-white border border-[#E2D9CC] shadow-md hover:shadow-xl hover:-translate-y-1'
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#002147] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg font-sans">
                      <Star className="w-3 h-3 fill-current" aria-hidden="true" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-serif font-bold text-2xl mb-1 ${plan.highlighted ? 'text-white' : 'text-[#002147]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm font-sans ${plan.highlighted ? 'text-blue-200' : 'text-[#6B7280]'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className={`font-serif font-bold text-5xl ${plan.highlighted ? 'text-white' : 'text-[#002147]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1.5 font-sans ${plan.highlighted ? 'text-blue-200' : 'text-[#6B7280]'}`}>
                    /project
                  </span>
                </div>

                <ul className="flex flex-col gap-3.5 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-sans">
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-[#D4AF37]' : 'text-[#16A34A]'}`}
                        aria-hidden="true"
                      />
                      <span className={plan.highlighted ? 'text-blue-100' : 'text-[#2D3748]'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/request"
                  className={`block w-full text-center py-4 rounded-xl font-semibold font-sans text-sm transition-all duration-200 ${plan.highlighted
                      ? 'bg-[#E07A5F] hover:bg-[#D4AF37] text-white shadow-lg hover:shadow-xl'
                      : 'bg-[#002147] hover:bg-[#E07A5F] text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            {...fade(0.3)}
            className="mt-12 bg-white border border-[#E2D9CC] rounded-2xl p-6 max-w-3xl mx-auto text-center shadow-sm"
          >
            <p className="text-[#2D3748] text-sm font-sans">
              <span className="font-semibold text-[#D4AF37]">Note:</span> Prices shown are indicative starting points.
              Final pricing depends on complexity, word count, academic level, and deadline.
              Submit a request for an exact personalised quote — no obligation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service price table */}
      <section className="section-py bg-[#FDFBF7]">
        <div className="container-xl max-w-4xl">
          <SectionHeader
            badge="Service Pricing"
            title="Starting Prices by Service"
            subtitle="All projects receive personalised quotes. These are indicative starting prices to help you plan."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                {...fade(i * 0.04)}
                className="bg-white border border-[#E2D9CC] rounded-2xl p-5 flex items-center justify-between hover:border-[#E07A5F]/40 hover:shadow-md transition-all duration-200"
              >
                <span className="text-[#2D3748] text-sm font-sans">{s.title}</span>
                <span className="text-[#E07A5F] font-bold text-sm font-sans flex-shrink-0 ml-3">{s.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
