import type { searchDocuments } from '@/server/repositories/documents/search'

export interface SearchState {
  success: boolean
  data: Awaited<ReturnType<typeof searchDocuments>>
  message?: string
  error?: string
}

export type SearchResultDocument = SearchState['data'][number]
