'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  BookOpen,
  BarChart2,
  Settings,
  GraduationCap,
  Users,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/requests', label: 'Project Requests', icon: ClipboardList },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 dark:bg-slate-950 text-white min-h-screen flex-shrink-0" aria-label="Admin navigation">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="font-bold text-sm font-poppins">AcademicPro</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800">
        <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to Website
        </Link>
      </div>
    </aside>
  )
}
