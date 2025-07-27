'use client'

import { useState, useCallback } from 'react'

interface UseFormOptions<T> {
   initialValues: T
   validate?: (values: T) => ValidationError[]
   onSubmit?: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, unknown>>(options: UseFormOptions<T>) {
   const { initialValues, validate, onSubmit } = options

   const [values, setValues] = useState<T>(initialValues)
   const [formState, setFormState] = useState<FormState>({
      isSubmitting: false,
      errors: [],
      touched: {}
   })

   const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
      setFormState((prev) => ({
         ...prev,
         touched: { ...prev.touched, [field]: true }
      }))
   }, [])

   const setFieldTouched = useCallback((field: keyof T, touched: boolean = true) => {
      setFormState((prev) => ({
         ...prev,
         touched: { ...prev.touched, [field]: touched }
      }))
   }, [])

   const validateForm = useCallback(() => {
      if (!validate) return []
      const errors = validate(values)
      setFormState((prev) => ({ ...prev, errors }))
      return errors
   }, [validate, values])

   const handleSubmit = useCallback(
      async (e?: React.FormEvent) => {
         if (e) {
            e.preventDefault()
         }

         // Mark all fields as touched
         const allTouched = Object.keys(values).reduce(
            (acc, key) => {
               acc[key] = true
               return acc
            },
            {} as Record<string, boolean>
         )

         setFormState((prev) => ({
            ...prev,
            touched: allTouched,
            isSubmitting: true
         }))

         // Validate
         const errors = validateForm()
         if (errors.length > 0) {
            setFormState((prev) => ({ ...prev, isSubmitting: false }))
            return
         }

         try {
            if (onSubmit) {
               await onSubmit(values)
            }
            setFormState((prev) => ({ ...prev, isSubmitting: false }))
         } catch (error) {
            setFormState((prev) => ({
               ...prev,
               isSubmitting: false,
               errors: [
                  {
                     field: 'form',
                     message: error instanceof Error ? error.message : 'An error occurred'
                  }
               ]
            }))
         }
      },
      [values, validateForm, onSubmit]
   )

   const reset = useCallback(() => {
      setValues(initialValues)
      setFormState({
         isSubmitting: false,
         errors: [],
         touched: {}
      })
   }, [initialValues])

   const getFieldError = useCallback(
      (field: keyof T) => {
         return formState.errors.find((error) => error.field === field)?.message
      },
      [formState.errors]
   )

   const isFieldTouched = useCallback(
      (field: keyof T) => {
         return !!formState.touched[field as string]
      },
      [formState.touched]
   )

   const hasFieldError = useCallback(
      (field: keyof T) => {
         return !!getFieldError(field) && isFieldTouched(field)
      },
      [getFieldError, isFieldTouched]
   )

   return {
      // Values
      values,

      // Form state
      isSubmitting: formState.isSubmitting,
      errors: formState.errors,
      touched: formState.touched,

      // Actions
      setValue,
      setFieldTouched,
      validateForm,
      handleSubmit,
      reset,

      // Helpers
      getFieldError,
      isFieldTouched,
      hasFieldError,

      // Computed
      isValid: formState.errors.length === 0,
      isDirty: Object.keys(formState.touched).length > 0
   }
}
