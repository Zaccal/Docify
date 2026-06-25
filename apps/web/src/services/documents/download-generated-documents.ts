export function downloadGeneratedDocument(documentId: string, organization: string) {
  const url = `/api/documents/generate/${documentId}?organization=${encodeURIComponent(organization)}`
  window.location.assign(url)
}
