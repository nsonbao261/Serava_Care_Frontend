import { QuestionFormData } from '@/schemas'
import { mockQuestions } from '@/data'

export async function submitQuestion(data: QuestionFormData): Promise<Question> {
   // Simulate API call with delay
   await new Promise((resolve) => setTimeout(resolve, 2000))

   // Create new question
   const newQuestion = {
      id: Math.random().toString(36).substring(2, 11),
      ...data,
      authorId: 'current-user-id',
      authorName: 'Người dùng hiện tại',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending' as const,
      attachments: [],
      views: 0
   }

   mockQuestions.push(newQuestion)

   return newQuestion
}

export async function getQuestionById(id: string): Promise<Question | null> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500))

   return mockQuestions.find((question) => question.id === id) || null
}
