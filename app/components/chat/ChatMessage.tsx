import { memo, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Message } from '@/lib/features/chatSlice'
import { getAttachmentBlob } from '@/lib/indexedDb'

const ChatMessage = memo(function ChatMessage({ message }: { message: Message }) {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null)
  const objectUrlsRef = useRef<string[]>([])

  useEffect(() => {
    const attachments = message.attachments ?? []
    if (attachments.length === 0) {
      setPreviewUrls({})
      return
    }

    let cancelled = false

    const loadPreviews = async () => {
      const nextUrls: Record<string, string> = {}

      for (const attachment of attachments) {
        const blob = await getAttachmentBlob(attachment.id)
        if (cancelled) break

        if (blob) {
          const objectUrl = URL.createObjectURL(blob)
          nextUrls[attachment.id] = objectUrl
        } else if (attachment.previewUrl) {
          nextUrls[attachment.id] = attachment.previewUrl
        }
      }

      if (!cancelled) {
        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
        objectUrlsRef.current = Object.values(nextUrls)
        setPreviewUrls(nextUrls)
      }
    }

    void loadPreviews()

    return () => {
      cancelled = true
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      objectUrlsRef.current = []
    }
  }, [message.attachments])

  const renderAttachments = () => {
    const attachments = message.attachments ?? []
    if (attachments.length === 0) return null

    return (
      <div className="mb-2 flex flex-wrap gap-2">
        {attachments.map((attachment) => {
          const previewUrl = previewUrls[attachment.id] ?? attachment.previewUrl

          return (
            <button
              key={attachment.id}
              type="button"
              onClick={() => previewUrl && setSelectedImage({ url: previewUrl, name: attachment.name })}
              className="max-w-[180px] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/10 text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {previewUrl ? (
                <img src={previewUrl} alt={attachment.name} className="h-28 w-full object-cover" />
              ) : (
                <div className="flex h-28 w-full items-center justify-center bg-white/5 px-3 text-center text-[10px] text-white/70">
                  {attachment.name}
                </div>
              )}
              <div className="truncate px-2 py-1 text-[10px] text-white/60">{attachment.name}</div>
            </button>
          )
        })}
      </div>
    )
  }

  if (message.sender === 'user') {
    return (
      <>
        <div className="flex items-end justify-end gap-3">
          <div className="max-w-md rounded-2xl bg-white/10 px-4 py-2.5 text-sm text-white">
            {renderAttachments()}
            {message.text && <div>{message.text}</div>}
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
            U
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -right-6 -top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white cursor-pointer"
                aria-label="Close image preview"
              >
                <X size={16} />
              </button>
              <div className="max-h-[90vh] max-w-[80vw] overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-2xl">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-h-[80vh] max-w-[80vw] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
          A
        </div>
        <div className="max-w-md rounded-2xl bg-[#1a1a1c] px-4 py-2.5 text-sm text-white/90">
          {renderAttachments()}
          {message.text && <div>{message.text}</div>}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-6 -top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white cursor-pointer"
              aria-label="Close image preview"
            >
              <X size={16} />
            </button>
            <div className="max-h-[90vh] max-w-[80vw] overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-2xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-h-[80vh] max-w-[80vw] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
})

export default ChatMessage