import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import NewsletterForm from '@/components/sections/NewsletterForm'

const LINKS = {
  services: [
    ['Research Guidance',         '/services#research-guidance'],
    ['Dissertation Support',      '/services#dissertation-thesis'],
    ['Essay Assistance',          '/services#essay-assignment'],
    ['Literature Review',         '/services#literature-review'],
    ['Statistical Analysis',      '/services#statistical-analysis'],
    ['Editing & Proofreading',    '/services#editing-proofreading'],
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
  { label: 'Facebook',  href: 'https://facebook.com',  svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Twitter/X', href: 'https://twitter.com',   svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  svg: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Instagram', href: 'https://instagram.com', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060D1A] border-t border-white/[0.06]" role="contentinfo">
      {/* Newsletter band */}
      <div className="border-b border-white/[0.06]">
        <div className="container-xl py-12">
          <NewsletterForm />
        </div>
      </div>

      {/* Main columns */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5" aria-label="AcademicPro home">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] font-bold text-[#F8FAFC] text-lg">
                Academic<span className="text-[#F59E0B]">Pro</span>
              </span>
            </Link>

            <p className="text-[#475569] text-sm leading-relaxed">
              Professional academic support trusted by 10,000+ students and researchers across 50+ countries.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              {[
                { icon: Mail,  val: 'support@academicpro.com', href: 'mailto:support@academicpro.com' },
                { icon: Phone, val: '+1 (234) 567-890',        href: 'tel:+1234567890' },
                { icon: MapPin,val: 'Available Worldwide',     href: undefined },
              ].map(({ icon: Icon, val, href }) => (
                <div key={val} className="flex items-center gap-2 text-[#475569]">
                  <Icon className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-[#CBD5E1] transition-colors">{val}</a>
                  ) : <span>{val}</span>}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5 mt-1">
              {SOCIAL.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#475569] hover:text-[#F8FAFC] hover:border-white/[0.14] hover:bg-[#2563EB]/20 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d={svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.services.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#475569] hover:text-[#CBD5E1] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.company.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#475569] hover:text-[#CBD5E1] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + trust */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#F8FAFC] text-sm mb-5">
              Legal
            </h3>
            <ul className="flex flex-col gap-3 mb-8">
              {LINKS.legal.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#475569] hover:text-[#CBD5E1] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-xs text-[#475569] uppercase tracking-wider font-semibold mb-3">Trusted by</p>
              <div className="flex flex-wrap gap-2">
                {['10,000+ Students', '50+ Countries', '4.9 ★ Rating'].map((b) => (
                  <span key={b} className="text-xs bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/20 px-2.5 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#334155]">© {year} AcademicPro. All rights reserved.</p>
          <p className="text-xs text-[#334155]">Designed for academic excellence</p>
        </div>
      </div>
    </footer>
  )
}
