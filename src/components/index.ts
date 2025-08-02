// Shadcn/UI
export * from './ui/button'
export * from './ui/calendar'
export * from './ui/checkbox'
export * from './ui/form'
export * from './ui/input'
export * from './ui/label'
export * from './ui/popover'
export * from './ui/select'
export * from './ui/sonner'

// Animations
export { default as AnimatedPageTitle } from './animations/animated-page-title'
export { AnimatedSection } from './animations/animated-section'
export { ParticleBackground } from './animations/particle-background'
export { TypewriterText } from './animations/typewriter-text'

// Booking
export { BookingCard, StatusBadge } from './booking/booking-card'
export { BookingModal } from './booking/booking-modal'

// Cards
export { DoctorCard } from './cards/doctor-card'
export { GlowCard } from './cards/glow-card'
export { SpecialtyCard, type ViewMode } from './cards/specialty-card'

// Common
export { BackToTop } from './common/back-to-top'
export { DatePicker } from './common/date-picker'
export { ErrorBoundaryFallback } from './common/empty-boundary-fallback'
export { EmptyState } from './common/empty-state'
export { FloatingActionButton } from './common/floating-action-button'
export { LoadingSpinner } from './common/loading-spinner'

// Forms
export { MorphingButton } from './forms/morphing-button'

// Layout
export { default as Footer } from './layout/footer'
export { default as Header } from './layout/header'

// Motion
export { default as BackgroundMotion } from './motion/background-motion'

// Sections
export { default as CTASection } from './sections/CTASection'
export { default as ExpertTeamSection } from './sections/ExpertTeamSection'
export { default as FeaturesSection } from './sections/FeaturesSection'
export { default as HeroSection } from './sections/HeroSection'
export { default as NewsletterSection } from './sections/NewsletterSection'
export { default as SpecialtiesSection } from './sections/SpecialtiesSection'
export { default as StatisticsSection } from './sections/StatisticsSection'

// Health
export {
   HealthProfileSkeleton,
   HealthSectionSkeleton,
   RecentRecordsSkeleton,
   StatCardSkeleton,
   type StatCardSkeletonProps
} from './health/health-skeleton'
export { StatCard, type StatCardProps } from './health/stat-card'

// Providers
export { Providers } from './providers'

// Question
export { QuestionAnswer } from './question/question-answer'
export { QuestionCard, statusConfig } from './question/question-card'
export { QuestionContent } from './question/question-content'
export { QuestionHeader } from './question/question-header'
export { QuestionStatus } from './question/question-status'
export { RatingModal } from './question/rating-modal'
