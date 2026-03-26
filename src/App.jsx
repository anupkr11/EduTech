import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoursesPage from './components/CoursePage';
import CourseDetails from './components/CourseDetails';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}