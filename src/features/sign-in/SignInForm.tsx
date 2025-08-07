'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// Deps
import { Button, Checkbox, Input, Label } from '@/components'
import { loginSchema, type LoginInput } from '@/schemas'

export default function SignInForm() {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         username: '',
         password: '',
         rememberMe: false
      }
   })

   const onSubmit = (data: LoginInput) => {
      startTransition(async () => {
         const response = await signIn('credentials', { ...data, redirect: false })

         if (response?.ok) {
            toast.success('Đăng nhập thành công')
            router.replace('/')
         } else {
            toast.error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.')
         }
      })
   }

   return (
      <motion.form
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.3 }}
         onSubmit={handleSubmit(onSubmit)}
         className="space-y-3 max-w-md mx-auto"
      >
         {/* General Error Message */}
         {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2">
               <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
               <p className="text-red-700 text-sm">{errors.root.message}</p>
            </div>
         )}

         <div className="space-y-1">
            <Label htmlFor="email" className="text-blue-700 font-medium text-base">
               Email
            </Label>
            <Input
               id="email"
               // type="email"
               placeholder="Nhập email hoặc tên tài khoản"
               className={`rounded-md focus:border-blue-700 h-12 text-base ${
                  errors.username ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('username')}
            />
            {errors.username && (
               <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
         </div>

         <div className="space-y-1">
            <Label htmlFor="password" className="text-blue-700 font-medium text-base">
               Mật khẩu
            </Label>
            <Input
               id="password"
               type="password"
               placeholder="Nhập mật khẩu"
               className={`rounded-md focus:border-blue-700 h-12 text-base ${
                  errors.password ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('password')}
            />
            {errors.password && (
               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
         </div>

         <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
               <Checkbox
                  id="rememberMe"
                  className="border-2 border-blue-300 w-4 h-4 flex-shrink-0"
                  {...register('rememberMe')}
               />
               <Label htmlFor="rememberMe" className="text-sm whitespace-nowrap">
                  Ghi nhớ mật khẩu
               </Label>
            </div>

            <a href="#" className="text-sm text-blue-500 hover:text-blue-600 whitespace-nowrap">
               Quên mật khẩu?
            </a>
         </div>

         <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
         >
            {isPending ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
         </Button>

         <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
               <span className="bg-white px-2 text-blue-700">Hoặc đăng nhập bằng</span>
            </div>
         </div>

         <div className="w-full">
            <Button
               type="button"
               variant="outline"
               className="w-full border-blue-700 text-blue-700 hover:bg-blue-100 h-12 text-base"
            >
               <Mail className="mr-2 h-5 w-5" />
               Google
            </Button>
         </div>
      </motion.form>
   )
}
