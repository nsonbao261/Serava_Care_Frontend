'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

// Components
import { BackgroundMotion } from '@/components'
import LoginForm from '@/features/sign-in/SignInForm'
import SignUpForm from '@/features/sign-in/SignUpForm'

export default function SignInPage() {
   const router = useRouter()
   const searchParams = useSearchParams()
   const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in')

   const handleTabChange = (tab: 'sign-in' | 'sign-up') => {
      setActiveTab(tab)
      const returnUrl = searchParams.get('returnUrl')
      const baseUrl = tab === 'sign-up' ? '/sign-in?action=sign-up' : '/sign-in?action=sign-in'
      const newUrl = returnUrl ? `${baseUrl}&returnUrl=${encodeURIComponent(returnUrl)}` : baseUrl
      router.replace(newUrl)
   }

   return (
      <div className="auth-content bg-gradient-to-br from-blue-50 to-blue-100 p-1 sm:p-2 relative overflow-hidden">
         <BackgroundMotion />

         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto relative z-10 max-h-full overflow-y-auto"
         >
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6">
               {/* Tab Navigation */}
               <div className="mb-6">
                  <div className="flex border-b border-gray-200 w-full">
                     <button
                        onClick={() => handleTabChange('sign-in')}
                        className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 border-b-2 ${
                           activeTab === 'sign-in'
                              ? 'text-blue-600 border-blue-600'
                              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        Đăng nhập
                     </button>
                     <button
                        onClick={() => handleTabChange('sign-up')}
                        className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 border-b-2 ${
                           activeTab === 'sign-up'
                              ? 'text-blue-600 border-blue-600'
                              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        Đăng ký
                     </button>
                  </div>
               </div>

               {/* Tab Content */}
               <div className="space-y-4">
                  {activeTab === 'sign-in' && <LoginForm />}
                  {activeTab === 'sign-up' && <SignUpForm />}
               </div>
            </div>
         </motion.div>
      </div>
   )
}
