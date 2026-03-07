'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '○' },
    { href: '/employees', label: 'Employees', icon: '👤' },
    { href: '/projects', label: 'Projects', icon: '📁' },
    { href: '/departments', label: 'Departments', icon: '🏢' },
  ]

  return (
    <aside className="w-56 bg-sidebar text-white h-screen fixed left-0 top-0 p-6 flex flex-col">
      <div className="mb-8">
        <p className="text-xs text-gray-400 tracking-wider">CLINGY API</p>
        <h1 className="text-2xl font-bold mt-1">HR Portal</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
