import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function LoginModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // VALIDATION
      if (isSignup && !name.trim()) {
        setLoading(false);
        return setError("Name is required");
      }

      if (!email || !validateEmail(email)) {
        setLoading(false);
        return setError("Enter a valid email");
      }

      if (!password || !validatePassword(password)) {
        setLoading(false);
        return setError("Password must be at least 6 characters");
      }

      // SIGNUP
      if (isSignup) {
        await API.post("/auth/register", {
          name,
          email,
          password,
        });

        alert("Signup successful 🎉");
        setIsSignup(false);
        setLoading(false);
        return;
      }

      // LOGIN
      const result = await login(email, password);

      if (!result.success) {
        setLoading(false);
        return setError(result.error);
      }

      const res = await API.get("/progress/my");

      if (res.data.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/courses");
      }

      onClose();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {isSignup && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Name"
                className="w-full outline-none cursor-pointer"
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock className="text-gray-400 mr-2" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                {isSignup ? "Signing up..." : "Logging in..."}
              </>
            ) : (
              isSignup ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}