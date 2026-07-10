import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { GraduationCap, Users, Target, Heart } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AcademicPro – our mission, our expert team, and our commitment to supporting student success worldwide.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
