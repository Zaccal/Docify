'use server'

import { env } from '@Docify/env/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { COOKIE_NAME } from '@/features/auth/lib/constant'
import { loginSchema } from '@/features/auth/schemas/login.schema'
import type { LoginState } from '@/features/auth/types/login-state.type'

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return { success: false, error: result.error.issues }
  }

  if (result.data.password !== env.PASSWORD) {
    return { success: false, error: [{ message: 'Неверный пароль' }] }
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
