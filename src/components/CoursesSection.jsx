import { Star, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/api";

export default function CoursesSection({ selectedCategory = "All" }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 6;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, selectedCategory]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || course.category === category) &&
      (selectedCategory === "All" || course.category === selectedCategory)
    );
  });

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
            All Courses
          </h2>
          <p className="text-gray-600">
            Browse our complete catalog of courses and find your next learning journey
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search courses or instructors..."
            className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category */}
          <select
            className="border border-gray-300 px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="DevOps">DevOps</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Database">Database</option>
          </select>
        </div>

        {/* Course Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredCourses.length} courses
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={course.image || course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">
                    {course.category}
                  </p>

                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      {course.rating || "4.5"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.students ? course.students.toLocaleString() : "0"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-blue-600">
                        ₹{course.price || 0}
                      </span>
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        ₹{course.originalPrice || 0}
                      </span>
                    </div>

                    {course.originalPrice && (
                      <span className="text-green-600 text-sm font-semibold">
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${course.instructor}`}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">
                      {course.instructor}
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:scale-105 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No courses found 😔
            </p>
          )}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </section>
  );
}