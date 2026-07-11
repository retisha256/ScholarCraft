import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import '@/styles/typography.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CookieConsent from '@/components/ui/CookieConsent'
import SkipLink from '@/components/ui/SkipLink'

/* ── Fonts ───────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarcraft.com'),
  title: {
    default: 'ScholarCraft — Expert Academic Support Services',
    template: '%s | ScholarCraft',
  },
  description:
    'Professional academic support including dissertation guidance, essay assistance, statistical analysis, editing and more. Trusted by 10,000+ students worldwide.',
  keywords: [
    'academic services', 'dissertation help', 'thesis support',
    'essay writing', 'research guidance', 'statistical analysis', 'proofreading',
  ],
  authors: [{ name: 'ScholarCraft' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ScholarCraft',
    title: 'ScholarCraft — Expert Academic Support Services',
    description: 'Professional academic support trusted by 10,000+ students worldwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarCraft — Expert Academic Support Services',
    description: 'Professional academic support trusted by 10,000+ students worldwide.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable}`}>
        <ThemeProvider>
          <SkipLink />
          {children}
          <WhatsAppButton />
          <CookieConsent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4500,
              style: {
                background: '#FFFFFF',
                color: '#2D3748',
                border: '1px solid #E2D9CC',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 16px',
                boxShadow: '0 4px 20px rgba(0,33,71,0.12)',
                maxWidth: '380px',
              },
              success: { iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' } },
              error:   { iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
