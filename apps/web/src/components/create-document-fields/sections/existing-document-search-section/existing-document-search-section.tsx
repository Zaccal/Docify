import {
  Field,
  FieldDescription,
  FieldError,
  FieldLegend,
  FieldSet
} from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Search02Icon } from '@hugeicons/core-free-icons'
import { useState } from 'react'

import CreateDocumentCard from '@/components/create-document-card/index'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { useQuery } from '@/hooks/useQuery'
import { searchDocuments } from '@/services/documents/search-documents'
import type { SearchResultDocument } from '@/types/search-state.type'

import ExistingDocumentSearchNotice from './existing-document-search-notice'
import ExistingDocumentSearchResult from './existing-document-search-result'

interface ExistingDocumentSearchSectionProps {
  onSelect: (document: SearchResultDocument) => void
}

export default function ExistingDocumentSearchSection({
  onSelect
}: ExistingDocumentSearchSectionProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<SearchResultDocument | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const { error, data } = useQuery(
    async ({ signal }) => {
      return searchDocuments(debouncedQuery, signal)
    },
    {
      keys: [debouncedQuery],
      enabled: debouncedQuery.trim().length > 0
    }
  )
  const hasQuery = debouncedQuery.trim().length > 0
  const documents = hasQuery ? (data?.data ?? []) : []

  const handleSearch = useDebounceCallback((query: string) => {
    setDebouncedQuery(query)
  }, 500)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setQuery(value)
    setSelected(null)

    if (!value.trim()) {
      handleSearch.cancel()
      setDebouncedQuery('')
      return
    }

    handleSearch(value)
  }

  function handleDocumentSelect(document: SearchResultDocument) {
    onSelect(document)
    setQuery(document.customer.fullnameClient)
    setSelected(document)
    handleSearch.cancel()
    setDebouncedQuery('')
  }

  const isShowList = documents.length > 0 && !selected

  return (
    <>
      <FieldSet>
        <FieldLegend>Создание документа</FieldLegend>
        <FieldDescription>Заполните поля для создания документа</FieldDescription>
      </FieldSet>
      <CreateDocumentCard.Root>
        <CreateDocumentCard.Header
          color="gray"
          icon={Search02Icon}
          title="Загрузка из существующих"
          description="Поиск и предварительное заполнение по предыдущему документу"
        />
        <CreateDocumentCard.Content>
          <div>
            <Field>
              <Input
                value={query}
                onChange={handleInputChange}
                type="search"
                placeholder="Выполняйте поиск по имени клиента или номеру документа..."
              />
              <FieldError errors={hasQuery && error ? [error] : undefined} />
            </Field>
            <ExistingDocumentSearchResult
              documents={documents}
              isShowList={isShowList}
              onDocumentSelect={handleDocumentSelect}
            />
            {selected && (
              <ExistingDocumentSearchNotice>
                Поля, предварительно заполненные в документе ({selected.customer.fullnameClient}).
                Будут сохранены только измененные поля.
              </ExistingDocumentSearchNotice>
            )}
          </div>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>
    </>
  )
}
