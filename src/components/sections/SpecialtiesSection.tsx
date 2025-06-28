import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SpecialtyCard } from "@/types/specialty";
import { homepageSpecialties } from "@/data/specialties";
import { ChevronRight } from "lucide-react";

const SpecialtiesSection = () => {
  const SpecialtyCard = ({ specialty }: { specialty: SpecialtyCard }) => {
    const IconComponent = specialty.icon;

    return (
      <Link
        href={`/bac-si/chuyen-khoa/${specialty.id}`}
        className="group block"
      >
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-r ${specialty.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Bác sĩ</div>
                <div className="text-lg font-bold text-blue-600">
                  {specialty.doctorCount}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {specialty.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {specialty.description}
            </p>

            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
              <span>Xem bác sĩ</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chuyên khoa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tìm kiếm bác sĩ chuyên khoa phù hợp với nhu cầu khám chữa bệnh của
            bạn
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {homepageSpecialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/bac-si/chuyen-khoa">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
            >
              Xem tất cả chuyên khoa
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
