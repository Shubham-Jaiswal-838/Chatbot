import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import chatReducer from './features/chatSlice'

const stripAttachmentPreviewUrls = (value: any): any => {
  if (!value || typeof value !== 'object') return value

  if (Array.isArray(value)) {
    return value.map(stripAttachmentPreviewUrls)
  }

  if ('attachments' in value) {
    return {
      ...value,
      attachments: (value.attachments ?? []).map((attachment: any) => {
        const { previewUrl, ...rest } = attachment
        return rest
      }),
    }
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [key, stripAttachmentPreviewUrls(nestedValue)]),
  )
}

const stripPreviewUrls = createTransform(
  (inboundState) => {
    const state = stripAttachmentPreviewUrls(inboundState)

    // Remove threads that have no messages before persisting
    if (state && Array.isArray(state.threads)) {
      const threads = state.threads.filter((t: any) => Array.isArray(t.messages) && t.messages.length > 0)
      // Do not persist activeDraft
      const { activeDraft, ...rest } = state
      return {
        ...rest,
        threads,
      }
    }

    // In case there are no threads ensure we don't persist an activeDraft
    if (state && state.activeDraft) {
      const { activeDraft, ...rest } = state
      return rest
    }

    return state
  },
  (outboundState) => outboundState,
  { whitelist: ['chat'] },
)

const migrateChatState = (state: any) => {
  if (!state) {
    return { threads: [], activeThreadId: null }
  }

  const legacyMessages = Array.isArray(state.messages) ? state.messages : []
  const threads = Array.isArray(state.threads) ? state.threads : []

  if (threads.length > 0) {
    const normalized = threads.map((thread: any) => ({
      id: thread.id,
      title: thread.title || 'New chat',
      createdAt: thread.createdAt || new Date().toISOString(),
      updatedAt: thread.updatedAt || new Date().toISOString(),
      messages: Array.isArray(thread.messages) ? thread.messages : [],
    }))

    // If persisted activeThreadId doesnt exist in normalized threads fall back to the first thread id or null
    const activeId = state.activeThreadId && normalized.some((t: any) => t.id === state.activeThreadId) ? state.activeThreadId : (normalized[0]?.id ?? null)

    return {
      ...state,
      threads: normalized,
      activeThreadId: activeId,
    }
  }

  if (legacyMessages.length > 0) {
    return {
      threads: [
        {
          id: 'thread-default',
          title: 'New chat',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: legacyMessages,
        },
      ],
      activeThreadId: 'thread-default',
    }
  }

  return {
    threads: [],
    activeThreadId: null,
  }
}

const migrate = (state: any) => Promise.resolve(migrateChatState(state))

const persistConfig = {
  key: 'chatbot-store',
  storage,
  version: 2,
  migrate,
  transforms: [stripPreviewUrls],
}

const persistedChatReducer = persistReducer(persistConfig, chatReducer)

export const store = configureStore({
  reducer: {
    chat: persistedChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch