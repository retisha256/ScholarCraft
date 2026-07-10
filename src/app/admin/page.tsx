import { createClient } from '@/lib/supabase/server'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch stats
  const [requestsResult, messagesResult, subscribersResult] = await Promise.all([
    supabase.from('project_requests').select('status, created_at'),
    supabase.from('contact_messages').select('id, created_at, replied'),
    supabase.from('newsletter_subscribers').select('id'),
  ])

  const requests = requestsResult.data || []
  const messages = messagesResult.data || []
  const subscribers = subscribersResult.data || []

  const stats = {
    totalRequests: requests.length,
    newRequests: requests.filter((r) => r.status === 'new').length,
    inProgress: requests.filter((r) => r.status === 'in-progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    totalMessages: messages.length,
    unrepliedMessages: messages.filter((m) => !m.replied).length,
    subscribers: subscribers.length,
  }

  return <AdminDashboardClient stats={stats} />
}
