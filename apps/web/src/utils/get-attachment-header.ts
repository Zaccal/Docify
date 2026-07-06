export function getAttachmentHeader(filename: string) {
  const fallbackFilename = filename.replace(/[^\x20-\x7E]/g, '_')
  const encodedFilename = encodeURIComponent(filename)

  return `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`
}

export function getFilenameFromHeader(disposition: string | null, fallback: string): string {
  if (!disposition) return fallback

  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/)
  if (utf8Match) return decodeURIComponent(utf8Match[1])

  const asciiMatch = disposition.match(/filename="?([^"]+)"?/)
  if (asciiMatch) return asciiMatch[1]

  return fallback
}
