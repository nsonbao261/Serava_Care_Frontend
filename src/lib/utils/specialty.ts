/**
 * Group specialties by their category
 */
export function groupSpecialtiesByCategory(
   specialties: SpecialtyWithCategory[]
): Record<SpecialtyCategory, SpecialtyWithCategory[]> {
   return specialties.reduce(
      (groups, specialty) => {
         if (!groups[specialty.category]) {
            groups[specialty.category] = []
         }
         groups[specialty.category].push(specialty)
         return groups
      },
      {} as Record<SpecialtyCategory, SpecialtyWithCategory[]>
   )
}

/**
 * Get popular specialties sorted by order
 */
export function getPopularSpecialties(
   specialties: SpecialtyWithCategory[],
   limit: number = 6
): SpecialtyWithCategory[] {
   return specialties
      .filter((specialty) => specialty.isPopular)
      .sort((a, b) => (a.order || 999) - (b.order || 999))
      .slice(0, limit)
}
