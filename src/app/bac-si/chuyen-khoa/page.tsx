'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { SpecialtyWithCategory } from '@/types/specialty';
import { specialtiesWithCategories, specialtyCategories } from '@/data/specialty-categories';

const SpecialtiesPage = () => {
   const searchParams = useSearchParams();
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   // Initialize search term from URL parameters
   useEffect(() => {
      const searchFromUrl = searchParams.get('search');
      if (searchFromUrl) {
         setSearchTerm(searchFromUrl);
      }
   }, [searchParams]);

   // Close dropdown when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   const filteredSpecialties = specialtiesWithCategories.filter((specialty) => {
      const matchesSearch =
         specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         specialty.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || specialty.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   const SpecialtyCard = ({ specialty }: { specialty: SpecialtyWithCategory }) => {
      const IconComponent = specialty.icon;

      return (
         <Link href={`/bac-si/chuyen-khoa/${specialty.id}`} className="group block">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
               <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${specialty.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                     >
                        <IconComponent className="h-8 w-8 text-white" />
                     </div>
                     <div className="text-right">
                        <div className="text-sm text-gray-500">Bác sĩ</div>
                        <div className="text-xl font-bold text-blue-600">
                           {specialty.doctorCount}
                        </div>
                     </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                     {specialty.name}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{specialty.description}</p>

                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                     <span>Xem bác sĩ chuyên khoa</span>
                     <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
               </div>
            </div>
         </Link>
      );
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Chuyên khoa</h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Tìm kiếm bác sĩ chuyên khoa phù hợp với nhu cầu khám chữa bệnh của bạn từ hơn
                     20 chuyên khoa khác nhau
                  </p>
               </div>
            </div>
         </div>

         {/* Search and Filter */}
         <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 lg:flex-[2] relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <input
                        type="text"
                        placeholder="Tìm kiếm chuyên khoa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     />
                  </div>

                  {/* Category Filter */}
                  <div className="flex-1 lg:w-64 lg:flex-none relative" ref={dropdownRef}>
                     <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={(e) => {
                           if (e.key === 'Escape') {
                              setIsDropdownOpen(false);
                           }
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                     >
                        <span className="text-gray-700 font-medium">
                           {specialtyCategories.find((c) => c.id === selectedCategory)?.name}
                        </span>
                        <ChevronDown
                           className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${
                              isDropdownOpen ? 'rotate-180' : ''
                           }`}
                        />
                     </button>

                     {isDropdownOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
                           <div className="py-1" role="listbox">
                              {specialtyCategories.map((category) => (
                                 <button
                                    key={category.id}
                                    onClick={() => {
                                       setSelectedCategory(category.id);
                                       setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                                       selectedCategory === category.id
                                          ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600'
                                          : 'text-gray-700'
                                    }`}
                                    role="option"
                                    aria-selected={selectedCategory === category.id}
                                 >
                                    {category.name}
                                    {selectedCategory === category.id && (
                                       <span className="ml-2 text-blue-600">✓</span>
                                    )}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Results count */}
            <div className="mb-8">
               <p className="text-gray-600">
                  Tìm thấy{' '}
                  <span className="font-semibold text-gray-900">{filteredSpecialties.length}</span>{' '}
                  chuyên khoa
                  {selectedCategory !== 'all' && (
                     <span>
                        {' '}
                        trong danh mục{' '}
                        <span className="font-semibold text-blue-600">
                           {specialtyCategories.find((c) => c.id === selectedCategory)?.name}
                        </span>
                     </span>
                  )}
               </p>
            </div>

            {/* Specialties Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredSpecialties.map((specialty) => (
                  <SpecialtyCard key={specialty.id} specialty={specialty} />
               ))}
            </div>

            {/* No results */}
            {filteredSpecialties.length === 0 && (
               <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                     <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                     Không tìm thấy chuyên khoa nào
                  </h3>
                  <p className="text-gray-600 mb-6">
                     Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục
                  </p>
                  <div className="space-x-4">
                     {searchTerm && (
                        <Link href={`/bac-si?search=${encodeURIComponent(searchTerm)}`}>
                           <Button variant="outline">Tìm bác sĩ thay thế</Button>
                        </Link>
                     )}
                     <Button
                        onClick={() => {
                           setSearchTerm('');
                           setSelectedCategory('all');
                        }}
                        variant="outline"
                     >
                        Xóa bộ lọc
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default SpecialtiesPage;
