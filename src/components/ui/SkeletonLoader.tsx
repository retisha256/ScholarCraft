/**
 * SkeletonLoader — reusable loading skeletons
 *
 * Usage:
 *   <SkeletonCard />              — service/blog card
 *   <SkeletonTable rows={5} />   — admin table
 *   <SkeletonText lines={3} />   — paragraph text
 */
import React from 'react'

/* ── base pulse element ─────────────────────────────────── */
function Pulse({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`bg-white/[0.06] animate-pulse rounded-xl ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

/* ── Blog / Service card skeleton ──────────────────────── */
export function SkeletonCard() {
  return (
    <div
      className="glass rounded-2xl overflow-hidden"
      role="status"
      aria-label="Loading content"
    >
      {/* image area */}
      <Pulse className="h-48 rounded-none" />
      <div className="p-6 flex flex-col gap-3">
        <Pulse className="h-3 w-20" />
        <Pulse className="h-5 w-3/4" />
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-5/6" />
        <div className="flex justify-between mt-2">
          <Pulse className="h-3 w-24" />
          <Pulse className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

/* ── Service card skeleton ──────────────────────────────── */
export function SkeletonServiceCard() {
  return (
    <div className="glass rounded-2xl p-7 flex flex-col gap-4" role="status" aria-label="Loading">
      <Pulse className="w-12 h-12 rounded-2xl" />
      <Pulse className="h-5 w-2/3" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-5/6" />
      <div className="flex flex-col gap-2 mt-1">
        {[...Array(3)].map((_, i) => (
          <Pulse key={i} className="h-3 w-3/4" />
        ))}
      </div>
    </div>
  )
}

/* ── Admin table skeleton ──────────────────────────────── */
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass rounded-2xl overflow-hidden" role="status" aria-label="Loading table">
      {/* header */}
      <div className="border-b border-white/[0.06] px-5 py-3.5 flex gap-4">
        {[3, 2, 1.5, 1.5, 1].map((w, i) => (
          <Pulse key={i} className="h-3" style={{ flex: w }} />
        ))}
      </div>
      {/* rows */}
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="border-b border-white/[0.04] px-5 py-4 flex gap-4 items-center"
        >
          <div className="flex items-center gap-3 flex-[3]">
            <Pulse className="w-9 h-9 rounded-xl flex-shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Pulse className="h-3.5 w-32" />
              <Pulse className="h-2.5 w-24" />
            </div>
          </div>
          <Pulse className="h-3 flex-[2]" />
          <Pulse className="h-3 flex-[1.5]" />
          <Pulse className="h-3 flex-[1.5]" />
          <Pulse className="h-6 w-20 rounded-full flex-1" />
          <Pulse className="h-8 w-8 rounded-lg flex-shrink-0" />
        </div>
      ))}
    </div>
  )
}

/* ── Text paragraph skeleton ───────────────────────────── */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-11/12', 'w-3/4', 'w-5/6']
  return (
    <div className="flex flex-col gap-2.5" role="status" aria-label="Loading text">
      {[...Array(lines)].map((_, i) => (
        <Pulse key={i} className={`h-4 ${widths[i % widths.length]}`} />
      ))}
    </div>
  )
}

/* ── Grid of cards ─────────────────────────────────────── */
export function SkeletonGrid({
  count = 6,
  variant = 'card',
}: {
  count?: number
  variant?: 'card' | 'service'
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) =>
        variant === 'service' ? (
          <SkeletonServiceCard key={i} />
        ) : (
          <SkeletonCard key={i} />
        )
      )}
    </div>
  )
}

/* ── Admin request card skeleton (mobile) ──────────────── */
export function SkeletonRequestCard() {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3" role="status" aria-label="Loading">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Pulse className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="flex flex-col gap-1.5">
            <Pulse className="h-4 w-28" />
            <Pulse className="h-3 w-36" />
          </div>
        </div>
        <Pulse className="h-6 w-20 rounded-full" />
      </div>
      <Pulse className="h-3 w-3/4" />
      <div className="flex gap-2 pt-1">
        <Pulse className="h-8 flex-1 rounded-xl" />
        <Pulse className="h-8 flex-1 rounded-xl" />
      </div>
    </div>
  )
}
