'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Role = 'GUEST' | 'ADMIN' | 'DOCTOR' | 'NURSE'

interface Props {
   allowedRoles: Role[]
   children: React.ReactNode
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
   const { data: session, status } = useSession()
   const pathname = usePathname()
   const router = useRouter()

   useEffect(() => {
      if (status === 'loading') return

      if (!session) {
         router.replace(`/auth?callbackUrl=${encodeURIComponent(pathname)}`)
         return
      }

      const userRole = (session.user?.role || 'GUEST') as Role
      if (!allowedRoles.includes(userRole)) {
         router.replace('/')
         return
      }
   }, [status, session, allowedRoles, pathname, router])

   if (status === 'loading' || status === 'unauthenticated') {
      return null
   }

   return <>{children}</>
}
