import { Button } from '@/components'
import Link from 'next/link'

const CTASection = () => {
   return (
      <section className="py-20 bg-white">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
               Bắt đầu chăm sóc sức khỏe của bạn ngay hôm nay
            </h2>
            <p className="text-xl text-gray-600 mb-8">
               Đặt lịch khám với hơn 1000+ bác sĩ chuyên khoa uy tín trên toàn quốc
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/bac-si" className="w-full sm:w-auto">
                  <Button
                     size="lg"
                     className="w-full bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-full"
                  >
                     Xem danh sách bác sĩ
                  </Button>
               </Link>
               <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-4 text-lg rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
               >
                  Tải ứng dụng mobile
               </Button>
            </div>
         </div>
      </section>
   )
}

export default CTASection
