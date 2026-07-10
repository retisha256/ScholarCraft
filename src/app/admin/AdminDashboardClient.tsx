'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ClipboardList,
  MessageSquare,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

interface Stats {
  totalRequests: number
  newRequests: number
  inProgress: number
  completed: number
  totalMessages: number
  unrepliedMessages: number
  subscribers: number
}

export default function AdminDashboardClient({ stats }: { stats: Stats }) {
  const statCards = [
    {
      label: 'Total Requests',
      value: stats.totalRequests,
      icon: ClipboardList,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      href: '/admin/requests',
    },
    {
      label: 'New Requests',
      value: stats.newRequests,
      icon: AlertCircle,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      href: '/admin/requests?status=new',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      href: '/admin/requests?status=in-progress',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      href: '/admin/requests?status=completed',
    },
    {
      label: 'Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
      href: '/admin/messages',
    },
    {
      label: 'Unreplied',
      value: stats.unrepliedMessages,
      icon: MessageSquare,
      color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      href: '/admin/messages?replied=false',
    },
    {
      label: 'Newsletter',
      value: stats.subscribers,
      icon: Users,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      href: '/admin/subscribers',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                href={card.href}
                className="block bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-1">
                  {card.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{card.label}</div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold font-poppins text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/requests"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
          >
            <ClipboardList className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span className="font-medium text-blue-700 dark:text-blue-300 text-sm">View All Requests</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-purple-600" aria-hidden="true" />
            <span className="font-medium text-purple-700 dark:text-purple-300 text-sm">Read Messages</span>
          </Link>
          <Link
            href="/admin/blog"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
            <span className="font-medium text-green-700 dark:text-green-300 text-sm">Manage Blog</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
