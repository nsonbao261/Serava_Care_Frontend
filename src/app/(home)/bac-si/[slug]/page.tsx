import { use } from 'react'
import { notFound } from 'next/navigation'
import {
   BookingSection,
   Breadcrumb,
   DoctorHeader,
   AboutSection,
   EducationSection,
   AchievementsSection,
   ArticlesSection,
   LanguagesSection,
   ReviewsSection
} from '@/features/doctors'
import { mockDoctorDetails } from '@/data'

interface PageProps {
   params: Promise<{ slug: string }>
}

export default function DoctorDetailPage({ params }: PageProps) {
   const { slug } = use(params)
   const doctor = mockDoctorDetails[slug]

   if (!doctor) {
      notFound()
   }

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Breadcrumb */}
         <Breadcrumb doctorName={doctor.name} />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Content */}
               <div className="lg:col-span-2 space-y-8">
                  {/* Doctor Header */}
                  <DoctorHeader doctor={doctor} />

                  {/* About Section */}
                  <AboutSection about={doctor.about} />

                  {/* Education Section */}
                  <EducationSection education={doctor.education} />

                  {/* Achievements Section */}
                  <AchievementsSection achievements={doctor.achievements} />

                  {/* Articles Section */}
                  <ArticlesSection articles={doctor.articles} doctorName={doctor.name} />
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Booking Section - Client Component */}
                  <BookingSection doctor={doctor} />

                  {/* Languages */}
                  <LanguagesSection languages={doctor.languages} />

                  {/* Reviews Preview */}
                  <ReviewsSection rating={doctor.rating} reviewCount={doctor.reviewCount || 0} />
               </div>
            </div>
         </div>
      </div>
   )
}
