import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { DatePicker } from '@/components/date-picker'
import TemplateSelect from '@/features/documents/form/components/template-select'
import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'

import DocumentAddressSelect from '../../document-address-select'
import DocumentFieldCard from '../../document-field-card/index'
import { useDocumentFields } from '../document-fields-store'

export default function DocumentSection() {
  const { company } = useCompanySelect()
  const { errors, values } = useDocumentFields()

  return (
    <DocumentFieldCard.Root>
      <DocumentFieldCard.Header
        icon={DocumentAttachmentIcon}
        color="green"
        title="Информация о документе"
        description="Данные документа и его статус"
      />
      <DocumentFieldCard.Content>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel>Нумерация</FieldLabel>
            <Input
              data-testid="enumeration-input"
              aria-invalid={Boolean(errors?.enumeration?.length)}
              defaultValue={values?.enumeration}
              name="enumeration"
              placeholder="0004"
            />
            <FieldError errors={errors?.enumeration} />
          </Field>

          <Field>
            <FieldLabel>Дата документа</FieldLabel>
            <DatePicker
              data-testid="document-date-input"
              name="documentDate"
              invalid={Boolean(errors?.documentDate?.length)}
              defaultValue={values?.documentDate}
            />
            <FieldError errors={errors?.documentDate} />
          </Field>
        </div>
        {company === DEFAULT_COMPANY_TYPE && (
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Шаблон</FieldLabel>
              <TemplateSelect defaultValue={values?.templateType} name="templateType" />
            </Field>
            <Field>
              <FieldLabel>Адрес документа</FieldLabel>
              <DocumentAddressSelect
                name="documentAddress"
                defaultValue={values?.documentAddress}
              />
            </Field>
          </div>
        )}
      </DocumentFieldCard.Content>
    </DocumentFieldCard.Root>
  )
}
