import type { DocumentFormError } from '@/schemas/document-schema/document.schema'

export function toFieldErrors(object: Record<string, string[]>) {
  return Object.entries(object).reduce<DocumentFormError>((acc, [field, messages]) => {
    if (messages?.length) {
      acc[field as keyof DocumentFormError] = messages.map((message) => ({ message }))
    }

    return acc
  }, {})
}
