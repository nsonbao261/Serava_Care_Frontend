import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN, COOKIE_USER_DATA } from '@/constants'

export function middleware(request: NextRequest) {
   // Define protected routes
   const protectedPaths = [
      '/profile',
      '/admin',
      '/cau-hoi-cua-toi',
      '/dat-cau-hoi',
      '/lich-su-dat-kham',
      '/ho-so-suc-khoe',
      '/doi-mat-khau',
      '/lien-ket-tai-khoan'
   ]

   const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

   // If it's a protected path, check for authentication
   if (isProtectedPath) {
      // Check for our custom auth cookies
      const accessToken = request.cookies.get(ACCESS_TOKEN)
      const userData = request.cookies.get(COOKIE_USER_DATA)

      // If no auth cookies found, redirect to sign-in
      if (!accessToken || !userData) {
         const loginUrl = new URL('/sign-in', request.url)
         loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname)
         return NextResponse.redirect(loginUrl)
      }
   }

   // Allow access to public routes
   return NextResponse.next()
}

export const config = {
   matcher: [
      // Match all request paths except for the ones starting with:
      // - api (API routes)
      // - _next/static (static files)
      // - _next/image (image optimization files)
      // - favicon.ico (favicon file)
      '/((?!api|_next/static|_next/image|favicon.ico).*)'
   ]
}
