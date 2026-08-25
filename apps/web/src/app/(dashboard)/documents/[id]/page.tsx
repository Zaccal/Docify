import { Button } from '@Docify/ui/components/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { Suspense } from 'react'

import CustomerDetails from '@/features/documents/documents-details/customer-details'
import DocumentsDetails from '@/features/documents/documents-details/document-details'
import OrganizationDetails from '@/features/documents/documents-details/organization-details'
import { findDocumentById } from '@/server/repositories/documents/find-document-by-id'

interface Params {
  id: string
}

interface PageProps {
  params: Promise<Params>
}

export default function DocumentPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="wrapper mt-8">Loading Document...</div>}>
      <DocumentDetails params={params} />
    </Suspense>
  )
}

async function DocumentDetails({ params }: PageProps) {
  await connection()

  const { id } = await params
  const document = await findDocumentById(id)

  if (!document) notFound()

  return (
    <div className="wrapper">
      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Документ №{document.enumeration}</h1>
          <p className="text-muted-foreground mt-2 text-sm">ID: {document.id}</p>
        </div>
        <Button variant="outline" render={<Link href="/documents" />}>
          Назад к документам
        </Button>
      </div>

      <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
        <DocumentsDetails data={document} />

        <div className="grid gap-4">
          <CustomerDetails data={document} />

          <OrganizationDetails data={document} />
        </div>
      </div>
    </div>
  )
}
