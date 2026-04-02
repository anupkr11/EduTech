import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function LearnCourse() {
  const { id } = useParams();

  // ✅ ALL HOOKS AT TOP
  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  // ✅ FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id]);

  // ✅ FETCH PROGRESS FROM BACKEND (IMPORTANT)
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress/my");

        const courseProgress = res.data.find(
          (p) => p.courseId._id === id
        );

        if (courseProgress) {
          setCompletedLessons(courseProgress.completedLessons);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgress();
  }, [id]);

  // ✅ MARK COMPLETE
  const markComplete = async () => {
    try {
      await API.patch(`/progress/${id}`, {
        lessonIndex: currentIndex,
      });

      setCompletedLessons((prev) =>
        prev.includes(currentIndex)
          ? prev
          : [...prev, currentIndex]
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SAFE CHECK AFTER HOOKS
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentVideo = course.lessons[currentIndex];

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
              className={`p-3 mb-3 rounded-lg cursor-pointer ${
                index === currentIndex
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-sm font-medium">{lesson.title}</p>

              {completedLessons.includes(index) && (
                <span className="text-green-600">✔</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <iframe
              src={currentVideo.video}
              className="w-full h-[500px]"
              allowFullScreen
              title="video"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold">
                {currentVideo.title}
              </h3>

              <button
                onClick={markComplete}
                className="bg-green-600 text-white px-5 py-2 mt-3 rounded"
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