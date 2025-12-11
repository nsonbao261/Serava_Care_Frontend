'use client'

import {MorphingButton, ParticleBackground, TypewriterText} from '@/components'
import {Calendar, Play, Search, Building, Users, Heart} from 'lucide-react'
import Link from 'next/link'
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'

export default (() => {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    // Smart routing
    const SPECIALTY_KEYWORDS = [// General terms
        'chuyên khoa', 'khoa', 'chuyên môn', 'lĩnh vực',

        // Medical terms
        'tim mạch', 'tim', 'mạch máu', 'cao huyết áp', 'mạch vành', 'nhi khoa', 'nhi', 'trẻ em', 'pediatric', 'sản phụ khoa', 'sản khoa', 'phụ khoa', 'thai sản', 'sinh nở', 'ngoại khoa', 'ngoại', 'phẫu thuật', 'surgery', 'nội khoa', 'nội', 'internal medicine', 'tiêu hóa', 'gan mật', 'dạ dày', 'đại tràng', 'gan', 'mật', 'thần kinh', 'não', 'đột quỵ', 'động kinh', 'neurolog', 'hô hấp', 'phổi', 'hen suyễn', 'respiratory', 'tiết niệu', 'thận', 'bàng quang', 'urology', 'cơ xương khớp', 'xương khớp', 'cột sống', 'orthopedic', 'mắt', 'nhãn khoa', 'thị lực', 'ophthalmology', 'tai mũi họng', 'tai', 'mũi', 'họng', 'ent', 'da liễu', 'da', 'dermatology', 'thẩm mỹ da', 'răng hàm mặt', 'răng', 'nha khoa', 'dental', 'ung bướu', 'ung thư', 'oncology', 'nội tiết', 'đái tháo đường', 'tuyến giáp', 'endocrinology', 'phục hồi chức năng', 'vật lý trị liệu', 'rehabilitation', 'dược học', 'thuốc', 'pharmacy', 'dinh dưỡng', 'nutrition', 'bác sĩ gia đình', 'family medicine']

    const handleSearch = () => {
        const searchText = searchTerm.trim().toLowerCase()

        if (!searchText) {
            router.push('/bac-si')
            return
        }

        // Check if search term contains specialty keywords
        const isSpecialtySearch = SPECIALTY_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))

        // Check if search contains doctor-specific terms
        const DOCTOR_KEYWORDS = ['bác sĩ', 'bs', 'thầy thuốc', 'tiến sĩ', 'ts', 'phó giáo sư', 'pgs', 'giáo sư', 'gs']
        const isDoctorSearch = DOCTOR_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))

        // Smart routing based on search content
        if (isSpecialtySearch && !isDoctorSearch) {
            // Pure specialty search
            router.push(`/chuyen-khoa?search=${encodeURIComponent(searchTerm.trim())}`)
        } else if (isDoctorSearch && !isSpecialtySearch) {
            // Pure doctor search
            router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`)
        } else if (isSpecialtySearch && isDoctorSearch) {
            // Mixed search - prioritize doctors page as it's more specific
            router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`)
        } else {
            // General search - default to doctors page
            router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (<section
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 overflow-hidden">
        <ParticleBackground particleCount={30} particleColor="#ffffff"/>

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Split Layout: Left Content - Right Banner */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Content */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                        <span className="animate-in slide-in-from-left-4 duration-700">Đặt lịch khám bệnh</span>
                        <span className="block text-blue-100 mt-2">
                         <TypewriterText
                             texts={['Nhanh chóng & Tin cậy', 'Chuyên nghiệp & Uy tín']}
                             speed={120}
                             pauseDuration={2500}
                         />
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 drop-shadow">
                        Kết nối 1.000+ bác sĩ uy tín trên toàn quốc
                    </p>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div
                            className="flex items-center bg-white rounded-2xl shadow-2xl px-4 sm:px-6 py-4 border-2 border-white/20 min-h-[56px] transition-all duration-300">
                            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-3 flex-shrink-0"/>
                            <input
                                type="text"
                                placeholder="Tìm bác sĩ, chuyên khoa, bệnh viện..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-1 outline-none text-gray-700 min-w-0 text-base sm:text-lg placeholder:text-gray-400 focus:placeholder-transparent transition-all"
                            />
                            <button
                                onClick={handleSearch}
                                className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 rounded-xl text-sm sm:text-base whitespace-nowrap font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>

                    {/* Trust Metrics */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-xl text-gray-900">1.000+</div>
                                <div className="text-gray-600 text-xs">Bác sĩ</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Building className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-xl text-gray-900">125+</div>
                                <div className="text-gray-600 text-xs">Bệnh viện</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <Heart className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-xl text-gray-900">1M+</div>
                                <div className="text-gray-600 text-xs">Lượt khám</div>
                            </div>
                        </div>
                    </div>


                    {/* Quick Search Pills */}
                    <div className="mb-8">
                        <p className="text-sm text-white/90 mb-3">
                            Tìm kiếm phổ biến:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {['Tim mạch', 'Nhi khoa', 'Sản phụ khoa', 'Da liễu'].map((suggestion, index) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setSearchTerm(suggestion)
                                        const searchText = suggestion.toLowerCase()
                                        const isSpecialtySearch = SPECIALTY_KEYWORDS.some((keyword) => searchText.includes(keyword.toLowerCase()))
                                        const doctorKeywords = ['bác sĩ', 'bs', 'thầy thuốc', 'tiến sĩ', 'ts', 'phó giáo sư', 'pgs', 'giáo sư', 'gs']
                                        const isDoctorSearch = doctorKeywords.some((keyword) => searchText.includes(keyword.toLowerCase()))

                                        if (isSpecialtySearch && !isDoctorSearch) router.push(`/chuyen-khoa?search=${encodeURIComponent(suggestion)}`)
                                        else router.push(`/bac-si?search=${encodeURIComponent(suggestion)}`)
                                    }}
                                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full text-sm font-medium transition-all duration-200"
                                >
                                    {suggestion}
                                </button>))}
                        </div>
                    </div>

                    {/* CTA Buttons - Dùng style của Diag */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Link href="/bac-si" className="block">
                            <button className="w-full flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Calendar className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold text-gray-900 text-sm">Đặt lịch ngay</span>
                            </button>
                        </Link>
                        
                        <Link href="/bac-si" className="block">
                            <button className="w-full flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Users className="h-5 w-5 text-teal-600 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold text-gray-900 text-sm">1.000+ bác sĩ</span>
                            </button>
                        </Link>
                        
                        <Link href="/chuyen-khoa" className="block">
                            <button className="w-full flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Building className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold text-gray-900 text-sm">125+ bệnh viện</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Column - Banner Slider */}
                <div className="hidden lg:block">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        {/* Placeholder for banner slider */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                            <div className="text-center text-white p-8">
                                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Play className="h-10 w-10" />
                                </div>
                                <p className="text-lg font-semibold mb-2">Banner Slider</p>
                                <p className="text-sm text-white/80">Khuyến mãi & Thông tin y tế</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}) satisfies React.FC
