import type { Metadata } from 'next'
import RequestFormClient from './RequestFormClient'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Submit your academic project request and receive a personalized quote within 2 hours.',
}

export default function RequestPage() {
  return <RequestFormClient />
}
