import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/types/User';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  initializeAuth: async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        set({ user: res, isLoggedIn: true });
      } else {
        set({ user: null, isLoggedIn: false });
      }
    } catch (error) {
      console.error(error);
      set({ user: null, isLoggedIn: false });
    }
  },
}));
