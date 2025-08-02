'use client'

import { useEffect } from 'react'

export default function AnimatedPageTitle() {
   useEffect(() => {
      const baseTitle = 'Serava Care'
      const suffixes = [
         ' - Đặt lịch khám bệnh dễ dàng',
         ' - 🏥 Tìm bác sĩ chính xác',
         ' - ⚡ Đặt lịch nhanh chóng',
         ' - 🔍 Hơn 1000 bác sĩ',
         ' - 🏨 125 bệnh viện',
         ' - 💙 Chăm sóc sức khỏe'
      ]

      let currentSuffixIndex = 0
      let currentCharIndex = 0
      let isDeleting = false
      let timeoutId: ReturnType<typeof setTimeout>

      const typeTitle = () => {
         const currentSuffix = suffixes[currentSuffixIndex]

         if (!isDeleting && currentCharIndex < currentSuffix.length) {
            document.title = baseTitle + currentSuffix.slice(0, currentCharIndex + 1)
            currentCharIndex++
            timeoutId = setTimeout(typeTitle, 100)
         } else if (isDeleting && currentCharIndex > 0) {
            document.title = baseTitle + currentSuffix.slice(0, currentCharIndex - 1)
            currentCharIndex--
            timeoutId = setTimeout(typeTitle, 50)
         } else if (!isDeleting && currentCharIndex === currentSuffix.length) {
            timeoutId = setTimeout(() => {
               isDeleting = true
               typeTitle()
            }, 2000)
         } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false
            currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length
            timeoutId = setTimeout(typeTitle, 500)
         }
      }

      const startTimeout = setTimeout(typeTitle, 1000)

      return () => {
         clearTimeout(startTimeout)
         clearTimeout(timeoutId)
         document.title = 'Serava Care - Đặt lịch khám bệnh dễ dàng & nhanh chóng'
      }
   }, [])

   return null
}
