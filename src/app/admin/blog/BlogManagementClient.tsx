'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogPostSchema, type BlogPostData } from '@/lib/validations'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { formatDate, slugify } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function BlogManagementClient({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [showForm, setShowForm] = useState(false)
  const [editPost, setEditPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostData>({ resolver: zodResolver(blogPostSchema) as never })

  const title = watch('title')

  const openCreate = () => {
    setEditPost(null)
    reset()
    setShowForm(true)
  }

  const openEdit = (post: BlogPost) => {
    setEditPost(post)
    setValue('title', post.title)
    setValue('slug', post.slug)
    setValue('excerpt', post.excerpt)
    setValue('content', post.content)
    setValue('author', post.author)
    setValue('category', post.category)
    setValue('tags', post.tags?.join(', ') || '')
    setValue('published', post.published)
    setShowForm(true)
  }

  const onSubmit = async (data: BlogPostData) => {
    setLoading(true)
    const supabase = createClient()
    const payload = {
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      category: data.category,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
      published: data.published,
      updated_at: new Date().toISOString(),
    }

    if (editPost) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editPost.id)
      if (error) toast.error('Failed to update post')
      else {
        toast.success('Post updated')
        setPosts(posts.map((p) => p.id === editPost.id ? { ...p, ...payload } as BlogPost : p))
      }
    } else {
      const { data: newPost, error } = await supabase
        .from('blog_posts')
        .insert({ ...payload, created_at: new Date().toISOString() })
        .select()
        .single()
      if (error) toast.error('Failed to create post')
      else {
        toast.success('Post created')
        if (newPost) setPosts([newPost, ...posts])
      }
    }
    setLoading(false)
    setShowForm(false)
    reset()
  }

  const togglePublish = async (post: BlogPost) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id)
    if (error) toast.error('Failed to update')
    else {
      setPosts(posts.map((p) => p.id === post.id ? { ...p, published: !post.published } : p))
      toast.success(post.published ? 'Post unpublished' : 'Post published')
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) toast.error('Failed to delete')
    else {
      setPosts(posts.filter((p) => p.id !== id))
      toast.success('Post deleted')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Blog Posts</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          New Post
        </button>
      </div>

      {/* Posts list */}
      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="py-20 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            No blog posts yet. Create your first post!
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${post.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {post.author} · {post.category} · {formatDate(post.created_at)}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500"
                  aria-label={post.published ? 'Unpublish' : 'Publish'}
                >
                  {post.published ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors"
                  aria-label={`Edit ${post.title}`}
                >
                  <Edit className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-lg transition-colors"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                {editPost ? 'Edit Post' : 'New Blog Post'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                  <input
                    {...register('title')}
                    onBlur={() => { if (!editPost && title) setValue('slug', slugify(title)) }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
                    <input {...register('slug')} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author *</label>
                    <input {...register('author')} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                    <input {...register('category')} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma-separated)</label>
                    <input {...register('tags')} placeholder="research, writing, tips" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt *</label>
                  <textarea rows={2} {...register('excerpt')} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 resize-none" />
                  {errors.excerpt && <p className="text-xs text-red-500 mt-1">{errors.excerpt.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content *</label>
                  <textarea rows={8} {...register('content')} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 resize-none" />
                  {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="published" {...register('published')} className="w-4 h-4 text-blue-600 rounded" />
                  <label htmlFor="published" className="text-sm text-slate-700 dark:text-slate-300">Publish immediately</label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors">
                    {loading ? 'Saving...' : editPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
