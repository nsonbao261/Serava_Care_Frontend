'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BackgroundMotion } from '@/components'

export default function SignUpRedirect() {
   const router = useRouter()

   useEffect(() => {
      // Get current URL parameters from window.location
      const urlParams = new URLSearchParams(window.location.search)
      const returnUrl = urlParams.get('returnUrl')

      // Build redirect URL with returnUrl if present
      const baseUrl = '/login?action=signup'
      const redirectUrl = returnUrl
         ? `${baseUrl}&returnUrl=${encodeURIComponent(returnUrl)}`
         : baseUrl

      router.replace(redirectUrl)
   }, [router])

   return (
      <div className="auth-content bg-gradient-to-br from-blue-50 to-blue-100 p-1 sm:p-2 relative">
         <BackgroundMotion />
         <div className="text-blue-700 relative z-10">Đang chuyển hướng...</div>
      </div>
   )
}
