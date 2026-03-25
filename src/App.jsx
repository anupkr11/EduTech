import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoursesSection from './components/CoursesSection';
// import Analysis from './pages/Analysis';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesSection />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}