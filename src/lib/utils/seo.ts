/**
 * Generate SEO-friendly meta title
 */
export function generateMetaTitle(title: string, siteName: string = 'Serava Care'): string {
   return `${title} | ${siteName}`
}

/**
 * Generate meta description with proper length
 */
export function generateMetaDescription(description: string, maxLength: number = 160): string {
   if (description.length <= maxLength) return description

   const truncated = description.slice(0, maxLength)
   const lastSpace = truncated.lastIndexOf(' ')

   return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...'
}

/**
 * Generate structured data for doctors
 */
export function generateDoctorStructuredData(doctor: {
   name: string
   specialty: string
   hospital: string
   rating: number
   reviewCount: number
}) {
   return {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: doctor.name,
      medicalSpecialty: doctor.specialty,
      worksFor: {
         '@type': 'Hospital',
         name: doctor.hospital
      },
      aggregateRating: {
         '@type': 'AggregateRating',
         ratingValue: doctor.rating,
         reviewCount: doctor.reviewCount
      }
   }
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
   path: string,
   baseUrl: string = 'https://seravacare.com'
): string {
   return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
   breadcrumbs: Array<{ name: string; url: string }>
) {
   return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
         '@type': 'ListItem',
         position: index + 1,
         name: crumb.name,
         item: crumb.url
      }))
   }
}
