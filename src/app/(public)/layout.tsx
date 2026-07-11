import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import StickyCTA from '@/components/ui/StickyCTA'
import PageTransition from '@/components/layout/PageTransition'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import OfflineDetector from '@/components/ui/OfflineDetector'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      {/* Breadcrumbs sit below the fixed navbar */}
      <Breadcrumbs />

      <PageTransition>
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </PageTransition>

      <Footer />

      {/* Mobile-only enhancements */}
      <MobileBottomNav />
      <StickyCTA />

      {/* Offline/online toast handler */}
      <OfflineDetector />
    </>
  )
}
