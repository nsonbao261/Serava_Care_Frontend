interface DoctorsPageHeaderProps {
   title: string
   description: string
}

export function DoctorsPageHeader({ title, description }: DoctorsPageHeaderProps) {
   return (
      <div className="bg-white shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
            </div>
         </div>
      </div>
   )
}
