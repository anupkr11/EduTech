import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoursesPage from './components/CoursePage';
import CourseDetails from './components/CourseDetails';
import ChatWidget from './components/ChatWidget';
import LearnCourse from './pages/LaernCourse';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <ChatWidget />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/learn/:id" element={<LearnCourse />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}