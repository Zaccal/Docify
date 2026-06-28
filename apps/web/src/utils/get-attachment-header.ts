export function getAttachmentHeader(filename: string) {
  const fallbackFilename = filename.replace(/[^\x20-\x7E]/g, '_')
  const encodedFilename = encodeURIComponent(filename)

  return `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`
}
