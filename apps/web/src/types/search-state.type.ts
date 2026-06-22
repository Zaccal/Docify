import type { searchDocuments } from '@/controllers/documents/search.conroller'

export interface SearchState {
  success: boolean
  data: Awaited<ReturnType<typeof searchDocuments>>
  message?: string
  error?: string
}
