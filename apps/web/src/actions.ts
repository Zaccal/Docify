'use server'

import { env } from '@Docify/env/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { COOKIE_NAME } from './lib/constants'
import { loginSchema } from './schemas/login.schema'
import type { LoginState } from './types/login-state.type'

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
