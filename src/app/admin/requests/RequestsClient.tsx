'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, ExternalLink, Filter } from 'lucide-react'
import type { ProjectRequest, RequestStatus } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const STATUS_LABELS: Record<RequestStatus, string> = {
  new: 'New',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const STATUS_COLORS: Record<RequestStatus, string> = {
  new: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function RequestsClient({
  requests,
  currentStatus,
}: {
  requests: ProjectRequest[]
  currentStatus?: string
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const filtered = requests.filter((req) => {
    const q = searchQuery.toLowerCase()
    return (
      req.full_name.toLowerCase().includes(q) ||
      req.email.toLowerCase().includes(q) ||
      req.project_topic.toLowerCase().includes(q) ||
      req.service_required.toLowerCase().includes(q)
    )
  })

  const updateStatus = async (id: string, status: RequestStatus) => {
    setUpdating(id)
    const supabase = createClient()
    const { error } = await supabase
      .from('project_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update status')
    } else {
      toast.success('Status updated')
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status })
      }
    }
    setUpdating(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Project Requests</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {filtered.length} request{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name, email, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
            aria-label="Search requests"
          />
        </div>

        <div className="flex gap-2">
          {(['', 'new', 'in-progress', 'completed', 'cancelled'] as const).map((s) => (
            <a
              key={s || 'all'}
              href={s ? `/admin/requests?status=${s}` : '/admin/requests'}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                currentStatus === s || (!currentStatus && !s)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s ? STATUS_LABELS[s as RequestStatus] : 'All'}
            </a>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            No requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="grid" aria-label="Project requests">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Client</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Service</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Level</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Deadline</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Status</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((req) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{req.full_name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{req.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-slate-700 dark:text-slate-300 capitalize">
                        {req.service_required.replace(/-/g, ' ')}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400 capitalize">
                      {req.academic_level}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400">
                      {req.deadline}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value as RequestStatus)}
                        disabled={updating === req.id}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[req.status]}`}
                        aria-label={`Update status for ${req.full_name}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors"
                          aria-label={`View details for ${req.full_name}`}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </button>
                        {req.file_url && (
                          <a
                            href={req.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 rounded-lg transition-colors"
                            aria-label={`Download file for ${req.full_name}`}
                          >
                            <Download className="w-4 h-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-detail-title"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedRequest(null) }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 id="request-detail-title" className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
                Request Details
              </h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Name', value: selectedRequest.full_name },
                { label: 'Email', value: selectedRequest.email },
                { label: 'Phone', value: selectedRequest.phone },
                { label: 'Country', value: selectedRequest.country },
                { label: 'Institution', value: selectedRequest.institution || '—' },
                { label: 'Academic Level', value: selectedRequest.academic_level },
                { label: 'Service', value: selectedRequest.service_required },
                { label: 'Deadline', value: selectedRequest.deadline },
                { label: 'Pages', value: selectedRequest.number_of_pages?.toString() || '—' },
                { label: 'Citation', value: selectedRequest.citation_style || '—' },
                { label: 'Budget', value: selectedRequest.budget || '—' },
                { label: 'Submitted', value: formatDate(selectedRequest.created_at) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
                  <p className="text-slate-900 dark:text-white font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>

            {selectedRequest.project_topic && (
              <div className="mt-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Project Topic</p>
                <p className="text-slate-900 dark:text-white text-sm">{selectedRequest.project_topic}</p>
              </div>
            )}

            {selectedRequest.additional_instructions && (
              <div className="mt-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Additional Instructions</p>
                <p className="text-slate-900 dark:text-white text-sm whitespace-pre-wrap">{selectedRequest.additional_instructions}</p>
              </div>
            )}

            {selectedRequest.file_url && (
              <a
                href={selectedRequest.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Attached File
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
