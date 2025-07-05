'use client'

import { Suspense, lazy } from 'react'
import { HeroSection, LoadingSpinner, AnimatedSection } from '@/components'

// Lazy load heavy sections for better initial page load
const FeaturesSection = lazy(() => import('@/components/sections/FeaturesSection'))
const SpecialtiesSection = lazy(() => import('@/components/sections/SpecialtiesSection'))
const StatisticsSection = lazy(() => import('@/components/sections/StatisticsSection'))
const ExpertTeamSection = lazy(() => import('@/components/sections/ExpertTeamSection'))
const NewsletterSection = lazy(() => import('@/components/sections/NewsletterSection'))
const CTASection = lazy(() => import('@/components/sections/CTASection'))

// Optimized loading component
const SectionLoader = () => (
   <div className="py-8 flex justify-center">
      <LoadingSpinner size="sm" />
   </div>
)

export default function Home() {
   return (
      <div className="min-h-screen bg-gray-50">
         {/* Load Hero immediately for optimal LCP (Largest Contentful Paint) */}
         <HeroSection />

         {/* Lazy load sections with staggered animations for better perceived performance */}
         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={100}>
               <FeaturesSection />
            </AnimatedSection>
         </Suspense>

         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={200}>
               <SpecialtiesSection />
            </AnimatedSection>
         </Suspense>

         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={150}>
               <StatisticsSection />
            </AnimatedSection>
         </Suspense>

         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={100}>
               <ExpertTeamSection />
            </AnimatedSection>
         </Suspense>

         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={200}>
               <NewsletterSection />
            </AnimatedSection>
         </Suspense>

         <Suspense fallback={<SectionLoader />}>
            <AnimatedSection delay={100}>
               <CTASection />
            </AnimatedSection>
         </Suspense>
      </div>
   )
}
