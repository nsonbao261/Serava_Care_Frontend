export const mockBookings: BookingResult[] = [
   {
      id: '1',
      booking: {
         code: 'SER001',
         status: 'confirmed',
         date: '2024-01-15'
      },
      patient: {
         name: 'Nguyễn Văn An',
         phone: '0901234567',
         email: 'nguyenvanan@email.com',
         address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      doctor: {
         name: 'BS. Trần Thị Mai',
         specialty: 'Tim mạch',
         imageUrl: '/placeholder.svg',
         phone: '0901234568',
         email: 'tranmai@seravacare.vn'
      },
      service: {
         type: 'telemedicine',
         name: 'Tư vấn tim mạch online'
      },
      appointment: {
         date: '2024-01-20',
         time: '09:00'
      },
      payment: {
         totalAmount: '300,000 VNĐ',
         status: 'paid',
         method: 'Chuyển khoản'
      },
      hospital: {
         name: 'Bệnh viện Serava Care',
         address: '123 Đường DEF, Quận 2, TP.HCM'
      },
      medicalRecord: {
         reason: 'Đau ngực, khó thở',
         notes: 'Bệnh nhân có tiền sử cao huyết áp',
         symptoms: ['Đau ngực', 'Khó thở', 'Mệt mỏi'],
         medicalHistory: 'Cao huyết áp từ 2020',
         prescription: 'Thuốc huyết áp, nghỉ ngơi',
         diagnosis: 'Cao huyết áp, cần theo dõi',
         followUpDate: '2024-02-20'
      }
   },
   {
      id: '2',
      booking: {
         code: 'SER002',
         status: 'completed',
         date: '2024-01-12'
      },
      patient: {
         name: 'Nguyễn Văn An',
         phone: '0901234567',
         email: 'nguyenvanan@email.com',
         address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      doctor: {
         name: 'BS. Lê Văn Đức',
         specialty: 'Nội tổng quát',
         imageUrl: '/placeholder.svg',
         phone: '0901234569',
         email: 'leduc@seravacare.vn'
      },
      service: {
         type: 'clinic',
         name: 'Khám tổng quát tại phòng khám'
      },
      appointment: {
         date: '2024-01-18',
         time: '14:00'
      },
      payment: {
         totalAmount: '500,000 VNĐ',
         status: 'paid',
         method: 'Tiền mặt'
      },
      hospital: {
         name: 'Phòng khám Serava Care Quận 1',
         address: '456 Đường GHI, Quận 1, TP.HCM'
      },
      medicalRecord: {
         reason: 'Khám sức khỏe định kỳ',
         notes: 'Khám định kỳ hàng năm',
         symptoms: [],
         medicalHistory: 'Không có tiền sử bệnh lý',
         prescription: 'Vitamin tổng hợp',
         diagnosis: 'Sức khỏe bình thường'
      }
   },
   {
      id: '3',
      booking: {
         code: 'SER003',
         status: 'pending',
         date: '2024-01-16'
      },
      patient: {
         name: 'Nguyễn Văn An',
         phone: '0901234567',
         email: 'nguyenvanan@email.com',
         address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      doctor: {
         name: 'BS. Phạm Thị Hoa',
         specialty: 'Da liễu',
         imageUrl: '/placeholder.svg',
         phone: '0901234570',
         email: 'phamhoa@seravacare.vn'
      },
      service: {
         type: 'home',
         name: 'Khám da tại nhà'
      },
      appointment: {
         date: '2024-01-25',
         time: '16:00'
      },
      payment: {
         totalAmount: '400,000 VNĐ',
         status: 'pending',
         method: 'Chuyển khoản'
      },
      hospital: {
         name: 'Dịch vụ tại nhà Serava Care',
         address: 'Tại nhà bệnh nhân'
      },
      medicalRecord: {
         reason: 'Phát ban da, ngứa',
         symptoms: ['Phát ban', 'Ngứa', 'Đỏ da']
      }
   },
   {
      id: '4',
      booking: {
         code: 'SER004',
         status: 'completed',
         date: '2024-01-10'
      },
      patient: {
         name: 'Nguyễn Văn An',
         phone: '0901234567',
         email: 'nguyenvanan@email.com',
         address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      doctor: {
         name: 'BS. Hoàng Văn Nam',
         specialty: 'Cấp cứu',
         imageUrl: '/placeholder.svg',
         phone: '0901234571',
         email: 'hoangnam@seravacare.vn'
      },
      service: {
         type: 'emergency',
         name: 'Cấp cứu tại nhà'
      },
      appointment: {
         date: '2024-01-10',
         time: '22:30'
      },
      payment: {
         totalAmount: '1,200,000 VNĐ',
         status: 'paid',
         method: 'Chuyển khoản'
      },
      hospital: {
         name: 'Dịch vụ cấp cứu Serava Care',
         address: 'Tại nhà bệnh nhân'
      },
      medicalRecord: {
         reason: 'Đau bụng dữ dội',
         notes: 'Cấp cứu khẩn cấp',
         symptoms: ['Đau bụng dữ dội', 'Buồn nôn', 'Sốt nhẹ'],
         medicalHistory: 'Không có tiền sử tương tự',
         prescription: 'Thuốc giảm đau, kháng sinh',
         diagnosis: 'Viêm ruột thừa cấp, đã phẫu thuật'
      }
   },
   {
      id: '5',
      booking: {
         code: 'SER005',
         status: 'cancelled',
         date: '2024-01-05'
      },
      patient: {
         name: 'Nguyễn Văn An',
         phone: '0901234567',
         email: 'nguyenvanan@email.com',
         address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      doctor: {
         name: 'BS. Nguyễn Thị Lan',
         specialty: 'Nhi khoa',
         imageUrl: '/placeholder.svg',
         phone: '0901234572',
         email: 'nguyenlan@seravacare.vn'
      },
      service: {
         type: 'clinic',
         name: 'Khám nhi khoa'
      },
      appointment: {
         date: '2024-01-08',
         time: '10:00'
      },
      payment: {
         totalAmount: '250,000 VNĐ',
         status: 'refunded',
         method: 'Chuyển khoản'
      },
      hospital: {
         name: 'Phòng khám Nhi Serava Care',
         address: '789 Đường JKL, Quận 3, TP.HCM'
      },
      medicalRecord: {
         reason: 'Sốt cao, ho',
         notes: 'Đã hủy lịch do bệnh nhân khỏe lại'
      }
   }
]
