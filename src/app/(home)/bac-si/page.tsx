import { getAllDoctors } from '@/services'
import DoctorResults from './doctor-results'
import React from "react"

export default (async () => (
   <div className="bg-gray-50">
   {/* Header */}
      <div className="bg-white shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Danh sách Bác sĩ
               </h1>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Tìm kiếm và đặt lịch khám với hơn 1000+ bác sĩ chuyên khoa uy tín trên toàn
                  quốc
               </p>
            </div>
         </div>
      </div>

      <DoctorResults doctors={await getAllDoctors()} />
   </div>
)) satisfies React.FC
