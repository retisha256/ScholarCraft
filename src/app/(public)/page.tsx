import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import StatsSection from '@/components/sections/StatsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'AcademicPro — Expert Academic Support Services',
  description:
    'Professional academic support including dissertation guidance, essay assistance, statistical analysis, and more. Trusted by 10,000+ students worldwide.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <WhyChooseUs />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  )
}
