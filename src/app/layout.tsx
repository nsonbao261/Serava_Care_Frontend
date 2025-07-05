import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import {
   Header,
   Footer,
   AnimatedPageTitle,
   FloatingActionButton,
   BackToTop,
   Providers
} from '@/components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
            suppressHydrationWarning={true}
         >
            <Providers>
               <AnimatedPageTitle />
               <Header />
               {children}
               <Footer />
               <FloatingActionButton />
               <BackToTop threshold={300} />
               <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
               />
            </Providers>
         </body>
      </html>
   )
}
