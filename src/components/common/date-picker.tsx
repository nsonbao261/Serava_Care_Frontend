'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components'
import { DATE_FORMAT } from '@/constants'
import { cn } from '@/lib'

type Props = {
   className?: string
   disabled?: boolean
   onChange?: (date: Date | undefined) => void
   value?: Date | string
}

export function DatePicker({ value, onChange, disabled, className }: Props) {
   const date = typeof value === 'string' ? new Date(value) : value

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               type="button"
               variant="outline"
               disabled={disabled}
               data-empty={!value}
               className={cn(
                  'w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
                  className
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date ? format(new Date(date), DATE_FORMAT) : <span>Chọn ngày</span>}
            </Button>
         </PopoverTrigger>

         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={date}
               captionLayout="dropdown"
               onSelect={(date) => {
                  if (onChange) onChange(date)
               }}
               disabled={disabled}
               autoFocus
            />
         </PopoverContent>
      </Popover>
   )
}
