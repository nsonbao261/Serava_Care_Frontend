import { Star, MapPin, Clock, GraduationCap, Building2, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components'

interface DoctorHeaderProps {
   doctor: {
      name: string
      title: string
      specialty?: string
      experience: string
      hospital: string
      location?: string
      rating: number
      reviewCount?: number
      consultationFee: string
      verified?: boolean
   }
}

export function DoctorHeader({ doctor }: DoctorHeaderProps) {
   const generateInitials = (name: string) => {
      return name
         .split(' ')
         .slice(-2)
         .map((n) => n[0])
         .join('')
   }

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-8">
            <div className="flex items-start space-x-6">
               {/* Doctor Image */}
               <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-white font-bold text-3xl">
                     {generateInitials(doctor.name)}
                  </div>
               </div>

               <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                     <div>
                        <div className="flex items-center mb-2">
                           <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                        </div>
                        <p className="text-lg text-gray-600 mb-2">{doctor.title}</p>
                        <div className="flex items-center text-blue-600 mb-3">
                           <GraduationCap className="h-5 w-5 mr-2" />
                           <span className="font-medium">{doctor.specialty}</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                           <Share2 className="h-4 w-4 mr-1" />
                           Chia sẻ
                        </Button>
                        <Button variant="outline" size="sm">
                           <Bookmark className="h-4 w-4 mr-1" />
                           Lưu
                        </Button>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                     <div className="flex items-center text-gray-600">
                        <Building2 className="h-5 w-5 mr-2" />
                        <span>{doctor.hospital}</span>
                     </div>
                     <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{doctor.location}</span>
                     </div>
                     <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{doctor.experience}</span>
                     </div>
                     <div className="flex items-center text-gray-600">
                        <Star className="h-5 w-5 mr-2 text-yellow-400" />
                        <span>
                           {doctor.rating} ({doctor.reviewCount} đánh giá)
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center space-x-4">
                     <div className="text-2xl font-bold text-green-600">
                        {doctor.consultationFee}
                     </div>
                     <span className="text-gray-500">phí tư vấn</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
