import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ChatAttachment = {
  id: string
  name: string
  mimeType: string
  size: number
  previewUrl?: string
}

export type Message = {
  id: string
  sender: 'user' | 'ai'
  text: string
  attachments?: ChatAttachment[]
}

export type ChatThread = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

type ChatState = {
  threads: ChatThread[]
  activeThreadId: string | null
  activeDraft?: ChatThread | null
}

const makeId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const getThreadTitle = (messages: Message[]) => {
  const firstUserMessage = messages.find((message) => message.sender === 'user' && message.text.trim())
  const rawText = firstUserMessage?.text.trim() ?? 'New chat'
  const words = rawText.split(/\s+/).filter(Boolean)
  const title = words.slice(0, 3).join(' ')

  return title || 'New chat'
}

const createThread = (messages: Message[] = [], id = makeId('thread')): ChatThread => ({
  id,
  title: getThreadTitle(messages),
  messages,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

// Start with no persisted threads by default; opening the app shows an empty new chat (draft)
const initialState: ChatState = {
  threads: [],
  activeThreadId: null,
  activeDraft: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createNewThread: (state) => {
          // If a draft already exists, activate it instead of creating a duplicate
          if (state.activeDraft) {
            state.activeThreadId = state.activeDraft.id
            return
          }

          // create an in-memory draft (do not persist until a message is added)
          const draft: ChatThread = {
            ...createThread([], makeId('draft')),
          }
          state.activeDraft = draft
          state.activeThreadId = draft.id
        },
        finalizeDraft: (state) => {
          // move draft into threads only when it has messages
          const draft = state.activeDraft
          if (!draft) return
          if (!Array.isArray(draft.messages) || draft.messages.length === 0) return

          const thread: ChatThread = {
            ...draft,
            id: makeId('thread'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          state.threads = [thread, ...state.threads]
          state.activeThreadId = thread.id
          state.activeDraft = null
        },
        discardDraft: (state) => {
          state.activeDraft = null
          // set activeThreadId to first persisted thread if available
          state.activeThreadId = state.threads[0]?.id ?? null
        },
    setActiveThread: (state, action: PayloadAction<string>) => {
      state.activeThreadId = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
          // If there's a draft active (not persisted), add messages to the draft
          const draft = state.activeDraft
          if (draft && state.activeThreadId === draft.id) {
            draft.messages.push(action.payload)
            draft.updatedAt = new Date().toISOString()

            // If the user has added a user message, finalize and persist the draft
            if (action.payload.sender === 'user') {
              draft.title = getThreadTitle(draft.messages)
              const thread: ChatThread = {
                ...draft,
                id: makeId('thread'),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
              state.threads = [thread, ...state.threads]
              state.activeThreadId = thread.id
              state.activeDraft = null
            }

            return
          }

          const activeId = state.activeThreadId ?? state.threads[0]?.id

          if (!activeId) {
            const nextThread = createThread([action.payload], makeId('thread'))
            state.threads = [nextThread]
            state.activeThreadId = nextThread.id
            return
          }

          let thread = state.threads.find((item) => item.id === activeId)

          if (!thread) {
            thread = createThread([action.payload], activeId)
            state.threads = [thread, ...state.threads]
            state.activeThreadId = thread.id
            return
          }

          thread.messages.push(action.payload)
          thread.updatedAt = new Date().toISOString()

          if (action.payload.sender === 'user') {
            thread.title = getThreadTitle(thread.messages)
          }
        },
    replaceMessages: (state, action: PayloadAction<Message[]>) => {
      const activeId = state.activeThreadId ?? state.threads[0]?.id

      if (!activeId) {
        const nextThread = createThread(action.payload, makeId('thread'))
        state.threads = [nextThread]
        state.activeThreadId = nextThread.id
        return
      }

      let thread = state.threads.find((item) => item.id === activeId)

      if (!thread) {
        thread = createThread(action.payload, activeId)
        state.threads = [thread, ...state.threads]
        state.activeThreadId = thread.id
        return
      }

      thread.messages = action.payload
      thread.title = getThreadTitle(action.payload)
      thread.updatedAt = new Date().toISOString()
    },
  },
})

export const { createNewThread, setActiveThread, addMessage, replaceMessages } = chatSlice.actions
export default chatSlice.reducer