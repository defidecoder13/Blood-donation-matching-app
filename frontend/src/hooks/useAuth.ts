import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth, authAPI, User, AuthState } from '@/lib/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = auth.getToken();
      const user = auth.getCurrentUser();

      if (token && user) {
        try {
          // Verify token is still valid by fetching profile
          const profileResponse = await authAPI.getProfile();
          if (profileResponse.success) {
            setAuthState({
              user: profileResponse.data.user,
              token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            // Token invalid, clear it
            auth.removeToken();
            setAuthState({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        } catch (error) {
          // Token invalid, clear it
          auth.removeToken();
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        const { user, token } = response.data;

        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        });

        router.push('/dashboard');
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, message: response.message };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }, [router]);

  // Register function
  const register = useCallback(async (userData: any) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await authAPI.register(userData);

      if (response.success && response.data) {
        const { user, token } = response.data;

        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        });

        router.push('/dashboard');
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, message: response.message };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }, [router]);

  // Logout function
  const logout = useCallback(() => {
    authAPI.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    router.push('/');
  }, [router]);

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (!authState.isAuthenticated) return;

    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        setAuthState(prev => ({
          ...prev,
          user: response.data.user
        }));
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  }, [authState.isAuthenticated]);

  return {
    ...authState,
    login,
    register,
    logout,
    refreshProfile
  };
};