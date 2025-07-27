'user client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import LoginForm from '@/features/sign-in/SignInForm'
import AuthTabs from '../authtab'

interface LoginPanelProps {
   isOpen: boolean
   onClose: () => void
   children: ReactNode
}

const LoginPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ duration: 0.4 }}
               className="fixed top-0 right-0 w-full md:max-w-xl h-screen bg-white shadow-xl z-50 overflow-y-auto"
            >
               <div className="p-4">
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-800 mb-4">
                     Đóng
                  </button>
                  {/* Form đăng nhập/đăng ký ở đây */}
                  <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
                  {/* Gọi component <LoginForm /> hoặc bạn có thể nhúng trực tiếp form ở đây */}
                  <AuthTabs />
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}
export default LoginPanel;