import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { env } from '@Docify/env/server'
import DocxTemplate from 'docxtemplater'
import PizZip from 'pizzip'

import { Template } from '@/types/enums/template.enum'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'
import type { Organization } from '@/types/organization.type'
import formatDocumentTemplateData from '@/utils/format-document-template-data/format-document-template-data'

export async function GenerateDocumentsController(
  organization: Organization,
  data: NonNullable<FindDocumentByIdData>
) {
  const archive = new PizZip()
  const leaseAgreementZip = await generateLeaseAgreement(organization, data)

  archive.file(
    `Договор ${data.customer.fullnameClient}.docx`,
    leaseAgreementZip.generate({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    })
  )

  return archive.generate({
    type: 'nodebuffer',
    compression: 'DEFLATE'
  })
}

async function generateLeaseAgreement(
  organization: Organization,
  data: NonNullable<FindDocumentByIdData>
) {
  const templatePath = getTemplatePath(organization, Template.LEASE_AGREEMENT)
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

function getTemplatePath(organization: Organization, template: Template) {
  return path.join(getTemplatesDirectory(organization), template)
}

function getTemplatesDirectory(organization: Organization) {
  return path.join(process.cwd(), env.TEMPLATE_DIR, organization)
}
