const DB_NAME = 'chatbot-db'
const STORE_NAME = 'chat-attachments'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB is not available in this environment.'))
      return
    }

    const request = window.indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error ?? new Error('Unable to open IndexedDB.'))
    }
  })
}

export async function saveAttachment(attachmentId: string, file: Blob, name: string, mimeType: string) {
  const db = await openDatabase()

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put({
      id: attachmentId,
      name,
      mimeType,
      size: file.size,
      blob: file,
      createdAt: Date.now(),
    })

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error ?? new Error('Failed to save attachment.'))
  })
}

export async function getAttachmentBlob(attachmentId: string): Promise<Blob | null> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(attachmentId)

    request.onsuccess = () => {
      const result = request.result
      resolve(result ? result.blob : null)
    }

    request.onerror = () => reject(request.error ?? new Error('Failed to load attachment.'))
  })
}
