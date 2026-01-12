// Authentication utilities

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'donor' | 'seeker' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Token management
export const auth = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  // Decode JWT token to get user info (simple implementation)
  decodeToken: (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        firstName: payload.firstName || '',
        lastName: payload.lastName || '',
        email: payload.email || '',
        phone: payload.phone || '',
        role: payload.role || 'donor'
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  getCurrentUser: (): User | null => {
    const token = auth.getToken();
    if (!token) return null;
    return auth.decodeToken(token);
  }
};

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success && data.data?.token) {
      auth.setToken(data.data.token);
    }

    return data;
  },

  register: async (userData: any) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (data.success && data.data?.token) {
      auth.setToken(data.data.token);
    }

    return data;
  },

  logout: () => {
    auth.removeToken();
  },

  getProfile: async () => {
    const token = auth.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch('/api/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.json();
  }
};