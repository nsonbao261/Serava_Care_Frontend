'use client'

import {
   Calendar,
   ChevronDown,
   FileText,
   HelpCircle,
   LinkIcon,
   Lock,
   LogOut,
   Menu,
   UserCircle
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

// Components
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger
} from '@/components'
// Types
import { User } from 'next-auth'

// Deps
const userMenuItems = [
   {
      label: 'Thông tin cá nhân',
      href: '/thong-tin-ca-nhan',
      icon: UserCircle,
      description: 'Xem và chỉnh sửa thông tin cá nhân'
   },
   {
      label: 'Lịch sử đặt khám',
      href: '/lich-su-dat-kham',
      icon: Calendar,
      description: 'Xem lịch sử các lần đặt khám'
   },
   {
      label: 'Hồ sơ sức khỏe',
      href: '/ho-so-suc-khoe',
      icon: FileText,
      description: 'Quản lý hồ sơ sức khỏe của bạn'
   },
   {
      label: 'Câu hỏi của tôi',
      href: '/cau-hoi-cua-toi',
      icon: HelpCircle,
      description: 'Các câu hỏi đã đặt cho bác sĩ'
   },
   {
      label: 'Liên kết tài khoản',
      href: '/lien-ket-tai-khoan',
      icon: LinkIcon,
      description: 'Liên kết với các tài khoản khác'
   },
   {
      label: 'Đổi mật khẩu',
      href: '/doi-mat-khau',
      icon: Lock,
      description: 'Thay đổi mật khẩu tài khoản'
   }
]

type Props = {
   user: User
}

export default function UserMenu({ user }: Props) {
   const [isSheetOpen, setIsSheetOpen] = useState(false)

   const handleLogout = async () => {
      await signOut({ callbackUrl: '/' })
   }

   return (
      <div className="UserMenu">
         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
               <button
                  className="block sm:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Open user menu"
               >
                  <Menu className="h-5 w-5 text-gray-600" />
               </button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 max-w-full rounded-t-xl">
               <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center space-x-3">
                     <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                        {user.fullName.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                     </div>
                  </SheetTitle>
               </SheetHeader>

               <div className="divide-y">
                  {userMenuItems.map((item) => {
                     const IconComponent = item.icon
                     return (
                        <Link
                           key={item.href}
                           href={item.href}
                           onClick={() => setIsSheetOpen(false)} // Đóng Sheet khi click menu
                           className="flex items-start space-x-3 px-6 py-4 hover:bg-blue-50 transition-colors duration-200"
                        >
                           <div className="text-blue-600 mt-1">
                              <IconComponent className="h-5 w-5" />
                           </div>
                           <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{item.label}</h4>
                              <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                           </div>
                        </Link>
                     )
                  })}

                  <button
                     onClick={() => {
                        setIsSheetOpen(false)
                        handleLogout()
                     }}
                     className="flex items-start space-x-3 px-6 py-4 hover:bg-red-50 transition-colors duration-200 w-full text-left border-t text-red-600"
                  >
                     <LogOut className="h-5 w-5 mt-1" />
                     <div className="flex-1">
                        <h4 className="font-medium text-red-900 text-sm">Đăng xuất</h4>
                        <p className="text-xs text-red-600 mt-0.5">Thoát khỏi tài khoản hiện tại</p>
                     </div>
                  </button>
               </div>
            </SheetContent>
         </Sheet>

         {/* Dropdown menu cho màn hình lớn hơn sm */}
         <DropdownMenu>
            <DropdownMenuTrigger className="hidden sm:flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-0">
               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  {user.fullName.charAt(0).toUpperCase()}
               </div>
               <span className="inline-flex items-center gap-1 font-medium">
                  {user.fullName}
                  <ChevronDown className="h-4 w-4" />
               </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50">
               <div className="px-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                     <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                        {user.fullName.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                     </div>
                  </div>
               </div>

               {userMenuItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                     <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start space-x-3 px-6 py-3 hover:bg-blue-50 transition-colors duration-200"
                     >
                        <div className="text-blue-600 mt-1">
                           <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-medium text-gray-900 text-sm">{item.label}</h4>
                           <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                        </div>
                     </Link>
                  )
               })}

               <button
                  onClick={handleLogout}
                  className="flex items-start space-x-3 px-6 py-3 hover:bg-red-50 transition-colors duration-200 w-full text-left border-t border-gray-100 mt-2 pt-4"
               >
                  <div className="text-red-600 mt-1">
                     <LogOut className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-medium text-red-900 text-sm">Đăng xuất</h4>
                     <p className="text-xs text-red-600 mt-0.5">Thoát khỏi tài khoản hiện tại</p>
                  </div>
               </button>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
