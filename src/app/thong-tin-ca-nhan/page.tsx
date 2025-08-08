'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWR from 'swr'

// Components
import { Form, LoadingSpinner } from '@/components'
import BasicInfo from '@/features/personal-info/basic-info'
import EmergencyContact from '@/features/personal-info/emergency-contact'
import InsuranceInfomation from '@/features/personal-info/insurance-info'
import MedicalInfomation from '@/features/personal-info/medical-info'
import Overview from '@/features/personal-info/overview'
import { usePersonalInfoStore } from '@/features/personal-info/store/personal-info'
import { type ProfileFormData, profileFormSchema } from '@/schemas'
import { getUserProfile, updateUserProfile } from '@/services/server/users'

export default function PersonalInfoPage() {
   const router = useRouter()
   const { setEditing, setLoading } = usePersonalInfoStore()
   const { data: user, isValidating } = useSWR('user', getUserProfile)

   const userProfile: ProfileFormData = {
      userId: user?.userId || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      birthDate: user?.birthDate ? user.birthDate : new Date().toISOString(),
      gender: user?.gender || 'OTHER'
   }

   const form = useForm<ProfileFormData>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: userProfile
   })

   const profileValues = form.watch()

   const onSubmit = async (data: ProfileFormData) => {
      setLoading(true)
      if (user) {
         const res = await updateUserProfile(user.userId, {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthDate: data.birthDate,
            gender: data.gender,
            address: data.address
         })

         if (res.data) {
            toast.success(res.message)
         } else {
            toast.error(res.message)
         }

         router.refresh()
      }

      setEditing(false)
      setLoading(false)
   }

   useEffect(() => {
      if (user) form.reset(userProfile)
   }, [user])

   if (isValidating) {
      return <LoadingSpinner size="lg" text="Đang tải thông tin cá nhân..." />
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
               {/* Header */}
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Thông tin cá nhân</h1>
                     <p className="text-gray-600">Quản lý và cập nhật thông tin cá nhân của bạn</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Profile Overview */}
                  <div className="lg:col-span-1">
                     <Overview personalInfo={profileValues} />
                  </div>

                  {/* Right Column - Forms Section */}
                  <div className="lg:col-span-2">
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                           <BasicInfo userProfile={userProfile} />

                           <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                              <EmergencyContact />
                              <MedicalInfomation />
                           </div>

                           <InsuranceInfomation />
                        </form>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
