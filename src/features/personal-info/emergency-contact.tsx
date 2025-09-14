'use client'

import { usePersonalInfoStore } from './store/personal-info'
import React from "react"

export default (() => {
   const { isEditing } = usePersonalInfoStore()

   return (
      <div className="bg-white rounded-xl shadow-sm p-6">
         <h3 className="text-lg font-semibold text-gray-900 mb-6">Liên hệ khẩn cấp</h3>

         <div className="grid grid-cols-1 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên người liên hệ
               </label>
               <input
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                     !isEditing
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  }`}
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
               <input
                  disabled={!isEditing}
                  type="tel"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                     !isEditing
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  }`}
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Mối quan hệ</label>
               <input
                  disabled={!isEditing}
                  placeholder="Ví dụ: Vợ/chồng, Con, Cha/mẹ, Anh/chị..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                     !isEditing
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  }`}
               />
            </div>
         </div>
      </div>
   )
}) satisfies React.FC
