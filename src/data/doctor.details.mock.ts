export const mockDoctorDetails: { [key: string]: LegacyDoctorDetail } = {
   'bs-ckii-nguyen-van-minh': {
      id: '1',
      slug: 'bs-ckii-nguyen-van-minh',
      name: 'BS.CKII Nguyễn Văn Minh',
      title: 'Bác sĩ Chuyên khoa II',
      specialty: 'Tim mạch can thiệp',
      experience: '20+ năm kinh nghiệm',
      hospital: 'Bệnh viện Chợ Rẫy',
      location: 'TP. Hồ Chí Minh',
      rating: 4.8,
      reviewCount: 124,
      consultationFee: '300.000đ',
      image: '/placeholder.svg',
      about: 'BS.CKII Nguyễn Văn Minh có hơn 20 năm kinh nghiệm trong lĩnh vực Tim mạch can thiệp. Bác sĩ Minh hiện đang là Trưởng khoa Tim mạch tại Bệnh viện Chợ Rẫy. Với chuyên môn và kinh nghiệm dày dạn, Bác sĩ Minh luôn được nhiều bệnh nhân tin tưởng đến thăm khám và điều trị.',
      education: [
         '2000: Tốt nghiệp Đại học Y Dược TP.HCM',
         '2005: Tốt nghiệp chuyên khoa 1 Tim mạch, Đại học Y Dược TP.HCM',
         '2010: Tốt nghiệp chuyên khoa 2 Tim mạch, Đại học Y Dược TP.HCM',
         '2015: Học tập tại Bệnh viện Đại học Tokyo, Nhật Bản'
      ],
      achievements: [
         'Thành viên Hội Tim mạch Việt Nam',
         'Chứng chỉ can thiệp tim mạch quốc tế',
         'Giải thưởng Bác sĩ xuất sắc năm 2020',
         'Chứng chỉ đào tạo tại Đại học Harvard'
      ],
      languages: ['Tiếng Việt', 'English', '日本語'],
      workingHours: 'Thứ 2-6: 8:00-17:00, Thứ 7: 8:00-12:00',
      phoneNumber: '028-3855-4269',
      email: 'bs.nguyenvanminh@choray.vn',
      articles: [
         {
            id: '1',
            title: 'Phòng ngừa bệnh tim mạch ở người cao tuổi',
            publishDate: '15 Th12, 2024',
            readTime: '5 phút đọc'
         },
         {
            id: '2',
            title: 'Dấu hiệu nhận biết sớm bệnh mạch vành',
            publishDate: '10 Th12, 2024',
            readTime: '7 phút đọc'
         }
      ]
   },
   'ts-bs-tran-thi-huong': {
      id: '2',
      slug: 'ts-bs-tran-thi-huong',
      name: 'TS. BS Trần Thị Hương',
      title: 'Tiến sĩ Bác sĩ',
      specialty: 'Nhi khoa - Nội tiết',
      experience: '15+ năm kinh nghiệm',
      hospital: 'Bệnh viện Nhi Đồng 1',
      location: 'TP. Hồ Chí Minh',
      rating: 4.9,
      reviewCount: 89,
      consultationFee: '250.000đ',
      image: '/placeholder.svg',
      about: 'TS. BS Trần Thị Hương chuyên về Nhi khoa - Nội tiết với hơn 15 năm kinh nghiệm. Bác sĩ Hương hiện đang công tác tại Bệnh viện Nhi Đồng 1, chuyên điều trị các bệnh lý nội tiết ở trẻ em như đái tháo đường, rối loạn tăng trưởng, rối loạn tuyến giáp.',
      education: [
         '1998: Tốt nghiệp Đại học Y Dược TP.HCM',
         '2003: Tốt nghiệp chuyên khoa 1 Nhi khoa',
         '2008: Tốt nghiệp Thạc sĩ Y học',
         '2015: Tốt nghiệp Tiến sĩ Y học'
      ],
      achievements: [
         'Phó chủ tịch Hội Nội tiết Nhi khoa TP.HCM',
         'Giải thưởng nghiên cứu khoa học xuất sắc',
         "Chứng chỉ đào tạo tại Bệnh viện Seattle Children's"
      ],
      languages: ['Tiếng Việt', 'English', 'Français'],
      workingHours: 'Thứ 2-6: 7:30-16:30, Thứ 7: 7:30-11:30',
      phoneNumber: '028-3896-5555',
      email: 'ts.tranthihuong@nhi1.org.vn',
      articles: [
         {
            id: '3',
            title: 'Chăm sóc trẻ mắc đái tháo đường type 1',
            publishDate: '20 Th12, 2024',
            readTime: '6 phút đọc'
         }
      ]
   }
}
