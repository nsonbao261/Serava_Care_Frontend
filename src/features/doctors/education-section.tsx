interface EducationSectionProps {
   education: string[]
}

export function EducationSection({ education }: EducationSectionProps) {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Học vấn</h2>
         <div className="space-y-3">
            {education.map((item: string, index: number) => (
               <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{item}</p>
               </div>
            ))}
         </div>
      </div>
   )
}
