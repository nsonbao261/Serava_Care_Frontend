import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

const ExpertTeamSection = () => {
   const experts = [
      {
         name: 'PGS. TS. BS Nguyễn Văn Minh',
         title: 'Giám đốc Y khoa',
         specialty: 'Tim mạch can thiệp',
         experience: '20+ năm kinh nghiệm',
         education: 'Đại học Y Dược TP.HCM',
         image: '/images/experts/expert-1.jpg', // Placeholder image
      },
      {
         name: 'TS. BS Trần Thị Hương',
         title: 'Trưởng khoa Nhi',
         specialty: 'Nhi khoa - Nội tiết',
         experience: '15+ năm kinh nghiệm',
         education: 'Bệnh viện Nhi Đồng 1',
         image: '/images/experts/expert-2.jpg', // Placeholder image
      },
      {
         name: 'ThS. BS Lê Văn Đức',
         title: 'Phó Giám đốc Chuyên môn',
         specialty: 'Tiêu hóa - Gan mật',
         experience: '18+ năm kinh nghiệm',
         education: 'Bệnh viện Chợ Rẫy',
         image: '/images/experts/expert-3.jpg', // Placeholder image
      },
      {
         name: 'BS. CK2 Phạm Thị Lan',
         title: 'Trưởng khoa Sản',
         specialty: 'Sản phụ khoa',
         experience: '12+ năm kinh nghiệm',
         education: 'Bệnh viện Từ Dũ',
         image: '/images/experts/expert-4.jpg', // Placeholder image
      },
      {
         name: 'TS. BS Hoàng Minh Tuấn',
         title: 'Chuyên gia tư vấn',
         specialty: 'Thần kinh - Tâm thần',
         experience: '16+ năm kinh nghiệm',
         education: 'Viện Sức khỏe Tâm thần',
         image: '/images/experts/expert-5.jpg', // Placeholder image
      },
      {
         name: 'ThS. DS Nguyễn Thị Mai',
         title: 'Trưởng bộ phận Dược',
         specialty: 'Dược lâm sàng',
         experience: '14+ năm kinh nghiệm',
         education: 'Đại học Dược Hà Nội',
         image: '/images/experts/expert-6.jpg', // Placeholder image
      },
   ];

   return (
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ĐỘI NGŨ CHUYÊN GIA
               </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Hội đồng tham vấn y khoa cùng đội ngũ chuyên gia là các bác sĩ, dược sĩ hàng đầu
                  đảm bảo chất lượng dịch vụ chăm sóc sức khỏe tốt nhất cho bạn
               </p>

               {/* Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div className="flex flex-col items-center">
                     <div className="bg-blue-100 rounded-full p-4 mb-3">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                     </div>
                     <div className="text-2xl font-bold text-gray-900">50+</div>
                     <div className="text-gray-600 text-sm">Chuyên gia</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="bg-green-100 rounded-full p-4 mb-3">
                        <Users className="h-8 w-8 text-green-600" />
                     </div>
                     <div className="text-2xl font-bold text-gray-900">20+</div>
                     <div className="text-gray-600 text-sm">Chuyên khoa</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="bg-purple-100 rounded-full p-4 mb-3">
                        <Award className="h-8 w-8 text-purple-600" />
                     </div>
                     <div className="text-2xl font-bold text-gray-900">15+</div>
                     <div className="text-gray-600 text-sm">Năm kinh nghiệm</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="bg-orange-100 rounded-full p-4 mb-3">
                        <BookOpen className="h-8 w-8 text-orange-600" />
                     </div>
                     <div className="text-2xl font-bold text-gray-900">100+</div>
                     <div className="text-gray-600 text-sm">Nghiên cứu</div>
                  </div>
               </div>
            </div>

            {/* Expert Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {experts.map((expert, index) => (
                  <div
                     key={index}
                     className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                     <div className="p-6 text-center">
                        {/* Placeholder for expert image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                           <div className="text-white font-bold text-2xl">
                              {expert.name
                                 .split(' ')
                                 .slice(-2)
                                 .map((n) => n[0])
                                 .join('')}
                           </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{expert.name}</h3>

                        <div className="text-blue-600 font-semibold mb-3">{expert.title}</div>

                        <div className="space-y-2 text-sm text-gray-600">
                           <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {expert.specialty}
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              {expert.experience}
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              {expert.education}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
               <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Tạo nên một nguồn thông tin sức khỏe đáng tin cậy
               </h3>
               <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Dễ đọc, dễ hiểu cho mọi đối tượng với sự đảm bảo chất lượng từ đội ngũ chuyên gia
                  y tế hàng đầu
               </p>

               <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                     <Users className="h-6 w-6 text-blue-600 mr-3" />
                     <span className="text-gray-800 font-medium">
                        Biên soạn bởi Bác sĩ và Dược sĩ
                     </span>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                     <BookOpen className="h-6 w-6 text-green-600 mr-3" />
                     <span className="text-gray-800 font-medium">
                        Chính sách biên tập minh bạch
                     </span>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                     <Award className="h-6 w-6 text-purple-600 mr-3" />
                     <span className="text-gray-800 font-medium">Đảm bảo tính chính xác</span>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                  <div className="flex-1">
                     <Link href="/bac-si" className="block w-full">
                        <Button
                           size="lg"
                           className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
                        >
                           Xem danh sách bác sĩ
                        </Button>
                     </Link>
                  </div>
                  <div className="flex-1">
                     <Button
                        size="lg"
                        variant="outline"
                        className="w-full h-12 px-8 py-3 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
                     >
                        Tìm hiểu thêm về đội ngũ
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ExpertTeamSection;
