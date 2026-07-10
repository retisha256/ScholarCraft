import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CookieConsent from '@/components/ui/CookieConsent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://academicpro.com'),
  title: {
    default: 'AcademicPro — Expert Academic Support Services',
    template: '%s | AcademicPro',
  },
  description:
    'Professional academic support including dissertation guidance, essay assistance, statistical analysis, editing and more. Trusted by 10,000+ students worldwide.',
  keywords: ['academic services', 'dissertation help', 'thesis support', 'essay writing', 'research guidance', 'statistical analysis', 'proofreading'],
  authors: [{ name: 'AcademicPro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AcademicPro',
    title: 'AcademicPro — Expert Academic Support Services',
    description: 'Professional academic support trusted by 10,000+ students worldwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AcademicPro — Expert Academic Support Services',
    description: 'Professional academic support trusted by 10,000+ students worldwide.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider>
          {children}
          <WhatsAppButton />
          <CookieConsent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#22C55E', secondary: '#F8FAFC' } },
              error:   { iconTheme: { primary: '#EF4444', secondary: '#F8FAFC' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
