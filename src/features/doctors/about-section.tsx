interface AboutSectionProps {
   about: string
}

export function AboutSection({ about }: AboutSectionProps) {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
         <p className="text-gray-700 leading-relaxed">{about}</p>
      </div>
   )
}
