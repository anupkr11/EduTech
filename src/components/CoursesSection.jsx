import { Star, Users, Clock } from 'lucide-react';
import { courses } from '../data/mockData';

export default function CoursesSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="courses">
      <div className="text-center mb-12">
        <h2
          className="text-4xl font-bold mb-4"
          data-testid="courses-section-title"
        >
          Popular Courses
        </h2>
        <p className="text-gray-600 text-lg">
          Choose from our most-loved courses designed by industry experts
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            data-testid={`course-card-${course.id}`}
          >
            <div className="relative h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                {course.level}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">
                  {course.category}
                </span>
              </div>

              <h3
                className="text-xl font-bold mb-2"
                data-testid={`course-title-${course.id}`}
              >
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {course.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star
                    className="text-yellow-500 fill-yellow-500"
                    size={16}
                  />
                  <span className="font-medium">
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>
                    {course.students.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span
                    className="text-2xl font-bold text-blue-600"
                    data-testid={`course-price-${course.id}`}
                  >
                    ₹{course.price}
                  </span>
                  <span className="text-gray-400 line-through ml-2">
                    ₹{course.originalPrice}
                  </span>
                </div>

                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(
                    ((course.originalPrice - course.price) /
                      course.originalPrice) *
                      100
                  )}
                  % OFF
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <img
                  src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">
                    {course.instructor}
                  </p>
                  <p className="text-xs text-gray-500">
                    Instructor
                  </p>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                data-testid={`enroll-button-${course.id}`}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          data-testid="view-all-courses-button"
        >
          View All 200+ Courses →
        </button>
      </div>
    </section>
  );
}