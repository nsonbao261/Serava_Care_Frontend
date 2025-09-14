import {
   Bell,
   Building2,
   Calendar,
   ChevronDown,
   MapPin,
   Phone,
   Stethoscope,
   UserIcon
} from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Button } from '@/components'
import UserMenu from './user-menu'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import React from "react";

export default (async () => {
   const session = await getServerSession(authOptions)

   const NAVIGATION_LINKS = [
      { label: 'Danh sách bác sĩ', href: '/bac-si' },
      { label: 'Chuyên khoa', href: '/chuyen-khoa' },
      { label: 'Tin Y tế', href: '/tin-tuc' },
      { label: 'Về chúng tôi', href: '/ve-chung-toi' }
   ]

   const BOOKING_SERVICES = [
      {
         label: 'Đặt khám Bác sĩ',
         href: '/bac-si',
         icon: Stethoscope,
         description: 'Đặt lịch khám với bác sĩ chuyên khoa'
      },
      {
         label: 'Đặt khám Bệnh viện',
         href: '/benh-vien',
         icon: Building2,
         description: 'Đặt lịch khám tại các bệnh viện uy tín'
      },
      {
         label: 'Đặt khám Phòng khám',
         href: '/phong-kham',
         icon: Calendar,
         description: 'Đặt lịch tại phòng khám tư nhân'
      }
   ]

   return (
      <header className="bg-white shadow-md sticky top-0 z-50">
         {/* Top bar with contact info */}
         <div className="bg-blue-50 border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center py-2 text-sm">
                  <div className="flex items-center space-x-6 text-gray-600">
                     <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>Hotline: 1900-2805</span>
                     </div>
                     <div className="hidden md:flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>8:00 - 17:30 (T2 - T7)</span>
                     </div>
                  </div>
                  <div className="flex items-center space-x-4">
                     <Link href="/" className="text-blue-600 hover:text-blue-800">
                        Tải ứng dụng
                     </Link>
                     <Link href="/" className="text-gray-600 hover:text-gray-800">
                        Trợ giúp
                     </Link>
                  </div>
               </div>
            </div>
         </div>

         {/* Main header */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
               {/* Logo */}
               <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2 group">
                     <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded-lg animate-pulse group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                        SC
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900 animate-in slide-in-from-left-2 group-hover:text-blue-600 transition-colors duration-300">
                           Serava
                        </span>
                        <span className="text-sm text-blue-600 font-medium animate-in fade-in slide-in-from-bottom-1 group-hover:text-blue-700 transition-colors duration-300">
                           Care
                        </span>
                     </div>
                  </Link>
               </div>

               <nav className="hidden lg:flex items-center space-x-8">
                  {/* Đặt khám Dropdown */}
                  <div className="relative group">
                     <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                        <span>Đặt khám</span>
                        <ChevronDown className="h-4 w-4" />
                     </div>

                     <div className="absolute -bottom-4 hidden group-hover:block w-full h-4 z-2 bg-transparent"></div>

                     <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-1 invisible group-hover:visible">
                        {BOOKING_SERVICES.map((service) => {
                           const IconComponent = service.icon
                           return (
                              <Link
                                 key={service.href}
                                 href={service.href}
                                 className="flex items-center-safe gap-2 p-3 hover:bg-blue-50 transition-colors duration-200"
                              >
                                 <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                                    <IconComponent className="h-5 w-5" />
                                 </div>
                                 <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                       {service.label}
                                    </h3>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                 </div>
                              </Link>
                           )
                        })}
                     </div>
                  </div>

                  {/* Other Navigation Items */}
                  {NAVIGATION_LINKS.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                     >
                        {item.label}
                     </Link>
                  ))}
               </nav>

               {/* Search and Actions */}
               <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <button className="hidden md:flex p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200 relative">
                     <Bell className="h-5 w-5" />
                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                     </span>
                  </button>

                  {/* Login/Profile */}
                  <div className="flex items-center space-x-2">
                     {session?.user ? (
                        <UserMenu user={session.user} />
                     ) : (
                        <Link href="/auth">
                           <Button variant="ghost" className="w-full justify-center">
                              <UserIcon className="h-4 w-4 mr-2" />
                              Đăng nhập
                           </Button>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}) satisfies React.FC
