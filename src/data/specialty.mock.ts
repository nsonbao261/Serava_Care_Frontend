export const mockSpecialtyDetail: { [key: string]: SpecialtyDetail } = {
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

export const mockSpecialties: Specialty[] = [
   {
      id: 'bac-si-gia-dinh',
      slug: 'bac-si-gia-dinh',
      name: 'Bác sĩ Gia Đình',
      description: 'Chăm sóc sức khỏe toàn diện cho cả gia đình từ trẻ em đến người cao tuổi',
      shortDescription: 'Chăm sóc sức khỏe toàn diện gia đình',
      color: 'text-blue-600',
      doctorCount: '120+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 1
   },
   {
      id: 'tim-mach',
      slug: 'tim-mach',
      name: 'Tim mạch',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch, cao huyết áp, bệnh mạch vành',
      shortDescription: 'Điều trị các bệnh lý về tim và mạch máu',
      color: 'text-red-600',
      doctorCount: '85+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 2
   },
   {
      id: 'nhi-khoa',
      slug: 'nhi-khoa',
      name: 'Nhi khoa',
      description: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi',
      shortDescription: 'Chăm sóc sức khỏe trẻ em toàn diện',
      color: 'text-pink-600',
      doctorCount: '75+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 3
   },
   {
      id: 'than-kinh',
      slug: 'than-kinh',
      name: 'Thần kinh',
      description: 'Điều trị các bệnh lý hệ thần kinh, đột quỵ, động kinh',
      shortDescription: 'Điều trị các bệnh lý về hệ thần kinh',
      color: 'text-purple-600',
      doctorCount: '45+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 4
   },
   {
      id: 'mat',
      slug: 'mat',
      name: 'Mắt',
      description: 'Chẩn đoán và điều trị các bệnh lý về mắt',
      shortDescription: 'Chăm sóc sức khỏe mắt và thị giác',
      color: 'text-blue-600',
      doctorCount: '60+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 5
   },
   {
      id: 'noi-tong-quat',
      slug: 'noi-tong-quat',
      name: 'Nội tổng quát',
      description: 'Khám và điều trị các bệnh lý nội khoa, tầm soát sức khỏe tổng quát',
      shortDescription: 'Khám và điều trị bệnh lý nội khoa',
      color: 'text-green-600',
      doctorCount: '150+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 6
   },
   {
      id: 'tieu-hoa-gan-mat',
      slug: 'tieu-hoa-gan-mat',
      name: 'Tiêu hóa - Gan mật',
      description: 'Điều trị bệnh lý đường tiêu hóa, gan, mật, dạ dày, đại tràng',
      shortDescription: 'Điều trị bệnh lý đường tiêu hóa',
      color: 'text-orange-600',
      doctorCount: '90+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 7
   },
   {
      id: 'co-xuong-khop',
      slug: 'co-xuong-khop',
      name: 'Cơ xương khớp',
      description: 'Điều trị bệnh lý xương khớp, cột sống, chấn thương thể thao',
      shortDescription: 'Điều trị bệnh lý xương khớp',
      color: 'text-amber-600',
      doctorCount: '70+ bác sĩ',
      image: '/placeholder.svg',
      category: 'ngoai-khoa',
      order: 8
   },
   {
      id: 'san-phu-khoa',
      slug: 'san-phu-khoa',
      name: 'Sản - Phụ khoa',
      description: 'Chăm sóc sức khỏe phụ nữ, thai sản và sinh nở',
      shortDescription: 'Chăm sóc sức khỏe phụ nữ',
      color: 'text-rose-600',
      doctorCount: '65+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 9
   },
   {
      id: 'ngoai-tong-quat',
      slug: 'ngoai-tong-quat',
      name: 'Ngoại tổng quát',
      description: 'Phẫu thuật và can thiệp ngoại khoa tổng quát',
      shortDescription: 'Phẫu thuật và điều trị ngoại khoa',
      color: 'text-gray-600',
      doctorCount: '80+ bác sĩ',
      image: '/placeholder.svg',
      category: 'ngoai-khoa',
      order: 10
   },
   {
      id: 'than-kinh-ngoai',
      slug: 'than-kinh-ngoai',
      name: 'Thần kinh ngoại',
      description: 'Phẫu thuật não, cột sống và hệ thần kinh',
      shortDescription: 'Phẫu thuật thần kinh',
      color: 'text-yellow-600',
      doctorCount: '25+ bác sĩ',
      image: '/placeholder.svg',
      category: 'ngoai-khoa',
      order: 11
   },
   {
      id: 'tai-mui-hong',
      slug: 'tai-mui-hong',
      name: 'Tai - Mũi - Họng',
      description: 'Chẩn đoán và điều trị bệnh lý TMH',
      shortDescription: 'Điều trị bệnh lý TMH',
      color: 'text-blue-600',
      doctorCount: '40+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 12
   },
   {
      id: 'da-lieu',
      slug: 'da-lieu',
      name: 'Da liễu',
      description: 'Chăm sóc và điều trị các bệnh lý da, thẩm mỹ da',
      shortDescription: 'Điều trị bệnh lý về da',
      color: 'text-rose-600',
      doctorCount: '55+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 13
   },
   {
      id: 'rang-ham-mat',
      slug: 'rang-ham-mat',
      name: 'Răng - Hàm - Mặt',
      description: 'Điều trị bệnh lý răng miệng và phẫu thuật hàm mặt',
      shortDescription: 'Điều trị bệnh lý răng miệng',
      color: 'text-emerald-600',
      doctorCount: '45+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 14
   },
   {
      id: 'noi-tiet',
      slug: 'noi-tiet',
      name: 'Nội tiết',
      description: 'Điều trị rối loạn nội tiết, đái tháo đường, bệnh tuyến giáp',
      shortDescription: 'Điều trị bệnh lý nội tiết',
      color: 'text-yellow-600',
      doctorCount: '35+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 15
   },
   {
      id: 'ho-hap',
      slug: 'ho-hap',
      name: 'Hô hấp',
      description: 'Điều trị các bệnh lý đường hô hấp, phổi, hen suyễn',
      shortDescription: 'Điều trị bệnh lý hô hấp',
      color: 'text-teal-600',
      doctorCount: '40+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 16
   },
   {
      id: 'tiet-nieu',
      slug: 'tiet-nieu',
      name: 'Tiết niệu',
      description: 'Điều trị các bệnh lý hệ tiết niệu, thận, bàng quang',
      shortDescription: 'Điều trị bệnh lý thận và tiết niệu',
      color: 'text-cyan-600',
      doctorCount: '30+ bác sĩ',
      image: '/placeholder.svg',
      category: 'noi-khoa',
      order: 17
   },
   {
      id: 'tam-than',
      slug: 'tam-than',
      name: 'Tâm thần',
      description: 'Chuyên khoa Tâm thần điều trị các rối loạn tâm lý và tâm thần',
      shortDescription: 'Chăm sóc sức khỏe tâm thần',
      color: 'text-indigo-600',
      doctorCount: '7+ bác sĩ',
      image: '/placeholder.svg',
      category: 'chuyen-khoa',
      order: 18
   },
   {
      id: 'xet-nghiem',
      slug: 'xet-nghiem',
      name: 'Xét nghiệm',
      description: 'Chuyên khoa Xét nghiệm thực hiện các xét nghiệm chẩn đoán bệnh',
      shortDescription: 'Dịch vụ xét nghiệm chẩn đoán',
      color: 'text-emerald-600',
      doctorCount: '5+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 19
   },
   {
      id: 'chuan-doan-hinh-anh',
      slug: 'chuan-doan-hinh-anh',
      name: 'Chẩn đoán hình ảnh',
      description: 'Chuyên khoa Chẩn đoán hình ảnh thực hiện các kỹ thuật chẩn đoán bằng hình ảnh',
      shortDescription: 'Chẩn đoán bằng hình ảnh',
      color: 'text-violet-600',
      doctorCount: '7+ bác sĩ',
      image: '/placeholder.svg',
      category: 'can-lam-sang',
      order: 20
   },
   {
      id: 'phuc-hoi-chuc-nang',
      slug: 'phuc-hoi-chuc-nang',
      name: 'Phục hồi chức năng',
      description: 'Vật lý trị liệu, phục hồi chức năng sau chấn thương',
      shortDescription: 'Phục hồi chức năng sau bệnh',
      color: 'text-lime-600',
      doctorCount: '35+ bác sĩ',
      image: '/placeholder.svg',
      category: 'phuc-hoi',
      order: 21
   },
   {
      id: 'duoc-hoc',
      slug: 'duoc-hoc',
      name: 'Dược học',
      description: 'Tư vấn và hướng dẫn sử dụng thuốc an toàn',
      shortDescription: 'Tư vấn sử dụng thuốc',
      color: 'text-sky-600',
      doctorCount: '25+ dược sĩ',
      image: '/placeholder.svg',
      category: 'phuc-hoi',
      order: 22
   },
   {
      id: 'dinh-duong',
      slug: 'dinh-duong',
      name: 'Dinh dưỡng',
      description: 'Tư vấn dinh dưỡng và chế độ ăn uống khoa học',
      shortDescription: 'Tư vấn dinh dưỡng',
      color: 'text-green-600',
      doctorCount: '20+ bác sĩ',
      image: '/placeholder.svg',
      category: 'phuc-hoi',
      order: 23
   },
   {
      id: 'gay-me-hoi-suc',
      slug: 'gay-me-hoi-suc',
      name: 'Gây mê hồi sức',
      description:
         'Chuyên khoa Gây mê hồi sức đảm bảo an toàn trong phẫu thuật và điều trị tích cực',
      shortDescription: 'Gây mê và hồi sức cấp cứu',
      color: 'text-red-500',
      doctorCount: '8+ bác sĩ',
      image: '/placeholder.svg',
      category: 'ngoai-khoa',
      order: 24
   }
]
