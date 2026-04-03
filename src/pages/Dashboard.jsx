import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from "../api/api";

import {
  BookOpen,
  Clock,
  Award,
  Target,
  CheckCircle,
} from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState([]);

  // 🔥 FETCH USER PROGRESS
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress/my");
        setProgressData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) fetchProgress();
  }, [isAuthenticated]);

  // 🔥 AUTH CHECK
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
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

  // 🔥 CALCULATIONS
  const enrolledCourses = progressData;

  const completedCount = progressData.filter(
  (p) =>
    p.courseId &&
    p.courseId.lessons &&
    p.completedLessons?.length === p.courseId.lessons.length
).length;

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: completedCount,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Lessons Done',
      value: progressData.reduce(
        (acc, p) => acc + p.completedLessons.length,
        0
      ),
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      label: 'Courses',
      value: progressData.length,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome back, {user.name} 👋
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <Icon className="mb-2" />
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* COURSES */}
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {progressData
  .filter((p) => p.courseId && p.courseId.lessons)
  .map((p) => {
            const course = p.courseId;

            const progress = course?.lessons?.length
  ? Math.round(
      (p.completedLessons.length / course.lessons.length) * 100
    )
  : 0;

            return (
              <div key={course._id} className="bg-white rounded-xl shadow overflow-hidden">

                <iframe
                  src={course.lessons[0].video}
                  className="w-full h-52"
                  title={course.title}
                />

                <div className="p-4">
                  <h3 className="font-bold">{course.title}</h3>

                  {/* Progress */}
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="bg-gray-200 h-2 rounded-full mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/learn/${course._id}`)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Continue
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <Footer />
    </div>
  );
}