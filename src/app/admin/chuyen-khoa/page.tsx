'use client'

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export default (() => {
    const [specialties, setSpecialties] = useState<Array<{
        id: string
        name: string
        category: string
    }>>([]);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const mockSpecialtiesData = [
            {id: '1', name: 'Bác sĩ Gia Đình', category: 'Nội khoa'},
            {id: '2', name: 'Tim mạch', category: 'Nội khoa'},
            {id: '3', name: 'Nhi khoa', category: 'Cận lâm sàng'},
            {id: '4', name: 'Thần kinh', category: 'Nội khoa'},
            {id: '5', name: 'Mắt', category: 'Cận lâm sàng'},
            {id: '6', name: 'Nội tổng quát', category: 'Nội khoa'},
            {id: '7', name: 'Tiêu hóa - Gan mật', category: 'Nội khoa'},
            {id: '8', name: 'Cơ xương khớp', category: 'Ngoại khoa'},
            {id: '9', name: 'Sản - Phụ khoa', category: 'Cận lâm sàng'},
            {id: '10', name: 'Ngoại tổng quát', category: 'Ngoại khoa'},
            {id: '11', name: 'Thần kinh ngoại', category: 'Ngoại khoa'},
            {id: '12', name: 'Tai - Mũi - Họng', category: 'Cận lâm sàng'},
            {id: '13', name: 'Da liễu', category: 'Cận lâm sàng'},
            {id: '14', name: 'Răng - Hàm - Mặt', category: 'Cận lâm sàng'},
            {id: '15', name: 'Nội tiết', category: 'Nội khoa'},
            {id: '16', name: 'Hô hấp', category: 'Nội khoa'},
            {id: '17', name: 'Tiết niệu', category: 'Nội khoa'},
            {id: '18', name: 'Tâm thần', category: 'Chuyên khoa'},
            {id: '19', name: 'Xét nghiệm', category: 'Cận lâm sàng'},
            {id: '20', name: 'Chẩn đoán hình ảnh', category: 'Cận lâm sàng'},
            {id: '21', name: 'Phục hồi chức năng', category: 'Phục hồi'},
            {id: '22', name: 'Dược học', category: 'Phục hồi'},
            {id: '23', name: 'Dinh dưỡng', category: 'Phục hồi'},
            {id: '24', name: 'Gây mê hồi sức', category: 'Ngoại khoa'},
        ]
        setSpecialties(mockSpecialtiesData)
    }, [])

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Nội khoa':
                return 'bg-blue-100 text-blue-800'
            case 'Ngoại khoa':
                return 'bg-green-100 text-green-800'
            case 'Cận lâm sàng':
                return 'bg-yellow-100 text-yellow-800'
            case 'Chuyên khoa':
                return 'bg-purple-100 text-purple-800'
            case 'Phục hồi':
                return 'bg-orange-100 text-orange-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Quản lý Chuyên khoa</h1>
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Tìm kiếm chuyên khoa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                    <Button>Thêm chuyên khoa</Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên chuyên khoa
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSpecialties.map((specialty) => (
                            <tr key={specialty.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {specialty.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ID: {specialty.id}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(specialty.category)}`}>
                                            {specialty.category}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Chi tiết</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-700">
                    Hiển thị {filteredSpecialties.length} trong tổng số {specialties.length} chuyên khoa
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Trước</Button>
                    <Button variant="outline" size="sm">Sau</Button>
                </div>
            </div>
        </div>
    )
}) satisfies React.FC
