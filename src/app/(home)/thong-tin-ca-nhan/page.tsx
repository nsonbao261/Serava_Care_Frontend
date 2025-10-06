'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWR from 'swr'

// Component
import { LoadingSpinner } from '@/components/common'
import { Form } from '@/components/ui'
import { ProtectedRoute } from '@/features/auth'
import {
   BasicInfo,
   EmergencyContact,
   InsuranceInfor,
   MedicalInfo,
   Overview
} from '@/features/profile'

// Deps
import { usePersonalInfoStore } from '@/features/profile/store/personal-info'
import { type ProfileFormData, profileFormSchema } from '@/schemas'
import { getUserProfile, updateUserProfile } from '@/services/server'
import { getChangedFields, toastMessage } from '@/utils'

export default function ProfilePage() {
   const { setEditing, setLoading } = usePersonalInfoStore()
   const { data: user, isValidating, mutate } = useSWR('user', getUserProfile)

   const userProfile: ProfileFormData = {
      userId: user?.userId || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      birthDate: user?.birthDate ? user.birthDate : new Date().toISOString(),
      gender: user?.gender || 'UNKNOWN'
   }

   const form = useForm<ProfileFormData>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: userProfile
   })

   const profileValues = form.watch()

   const onSubmit = async (data: ProfileFormData) => {
      if (!user) return

      setLoading(true)
      const updatedFields = getChangedFields(user, data)
      if (!updatedFields) {
         toast.info('Không có thông tin nào thay đổi')
         setEditing(false)
         setLoading(false)
         return
      }

      const res = await updateUserProfile(user.userId, updatedFields)
      toastMessage(res, { success: toast.success, error: toast.error })

      await mutate()
      setEditing(false)
      setLoading(false)
   }

   useEffect(() => {
      if (user) form.reset(user)
   }, [user])

   return (
      <ProtectedRoute allowedRoles={['GUEST']}>
         {isValidating ? (
            <LoadingSpinner size="lg" text="Đang tải thông tin cá nhân..." />
         ) : (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
               <div className="container mx-auto px-4 py-8">
                  <div className="max-w-7xl mx-auto">
                     {/* Header */}
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h1 className="text-3xl font-bold text-gray-900 mb-2">
                              Thông tin cá nhân
                           </h1>
                           <p className="text-gray-600">
                              Quản lý và cập nhật thông tin cá nhân của bạn
                           </p>
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
                                    <MedicalInfo />
                                 </div>

                                 <InsuranceInfor />
                              </form>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </ProtectedRoute>
   )
}
