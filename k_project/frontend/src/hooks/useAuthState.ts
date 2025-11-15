import { useState } from 'react';
import { User } from '../types/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
  };
};