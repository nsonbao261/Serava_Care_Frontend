export const mockUserProfile: UserProfile[] = [
   {
      id: '1',
      fullName: 'Nguyễn Văn An',
      email: 'nguyen.van.an@email.com',
      phone: '0901234567',
      birthDate: '1990-05-15',
      gender: 'male',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: '/images/avatar-placeholder.jpg',
      emergencyContact: {
         name: 'Nguyễn Thị Bình',
         phone: '0987654321',
         relationship: 'Vợ'
      },
      medicalInfo: {
         bloodType: 'O+',
         allergies: ['Penicillin', 'Seafood'],
         chronicConditions: ['Cao huyết áp'],
         medications: ['Amlodipine 5mg', 'Metformin 500mg']
      },
      insurance: {
         provider: 'Bảo hiểm xã hội',
         policyNumber: 'BHXH123456789',
         expiryDate: '2025-12-31'
      }
   },
   {
      id: '2',
      fullName: 'Trần Thị Bích',
      email: 'tran.thi.bich@email.com',
      phone: '0909876543',
      birthDate: '1995-10-20',
      gender: 'female',
      address: '456 Đường DEF, Quận 2, TP.HCM',
      avatar: '/images/avatar-placeholder.jpg',
      emergencyContact: {
         name: 'Nguyễn Văn A',
         phone: '0987654321',
         relationship: 'Chồng'
      },
      medicalInfo: {
         bloodType: 'A+',
         allergies: ['Aspirin'],
         chronicConditions: ['Tiểu đường'],
         medications: ['Metformin 500mg']
      },
      insurance: {
         provider: 'Bảo hiểm y tế',
         policyNumber: 'BHYT987654321',
         expiryDate: '2025-12-31'
      }
   }
]
