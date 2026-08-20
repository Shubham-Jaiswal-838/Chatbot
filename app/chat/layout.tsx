'use client'

import StoreProvider from '../StoreProvider'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}
