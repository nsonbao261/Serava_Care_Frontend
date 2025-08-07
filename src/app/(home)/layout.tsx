import type { Metadata } from 'next'

// Components
import { AnimatedPageTitle, FloatingActionButton, Footer, Header } from '@/components'

// Deps
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <AnimatedPageTitle />
         <Header />
         {children}
         <Footer />
         <FloatingActionButton />
      </main>
   )
}
