import {BackToTop, Providers, Toaster} from '@/components'
import type {Viewport} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'
import React, {PropsWithChildren} from "react";

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

export default (({children}) => (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
    <Providers>
        {children}
        <Toaster richColors position="top-right"/>
        <BackToTop threshold={300}/>
    </Providers>
    </body>
    </html>
))  satisfies React.FC<PropsWithChildren<object>>
