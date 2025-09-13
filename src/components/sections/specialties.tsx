import { Button, SpecialtyCard } from '@/components'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { mockSpecialties } from '@/data'

export const Specialties = () => (
   <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Header */}
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chuyên khoa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Tìm kiếm bác sĩ chuyên khoa phù hợp với nhu cầu khám chữa bệnh của bạn
            </p>
         </div>

         {/* Specialties Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {mockSpecialties.slice(1, 6).map((specialty) => (
               <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
         </div>

         {/* Call to Action */}
         <div className="text-center">
            <Link href="/chuyen-khoa">
               <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
               >
                  Xem tất cả chuyên khoa
                  <ChevronRight className="h-5 w-5 ml-2" />
               </Button>
            </Link>
         </div>
      </div>
   </section>
)
