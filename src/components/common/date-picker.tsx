'use client'

import {format} from 'date-fns'
import {Calendar as CalendarIcon} from 'lucide-react'
import {Button, Calendar, Popover, PopoverContent, PopoverTrigger} from '@/components'
import {cn} from '@/lib'
import React from "react"

export default ((props) => {
    const {value, onChangeAction, disabled, className} = props
    const date = typeof value === 'string' ? new Date(value) : value

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    data-empty={!value}
                    className={cn('w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground', className)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(new Date(date), 'dd-MM-yyyy') : <span>Chọn ngày</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        if (onChangeAction) onChangeAction(date)
                    }}
                    disabled={disabled}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}) satisfies React.FC<{
    value: Date | string
    onChangeAction?: (date: Date | undefined) => void
    disabled?: boolean
    className?: string
}>
