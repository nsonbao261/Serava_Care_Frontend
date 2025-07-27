'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Eye, Share2, FileText, Download, Image as ImageIcon } from 'lucide-react'

interface QuestionContentProps {
   question: Question
   formatDate: (dateString: string) => string
}

export function QuestionContent({ question, formatDate }: QuestionContentProps) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6"
      >
         <div className="p-6">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                     <Calendar className="h-4 w-4" />
                     <span>Đăng: {formatDate(question.createdAt.toISOString())}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <Eye className="h-4 w-4" />
                     <span>{question.views} lượt xem</span>
                  </div>
               </div>
               <div className="flex items-center space-x-2">
                  {question.isPublic && (
                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Công khai
                     </span>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                     <Share2 className="h-4 w-4 text-gray-500" />
                  </button>
               </div>
            </div>

            <div className="prose max-w-none">
               <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {question.content}
               </div>
            </div>

            {/* Attachments */}
            {question.attachments && question.attachments.length > 0 && (
               <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                     <FileText className="h-5 w-5 mr-2" />
                     Tệp đính kèm ({question.attachments.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {question.attachments.map((attachment) => (
                        <div key={attachment.id} className="border border-gray-200 rounded-lg p-4">
                           {attachment.type === 'image' ? (
                              <div className="space-y-3">
                                 <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                       src={attachment.url}
                                       alt={attachment.name}
                                       fill
                                       className="object-cover"
                                    />
                                 </div>
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                       <ImageIcon className="h-4 w-4 text-blue-500" />
                                       <span className="text-sm text-gray-700">
                                          {attachment.name}
                                       </span>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                                       <Download className="h-4 w-4" />
                                    </button>
                                 </div>
                              </div>
                           ) : (
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                    <FileText className="h-8 w-8 text-red-500" />
                                    <div>
                                       <div className="font-medium text-gray-900">
                                          {attachment.name}
                                       </div>
                                       <div className="text-sm text-gray-500">PDF Document</div>
                                    </div>
                                 </div>
                                 <button className="text-blue-600 hover:text-blue-700">
                                    <Download className="h-5 w-5" />
                                 </button>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </motion.div>
   )
}
