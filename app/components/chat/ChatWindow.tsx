'use client'

import { memo, useEffect, useRef } from 'react'
import { useAppSelector } from '@/lib/hooks'
import ChatMessage from './ChatMessage'
import type { Message } from '@/lib/features/chatSlice'

const ChatWindow = memo(function ChatWindow() {
  const threads = useAppSelector((state) => state.chat.threads)
  const activeThreadId = useAppSelector((state) => state.chat.activeThreadId)
  const messages: Message[] = threads.find((t) => t.id === activeThreadId)?.messages ?? []

  const containerRef = useRef<HTMLDivElement>(null)
  const prevMessageCountRef = useRef(messages.length)
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isInitialLoad = !hasInitializedRef.current
    const hasNewMessage = messages.length > prevMessageCountRef.current

    hasInitializedRef.current = true
    prevMessageCountRef.current = messages.length

    if (!isInitialLoad && !hasNewMessage) return

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    })
  }, [messages.length])

  return (
    <div
      ref={containerRef}
      className="h-full min-h-0 flex-1 overflow-y-auto px-8 pb-10 pt-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex flex-col gap-5">
        {messages.map((message: Message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
})

export default ChatWindow