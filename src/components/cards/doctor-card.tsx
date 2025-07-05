import Link from 'next/link'
import { MorphingButton } from '@/components/forms/morphing-button'
import { Star, Clock, MapPin, GraduationCap } from 'lucide-react'
import { Doctor } from '@/types'

interface DoctorCardProps {
   doctor: Doctor
   showSpecialty?: boolean
   showLocation?: boolean
   variant?: 'default' | 'compact'
   index?: number
   layout?: 'grid' | 'list'
}

export function DoctorCard({
   doctor,
   showSpecialty = true,
   showLocation = true,
   variant = 'default',
   layout = 'grid'
}: DoctorCardProps) {
   const generateInitials = (name: string) => {
      return name
         .split(' ')
         .slice(-2)
         .map((n) => n[0])
         .join('')
   }

   if (variant === 'compact') {
      return (
         <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                     <Link href={`/bac-si/${doctor.slug}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                           {doctor.name}
                        </h3>
                     </Link>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{doctor.title}</p>
                  <p className="text-sm text-gray-600">{doctor.hospital}</p>
               </div>
            </div>

            <div className="space-y-2 mb-4">
               {showLocation && doctor.location && (
                  <div className="flex items-center text-sm text-gray-600">
                     <MapPin className="h-4 w-4 mr-2" />
                     {doctor.location}
                  </div>
               )}
               <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Kinh nghiệm: {doctor.experience}
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm">
                     <Star className="h-4 w-4 text-yellow-400 mr-1" />
                     <span className="font-medium">{doctor.rating}</span>
                     {doctor.reviewCount && (
                        <span className="text-gray-600 ml-1">({doctor.reviewCount} đánh giá)</span>
                     )}
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
               <div className="text-sm">
                  <span className="text-gray-600">Phí khám:</span>
                  <span className="font-semibold text-blue-600 ml-1">{doctor.consultationFee}</span>
               </div>
               <Link href={`/bac-si/${doctor.slug}`}>
                  <MorphingButton size="sm" morphText="Xem chi tiết!">
                     Xem chi tiết
                  </MorphingButton>
               </Link>
            </div>
         </div>
      )
   }

   // List layout for booking page
   if (layout === 'list') {
      return (
         <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="p-6">
               <div className="flex items-start space-x-6">
                  {/* Doctor Avatar */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                     <div className="text-white font-bold text-xl">
                        {generateInitials(doctor.name)}
                     </div>
                  </div>

                  <div className="flex-1 min-w-0">
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <Link href={`/bac-si/${doctor.slug}`}>
                              <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200 mb-1">
                                 {doctor.name}
                              </h3>
                           </Link>
                           <p className="text-blue-600 font-medium mb-2">{doctor.title}</p>

                           {showSpecialty && doctor.specialty && (
                              <div className="flex items-center text-gray-600 mb-2">
                                 <GraduationCap className="h-4 w-4 mr-2" />
                                 {doctor.specialty}
                              </div>
                           )}

                           <div className="flex items-center text-gray-600 mb-2">
                              <Clock className="h-4 w-4 mr-2" />
                              {doctor.experience}
                           </div>

                           <div className="flex items-center text-gray-600 mb-3">
                              <MapPin className="h-4 w-4 mr-2" />
                              {doctor.hospital}
                              {showLocation && doctor.location && `, ${doctor.location}`}
                           </div>

                           <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                 <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                 <span className="font-medium text-gray-900">{doctor.rating}</span>
                                 {doctor.reviewCount && (
                                    <span className="text-gray-500 ml-1">
                                       ({doctor.reviewCount})
                                    </span>
                                 )}
                              </div>
                              <div className="text-lg font-bold text-green-600">
                                 {doctor.consultationFee}
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                           <Link href={`/bac-si/${doctor.slug}`}>
                              <MorphingButton
                                 variant="outline"
                                 size="sm"
                                 morphText="Xem ngay!"
                                 className="whitespace-nowrap"
                              >
                                 Xem chi tiết
                              </MorphingButton>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
         <div className="p-6">
            <div className="flex items-start space-x-4">
               {/* Doctor Avatar */}
               <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-white font-bold text-lg">
                     {generateInitials(doctor.name)}
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

                  {showSpecialty && doctor.specialty && (
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
                     {showLocation && doctor.location && `, ${doctor.location}`}
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                        {doctor.reviewCount && (
                           <span className="text-xs text-gray-500 ml-1">
                              ({doctor.reviewCount})
                           </span>
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
                  <MorphingButton
                     variant="outline"
                     className="w-full"
                     size="sm"
                     morphText="Xem ngay!"
                  >
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
}
