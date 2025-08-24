'use client'

import React, { useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { DoctorCard } from '@/components'

const DOCTOR_SPECIALTIES = [
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

interface Props {
   doctors: Doctor[]
}

export default function DoctorResults({ doctors }: Props) {
   const [searchQuery, setSearchQuery] = useState('')
   const [specialtyFilter, setSpecialtyFilter] = useState('Tất cả chuyên khoa')

   const filteredDoctors = doctors.filter((doctor) => {
      const matchesSpecialty =
         specialtyFilter === 'Tất cả chuyên khoa' || doctor.specialty === specialtyFilter
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSpecialty && matchesSearch
   })

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-20 lg:pb-16">
         {/* Search and Filter Section */}
         <div className="bg-white border-b border-gray-200 py-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
               {/* Search Bar */}
               <div className="flex-1 md:flex-[2] relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Tìm kiếm bác sĩ, chuyên khoa, bệnh viện..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>

               {/* Specialty Filter */}
               <div className="flex-1 md:w-64 md:flex-none relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                     value={specialtyFilter}
                     onChange={(e) => setSpecialtyFilter(e.target.value)}
                     className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                     {DOCTOR_SPECIALTIES.map((specialty) => (
                        <option key={specialty} value={specialty}>
                           {specialty}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         </div>

         {/* Results Section */}
         <div>
            {/* Results Count */}
            <div className="mb-6">
               <p className="text-gray-600">
                  Tìm thấy{' '}
                  <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> bác
                  sĩ
                  {specialtyFilter !== 'Tất cả chuyên khoa' && (
                     <span>
                        {' '}
                        cho chuyên khoa{' '}
                        <span className="font-semibold text-blue-600">{specialtyFilter}</span>
                     </span>
                  )}
               </p>
            </div>

            {/* Doctors */}
            {filteredDoctors.length > 0 ? (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredDoctors.map((doctor) => (
                     <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
               </div>
            ) : (
               <div className="text-center py-12">
                  <p className="text-red-600 font-semibold">Không có bác sĩ nào để hiển thị.</p>
                  <p className="text-sm text-gray-500 mt-2">
                     Vui lòng thử lại với từ khóa tìm kiếm khác hoặc bộ lọc chuyên khoa khác.
                  </p>
               </div>
            )}
         </div>
      </div>
   )
}
