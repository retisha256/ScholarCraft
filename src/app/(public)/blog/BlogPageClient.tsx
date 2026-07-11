'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import SearchBar from '@/components/blog/SearchBar'
import { SkeletonGrid } from '@/components/ui/SkeletonLoader'

const SAMPLE_POSTS: Partial<BlogPost>[] = [
  { id:'1', title:'How to Write a Strong Literature Review', slug:'how-to-write-strong-literature-review', excerpt:'A comprehensive guide to writing a literature review that impresses your supervisor.', author:'Dr. Elizabeth Carter', category:'Research Tips', created_at:'2024-01-15T00:00:00Z', published:true },
  { id:'2', title:'10 Common Dissertation Mistakes to Avoid', slug:'common-dissertation-mistakes', excerpt:'Learn from the most common mistakes students make in their dissertations.', author:'Prof. Michael Adebayo', category:'Dissertation', created_at:'2024-01-22T00:00:00Z', published:true },
  { id:'3', title:'APA 7th Edition: A Complete Citation Guide', slug:'apa-7th-edition-citation-guide', excerpt:'Master APA 7th edition citations with this comprehensive reference guide.', author:'James Whitfield', category:'Citation & Formatting', created_at:'2024-02-05T00:00:00Z', published:true },
  { id:'4', title:'Introduction to Statistical Analysis for Researchers', slug:'intro-statistical-analysis-researchers', excerpt:'A beginner-friendly introduction to statistical analysis methods.', author:'Dr. Priya Sharma', category:'Statistics', created_at:'2024-02-18T00:00:00Z', published:true },
  { id:'5', title:'Writing a Winning Research Proposal', slug:'writing-winning-research-proposal', excerpt:'Step-by-step guidance for crafting a compelling research proposal.', author:'Dr. Elizabeth Carter', category:'Research Tips', created_at:'2024-03-01T00:00:00Z', published:true },
  { id:'6', title:'Managing Academic Stress: Evidence-Based Strategies', slug:'managing-academic-stress', excerpt:'Practical, evidence-based strategies for managing academic pressure.', author:'Prof. Michael Adebayo', category:'Student Wellbeing', created_at:'2024-03-15T00:00:00Z', published:true },
]

const CATEGORIES = ['Research Tips', 'Dissertation', 'Citation & Formatting', 'Statistics', 'Student Wellbeing']

type SortOption = 'newest' | 'oldest' | 'popular'

/** Highlight matching text in a string */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#F59E0B]/30 text-[#F59E0B] rounded px-0.5 not-italic">
            {part}
          </mark>
        ) : part
      )}
    </>
  )
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<Partial<BlogPost>[]>(SAMPLE_POSTS)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<SortOption>('newest')

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
        if (data && data.length > 0) setPosts(data)
      } catch { /* use sample */ }
      finally { setLoading(false) }
    }
    load()
  }, [])

  // Build category counts
  const categoryCounts = useMemo(() =>
    posts.reduce<Record<string, number>>((acc, p) => {
      if (p.category) acc[p.category] = (acc[p.category] ?? 0) + 1
      return acc
    }, {}), [posts]
  )

  // Filter + sort
  const filtered = useMemo(() => {
    let result = posts.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const q = query.toLowerCase()
      const matchQ = !q || p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q)
      return matchCat && matchQ
    })
    if (sort === 'newest') result = [...result].sort((a, b) => (b.created_at ?? '') > (a.created_at ?? '') ? 1 : -1)
    if (sort === 'oldest') result = [...result].sort((a, b) => (a.created_at ?? '') > (b.created_at ?? '') ? 1 : -1)
    // 'popular' keeps default order for sample data
    return result
  }, [posts, query, category, sort])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#E07A5F]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-xl relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-poppins)] font-bold text-[#002147] text-[42px] lg:text-[56px] leading-tight tracking-tight mb-4"
          >
            Academic <span className="text-[#E07A5F]">Insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-[#4A5568] text-lg max-w-xl mx-auto"
          >
            Expert tips, guides, and resources to help you excel in your academic journey.
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-[#FDFBF7]">
        <div className="container-xl">
          <div className="rounded-[2rem] border border-[#E8E5DF] bg-white p-6 shadow-sm mb-10">
            <SearchBar
              categories={CATEGORIES}
              categoryCounts={categoryCounts}
              onSearch={setQuery}
              onCategoryChange={setCategory}
              onSortChange={(s) => setSort(s as SortOption)}
              activeCategory={category}
              activeSort={sort}
              resultCount={filtered.length}
            />
          </div>

          {loading ? (
            <SkeletonGrid count={6} variant="card" />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-white border border-[#E8E5DF] py-20 text-center shadow-sm"
            >
              <p className="text-[#2D3748] text-lg mb-2">No articles found</p>
              <p className="text-[#4A5568] text-sm">Try different keywords or browse all categories</p>
              <button
                onClick={() => { setQuery(''); setCategory('All') }}
                className="mt-5 px-5 py-2 rounded-xl bg-[#F8F6F2] text-[#002147] text-sm hover:bg-[#E8E5DF] transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="blog-results"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className="group rounded-2xl border border-[#E8E5DF] bg-white overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Category color banner */}
                  <div className="h-1.5 bg-gradient-to-r from-[#2563EB] to-[#F59E0B]" aria-hidden="true" />

                  <div className="p-6 flex flex-col gap-3 h-full">
                    {post.category && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded-full self-start">
                        <Tag className="w-3 h-3" aria-hidden="true" />
                        {post.category}
                      </span>
                    )}

                    <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#002147] text-lg leading-snug group-hover:text-[#2563EB] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        <Highlight text={post.title ?? ''} query={query} />
                      </Link>
                    </h2>

                    <p className="text-[#4A5568] text-sm leading-relaxed flex-1 line-clamp-3">
                      <Highlight text={post.excerpt ?? ''} query={query} />
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E5DF]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {post.author?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#4A5568]">{post.author}</p>
                          {post.created_at && (
                            <p className="text-[10px] text-[#718096] flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" aria-hidden="true" />
                              {formatDate(post.created_at)}
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] group-hover:gap-2 transition-all"
                        aria-label={`Read ${post.title}`}
                      >
                        Read <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
