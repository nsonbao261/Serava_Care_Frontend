export const questionSpecialties: QuestionSpecialty[] = [
   {
      id: 'default',
      name: 'Chọn chuyên khoa',
      value: '',
      label: 'Chọn chuyên khoa',
      icon: '🏥'
   },
   {
      id: 'tim-mach',
      name: 'Tim mạch',
      value: 'tim-mach',
      label: 'Tim mạch',
      description: 'Chuyên khoa tim mạch và huyết áp',
      icon: '❤️'
   },
   {
      id: 'tieu-hoa',
      name: 'Tiêu hóa',
      value: 'tieu-hoa',
      label: 'Tiêu hóa',
      description: 'Chuyên khoa tiêu hóa và gan mật',
      icon: '🫁'
   },
   {
      id: 'nhi-khoa',
      name: 'Nhi khoa',
      value: 'nhi-khoa',
      label: 'Nhi khoa',
      description: 'Chuyên khoa nhi - trẻ em',
      icon: '👶'
   },
   {
      id: 'phu-khoa',
      name: 'Phụ khoa',
      value: 'phu-khoa',
      label: 'Phụ khoa',
      description: 'Chuyên khoa phụ sản',
      icon: '👩‍⚕️'
   },
   {
      id: 'than-kinh',
      name: 'Thần kinh',
      value: 'than-kinh',
      label: 'Thần kinh',
      description: 'Chuyên khoa thần kinh',
      icon: '🧠'
   },
   {
      id: 'noi-tiet',
      name: 'Nội tiết',
      value: 'noi-tiet',
      label: 'Nội tiết',
      description: 'Chuyên khoa nội tiết - đái tháo đường',
      icon: '💧'
   },
   {
      id: 'da-lieu',
      name: 'Da liễu',
      value: 'da-lieu',
      label: 'Da liễu',
      description: 'Chuyên khoa da liễu',
      icon: '🛡️'
   },
   {
      id: 'mat',
      name: 'Mắt',
      value: 'mat',
      label: 'Mắt',
      description: 'Chuyên khoa mắt',
      icon: '👁️'
   },
   {
      id: 'tai-mui-hong',
      name: 'Tai mũi họng',
      value: 'tai-mui-hong',
      label: 'Tai mũi họng',
      description: 'Chuyên khoa tai mũi họng',
      icon: '👂'
   },
   {
      id: 'co-xuong-khop',
      name: 'Cơ xương khớp',
      value: 'co-xuong-khop',
      label: 'Cơ xương khớp',
      description: 'Chuyên khoa cơ xương khớp',
      icon: '🦴'
   },
   {
      id: 'tham-my',
      name: 'Thẩm mỹ',
      value: 'tham-my',
      label: 'Thẩm mỹ',
      description: 'Chuyên khoa thẩm mỹ',
      icon: '✂️'
   },
   {
      id: 'noi-tong-quat',
      name: 'Nội tổng quát',
      value: 'noi-tong-quat',
      label: 'Nội tổng quát',
      description: 'Chuyên khoa nội tổng quát',
      icon: '🩺'
   },
   {
      id: 'ngoai-tong-quat',
      name: 'Ngoại tổng quát',
      value: 'ngoai-tong-quat',
      label: 'Ngoại tổng quát',
      description: 'Chuyên khoa ngoại tổng quát',
      icon: '🔬'
   },
   {
      id: 'khac',
      name: 'Khác',
      value: 'khac',
      label: 'Khác',
      description: 'Các chuyên khoa khác',
      icon: '👥'
   }
]

export const specialtyMap = new Map(
   questionSpecialties.map((specialty) => [specialty.value, specialty])
)
