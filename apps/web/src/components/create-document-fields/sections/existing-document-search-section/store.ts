import { create } from 'zustand'

import type { SearchResultDocument } from '@/types/search-state.type'

interface ExistingDocumentSearchStore {
  query: string
  setQuery: (query: string) => void
  selected: SearchResultDocument | null
  setSelected: (selected: SearchResultDocument | null) => void
}

export const useExistingDocumentSearchStore = create<ExistingDocumentSearchStore>((set) => ({
  query: '',
  setQuery: (query: string) => set({ query }),
  selected: null,
  setSelected: (selected: SearchResultDocument | null) => set({ selected })
}))
