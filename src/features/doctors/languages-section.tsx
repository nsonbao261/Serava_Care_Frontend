interface LanguagesSectionProps {
   languages?: string[]
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
   if (!languages || languages.length === 0) {
      return null
   }

   const languageMap: Record<string, string> = {
      vi: 'Tiếng Việt',
      en: 'Tiếng Anh',
      ja: 'Tiếng Nhật',
      ko: 'Tiếng Hàn',
      zh: 'Tiếng Trung',
      fr: 'Tiếng Pháp'
   }

   const getLanguageName = (code: string) => {
      return languageMap[code] || code
   }

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="text-lg font-bold text-gray-900 mb-4">Ngôn ngữ</h3>
         <div className="flex flex-wrap gap-2">
            {languages.map((language: string, index: number) => (
               <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
               >
                  {getLanguageName(language)}
               </span>
            ))}
         </div>
      </div>
   )
}
