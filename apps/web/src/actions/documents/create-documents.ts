'use server'

import { z } from 'zod/mini'

import { documentFormSchema } from '@/schemas/document-schema/document.schema'
import { createDocumentController } from '@/server/documents/create-document'
import type { CreateDocumentState, CreateDocumentValues } from '@/types/create-document-state.type'
import { getDocumentFormData } from '@/utils/create-document-formater'
import { formatPostgresError } from '@/utils/format-postgres-error'
import { toFieldErrors } from '@/utils/to-field-errors'

export async function createDocument(
  _prevState: CreateDocumentState,
  formData: FormData
): Promise<CreateDocumentState> {
  const values = getDocumentFormData(formData) as CreateDocumentValues
  const result = documentFormSchema.safeParse(values)

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error).fieldErrors
    const error = toFieldErrors(flattenedErrors)
    return { success: false, error, values }
  }

  const data = result.data

  try {
    const document = await createDocumentController(data)

    return { success: true, values: data, documentId: document.id }
  } catch (error) {
    return {
      success: false,
      message: formatPostgresError(error),
      values: data
    }
  }
}
