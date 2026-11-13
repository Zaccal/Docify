import path from 'node:path'

import type {
  PointOfSale,
  TemplateType
} from '@/features/documents/form/schemas/document-schema/document.schema'
import type { Company } from '@/types/company.type'
import type { Template } from '@/types/enums/template.enum'

const pointOfSaleDirectories: Record<PointOfSale, string> = {
  Караганда: 'karaganda',
  Жанаарка: 'zhanaarka'
}

export function getTemplatePath(
  templateRoot: string,
  organization: Company,
  template: Template,
  templateType: TemplateType = 'APARTMENT',
  pointOfSale: PointOfSale = 'Жанаарка'
) {
  let templateDirectory = path.join(templateRoot, organization)

  if (organization === 'XANSHA') {
    const locationDirectory = pointOfSaleDirectories[pointOfSale]
    if (!locationDirectory) {
      throw new Error(`Invalid pointOfSale: ${pointOfSale}`)
    }
    templateDirectory = path.join(templateDirectory, locationDirectory)
  }

  if (templateType === 'HOTEL' && organization === 'XANSHA') {
    templateDirectory = path.join(templateDirectory, 'HOTEL')
  }

  return path.join(templateDirectory, template)
}
