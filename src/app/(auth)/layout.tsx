// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//    return <div className="auth-container">{children}</div>
// }
'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname()

   return (
      <html lang="en">
         <body>
            <AnimatePresence mode="wait" initial={false}>
               <div key={pathname}>{children}</div>
            </AnimatePresence>
         </body>
      </html>
   )
}