import React from 'react'

export default ((props) => {
    const {searchQuery, setSearchQuery, specialtyCategory, setSpecialtyCategory} = props
    const CATEGORY_LABELS = {
        all: 'Tất cả',
        'noi-khoa': 'Nội khoa',
        'ngoai-khoa': 'Ngoại khoa',
        'can-lam-sang': 'Cận lâm sàng',
        'phuc-hoi': 'Phục hồi',
        'chuyen-khoa': 'Chuyên khoa'
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Category Filter */}
            <select
                value={specialtyCategory}
                onChange={(e) => setSpecialtyCategory(e.target.value as SpecialtyCategory)}
                className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
}) satisfies React.FC<{
    searchQuery: string
    setSearchQuery: (query: string) => void
    specialtyCategory: SpecialtyCategory
    setSpecialtyCategory: (category: SpecialtyCategory) => void
}>
