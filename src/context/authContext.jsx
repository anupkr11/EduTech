import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

//creates global container to store auth data
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("edulearn_user"));
    if (data) {
      setUser(data.user);
    }
    setIsLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const data = res.data;

      localStorage.setItem("edulearn_user", JSON.stringify(data));
      setUser(data.user);

      return { success: true };
    } catch (err) {
      return { success: false, error: "Invalid credentials" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("edulearn_user");
    setUser(null);
  };

  // REGISTER
  const register = async (name, email, password) => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    const data = res.data;

    localStorage.setItem("edulearn_user", JSON.stringify(data));
    setUser(data.user);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.msg || "Signup failed",
    };
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);