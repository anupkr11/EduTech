import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            data-testid="categories-section-title"
          >
            Browse by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore courses across different domains and find your perfect
            learning path
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = Icons[category.icon] || Icons.Book;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 text-center"
                data-testid={`category-card-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {category.name}
                </h3>

                <p className="text-gray-600 text-sm">
                  {category.courses} Courses
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}