import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/authContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // FETCH COURSE + ENROLLMENT STATUS
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get course
        const courseRes = await API.get(`/courses/${id}`);
        setCourse(courseRes.data);

        // Get user progress
        const progressRes = await API.get("/progress/my");

        const enrolled = progressRes.data.some((p) => p.courseId?._id === id);

        setIsEnrolled(enrolled);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // LOADING STATE
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 max-w-6xl mx-auto px-6 py-10">
        {/* COURSE BANNER */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

        <p className="text-gray-600 mb-6">{course.description}</p>

        {/* INFO CARDS */}
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

        {/* CTA BUTTON */}
        {!isEnrolled ? (
          <button
            onClick={() => {
              if (!isAuthenticated) {
                alert("Please login to enroll");
                navigate("/");
                return;
              }
              navigate(`/payment/${course._id}`);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
          >
            Enroll Now
          </button>
        ) : (
          <button className="bg-gray-400 text-white px-8 py-3 rounded-lg cursor-not-allowed">
            Already Enrolled
          </button>
        )}

        <button
          onClick={() => navigate(-1)}
          className="ml-4 text-gray-600 underline cursor-pointer"
        >
          ← Back
        </button>

        {/* COURSE CONTENT */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Course Content</h2>

        <div className="space-y-3">
          {course.lessons?.map((lesson, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <span>
                {index + 1}. {lesson.title}
              </span>

              {/* LOCK/UNLOCK LOGIC */}
              {isEnrolled || index === 0 ? (
                <button
                  onClick={() =>
                    navigate(`/learn/${course._id}?lesson=${index}`)
                  }
                  className="text-green-600 font-semibold cursor-pointer"
                >
                  ▶ {index === 0 ? "Preview" : "Play"}
                </button>
              ) : (
                <span className="text-gray-400">🔒 Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
