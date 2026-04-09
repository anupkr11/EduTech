import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LearnCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // fetch course details
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

  // fetch progress from backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress/my");

        const courseProgress = res.data.find((p) => p.courseId._id === id);

        if (courseProgress) {
          setCompletedLessons(courseProgress.completedLessons);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgress();
  }, [id]);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await API.get("/progress/my");

        const hasAccess = res.data.some((p) => p.courseId._id === id);

        setIsEnrolled(hasAccess);
      } catch (err) {
        console.error(err);
      }
    };

    checkAccess();
  }, [id]);

  // MARK COMPLETE
  const markComplete = async () => {
    try {
      await API.patch(`/progress/${id}`, {
        lessonIndex: currentIndex,
      });

      setCompletedLessons((prev) =>
        prev.includes(currentIndex) ? prev : [...prev, currentIndex],
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentVideo = course.lessons[currentIndex];

  const progressPercent = Math.round(
    (completedLessons.length / course.lessons.length) * 100,
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

          {course.lessons.map((lesson, index) => {
            const isLocked = !isEnrolled && index !== 0;

            return (
              <div
                key={index}
                onClick={() => {
                  if (isLocked) {
                    alert("🔒 Please enroll to unlock this lesson");
                    return;
                  }
                  setCurrentIndex(index);
                }}
                className={`p-3 mb-3 rounded-lg cursor-pointer flex justify-between ${
                  index === currentIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                <p className="text-sm font-medium">{lesson.title}</p>

                {isLocked ? (
                  <span className="text-gray-400">🔒</span>
                ) : completedLessons.includes(index) ? (
                  <span className="text-green-600">✔</span>
                ) : null}
              </div>
            );
          })}
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
              <h3 className="text-xl font-bold">{currentVideo.title}</h3>

              {!isEnrolled ? (
                <button
                  onClick={() => navigate(`/payment/${id}`)}
                  className="bg-blue-600 text-white px-5 py-2 mt-3 rounded"
                >
                  🔓 Unlock Full Course
                </button>
              ) : (
                <button
                  onClick={markComplete}
                  className="bg-green-600 text-white px-5 py-2 mt-3 rounded"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
