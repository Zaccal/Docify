import type { SearchState } from '@/types/search-state.type'

export async function fetchExistingDocuments(
  query: string,
  signal: AbortSignal
): Promise<SearchState> {
  const response = await fetch(`/api/documents/search?q=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}
