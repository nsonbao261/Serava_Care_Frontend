import { Metadata } from 'next'

// Components
import { FloatingActionButton } from '@/components/common'
import { Footer, Header } from '@/components/layout'
import { AnimatedPageTitile } from '@/features/animations'

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

export default (({ children }) => (
   <>
      <AnimatedPageTitile />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
   </>
)) satisfies React.FC<{ children: React.ReactNode }>
