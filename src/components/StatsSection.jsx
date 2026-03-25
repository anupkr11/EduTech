import { stats } from '../data/mockData';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

export default function StatsSection() {
  const statsData = [
    {
      icon: Users,
      label: 'Active Students',
      value: stats.totalStudents,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: stats.totalCourses,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: stats.successRate,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      label: 'Expert Instructors',
      value: stats.instructors,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-item-${index}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} mb-4`}
                >
                  <Icon size={32} />
                </div>

                <h3
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  data-testid={`stat-value-${index}`}
                >
                  {stat.value}
                </h3>

                <p className="text-blue-100 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}