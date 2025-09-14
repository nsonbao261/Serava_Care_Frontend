'use client'

import React, {useState} from "react";

export default (async (props) => {
    const {id} = await props.id;
    const [appointment, setAppointment] = useState<{
        id: string
        patient: {
            name: string
            email?: string
            phone: string
            address?: string
        }
        booking: {
            code: string
            status: string
            date: string
        }
        appointment: {
            date: string
            time: string
        }
        medicalRecord: {
            reason?: string
            notes?: string
            symptoms?: string[]
            medicalHistory?: string
            prescription?: string
            diagnosis?: string
            followUpDate?: string
        }
    } | null>(null);

    return <div/>
}) satisfies React.FC<{ id: Promise<{ id: string }> }>
