'use client'

import { MessageSquareText, Plus } from 'lucide-react'
import { createNewThread, setActiveThread } from '@/lib/features/chatSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

export default function ChatHistoryList({ onSelect }: { onSelect?: () => void }) {
  const dispatch = useAppDispatch()
  const threads = useAppSelector((state) => state.chat.threads)
  const activeDraft = useAppSelector((state) => state.chat.activeDraft)
  const activeThreadId = useAppSelector((state) => state.chat.activeThreadId)

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(createNewThread())
          onSelect?.()
        }}
        className="mb-3 flex w-full cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
          <Plus size={14} />
        </span>
        <span>New chat</span>
      </button>

      {threads.length === 0 && !activeDraft ? (
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center text-xs text-white/50">No chats yet</div>
      ) : (
        <div className="max-h-[30vh] overflow-y-auto pr-1 space-y-2 hide-scrollbar">
          {activeDraft && (
            <button
              key={activeDraft.id}
              type="button"
              onClick={() => {
                dispatch(setActiveThread(activeDraft.id))
                onSelect?.()
              }}
              className={`w-full cursor-pointer rounded-xl border px-3 py-2.5 text-left transition ${
                activeDraft.id === activeThreadId
                  ? 'border-white/20 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                  : 'border-white/5 bg-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
                  <MessageSquareText size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{activeDraft.title}</p>
                  <p className="mt-1 truncate text-[11px] text-white/50">New chat</p>
                </div>
              </div>
            </button>
          )}

          {threads.map((thread) => {
            const lastMessage = thread.messages[thread.messages.length - 1]
            const previewText = lastMessage?.text?.trim() || 'No messages yet'
            const isActive = thread.id === activeThreadId

            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => {
                  dispatch(setActiveThread(thread.id))
                  onSelect?.()
                }}
                className={`w-full cursor-pointer rounded-xl border px-3 py-2.5 text-left transition ${
                  isActive
                    ? 'border-white/20 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                    : 'border-white/5 bg-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
                    <MessageSquareText size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{thread.title}</p>
                    <p className="mt-1 truncate text-[11px] text-white/50">{previewText}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
