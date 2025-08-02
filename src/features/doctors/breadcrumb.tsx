import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbProps {
   doctorName: string
}

export function Breadcrumb({ doctorName }: BreadcrumbProps) {
   return (
      <div className="bg-white border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
               <Link href="/" className="hover:text-blue-600">
                  Trang chủ
               </Link>
               <ChevronRight className="h-4 w-4" />
               <Link href="/bac-si" className="hover:text-blue-600">
                  Danh sách bác sĩ
               </Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-gray-900">{doctorName}</span>
            </nav>
         </div>
      </div>
   )
}
