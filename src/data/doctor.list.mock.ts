// Enhanced mock data with better structure and more comprehensive information
export const mockDoctors: Doctor[] = [
   {
      id: '1',
      slug: 'bs-ckii-nguyen-van-minh',
      name: 'BS.CKII Nguyễn Văn Minh',
      title: 'Bác sĩ Chuyên khoa II',
      specialty: 'Tim mạch can thiệp',
      subSpecialties: ['Mạch vành', 'Nhịp tim', 'Suy tim'],
      experience: '20+ năm',
      hospital: 'Bệnh viện Chợ Rẫy',
      location: 'TP. Hồ Chí Minh',
      rating: 4.8,
      reviewCount: 124,
      consultationFee: '300.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'male',
      languages: ['vi', 'en', 'ja'],
      verified: true,
      contact: {
         phone: '028-3855-4269',
         email: 'bs.nguyenvanminh@choray.vn',
         address: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM'
      },
      social: {
         linkedin: 'https://linkedin.com/in/nguyen-van-minh-md'
      }
   },
   {
      id: '2',
      slug: 'ts-bs-tran-thi-huong',
      name: 'TS. BS Trần Thị Hương',
      title: 'Tiến sĩ Bác sĩ',
      specialty: 'Nhi khoa - Nội tiết',
      subSpecialties: ['Tiểu đường trẻ em', 'Tăng trưởng', 'Dậy thì sớm'],
      experience: '15+ năm',
      hospital: 'Bệnh viện Nhi Đồng 1',
      location: 'TP. Hồ Chí Minh',
      rating: 4.9,
      reviewCount: 98,
      consultationFee: '250.000đ',
      image: '/images/doctors/doctor-2.jpg',
      status: 'active',
      gender: 'female',
      languages: ['vi', 'en'],
      verified: true,
      contact: {
         phone: '028-3829-5555',
         email: 'ts.tranthihuong@nhidong1.org.vn'
      }
   },
   {
      id: '3',
      slug: 'ths-bs-le-van-duc',
      name: 'ThS. BS Lê Văn Đức',
      title: 'Thạc sĩ Bác sĩ',
      specialty: 'Tiêu hóa - Gan mật',
      subSpecialties: ['Nội soi tiêu hóa', 'Bệnh gan', 'Viêm ruột'],
      experience: '18+ năm',
      hospital: 'Bệnh viện Đại học Y Dược',
      location: 'TP. Hồ Chí Minh',
      rating: 4.7,
      reviewCount: 156,
      consultationFee: '280.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'male',
      languages: ['vi', 'en'],
      verified: true,
      contact: {
         phone: '028-3952-5500',
         email: 'ths.levanduc@umc.edu.vn'
      }
   },
   {
      id: '4',
      slug: 'bs-ck1-pham-thi-lan',
      name: 'BS.CK1 Phạm Thị Lan',
      title: 'Bác sĩ Chuyên khoa I',
      specialty: 'Sản phụ khoa',
      subSpecialties: ['Thai sản', 'Vô sinh hiếm muộn', 'Phụ khoa'],
      experience: '12+ năm',
      hospital: 'Bệnh viện Từ Dũ',
      location: 'TP. Hồ Chí Minh',
      rating: 4.6,
      reviewCount: 203,
      consultationFee: '220.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'female',
      languages: ['vi'],
      verified: true,
      contact: {
         phone: '028-3930-1712',
         email: 'bs.phamthilan@tudu.com.vn'
      }
   },
   {
      id: '5',
      slug: 'prof-bs-hoang-van-nam',
      name: 'Prof. BS Hoàng Văn Nam',
      title: 'Giáo sư Bác sĩ',
      specialty: 'Thần kinh',
      subSpecialties: ['Đột quỵ', 'Động kinh', 'Parkinson'],
      experience: '25+ năm',
      hospital: 'Bệnh viện Bạch Mai',
      location: 'Hà Nội',
      rating: 4.9,
      reviewCount: 89,
      consultationFee: '400.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'male',
      languages: ['vi', 'en'],
      verified: true,
      contact: {
         phone: '024-3869-3731',
         email: 'prof.hoangvannam@bachmai.gov.vn'
      }
   },
   {
      id: '6',
      slug: 'bs-nguyen-thi-mai',
      name: 'BS Nguyễn Thị Mai',
      title: 'Bác sĩ',
      specialty: 'Da liễu',
      subSpecialties: ['Điều trị mụn', 'Lão hóa da', 'Bệnh da dị ứng'],
      experience: '8+ năm',
      hospital: 'Bệnh viện Da liễu TP.HCM',
      location: 'TP. Hồ Chí Minh',
      rating: 4.5,
      reviewCount: 67,
      consultationFee: '180.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'female',
      languages: ['vi', 'en'],
      verified: true,
      contact: {
         phone: '028-3925-2255',
         email: 'bs.nguyenthimai@dalieu.gov.vn'
      }
   },
   {
      id: '7',
      slug: 'ts-bs-tran-van-minh',
      name: 'TS. BS Trần Văn Minh',
      title: 'Tiến sĩ Bác sĩ',
      specialty: 'Ung bướu',
      subSpecialties: ['Ung thư phổi', 'Ung thư vú', 'Hóa trị'],
      experience: '22+ năm',
      hospital: 'Bệnh viện K',
      location: 'Hà Nội',
      rating: 4.8,
      reviewCount: 112,
      consultationFee: '350.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'male',
      languages: ['vi', 'en'],
      verified: true,
      contact: {
         phone: '024-3577-6666',
         email: 'ts.tranvanminh@benhvienk.vn'
      }
   },
   {
      id: '8',
      slug: 'ths-bs-le-thi-hong',
      name: 'ThS. BS Lê Thị Hồng',
      title: 'Thạc sĩ Bác sĩ',
      specialty: 'Tai - Mũi - Họng',
      subSpecialties: ['Viêm xoang', 'Điếc đột ngột', 'Polyp mũi'],
      experience: '14+ năm',
      hospital: 'Bệnh viện Tai Mũi Họng TP.HCM',
      location: 'TP. Hồ Chí Minh',
      rating: 4.6,
      reviewCount: 85,
      consultationFee: '200.000đ',
      image: '/placeholder.svg',
      status: 'active',
      gender: 'female',
      languages: ['vi'],
      verified: true,
      contact: {
         phone: '028-3835-5432',
         email: 'ths.lethihong@tmh.gov.vn'
      }
   }
]

// Helper function to get doctors by specialty
export function getDoctorsBySpecialty(specialty: string): Doctor[] {
   return mockDoctors.filter(
      (doctor) =>
         doctor.specialty?.toLowerCase().includes(specialty.toLowerCase()) ||
         doctor.subSpecialties?.some((sub) => sub.toLowerCase().includes(specialty.toLowerCase()))
   )
}

// Helper function to get featured doctors
export function getFeaturedDoctors(limit: number = 6): Doctor[] {
   return mockDoctors
      .filter((doctor) => doctor.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
}
