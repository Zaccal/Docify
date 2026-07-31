import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'

import { templateTypeSchema } from '../form/schemas/document-schema/document.schema'

export function validateTemplateType(templateTypeRaw: FormDataEntryValue | null) {
  const parsedTemplateType = templateTypeSchema.safeParse(templateTypeRaw)
  return parsedTemplateType.success ? parsedTemplateType.data : DEFAULT_TEMPLATE_TYPE
}
