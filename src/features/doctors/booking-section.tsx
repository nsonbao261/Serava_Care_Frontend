import { Clock, Mail, Phone } from 'lucide-react'

// Components
import BookingModal from './booking-modal'

// Deps
import { getDoctorWorkDates } from '@/services/server'

export default async function BookingSection(props: { doctor: DoctorDetail }) {
   const { doctor } = props
   doctor.id = '300d2596-2bd1-466f-a914-b56afe89e85d'
   const workDates = await getDoctorWorkDates(doctor.id, '2025-10-05T00:00:00Z')

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
         <h3 className="text-xl font-bold text-gray-900 mb-4">Đặt lịch khám</h3>

         <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
               <span className="text-gray-600">Phí khám:</span>
               <span className="text-xl font-bold text-green-600">{doctor.consultationFee}</span>
            </div>
            <div className="flex items-center text-gray-600">
               <Clock className="h-4 w-4 mr-2" />
               <span className="text-sm">{doctor.workingHours}</span>
            </div>
         </div>

         <BookingModal
            doctor={doctor as Doctor}
            workDates={workDates}
            specializationId={'13e757f8-d89f-463b-a3e5-b088109ff563'}
         />

         <div className="space-y-3">
            <div className="flex items-center text-gray-600">
               <Phone className="h-4 w-4 mr-2" />
               <span className="text-sm">{doctor.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
               <Mail className="h-4 w-4 mr-2" />
               <span className="text-sm">{doctor.email}</span>
            </div>
         </div>
      </div>
   )
}
