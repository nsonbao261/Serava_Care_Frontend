'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
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
