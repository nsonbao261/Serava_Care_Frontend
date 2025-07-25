import { SpecialtyPageData, SpecialtyCard } from '@/types'
import {
   Heart,
   Eye,
   Brain,
   Baby,
   Stethoscope,
   Activity,
   UserCheck,
   Scissors,
   Bone,
   Zap,
   Droplets,
   Pill,
   Shield,
   HeartHandshake
} from 'lucide-react'

export const specialtyData: { [key: string]: SpecialtyPageData } = {
   'tim-mach': {
      id: 'tim-mach',
      name: 'Tim mạch',
      description:
         'Chuyên khoa Tim mạch chẩn đoán và điều trị các bệnh lý về tim và mạch máu, bao gồm bệnh mạch vành, cao huyết áp, rối loạn nhịp tim và suy tim.',
      doctors: [
         {
            id: '1',
            slug: 'bs-ckii-nguyen-van-minh',
            name: 'BS.CKII Nguyễn Văn Minh',
            title: 'Bác sĩ Chuyên khoa II',
            specialty: 'Tim mạch can thiệp',
            experience: '20+ năm',
            hospital: 'Bệnh viện Chợ Rẫy',
            location: 'TP. Hồ Chí Minh',
            rating: 4.8,
            consultationFee: '300.000đ',
            image: '/placeholder.svg'
         }
      ]
   },
   'nhi-khoa': {
      id: 'nhi-khoa',
      name: 'Nhi khoa',
      description:
         'Chuyên khoa Nhi khoa chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi, bao gồm khám bệnh, điều trị và tư vấn phát triển.',
      doctors: [
         {
            id: '2',
            slug: 'ts-bs-tran-thi-huong',
            name: 'TS. BS Trần Thị Hương',
            title: 'Tiến sĩ Bác sĩ',
            specialty: 'Nhi khoa - Nội tiết',
            experience: '15+ năm',
            hospital: 'Bệnh viện Nhi Đồng 1',
            location: 'TP. Hồ Chí Minh',
            rating: 4.9,
            consultationFee: '250.000đ',
            image: '/placeholder.svg'
         }
      ]
   },
   'tieu-hoa': {
      id: 'tieu-hoa',
      name: 'Tiêu hóa',
      description:
         'Chuyên khoa Tiêu hóa chẩn đoán và điều trị các bệnh lý về hệ tiêu hóa, bao gồm dạ dày, ruột, gan, mật và tuyến tụy.',
      doctors: [
         {
            id: '3',
            slug: 'ths-bs-le-van-duc',
            name: 'ThS. BS Lê Văn Đức',
            title: 'Thạc sĩ Bác sĩ',
            specialty: 'Tiêu hóa - Gan mật',
            experience: '18+ năm',
            hospital: 'Bệnh viện Đại học Y Dược',
            location: 'TP. Hồ Chí Minh',
            rating: 4.7,
            consultationFee: '280.000đ',
            image: '/placeholder.svg'
         }
      ]
   },
   'san-phu-khoa': {
      id: 'san-phu-khoa',
      name: 'Sản phụ khoa',
      description:
         'Chuyên khoa Sản phụ khoa chăm sóc sức khỏe sinh sản của phụ nữ, bao gồm thai sản, phụ khoa và các vấn đề về sinh sản.',
      doctors: [
         {
            id: '4',
            slug: 'bs-ck2-pham-thi-lan',
            name: 'BS. CK2 Phạm Thị Lan',
            title: 'Bác sĩ Chuyên khoa 2',
            specialty: 'Sản phụ khoa',
            experience: '12+ năm',
            hospital: 'Bệnh viện Từ Dũ',
            location: 'TP. Hồ Chí Minh',
            rating: 4.8,
            consultationFee: '200.000đ',
            image: '/placeholder.svg'
         }
      ]
   },
   'than-kinh': {
      id: 'than-kinh',
      name: 'Thần kinh',
      description:
         'Chuyên khoa Thần kinh chẩn đoán và điều trị các bệnh lý về hệ thần kinh, bao gồm não, tủy sống và hệ thần kinh ngoại biên.',
      doctors: [
         {
            id: '5',
            slug: 'pgs-ts-bs-hoang-minh-tuan',
            name: 'PGS. TS. BS Hoàng Minh Tuấn',
            title: 'Phó Giáo sư Tiến sĩ Bác sĩ',
            specialty: 'Thần kinh - Tâm thần',
            experience: '25+ năm',
            hospital: 'Viện Sức khỏe Tâm thần',
            location: 'TP. Hồ Chí Minh',
            rating: 4.9,
            consultationFee: '350.000đ',
            image: '/placeholder.svg'
         }
      ]
   }
}

export const homepageSpecialties: SpecialtyCard[] = [
   {
      id: 'bac-si-gia-dinh',
      slug: 'bac-si-gia-dinh',
      name: 'Bác sĩ Gia Đình',
      description: 'Chăm sóc sức khỏe toàn diện cho cả gia đình',
      icon: UserCheck,
      color: 'from-blue-400 to-blue-600',
      doctorCount: '120+'
   },
   {
      id: 'tim-mach',
      slug: 'tim-mach',
      name: 'Tim mạch',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch',
      icon: Heart,
      color: 'from-red-400 to-red-600',
      doctorCount: '85+'
   },
   {
      id: 'tieu-hoa-gan-mat',
      slug: 'tieu-hoa-gan-mat',
      name: 'Tiêu hóa - Gan mật',
      description: 'Điều trị bệnh lý đường tiêu hóa và gan mật',
      icon: Activity,
      color: 'from-green-400 to-green-600',
      doctorCount: '90+'
   },
   {
      id: 'noi-tong-quat',
      slug: 'noi-tong-quat',
      name: 'Nội tổng quát',
      description: 'Khám và điều trị các bệnh lý nội khoa',
      icon: Stethoscope,
      color: 'from-purple-400 to-purple-600',
      doctorCount: '110+'
   },
   {
      id: 'nhi-khoa',
      slug: 'nhi-khoa',
      name: 'Nhi khoa',
      description: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi',
      icon: Baby,
      color: 'from-pink-400 to-pink-600',
      doctorCount: '75+'
   },
   {
      id: 'mat',
      slug: 'mat',
      name: 'Mắt',
      description: 'Chẩn đoán và điều trị các bệnh lý về mắt',
      icon: Eye,
      color: 'from-yellow-400 to-yellow-600',
      doctorCount: '60+'
   },
   {
      id: 'than-kinh',
      slug: 'than-kinh',
      name: 'Thần kinh',
      description: 'Điều trị các bệnh lý hệ thần kinh',
      icon: Brain,
      color: 'from-indigo-400 to-indigo-600',
      doctorCount: '45+'
   },
   {
      id: 'da-lieu',
      slug: 'da-lieu',
      name: 'Da liễu',
      description: 'Chăm sóc và điều trị các bệnh lý da',
      icon: Shield,
      color: 'from-orange-400 to-orange-600',
      doctorCount: '55+'
   },
   {
      id: 'co-xuong-khop',
      slug: 'co-xuong-khop',
      name: 'Cơ xương khớp',
      description: 'Điều trị bệnh lý xương khớp và cơ',
      icon: Bone,
      color: 'from-teal-400 to-teal-600',
      doctorCount: '70+'
   },
   {
      id: 'tai-mui-hong',
      slug: 'tai-mui-hong',
      name: 'Tai - Mũi - Họng',
      description: 'Chẩn đoán và điều trị bệnh lý TMH',
      icon: HeartHandshake,
      color: 'from-cyan-400 to-cyan-600',
      doctorCount: '40+'
   },
   {
      id: 'noi-tiet',
      slug: 'noi-tiet',
      name: 'Nội tiết',
      description: 'Điều trị rối loạn nội tiết và đái tháo đường',
      icon: Droplets,
      color: 'from-emerald-400 to-emerald-600',
      doctorCount: '35+'
   },
   {
      id: 'san-phu-khoa',
      slug: 'san-phu-khoa',
      name: 'Sản - Phụ khoa',
      description: 'Chăm sóc sức khỏe phụ nữ và thai sản',
      icon: HeartHandshake,
      color: 'from-rose-400 to-rose-600',
      doctorCount: '65+'
   },
   {
      id: 'ngoai-khoa',
      slug: 'ngoai-khoa',
      name: 'Ngoại khoa',
      description: 'Phẫu thuật và can thiệp ngoại khoa',
      icon: Scissors,
      color: 'from-gray-400 to-gray-600',
      doctorCount: '80+'
   },
   {
      id: 'tiet-nieu',
      slug: 'tiet-nieu',
      name: 'Tiết niệu',
      description: 'Điều trị các bệnh lý hệ tiết niệu',
      icon: Zap,
      color: 'from-violet-400 to-violet-600',
      doctorCount: '30+'
   },
   {
      id: 'duoc-hoc',
      slug: 'duoc-hoc',
      name: 'Dược học',
      description: 'Tư vấn và hướng dẫn sử dụng thuốc',
      icon: Pill,
      color: 'from-lime-400 to-lime-600',
      doctorCount: '25+'
   }
]
