'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {cn} from '@/lib'

export default ((props) => {
    const {particleCount = 30, particleColor = '#3b82f6', className} = props
    const [particles, setParticles] = useState<Array<{
        id: number
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        opacity: number
    }>>([])

    const initialParticles = useMemo(() => Array.from({length: particleCount}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1
    })), [particleCount])

    useEffect(() => {
        setParticles(initialParticles)
    }, [initialParticles])

    const updateParticles = useCallback(() => {
        setParticles((prev) => prev.map((particle) => ({
            ...particle,
            x: (particle.x + particle.speedX + 100) % 100,
            y: (particle.y + particle.speedY + 100) % 100
        })))
    }, [])

    useEffect(() => {
        const interval = setInterval(updateParticles, 100)
        return () => clearInterval(interval)
    }, [updateParticles])

    return (<div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        {particles.map((particle) => (<div
            key={particle.id}
            className="absolute rounded-full"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particleColor,
                opacity: particle.opacity,
                transform: 'translate(-50%, -50%)'
            }}
        />))}
    </div>)
}) satisfies React.FC<{
    particleCount?: number
    particleColor?: string
    className?: string
}>
