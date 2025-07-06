import type { NextConfig } from 'next'
import { URL } from 'url'

const { NEXT_API_URL, STORAGE_HOST, STORAGE_BUCKET, PUBLIC_BUCKET, PRIVATE_BUCKET } = process.env

const requiredEnv = {
   NEXT_API_URL,
   STORAGE_HOST,
   STORAGE_BUCKET,
   PUBLIC_BUCKET,
   PRIVATE_BUCKET
}

for (const [key, value] of Object.entries(requiredEnv)) {
   if (!value) {
      throw new Error(`Thiếu giá trị biến môi trường: ${key}`)
   }
}

const nextConfig: NextConfig = {
   async rewrites() {
      return [
         {
            source: '/api/:path*',
            destination: `${NEXT_API_URL}/:path*`
         },
         {
            source: '/images/public/:bucket/:path*',
            destination: `${STORAGE_HOST}/${STORAGE_BUCKET}/${PUBLIC_BUCKET}/:bucket/:path*`
         },
         {
            source: '/images/private/:bucket/:path*',
            destination: `${STORAGE_HOST}/${STORAGE_BUCKET}/${PRIVATE_BUCKET}/:bucket/:path*`
         }
      ]
   },

   // Next optimizations
   compress: true,
   poweredByHeader: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: new URL(requiredEnv.STORAGE_HOST!).hostname,
            pathname: `/${STORAGE_BUCKET}/**`
         }
      ]
   }

   // // Performance optimizations
   // experimental: {
   //    optimizePackageImports: ['framer-motion', 'lucide-react']
   // },

   // // Enable bundle analyzer in development
   // ...(process.env.ANALYZE === 'true' && {
   //    bundleAnalyzer: {
   //       enabled: true
   //    }
   // }),
   // Webpack optimizations (only for production builds)
   // Note: Turbopack handles development bundling automatically
   // webpack: (config, { dev, isServer }) => {
   //    // Only apply webpack optimizations in production builds
   //    // Turbopack handles development bundling automatically
   //    if (!dev && !isServer) {
   //       config.optimization.splitChunks = {
   //          chunks: 'all',
   //          cacheGroups: {
   //             vendor: {
   //                test: /[\\/]node_modules[\\/]/,
   //                name: 'vendors',
   //                chunks: 'all'
   //             },
   //             framerMotion: {
   //                test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
   //                name: 'framer-motion',
   //                chunks: 'all',
   //                priority: 10
   //             }
   //          }
   //       }
   //    }
   //    return config
   // }
}

export default nextConfig
