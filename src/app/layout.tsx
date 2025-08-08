import {
   AnimatedPageTitle,
   BackToTop,
   FloatingActionButton,
   Footer,
   Header,
   Providers
} from '@/components'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientLoginPanel from '@/components/layout/AuthWrapper'

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

export const metadata: Metadata = {
   title: {
      default: 'Serava Care - Đặt lịch khám bệnh dễ dàng & nhanh chóng',
      template: '%s | Serava Care'
   },
   description:
      'Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng với hơn 1000 bác sĩ, 125 bệnh viện, phòng khám trên toàn quốc. Ứng dụng đặt lịch khám bệnh hiện đại và tiện lợi nhất.',
   keywords: [
      'đặt lịch khám bệnh',
      'tìm bác sĩ',
      'bệnh viện',
      'phòng khám',
      'chăm sóc sức khỏe',
      'khám bệnh online'
   ],
   authors: [{ name: 'Serava Care Team' }],
   robots: 'index, follow'
}

export default function RootLayout({
   children
}: {
   children: React.ReactNode
}) {
   
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
            <Providers>
               <AnimatedPageTitle />
               <Header />
               {children}
               <ClientLoginPanel />
               <Footer />
               <FloatingActionButton />
               <Toaster />
               <BackToTop threshold={300} />
            </Providers>
         </body>
      </html>
   )
}
