'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { ChevronDown, Download, ExternalLink } from 'lucide-react'
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

const STATUS_STYLES: Record<RequestStatus, string> = {
  new:           'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25',
  'in-progress': 'bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/25',
  completed:     'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/25',
  cancelled:     'bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/25',
}

interface Props {
  request: ProjectRequest
  onStatusChange?: (id: string, status: RequestStatus) => void
  onViewDetails?: (request: ProjectRequest) => void
}

export default function RequestCard({ request, onStatusChange, onViewDetails }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [updating, setUpdating] = useState(false)

  const updateStatus = async (status: RequestStatus) => {
    setUpdating(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('project_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', request.id)

    if (error) {
      toast.error('Failed to update status')
    } else {
      toast.success('Status updated')
      onStatusChange?.(request.id, status)
    }
    setUpdating(false)
  }

  const initials = request.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.div
      layout
      className="glass rounded-2xl overflow-hidden hover:border-white/[0.14] transition-colors"
    >
      {/* ── Card header ─────────────────────────────────── */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]
                         flex items-center justify-center text-white text-xs font-bold
                         font-[family-name:var(--font-poppins)] flex-shrink-0"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[#F8FAFC] font-semibold text-sm truncate">{request.full_name}</p>
              <p className="text-[#475569] text-xs truncate">{request.email}</p>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 ${
              STATUS_STYLES[request.status]
            }`}
          >
            {STATUS_LABELS[request.status]}
          </span>
        </div>

        {/* Topic */}
        <p className="text-[#CBD5E1] text-sm leading-snug line-clamp-2 mb-3">
          {request.project_topic}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[#475569]">
          <span className="capitalize">{request.service_required.replace(/-/g, ' ')}</span>
          <span>·</span>
          <span>Due {request.deadline}</span>
          <span>·</span>
          <span className="capitalize">{request.academic_level}</span>
        </div>
      </div>

      {/* ── Action bar ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06] px-5 py-3 flex items-center gap-2">
        {/* Status update */}
        <select
          value={request.status}
          onChange={(e) => updateStatus(e.target.value as RequestStatus)}
          disabled={updating}
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2
                     text-xs text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#2563EB]/50
                     disabled:opacity-50 transition-colors"
          aria-label={`Update status for ${request.full_name}`}
        >
          {Object.entries(STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val} className="bg-[#1E293B]">
              {label}
            </option>
          ))}
        </select>

        {/* View details */}
        <button
          onClick={() => onViewDetails?.(request)}
          className="w-10 h-10 rounded-xl bg-[#2563EB]/10 hover:bg-[#2563EB]/20
                     flex items-center justify-center text-[#60A5FA] transition-colors
                     flex-shrink-0"
          aria-label={`View details for ${request.full_name}`}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Download file */}
        {request.file_url && (
          <a
            href={request.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#22C55E]/10 hover:bg-[#22C55E]/20
                       flex items-center justify-center text-[#22C55E] transition-colors
                       flex-shrink-0"
            aria-label={`Download file for ${request.full_name}`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
          </a>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08]
                     flex items-center justify-center text-[#475569] transition-all flex-shrink-0"
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
        >
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        </button>
      </div>

      {/* ── Expanded details ────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Phone',       value: request.phone },
                { label: 'Country',     value: request.country },
                { label: 'Institution', value: request.institution ?? '—' },
                { label: 'Pages',       value: request.number_of_pages?.toString() ?? '—' },
                { label: 'Citation',    value: request.citation_style ?? '—' },
                { label: 'Budget',      value: request.budget ?? '—' },
                { label: 'Submitted',   value: formatDate(request.created_at) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[#475569] mb-0.5 uppercase tracking-wider text-[10px] font-medium">
                    {label}
                  </p>
                  <p className="text-[#CBD5E1] font-medium capitalize">{value}</p>
                </div>
              ))}

              {request.additional_instructions && (
                <div className="col-span-2 bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[#475569] mb-1 uppercase tracking-wider text-[10px] font-medium">
                    Instructions
                  </p>
                  <p className="text-[#CBD5E1] leading-relaxed whitespace-pre-wrap">
                    {request.additional_instructions}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
