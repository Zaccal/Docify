import type { DocumentFormError } from '../../schemas/document-schema/document.schema'
import type { DocumentValues } from '../../types/document-state.type'
import { DocumentFieldsProvider } from './document-fields-store'
import BankSection from './sections/bank-section'
import CellsSection from './sections/cells-section'
import ClientSection from './sections/client-section'
import DocumentSection from './sections/document-section'
import OrganizationSection from './sections/organization-section'

interface DocumentFieldsProps {
  errors?: DocumentFormError
  values?: DocumentValues
}

export default function DocumentFields({ errors, values }: DocumentFieldsProps) {
  return (
    <DocumentFieldsProvider errors={errors} values={values}>
      <DocumentSection />
      <ClientSection />
      <OrganizationSection />
      <BankSection />
      <CellsSection />
    </DocumentFieldsProvider>
  )
}
