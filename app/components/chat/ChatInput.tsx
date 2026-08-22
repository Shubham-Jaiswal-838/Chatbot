'use client'

import { memo, useCallback, useRef, useState, useEffect } from 'react'
import { ImagePlus, Shuffle, X, Mic, ArrowUp } from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks'
import { addMessage } from '@/lib/features/chatSlice'
import { saveAttachment } from '@/lib/indexedDb'

const defaultTags = ['retro']

type ChatInputProps = {
  isListening: boolean
  onToggleListening: () => void
  text?: string
  onTextChange?: (value: string) => void
}

const ChatInput = memo(function ChatInput({
  isListening,
  onToggleListening,
  text: controlledText,
  onTextChange,
}: ChatInputProps) {
  const [text, setText] = useState(controlledText ?? '')
  const [tags, setTags] = useState(defaultTags)
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (controlledText !== undefined) {
      setText(controlledText)
    }
  }, [controlledText])

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value)
      onTextChange?.(value)
    },
    [onTextChange],
  )

  const handleSubmit = useCallback(async () => {
    const trimmed = text.trim()
    const imageFiles = files.filter((file) => /\.(jpe?g|png|webp)$/i.test(file.name) || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type))

    if (!trimmed && imageFiles.length === 0) return

    const attachments = await Promise.all(
      imageFiles.map(async (file) => {
        const attachmentId = crypto.randomUUID()

        await saveAttachment(attachmentId, file, file.name, file.type || 'image/jpeg')

        return {
          id: attachmentId,
          name: file.name,
          mimeType: file.type || 'image/jpeg',
          size: file.size,
        }
      }),
    )

    dispatch(
      addMessage({
        id: crypto.randomUUID(),
        sender: 'user',
        text: trimmed,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
    )

    handleTextChange('')
    setFiles([])
  }, [dispatch, files, handleTextChange, text])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && (text.trim() || files.length > 0)) {
        e.preventDefault()
        void handleSubmit()
      }
    },
    [files.length, handleSubmit, text],
  )

  const handleTagClick = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
    const cleanValue = text.trim()
    const nextValue = cleanValue ? `${cleanValue} ${tag}` : tag
    requestAnimationFrame(() => inputRef.current?.focus())
    handleTextChange(nextValue)
  }, [handleTextChange, text])

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click()
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected || selected.length === 0) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    const imageFiles = Array.from(selected).filter(
      (file) => allowedTypes.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name),
    )

    if (imageFiles.length === 0) {
      e.target.value = ''
      return
    }

    setFiles((prev) => [...prev, ...imageFiles])
    e.target.value = ''
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const removeFile = useCallback((name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name))
  }, [])

  const handleMicClick = useCallback(() => {
    onToggleListening()
  }, [onToggleListening])

  return (
    <form
      className="mx-8 mb-6 rounded-2xl bg-[#1a1a1c] p-4 md:rounded-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        void handleSubmit()
      }}
    >
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what needs to be created"
        className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
      />

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file) => (
            <span
              key={file.name}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              {file.name}
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="cursor-pointer text-white/40 hover:text-white/70"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleFileClick}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/15"
          >
            <ImagePlus size={16} />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/15"
          >
            <Shuffle size={16} />
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/15"
            >
              {tag}
              <span className="text-white/40 hover:text-white/70">
                <X size={12} />
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMicClick}
            aria-pressed={isListening}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
              isListening
                ? 'bg-violet-500/30 text-violet-200 ring-2 ring-violet-400/60'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Mic size={18} />
          </button>
          <button
            type="submit"
            disabled={!text.trim() && files.length === 0}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              text.trim() || files.length > 0
                ? 'cursor-pointer bg-white text-black'
                : 'cursor-not-allowed bg-white/20 text-black/40'
            }`}
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </form>
  )
})

export default ChatInput