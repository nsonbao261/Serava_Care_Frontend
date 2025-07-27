export const mockVitalSigns: VitalSign[] = [
   {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      status: 'normal',
      note: 'Huyết áp bình thường'
   },
   {
      id: '2',
      type: 'heart_rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-15',
      status: 'normal'
   },
   {
      id: '3',
      type: 'weight',
      value: '65',
      unit: 'kg',
      date: '2024-01-14',
      status: 'normal'
   },
   {
      id: '4',
      type: 'temperature',
      value: '36.5',
      unit: '°C',
      date: '2024-01-14',
      status: 'normal'
   },
   {
      id: '5',
      type: 'blood_sugar',
      value: '95',
      unit: 'mg/dL',
      date: '2024-01-13',
      status: 'normal'
   }
]

export const mockMedicalRecords: MedicalRecord[] = [
   {
      id: '1',
      date: '2024-01-15',
      type: 'checkup',
      title: 'Khám sức khỏe tổng quát',
      doctor: 'BS. Nguyễn Văn A',
      specialty: 'Nội tổng quát',
      summary:
         'Khám tổng quát định kỳ, các chỉ số sức khỏe đều ở mức bình thường. Khuyến nghị duy trì lối sống lành mạnh.',
      status: 'completed',
      attachments: ['ket-qua-xet-nghiem.pdf', 'bao-cao-kham.pdf']
   },
   {
      id: '2',
      date: '2024-01-10',
      type: 'lab_result',
      title: 'Kết quả xét nghiệm máu',
      doctor: 'BS. Trần Thị B',
      specialty: 'Xét nghiệm',
      summary: 'Xét nghiệm máu tổng quát, các chỉ số trong giới hạn bình thường.',
      status: 'completed',
      attachments: ['xet-nghiem-mau.pdf']
   },
   {
      id: '3',
      date: '2024-01-05',
      type: 'consultation',
      title: 'Tư vấn dinh dưỡng',
      doctor: 'BS. Lê Văn C',
      specialty: 'Dinh dưỡng',
      summary: 'Tư vấn chế độ ăn uống phù hợp với tình trạng sức khỏe hiện tại.',
      status: 'completed'
   },
   {
      id: '4',
      date: '2024-02-01',
      type: 'checkup',
      title: 'Tái khám định kỳ',
      doctor: 'BS. Nguyễn Văn A',
      specialty: 'Nội tổng quát',
      summary: 'Lịch tái khám định kỳ sau 2 tuần.',
      status: 'scheduled'
   }
]
