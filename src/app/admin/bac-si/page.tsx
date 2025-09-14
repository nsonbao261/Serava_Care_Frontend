'use client'

import React, {useState, useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default (() => {
    const [doctors, setDoctors] = useState<Array<{
        id: string
        name: string
        email: string
        phone: string
        title: string
        specialty: string
        hospital: string
        location: string
    }>>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const mockDoctorsData = [
            {id: '1', name: 'Nguyễn Văn Minh', email: 'bs.nguyenvanminh@choray.vn', phone: '028-3855-4269', title: 'Bác sĩ Chuyên khoa II', specialty: 'Tim mạch', hospital: 'Bệnh viện Chợ Rẫy', location: 'TP. Hồ Chí Minh'},
            {id: '2', name: 'Trần Thị Hương', email: 'ts.tranthihuong@nhi1.org.vn', phone: '028-3896-5555', title: 'Tiến sĩ Bác sĩ', specialty: 'Nhi khoa', hospital: 'Bệnh viện Nhi Đồng 1', location: 'TP. Hồ Chí Minh'},
            {id: '3', name: 'Lê Văn Đức', email: 'leduc@seravacare.vn', phone: '028-1234-5678', title: 'Thạc sĩ Bác sĩ',specialty: 'Ngoại khoa',hospital: 'Bệnh viện Đại học Y Dược',location: 'TP. Hồ Chí Minh'},
            {id: '4', name: 'Phạm Thị Lan', email: 'phamlan@tudu.vn', phone: '028-1234-5679', title: 'Bác sĩ Chuyên khoa I', specialty: 'Sản phụ khoa', hospital: 'Bệnh viện Từ Dũ', location: 'TP. Hồ Chí Minh'},
            {id: '5', name: 'Hoàng Văn Nam', email: 'hoangnam@bachmai.vn', phone: '024-1234-5680', title: 'Giáo sư Bác sĩ', specialty: 'Phục hồi chức năng', hospital: 'Bệnh viện Bạch Mai', location: 'Hà Nội'}
        ]
        setDoctors(mockDoctorsData)
    }, [])

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Quản lý Bác sĩ</h1>
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Tìm kiếm bác sĩ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                    <Link href="/admin/bac-si/them-bac-si">
                        <Button>Thêm bác sĩ</Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bác sĩ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chuyên khoa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh viện
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Liên hệ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {doctor.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {doctor.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {doctor.specialty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {doctor.hospital}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{doctor.phone}</div>
                                        <div className="text-sm text-gray-500">{doctor.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Link href={`/admin/bac-si/${doctor.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Chi tiết
                                                </Button>
                                            </Link>
                                            <Button variant="destructive" size="sm">
                                                Xóa
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}) satisfies React.FC
