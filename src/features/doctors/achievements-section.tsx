import { Award } from 'lucide-react'

interface AchievementsSectionProps {
   achievements: string[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Thành tích & Chứng chỉ</h2>
         <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement: string, index: number) => (
               <div key={index} className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{achievement}</p>
               </div>
            ))}
         </div>
      </div>
   )
}
