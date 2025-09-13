'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users } from 'lucide-react'
import Link from 'next/link'

export function SpecialtyCard({ specialty }: { specialty: Specialty }) {
   return (
      <motion.div
         whileHover={{ y: -8, scale: 1.02 }}
         className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
      >
         {/* Background gradient overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

         <div className="text-center relative z-10">
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
                  {specialty.category}
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
