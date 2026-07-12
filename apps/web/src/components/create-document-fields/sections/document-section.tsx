import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import TemplateSelect from '@/components/template-select'
import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'

import CreateDocumentCard from '../../create-document-card/index'
import { DatePicker } from '../../date-picker'
import { useCreateDocumentFields } from '../create-document-fields-store'

export default function DocumentSection() {
  const { company } = useCompanySelect()
  const { errors, values } = useCreateDocumentFields()

  return (
    <CreateDocumentCard.Root>
      <CreateDocumentCard.Header
        icon={DocumentAttachmentIcon}
        color="green"
        title="Информация о документе"
        description="Данные документа и его статус"
      />
      <CreateDocumentCard.Content>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel>Нумерация</FieldLabel>
            <Input
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
              name="documentDate"
              invalid={Boolean(errors?.documentDate?.length)}
              defaultValue={values?.documentDate}
            />
            <FieldError errors={errors?.documentDate} />
          </Field>
        </div>
        {company === DEFAULT_COMPANY_TYPE && (
          <Field>
            <FieldLabel>Шаблон</FieldLabel>
            <TemplateSelect name="templateType" />
          </Field>
        )}
      </CreateDocumentCard.Content>
    </CreateDocumentCard.Root>
  )
}
