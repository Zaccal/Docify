import { NextResponse, type NextRequest } from 'next/server'

import { searchDocuments } from '@/server/documents/search'

export async function GET(req: NextRequest) {
  const notParsedQuery = req.nextUrl.searchParams.get('q')

  if (!notParsedQuery) {
    return NextResponse.json(
      {
        success: false,
        message: 'Query parameter "q" is required'
      },
      { status: 400 }
    )
  }

  const query = decodeURIComponent(notParsedQuery)

  try {
    const result = await searchDocuments(query)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        success: false,
        message: 'Не удалось загрузить документы',
        error: errorMessage
      },
      { status: 500 }
    )
  }
}
