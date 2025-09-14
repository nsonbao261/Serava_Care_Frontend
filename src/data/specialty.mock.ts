export const mockSpecialtyDetail: SpecialtyDetail[] = [
    {
        id: '1',
        name: 'Tim mạch',
        slug: 'tim-mach',
        description: 'Chuyên khoa Tim mạch chẩn đoán và điều trị các bệnh lý về tim và mạch máu, bao gồm bệnh mạch vành, cao huyết áp, rối loạn nhịp tim và suy tim.'
    },
    {
        id: '2',
        name: 'Nhi khoa',
        slug: 'nhi-khoa',
        description: 'Chuyên khoa Nhi khoa chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi, bao gồm khám bệnh, điều trị và tư vấn phát triển.'
    },
    {
        id: '3',
        name: 'Tiêu hóa',
        slug: 'tieu-hoa',
        description: 'Chuyên khoa Tiêu hóa chẩn đoán và điều trị các bệnh lý về hệ tiêu hóa, bao gồm dạ dày, ruột, gan, mật và tuyến tụy.'
    },
    {
        id: '4',
        name: 'Sản phụ khoa',
        slug: 'san-phu-khoa',
        description: 'Chuyên khoa Sản phụ khoa chăm sóc sức khỏe sinh sản của phụ nữ, bao gồm thai sản, phụ khoa và các vấn đề về sinh sản.'
    },
    {
        id: '5',
        name: 'Thần kinh',
        slug: 'than-kinh',
        description: 'Chuyên khoa Thần kinh chẩn đoán và điều trị các bệnh lý về hệ thần kinh, bao gồm não, tủy sống và hệ thần kinh ngoại biên.'
    }
]

export const mockSpecialties: Specialty[] = [
    {
        id: '1',
        slug: 'bac-si-gia-dinh',
        name: 'Bác sĩ Gia Đình',
        description: 'Chăm sóc sức khỏe toàn diện cho cả gia đình từ trẻ em đến người cao tuổi',
        doctorCount: '120+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '2',
        slug: 'tim-mach',
        name: 'Tim mạch',
        description: 'Chẩn đoán và điều trị các bệnh lý tim mạch, cao huyết áp, bệnh mạch vành',
        doctorCount: '85+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '3',
        slug: 'nhi-khoa',
        name: 'Nhi khoa',
        description: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi',
        doctorCount: '75+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '4',
        slug: 'than-kinh',
        name: 'Thần kinh',
        description: 'Điều trị các bệnh lý hệ thần kinh, đột quỵ, động kinh',
        doctorCount: '45+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '5',
        slug: 'mat',
        name: 'Mắt',
        description: 'Chẩn đoán và điều trị các bệnh lý về mắt',
        doctorCount: '60+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '6',
        slug: 'noi-tong-quat',
        name: 'Nội tổng quát',
        description: 'Khám và điều trị các bệnh lý nội khoa, tầm soát sức khỏe tổng quát',
        doctorCount: '150+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '7',
        slug: 'tieu-hoa-gan-mat',
        name: 'Tiêu hóa - Gan mật',
        description: 'Điều trị bệnh lý đường tiêu hóa, gan, mật, dạ dày, đại tràng',
        doctorCount: '90+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '8',
        slug: 'co-xuong-khop',
        name: 'Cơ xương khớp',
        description: 'Điều trị bệnh lý xương khớp, cột sống, chấn thương thể thao',
        doctorCount: '70+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'ngoai-khoa'
    },
    {
        id: '9',
        slug: 'san-phu-khoa',
        name: 'Sản - Phụ khoa',
        description: 'Chăm sóc sức khỏe phụ nữ, thai sản và sinh nở',
        doctorCount: '65+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '10',
        slug: 'ngoai-tong-quat',
        name: 'Ngoại tổng quát',
        description: 'Phẫu thuật và can thiệp ngoại khoa tổng quát',
        doctorCount: '80+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'ngoai-khoa'
    },
    {
        id: '11',
        slug: 'than-kinh-ngoai',
        name: 'Thần kinh ngoại',
        description: 'Phẫu thuật não, cột sống và hệ thần kinh',
        doctorCount: '25+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'ngoai-khoa'
    },
    {
        id: '12',
        slug: 'tai-mui-hong',
        name: 'Tai - Mũi - Họng',
        description: 'Chẩn đoán và điều trị bệnh lý TMH',
        doctorCount: '40+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '13',
        slug: 'da-lieu',
        name: 'Da liễu',
        description: 'Chăm sóc và điều trị các bệnh lý da, thẩm mỹ da',
        doctorCount: '55+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '14',
        slug: 'rang-ham-mat',
        name: 'Răng - Hàm - Mặt',
        description: 'Điều trị bệnh lý răng miệng và phẫu thuật hàm mặt',
        doctorCount: '45+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '15',
        slug: 'noi-tiet',
        name: 'Nội tiết',
        description: 'Điều trị rối loạn nội tiết, đái tháo đường, bệnh tuyến giáp',
        doctorCount: '35+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '16',
        slug: 'ho-hap',
        name: 'Hô hấp',
        description: 'Điều trị các bệnh lý đường hô hấp, phổi, hen suyễn',
        doctorCount: '40+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '17',
        slug: 'tiet-nieu',
        name: 'Tiết niệu',
        description: 'Điều trị các bệnh lý hệ tiết niệu, thận, bàng quang',
        doctorCount: '30+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'noi-khoa'
    },
    {
        id: '18',
        slug: 'tam-than',
        name: 'Tâm thần',
        description: 'Chuyên khoa Tâm thần điều trị các rối loạn tâm lý và tâm thần',
        doctorCount: '7+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'chuyen-khoa'
    },
    {
        id: '19',
        slug: 'xet-nghiem',
        name: 'Xét nghiệm',
        description: 'Chuyên khoa Xét nghiệm thực hiện các xét nghiệm chẩn đoán bệnh',
        doctorCount: '5+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '20',
        slug: 'chuan-doan-hinh-anh',
        name: 'Chẩn đoán hình ảnh',
        description: 'Chuyên khoa Chẩn đoán hình ảnh thực hiện các kỹ thuật chẩn đoán bằng hình ảnh',
        doctorCount: '7+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'can-lam-sang'
    },
    {
        id: '21',
        slug: 'phuc-hoi-chuc-nang',
        name: 'Phục hồi chức năng',
        description: 'Vật lý trị liệu, phục hồi chức năng sau chấn thương',
        doctorCount: '35+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'phuc-hoi'
    },
    {
        id: '22',
        slug: 'duoc-hoc',
        name: 'Dược học',
        description: 'Tư vấn và hướng dẫn sử dụng thuốc an toàn',
        doctorCount: '25+ dược sĩ',
        imageUrl: '/placeholder.svg',
        category: 'phuc-hoi'
    },
    {
        id: '23',
        slug: 'dinh-duong',
        name: 'Dinh dưỡng',
        description: 'Tư vấn dinh dưỡng và chế độ ăn uống khoa học',
        doctorCount: '20+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'phuc-hoi'
    },
    {
        id: '24',
        slug: 'gay-me-hoi-suc',
        name: 'Gây mê hồi sức',
        description: 'Chuyên khoa Gây mê hồi sức đảm bảo an toàn trong phẫu thuật và điều trị tích cực',
        doctorCount: '8+ bác sĩ',
        imageUrl: '/placeholder.svg',
        category: 'ngoai-khoa'
    }
]
