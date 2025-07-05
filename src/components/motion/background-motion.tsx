'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const backgrounds = [
   '/SeravaCare_Background.png',
   '/SeravaCare_Background1.png',
   '/SeravaCare_Background2.png',
   '/SeravaCare_Background3.png',
   '/SeravaCare_Background4.png'
]

export default function BackgroundMotion() {
   const [index, setIndex] = useState(0)
   const [fade, setFade] = useState(true)

   useEffect(() => {
      const interval = setInterval(() => {
         setFade(false) // bắt đầu mờ đi
         setTimeout(() => {
            setIndex((prev) => (prev + 1) % backgrounds.length)
            setFade(true) // sau đó mờ dần vào ảnh mới
         }, 100) // thời gian mờ ra
      }, 4000) // đổi ảnh mỗi 3s

      return () => clearInterval(interval)
   }, [])

   return (
      <div className="absolute inset-0 z-0">
         <Image
            src={backgrounds[index]}
            alt="background"
            fill
            className={`object-cover transition-opacity duration-1000 ${
               fade ? 'opacity-100' : 'opacity-0'
            }`}
            priority
         />
      </div>
   )
}
