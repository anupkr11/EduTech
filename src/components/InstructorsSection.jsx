import { instructors } from '../data/mockData';
import { Users, BookOpen, Star } from 'lucide-react';

export default function InstructorsSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="instructors-section-title">
            Learn from Industry Experts
          </h2>
          <p className="text-gray-600 text-lg">
            Our instructors bring real-world experience from top tech companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              data-testid={`instructor-card-${instructor.id}`}
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
              />
              <h3 className="text-xl font-bold mb-1" data-testid={`instructor-name-${instructor.id}`}>
                {instructor.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{instructor.role}</p>
              <p className="text-sm font-semibold text-blue-600 mb-4">{instructor.company}</p>

              <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{(instructor.students / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{instructor.courses}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span>{instructor.rating}</span>
                </div>
              </div>

              <button className="text-blue-600 font-semibold hover:underline" data-testid={`view-instructor-${instructor.id}`}>
                View Profile →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}