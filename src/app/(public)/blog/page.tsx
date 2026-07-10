import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Academic tips, research guidance, and writing resources from our expert team.',
}

export default function BlogPage() {
  return <BlogPageClient />
}
