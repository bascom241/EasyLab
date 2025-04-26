import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface ApiResponse {
  data: Notification[];
  // Add other properties if your API response includes them
  // e.g., message?: string;
  // status?: string;
}

interface NotificationAuth {
  notifications: Notification[];
  setNotifications: (notifications: Notification[] | ((prev: Notification[]) => Notification[])) => void;
  fetchNotifications: () => Promise<void>;
}

const useNotification = create<NotificationAuth>((set) => ({
  notifications: [],
  setNotifications: (notifications) => {
    set((state) => ({
      notifications: typeof notifications === 'function' ? notifications(state.notifications) : notifications
    }));
  },
  fetchNotifications: async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>("/sample/notifications");
      set({ notifications: response.data.data });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching notifications:", error.message);
      }
      // Optionally set an empty array on error
      set({ notifications: [] });
    }
  }
}));

export default useNotification;