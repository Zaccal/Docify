import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { DatePicker } from '@/components/date-picker'
import {
  documentAddressSchema,
  pointOfSale,
  type TemplateType
} from '@/features/documents/form/schemas/document-schema/document.schema'
import { DEFAULT_COMPANY_TYPE, DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'

import DocumentFieldCard from '../../document-field-card/index'
import GenericSelect from '../../selects/generic-select'
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
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>Шаблон</FieldLabel>
              <GenericSelect
                options={{
                  name: 'templateType',
                  options: [
                    { value: 'APARTMENT', label: 'Квартирная' },
                    { value: 'HOTEL', label: 'Гостиничный' }
                  ] satisfies readonly { value: TemplateType; label: string }[],
                  defaultValue: values?.templateType ?? DEFAULT_TEMPLATE_TYPE,
                  placeholder: 'Выберите шаблон',
                  testId: 'template-select'
                }}
              />
            </Field>
            <Field>
              <FieldLabel>Адрес документа</FieldLabel>
              <GenericSelect
                options={{
                  name: 'documentAddress',
                  options: documentAddressSchema.options,
                  defaultValue: values?.documentAddress ?? documentAddressSchema.options[0],
                  placeholder: 'Выберите адрес',
                  testId: 'document-address-select'
                }}
              />
            </Field>
            <Field>
              <FieldLabel>Точка продаж</FieldLabel>
              <GenericSelect
                options={{
                  name: 'pointOfSale',
                  options: pointOfSale.options,
                  defaultValue: values?.pointOfSale ?? pointOfSale.options[1],
                  placeholder: 'Выберите точку продаж',
                  testId: 'point-of-sale-select'
                }}
              />
            </Field>
          </div>
        )}
      </DocumentFieldCard.Content>
    </DocumentFieldCard.Root>
  )
}
