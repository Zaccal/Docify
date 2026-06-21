import type { DocumentFormError } from '@/schemas/document-schema/document.schema'
import type { CreateDocumentValues } from '@/types/create-document-state.type'

import { CreateDocumentFieldsProvider } from './create-document-fields-store'
import BankSection from './sections/bank-section'
import CellsSection from './sections/cells-section'
import ClientSection from './sections/client-section'
import DocumentSection from './sections/document-section'
import OrganizationSection from './sections/organization-section'

interface CreateDocumentFieldsProps {
  errors?: DocumentFormError
  values?: CreateDocumentValues
}

export default function CreateDocumentFields({ errors, values }: CreateDocumentFieldsProps) {
  return (
    <CreateDocumentFieldsProvider errors={errors} values={values}>
      <DocumentSection />
      <ClientSection />
      <OrganizationSection />
      <BankSection />
      <CellsSection />
    </CreateDocumentFieldsProvider>
  )
}
