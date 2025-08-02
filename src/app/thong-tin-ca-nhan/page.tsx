'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// Components
import { Form, LoadingSpinner } from '@/components'
import BasicInfo from '@/features/personal-info/basic-info'
import EmergencyContact from '@/features/personal-info/emergency-contact'
import InsuranceInfomation from '@/features/personal-info/insurance-info'
import MedicalInfomation from '@/features/personal-info/medical-info'
import Overview from '@/features/personal-info/overview'

// Deps
import { usePersonalInfoStore } from '@/features/personal-info/store/personal-info'
import { useAuth } from '@/hooks'
import { type ProfileFormData, profileFormSchema } from '@/schemas'
import { updateUserProfile } from '@/services'

export default function PersonalInfoPage() {
   const router = useRouter()
   const { isAuthenticated, isLoading: authLoading, user } = useAuth()
   const { setEditing, setLoading } = usePersonalInfoStore()
   const [saveSuccess, setSaveSuccess] = useState(false)

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
      try {
         if (user && isAuthenticated) {
            await updateUserProfile(user.userId, {
               fullName: data.fullName,
               email: data.email,
               phoneNumber: data.phoneNumber,
               birthDate: data.birthDate,
               gender: data.gender,
               address: data.address
            })
         }

         console.log('Profile updated:', data)
         setSaveSuccess(true)
         setEditing(false)

         setTimeout(() => setSaveSuccess(false), 3000)
      } catch (error) {
         console.error('Error updating profile:', error)
      }
      setLoading(false)
   }

   useEffect(() => {
      if (user) form.reset(userProfile)
   }, [user])

   if (authLoading) {
      return <LoadingSpinner size="lg" text="Đang tải thông tin cá nhân..." />
   }

   if (!isAuthenticated) {
      router.push('/sign-in?returnUrl=/thong-tin-ca-nhan')
      return null
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
                  {saveSuccess && (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg"
                     >
                        <CheckCircle className="h-5 w-5" />
                        <span>Đã lưu thành công!</span>
                     </motion.div>
                  )}
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
