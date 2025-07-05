import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   // Performance optimizations
   experimental: {
      optimizePackageImports: ['framer-motion', 'lucide-react']
   },

   // Enable bundle analyzer in development
   ...(process.env.ANALYZE === 'true' && {
      bundleAnalyzer: {
         enabled: true
      }
   }),

   // Image optimization
   images: {
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 31536000 // 1 year
   },

   // Compress responses
   compress: true,

   // Power optimizations
   poweredByHeader: false,

   // Webpack optimizations (only for production builds)
   // Note: Turbopack handles development bundling automatically
   webpack: (config, { dev, isServer }) => {
      // Only apply webpack optimizations in production builds
      // Turbopack handles development bundling automatically
      if (!dev && !isServer) {
         config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
               vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
               },
               framerMotion: {
                  test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                  name: 'framer-motion',
                  chunks: 'all',
                  priority: 10
               }
            }
         }
      }
      return config
   }
}

export default nextConfig
