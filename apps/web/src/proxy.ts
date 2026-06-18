import { NextRequest, NextResponse } from 'next/server'

import { COOKIE_NAME, PUBLIC_ROUTES } from './lib/constants'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTES.includes(path)
  const token = request.cookies.get(COOKIE_NAME)?.value
  const isTokenInvalid = !token || process.env.AUTH_SECRET !== token

  if (isTokenInvalid && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!isTokenInvalid && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
