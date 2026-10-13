import { create } from 'zustand'

import type { EnumerationConflict } from '@/types/document-result.type'

interface EnumerationSwapState {
  isOpen: boolean
  data: EnumerationConflict | null
  toggle: () => void
  close: () => void
  open: (data?: EnumerationConflict | null) => void
  setOpen: (open: boolean) => void
}

export const useEnumerationSwapStore = create<EnumerationSwapState>((set) => ({
  isOpen: false,
  data: null,
  toggle: () => set((state: { isOpen: boolean }) => ({ isOpen: !state.isOpen, data: null })),
  open: (data: EnumerationConflict | null = null) => set(() => ({ isOpen: true, data })),
  close: () => set(() => ({ isOpen: false, data: null })),
  setOpen: (open: boolean) => set(() => ({ isOpen: open, data: null }))
}))
