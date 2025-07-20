import React from 'react'

export interface StatCardSkeletonProps {
   index?: number
}

export const StatCardSkeleton = React.memo(({ index = 0 }: StatCardSkeletonProps) => (
   <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div
               className="p-2 bg-gray-100 rounded-lg animate-pulse"
               style={{ animationDelay: `${index * 0.1}s` }}
            >
               <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
               <div
                  className="h-4 bg-gray-200 rounded w-20 animate-pulse"
                  style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
               ></div>
               <div
                  className="h-6 bg-gray-200 rounded w-16 animate-pulse"
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
               ></div>
            </div>
         </div>
         <div
            className="h-6 w-8 bg-gray-200 rounded-full animate-pulse"
            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
         ></div>
      </div>
   </div>
))

StatCardSkeleton.displayName = 'StatCardSkeleton'

export const HealthSectionSkeleton = React.memo(() => (
   <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
         <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div
               className="h-5 bg-gray-200 rounded w-32 animate-pulse"
               style={{ animationDelay: '0.1s' }}
            ></div>
         </div>
      </div>
      <div className="p-6 space-y-4">
         {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
               <div
                  className="h-4 bg-gray-200 rounded w-32 animate-pulse"
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
               ></div>
               <div
                  className="h-4 bg-gray-200 rounded w-16 animate-pulse"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
               ></div>
            </div>
         ))}
      </div>
   </div>
))

HealthSectionSkeleton.displayName = 'HealthSectionSkeleton'

export const RecentRecordsSkeleton = React.memo(() => (
   <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
         <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div
               className="h-5 bg-gray-200 rounded w-32 animate-pulse"
               style={{ animationDelay: '0.1s' }}
            ></div>
         </div>
      </div>
      <div className="p-6 space-y-4">
         {[...Array(3)].map((_, index) => (
            <div
               key={index}
               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
               <div className="space-y-2">
                  <div
                     className="h-4 bg-gray-200 rounded w-40 animate-pulse"
                     style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                  ></div>
                  <div
                     className="h-3 bg-gray-200 rounded w-24 animate-pulse"
                     style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
                  ></div>
               </div>
               <div
                  className="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  style={{ animationDelay: `${index * 0.15 + 0.4}s` }}
               ></div>
            </div>
         ))}
      </div>
   </div>
))

RecentRecordsSkeleton.displayName = 'RecentRecordsSkeleton'

export const HealthProfileSkeleton = React.memo(() => (
   <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2">
               <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
               <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
               <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Header Skeleton */}
         <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
               <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
               <div
                  className="h-4 bg-gray-200 rounded w-64 animate-pulse"
                  style={{ animationDelay: '0.1s' }}
               ></div>
            </div>
            <div className="flex space-x-3">
               <div
                  className="h-10 bg-gray-200 rounded w-24 animate-pulse"
                  style={{ animationDelay: '0.2s' }}
               ></div>
               <div
                  className="h-10 bg-gray-200 rounded w-28 animate-pulse"
                  style={{ animationDelay: '0.3s' }}
               ></div>
            </div>
         </div>

         {/* Health Stats Skeleton */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, index) => (
               <StatCardSkeleton key={index} index={index} />
            ))}
         </div>

         {/* Health Information Skeleton */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HealthSectionSkeleton />
            <RecentRecordsSkeleton />
         </div>
      </div>
   </div>
))

HealthProfileSkeleton.displayName = 'HealthProfileSkeleton'
