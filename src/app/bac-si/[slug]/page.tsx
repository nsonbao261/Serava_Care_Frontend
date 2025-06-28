"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Star,
  GraduationCap,
  Building2,
  Award,
  Calendar,
  User,
  Phone,
  Mail,
  Share2,
  ChevronRight,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import { mockDoctorDetails } from "@/data/doctor-details";

export default function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const doctor = mockDoctorDetails[slug];

  if (!doctor) {
    notFound();
  }

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .slice(-2)
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/bac-si" className="hover:text-blue-600">
              Danh sách bác sĩ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{doctor.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  {/* Doctor Image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-white font-bold text-3xl">
                      {generateInitials(doctor.name)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h1 className="text-3xl font-bold text-gray-900">
                            {doctor.name}
                          </h1>
                        </div>
                        <p className="text-lg text-gray-600 mb-2">
                          {doctor.title}
                        </p>
                        <div className="flex items-center text-blue-600 mb-3">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          <span className="font-medium">
                            {doctor.specialty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Chia sẻ
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Lưu
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Building2 className="h-5 w-5 mr-2" />
                        <span>{doctor.hospital}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{doctor.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="h-5 w-5 mr-2 text-yellow-400" />
                        <span>
                          {doctor.rating} ({doctor.reviewCount} đánh giá)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-green-600">
                        {doctor.consultationFee}
                      </div>
                      <span className="text-gray-500">phí tư vấn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Giới thiệu
              </h2>
              <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Học vấn</h2>
              <div className="space-y-3">
                {doctor.education.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Thành tích & Chứng chỉ
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doctor.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Section */}
            {doctor.articles.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Bài viết của {doctor.name}
                </h2>
                <div className="space-y-4">
                  {doctor.articles.map((article) => (
                    <div
                      key={article.id}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{doctor.name}</span>
                        <span>•</span>
                        <span>{article.publishDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Đặt lịch khám
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phí khám:</span>
                  <span className="text-xl font-bold text-green-600">
                    {doctor.consultationFee}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.workingHours}</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                Đặt lịch khám ngay
              </Button>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.email}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ngôn ngữ</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Đánh giá bệnh nhân
              </h3>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(doctor.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">
                  {doctor.rating}
                </span>
                <span className="ml-1 text-gray-500">
                  ({doctor.reviewCount} đánh giá)
                </span>
              </div>

              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Nguyễn T.</div>
                      <div className="text-xs text-gray-500">2 ngày trước</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    &ldquo;Bác sĩ rất tận tâm và chu đáo. Giải thích rõ ràng về
                    tình trạng bệnh.&rdquo;
                  </p>
                  <div className="flex items-center mt-2">
                    <ThumbsUp className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">Hữu ích (5)</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Xem tất cả đánh giá
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
