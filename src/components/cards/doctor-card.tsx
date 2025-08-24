import Link from 'next/link'
import { MorphingButton } from '@/components/forms/morphing-button'
import { Clock, GraduationCap, MapPin, Star } from 'lucide-react'

interface Props {
   doctor: Doctor
}

export const DoctorCard = ({ doctor }: Props) => (
   <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
         <div className="flex items-start space-x-4">
            {/* Doctor Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-shadow duration-300">
               <div className="text-white font-bold text-lg">
                  {doctor.name
                     .split(' ')
                     .slice(-2)
                     .map((n) => n[0])
                     .join('')}
               </div>
            </div>

            <div className="flex-1 min-w-0">
               <div className="flex items-center mb-2">
                  <Link href={`/bac-si/${doctor.slug}`}>
                     <h3 className="text-lg font-bold text-gray-900 truncate hover:text-blue-600 cursor-pointer transition-colors duration-200">
                        {doctor.name}
                     </h3>
                  </Link>
               </div>

               <div className="text-sm text-gray-600 mb-1">{doctor.title}</div>

               {doctor.specialty && (
                  <div className="flex items-center text-sm text-blue-600 mb-2">
                     <GraduationCap className="h-4 w-4 mr-1" />
                     {doctor.specialty}
                  </div>
               )}

               <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {doctor.experience}
               </div>

               <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctor.hospital}
                  {doctor.location && `, ${doctor.location}`}
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <Star className="h-4 w-4 text-yellow-400 mr-1" />
                     <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                     {doctor.reviewCount && (
                        <span className="text-xs text-gray-500 ml-1">({doctor.reviewCount})</span>
                     )}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                     {doctor.consultationFee}
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
            <Link href={`/bac-si/${doctor.slug}`} className="flex-1">
               <MorphingButton variant="outline" className="w-full" size="sm" morphText="Xem ngay!">
                  Xem chi tiết
               </MorphingButton>
            </Link>
            <Link href={`/bac-si/${doctor.slug}`} className="flex-1">
               <MorphingButton
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                  morphText="Đặt ngay!"
               >
                  Đặt lịch khám
               </MorphingButton>
            </Link>
         </div>
      </div>
   </div>
)
