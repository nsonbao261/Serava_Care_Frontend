import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getSpecialtyBySlug } from '@/services'

export default async function SpecialtyDetailPage({
   params
}: {
   params: Promise<{ slug: string }>
}) {
   const { slug } = await params
   const specialty = await getSpecialtyBySlug(slug)

   if (!specialty) notFound()

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Breadcrumb */}
         <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <nav className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/" className="hover:text-blue-600">
                     Trang chủ
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/chuyen-khoa" className="hover:text-blue-600">
                     Chuyên khoa
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900">{specialty.name}</span>
               </nav>
            </div>
         </div>
      </div>
   )
}
