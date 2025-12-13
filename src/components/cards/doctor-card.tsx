import Link from 'next/link'
import { default as MorphingButton } from '@/components/forms/morphing-button'
import { Clock, GraduationCap, MapPin, Star, CheckCircle, Award } from 'lucide-react'
import Image from 'next/image'
import React from "react"
import {IMAGE_PLACEHOLDER_CONTENT} from "@/constants";

type BadgeType = 'verified' | 'top-doctor' | 'recommended';

export const TrustBadge = ({ type }: { type: BadgeType }) => {
   const configs = {
      verified: {
         icon: CheckCircle,
         text: 'Đã xác thực',
         bg: 'bg-blue-50',
         text_color: 'text-blue-700',
         border: 'border-blue-200',
      },
      'top-doctor': {
         icon: Award,
         text: 'Bác sĩ nổi bật',
         bg: 'bg-amber-50',
         text_color: 'text-yellow-700',
         border: 'border-amber-200',
      },
      recommended: {
         icon: Star,
         text: 'Được đề xuất',
         bg: 'bg-green-50',
         text_color: 'text-green-700',
         border: 'border-green-200',
      },
   };

   const config = configs[type];

   return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text_color} border ${config.border}`}>
         <config.icon className="h-3 w-4 mr-1" />
         {config.text}
      </span>
   );
};

export default (({ doctor }) => (
   <div className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
         {/* Trust Badges */}
         <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
            <TrustBadge type="verified" />
            {doctor.rating >= 4.8 && <TrustBadge type="top-doctor" />}
         </div>
         <div className="flex items-start space-x-4">
            {/* Doctor Avatar */}
            <div className="relative w-20 h-20 flex-shrink-0">
               <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl rotate-6 animate-pulse"></div>
               <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                  <Image
                     src={doctor.imageUrl ?? IMAGE_PLACEHOLDER_CONTENT}
                     alt={doctor.name}
                     width={500}
                     height={300}
                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
               />
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
               {/* Working Hours - BookingCare style */}
               <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Khung giờ:</span>
                  <div className="flex gap-1">
                     <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md font-medium">8:00 - 12:00</span>
                     <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md font-medium">14:00 - 17:00</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
            <Link href={`/bac-si/${doctor.slug}`} className="flex-1">
               <button className="w-full px-4 py-2.5 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-all font-semibold text-sm">
                  Xem chi tiết
               </button>
            </Link>
            <Link href={`/bac-si/${doctor.slug}`} className="flex-1">
               <button className="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all font-semibold text-sm shadow-md hover:shadow-lg">
                  Đặt khám ngay
               </button>
            </Link>
         </div>
      </div>
   </div>
)) satisfies React.FC<{ doctor: Doctor }>
