import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      console.log("Checking authentication...");
      const response = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 1) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          navigate("/login");
        }
      } else {
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuth(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // ✅ Fixed: Added return statement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ Only render children if authenticated
  return isAuth ? children : null;
}