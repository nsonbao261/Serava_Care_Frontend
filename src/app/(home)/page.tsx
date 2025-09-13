import { lazy, Suspense } from 'react'
import { AnimatedSection, Hero as HeroSection, LoadingSpinner } from '@/components'

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

// Lazy load heavy sections for better initial page load
const FeaturesSection = lazy(() =>
   import('@/components/sections/features').then((module) => ({ default: module.Features }))
)
const SpecialtiesSection = lazy(() =>
   import('@/components/sections/specialties').then((module) => ({ default: module.Specialties }))
)
const StatisticsSection = lazy(() =>
   import('@/components/sections/statistics').then((module) => ({ default: module.Statistics }))
)
const ExpertTeamSection = lazy(() =>
   import('@/components/sections/expert-team').then((module) => ({ default: module.ExpertTeam }))
)
const NewsletterSection = lazy(() =>
   import('@/components/sections/newsletter').then((module) => ({ default: module.Newsletter }))
)
const CTASection = lazy(() =>
   import('@/components/sections/cta').then((module) => ({ default: module.CTA }))
)

// Optimized loading component
const SectionLoader = () => (
   <div className="py-8 flex justify-center">
      <LoadingSpinner size="sm" />
   </div>
)
