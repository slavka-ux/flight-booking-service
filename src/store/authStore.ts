import { create } from 'zustand';
import { User } from '../types';
import { authAPI } from '../api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (fullName: string, passportNumber?: string, phone?: string) => Promise<void>;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  checkAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        set({
          token,
          user: JSON.parse(userStr),
          isAuthenticated: true,
        });
      } catch (e) {
        get().logout();
      }
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Invalid email or password',
        loading: false,
      });
      throw err;
    }
  },

  register: async (fullName, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(fullName, email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Registration failed.',
        loading: false,
      });
      throw err;
    }
  },

  updateProfile: async (fullName, passportNumber, phone) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.updateProfile(fullName, passportNumber, phone);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        user: response.user,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Failed to update profile',
        loading: false,
      });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
