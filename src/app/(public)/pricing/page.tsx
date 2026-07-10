import type { Metadata } from 'next'
import PricingPageClient from './PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent and affordable pricing for all academic support services. Starting from $15.',
}

export default function PricingPage() {
  return <PricingPageClient />
}
