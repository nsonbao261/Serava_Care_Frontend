'user client'

import { motion, AnimatePresence } from 'framer-motion'
import SignInPage from '@/app/(auth)/sign-in/page'
import { BackgroundMotion } from '@/components'

const LoginPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 flex items-center justify-center bg-white z-50"
               >
                  <div className="absolute inset-0 z-0 pointer-events-none">
                     <BackgroundMotion />
                  </div>

                  <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md">
                     {/* Form đăng nhập/đăng ký ở đây */}
                     <SignInPage onClose={onClose}/>
                  </div>
               </motion.div>
         )}
      </AnimatePresence>
   )
}
export default LoginPanel;