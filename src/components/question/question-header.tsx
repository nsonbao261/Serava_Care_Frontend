'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Question } from '@/types'
import { statusConfig } from '@/components'

interface QuestionHeaderProps {
   question: Question
}

export function QuestionHeader({ question }: QuestionHeaderProps) {
   const StatusIcon = statusConfig[question.status].icon

   return (
      <>
         {/* Breadcrumb */}
         <div className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <Link href="/" className="hover:text-blue-600">
                     Trang chủ
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/cau-hoi-cua-toi" className="hover:text-blue-600">
                     Câu hỏi của tôi
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900 truncate">Chi tiết câu hỏi</span>
               </nav>
            </div>
         </div>

         {/* Header */}
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4">
               <Link
                  href="/cau-hoi-cua-toi"
                  className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
               >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
               </Link>
               <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                     <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[question.status].color}`}
                     >
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {statusConfig[question.status].label}
                     </span>
                     <span className="text-sm text-gray-500">
                        Chuyên khoa: {question.specialty}
                     </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
               </div>
            </div>
         </div>
      </>
   )
}
