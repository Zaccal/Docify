import { useCallback, useState } from 'react'

import { getFilenameFromHeader } from '@/utils/get-attachment-header'

export function useDownload() {
  const [error, setError] = useState<Error | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const download = useCallback(async (url: string) => {
    setError(null)
    setIsDownloading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Download failed')

      const disposition = response.headers.get('Content-Disposition')
      const filename = getFilenameFromHeader(disposition, 'download')

      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = objectUrl
      link.download = filename
      document.body.appendChild(link)

      link.click()
      link.remove()

      URL.revokeObjectURL(objectUrl)

      return { success: true as const }
    } catch (err) {
      setError(err as Error)
      return { success: false as const, error: err as Error }
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return {
    download,
    error,
    isError: Boolean(error),
    isDownloading
  }
}
