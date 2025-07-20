'use client'

import { Filter, Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Components
import { Button, DoctorCard, LoadingSpinner } from '@/components'

// Deps
import { mockDoctors } from '@/data'
import { Doctor } from '@/types'

const specialties = [
   'Tất cả chuyên khoa',
   'Tim mạch',
   'Nhi khoa',
   'Tiêu hóa',
   'Sản phụ khoa',
   'Thần kinh',
   'Da liễu',
   'Ung bướu',
   'Nội tổng quát',
   'Tai - Mũi - Họng',
   'Mắt',
   'Răng - Hàm - Mặt'
]

export default function DoctorsPage() {
   const searchParams = useSearchParams()
   const [searchTerm, setSearchTerm] = useState('')
   const [selectedSpecialty, setSelectedSpecialty] = useState('Tất cả chuyên khoa')
   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors)
   const [currentPage, setCurrentPage] = useState(1)
   const [isLoading, setIsLoading] = useState(true)
   const [isFiltering, setIsFiltering] = useState(false)
   const doctorsPerPage = 6

   // Initialize search term from URL parameters
   useEffect(() => {
      const searchFromUrl = searchParams.get('search')
      if (searchFromUrl) {
         setSearchTerm(searchFromUrl)
      }
      // Simulate initial data loading
      setTimeout(() => {
         setIsLoading(false)
      }, 800)
   }, [searchParams])

   useEffect(() => {
      if (!isLoading) {
         setIsFiltering(true)
      }

      let filtered = mockDoctors

      // Filter by search term
      if (searchTerm) {
         filtered = filtered.filter(
            (doctor) =>
               doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (doctor.specialty &&
                  doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
               doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
         )
      }

      // Filter by specialty
      if (selectedSpecialty !== 'Tất cả chuyên khoa') {
         filtered = filtered.filter(
            (doctor) => doctor.specialty && doctor.specialty.includes(selectedSpecialty)
         )
      }

      // Simulate filtering delay for better UX
      setTimeout(
         () => {
            setFilteredDoctors(filtered)
            setCurrentPage(1)
            setIsFiltering(false)
         },
         isLoading ? 0 : 300
      )
   }, [searchTerm, selectedSpecialty, isLoading])

   // Pagination
   const indexOfLastDoctor = currentPage * doctorsPerPage
   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
   const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
   const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage)

   return (
      <div className="bg-gray-50">
         {/* Header */}
         <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                     Danh sách Bác sĩ
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Tìm kiếm và đặt lịch khám với hơn 1000+ bác sĩ chuyên khoa uy tín trên toàn
                     quốc
                  </p>
               </div>
            </div>
         </div>

         {/* Search and Filter Section */}
         <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 md:flex-[2] relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <input
                        type="text"
                        placeholder="Tìm kiếm bác sĩ, chuyên khoa, bệnh viện..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     />
                  </div>

                  {/* Specialty Filter */}
                  <div className="flex-1 md:w-64 md:flex-none relative">
                     <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                     >
                        {specialties.map((specialty) => (
                           <option key={specialty} value={specialty}>
                              {specialty}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* Results Section */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-20 lg:pb-16 tablet-spacing-fix ipad-pro-spacing-fix">
            {/* Results Count */}
            {!isLoading && !isFiltering && (
               <div className="mb-6">
                  <p className="text-gray-600">
                     Tìm thấy{' '}
                     <span className="font-semibold text-gray-900">{filteredDoctors.length}</span>{' '}
                     bác sĩ
                     {selectedSpecialty !== 'Tất cả chuyên khoa' && (
                        <span>
                           {' '}
                           cho chuyên khoa{' '}
                           <span className="font-semibold text-blue-600">{selectedSpecialty}</span>
                        </span>
                     )}
                  </p>
               </div>
            )}

            {/* Loading State */}
            {(isLoading || isFiltering) && (
               <div className="py-16">
                  <LoadingSpinner
                     size="lg"
                     text={isLoading ? 'Đang tải danh sách bác sĩ...' : 'Đang lọc kết quả...'}
                  />
               </div>
            )}

            {/* Doctors Grid */}
            {!isLoading && !isFiltering && currentDoctors.length > 0 && (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 tablet-grid-spacing">
                  {currentDoctors.map((doctor, index) => (
                     <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        showLocation={false}
                        index={index}
                     />
                  ))}
               </div>
            )}

            {/* No Data State */}
            {!isLoading && !isFiltering && currentDoctors.length === 0 && (
               <div className="text-center py-12">
                  <p className="text-red-600 font-semibold">Không có bác sĩ nào để hiển thị.</p>
                  <p className="text-sm text-gray-500 mt-2">
                     This means either no data was loaded or filtering removed all results.
                  </p>
               </div>
            )}

            {/* Pagination */}
            {!isLoading && !isFiltering && totalPages > 1 && (
               <div className="flex justify-center items-center space-x-2 mb-8 tablet-pagination-spacing">
                  <Button
                     variant="outline"
                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                  >
                     Trước
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
                              onClick={() => setCurrentPage(page)}
                              className="w-10 h-10"
                           >
                              {page}
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

                  <Button
                     variant="outline"
                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                  >
                     Sau
                  </Button>
               </div>
            )}

            {/* No Results */}
            {!isLoading && !isFiltering && filteredDoctors.length === 0 && (
               <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                     <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                     Không tìm thấy bác sĩ nào
                  </h3>
                  <p className="text-gray-600 mb-6">
                     Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc chuyên khoa
                  </p>
                  {searchTerm && (
                     <div className="space-x-4">
                        <Link href={`/chuyen-khoa?search=${encodeURIComponent(searchTerm)}`}>
                           <Button variant="outline">Tìm trong chuyên khoa</Button>
                        </Link>
                        <Button
                           variant="outline"
                           onClick={() => {
                              setSearchTerm('')
                              setSelectedSpecialty('Tất cả chuyên khoa')
                           }}
                        >
                           Xóa bộ lọc
                        </Button>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}
