import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Target,
  Calendar,
  PlayCircle,
  CheckCircle,
  BarChart,
} from 'lucide-react';

import { courses } from '../data/mockData';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const enrolledCourses = courses.filter((c) =>
    user.enrolledCourses.includes(c.id)
  );

  const completedCount = user.completedCourses.length;
  const inProgressCount = enrolledCourses.length - completedCount;

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
      label: 'Hours Learned',
      value: user.totalHoursLearned,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      label: 'Certificates',
      value: user.certificatesEarned,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            data-testid="dashboard-welcome"
          >
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                data-testid={`dashboard-stat-${index}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} mb-3`}
                >
                  <Icon size={24} />
                </div>

                <h3
                  className="text-3xl font-bold mb-1"
                  data-testid={`dashboard-stat-value-${index}`}
                >
                  {stat.value}
                </h3>

                <p className="text-gray-600 text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                data-testid="dashboard-streak"
              >
                🔥 {user.currentStreak} Day Streak!
              </h3>
              <p className="text-orange-100">
                Keep learning every day to maintain your streak
              </p>
            </div>
            <Target size={48} className="opacity-50" />
          </div>
        </div>

        {/* Courses */}
        <div className="mb-10">
  <h2 className="text-2xl font-bold mb-6">
    Continue Learning
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {enrolledCourses.map((course) => {
      const completedLessons = JSON.parse(localStorage.getItem(`progress_${course.id}`)) || [];
const progress = Math.round(
  (completedLessons.length / course.lessons.length) * 100
);

      return (
        <div
          key={course.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
        >
          {/* VIDEO */}
          <div className="h-52">
            <iframe
              src={course.lessons[0].video}
              title={course.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h3 className="text-lg font-bold mb-2">
              {course.title}
            </h3>

            {/* PROGRESS */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* STATUS */}
            <p className="text-sm mb-3">
              {progress === 100 ? "✅ Completed" : "🚀 In Progress"}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate(`/learn/${course.id}`)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:scale-105 transition"
            >
              Continue Learning
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>
        {/* (rest remains same, already clean) */}
      </div>

      <Footer />
    </div>
  );
}