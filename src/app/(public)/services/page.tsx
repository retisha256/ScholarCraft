import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our comprehensive academic support services including dissertation guidance, essay assistance, statistical analysis, editing, and more.',
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
