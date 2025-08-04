import { useState, useCallback } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionFormSchema, QuestionFormData } from '@/schemas'
import { submitQuestion } from '@/services'

export interface UseQuestionFormReturn {
   // Form control
   form: UseFormReturn<QuestionFormData>

   // State
   isSubmitting: boolean
   submitError: string | null
   submitSuccess: boolean
   submittedQuestion: Question | null

   // Actions
   submitQuestion: (data: QuestionFormData) => Promise<void>
   resetForm: () => void
   clearErrors: () => void
}

export const useQuestionForm = (): UseQuestionFormReturn => {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [submitError, setSubmitError] = useState<string | null>(null)
   const [submitSuccess, setSubmitSuccess] = useState(false)
   const [submittedQuestion, setSubmittedQuestion] = useState<Question | null>(null)

   const form = useForm<QuestionFormData>({
      resolver: zodResolver(questionFormSchema),
      defaultValues: {
         title: '',
         content: '',
         specialty: '',
         isPublic: true,
         attachments: []
      }
   })

   const submitQuestionHandler = useCallback(
      async (data: QuestionFormData) => {
         try {
            setIsSubmitting(true)
            setSubmitError(null)

            const result = await submitQuestion(data)

            setSubmittedQuestion(result)
            setSubmitSuccess(true)
            form.reset()
         } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi câu hỏi')
         } finally {
            setIsSubmitting(false)
         }
      },
      [form]
   )

   const resetForm = useCallback(() => {
      form.reset()
      setSubmitError(null)
      setSubmitSuccess(false)
      setSubmittedQuestion(null)
   }, [form])

   const clearErrors = useCallback(() => {
      setSubmitError(null)
      form.clearErrors()
   }, [form])

   return {
      form,
      isSubmitting,
      submitError,
      submitSuccess,
      submittedQuestion,
      submitQuestion: submitQuestionHandler,
      resetForm,
      clearErrors
   }
}
