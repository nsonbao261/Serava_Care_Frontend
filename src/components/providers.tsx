'use client'

import {SessionProvider} from 'next-auth/react'
import {SWRConfig} from 'swr'
import React, {PropsWithChildren} from 'react'

export default (({children}) => (
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
