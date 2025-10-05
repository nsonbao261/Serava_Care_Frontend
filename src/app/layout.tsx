import type { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { PropsWithChildren } from 'react'
import './globals.css'

// Components
import BackToTop from '@/components/common/back-to-top'
import Providers from '@/components/providers'
import { Toaster } from '@/components/ui'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin']
})

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin']
})

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1
}

export default (({ children }) => (
   <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
         <Providers>
            {children}
            <Toaster richColors position="top-right" />
            <BackToTop threshold={300} />
         </Providers>
      </body>
   </html>
)) satisfies React.FC<PropsWithChildren<object>>
