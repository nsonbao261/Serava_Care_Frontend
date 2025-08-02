interface Article {
   id: string
   title: string
   publishDate: string
   readTime: string
}

interface ArticlesSectionProps {
   articles?: Article[]
   doctorName: string
}

export function ArticlesSection({ articles, doctorName }: ArticlesSectionProps) {
   if (!articles || articles.length === 0) {
      return null
   }

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết của {doctorName}</h2>
         <div className="space-y-4">
            {articles.map((article: Article) => (
               <div key={article.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                     {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                     <span>{doctorName}</span>
                     <span>•</span>
                     <span>{article.publishDate}</span>
                     <span>•</span>
                     <span>{article.readTime}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
