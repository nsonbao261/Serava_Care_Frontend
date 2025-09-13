'use client'

import { SearchAndFilterBar, SpecialtyCard } from '@/components'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export default function SpecialtyResults({ specialties }: { specialties: Specialty[] }) {
   const [searchQuery, setSearchQuery] = useState('')
   const [specialtyCategory, setSpecialtyCategory] = useState<SpecialtyCategory>('all')

   // Filter specialties based on search query and category
   const filteredSpecialties = specialties.filter((specialty) => {
      const matchesCategory =
         specialtyCategory === 'all' || specialty.category === specialtyCategory
      const matchesSearch = specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
   })

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Search and Filter Bar */}
         <SearchAndFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            specialtyCategory={specialtyCategory}
            setSpecialtyCategory={setSpecialtyCategory}
         />

         {/* Specialties */}
         {filteredSpecialties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredSpecialties.map((specialty, index) => (
                  <motion.div
                     key={specialty.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                  >
                     <SpecialtyCard specialty={specialty} />
                  </motion.div>
               ))}
            </div>
         ) : (
            <div className="text-center py-12">
               <p className="text-gray-600">Không tìm thấy chuyên khoa nào</p>
            </div>
         )}
      </div>
   )
}
