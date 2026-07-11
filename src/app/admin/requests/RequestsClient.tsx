'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { Search, Download, ExternalLink, X } from 'lucide-react'
import type { ProjectRequest, RequestStatus } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import RequestCard from '@/components/admin/RequestCard'

const STATUS_LABELS: Record<RequestStatus, string> = {
  new: 'New',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const STATUS_STYLES: Record<RequestStatus, string> = {
  new:           'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25',
  'in-progress': 'bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/25',
  completed:     'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/25',
  cancelled:     'bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/25',
}

export default function RequestsClient({
  requests: initialRequests,
  currentStatus,
}: {
  requests: ProjectRequest[]
  currentStatus?: string
}) {
  const [requests, setRequests] = useState(initialRequests)
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
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
      if (selectedRequest?.id === id) {
        setSelectedRequest((prev) => prev ? { ...prev, status } : null)
      }
    }
    setUpdating(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-[#F8FAFC]">
            Project Requests
          </h1>
          <p className="text-[#475569] text-sm mt-1">
            {filtered.length} request{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Search + status filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name, email, topic…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                       text-[#F8FAFC] placeholder-[#334155] text-sm focus:outline-none
                       focus:border-[#2563EB]/50 transition-colors"
            aria-label="Search requests"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {(['', 'new', 'in-progress', 'completed', 'cancelled'] as const).map((s) => (
            <a
              key={s || 'all'}
              href={s ? `/admin/requests?status=${s}` : '/admin/requests'}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                currentStatus === s || (!currentStatus && !s)
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1] hover:bg-white/[0.08]'
              }`}
            >
              {s ? STATUS_LABELS[s as RequestStatus] : 'All'}
            </a>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl py-20 text-center text-[#475569]">
          No requests found.
        </div>
      ) : (
        <>
          {/* ── Mobile: card grid ─────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filtered.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <RequestCard
                  request={req}
                  onStatusChange={updateStatus}
                  onViewDetails={setSelectedRequest}
                />
              </motion.div>
            ))}
          </div>

          {/* ── Desktop: table ────────────────────────────── */}
          <div className="hidden lg:block glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="grid" aria-label="Project requests">
                <thead className="border-b border-white/[0.06]">
                  <tr>
                    {['Client', 'Service', 'Level', 'Deadline', 'Status', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3.5 text-xs font-semibold text-[#475569] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map((req) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {req.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[#F8FAFC] font-medium">{req.full_name}</p>
                            <p className="text-xs text-[#475569]">{req.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#CBD5E1] capitalize">
                        {req.service_required.replace(/-/g, ' ')}
                      </td>
                      <td className="px-5 py-4 text-[#CBD5E1] capitalize">{req.academic_level}</td>
                      <td className="px-5 py-4 text-[#CBD5E1]">{req.deadline}</td>
                      <td className="px-5 py-4">
                        <select
                          value={req.status}
                          onChange={(e) => updateStatus(req.id, e.target.value as RequestStatus)}
                          disabled={updating === req.id}
                          className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer
                                      focus:outline-none disabled:opacity-50 ${STATUS_STYLES[req.status]}`}
                          aria-label={`Update status for ${req.full_name}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([v, l]) => (
                            <option key={v} value={v} className="bg-[#1E293B] text-[#F8FAFC]">{l}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="p-1.5 rounded-lg bg-[#2563EB]/10 hover:bg-[#2563EB]/20 text-[#60A5FA] transition-colors"
                            aria-label={`View details for ${req.full_name}`}
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </button>
                          {req.file_url && (
                            <a
                              href={req.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] transition-colors"
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
          </div>
        </>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="req-detail-title"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedRequest(null) }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="glass rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto border-white/[0.12]"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 id="req-detail-title" className="text-xl font-bold font-[family-name:var(--font-poppins)] text-[#F8FAFC]">
                  Request Details
                </h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-[#CBD5E1] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Name',           value: selectedRequest.full_name },
                  { label: 'Email',          value: selectedRequest.email },
                  { label: 'Phone',          value: selectedRequest.phone },
                  { label: 'Country',        value: selectedRequest.country },
                  { label: 'Institution',    value: selectedRequest.institution ?? '—' },
                  { label: 'Academic Level', value: selectedRequest.academic_level },
                  { label: 'Service',        value: selectedRequest.service_required },
                  { label: 'Deadline',       value: selectedRequest.deadline },
                  { label: 'Pages',          value: selectedRequest.number_of_pages?.toString() ?? '—' },
                  { label: 'Citation',       value: selectedRequest.citation_style ?? '—' },
                  { label: 'Budget',         value: selectedRequest.budget ?? '—' },
                  { label: 'Submitted',      value: formatDate(selectedRequest.created_at) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.04] rounded-xl p-3">
                    <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-[#F8FAFC] font-medium capitalize">{value}</p>
                  </div>
                ))}
              </div>

              {selectedRequest.project_topic && (
                <div className="mt-3 bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Project Topic</p>
                  <p className="text-[#CBD5E1] text-sm">{selectedRequest.project_topic}</p>
                </div>
              )}

              {selectedRequest.additional_instructions && (
                <div className="mt-3 bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Instructions</p>
                  <p className="text-[#CBD5E1] text-sm whitespace-pre-wrap">
                    {selectedRequest.additional_instructions}
                  </p>
                </div>
              )}

              {selectedRequest.file_url && (
                <a
                  href={selectedRequest.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[#60A5FA] hover:underline text-sm"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Attached File
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
