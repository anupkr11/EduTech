import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/mockData";
import Navbar from "../components/Navbar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === Number(id));

  if (!course) return <div className="p-10">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 max-w-6xl mx-auto px-6 py-10">
        
        {/* Banner */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

        <p className="text-gray-600 mb-6">{course.description}</p>

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Instructor</p>
            <p>{course.instructor}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Level</p>
            <p>{course.level}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Duration</p>
            <p>{course.duration}</p>
          </div>
        </div>

        {/* CTA */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Enroll Now
        </button>

        <button
          onClick={() => navigate(-1)}
          className="ml-4 text-gray-600 underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}