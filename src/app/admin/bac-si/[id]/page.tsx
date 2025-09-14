'use client'

import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import Image from "next/image";
import {createSlug} from "@/lib";

export default (() => {
    const params = useParams()
    const id = params.id as string
    
    const [doctor, setDoctor] = useState<{
        id: string
        name: string
        slug: string
        title: string
        specialty: string
        location: string
        hospital: string
        imageUrl: string
        email: string
        phone: string
        image: File | null
    } | null>(null)

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const mockDoctorData = {
            id: id,
            name: 'Nguyễn Văn Minh',
            slug: 'bs-ckii-nguyen-van-minh',
            title: 'Bác sĩ Chuyên khoa II',
            specialty: 'Tim mạch',
            location: 'TP. Hồ Chí Minh',
            hospital: 'Bệnh viện Chợ Rẫy',
            imageUrl: '/placeholder.svg',
            email: 'bs.nguyenvanminh@choray.vn',
            phone: '028-3855-4269',
            image: null
        }
        setDoctor(mockDoctorData)
    }, [id])

    const handleInputChange = (field: string, value: string) => {
        if (!doctor) return
        setDoctor(prev => prev ? ({ ...prev, [field]: value }) : null)
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!doctor) return
        const file = e.target.files?.[0] || null
        setDoctor(prev => prev ? ({ ...prev, image: file }) : null)
    }

    const validateForm = () => {
        if (!doctor) return false
        const newErrors: Record<string, string> = {}

        if (!doctor.name) newErrors.name = 'Tên bác sĩ là bắt buộc'
        if (!doctor.email) newErrors.email = 'Email là bắt buộc'
        if (!doctor.phone) newErrors.phone = 'Số điện thoại là bắt buộc'
        if (!doctor.specialty) newErrors.specialty = 'Chuyên khoa là bắt buộc'
        if (!doctor.hospital) newErrors.hospital = 'Bệnh viện là bắt buộc'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Saving doctor data:', doctor)
            alert('Đã lưu thông tin bác sĩ thành công!')
        }
    }

    const handleReset = () => {
        if (!doctor) return
        setDoctor({...doctor, name: 'Nguyễn Văn Minh', slug: 'bs-ckii-nguyen-van-minh', title: 'Bác sĩ Chuyên khoa II', specialty: 'Tim mạch', location: 'TP. Hồ Chí Minh', hospital: 'Bệnh viện Chợ Rẫy', imageUrl: '/placeholder.svg', email: 'bs.nguyenvanminh@choray.vn', phone: '028-3855-4269', image: null})
        setErrors({})
    }

    if (!doctor) {
        return <div className="p-6">Đang tải...</div>
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Chi tiết Bác sĩ</h1>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                </div>
            </div>

            <form onSubmit={handleSave} className="bg-white rounded-lg border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tên bác sĩ *</label>
                        <Input
                            value={doctor.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Nhập tên bác sĩ"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chức vụ</label>
                        <Input
                            value={doctor.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="VD: Bác sĩ Chuyên khoa II"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <Input
                            type="email"
                            value={doctor.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="email@example.com"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                        <Input
                            value={doctor.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="028-1234-5678"
                            className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa *</label>
                        <Input
                            value={doctor.specialty}
                            onChange={(e) => handleInputChange('specialty', e.target.value)}
                            placeholder="VD: Tim mạch"
                            className={errors.specialty ? 'border-red-500' : ''}
                        />
                        {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bệnh viện *</label>
                        <Input
                            value={doctor.hospital}
                            onChange={(e) => handleInputChange('hospital', e.target.value)}
                            placeholder="VD: Bệnh viện Chợ Rẫy"
                            className={errors.hospital ? 'border-red-500' : ''}
                        />
                        {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                        <Input
                            value={doctor.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="VD: TP. Hồ Chí Minh"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                        <Input
                            value={doctor.slug}
                            onChange={(e) => handleInputChange('slug', createSlug(e.target.value))}
                            placeholder="bs-nguyen-van-minh"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Hình ảnh</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                            {doctor.image ? (
                                <Image
                                    src={URL.createObjectURL(doctor.image)} 
                                    alt="Preview"
                                    height={500}
                                    width={300}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <Image
                                    src={doctor.imageUrl} 
                                    alt={doctor.name}
                                    height={500}
                                    width={300}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-sm text-gray-500 mt-1">JPG, PNG tối đa 2MB</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <Button type="submit">Lưu thay đổi</Button>
                    <Button type="button" variant="outline" onClick={handleReset}>Hủy</Button>
                </div>
            </form>
        </div>
    )
}) satisfies React.FC
