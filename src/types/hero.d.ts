export interface HeroBanner {
  id: number
  image: string
  title: string
  subtitle: string
  link?: string  // Optional: link khi click banner
  priority?: boolean  // Optional: for image loading priority
}