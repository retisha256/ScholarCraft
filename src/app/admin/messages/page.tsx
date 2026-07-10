import { createClient } from '@/lib/supabase/server'
import MessagesClient from './MessagesClient'

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ replied?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.replied === 'false') {
    query = query.eq('replied', false)
  }

  const { data: messages } = await query

  return <MessagesClient messages={messages || []} />
}
