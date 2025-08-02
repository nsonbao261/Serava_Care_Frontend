import { differenceInYears, format, isValid, parseISO } from 'date-fns'
import { Calendar, Camera, ChevronRight, Key, Mail, MapPin, Phone, Shield } from 'lucide-react'

// Deps
import { DATE_FORMAT } from '@/constants'
import { ProfileFormData } from '@/schemas'
import { usePersonalInfoStore } from './store/personal-info'

// Types
type Props = {
   personalInfo: ProfileFormData
}

export default function Overview({ personalInfo }: Props) {
   const { isEditing } = usePersonalInfoStore()

   const getAge = (birthDate?: string): string => {
      if (!birthDate) return 'Không rõ'
      const date = parseISO(birthDate)

      if (!isValid(date)) return 'Không rõ'
      const years = differenceInYears(new Date(), date)
      return years.toString()
   }

   const genderText =
      personalInfo.gender === 'MALE' ? 'Nam' : personalInfo.gender === 'FEMALE' ? 'Nữ' : 'Khác'

   return (
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
         <div className="text-center mb-6">
            <div className="relative inline-block">
               <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase">
                  {personalInfo.fullName.charAt(0)}
               </div>

               {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                     <Camera className="h-4 w-4" />
                  </button>
               )}
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-4">{personalInfo.fullName}</h2>

            <p className="text-gray-600 flex flex-col">
               <span>{`Tuổi: ${getAge(personalInfo.birthDate)}`}</span>
               <span>{`Giới tính: ${genderText}`}</span>
            </p>
         </div>

         {/* Quick Info */}
         <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm">
               <Mail className="h-4 w-4 text-blue-500" />
               <span className="text-gray-600">{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <Phone className="h-4 w-4 text-green-500" />
               <span className="text-gray-600">{personalInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <Calendar className="h-4 w-4 text-purple-500" />
               <span className="text-gray-600">
                  {format(parseISO(personalInfo.birthDate), DATE_FORMAT)}
               </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <MapPin className="h-4 w-4 text-red-500" />
               <span className="text-gray-600">{personalInfo.address}</span>
            </div>
         </div>

         <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
               <Shield className="h-5 w-5 text-blue-500" />
               <span>Bảo mật tài khoản</span>
               <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
               <Key className="h-5 w-5 text-green-500" />
               <span>Đổi mật khẩu</span>
               <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
            </button>
         </div>
      </div>
   )
}
