import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  facilityName: string;
  departmentName: string;
  role?: string;
}

interface AuthState {
  checkingAuth: boolean;
  isSignUp: boolean;
  isLogin: boolean;
  isVerifyingEmail: boolean;
  authUser: AuthUser | null;
  token: string | null;
  
  // Actions
  signUp: (formData: object, nextStep: () => void) => Promise<void>;
  login: (formData: object) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyEmail: (data: object) => Promise<void>;
  checkAuth: () => Promise<void>;
  editProfile: (formData: object, id: string) => Promise<void>;
  
  // Token management
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  checkingAuth: true,
  isSignUp: false,
  isLogin: false,
  isVerifyingEmail: false,
  authUser: null,
  token: localStorage.getItem('token') || null,

  // Initialize auth check on store creation
  initialize: async () => {
    if (get().token) {
      await get().checkAuth();
    }
    set({ checkingAuth: false });
  },

  signUp: async (formData, nextStep) => {
    try {
      set({ isSignUp: true });
      const response = await axiosInstance.post('/create-account', formData);
      set({ authUser: response.data.user });
      nextStep();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (formData) => {
    try {
      set({ isLogin: true });
      const response = await axiosInstance.post('/login', formData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      set({ 
        authUser: response.data.user,
        token: response.data.token,
        isLogin: false
      });
      
      toast.success('Login successful');
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get('/logout');
      get().clearAuth();
      toast.success('Logged out successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  },

  verifyEmail: async (data) => {
    try {
      set({ isVerifyingEmail: true });
      await axiosInstance.post('/verify-email', data);
      toast.success('Email verified successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Verification failed');
      throw err;
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

  checkAuth: async () => {
    try {
      const token = get().token;
      if (!token) {
        set({ checkingAuth: false });
        return;
      }

      const response = await axiosInstance.get('/check-auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set({ authUser: response.data.user });
    } catch (err) {
      get().clearAuth();
    } finally {
      set({ checkingAuth: false });
    }
  },

  editProfile: async (formData, id) => {
    try {
    //   set({ editingUser: true });
      const response = await axiosInstance.put(`/edit-user/${id}`, formData);
      set({ authUser: response.data.user });
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed');
      throw err;
    } finally {
    //   set({ editingUser: false });
    }
  },

  setToken: (token: string) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    set({ authUser: null, token: null });
  }
}));

// Initialize auth store on app load
useAuthStore.getState().checkAuth();