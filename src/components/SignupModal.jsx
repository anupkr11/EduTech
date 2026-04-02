import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import API from "../api/api";

export default function SignupModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful 🎉");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Name"
              className="w-full outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}