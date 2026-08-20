'use client'

import { useState } from 'react'
import { Mic, PanelLeft, X } from 'lucide-react'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'
import VoiceListeningIndicator from '../components/chat/VoiceListeningIndicator'
import Sidebar from '../components/layout/Sidebar'

export default function ChatPage() {
  const [isListening, setIsListening] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleSuggestionSelect = (value: string) => {
    setInputText(value)
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0b] md:flex md:gap-[10px] md:p-1">
      <aside className="hidden max-w-[250px] shrink-0 overflow-hidden rounded-[14px] md:block">
        <Sidebar />
      </aside>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="relative h-full w-[82%] max-w-[280px] bg-[#0f0f10]"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar showCollapsedButton={false} />
          </div>
        </div>
      )}

      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-b-[14px] chat-bg-gradient md:rounded-[14px]">
        <div className={`${isListening ? 'hidden' : 'flex h-full min-w-0 flex-1 flex-col'}`}>
          <div className="flex items-center justify-start px-4 pt-4 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80"
              aria-label="Open sidebar"
            >
              <PanelLeft size={16} />
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <ChatWindow showEmptySuggestions={inputText.trim() === ''} onSuggestionSelect={handleSuggestionSelect} />
          </div>

          <div className="shrink-0">
            <ChatInput
              isListening={isListening}
              onToggleListening={() => setIsListening((prev) => !prev)}
              text={inputText}
              onTextChange={(v) => setInputText(v)}
            />
          </div>
        </div>

        {isListening && (
          <div className="absolute inset-0 z-20 flex flex-col bg-white md:static md:h-full">
            <button
              type="button"
              onClick={() => setIsListening(false)}
              className="absolute right-4 top-4 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[#1f1f1f] shadow-sm md:right-5 md:top-5"
              aria-label="Close listening overlay"
            >
              <X size={18} />
            </button>

            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <h2 className="text-[2.2rem] font-medium tracking-[-0.08em] text-[#1f1f1f]">
                I&apos;m TripPilot
              </h2>
              <p className="mt-2 text-[2rem] font-medium tracking-[-0.08em] text-[#1f1f1f]">
                How can I help you?
              </p>

              <div className="mt-8 flex justify-center">
                <VoiceListeningIndicator />
              </div>

              <p className="mt-6 text-[1.8rem] font-medium tracking-[-0.06em] text-[#1f1f1f]">
                I&apos;m listening, go ahead.
              </p>
            </div>

            <div className="flex justify-center pb-7">
              <button
                type="button"
                onClick={() => setIsListening(false)}
                className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#1b1b1b] text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                aria-label="Listening microphone"
              >
                <Mic size={26} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
