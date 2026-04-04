import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";
import jsPDF from "jspdf";

import { BookOpen, Clock, Award, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState([]);

  // 🔥 FETCH PROGRESS
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress/my");
        setProgressData(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) fetchProgress();
  }, [isAuthenticated]);

  // 🔥 AUTH CHECK
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  // 🔥 SPLIT DATA
  const completedCourses = progressData.filter(
    (p) =>
      p.courseId &&
      p.courseId.lessons &&
      p.completedLessons?.length === p.courseId.lessons.length
  );

  const inProgressCourses = progressData.filter(
    (p) =>
      p.courseId &&
      p.courseId.lessons &&
      p.completedLessons?.length !== p.courseId.lessons.length
  );

  // 🔥 STATS
  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled",
      value: progressData.length,
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: completedCourses.length,
    },
    {
      icon: Clock,
      label: "Lessons",
      value: progressData.reduce(
        (acc, p) => acc + (p.completedLessons?.length || 0),
        0
      ),
    },
    {
      icon: Award,
      label: "Courses",
      value: progressData.length,
    },
  ];

  // 🔥 CERTIFICATE
  const generateCertificate = (courseTitle) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");

    doc.setFontSize(22);
    doc.text("Certificate of Completion", 45, 40);

    doc.setFontSize(14);
    doc.text("This is to certify that", 65, 60);

    doc.setFontSize(18);
    doc.text(user.name, 80, 75);

    doc.setFontSize(14);
    doc.text("has successfully completed the course", 35, 90);

    doc.setFontSize(16);
    doc.text(courseTitle, 55, 105);

    doc.setFontSize(12);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      75,
      130
    );

    doc.save(`${courseTitle}-certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* 🔥 WELCOME */}
        <h1 className="text-3xl font-bold mb-8">
          Welcome back,{" "}
          <span className="text-blue-600">{user.name}</span> 👋
        </h1>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <Icon className="text-blue-600 mb-2" />
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* 🔥 EMPTY STATE */}
        {progressData.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow text-center">
            <h3 className="text-2xl font-semibold mb-3">
              🚀 Start Your Learning Journey
            </h3>
            <p className="text-gray-500 mb-6">
              Explore courses and begin your journey today.
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Explore Courses
            </button>
          </div>
        )}

        {/* 🔥 IN PROGRESS */}
        {inProgressCourses.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              📘 Continue Learning
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {inProgressCourses.map((p) => {
                const course = p.courseId;

                const progress = Math.round(
                  (p.completedLessons.length /
                    course.lessons.length) *
                    100
                );

                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                  >
                    <iframe
                      src={course.lessons[0]?.video}
                      className="w-full h-48"
                      title={course.title}
                    />

                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2">
                        {course.title}
                      </h3>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>

                        <div className="bg-gray-200 h-2 rounded-full mt-1">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/learn/${course._id}`)
                        }
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 🔥 COMPLETED */}
        {completedCourses.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              🎉 Completed Courses
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {completedCourses.map((p) => {
                const course = p.courseId;

                return (
                  <div
                    key={course._id}
                    className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow p-5 border border-green-200"
                  >
                    <h3 className="font-semibold text-lg">
                      {course.title}
                    </h3>

                    <p className="text-green-600 mt-2 font-medium">
                      ✔ Completed
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() =>
                          generateCertificate(course.title)
                        }
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg"
                      >
                        🎓 Certificate
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/learn/${course._id}`)
                        }
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                      >
                        Revisit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}