import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
      const accessToken = request.cookies.get('access_token')
      const userData = request.cookies.get('user_data')

      // If no auth cookies found, redirect to login
      if (!accessToken || !userData) {
         const loginUrl = new URL('/login', request.url)
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
