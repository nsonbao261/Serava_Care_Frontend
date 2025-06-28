import { Stethoscope, Building2, Users, Activity, Eye } from 'lucide-react';
import { GlowCard } from '@/components/ui/glow-card';

const StatisticsSection = () => {
   const stats = [
      {
         icon: Activity,
         number: 3000000,
         suffix: '+',
         label: 'Lượt khám',
         color: 'text-cyan-500',
         bgColor: 'bg-cyan-50',
         glowColor: '#06b6d4',
      },
      {
         icon: Building2,
         number: 300,
         suffix: '+',
         label: 'Cơ sở Y tế',
         color: 'text-blue-500',
         bgColor: 'bg-blue-50',
         glowColor: '#3b82f6',
      },
      {
         icon: Building2,
         number: 50,
         suffix: '+',
         label: 'Bệnh viện',
         color: 'text-purple-500',
         bgColor: 'bg-purple-50',
         glowColor: '#8b5cf6',
      },
      {
         icon: Stethoscope,
         number: 1000,
         suffix: '+',
         label: 'Bác sĩ',
         color: 'text-green-500',
         bgColor: 'bg-green-50',
         glowColor: '#10b981',
      },
      {
         icon: Users,
         number: 850000,
         suffix: '+',
         label: 'Lượt truy cập tháng',
         color: 'text-pink-500',
         bgColor: 'bg-pink-50',
         glowColor: '#ec4899',
      },
      {
         icon: Eye,
         number: 28300,
         suffix: '+',
         label: 'Lượt truy cập trong ngày',
         color: 'text-orange-500',
         bgColor: 'bg-orange-50',
         glowColor: '#f97316',
      },
   ];

   return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-gradient animate-text-reveal">
                  THỐNG KÊ
               </h2>
            </div>

            <GlowCard
               className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover-lift"
               glowColor="#3b82f6"
               intensity="low"
            >
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {stats.map((stat, index) => {
                     const IconComponent = stat.icon;
                     return (
                        <div
                           key={index}
                           className="text-center group hover-scale-up"
                           style={{ animationDelay: `${index * 0.1}s` }}
                        >
                           <div className="flex justify-center mb-4">
                              <div
                                 className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center group-hover:animate-heartbeat transition-all duration-300 hover-glow relative overflow-hidden`}
                              >
                                 <IconComponent className={`h-8 w-8 ${stat.color} relative z-10`} />
                                 <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"
                                    style={{ backgroundColor: `${stat.glowColor}20` }}
                                 />
                              </div>
                           </div>
                           <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                              <span className="text-shimmer">
                                 {stat.number.toLocaleString()}
                                 {stat.suffix}
                              </span>
                           </div>
                           <div className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors">
                              {stat.label}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </GlowCard>
         </div>
      </section>
   );
};

export default StatisticsSection;
