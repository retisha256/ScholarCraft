import { createClient } from '@/lib/supabase/server'
import RequestsClient from './RequestsClient'

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('project_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.status) {
    query = query.eq('status', params.status)
  }

  const { data: requests, error } = await query

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load requests. Please check your Supabase configuration.</p>
      </div>
    )
  }

  return <RequestsClient requests={requests || []} currentStatus={params.status} />
}
