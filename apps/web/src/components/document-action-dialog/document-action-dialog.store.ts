'use client'

import { create } from 'zustand'

interface DocumentActionDialogStore {
  selectedAction: string
  setSelectedAction: (action: string) => void
}

export const useDocumentActionDialogStore = create<DocumentActionDialogStore>((set) => ({
  selectedAction: '',
  setSelectedAction: (action: string) => set({ selectedAction: action })
}))
