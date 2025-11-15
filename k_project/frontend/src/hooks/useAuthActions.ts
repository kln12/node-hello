import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { User } from '../types/auth';

interface AuthStateSetters {
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
}

export const useAuthActions = (stateSetters: AuthStateSetters) => {
  const { setUser, setIsLoading, setError, setIsAuthenticated } = stateSetters;
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const authService = new AuthService();
      const response = await authService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard or appropriate page
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUser, setIsLoading, setError, setIsAuthenticated]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate, setUser, setIsAuthenticated]);

  return { login, logout };
};
