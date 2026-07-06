import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { env } from '@Docify/env/server'
import { format } from 'date-fns'
import DocxTemplate from 'docxtemplater'
import PizZip from 'pizzip'

import { DEFAULT_ORGANIZATION_TYPE, DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import type { TemplateType } from '@/schemas/document-schema/document.schema'
import { fetchExcelService } from '@/services/documents/fetch-excel-service'
import { Template } from '@/types/enums/template.enum'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'
import type { Organization } from '@/types/organization.type'
import formatDocumentTemplateData from '@/utils/format-document-template-data/format-document-template-data'

export async function GenerateDocumentsController(
  organization: Organization,
  data: NonNullable<FindDocumentByIdData>,
  templateType: TemplateType = 'APARTMENT'
) {
  const archive = new PizZip()
  const leaseAgreementZip = await generateLeaseAgreement(organization, data, templateType)
  const excelArchive = await fetchExcelService(organization, data, templateType)

  archive.file(
    `Договор ${data.customer.fullnameClient} ${format(data.updatedAt, 'dd-MM-yyyy')}.docx`,
    leaseAgreementZip.generate({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    })
  )
  addZipFilesToArchive(archive, excelArchive)

  return archive.generate({
    type: 'nodebuffer',
    compression: 'DEFLATE'
  })
}

async function generateLeaseAgreement(
  organization: Organization,
  data: NonNullable<FindDocumentByIdData>,
  templateType: TemplateType = DEFAULT_TEMPLATE_TYPE
) {
  if (organization !== DEFAULT_ORGANIZATION_TYPE && templateType === 'HOTEL') {
    throw new Error('Hotel template is only available for XANSHA organization')
  }

  const templatePath = getTemplatePath(organization, Template.LEASE_AGREEMENT, templateType)
  const templateBuffer = await readFile(templatePath)

  const zip = new PizZip(templateBuffer)

  const leaseAgreementDoc = new DocxTemplate(zip, {
    paragraphLoop: true,
    linebreaks: true
  })

  const templateData = formatDocumentTemplateData(data, Template.LEASE_AGREEMENT)
  leaseAgreementDoc.render(templateData)

  return leaseAgreementDoc.getZip()
}

function addZipFilesToArchive(archive: PizZip, zipBuffer: Buffer) {
  const sourceArchive = new PizZip(zipBuffer)

  for (const file of Object.values(sourceArchive.files)) {
    if (file.dir) {
      continue
    }

    archive.file(file.name, file.asUint8Array(), {
      binary: true,
      date: file.date
    })
  }
}

function getTemplatePath(
  organization: Organization,
  template: Template,
  templateType: TemplateType = 'APARTMENT'
) {
  if (templateType === 'HOTEL') {
    return path.join(getTemplatesDirectory(organization), 'HOTEL', template)
  }

  return path.join(getTemplatesDirectory(organization), template)
}

function getTemplatesDirectory(organization: Organization) {
  const templateDir = path.isAbsolute(env.TEMPLATE_DIR)
    ? env.TEMPLATE_DIR
    : path.join(process.cwd(), 'templates')

  return path.join(templateDir, organization)
}
