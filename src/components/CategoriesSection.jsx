import { categories } from "../data/mockData";
import * as Icons from "lucide-react";

export default function CategoriesSection({
  setSelectedCategory,
  onCategoryClick,
  selectedCategory,
}) {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore courses across different domains and find your perfect
            learning path
          </p>
        </div>

        {/* 🔥 Show All */}
        <div className="text-center mb-6">
          <button
            onClick={() => onCategoryClick("All")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = Icons[category.icon] || Icons.Book;

            return (
              <div
                key={index}
                onClick={() => onCategoryClick(category.name)} // 🔥 CLICK
                className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-300 text-center hover:-translate-y-1 ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    selectedCategory === category.name
                      ? "bg-white/20"
                      : "bg-blue-100"
                  }`}
                >
                  <Icon
                    className={
                      selectedCategory === category.name
                        ? "text-white"
                        : "text-blue-600"
                    }
                    size={28}
                  />
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {category.name}
                </h3>

                <p
                  className={`text-sm ${
                    selectedCategory === category.name
                      ? "text-white/80"
                      : "text-gray-600"
                  }`}
                >
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