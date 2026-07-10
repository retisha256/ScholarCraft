'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'

// Fallback sample posts
const SAMPLE_POSTS: Partial<BlogPost>[] = [
  {
    id: '1',
    title: 'How to Write a Strong Literature Review',
    slug: 'how-to-write-strong-literature-review',
    excerpt: 'A comprehensive guide to writing a literature review that impresses your supervisor and sets the foundation for excellent research.',
    author: 'Dr. Elizabeth Carter',
    category: 'Research Tips',
    created_at: '2024-01-15T00:00:00Z',
    published: true,
  },
  {
    id: '2',
    title: '10 Common Dissertation Mistakes to Avoid',
    slug: 'common-dissertation-mistakes',
    excerpt: 'Learn from the most common mistakes students make in their dissertations and how to avoid them for a successful submission.',
    author: 'Prof. Michael Adebayo',
    category: 'Dissertation',
    created_at: '2024-01-22T00:00:00Z',
    published: true,
  },
  {
    id: '3',
    title: 'APA 7th Edition: A Complete Citation Guide',
    slug: 'apa-7th-edition-citation-guide',
    excerpt: 'Master APA 7th edition citations with this comprehensive guide covering in-text citations, references, and common formatting issues.',
    author: 'James Whitfield',
    category: 'Citation & Formatting',
    created_at: '2024-02-05T00:00:00Z',
    published: true,
  },
  {
    id: '4',
    title: 'Introduction to Statistical Analysis for Researchers',
    slug: 'intro-statistical-analysis-researchers',
    excerpt: 'A beginner-friendly introduction to statistical analysis methods including descriptive statistics, inferential testing, and regression.',
    author: 'Dr. Priya Sharma',
    category: 'Statistics',
    created_at: '2024-02-18T00:00:00Z',
    published: true,
  },
  {
    id: '5',
    title: 'Writing a Winning Research Proposal',
    slug: 'writing-winning-research-proposal',
    excerpt: 'Step-by-step guidance for crafting a compelling research proposal that gets approved and positions your project for success.',
    author: 'Dr. Elizabeth Carter',
    category: 'Research Tips',
    created_at: '2024-03-01T00:00:00Z',
    published: true,
  },
  {
    id: '6',
    title: 'Managing Academic Stress: Evidence-Based Strategies',
    slug: 'managing-academic-stress',
    excerpt: 'Practical, evidence-based strategies for managing the pressures of academic life and maintaining your mental wellbeing.',
    author: 'Prof. Michael Adebayo',
    category: 'Student Wellbeing',
    created_at: '2024-03-15T00:00:00Z',
    published: true,
  },
]

const CATEGORIES = ['All', 'Research Tips', 'Dissertation', 'Citation & Formatting', 'Statistics', 'Student Wellbeing']

export default function BlogPageClient() {
  const [posts, setPosts] = useState<Partial<BlogPost>[]>(SAMPLE_POSTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (data && data.length > 0) setPosts(data)
      } catch {
        // Use sample posts on error
      }
    }
    fetchPosts()
  }, [])

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-6"
          >
            Academic Insights & Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Expert tips, guides, and resources to help you excel in your academic journey.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                aria-label="Search blog posts"
              />
            </div>
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Category filter">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Placeholder image */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center" aria-hidden="true">
                    <div className="text-white/30 text-6xl font-bold font-poppins">
                      {post.category?.charAt(0)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                          <Tag className="w-3 h-3" aria-hidden="true" />
                          {post.category}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold font-poppins text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {post.author?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author}</p>
                          {post.created_at && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              {formatDate(post.created_at)}
                            </p>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all"
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
