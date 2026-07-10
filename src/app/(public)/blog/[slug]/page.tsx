import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Post',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
            Blog Post: {params.slug}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Individual blog posts are managed through the admin dashboard and stored in Supabase.
          </p>
        </div>
      </div>
    </div>
  )
}
