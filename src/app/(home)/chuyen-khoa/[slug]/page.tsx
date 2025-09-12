'use client'

import { use, useMemo, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button, DoctorCard } from '@/components'
import { ChevronRight, Filter, Search, Users } from 'lucide-react'
import { mockSpecialtyDetail } from '@/data'

interface Props {
   params: Promise<{ slug: string }>
}

export default function SpecialtyDetailPage({ params }: Props) {
   const { slug } = use(params)
   const [searchTerm, setSearchTerm] = useState('')
   const [sortBy, setSortBy] = useState('rating')

   const specialty = mockSpecialtyDetail[slug]

   if (!specialty) notFound()

   const doctors = specialty.doctors

   const filteredAndSortedDoctors = useMemo(() => {
      const filtered = doctors.filter((doctor) =>
         doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      switch (sortBy) {
         case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
         case 'experience':
            filtered.sort((a, b) => {
               const aYears = parseInt(a.experience)
               const bYears = parseInt(b.experience)
               return bYears - aYears
            })
            break
         case 'fee':
            filtered.sort((a, b) => {
               const aFee = parseInt(a.consultationFee.replace(/\D/g, ''))
               const bFee = parseInt(b.consultationFee.replace(/\D/g, ''))
               return aFee - bFee
            })
            break
         default:
            break
      }

      return filtered
   }, [doctors, searchTerm, sortBy])

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Breadcrumb */}
         <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <nav className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/" className="hover:text-blue-600">
                     Trang chủ
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/chuyen-khoa" className="hover:text-blue-600">
                     Chuyên khoa
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900">{specialty.name}</span>
               </nav>
            </div>
         </div>

         {/* Header */}
         <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                     Bác sĩ chuyên khoa {specialty.name}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{specialty.description}</p>
               </div>

               <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                     <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                           {doctors.length}+
                        </div>
                        <div className="text-sm text-gray-600">Bác sĩ</div>
                     </div>
                     <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                           {doctors.reduce((sum, doctor) => sum + (doctor.reviewCount || 0), 0)}+
                        </div>
                        <div className="text-sm text-gray-600">Đánh giá</div>
                     </div>
                     <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                           {doctors.length > 0
                              ? (
                                   doctors.reduce((sum, doctor) => sum + doctor.rating, 0) /
                                   doctors.length
                                ).toFixed(1)
                              : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Đánh giá trung bình</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Search and Filter */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
               <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Tìm kiếm bác sĩ..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Sắp xếp:</span>
                     </div>
                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value="rating">Đánh giá cao nhất</option>
                        <option value="experience">Kinh nghiệm nhiều nhất</option>
                        <option value="fee">Phí khám thấp nhất</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Doctors Grid */}
            {filteredAndSortedDoctors.length > 0 ? (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedDoctors.map((doctor: Doctor) => (
                     <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
               </div>
            ) : (
               <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                     <Users className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                     {doctors.length === 0
                        ? `Chưa có bác sĩ chuyên khoa ${specialty.name}`
                        : 'Không tìm thấy bác sĩ nào'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                     {doctors.length === 0
                        ? 'Chúng tôi đang cập nhật danh sách bác sĩ cho chuyên khoa này'
                        : 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'}
                  </p>
                  <div className="space-x-4">
                     <Link href="/bac-si">
                        <Button>Xem tất cả bác sĩ</Button>
                     </Link>
                     <Link href="/chuyen-khoa">
                        <Button variant="outline">Xem chuyên khoa khác</Button>
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
