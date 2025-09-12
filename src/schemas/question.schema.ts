import { z } from 'zod'

// Schema exports
export const questionFormSchema = z.object({
   title: z
      .string()
      .min(10, 'Tiêu đề phải có ít nhất 10 ký tự')
      .max(200, 'Tiêu đề không được quá 200 ký tự'),
   content: z
      .string()
      .min(50, 'Nội dung câu hỏi phải có ít nhất 50 ký tự')
      .max(2000, 'Nội dung câu hỏi không được quá 2000 ký tự'),
   specialty: z.string().min(1, 'Vui lòng chọn chuyên khoa'),
   isPublic: z.boolean(),
   attachments: z.array(z.instanceof(File))
})

// Type exports
export type QuestionFormData = z.infer<typeof questionFormSchema>
