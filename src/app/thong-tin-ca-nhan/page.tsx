'use client'

import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileFormSchema, ProfileFormData } from '@/schemas'
import { motion } from 'framer-motion'
import {
   Mail,
   Phone,
   Calendar,
   MapPin,
   Edit,
   Save,
   X,
   Camera,
   Shield,
   Key,
   ChevronRight,
   CheckCircle
} from 'lucide-react'
import { LoadingSpinner } from '@/components'
import { mockUserProfile } from '@/data'
import { UserService } from '@/services'
import { formatDate } from '@/lib'

const userService = new UserService()

export default function PersonalInfoPage() {
   const router = useRouter()
   const { isAuthenticated, isLoading: authLoading, user } = useAuth()
   const [isEditing, setIsEditing] = React.useState(false)
   const [isLoading, setIsLoading] = React.useState(false)
   const [saveSuccess, setSaveSuccess] = React.useState(false)

   // Get user profile data or fallback to mock data
   const userProfile = useMemo(() => {
      const mockProfile = Array.isArray(mockUserProfile) ? mockUserProfile[0] : mockUserProfile
      return user
         ? {
              fullName: user.fullName || mockProfile.fullName,
              email: user.email || mockProfile.email,
              phone: user.phone || mockProfile.phone,
              birthDate: user.birthDate || mockProfile.birthDate,
              gender: user.gender || mockProfile.gender,
              address: mockProfile.address
           }
         : mockProfile
   }, [user])

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch
   } = useForm<ProfileFormData>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: userProfile
   })

   // Redirect to login if not authenticated
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         router.push('/login?returnUrl=/thong-tin-ca-nhan')
      }
   }, [isAuthenticated, authLoading, router])

   // Reset form with profile data
   useEffect(() => {
      if (isAuthenticated && userProfile) {
         reset(userProfile)
      }
   }, [isAuthenticated, userProfile, reset])

   const onSubmit = async (data: ProfileFormData) => {
      setIsLoading(true)
      try {
         // Save to data manager if user is authenticated
         if (user && isAuthenticated) {
            // Use mockUserProfile.id as fallback since User type doesn't have id
            const mockProfile = Array.isArray(mockUserProfile)
               ? mockUserProfile[0]
               : mockUserProfile
            const userId = mockProfile.id
            await userService.updateUserProfile(userId, {
               fullName: data.fullName,
               email: data.email,
               phone: data.phone,
               birthDate: data.birthDate,
               gender: data.gender,
               address: data.address
            })
         }

         console.log('Profile updated:', data)
         setSaveSuccess(true)
         setIsEditing(false)

         setTimeout(() => setSaveSuccess(false), 3000)
      } catch (error) {
         console.error('Error updating profile:', error)
      } finally {
         setIsLoading(false)
      }
   }

   const handleCancel = () => {
      reset(userProfile)
      setIsEditing(false)
   }

   const getAgeFromBirthDate = (birthDate: string) => {
      const today = new Date()
      const birth = new Date(birthDate)
      const age = today.getFullYear() - birth.getFullYear()
      return age
   }

   // Loading state
   if (authLoading) {
      return <LoadingSpinner size="lg" text="Đang tải thông tin cá nhân..." />
   }

   // Not authenticated
   if (!isAuthenticated) {
      return null
   }

   const profileValues = watch()

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
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm p-6 sticky top-8"
                     >
                        {/* Avatar */}
                        <div className="text-center mb-6">
                           <div className="relative inline-block">
                              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                 {profileValues.fullName?.charAt(0) || 'U'}
                              </div>
                              {isEditing && (
                                 <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                    <Camera className="h-4 w-4" />
                                 </button>
                              )}
                           </div>
                           <h2 className="text-xl font-semibold text-gray-900 mt-4">
                              {profileValues.fullName}
                           </h2>
                           <p className="text-gray-600">
                              {getAgeFromBirthDate(profileValues.birthDate)} tuổi •{' '}
                              {profileValues.gender === 'male'
                                 ? 'Nam'
                                 : profileValues.gender === 'female'
                                   ? 'Nữ'
                                   : 'Khác'}
                           </p>
                        </div>

                        {/* Quick Info */}
                        <div className="space-y-4 mb-6">
                           <div className="flex items-center gap-3 text-sm">
                              <Mail className="h-4 w-4 text-blue-500" />
                              <span className="text-gray-600">{profileValues.email}</span>
                           </div>
                           <div className="flex items-center gap-3 text-sm">
                              <Phone className="h-4 w-4 text-green-500" />
                              <span className="text-gray-600">{profileValues.phone}</span>
                           </div>
                           <div className="flex items-center gap-3 text-sm">
                              <Calendar className="h-4 w-4 text-purple-500" />
                              <span className="text-gray-600">
                                 {formatDate(profileValues.birthDate)}
                              </span>
                           </div>
                           <div className="flex items-center gap-3 text-sm">
                              <MapPin className="h-4 w-4 text-red-500" />
                              <span className="text-gray-600">{profileValues.address}</span>
                           </div>
                        </div>

                        {/* Quick Actions */}
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
                     </motion.div>
                  </div>

                  {/* Right Column - Forms Section */}
                  <div className="lg:col-span-2">
                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Personal Information */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="bg-white rounded-xl shadow-sm p-6"
                        >
                           <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-gray-900">
                                 Thông tin cơ bản
                              </h3>
                              {!isEditing ? (
                                 <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                 >
                                    <Edit className="h-4 w-4" />
                                    Chỉnh sửa
                                 </button>
                              ) : (
                                 <div className="flex items-center gap-2">
                                    <button
                                       type="button"
                                       onClick={handleCancel}
                                       className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                                    >
                                       <X className="h-4 w-4" />
                                       Hủy
                                    </button>
                                    <button
                                       type="submit"
                                       disabled={isLoading}
                                       className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                       <Save className="h-4 w-4" />
                                       {isLoading ? 'Đang lưu...' : 'Lưu'}
                                    </button>
                                 </div>
                              )}
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    {...register('fullName')}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.fullName ? 'border-red-300' : ''}`}
                                 />
                                 {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.fullName.message}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    {...register('email')}
                                    disabled={!isEditing}
                                    type="email"
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.email ? 'border-red-300' : ''}`}
                                 />
                                 {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.email.message}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    {...register('phone')}
                                    disabled={!isEditing}
                                    type="tel"
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.phone ? 'border-red-300' : ''}`}
                                 />
                                 {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.phone.message}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày sinh <span className="text-red-500">*</span>
                                 </label>
                                 <input
                                    {...register('birthDate')}
                                    disabled={!isEditing}
                                    type="date"
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.birthDate ? 'border-red-300' : ''}`}
                                 />
                                 {errors.birthDate && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.birthDate.message}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới tính <span className="text-red-500">*</span>
                                 </label>
                                 <select
                                    {...register('gender')}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.gender ? 'border-red-300' : ''}`}
                                 >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                 </select>
                                 {errors.gender && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.gender.message}
                                    </p>
                                 )}
                              </div>

                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ <span className="text-red-500">*</span>
                                 </label>
                                 <textarea
                                    {...register('address')}
                                    disabled={!isEditing}
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    } ${errors.address ? 'border-red-300' : ''}`}
                                 />
                                 {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">
                                       {errors.address.message}
                                    </p>
                                 )}
                              </div>
                           </div>
                        </motion.div>

                        {/* Grid Layout for Additional Info Cards */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                           {/* Emergency Contact */}
                           <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white rounded-xl shadow-sm p-6"
                           >
                              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                 Liên hệ khẩn cấp
                              </h3>

                              <div className="grid grid-cols-1 gap-4">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Tên người liên hệ
                                    </label>
                                    <input
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).emergencyContact?.name || ''
                                       }
                                       disabled={!isEditing}
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    />
                                 </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Số điện thoại
                                    </label>
                                    <input
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).emergencyContact?.phone || ''
                                       }
                                       disabled={!isEditing}
                                       type="tel"
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    />
                                 </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Mối quan hệ
                                    </label>
                                    <input
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).emergencyContact?.relationship || ''
                                       }
                                       disabled={!isEditing}
                                       placeholder="Ví dụ: Vợ/chồng, Con, Cha/mẹ, Anh/chị..."
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    />
                                 </div>
                              </div>
                           </motion.div>

                           {/* Medical Information */}
                           <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="bg-white rounded-xl shadow-sm p-6"
                           >
                              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                 Thông tin y tế
                              </h3>

                              <div className="grid grid-cols-1 gap-4">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Nhóm máu
                                    </label>
                                    <select
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).medicalInfo?.bloodType || ''
                                       }
                                       disabled={!isEditing}
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    >
                                       <option value="">Chọn nhóm máu</option>
                                       <option value="A+">A+</option>
                                       <option value="A-">A-</option>
                                       <option value="B+">B+</option>
                                       <option value="B-">B-</option>
                                       <option value="AB+">AB+</option>
                                       <option value="AB-">AB-</option>
                                       <option value="O+">O+</option>
                                       <option value="O-">O-</option>
                                    </select>
                                 </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Dị ứng (nếu có)
                                    </label>
                                    <input
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).medicalInfo?.allergies?.join(', ') || ''
                                       }
                                       disabled={!isEditing}
                                       placeholder="Ví dụ: Penicillin, Tôm cua..."
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    />
                                 </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Bệnh mạn tính (nếu có)
                                    </label>
                                    <input
                                       value={
                                          (Array.isArray(mockUserProfile)
                                             ? mockUserProfile[0]
                                             : mockUserProfile
                                          ).medicalInfo?.chronicConditions?.join(', ') || ''
                                       }
                                       disabled={!isEditing}
                                       placeholder="Ví dụ: Tiểu đường, Cao huyết áp..."
                                       className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                          !isEditing
                                             ? 'bg-gray-50 border-gray-200'
                                             : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                       }`}
                                    />
                                 </div>
                              </div>
                           </motion.div>
                        </div>

                        {/* Insurance Information - Full Width */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="bg-white rounded-xl shadow-sm p-6"
                        >
                           <h3 className="text-lg font-semibold text-gray-900 mb-6">
                              Thông tin bảo hiểm
                           </h3>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhà cung cấp bảo hiểm
                                 </label>
                                 <input
                                    value={
                                       (Array.isArray(mockUserProfile)
                                          ? mockUserProfile[0]
                                          : mockUserProfile
                                       ).insurance?.provider || ''
                                    }
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    }`}
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số thẻ bảo hiểm
                                 </label>
                                 <input
                                    value={
                                       (Array.isArray(mockUserProfile)
                                          ? mockUserProfile[0]
                                          : mockUserProfile
                                       ).insurance?.policyNumber || ''
                                    }
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    }`}
                                 />
                              </div>

                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày hết hạn
                                 </label>
                                 <input
                                    value={
                                       (Array.isArray(mockUserProfile)
                                          ? mockUserProfile[0]
                                          : mockUserProfile
                                       ).insurance?.expiryDate || ''
                                    }
                                    disabled={!isEditing}
                                    type="date"
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                       !isEditing
                                          ? 'bg-gray-50 border-gray-200'
                                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                                    }`}
                                 />
                              </div>
                           </div>
                        </motion.div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
