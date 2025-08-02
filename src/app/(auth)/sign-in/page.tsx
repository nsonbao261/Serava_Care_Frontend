'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

// Components
import LoginForm from '@/features/sign-in/SignInForm'
import SignUpForm from '@/features/sign-in/SignUpForm'

interface SignInPageProps {
   onClose: () => void
}

export default function SignInPage({ onClose }: SignInPageProps) {
   const searchParams = useSearchParams()
   const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in')

   useEffect(() => {
      const action = searchParams.get('action')
      if (action === 'sign-up') {
         setActiveTab('sign-up')
      } else {
         setActiveTab('sign-in')
      }
   }, [searchParams])

   useEffect(() => {
      const action = searchParams.get('action')
      if (action === 'sign-up') {
         setActiveTab('sign-up')
      } else {
         setActiveTab('sign-in')
      }
   }, [searchParams])

   return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
         <button
            onClick={onClose}
            className="absolute top-0 right-2 text-2xl font-bold text-gray-600 hover:text-red-500 z-20"
            aria-label="Đóng"
         >
            &times;
         </button>

         {/* Tabs */}
         <div className="flex border-b mb-4">
            <button
               onClick={() => setActiveTab('sign-in')}
               className={`flex-1 py-2 text-center font-medium transition-all ${
                  activeTab === 'sign-in'
                     ? 'text-blue-600 border-b-2 border-blue-600'
                     : 'text-gray-500 hover:text-gray-700'
               }`}
            >
               Đăng nhập
            </button>
            <button
               onClick={() => setActiveTab('sign-up')}
               className={`flex-1 py-2 text-center font-medium transition-all ${
                  activeTab === 'sign-up'
                     ? 'text-blue-600 border-b-2 border-blue-600'
                     : 'text-gray-500 hover:text-gray-700'
               }`}
            >
               Đăng ký
            </button>
         </div>

         {/* Form content */}
         <div className="mt-4">
            {activeTab === 'sign-in' && <LoginForm />}
            {activeTab === 'sign-up' && <SignUpForm />}
         </div>
      </div>
   )
}
