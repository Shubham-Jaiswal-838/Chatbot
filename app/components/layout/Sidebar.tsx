'use client'

import { memo, useState } from 'react'
import {
  Home,
  Search,
  BadgeInfo,
  Plus,
  Heart,
  Inbox,
  Settings,
  MessageCircleQuestion,
  PanelLeft,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const ChatHistoryList = dynamic(() => import('../chat/ChatHistoryList'), { ssr: false })

const menuLinks = [
  { label: 'Home', icon: Home },
  { label: 'Search', icon: Search },
  { label: 'About Visionary', icon: BadgeInfo },
]

const projectLinks = [
  { label: 'Create new project', icon: Plus },
  { label: 'Favorites', icon: Heart },
  { label: 'Library', icon: Inbox },
]

const Sidebar = memo(function Sidebar({ showCollapsedButton = true, onClose }: { showCollapsedButton?: boolean; onClose?: () => void }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`flex h-full max-h-screen flex-col justify-between overflow-y-auto bg-[#0f0f10] p-5 text-white transition-all duration-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1
              className="cursor-pointer text-lg font-semibold"
              onClick={() => {
                router.push('/')
                onClose?.()
              }}
            >
              Visionary 2.0
            </h1>
          )}
          {showCollapsedButton && (
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/60 hover:bg-white/5 hover:text-white"
            >
              <PanelLeft size={18} />
            </button>
          )}
        </div>

        {!collapsed && (
          <div className="mt-6">
            <ChatHistoryList onSelect={onClose} />
          </div>
        )}

        {!collapsed && <p className="mt-8 text-xs text-white/40">MENU</p>}
        <nav className={`flex flex-col gap-1 ${collapsed ? 'mt-8' : 'mt-3'}`}>
          {menuLinks.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => onClose?.()}
              className={`flex  cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Icon size={18} className="shrink-0 text-white/60" />
              {!collapsed && label}
            </button>
          ))}
        </nav>

        {!collapsed && <p className="mt-8 text-xs text-white/40">PROJECTS</p>}
        <nav className={`flex flex-col gap-1 ${collapsed ? 'mt-4' : 'mt-3'}`}>
          {projectLinks.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => onClose?.()}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Icon size={18} className="shrink-0 text-white/60" />
              {!collapsed && label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-2">
        <a
          href="#"
          className={`flex items-center gap-2 px-3 py-2 text-sm text-white/70 ${collapsed ? 'justify-center' : ''}`}
        >
          <Settings size={18} className="shrink-0 text-white/50" />
          {!collapsed && 'Settings'}
        </a>
        <a
          href="#"
          className={`flex items-center gap-2 px-3 py-2 text-sm text-white/70 ${collapsed ? 'justify-center' : ''}`}
        >
          <MessageCircleQuestion size={18} className="shrink-0 text-white/50" />
          {!collapsed && 'Help center'}
        </a>
        <div
          className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-orange-500" />
          {!collapsed && (
            <div className="text-xs">
              <p className="text-white">Shubham Jaiswal</p>
              <p className="text-white/40">shubhamjaiswal2606@gamil.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
})

export default Sidebar
