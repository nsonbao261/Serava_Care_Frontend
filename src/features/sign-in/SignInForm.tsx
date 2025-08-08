'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

// Components
import {
   Button,
   Checkbox,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input
} from '@/components'

// Deps
import { signInSchema, type SignInInput } from '@/schemas'

// Types
type Props = {
   callbackUrl?: string
}
export default function SignInForm({ callbackUrl = '/' }: Props) {
   const [isPending, startTransition] = useTransition()

   const form = useForm<SignInInput>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
         username: '',
         password: '',
         rememberMe: false
      }
   })

   const onSubmit = (data: SignInInput) => {
      startTransition(async () => {
         await signIn('credentials', { ...data, callbackUrl })
      })
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.3 }}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem className="space-y-1">
                        <FormLabel className="text-blue-700 font-medium text-base">Email</FormLabel>
                        <FormControl>
                           <Input
                              id="email"
                              placeholder="Nhập email hoặc tên tài khoản"
                              className={`rounded-md focus:border-blue-700 h-12 text-base ${
                                 form.formState.errors.username
                                    ? 'border-red-500'
                                    : 'border-blue-500'
                              }`}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem className="space-y-1">
                        <FormLabel className="text-blue-700 font-medium text-base">
                           Mật khẩu
                        </FormLabel>
                        <FormControl>
                           <Input
                              id="password"
                              type="password"
                              placeholder="Nhập mật khẩu"
                              className={`rounded-md focus:border-blue-700 h-12 text-base ${
                                 form.formState.errors.password
                                    ? 'border-red-500'
                                    : 'border-blue-500'
                              }`}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <div className="flex items-center justify-between text-sm">
                  <FormField
                     control={form.control}
                     name="rememberMe"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                           <FormControl>
                              <Checkbox
                                 id="rememberMe"
                                 className="border-2 border-blue-300 w-4 h-4 flex-shrink-0"
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                           <div className="space-y-1 leading-none">
                              <FormLabel htmlFor="rememberMe" className="text-sm whitespace-nowrap">
                                 Ghi nhớ mật khẩu
                              </FormLabel>
                           </div>
                        </FormItem>
                     )}
                  />
                  <a
                     href="#"
                     className="text-sm text-blue-500 hover:text-blue-600 whitespace-nowrap"
                  >
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
                     onClick={() => signIn('google', { callbackUrl })}
                     className="w-full border-blue-700 text-blue-700 hover:bg-blue-100 h-12 text-base"
                  >
                     <Mail className="mr-2 h-5 w-5" />
                     Google
                  </Button>
               </div>
            </form>
         </Form>
      </motion.div>
   )
}
