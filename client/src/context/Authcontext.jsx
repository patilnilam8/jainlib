import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token has expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setAdmin({ email: decoded.email });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // Remove invalid token
      }
    }
    setIsLoading(false);
  }, []); // Runs only on mount

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setAdmin({ email: decoded.email });
    
      navigate("/dashboard");
   
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
