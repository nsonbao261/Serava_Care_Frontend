'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

// Components
import {
   Button,
   Checkbox,
   DatePicker,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   Input,
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components'

// Deps
import { signUpSchema, type SignupInput } from '@/schemas'

export default function SignUpForm() {
   const router = useRouter()
   const [agreeTerms, setAgreeTerms] = useState(false)
   const [isLoading, startTransition] = useTransition()

   const form = useForm<SignupInput>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         birthDate: new Date().toISOString()
      }
   })

   const onSubmit = (data: SignupInput) => {
      if (!agreeTerms) return

      startTransition(async () => {})
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.3 }}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Field */}
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-blue-700 font-medium text-sm">
                              Email <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="email"
                                 placeholder="Nhập email của bạn"
                                 className="w-full h-10 rounded-md text-sm"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  {/* Phone Number Field */}
                  <FormField
                     control={form.control}
                     name="phoneNumber"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-blue-700 font-medium text-sm">
                              Số điện thoại <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 id="phoneNumber"
                                 type="tel"
                                 placeholder="Nhập số điện thoại của bạn"
                                 className="w-full h-10 rounded-md text-sm"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Username Field */}
                  <FormField
                     control={form.control}
                     name="username"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-blue-700 font-medium text-sm">
                              Tên tài khoản <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 id="username"
                                 type="text"
                                 placeholder="Nhập tên tài khoản của bạn"
                                 className="w-full h-10 rounded-md text-sm"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  {/* Full Name Field */}
                  <FormField
                     control={form.control}
                     name="fullName"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-blue-700 font-medium text-sm">
                              Họ và tên <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 id="fullName"
                                 type="text"
                                 placeholder="Nhập họ và tên của bạn"
                                 className="w-full h-10 rounded-md text-sm"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Birth Date Field */}
                  <FormField
                     name="birthDate"
                     control={form.control}
                     render={({ field }) => {
                        return (
                           <FormItem className="flex flex-col">
                              <FormLabel className="text-blue-700 font-medium text-sm">
                                 Ngày sinh <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <DatePicker
                                    {...field}
                                    onChange={(date) => {
                                       const value = date
                                          ? date.toISOString()
                                          : new Date().toISOString()
                                       field.onChange(value)
                                    }}
                                 />
                              </FormControl>
                           </FormItem>
                        )
                     }}
                  />
                  {/* Gender Field */}
                  <FormField
                     control={form.control}
                     name="gender"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel className="text-blue-700 font-medium text-sm">
                              Giới tính <span className="text-red-500">*</span>
                           </FormLabel>
                           <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                 <SelectTrigger className="w-full rounded-md focus:border-blue-700 h-10 text-sm px-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <SelectValue placeholder="Chọn" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="MALE">Nam</SelectItem>
                                 <SelectItem value="FEMALE">Nữ</SelectItem>
                                 <SelectItem value="UNKNOWN">Khác</SelectItem>
                              </SelectContent>
                           </Select>
                        </FormItem>
                     )}
                  />
               </div>

               {/* Password Field */}
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-blue-700 font-medium text-sm">
                           Mật khẩu <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              id="password"
                              type="password"
                              placeholder="Nhập mật khẩu"
                              className="w-full h-10 rounded-md text-sm border"
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               {/* Confirm Password Field */}
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-blue-700 font-medium text-sm">
                           Xác nhận mật khẩu <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              type="password"
                              placeholder="Nhập lại mật khẩu"
                              className="w-full h-10 rounded-md text-sm border"
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               {/* Terms and Conditions */}
               <div className="flex items-start gap-x-2 text-sm mt-4">
                  <Checkbox
                     id="agreeTerms"
                     checked={agreeTerms}
                     onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                     className="border-2 border-blue-300 w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  />
                  <Label
                     htmlFor="agreeTerms"
                     className="text-[11px] leading-tight cursor-pointer flex items-center gap-x-1 whitespace-nowrap"
                  >
                     Tôi đồng ý với
                     <a href="/terms" className="text-blue-500 hover:text-blue-600 underline">
                        Điều khoản sử dụng
                     </a>
                     và
                     <a href="/privacy" className="text-blue-500 hover:text-blue-600 underline">
                        Chính sách bảo mật
                     </a>
                     của Serava Care.
                  </Label>
               </div>
               {/* Submit Button */}
               <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 h-10 text-sm font-medium transition-colors"
                  disabled={isLoading || !agreeTerms}
               >
                  {isLoading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ'}
               </Button>
               {/* Login Link */}
            </form>
         </Form>
      </motion.div>
   )
}
