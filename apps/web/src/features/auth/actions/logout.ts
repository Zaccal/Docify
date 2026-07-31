'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { COOKIE_NAME } from '../lib/constant'

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.delete(COOKIE_NAME)

  redirect('/')
}
