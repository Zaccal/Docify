import { format } from 'date-fns'
import { truncate } from 'es-toolkit/compat'

import Lists from '@/components/lists'
import type { SearchState } from '@/types/search-state.type'

interface ExistingDocumentSearchResultProps {
  isShowList: boolean
  documents: SearchState['data']
  onDocumentSelect: (document: SearchState['data'][number]) => void
}

export default function ExistingDocumentSearchResult({
  isShowList,
  documents,
  onDocumentSelect
}: ExistingDocumentSearchResultProps) {
  return (
    <>
      {isShowList && (
        <Lists.Root className="mt-4">
          {documents.map((document) => (
            <Lists.Item onClick={() => onDocumentSelect(document)} key={document.id}>
              <div>
                <h3 className="font-semibold">{document.customer.fullnameClient}</h3>
                <p
                  className="mt-1 text-sm text-neutral-400"
                  title={document.organization.organization}
                >
                  {truncate(document.organization.organization, {
                    length: 50
                  })}{' '}
                  · №{document.enumeration} · {format(document.updatedAt, 'dd.MM.yyyy')}
                </p>
              </div>
            </Lists.Item>
          ))}
        </Lists.Root>
      )}
    </>
  )
}
