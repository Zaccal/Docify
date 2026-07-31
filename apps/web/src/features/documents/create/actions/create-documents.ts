'use server'

import { mapValues } from 'es-toolkit/compat'
import { z } from 'zod/mini'

import { documentFormSchema } from '@/schemas/document-schema/document.schema'
import { processNewOrder } from '@/server/applications/orders/process-new-order'

import type { DocumentState, DocumentValues } from '../../form/types/document-state.type'
import { getDocumentFormData } from '../../utils/document-formater'
import { formatPostgresError } from '../../utils/format-postgres-error'

export async function createDocuments(
  _prevState: DocumentState,
  formData: FormData
): Promise<DocumentState> {
  const values = getDocumentFormData(formData) as DocumentValues
  const result = documentFormSchema.safeParse(values)

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error).fieldErrors
    const error = mapValues(flattenedErrors, (errors) =>
      errors?.length ? errors.map((e) => ({ message: e })) : undefined
    )
    return { success: false, error, values }
  }

  const data = result.data

  try {
    const { document } = await processNewOrder(data)

    return { success: true, values: data, documentId: document.id }
  } catch (error) {
    return {
      success: false,
      message: formatPostgresError(error),
      values: data
    }
  }
}
