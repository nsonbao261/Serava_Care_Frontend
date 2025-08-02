interface FilterParams {
   doctors: Doctor[]
   searchQuery: string
   specialtyFilter: string
}

interface PaginationParams {
   doctors: Doctor[]
   currentPage: number
   doctorsPerPage: number
}

interface PaginationResult {
   currentDoctors: Doctor[]
   totalPages: number
   indexOfFirstDoctor: number
   indexOfLastDoctor: number
}

export class DoctorsFilter {
   static filterDoctors({ doctors, searchQuery, specialtyFilter }: FilterParams): Doctor[] {
      let filteredDoctors = [...doctors]

      // Filter by search term
      if (searchQuery) {
         filteredDoctors = filteredDoctors.filter(
            (doctor) =>
               doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (doctor.specialty &&
                  doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
               doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
         )
      }

      // Filter by specialty
      if (specialtyFilter !== 'Tất cả chuyên khoa') {
         filteredDoctors = filteredDoctors.filter(
            (doctor) => doctor.specialty && doctor.specialty.includes(specialtyFilter)
         )
      }

      return filteredDoctors
   }

   static paginateDoctors({
      doctors,
      currentPage,
      doctorsPerPage
   }: PaginationParams): PaginationResult {
      const indexOfLastDoctor = currentPage * doctorsPerPage
      const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
      const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
      const totalPages = Math.ceil(doctors.length / doctorsPerPage)

      return {
         currentDoctors,
         totalPages,
         indexOfFirstDoctor,
         indexOfLastDoctor
      }
   }
}
