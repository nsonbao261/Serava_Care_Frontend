"use client";

import { MorphingButton } from "@/components/ui/morphing-button";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Search, Calendar, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Define specialty keywords for smart routing
  const specialtyKeywords = [
    // General terms
    "chuyên khoa",
    "khoa",
    "chuyên môn",
    "lĩnh vực",

    // Medical specialties
    "tim mạch",
    "tim",
    "mạch máu",
    "cao huyết áp",
    "mạch vành",
    "nhi khoa",
    "nhi",
    "trẻ em",
    "pediatric",
    "sản phụ khoa",
    "sản khoa",
    "phụ khoa",
    "thai sản",
    "sinh nở",
    "ngoại khoa",
    "ngoại",
    "phẫu thuật",
    "surgery",
    "nội khoa",
    "nội",
    "internal medicine",
    "tiêu hóa",
    "gan mật",
    "dạ dày",
    "đại tràng",
    "gan",
    "mật",
    "thần kinh",
    "não",
    "đột quỵ",
    "động kinh",
    "neurolog",
    "hô hấp",
    "phổi",
    "hen suyễn",
    "respiratory",
    "tiết niệu",
    "thận",
    "bàng quang",
    "urology",
    "cơ xương khớp",
    "xương khớp",
    "cột sống",
    "orthopedic",
    "mắt",
    "nhãn khoa",
    "thị lực",
    "ophthalmology",
    "tai mũi họng",
    "tai",
    "mũi",
    "họng",
    "ent",
    "da liễu",
    "da",
    "dermatology",
    "thẩm mỹ da",
    "răng hàm mặt",
    "răng",
    "nha khoa",
    "dental",
    "ung bướu",
    "ung thư",
    "oncology",
    "nội tiết",
    "đái tháo đường",
    "tuyến giáp",
    "endocrinology",
    "phục hồi chức năng",
    "vật lý trị liệu",
    "rehabilitation",
    "dược học",
    "thuốc",
    "pharmacy",
    "dinh dưỡng",
    "nutrition",
    "bác sĩ gia đình",
    "family medicine",
  ];

  const handleSearch = () => {
    const searchText = searchTerm.trim().toLowerCase();

    if (!searchText) {
      router.push("/bac-si");
      return;
    }

    // Check if search term contains specialty keywords
    const isSpecialtySearch = specialtyKeywords.some((keyword) =>
      searchText.includes(keyword.toLowerCase())
    );

    // Check if search contains doctor-specific terms
    const doctorKeywords = [
      "bác sĩ",
      "bs",
      "thầy thuốc",
      "tiến sĩ",
      "ts",
      "phó giáo sư",
      "pgs",
      "giáo sư",
      "gs",
    ];
    const isDoctorSearch = doctorKeywords.some((keyword) =>
      searchText.includes(keyword.toLowerCase())
    );

    // Smart routing based on search content
    if (isSpecialtySearch && !isDoctorSearch) {
      // Pure specialty search
      router.push(
        `/bac-si/chuyen-khoa?search=${encodeURIComponent(searchTerm.trim())}`
      );
    } else if (isDoctorSearch && !isSpecialtySearch) {
      // Pure doctor search
      router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`);
    } else if (isSpecialtySearch && isDoctorSearch) {
      // Mixed search - prioritize doctors page as it's more specific
      router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // General search - default to doctors page
      router.push(`/bac-si?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <ParticleBackground particleCount={30} particleColor="#3b82f6" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="animate-slide-in">Đặt lịch khám bệnh</span>
            <span className="block text-blue-600">
              <TypewriterText
                texts={[
                  "Dễ dàng & Nhanh chóng",
                  "Tiện lợi & Tin cậy",
                  "Chuyên nghiệp & Uy tín",
                ]}
                speed={120}
                pauseDuration={2500}
              />
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng với hơn 1000 bác sĩ, 25
            bệnh viện, 100 phòng khám trên toàn quốc
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 px-2 sm:px-0">
            <div className="flex items-center bg-white rounded-full shadow-lg hover:shadow-xl px-3 sm:px-6 py-3 sm:py-4 border border-gray-200 min-h-[48px] sm:min-h-[56px] transition-all duration-300">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm bác sĩ, chuyên khoa, bệnh viện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 outline-none text-gray-700 min-w-0 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base focus:placeholder-transparent transition-all"
              />
              <MorphingButton
                onClick={handleSearch}
                className="ml-2 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-base whitespace-nowrap font-medium border-0"
                morphText="Tìm ngay!"
                size="sm"
              >
                Tìm kiếm
              </MorphingButton>
            </div>
          </div>

          {/* Animated Quick Search Suggestions */}
          <div className="max-w-4xl mx-auto mb-8 px-2">
            <p
              className="text-sm text-gray-500 mb-3 animate-fade-in-up"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              Tìm kiếm phổ biến:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Bác sĩ tim mạch",
                "Chuyên khoa nhi",
                "Sản phụ khoa",
                "Bác sĩ da liễu",
                "Tiêu hóa gan mật",
                "Thần kinh",
              ].map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchTerm(suggestion);
                    // Auto-trigger search
                    const searchText = suggestion.toLowerCase();
                    const isSpecialtySearch = specialtyKeywords.some(
                      (keyword) => searchText.includes(keyword.toLowerCase())
                    );
                    const doctorKeywords = [
                      "bác sĩ",
                      "bs",
                      "thầy thuốc",
                      "tiến sĩ",
                      "ts",
                      "phó giáo sư",
                      "pgs",
                      "giáo sư",
                      "gs",
                    ];
                    const isDoctorSearch = doctorKeywords.some((keyword) =>
                      searchText.includes(keyword.toLowerCase())
                    );

                    if (isSpecialtySearch && !isDoctorSearch) {
                      router.push(
                        `/bac-si/chuyen-khoa?search=${encodeURIComponent(
                          suggestion
                        )}`
                      );
                    } else {
                      router.push(
                        `/bac-si?search=${encodeURIComponent(suggestion)}`
                      );
                    }
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-all duration-200 hover-lift animate-fade-in-up"
                  style={{
                    animationDelay: `${1 + index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 max-w-2xl mx-auto">
            <div className="w-full sm:flex-1">
              <Link href="/bac-si" className="block w-full">
                <MorphingButton
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full border-0"
                  morphText="Đặt ngay!"
                  onClick={() => {}}
                >
                  <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Đặt khám ngay
                </MorphingButton>
              </Link>
            </div>
            <div className="w-full sm:flex-1">
              <MorphingButton
                variant="outline"
                size="lg"
                className="w-full border-gray-300 text-gray-700 hover:text-blue-700 hover:border-blue-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                morphText="Xem ngay!"
                onClick={() => {}}
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Xem video hướng dẫn
              </MorphingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
