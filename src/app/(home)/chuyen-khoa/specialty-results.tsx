'use client'

import { SpecialtyCard } from '@/components'
import { motion } from 'framer-motion'
import { ChevronDown, Filter, Search } from 'lucide-react'
import React, { useState } from 'react'

const categoryLabels = {
   all: 'Tất cả',
   'noi-khoa': 'Nội khoa',
   'ngoai-khoa': 'Ngoại khoa',
   'can-lam-sang': 'Cận lâm sàng',
   'phuc-hoi': 'Phục hồi',
   'chuyen-khoa': 'Chuyên khoa'
}

interface Props {
   specialties: Specialty[]
}

export default function SpecialtyResults({ specialties }: Props) {
   const [searchQuery, setSearchQuery] = useState('')
   const [specialtyCategory, setSpecialtyCategory] = useState<SpecialtyCategory>('all')
   const [isFilterOpen, setIsFilterOpen] = useState(false)

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
         <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
               {/* Search */}
               <div className="flex-1">
                  <div className="relative">
                     <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                     <input
                        type="text"
                        placeholder="Tìm kiếm chuyên khoa..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                     />
                  </div>
               </div>

               {/* Filters */}
               <div className="flex items-center space-x-4">
                  {/* Category Filter */}
                  <div className="relative">
                     <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                     >
                        <Filter className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">
                           {categoryLabels[specialtyCategory]}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                     </button>
                     {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                           <div className="py-1">
                              {Object.entries(categoryLabels).map(([key, label]) => (
                                 <button
                                    key={key}
                                    onClick={() => {
                                       setSpecialtyCategory(key as SpecialtyCategory)
                                       setIsFilterOpen(false)
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                       specialtyCategory === key
                                          ? 'bg-green-50 text-green-600'
                                          : 'text-gray-700'
                                    }`}
                                 >
                                    {label}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

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