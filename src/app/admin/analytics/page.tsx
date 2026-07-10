import { createClient } from '@/lib/supabase/server'
import AnalyticsClient from './AnalyticsClient'

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const [requestsRes, messagesRes, subscribersRes] = await Promise.all([
    supabase.from('project_requests').select('status, service_required, academic_level, created_at'),
    supabase.from('contact_messages').select('created_at'),
    supabase.from('newsletter_subscribers').select('created_at'),
  ])

  return (
    <AnalyticsClient
      requests={requestsRes.data || []}
      messages={messagesRes.data || []}
      subscribers={subscribersRes.data || []}
    />
  )
}
