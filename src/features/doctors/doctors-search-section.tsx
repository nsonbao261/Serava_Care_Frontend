import { SearchAndFilter } from '@/features/doctors/search-filter'

interface DoctorsSearchSectionProps {
   searchQuery: string
   specialtyFilter: string
   specialties: string[]
}

export function DoctorsSearchSection({
   searchQuery,
   specialtyFilter,
   specialties
}: DoctorsSearchSectionProps) {
   return (
      <div className="bg-white border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SearchAndFilter
               initialSearchQuery={searchQuery}
               initialSpecialtyFilter={specialtyFilter}
               specialties={specialties}
            />
         </div>
      </div>
   )
}
