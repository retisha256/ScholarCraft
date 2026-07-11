import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarcraft.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/services`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/pricing`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/how-it-works`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/request`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${siteUrl}/terms-of-service`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return staticPages
}
