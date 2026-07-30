import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team for any questions about our academic support services.',
}

export default function ContactPage() {
  return (
    <div className="pt-16 bg-[#fdfbf7]">
      <ContactSection />
    </div>
  )
}
