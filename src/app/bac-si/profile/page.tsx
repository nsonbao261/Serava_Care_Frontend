'use client'

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button"
import Image from "next/image"
import {Edit} from "lucide-react"
import {IMAGE_PLACEHOLDER_CONTENT} from "@/constants";
import {getDoctorProfile} from "@/services";

export default (() => {
    const [profile, setProfile] = useState<DoctorProfile | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const data = await getDoctorProfile()
                setProfile(data ?? null)
            } catch (err) {
                console.error("Failed to fetch data", err)
            }
        })()
    }, [])

    if (!profile) {
        return <div className="p-6">Đang tải...</div>
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Hồ sơ Bác sĩ</h1>
                <p className="text-gray-600">Quản lý thông tin cá nhân và chuyên môn</p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <div className="flex items-start gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src={profile.imageUrl ?? IMAGE_PLACEHOLDER_CONTENT}
                                alt={profile.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                                <p className="text-lg text-gray-600">{profile.title}</p>
                                <p className="text-blue-600 font-medium">{profile.specialty}</p>
                            </div>
                            <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Xem' : 'Chỉnh sửa'}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">Bệnh viện:</span>
                                <span className="ml-2">{profile.hospital}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Địa chỉ:</span>
                                <span className="ml-2">{profile.location}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Kinh nghiệm:</span>
                                <span className="ml-2">{profile.experience}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Phí tư vấn:</span>
                                <span className="ml-2 text-green-600 font-semibold">{profile.consultationFee}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="flex items-center justify-between">
                            <span>{profile.email}</span>
                            {isEditing && (
                                <Button size="sm" variant="ghost">
                                    <Edit className="w-4 h-4"/>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                        <div className="flex items-center justify-between">
                            <span>{profile.phone}</span>
                            {isEditing && (
                                <Button size="sm" variant="ghost">
                                    <Edit className="w-4 h-4"/>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Giới thiệu</h3>
                <div className="flex items-start justify-between">
                    <p className="text-gray-700 leading-relaxed">{profile.about}</p>
                    {isEditing && (
                        <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4"/>
                        </Button>
                    )}
                </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Học vấn</h3>
                <ul className="space-y-2">
                    {profile.education.map((item, index) => (
                        <li key={index} className="py-2 px-3 bg-gray-50 rounded">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Thành tựu</h3>
                <ul className="space-y-2">
                    {profile.achievements.map((item, index) => (
                        <li key={index} className="py-2 px-3 bg-gray-50 rounded">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Ngôn ngữ</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {language}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}) satisfies React.FC
