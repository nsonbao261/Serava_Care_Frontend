'use client'

import React, {useState} from 'react'
import {DoctorCard, SearchAndFilterBar} from '@/components'

export default ((props) => {
    const {doctors} = props
    const [searchQuery, setSearchQuery] = useState('')
    const [specialtyCategory, setSpecialtyCategory] = useState<SpecialtyCategory>('all')

    // Filter specialties based on search query and category
    const filteredDoctors = doctors.filter((doctor) => {
        const matchesCategory = specialtyCategory === 'all' || doctor.specialty === specialtyCategory
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-20 lg:pb-16">
            {/* Search and Filter Bar */}
            <SearchAndFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                specialtyCategory={specialtyCategory}
                setSpecialtyCategory={setSpecialtyCategory}
            />

            {/* Doctors */}
            {filteredDoctors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-red-600 font-semibold">Không có bác sĩ nào để hiển thị.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Vui lòng thử lại với từ khóa tìm kiếm khác hoặc bộ lọc chuyên khoa khác.
                    </p>
                </div>
            )}
        </div>
    )
}) satisfies React.FC<{ doctors: Doctor[] }>
