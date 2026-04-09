import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/authContext";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-gray-900 tracking-wide"
          >
            Edu
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Learn
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition text-lg font-medium"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 transition text-lg font-medium"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition text-lg font-medium"
                >
                  Dashboard
                </Link>

                <span className="text-gray-600 text-md">Hi, {user?.name}</span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Login Button */}
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-4 bg-white shadow">
            <Link to="/" className="block text-gray-700">
              Home
            </Link>
            <Link to="/courses" className="block text-gray-700">
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-gray-700">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
    </>
  );
}
