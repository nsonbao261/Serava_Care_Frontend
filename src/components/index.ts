// Animations
export { TypewriterText } from './animations/typewriter-text'
export { ParticleBackground } from './animations/particle-background'
export { AnimatedSection } from './animations/animated-section'
export { default as AnimatedPageTitle } from './animations/animated-page-title'

// Auth
export { default as LoginForm } from './auth/LoginForm'
export { default as SignupForm } from './auth/SignupForm'

// Booking
export { StatusBadge, BookingCard } from './booking/booking-card'
export { BookingModal } from './booking/booking-modal'

// Cards
export { SpecialtyCard, type ViewMode } from './cards/specialty-card'
export { DoctorCard } from './cards/doctor-card'
export { GlowCard } from './cards/glow-card'

// Common
export { FloatingActionButton } from './common/floating-action-button'
export { BackToTop } from './common/back-to-top'
export { ErrorBoundaryFallback } from './common/empty-boundary-fallback'
export { LoadingSpinner } from './common/loading-spinner'
export { EmptyState } from './common/empty-state'

// Forms
export { MorphingButton } from './forms/morphing-button'
export { Label } from './forms/label'
export { Input } from './forms/input'
export { Checkbox } from './forms/checkbox'
export { Button, buttonVariants } from './forms/button'
export {
   useFormField,
   Form,
   FormItem,
   FormLabel,
   FormControl,
   FormDescription,
   FormMessage,
   FormField
} from './forms/form'

// Layout
export { default as Header } from './layout/header'
export { default as Footer } from './layout/footer'

// Motion
export { default as BackgroundMotion } from './motion/background-motion'

// Sections
export { default as StatisticsSection } from './sections/StatisticsSection'
export { default as SpecialtiesSection } from './sections/SpecialtiesSection'
export { default as NewsletterSection } from './sections/NewsletterSection'
export { default as HeroSection } from './sections/HeroSection'
export { default as FeaturesSection } from './sections/FeaturesSection'
export { default as ExpertTeamSection } from './sections/ExpertTeamSection'
export { default as CTASection } from './sections/CTASection'

// Health
export { StatCard, type StatCardProps } from './health/stat-card'
export {
   StatCardSkeleton,
   HealthSectionSkeleton,
   RecentRecordsSkeleton,
   HealthProfileSkeleton,
   type StatCardSkeletonProps
} from './health/health-skeleton'

// Providers
export { Providers } from './providers'

// Question
export { QuestionHeader } from './question/question-header'
export { QuestionContent } from './question/question-content'
export { QuestionAnswer } from './question/question-answer'
export { QuestionStatus } from './question/question-status'
export { RatingModal } from './question/rating-modal'
export { QuestionCard, statusConfig } from './question/question-card'
