// Components
import {
   DoctorsPageHeader,
   DoctorsResults,
   DoctorsSearchSection,
   NoResultsState,
   DoctorsFilter,
   DOCTOR_SPECIALTIES,
   DOCTORS_PER_PAGE
} from '@/features'

// Data
import { mockDoctors } from '@/data'

interface DoctorsPageProps {
   searchParams: Promise<{
      search?: string
      specialty?: string
      page?: string
   }>
}

export default async function DoctorsPage({ searchParams }: DoctorsPageProps) {
   // Server-side data processing
   const params = await searchParams
   const searchQuery = params.search || ''
   const specialtyFilter = params.specialty || 'Tất cả chuyên khoa'
   const currentPage = parseInt(params.page || '1')

   // Filter doctors using the utility class
   const filteredDoctors = DoctorsFilter.filterDoctors({
      doctors: mockDoctors,
      searchQuery,
      specialtyFilter
   })

   // Paginate doctors using the utility class
   const { currentDoctors, totalPages } = DoctorsFilter.paginateDoctors({
      doctors: filteredDoctors,
      currentPage,
      doctorsPerPage: DOCTORS_PER_PAGE
   })

   return (
      <div className="bg-gray-50">
         {/* Header */}
         <DoctorsPageHeader
            title="Danh sách Bác sĩ"
            description="Tìm kiếm và đặt lịch khám với hơn 1000+ bác sĩ chuyên khoa uy tín trên toàn quốc"
         />

         {/* Search and Filter Section */}
         <DoctorsSearchSection
            searchQuery={searchQuery}
            specialtyFilter={specialtyFilter}
            specialties={DOCTOR_SPECIALTIES}
         />

         {/* Results Section */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-20 lg:pb-16 tablet-spacing-fix ipad-pro-spacing-fix">
            <DoctorsResults
               doctors={currentDoctors}
               totalDoctors={filteredDoctors.length}
               specialtyFilter={specialtyFilter}
               currentPage={currentPage}
               totalPages={totalPages}
               searchQuery={searchQuery}
            />

            <NoResultsState searchQuery={searchQuery} hasResults={filteredDoctors.length > 0} />
         </div>
      </div>
   )
}
