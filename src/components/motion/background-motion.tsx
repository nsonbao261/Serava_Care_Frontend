'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'

export default (() => {
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)

    const BACKGROUNDS = [
        '/images/public/app/SeravaCare_Background1.png',
        '/images/public/app/SeravaCare_Background2.png',
        '/images/public/app/SeravaCare_Background3.png',
        '/images/public/app/SeravaCare_Background4.png'
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false) // bắt đầu mờ đi
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % BACKGROUNDS.length)
                setFade(true) // sau đó mờ dần vào ảnh mới
            }, 100) // thời gian mờ ra
        }, 4000) // đổi ảnh mỗi 3s

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 z-0">
            <Image
                src={BACKGROUNDS[index]}
                alt="background"
                fill
                className={`object-cover transition-opacity duration-1000 ${
                    fade ? 'opacity-100' : 'opacity-0'
                }`}
                priority
            />
        </div>
    )
}) satisfies React.FC
