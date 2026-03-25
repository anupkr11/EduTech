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
        {/* (rest remains same, already clean) */}
      </div>

      <Footer />
    </div>
  );
}