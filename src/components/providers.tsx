'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import React from 'react'

interface ProvidersProps {
   children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
   return (
      <SessionProvider>
         <SWRConfig
            value={{
               revalidateOnFocus: false,
               revalidateOnReconnect: true,
               dedupingInterval: 5000
            }}
         >
            {children}
         </SWRConfig>
      </SessionProvider>
   )
}
