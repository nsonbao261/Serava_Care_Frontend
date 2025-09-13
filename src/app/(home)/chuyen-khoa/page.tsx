import { getAllSpecialties } from '@/services'
import SpecialtyResults from '@/app/(home)/chuyen-khoa/specialty-results'

export default async function SpecialtiesPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Chuyên khoa</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Tìm kiếm các chuyên khoa phù hợp với nhu cầu khám chữa bệnh của bạn
                  </p>
               </div>
            </div>
         </div>

         <SpecialtyResults specialties={await getAllSpecialties()} />
      </div>
   )
}
