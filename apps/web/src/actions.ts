'use server'

import { env } from '@Docify/env/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod/mini'

import { COOKIE_NAME } from './lib/constants'
import { documentFormSchema } from './schemas/document-schema/document.schema'
import { loginSchema } from './schemas/login.schema'
import type { CreateDocumentState } from './types/create-document-state.type'
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
  const result = documentFormSchema.safeParse(getDocumentFormData(formData))

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error).fieldErrors
    const error = toFieldErrors(flattenedErrors)
    return { success: false, error }
  }

  return { success: true }
}
