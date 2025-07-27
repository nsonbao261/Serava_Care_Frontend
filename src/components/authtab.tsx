'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginForm from '@/features/sign-in/SignInForm'
import SignUpForm from '@/features/sign-in/SignUpForm'

const AuthTabs = () => {
   const searchParams = useSearchParams()
   const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in')
   const action = searchParams.get('action')

   useEffect(() => {
      if (action === 'sign-up') {
         setActiveTab('sign-up')
      } else {
         setActiveTab('sign-in')
      }
   }, [searchParams])

   return (
      <div className="w-full">
         <div className="bg-white rounded-xl shadow-xl p-6 w-full">
            <div className="flex border-b mb-4">
               <button
                  onClick={() => setActiveTab('sign-in')}
                  className={`flex-1 py-2 text-center transition-all ${
                     activeTab === 'sign-in' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
               >
                  Đăng nhập
               </button>
               <button
                  onClick={() => setActiveTab('sign-up')}
                  className={`flex-1 py-2 text-center transition-all ${
                     activeTab === 'sign-up' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
               >
                  Đăng ký
               </button>
            </div>

            {activeTab === 'sign-in' && <LoginForm />}
            {activeTab === 'sign-up' && <SignUpForm />}
         </div>
      </div>
   )
}

export default AuthTabs