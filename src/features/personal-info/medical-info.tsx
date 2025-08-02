'use client'

// Deps
import { usePersonalInfoStore } from './store/personal-info'

export default function MedicalInfo() {
   const { isEditing } = usePersonalInfoStore()

   return (
      <div className="bg-white rounded-xl shadow-sm p-6">
         <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin y tế</h3>

         <div className="grid grid-cols-1 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm máu</label>
               <select
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                     !isEditing
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  }`}
               >
                  <option value="">Chọn nhóm máu</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
               </select>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dị ứng (nếu có)
               </label>
               <input
                  disabled={!isEditing}
                  placeholder="Ví dụ: Penicillin, Tôm cua..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                     !isEditing
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  }`}
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bệnh mạn tính (nếu có)
               </label>
               <input
                  disabled={!isEditing}
                  placeholder="Ví dụ: Tiểu đường, Cao huyết áp..."
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
