import Link from 'next/link'
import { Button, DoctorCard } from '@/components'

interface DoctorsResultsProps {
   doctors: Doctor[]
   totalDoctors: number
   specialtyFilter: string
   currentPage: number
   totalPages: number
   searchQuery: string
}

export function DoctorsResults({
   doctors,
   totalDoctors,
   specialtyFilter,
   currentPage,
   totalPages,
   searchQuery
}: DoctorsResultsProps) {
   const buildUrl = (page: number) => {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (specialtyFilter !== 'Tất cả chuyên khoa') params.set('specialty', specialtyFilter)
      params.set('page', String(page))
      return `/bac-si?${params}`
   }

   return (
      <>
         {/* Results Count */}
         <div className="mb-6">
            <p className="text-gray-600">
               Tìm thấy <span className="font-semibold text-gray-900">{totalDoctors}</span> bác sĩ
               {specialtyFilter !== 'Tất cả chuyên khoa' && (
                  <span>
                     {' '}
                     cho chuyên khoa{' '}
                     <span className="font-semibold text-blue-600">{specialtyFilter}</span>
                  </span>
               )}
            </p>
         </div>

         {/* Doctors Grid */}
         {doctors.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 tablet-grid-spacing">
               {doctors.map((doctor, index) => (
                  <DoctorCard key={doctor.id} doctor={doctor} showLocation={false} index={index} />
               ))}
            </div>
         )}

         {/* No Data State */}
         {doctors.length === 0 && (
            <div className="text-center py-12">
               <p className="text-red-600 font-semibold">Không có bác sĩ nào để hiển thị.</p>
               <p className="text-sm text-gray-500 mt-2">
                  Vui lòng thử lại với từ khóa tìm kiếm khác hoặc bộ lọc chuyên khoa khác.
               </p>
            </div>
         )}

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8 tablet-pagination-spacing">
               <Button variant="outline" disabled={currentPage === 1} asChild>
                  <Link href={buildUrl(currentPage - 1)}>Trước</Link>
               </Button>

               {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  if (
                     page === 1 ||
                     page === totalPages ||
                     (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                     return (
                        <Button
                           key={page}
                           variant={currentPage === page ? 'default' : 'outline'}
                           asChild
                           className="w-10 h-10"
                        >
                           <Link href={buildUrl(page)}>{page}</Link>
                        </Button>
                     )
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                     return (
                        <span key={page} className="px-2">
                           ...
                        </span>
                     )
                  }
                  return null
               })}

               <Button variant="outline" disabled={currentPage === totalPages} asChild>
                  <Link href={buildUrl(currentPage + 1)}>Sau</Link>
               </Button>
            </div>
         )}
      </>
   )
}
