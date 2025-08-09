'use client'

import { BackgroundMotion } from '@/components'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

// Components
import SignInForm from '@/features/sign-in/sign-in-form'
import SignUpForm from '@/features/sign-in/sign-up-form'

// Types
type Props = {
   searchParams: Promise<{ callbackUrl?: string }>
}

export default function SignInPage({ searchParams }: Props) {
   const { callbackUrl } = use(searchParams)

   const router = useRouter()
   const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in')

   const handleClose = () => {
      router.back()
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="absolute inset-0 z-0 pointer-events-none">
            <BackgroundMotion />
         </div>

         <div className="relative z-10 rounded-2xl shadow-xl w-full max-w-lg bg-white">
            <div className="w-full rounded-xl shadow-lg p-6">
               <button
                  className="absolute top-0 right-2 text-2xl font-bold text-gray-600 hover:text-red-500 z-20"
                  aria-label="Đóng"
                  onClick={handleClose}
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

               {activeTab === 'sign-in' && <SignInForm callbackUrl={callbackUrl} />}
               {activeTab === 'sign-up' && <SignUpForm />}
            </div>
         </div>
      </div>
   )
}
