'use server'

import { mapValues } from 'es-toolkit/compat'
import { z } from 'zod/mini'

import { documentFormSchema } from '@/features/documents/form/schemas/document-schema/document.schema'
import { processNewOrder } from '@/server/applications/orders/process-new-order/process-new-order'

import type { DocumentState, DocumentValues } from '../../form/types/document-state.type'
import { getDocumentFormData } from '../../utils/document-formater/document-formater'
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
    return { success: false, data: null, conflict: null, error, values }
  }

  const data = result.data

  try {
    const result = await processNewOrder(data)

    if (!result.success || !result.data) {
      return {
        success: false,
        data: null,
        conflict: result.conflict,
        message: result.conflict
          ? `Документ с порядковым номером ${result.conflict.enumeration} за ${result.conflict.year} год уже существует`
          : 'Не удалось создать документ',
        values: data
      }
    }

    return {
      success: true,
      data: { documentId: result.data.document.id },
      conflict: null,
      values: data
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      conflict: null,
      message: formatPostgresError(error),
      values: data
    }
  }
}
