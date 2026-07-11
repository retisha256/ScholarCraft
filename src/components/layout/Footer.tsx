import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import NewsletterForm from '@/components/sections/NewsletterForm'

const PHONE      = '+256 764 929546'
const PHONE_HREF = 'tel:+256764929546'

const LINKS = {
  services: [
    ['Research Guidance',      '/services#research-guidance'],
    ['Dissertation Support',   '/services#dissertation-thesis'],
    ['Essay Assistance',       '/services#essay-assignment'],
    ['Literature Review',      '/services#literature-review'],
    ['Statistical Analysis',   '/services#statistical-analysis'],
    ['Editing & Proofreading', '/services#editing-proofreading'],
  ],
  company: [
    ['About Us',        '/about'],
    ['How It Works',    '/how-it-works'],
    ['Pricing',         '/pricing'],
    ['Blog',            '/blog'],
    ['Contact',         '/contact'],
    ['Request a Quote', '/request'],
  ],
  legal: [
    ['Privacy Policy',   '/privacy-policy'],
    ['Terms of Service', '/terms-of-service'],
    ['Cookie Policy',    '/privacy-policy#cookies'],
    ['Refund Policy',    '/terms-of-service#refunds'],
  ],
}

const SOCIAL = [
  { label: 'Facebook',  href: 'https://facebook.com',  d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'X/Twitter', href: 'https://twitter.com',   d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Instagram', href: 'https://instagram.com', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#F8F6F2] text-[var(--text-primary)]" role="contentinfo">
      <div className="container-xl py-16">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-soft mb-12">
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3" aria-label="ScholarCraft home">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-[var(--text-inverse)]">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold">ScholarCraft</p>
                <p className="text-sm text-[var(--text-secondary)]">Academic support with a scholarly touch.</p>
              </div>
            </Link>

            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              Trusted by students and researchers worldwide for thoughtful guidance, rigorous review, and expert project support.
            </p>

            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <a href="mailto:support@scholarcraft.com" className="transition-colors hover:text-[var(--accent-dark)]">support@scholarcraft.com</a>
              <a href={PHONE_HREF} className="transition-colors hover:text-[var(--accent-dark)]">{PHONE}</a>
              <p>Available globally</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-5">Services</p>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {LINKS.services.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[var(--accent-dark)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-5">Company</p>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {LINKS.company.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[var(--accent-dark)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-5">Legal</p>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-8">
              {LINKS.legal.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[var(--accent-dark)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--accent-dark)] mb-4">Trusted by</p>
              <div className="flex flex-wrap gap-2">
                {['10,000+ Students', '50+ Countries', '4.9★ Rating'].map((badge) => (
                  <span key={badge} className="rounded-full border border-[var(--border)] bg-[var(--bg-surface-soft)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[#F4F1EC]">
        <div className="container-xl flex flex-col gap-4 py-6 sm:flex-row sm:justify-between sm:items-center text-sm text-[var(--text-secondary)]">
          <p>© {year} ScholarCraft. All rights reserved.</p>
          <p>Designed for clarity, trust, and academic confidence.</p>
        </div>
      </div>
    </footer>
  )
}
