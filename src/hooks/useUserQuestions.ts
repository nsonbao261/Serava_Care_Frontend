import { useState, useEffect, useMemo, useCallback } from 'react'
import {
   getUserQuestions,
   deleteQuestion,
   getQuestionById,
   rateQuestion,
   filterQuestions
} from '@/services'

interface UseUserQuestionsOptions {
   initialStatus?: Question['status']
   autoFetch?: boolean
}

interface UseUserQuestionsReturn {
   questions: Question[]
   filteredQuestions: Question[]
   isLoading: boolean
   error: string | null
   selectedStatus: Question['status'] | 'all'
   searchQuery: string
   setSelectedStatus: (status: Question['status'] | 'all') => void
   setSearchQuery: (query: string) => void
   refetch: () => Promise<void>
   deleteQuestion: (id: string) => Promise<void>
}

export function useUserQuestions(options: UseUserQuestionsOptions = {}): UseUserQuestionsReturn {
   const { initialStatus = 'answered', autoFetch = true } = options

   const [questions, setQuestions] = useState<Question[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [selectedStatus, setSelectedStatus] = useState<Question['status'] | 'all'>(initialStatus)
   const [searchQuery, setSearchQuery] = useState('')

   const fetchQuestions = useCallback(async () => {
      try {
         setIsLoading(true)
         setError(null)
         const data = await getUserQuestions()
         setQuestions(data)
      } catch (err) {
         setError('Không thể tải danh sách câu hỏi. Vui lòng thử lại.')
         console.error('Error fetching user questions:', err)
      } finally {
         setIsLoading(false)
      }
   }, [])

   const deleteQuestionHandler = useCallback(async (id: string) => {
      try {
         await deleteQuestion(id)
         setQuestions((prev) => prev.filter((q) => q.id !== id))
      } catch (err) {
         setError('Không thể xóa câu hỏi. Vui lòng thử lại.')
         console.error('Error deleting question:', err)
      }
   }, [])

   // Filter questions based on selected status and search query
   const filteredQuestions = useMemo(() => {
      return filterQuestions(questions, {
         status: selectedStatus === 'all' ? undefined : selectedStatus,
         searchQuery: searchQuery.trim()
      })
   }, [questions, selectedStatus, searchQuery])

   // Initial fetch
   useEffect(() => {
      if (autoFetch) {
         fetchQuestions()
      }
   }, [autoFetch, fetchQuestions])

   return {
      questions,
      filteredQuestions,
      isLoading,
      error,
      selectedStatus,
      searchQuery,
      setSelectedStatus,
      setSearchQuery,
      refetch: fetchQuestions,
      deleteQuestion: deleteQuestionHandler
   }
}

interface UseQuestionDetailOptions {
   questionId: string
   autoFetch?: boolean
}

interface UseQuestionDetailReturn {
   question: Question | null
   isLoading: boolean
   error: string | null
   refetch: () => Promise<void>
   rateQuestion: (rating: number) => Promise<void>
}

export function useQuestionDetail(options: UseQuestionDetailOptions): UseQuestionDetailReturn {
   const { questionId, autoFetch = true } = options

   const [question, setQuestion] = useState<Question | null>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchQuestion = useCallback(async () => {
      if (!questionId) return

      try {
         setIsLoading(true)
         setError(null)
         const data = await getQuestionById(questionId)
         setQuestion(data)

         if (!data) {
            setError('Không tìm thấy câu hỏi.')
         }
      } catch (err) {
         setError('Không thể tải thông tin câu hỏi. Vui lòng thử lại.')
         console.error('Error fetching question detail:', err)
      } finally {
         setIsLoading(false)
      }
   }, [questionId])

   const rateQuestionHandler = useCallback(
      async (rating: number) => {
         if (!question) return

         try {
            await rateQuestion(question.id, rating)
            setQuestion((prev) => (prev ? { ...prev, rating, hasRated: true } : null))
         } catch (err) {
            setError('Không thể đánh giá câu trả lời. Vui lòng thử lại.')
            console.error('Error rating question:', err)
         }
      },
      [question]
   )

   useEffect(() => {
      if (autoFetch && questionId) {
         fetchQuestion()
      }
   }, [questionId, autoFetch, fetchQuestion])

   return {
      question,
      isLoading,
      error,
      refetch: fetchQuestion,
      rateQuestion: rateQuestionHandler
   }
}
