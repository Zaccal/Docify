'use server'

import { db } from '@Docify/db'
import { CustomersTable, DocumentsTable, OrganizationsTable } from '@Docify/db/schema'
import { env } from '@Docify/env/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod/mini'

import { COOKIE_NAME } from './lib/constants'
import { documentFormSchema } from './schemas/document-schema/document.schema'
import { loginSchema } from './schemas/login.schema'
import type { CreateDocumentState, CreateDocumentValues } from './types/create-document-state.type'
import type { LoginState } from './types/login-state.type'
import { getDocumentFormData } from './utils/create-document-formater'
import { toFieldErrors } from './utils/to-field-errors'

export async function Login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return { success: false, error: result.error.issues }
  }

  if (result.data.password !== env.PASSWORD) {
    return { success: false, error: [{ message: 'Не верный пароль' }] }
  }

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, env.AUTH_SECRET, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  redirect('/dashboard')
}

export async function Logout() {
  const cookieStore = await cookies()

  cookieStore.delete(COOKIE_NAME)

  redirect('/')
}

export async function createDocument(
  _prevState: CreateDocumentState,
  formData: FormData
): Promise<CreateDocumentState> {
  const values = getDocumentFormData(formData) as CreateDocumentValues
  const result = documentFormSchema.safeParse(values)

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error).fieldErrors
    const error = toFieldErrors(flattenedErrors)
    return { success: false, error, values }
  }

  const data = result.data

  try {
    await db.transaction(async (tx) => {
      const [organization] = await tx
        .insert(OrganizationsTable)
        .values({
          organization: data.organization,
          address: data.address,
          bank: data.bank,
          bik: data.bik,
          index: data.index,
          bin: data.bin,
          city: data.city,
          costPerDay: data.costPerDay,
          iik: data.iik
        })
        .returning()

      const [customer] = await tx
        .insert(CustomersTable)
        .values({
          fullnameClient: data.fullnameClient,
          clientIdNumber: data.clientIdNumber,
          clientIdDateFrom: data.clientIdDateFrom,
          clientIdType: data.clientIdType,
          iin: data.iin,
          organizationId: organization.id
        })
        .returning()

      await tx.insert(DocumentsTable).values({
        enumeration: data.enumeration,
        documentDate: data.documentDate,
        cellsLine: data.cellsLine ?? {},
        customerId: customer.id,
        organizationId: organization.id
      })
    })
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      values: data
    }
  }

  return { success: true, values: data }
}
