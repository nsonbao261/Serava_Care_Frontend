interface Question {
   id: string
   createdAt: Date
   updatedAt: Date
   title: string
   content: string
   specialty: string
   isPublic: boolean
   authorId?: string
   authorName?: string
   status: 'pending' | 'answered' | 'rejected'
   answeredAt?: Date
   doctorName?: string
   doctorSpecialty?: string
   doctorImage?: string
   answer?: string
   views: number
   rating?: number
   hasRated?: boolean
   attachments?: QuestionAttachment[]
}

interface QuestionAttachment {
   id: string
   name: string
   filename?: string
   url: string
   size?: number
   type: string
}

interface QuestionSpecialty {
   id: string
   name: string
   value: string
   label: string
   description?: string
   icon: string
}
