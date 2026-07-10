'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Bell, Sun, Moon, GraduationCap } from 'lucide-react'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface AdminHeaderProps {
  user: User
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between" role="banner">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        <span className="font-bold text-sm font-poppins text-slate-900 dark:text-white">Admin</span>
      </div>

      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Welcome back, <span className="text-slate-900 dark:text-white font-semibold">{user.email}</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* Notifications */}
        <Link
          href="/admin/requests"
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
        </Link>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:block">Sign Out</span>
        </button>
      </div>
    </header>
  )
}
