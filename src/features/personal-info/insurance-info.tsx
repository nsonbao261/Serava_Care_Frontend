'use client'

// Deps
import { usePersonalInfoStore } from './store/personal-info'

export default function InsuranceInfo() {
   const { isEditing } = usePersonalInfoStore()

   return (
      <div className="bg-white rounded-xl shadow-sm p-6">
         <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin bảo hiểm</h3>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhà cung cấp bảo hiểm
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
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số thẻ bảo hiểm
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
               <label className="block text-sm font-medium text-gray-700 mb-2">Ngày hết hạn</label>
               <input
                  disabled={!isEditing}
                  type="date"
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
}
