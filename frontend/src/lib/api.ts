// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Generic API response type
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// HTTP Client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // Add authorization header if token exists
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Auth API functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),

  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    bloodGroup?: string;
    location?: string;
    role?: string;
  }) => apiClient.post('/auth/register', userData),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (updates: any) => apiClient.put('/auth/profile', updates),

  sendOTP: (phone: string) => apiClient.post('/auth/send-otp', { phone }),

  verifyOTP: (phone: string, otp: string) =>
    apiClient.post('/auth/verify-otp', { phone, otp }),
};

// Donor API functions
export const donorAPI = {
  getProfile: () => apiClient.get('/donors/profile'),

  updateProfile: (updates: any) => apiClient.put('/donors/profile', updates),

  updateAvailability: (availability: string) =>
    apiClient.put('/donors/availability', { availability }),

  getStats: () => apiClient.get('/donors/stats'),
};

// Request API functions
export const requestAPI = {
  create: (requestData: any) => apiClient.post('/requests', requestData),

  getUserRequests: () => apiClient.get('/requests'),

  getById: (id: string) => apiClient.get(`/requests/${id}`),

  update: (id: string, updates: any) => apiClient.put(`/requests/${id}`, updates),

  cancel: (id: string) => apiClient.delete(`/requests/${id}`),
};

// Matching API functions
export const matchingAPI = {
  findMatches: (requestId: string) =>
    apiClient.get(`/matching/request/${requestId}`),

  searchDonors: (params: {
    bloodGroup: string;
    latitude: number;
    longitude: number;
    radius?: number;
  }) => apiClient.get('/matching/donors', params),

  updateMatchStatus: (data: any) =>
    apiClient.put('/matching/match-status', data),
};

export default apiClient;