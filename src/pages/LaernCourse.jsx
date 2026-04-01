import { useParams } from "react-router-dom";
import { courses } from "../data/mockData";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function LearnCourse() {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 load progress from localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    return JSON.parse(localStorage.getItem(`progress_${id}`)) || [];
  });

  const currentVideo = course.lessons[currentIndex];

  // 🔥 save progress
  useEffect(() => {
    localStorage.setItem(`progress_${id}`, JSON.stringify(completedLessons));
  }, [completedLessons, id]);

  // 🔥 mark complete
  const markComplete = () => {
    if (!completedLessons.includes(currentIndex)) {
      setCompletedLessons(prev => [...prev, currentIndex]);
    }
  };

  const progressPercent = Math.round(
    (completedLessons.length / course.lessons.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex pt-20">

        {/* LEFT PANEL */}
        <div className="w-[300px] bg-white h-screen overflow-y-auto border-r p-4">
          <h2 className="font-bold text-lg mb-4">{course.title}</h2>

          <p className="text-sm mb-4 text-blue-600 font-semibold">
            Progress: {progressPercent}%
          </p>

          {course.lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`p-3 mb-3 rounded-lg cursor-pointer transition flex justify-between items-center ${
                index === currentIndex
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div>
                <p className="text-sm font-medium">{lesson.title}</p>
                <p className="text-xs text-gray-500">{lesson.duration}</p>
              </div>

              {/* ✔️ CHECK */}
              {completedLessons.includes(index) && (
                <span className="text-green-600 font-bold">✔</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <iframe
              src={currentVideo.video}
              title="Course Video"
              className="w-full h-[500px]"
              allowFullScreen
            />

            <div className="p-4">
              <h3 className="text-xl font-bold mb-3">
                {currentVideo.title}
              </h3>

              <button
                onClick={markComplete}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Mark as Completed
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}