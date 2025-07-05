'use client'

import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import BackgroundMotion from '@/components/motion/background-motion'
import { LoginForm, SignupForm } from '@/components'
import { Suspense, useEffect, useState } from 'react'

function LoginContent() {
   const searchParams = useSearchParams()
   const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

   // Handle tab parameter from URL
   useEffect(() => {
      const tabParam = searchParams.get('tab')
      if (tabParam === 'signup') {
         setActiveTab('signup')
      }
   }, [searchParams])

   const handleTabChange = (tab: 'login' | 'signup') => {
      setActiveTab(tab)
      // Update URL without page reload, preserving returnUrl if present
      const returnUrl = searchParams.get('returnUrl')
      const baseUrl = tab === 'signup' ? '/login?action=signup' : '/login?action=login'
      const newUrl = returnUrl ? `${baseUrl}&returnUrl=${encodeURIComponent(returnUrl)}` : baseUrl
      window.history.replaceState({}, '', newUrl)
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
               {/* Tab Navigation - Traditional Style */}
               <div className="mb-6">
                  <div className="flex border-b border-gray-200 w-full">
                     <button
                        onClick={() => handleTabChange('login')}
                        className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 border-b-2 ${
                           activeTab === 'login'
                              ? 'text-blue-600 border-blue-600'
                              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        Đăng nhập
                     </button>
                     <button
                        onClick={() => handleTabChange('signup')}
                        className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 border-b-2 ${
                           activeTab === 'signup'
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
                  {/* Login Form */}
                  {activeTab === 'login' && <LoginForm />}

                  {/* Signup Form */}
                  {activeTab === 'signup' && <SignupForm />}
               </div>
            </div>
         </motion.div>
      </div>
   )
}

export default function Login() {
   return (
      <Suspense
         fallback={
            <div className="auth-content bg-gradient-to-br from-blue-50 to-blue-100 p-4 relative">
               <BackgroundMotion />
               <div className="text-blue-700 relative z-10">Đang tải...</div>
            </div>
         }
      >
         <LoginContent />
      </Suspense>
   )
}
