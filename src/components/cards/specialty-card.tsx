'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users } from 'lucide-react'
import Link from 'next/link'

export type ViewMode = 'grid' | 'list'

const categoryLabels = {
   all: 'Tất cả',
   'noi-khoa': 'Nội khoa',
   'ngoai-khoa': 'Ngoại khoa',
   'can-lam-sang': 'Cận lâm sàng',
   'phuc-hoi': 'Phục hồi',
   'chuyen-khoa': 'Chuyên khoa'
}

interface SpecialtyCardProps {
   specialty: SpecialtyWithCategory
   viewMode: ViewMode
}

export function SpecialtyCard({ specialty, viewMode }: SpecialtyCardProps) {
   const IconComponent = specialty.icon

   if (viewMode === 'list') {
      return (
         <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
         >
            <div className="flex items-start space-x-4">
               <div
                  className={`p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${specialty.color} group-hover:scale-110 transition-transform duration-300`}
               >
                  <IconComponent className="h-7 w-7" />
               </div>
               <div className="flex-1">
                  <div className="flex items-start justify-between">
                     <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                           <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                              {specialty.name}
                           </h3>
                           {specialty.isPopular && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                 Phổ biến
                              </span>
                           )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                           {specialty.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                           <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                              <Users className="h-4 w-4 mr-2" />
                              <span className="font-medium">{specialty.doctorCount}</span>
                           </div>
                           <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="font-medium text-yellow-700">4.8</span>
                           </div>
                           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              {categoryLabels[specialty.category]}
                           </span>
                        </div>
                     </div>
                     <Link
                        href={`/chuyen-khoa/${specialty.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-105"
                     >
                        Xem chi tiết
                        <svg
                           className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                           />
                        </svg>
                     </Link>
                  </div>
               </div>
            </div>
         </motion.div>
      )
   }

   return (
      <motion.div
         whileHover={{ y: -8, scale: 1.02 }}
         className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
      >
         {/* Background gradient overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

         {/* Popular badge */}
         {specialty.isPopular && (
            <div className="absolute top-4 right-4 z-10">
               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md">
                  ⭐ Phổ biến
               </span>
            </div>
         )}

         <div className="text-center relative z-10">
            <div
               className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-6 ${specialty.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}
            >
               <IconComponent className="h-10 w-10" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200">
               {specialty.name}
            </h3>

            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
               {specialty.description}
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
               <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{specialty.doctorCount}</span>
               </div>
               <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="font-semibold text-yellow-700">4.8</span>
               </div>
            </div>

            <div className="space-y-3">
               <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {categoryLabels[specialty.category]}
               </span>

               <Link
                  href={`/chuyen-khoa/${specialty.slug}`}
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg group-hover:scale-105"
               >
                  <span className="flex items-center justify-center">
                     Xem chi tiết
                     <svg
                        className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M9 5l7 7-7 7"
                        />
                     </svg>
                  </span>
               </Link>
            </div>
         </div>
      </motion.div>
   )
}
