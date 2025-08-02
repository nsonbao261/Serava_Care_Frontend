import { Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components'

interface NoResultsStateProps {
   searchQuery: string
   hasResults: boolean
}

export function NoResultsState({ searchQuery, hasResults }: NoResultsStateProps) {
   if (hasResults) return null

   return (
      <div className="text-center py-12">
         <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
         </div>
         <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bác sĩ nào</h3>
         <p className="text-gray-600 mb-6">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc chuyên khoa
         </p>
         {searchQuery && (
            <div className="space-x-4">
               <Link href={`/chuyen-khoa?search=${encodeURIComponent(searchQuery)}`}>
                  <Button variant="outline">Tìm trong chuyên khoa</Button>
               </Link>
               <Link href="/bac-si">
                  <Button variant="outline">Xóa bộ lọc</Button>
               </Link>
            </div>
         )}
      </div>
   )
}
