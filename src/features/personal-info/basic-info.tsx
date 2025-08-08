'use client'

import { Edit, Save, X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import {
   DatePicker,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components'
import { cn } from '@/lib'
import { usePersonalInfoStore } from './store/personal-info'

// Types
import { type ProfileFormData } from '@/schemas'
type Props = {
   userProfile: ProfileFormData
}

export default function BasicInfo({ userProfile }: Props) {
   const { isEditing, setEditing, isLoading } = usePersonalInfoStore()
   const { control, reset } = useFormContext()

   const handleCancel = () => {
      reset(userProfile)
      setEditing(false)
   }

   return (
      <div className="bg-white rounded-xl shadow-sm p-6">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
            {!isEditing ? (
               <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer"
               >
                  <Edit className="h-4 w-4" />
                  Chỉnh sửa
               </button>
            ) : (
               <div className="flex items-center gap-2">
                  <button
                     type="button"
                     onClick={handleCancel}
                     className="flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-700 cursor-pointer"
                  >
                     <X className="h-4 w-4" />
                     Hủy
                  </button>
                  <button
                     type="submit"
                     disabled={isLoading}
                     className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                  >
                     <Save className="h-4 w-4" />
                     {isLoading ? 'Đang lưu...' : 'Lưu'}
                  </button>
               </div>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ và tên */}
            <FormField
               name="fullName"
               control={control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Họ và tên <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           disabled={!isEditing}
                           className={cn('py-5 transition-colors', !isEditing && 'bg-gray-100')}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Email */}
            <FormField
               name="email"
               control={control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Email <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="email"
                           {...field}
                           disabled={!isEditing}
                           className={cn('py-5 transition-colors', !isEditing && 'bg-gray-100')}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Số điện thoại */}
            <FormField
               name="phoneNumber"
               control={control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Số điện thoại <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="tel"
                           {...field}
                           disabled={!isEditing}
                           className={cn('py-5 transition-colors', !isEditing && 'bg-gray-100')}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Ngày sinh */}
            <FormField
               name="birthDate"
               control={control}
               render={({ field }) => {
                  return (
                     <FormItem>
                        <FormLabel>
                           Ngày sinh <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <DatePicker
                              {...field}
                              onChange={(date) => {
                                 const value = date ? date.toISOString() : new Date().toISOString()
                                 field.onChange(value)
                              }}
                              disabled={!isEditing}
                              className={cn('py-5 transition-colors', !isEditing && 'bg-gray-100')}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )
               }}
            />

            {/* Giới tính */}
            <FormField
               name="gender"
               control={control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Giới tính <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Select {...field} disabled={!isEditing}>
                           <SelectTrigger
                              className={cn(
                                 'w-full py-5 transition-colors',
                                 !isEditing && 'bg-gray-100'
                              )}
                           >
                              <SelectValue defaultValue="OTHER" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="MALE">Nam</SelectItem>
                              <SelectItem value="FEMALE">Nữ</SelectItem>
                              <SelectItem value="OTHER">Khác</SelectItem>
                           </SelectContent>
                        </Select>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Địa chỉ */}
            <div className="md:col-span-2">
               <FormField
                  name="address"
                  control={control}
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                           <textarea
                              {...field}
                              rows={3}
                              disabled={!isEditing}
                              className={cn(
                                 'border-1 rounded-md resize-y py-2 px-4 transition',
                                 !isEditing && 'resize-none bg-gray-100'
                              )}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
         </div>
      </div>
   )
}
