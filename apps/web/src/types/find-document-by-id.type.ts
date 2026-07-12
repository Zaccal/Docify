import type { findDocumentById } from '@/server/repositories/documents/find-document-by-id'

export type FindDocumentByIdData = Awaited<ReturnType<typeof findDocumentById>>
