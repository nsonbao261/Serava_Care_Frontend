'use client'

import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default (() => {
    const [patients, setPatients] = useState<Array<{
        id: string
        name: string
        phone: string
        email?: string
        address?: string
    }>>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const mockPatientsData = [
            {id: '1', name: 'Nguyễn Văn An', phone: '0901234567', email: 'nguyenvanan@email.com', address: '123 Đường ABC, Quận 1, TP.HCM'},
            {id: '2', name: 'Trần Thị Bình', phone: '0901234568', email: 'tranthibinh@email.com', address: '456 Đường DEF, Quận 2, TP.HCM'},
            {id: '3', name: 'Lê Văn Cường', phone: '0901234569', email: 'levancuong@email.com', address: '789 Đường GHI, Quận 3, TP.HCM'},
            {id: '4', name: 'Phạm Thị Dung', phone: '0901234570', email: 'phamthidung@email.com', address: '321 Đường JKL, Quận 4, TP.HCM'},
            {id: '5', name: 'Hoàng Văn Em', phone: '0901234571', email: 'hoangvanem@email.com', address: '654 Đường MNO, Quận 5, TP.HCM'},
            {id: '6', name: 'Vũ Thị Phương', phone: '0901234572', email: 'vuthiphuong@email.com', address: '987 Đường PQR, Quận 6, TP.HCM'},
            {id: '7', name: 'Đỗ Văn Giang', phone: '0901234573', email: 'dovangiang@email.com', address: '147 Đường STU, Quận 7, TP.HCM'},
            {id: '8', name: 'Ngô Thị Hoa', phone: '0901234574', email: 'ngothihoa@email.com', address: '258 Đường VWX, Quận 8, TP.HCM'}
        ]
        setPatients(mockPatientsData)
    }, [])

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Quản lý Bệnh nhân</h1>
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Tìm kiếm bệnh nhân..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh nhân
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Liên hệ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Địa chỉ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {patient.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {patient.id}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.phone}</div>
                                        {patient.email && (
                                            <div className="text-sm text-gray-500">{patient.email}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {patient.address || 'Chưa cập nhật'}
                                        </div>
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
                    Hiển thị {filteredPatients.length} trong tổng số {patients.length} bệnh nhân
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Trước</Button>
                    <Button variant="outline" size="sm">Sau</Button>
                </div>
            </div>
        </div>
    )
}) satisfies React.FC
