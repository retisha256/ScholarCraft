import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export default async function AdminSubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  const list = subscribers || []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Newsletter Subscribers</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {list.length} subscriber{list.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {list.length === 0 ? (
          <div className="py-20 text-center text-slate-500">No subscribers yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">#</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Email</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Status</th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {list.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-5 py-3.5 text-slate-500">{index + 1}</td>
                  <td className="px-5 py-3.5 text-slate-900 dark:text-white font-medium">{sub.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${sub.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500'}`}>
                      {sub.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{formatDate(sub.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
