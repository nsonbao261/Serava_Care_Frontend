'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
   Phone,
   Mail,
   MapPin,
   Facebook,
   Youtube,
   Instagram,
   MessageCircle,
   Smartphone,
   ChevronDown,
} from 'lucide-react';

const Footer = () => {
   const currentYear = new Date().getFullYear();
   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

   const toggleDropdown = (section: string) => {
      setActiveDropdown(activeDropdown === section ? null : section);
   };

   const quickLinks = [
      { label: 'Đặt khám Bác sĩ', href: '/dat-kham/bac-si' },
      { label: 'Đặt khám Bệnh viện', href: '/dat-kham/benh-vien' },
      { label: 'Đặt khám Phòng khám', href: '/dat-kham/phong-kham' },
      { label: 'Chuyên khoa', href: '/bac-si/chuyen-khoa' },
      { label: 'Bác sĩ nổi bật', href: '/bac-si-noi-bat' },
      { label: 'Cơ sở y tế', href: '/co-so-y-te' },
   ];

   const serviceLinks = [
      { label: 'Tư vấn trực tuyến', href: '/tu-van-truc-tuyen' },
      { label: 'Hỏi đáp bác sĩ', href: '/hoi-dap' },
      { label: 'Hồ sơ sức khỏe', href: '/ho-so-suc-khoe' },
      { label: 'Mua thuốc online', href: '/mua-thuoc' },
      { label: 'Xét nghiệm tại nhà', href: '/xet-nghiem' },
      { label: 'Khám sức khỏe định kỳ', href: '/kham-dinh-ky' },
   ];

   const supportLinks = [
      { label: 'Trung tâm hỗ trợ', href: '/ho-tro' },
      { label: 'Điều khoản sử dụng', href: '/dieu-khoan' },
      { label: 'Chính sách bảo mật', href: '/bao-mat' },
      { label: 'Quy trình khiếu nại', href: '/khieu-nai' },
      { label: 'Hướng dẫn sử dụng', href: '/huong-dan' },
      { label: 'Liên hệ', href: '/lien-he' },
   ];

   const partnerLinks = [
      { label: 'Trở thành đối tác', href: '/doi-tac' },
      { label: 'Dành cho bác sĩ', href: '/danh-cho-bac-si' },
      { label: 'Dành cho cơ sở y tế', href: '/danh-cho-co-so-y-te' },
      { label: 'Chương trình liên kết', href: '/lien-ket' },
   ];

   return (
      <footer className="bg-gray-900 text-white">
         {/* Main Footer Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Company Info */}
               <div className="lg:col-span-1">
                  <div className="flex items-center mb-6">
                     <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded-lg mr-3">
                        SC
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xl font-bold">Serava</span>
                        <span className="text-sm text-blue-400 font-medium">Care</span>
                     </div>
                  </div>

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                     Ứng dụng chăm sóc sức khỏe trực tuyến 24/7, kết nối bạn với hơn 1000 bác sĩ và
                     125 cơ sở y tế uy tín trên toàn quốc.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3">
                     <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-blue-400 mr-3" />
                        <span>Hotline: 1900-2805</span>
                     </div>
                     <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-blue-400 mr-3" />
                        <span>support@seravacare.vn</span>
                     </div>
                     <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-blue-400 mr-3 mt-0.5" />
                        <span>Tầng 10, Tòa nhà ABC, 123 Nguyễn Trãi, Thanh Xuân, Hà Nội</span>
                     </div>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <button
                     onClick={() => toggleDropdown('quickLinks')}
                     className="flex items-center justify-between w-full text-lg font-semibold mb-6 md:cursor-default"
                  >
                     <span>Đặt lịch khám</span>
                     <ChevronDown
                        className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                           activeDropdown === 'quickLinks' ? 'rotate-180' : ''
                        }`}
                     />
                  </button>
                  <ul
                     className={`space-y-3 ${
                        activeDropdown === 'quickLinks' ? 'block' : 'hidden md:block'
                     }`}
                  >
                     {quickLinks.map((link) => (
                        <li key={link.href}>
                           <Link
                              href={link.href}
                              className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Services */}
               <div>
                  <button
                     onClick={() => toggleDropdown('services')}
                     className="flex items-center justify-between w-full text-lg font-semibold mb-6 md:cursor-default"
                  >
                     <span>Dịch vụ</span>
                     <ChevronDown
                        className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                           activeDropdown === 'services' ? 'rotate-180' : ''
                        }`}
                     />
                  </button>
                  <ul
                     className={`space-y-3 ${
                        activeDropdown === 'services' ? 'block' : 'hidden md:block'
                     }`}
                  >
                     {serviceLinks.map((link) => (
                        <li key={link.href}>
                           <Link
                              href={link.href}
                              className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support & Partners */}
               <div>
                  <button
                     onClick={() => toggleDropdown('support')}
                     className="flex items-center justify-between w-full text-lg font-semibold mb-6 md:cursor-default"
                  >
                     <span>Hỗ trợ & Đối tác</span>
                     <ChevronDown
                        className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                           activeDropdown === 'support' ? 'rotate-180' : ''
                        }`}
                     />
                  </button>
                  <div className={`${activeDropdown === 'support' ? 'block' : 'hidden md:block'}`}>
                     <ul className="space-y-3 mb-6">
                        {supportLinks.map((link) => (
                           <li key={link.href}>
                              <Link
                                 href={link.href}
                                 className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                              >
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>

                     <h4 className="text-md font-semibold mb-4">Đối tác</h4>
                     <ul className="space-y-3">
                        {partnerLinks.map((link) => (
                           <li key={link.href}>
                              <Link
                                 href={link.href}
                                 className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                              >
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            {/* App Download Section */}
            <div className="border-t border-gray-700 mt-12 pt-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                     <button
                        onClick={() => toggleDropdown('appDownload')}
                        className="flex items-center justify-between w-full text-xl font-semibold mb-4 md:cursor-default"
                     >
                        <span>Tải ứng dụng Serava Care</span>
                        <ChevronDown
                           className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                              activeDropdown === 'appDownload' ? 'rotate-180' : ''
                           }`}
                        />
                     </button>
                     <div
                        className={`${
                           activeDropdown === 'appDownload' ? 'block' : 'hidden md:block'
                        }`}
                     >
                        <p className="text-gray-300 mb-6">
                           Đặt lịch khám bệnh và tư vấn sức khỏe mọi lúc, mọi nơi
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                           <Link
                              href="/download/ios"
                              className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200"
                           >
                              <Smartphone className="h-5 w-5" />
                              <div className="text-left">
                                 <div className="text-xs">Tải về trên</div>
                                 <div className="text-sm font-semibold">App Store</div>
                              </div>
                           </Link>
                           <Link
                              href="/download/android"
                              className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200"
                           >
                              <Smartphone className="h-5 w-5" />
                              <div className="text-left">
                                 <div className="text-xs">Tải về trên</div>
                                 <div className="text-sm font-semibold">Google Play</div>
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-2">1000+</div>
                        <div className="text-sm text-gray-300">Bác sĩ đồng hành</div>
                     </div>
                     <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-2">125+</div>
                        <div className="text-sm text-gray-300">Cơ sở y tế hàng đầu</div>
                     </div>
                     <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-2">500K+</div>
                        <div className="text-sm text-gray-300">Người dùng tin tưởng</div>
                     </div>
                     <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
                        <div className="text-sm text-gray-300">Hỗ trợ trực tuyến</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Social Media */}
            <div className="border-t border-gray-700 mt-8 pt-8">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                     <button
                        onClick={() => toggleDropdown('social')}
                        className="flex items-center justify-between w-full text-lg font-semibold mb-4 md:cursor-default"
                     >
                        <span>Kết nối với chúng tôi</span>
                        <ChevronDown
                           className={`h-4 w-4 md:hidden transition-transform duration-200 ${
                              activeDropdown === 'social' ? 'rotate-180' : ''
                           }`}
                        />
                     </button>
                     <div
                        className={`flex space-x-4 ${
                           activeDropdown === 'social' ? 'flex' : 'hidden md:flex'
                        }`}
                     >
                        <Link
                           href="https://facebook.com/seravacare"
                           className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
                        >
                           <Facebook className="h-5 w-5" />
                        </Link>
                        <Link
                           href="https://youtube.com/seravacare"
                           className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-200"
                        >
                           <Youtube className="h-5 w-5" />
                        </Link>
                        <Link
                           href="https://instagram.com/seravacare"
                           className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors duration-200"
                        >
                           <Instagram className="h-5 w-5" />
                        </Link>
                        <Link
                           href="https://zalo.me/seravacare"
                           className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors duration-200"
                        >
                           <MessageCircle className="h-5 w-5" />
                        </Link>
                     </div>
                  </div>

                  {/* Certifications */}
                  <div className="text-center md:text-right">
                     <div className="flex items-center space-x-4 mb-2">
                        <div className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-semibold">
                           ISO 27001:2013
                        </div>
                        <div className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-semibold">
                           HIPAA Compliant
                        </div>
                     </div>
                     <div className="text-xs text-gray-400">
                        Được chứng nhận bảo mật và quy chuẩn y tế quốc tế
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="bg-gray-950 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                  <div className="mb-4 md:mb-0">
                     <p>
                        © {currentYear} Công ty TNHH Serava Care Việt Nam. Tất cả quyền được bảo
                        lưu.
                     </p>
                     <p className="mt-1">
                        Giấy phép ĐKKD số 0123456789 do Sở KH&ĐT TP. Hồ Chí Minh cấp ngày
                        01/01/2024.
                     </p>
                  </div>
                  <div className="flex items-center space-x-4">
                     <Link href="/dmca" className="hover:text-white transition-colors duration-200">
                        DMCA Protected
                     </Link>
                     <Link
                        href="/bo-cong-thuong"
                        className="hover:text-white transition-colors duration-200"
                     >
                        Đăng ký Bộ Công Thương
                     </Link>
                  </div>
               </div>

               {/* Disclaimer */}
               <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 text-center">
                     Các thông tin trên Serava Care chỉ dành cho mục đích tham khảo, tra cứu và
                     không thay thế cho việc chẩn đoán hoặc điều trị y khoa. Cần tuyệt đối tuân theo
                     hướng dẫn của Bác sĩ và Nhân viên y tế.
                  </p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
