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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            Edu<span className="text-blue-400">Learn</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-white hover:text-blue-400 transition"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>

                <span className="text-gray-300 text-sm">
                  Hi, {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-4 bg-black/80 backdrop-blur-lg">
            <Link to="/" className="block text-white">
              Home
            </Link>
            <Link to="/courses" className="block text-white">
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-white">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
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
      />
    </>
  );
}