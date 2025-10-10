import { IMAGE_PLACEHOLDER_CONTENT } from '@/constants'
import Image, { ImageProps } from 'next/image'

interface AppImageProps extends Partial<ImageProps> {
   src?: string
   alt: string
}

export default function AppImage({ src, alt, className, sizes, ...rest }: AppImageProps) {
   const url = src?.startsWith('http') ? src : `/images/public/${src}`

   const defaultSizes =
      sizes || '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px'

   return (
      <Image
         src={src ? url : IMAGE_PLACEHOLDER_CONTENT}
         alt={alt ?? 'Ảnh'}
         sizes={defaultSizes}
         className={className}
         {...rest}
      />
   )
}
