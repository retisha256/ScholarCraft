import type { Metadata } from 'next'
import HowItWorksPageClient from './HowItWorksPageClient'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how our simple 5-step process makes getting academic support easy and stress-free.',
}

export default function HowItWorksPage() {
  return <HowItWorksPageClient />
}
