import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User, AuthContextType } from "../types/auth";
import { AuthService } from '../services/auth.service';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    console.log("Attempting to log in with:", email); // Log email for debugging
    try {
      const authService = new AuthService();
      const response = await authService.login({ email, password });
      setUser(response.user);
      console.log("User logged in:", response.user); // Log user for debugging
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      console.error("Login error:", err.message); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
