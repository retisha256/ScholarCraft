/**
 * Breadcrumbs — auto-generates breadcrumbs from the current pathname.
 * Outputs proper JSON-LD structured data for SEO.
 *
 * Usage (inside any page component):
 *   <Breadcrumbs />
 *
 * Renders nothing on the homepage.
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const LABEL_MAP: Record<string, string> = {
  about:           'About Us',
  services:        'Services',
  pricing:         'Pricing',
  'how-it-works':  'How It Works',
  blog:            'Blog',
  contact:         'Contact',
  request:         'Request a Quote',
  'privacy-policy':'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  admin:           'Admin',
  requests:        'Requests',
  messages:        'Messages',
  analytics:       'Analytics',
  subscribers:     'Subscribers',
  settings:        'Settings',
}

function toLabel(segment: string): string {
  return LABEL_MAP[segment] ?? segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: toLabel(seg),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}${c.href}`,
    })),
  }

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-label="Breadcrumb"
        className="container-xl pt-4 pb-0"
      >
        <ol className="flex items-center flex-wrap gap-1 text-xs text-[#475569]" role="list">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {i === 0 && (
                  <Home className="w-3 h-3 mr-0.5 flex-shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="text-[#CBD5E1] font-medium"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="hover:text-[#CBD5E1] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </motion.nav>
    </>
  )
}
