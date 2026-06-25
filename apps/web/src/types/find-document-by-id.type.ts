import type { findDocumentById } from '@/controllers/documents/find-by-id'

export type FindDocumentByIdData = Awaited<ReturnType<typeof findDocumentById>>
