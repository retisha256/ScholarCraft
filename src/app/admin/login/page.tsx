import type { Metadata } from 'next'
import AdminLoginClient from './AdminLoginClient'

export const metadata: Metadata = {
  title: 'Admin Login | AcademicPro',
  robots: { index: false },
}

export default function AdminLoginPage() {
  return <AdminLoginClient />
}
