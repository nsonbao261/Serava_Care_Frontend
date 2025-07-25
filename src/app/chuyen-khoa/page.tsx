'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { SpecialtyWithCategory, SpecialtyFilters } from '@/types'
import { useSpecialties } from '@/hooks'
import { LoadingSpinner, SpecialtyCard, type ViewMode } from '@/components'

type CategoryFilter =
   | 'all'
   | 'noi-khoa'
   | 'ngoai-khoa'
   | 'can-lam-sang'
   | 'phuc-hoi'
   | 'chuyen-khoa'

const categoryLabels = {
   all: 'Tất cả',
   'noi-khoa': 'Nội khoa',
   'ngoai-khoa': 'Ngoại khoa',
   'can-lam-sang': 'Cận lâm sàng',
   'phuc-hoi': 'Phục hồi',
   'chuyen-khoa': 'Chuyên khoa'
}

export default function SpecialtiesPage() {
   const { specialties, isLoading, searchSpecialties } = useSpecialties()
   const [filteredSpecialties, setFilteredSpecialties] = useState<SpecialtyWithCategory[]>([])
   const [searchQuery, setSearchQuery] = useState('')
   const [viewMode, setViewMode] = useState<ViewMode>('grid')
   const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const [popularOnly, setPopularOnly] = useState(false)

   const filterSpecialties = useCallback(async () => {
      try {
         if (searchQuery.trim()) {
            // Use search API when there's a query
            const filters: SpecialtyFilters = {
               category: categoryFilter !== 'all' ? categoryFilter : undefined,
               popularOnly
            }
            const results = await searchSpecialties(searchQuery, filters)
            // Cast search results to SpecialtyWithCategory since SpecialtySearchResult extends it
            setFilteredSpecialties(results as SpecialtyWithCategory[])
         } else {
            // Filter locally when no search query
            let filtered = specialties

            if (categoryFilter !== 'all') {
               filtered = filtered.filter((specialty) => specialty.category === categoryFilter)
            }

            if (popularOnly) {
               filtered = filtered.filter((specialty) => specialty.isPopular)
            }

            setFilteredSpecialties(filtered)
         }
      } catch (err) {
         console.error('Error filtering specialties:', err)
         setFilteredSpecialties([])
      }
   }, [specialties, searchQuery, categoryFilter, popularOnly, searchSpecialties])

   useEffect(() => {
      filterSpecialties()
   }, [filterSpecialties])

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
   }

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
                           onChange={handleSearch}
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
                           <span className="text-gray-700">{categoryLabels[categoryFilter]}</span>
                           <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                        {isFilterOpen && (
                           <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <div className="py-1">
                                 {Object.entries(categoryLabels).map(([key, label]) => (
                                    <button
                                       key={key}
                                       onClick={() => {
                                          setCategoryFilter(key as CategoryFilter)
                                          setIsFilterOpen(false)
                                       }}
                                       className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                          categoryFilter === key
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

                     {/* Popular Only Toggle */}
                     <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                           type="checkbox"
                           checked={popularOnly}
                           onChange={(e) => setPopularOnly(e.target.checked)}
                           className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Phổ biến</span>
                     </label>

                     {/* View Mode Toggle */}
                     <div className="flex border border-gray-300 rounded-lg">
                        <button
                           onClick={() => setViewMode('grid')}
                           className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                           <Grid className="h-5 w-5" />
                        </button>
                        <button
                           onClick={() => setViewMode('list')}
                           className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                           <List className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Loading state */}
            {isLoading && (
               <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" text="Đang tải chuyên khoa..." />
               </div>
            )}

            {/* Results Count */}
            {!isLoading && (
               <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                     Tìm thấy <span className="font-semibold">{filteredSpecialties.length}</span>{' '}
                     chuyên khoa
                  </p>
               </div>
            )}

            {/* Specialties Grid/List */}
            {!isLoading && filteredSpecialties.length > 0 ? (
               <div
                  className={
                     viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        : 'space-y-4'
                  }
               >
                  {filteredSpecialties.map((specialty, index) => (
                     <motion.div
                        key={specialty.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <SpecialtyCard specialty={specialty} viewMode={viewMode} />
                     </motion.div>
                  ))}
               </div>
            ) : (
               !isLoading && (
                  <div className="text-center py-12">
                     <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <Search className="h-full w-full" />
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Không tìm thấy chuyên khoa nào
                     </h3>
                     <p className="text-gray-600">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
                  </div>
               )
            )}
         </div>
      </div>
   )
}
