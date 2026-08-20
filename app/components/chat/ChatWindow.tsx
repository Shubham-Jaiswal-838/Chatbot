'use client'

import { memo, useEffect, useRef } from 'react'
import { useAppSelector } from '@/lib/hooks'
import ChatMessage from './ChatMessage'
import type { Message } from '@/lib/features/chatSlice'

type ChatWindowProps = {
  showEmptySuggestions?: boolean
  onSuggestionSelect?: (value: string) => void
}

const suggestionPrompts = [
  'Plan a 7 day trip to Japan',
  'Best places in Tokyo',
  'Weekend getaway under $500',
]

const ChatWindow = memo(function ChatWindow({
  showEmptySuggestions = true,
  onSuggestionSelect,
}: ChatWindowProps) {
  const threads = useAppSelector((state) => state.chat.threads)
  const activeDraft = useAppSelector((state) => state.chat.activeDraft)
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

  // Show empty-state suggestions whenever the active thread has no messages.
  // This includes newly created drafts so clicking "New chat" immediately shows the prompt.
  const shouldShowEmptyState = showEmptySuggestions && messages.length === 0

  return (
    <div
      ref={containerRef}
      className="h-full min-h-0 flex-1 overflow-y-auto px-8 pb-10 pt-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {shouldShowEmptyState ? (
        <div className="flex h-full flex-col items-center justify-start pt-12 md:pt-20">
          <div className="mx-auto w-full max-w-[760px] text-center text-white px-4">
            <h2 className="text-3xl font-medium tracking-[-0.08em] md:text-[3rem]">I&apos;m TripPilot</h2>
            <p className="mt-2 text-2xl font-medium tracking-[-0.08em] md:text-[2rem]">
              How can I help you?
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => onSuggestionSelect?.(prompt)}
                            className="rounded-full cursor-pointer border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-white/20"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {messages.map((message: Message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
})

export default ChatWindow