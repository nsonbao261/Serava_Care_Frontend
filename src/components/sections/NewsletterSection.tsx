import { Button } from '@/components'
import { Mail } from 'lucide-react'

const NewsletterSection = () => {
   return (
      <section className="py-16 bg-white relative">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
               <Mail className="h-8 w-8 text-blue-600 mr-3" />
               <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  ĐĂNG KÝ NHẬN THÔNG TIN CỦA CHÚNG TÔI
               </h2>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
               Nhận thông tin sức khỏe hữu ích và ưu đãi đặc biệt từ Serava Care
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
               <input
                  type="email"
                  placeholder="Địa chỉ email của bạn"
                  className="flex-1 px-6 py-4 h-12 rounded-lg border-2 border-blue-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
               />
               <input
                  type="text"
                  placeholder="Họ tên đầy đủ"
                  className="flex-1 px-6 py-4 h-12 rounded-lg border-2 border-blue-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
               />
               <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-12 rounded-lg font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200"
               >
                  ĐĂNG KÝ NGAY
               </Button>
            </div>

            <p className="text-gray-500 text-sm mt-4">
               Bằng cách đăng ký, bạn đồng ý với{' '}
               <a
                  href="/chinh-sach-bao-mat"
                  className="underline hover:text-blue-600 text-blue-500"
               >
                  Chính sách bảo mật
               </a>{' '}
               của chúng tôi
            </p>
         </div>
      </section>
   )
}

export default NewsletterSection
