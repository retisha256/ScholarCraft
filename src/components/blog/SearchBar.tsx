'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from '@/utils/performance'

const SORT_OPTIONS = [
  { value: 'newest',  label: 'Newest First' },
  { value: 'oldest',  label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
] as const

type SortOption = typeof SORT_OPTIONS[number]['value']

interface Props {
  categories: string[]
  categoryCounts: Record<string, number>
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOption) => void
  activeCategory: string
  activeSort: SortOption
  resultCount: number
}

/**
 * SearchBar — debounced blog search with category chips, sort selector,
 * and result count.
 *
 * Usage:
 *   <SearchBar
 *     categories={['All', 'Research', 'Writing']}
 *     categoryCounts={{ Research: 4, Writing: 6 }}
 *     onSearch={setQuery}
 *     onCategoryChange={setCategory}
 *     onSortChange={setSort}
 *     activeCategory={category}
 *     activeSort={sort}
 *     resultCount={filtered.length}
 *   />
 */
export default function SearchBar({
  categories,
  categoryCounts,
  onSearch,
  onCategoryChange,
  onSortChange,
  activeCategory,
  activeSort,
  resultCount,
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [showSort, setShowSort] = useState(false)
  const [, startTransition] = useTransition()
  const sortRef = useRef<HTMLDivElement>(null)

  // Debounced search — 300 ms
  const debouncedSearch = useRef(
    debounce((val: unknown) => {
      startTransition(() => onSearch(val as string))
    }, 300)
  ).current

  useEffect(() => {
    debouncedSearch(inputValue)
  }, [inputValue, debouncedSearch])

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSort(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentSort = SORT_OPTIONS.find((s) => s.value === activeSort)?.label ?? 'Sort'

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Search input + sort */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08]
                       text-[#F8FAFC] placeholder-[#334155] text-sm
                       focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20
                       transition-all"
            aria-label="Search blog posts"
            aria-controls="blog-results"
          />
          <AnimatePresence>
            {inputValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg
                           flex items-center justify-center text-[#475569] hover:text-[#CBD5E1]
                           hover:bg-white/[0.06] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => setShowSort((v) => !v)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08]
                       text-[#CBD5E1] text-sm font-medium hover:bg-white/[0.08] transition-colors
                       min-h-[44px] whitespace-nowrap"
            aria-expanded={showSort}
            aria-haspopup="listbox"
            aria-label={`Sort: ${currentSort}`}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:block">{currentSort}</span>
          </button>

          <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 glass rounded-xl overflow-hidden z-10 border-white/[0.12]"
                role="listbox"
                aria-label="Sort options"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={activeSort === opt.value}
                    onClick={() => {
                      onSortChange(opt.value)
                      setShowSort(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                                hover:bg-white/[0.06] ${
                                  activeSort === opt.value
                                    ? 'text-[#2563EB] font-medium'
                                    : 'text-[#CBD5E1]'
                                }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category chips */}
      <div
        className="flex gap-2 flex-wrap"
        role="group"
        aria-label="Filter by category"
      >
        {['All', ...categories].map((cat) => {
          const count = cat === 'All'
            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
            : categoryCounts[cat] ?? 0
          const active = activeCategory === cat

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium
                          transition-all duration-200 min-h-[32px]
                          ${active
                            ? 'bg-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.35)]'
                            : 'bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1] hover:bg-white/[0.08] hover:text-[#F8FAFC]'
                          }`}
              aria-pressed={active}
            >
              {cat}
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-white/20' : 'bg-white/[0.06]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Result count + highlight hint */}
      <div
        className="flex items-center justify-between"
        id="blog-results"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-xs text-[#475569]">
          {resultCount === 0
            ? 'No articles found'
            : `${resultCount} article${resultCount !== 1 ? 's' : ''} found`}
          {inputValue && (
            <> for <span className="text-[#CBD5E1] font-medium">&ldquo;{inputValue}&rdquo;</span></>
          )}
        </p>

        {/* No results suggestion */}
        {resultCount === 0 && inputValue && (
          <button
            onClick={() => { setInputValue(''); onSearch('') }}
            className="text-xs text-[#2563EB] hover:underline"
          >
            Clear search
          </button>
        )}
      </div>
    </div>
  )
}
