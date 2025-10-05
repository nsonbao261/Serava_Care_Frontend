'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

export default (({ children }) => (
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
)) satisfies React.FC<PropsWithChildren>
