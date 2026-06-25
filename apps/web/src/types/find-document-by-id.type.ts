import type { findDocumentById } from '@/server/documents/find-by-id'

export type FindDocumentByIdData = Awaited<ReturnType<typeof findDocumentById>>
