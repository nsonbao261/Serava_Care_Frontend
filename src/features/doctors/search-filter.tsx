'use client'

import { Filter, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SearchAndFilterProps {
   initialSearchQuery: string
   initialSpecialtyFilter: string
   specialties: string[]
}

export function SearchAndFilter({
   initialSearchQuery,
   initialSpecialtyFilter,
   specialties
}: SearchAndFilterProps) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const [searchTerm, setSearchTerm] = useState(initialSearchQuery)
   const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialtyFilter)

   // Update URL when search or filter changes
   useEffect(() => {
      const params = new URLSearchParams(searchParams)

      if (searchTerm) {
         params.set('search', searchTerm)
      } else {
         params.delete('search')
      }

      if (selectedSpecialty !== 'Tất cả chuyên khoa') {
         params.set('specialty', selectedSpecialty)
      } else {
         params.delete('specialty')
      }

      // Reset to page 1 when search/filter changes
      params.delete('page')

      const newUrl = `/bac-si?${params.toString()}`
      router.push(newUrl)
   }, [searchTerm, selectedSpecialty, router, searchParams])

   // Update local state when URL params change
   useEffect(() => {
      const searchFromUrl = searchParams.get('search')
      const specialtyFromUrl = searchParams.get('specialty')

      if (searchFromUrl !== null) {
         setSearchTerm(searchFromUrl)
      }

      if (specialtyFromUrl !== null) {
         setSelectedSpecialty(specialtyFromUrl)
      }
   }, [searchParams])

   return (
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
   )
}
