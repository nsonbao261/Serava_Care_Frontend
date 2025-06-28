'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SpecialtiesSection from '@/components/sections/SpecialtiesSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import ExpertTeamSection from '@/components/sections/ExpertTeamSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import CTASection from '@/components/sections/CTASection';
import { AnimatedSection } from '@/components/ui/animated-section';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { BackToTop } from '@/components/ui/back-to-top';

export default function Home() {
   return (
      <div className="min-h-screen bg-gray-50 page-entrance">
         <AnimatedSection animation="magnetic">
            <HeroSection />
         </AnimatedSection>

         <AnimatedSection animation="bounce-up" delay={200}>
            <FeaturesSection />
         </AnimatedSection>

         <AnimatedSection animation="elastic-up" delay={100}>
            <SpecialtiesSection />
         </AnimatedSection>

         <AnimatedSection animation="slide-left" delay={150}>
            <StatisticsSection />
         </AnimatedSection>

         <AnimatedSection animation="magnetic" delay={100}>
            <ExpertTeamSection />
         </AnimatedSection>

         <AnimatedSection animation="bounce-in" delay={200}>
            <NewsletterSection />
         </AnimatedSection>

         <AnimatedSection animation="zoom-in" delay={100}>
            <CTASection />
         </AnimatedSection>

         <FloatingActionButton />
         <BackToTop threshold={300} />
      </div>
   );
}
