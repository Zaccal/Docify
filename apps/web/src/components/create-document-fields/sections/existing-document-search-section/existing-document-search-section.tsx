import {
  Field,
  FieldDescription,
  FieldError,
  FieldLegend,
  FieldSet
} from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Search02Icon } from '@hugeicons/core-free-icons'
import { format } from 'date-fns'
import { useState } from 'react'

import CreateDocumentCard from '@/components/create-document-card/index'
import Lists from '@/components/lists'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { useQuery } from '@/hooks/useQuery'
import type { SearchState } from '@/types/search-state.type'
import { cutText } from '@/utils/cut-text'

async function fetchExistingDocuments(query: string, signal: AbortSignal): Promise<SearchState> {
  const response = await fetch(`/api/documents/search?q=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  const data = await response.json()
  return data
}

export default function ExistingDocumentSearchSection() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const { isLoading, error, data } = useQuery(
    async ({ signal }) => {
      return fetchExistingDocuments(debouncedQuery, signal)
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

    if (!value.trim()) {
      handleSearch.cancel()
      setDebouncedQuery('')
      return
    }

    handleSearch(value)
  }

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
                disabled={isLoading && hasQuery}
                value={query}
                onChange={handleInputChange}
                type="search"
                placeholder="Выполняйте поиск по имени клиента или номеру документа..."
              />
              <FieldError errors={hasQuery && error ? [error] : undefined} />
            </Field>
            {documents.length > 0 && (
              <Lists.Root className="mt-4">
                {documents.map((document) => (
                  <Lists.Item key={document.id}>
                    <div>
                      <h3 className="font-semibold">{document.customer.fullnameClient}</h3>
                      <p
                        className="mt-1 text-sm text-neutral-400"
                        title={document.organization.organization}
                      >
                        {cutText(document.organization.organization, 50)} · №{document.enumeration}{' '}
                        · {format(document.updatedAt, 'dd.MM.yyyy')}
                      </p>
                    </div>
                  </Lists.Item>
                ))}
              </Lists.Root>
            )}
          </div>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>
    </>
  )
}
