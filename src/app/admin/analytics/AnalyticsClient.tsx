'use client'

import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, Users, FileText } from 'lucide-react'

interface AnalyticsProps {
  requests: { status: string; service_required: string; academic_level: string; created_at: string }[]
  messages: { created_at: string }[]
  subscribers: { created_at: string }[]
}

export default function AnalyticsClient({ requests, messages, subscribers }: AnalyticsProps) {
  // Service breakdown
  const serviceCount = requests.reduce((acc, r) => {
    const key = r.service_required.replace(/-/g, ' ')
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])
  const maxService = sortedServices[0]?.[1] || 1

  // Academic level breakdown
  const levelCount = requests.reduce((acc, r) => {
    acc[r.academic_level] = (acc[r.academic_level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedLevels = Object.entries(levelCount).sort((a, b) => b[1] - a[1])
  const maxLevel = sortedLevels[0]?.[1] || 1

  // Monthly requests (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const count = requests.filter((r) => r.created_at.startsWith(monthKey)).length
    return { month: d.toLocaleDateString('en-US', { month: 'short' }), count }
  })

  const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Overview of your business metrics</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Requests', value: requests.length, icon: FileText, color: 'text-blue-600' },
          { label: 'Messages', value: messages.length, icon: TrendingUp, color: 'text-purple-600' },
          { label: 'Subscribers', value: subscribers.length, icon: Users, color: 'text-green-600' },
          { label: 'Completion Rate', value: `${Math.round((requests.filter((r) => r.status === 'completed').length / Math.max(requests.length, 1)) * 100)}%`, icon: BarChart2, color: 'text-amber-600' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
          >
            <Icon className={`w-6 h-6 ${color} mb-3`} aria-hidden="true" />
            <div className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly requests chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-base font-semibold font-poppins text-slate-900 dark:text-white mb-5">Requests (Last 6 Months)</h2>
          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyData.map(({ month, count }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue-600 rounded-t-lg transition-all"
                  style={{ height: `${(count / maxMonthly) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                  aria-label={`${month}: ${count} requests`}
                />
                <div className="text-xs text-slate-500 dark:text-slate-400">{month}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{count}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-base font-semibold font-poppins text-slate-900 dark:text-white mb-5">Popular Services</h2>
          <div className="space-y-3">
            {sortedServices.slice(0, 6).map(([service, count]) => (
              <div key={service}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 capitalize">{service}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(count / maxService) * 100}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
            {sortedServices.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-8">No data yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
